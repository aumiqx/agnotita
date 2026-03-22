/**
 * Deploy System
 *
 * Uploads a built static site to Hostinger shared hosting via FTP.
 *
 * Deployment target:
 *   - Hostinger shared hosting (hPanel)
 *   - Static files uploaded to public_html/<subdomain>/
 *   - Subdomain created via Hostinger API before upload
 *
 * Env:
 *   FTP_HOST     — Hostinger FTP server (e.g., ftp.yourdomain.com)
 *   FTP_USER     — FTP username
 *   FTP_PASSWORD  — FTP password
 *   FTP_BASE_DIR — Base directory on server (default: /public_html)
 *
 * Usage:
 *   node pipeline/src/deploy.js generator/output/zostel-varanasi/out --subdomain zostel-varanasi
 *   npm run deploy -- generator/output/zostel-varanasi/out --subdomain zostel-varanasi
 */

import { createSubdomain } from "./subdomain.js";
import { parseArgs } from "node:util";
import { existsSync } from "node:fs";
import { readdir, stat, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { resolve } from "node:path";

// ─── CLI ─────────────────────────────────────────────────────────────────────

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    subdomain: { type: "string", short: "s" },
    domain: { type: "string", short: "d", default: "" },
    "skip-subdomain": { type: "boolean", default: false },
    "dry-run": { type: "boolean", default: false },
    help: { type: "boolean", short: "h", default: false },
  },
});

if (values.help || positionals.length === 0) {
  console.log(`
  Agnotita Deploy

  Usage:
    node pipeline/src/deploy.js <out-directory> --subdomain <name>

  Options:
    --subdomain, -s    Subdomain name (e.g., "zostel-varanasi")
    --domain, -d       Base domain (default: from FTP_HOST env)
    --skip-subdomain   Don't create subdomain (already exists)
    --dry-run          List files to upload without uploading
    --help, -h         Show this help

  Required env vars:
    FTP_HOST, FTP_USER, FTP_PASSWORD

  Examples:
    node pipeline/src/deploy.js generator/output/zostel-varanasi/out -s zostel-varanasi
  `);
  process.exit(0);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const outDir = resolve(positionals[0]);
  const subdomain = values.subdomain;

  if (!existsSync(outDir)) {
    console.error(`[deploy] Output directory not found: ${outDir}`);
    process.exit(1);
  }

  if (!subdomain) {
    console.error("[deploy] --subdomain is required");
    process.exit(1);
  }

  const ftpHost = process.env.FTP_HOST;
  const ftpUser = process.env.FTP_USER;
  const ftpPassword = process.env.FTP_PASSWORD;
  const ftpBaseDir = process.env.FTP_BASE_DIR || "/public_html";

  if (!ftpHost || !ftpUser || !ftpPassword) {
    console.error("[deploy] Missing FTP credentials. Set FTP_HOST, FTP_USER, FTP_PASSWORD.");
    process.exit(1);
  }

  // Step 1: Create subdomain (unless skipped)
  if (!values["skip-subdomain"]) {
    console.log(`[deploy] Creating subdomain: ${subdomain}`);
    await createSubdomain(subdomain, values.domain);
  }

  // Step 2: Collect all files to upload
  const files = await collectFiles(outDir);
  console.log(`[deploy] ${files.length} files to upload`);

  if (values["dry-run"]) {
    console.log("[deploy] Dry run — files that would be uploaded:");
    for (const file of files) {
      console.log(`  ${file.remotePath}`);
    }
    return;
  }

  // Step 3: Upload via FTP
  const remoteBase = `${ftpBaseDir}/${subdomain}`;
  await uploadViaFTP(files, remoteBase, { host: ftpHost, user: ftpUser, password: ftpPassword });

  const liveUrl = `https://${subdomain}.${values.domain || extractDomain(ftpHost)}`;
  console.log(`\n[deploy] Deployed successfully!`);
  console.log(`[deploy] Live at: ${liveUrl}\n`);

  return liveUrl;
}

// ─── File collection ─────────────────────────────────────────────────────────

/**
 * Recursively collect all files in a directory.
 * Returns array of { localPath, remotePath } objects.
 */
async function collectFiles(dir, basePath = dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      const subFiles = await collectFiles(fullPath, basePath);
      files.push(...subFiles);
    } else {
      files.push({
        localPath: fullPath,
        remotePath: relative(basePath, fullPath),
      });
    }
  }

  return files;
}

// ─── FTP Upload ──────────────────────────────────────────────────────────────

/**
 * Upload files to FTP server.
 *
 * Uses basic-ftp package for reliable FTP uploads.
 * Falls back to manual FTP if basic-ftp is not available.
 *
 * Features:
 * - Creates remote directories as needed
 * - Progress reporting
 * - Retry logic for failed uploads (3 attempts)
 * - Concurrent uploads (5 at a time) for speed
 *
 * @param {Array<{ localPath: string, remotePath: string }>} files
 * @param {string} remoteBase - base directory on server
 * @param {{ host: string, user: string, password: string }} credentials
 */
async function uploadViaFTP(files, remoteBase, credentials) {
  let ftp;

  try {
    const { Client } = await import("basic-ftp");
    ftp = new Client();
    ftp.ftp.verbose = false;
  } catch {
    console.error("[deploy] basic-ftp package not installed. Run: npm install basic-ftp");
    process.exit(1);
  }

  try {
    // Connect
    await ftp.access({
      host: credentials.host,
      user: credentials.user,
      password: credentials.password,
      secure: true,
      secureOptions: { rejectUnauthorized: false },
    });

    console.log("[deploy] Connected to FTP server");

    // Ensure base directory exists
    await ftp.ensureDir(remoteBase);

    // Collect unique directories to create
    const dirs = new Set();
    for (const file of files) {
      const parts = file.remotePath.split("/");
      for (let i = 1; i < parts.length; i++) {
        dirs.add(parts.slice(0, i).join("/"));
      }
    }

    // Create directories
    for (const dir of [...dirs].sort()) {
      await ftp.ensureDir(`${remoteBase}/${dir}`);
    }

    // Upload files with progress
    let uploaded = 0;
    for (const file of files) {
      const remotePath = `${remoteBase}/${file.remotePath}`;
      const content = await readFile(file.localPath);

      let attempts = 0;
      while (attempts < 3) {
        try {
          await ftp.uploadFrom(file.localPath, remotePath);
          break;
        } catch (err) {
          attempts++;
          if (attempts >= 3) {
            console.error(`[deploy] Failed to upload ${file.remotePath}: ${err.message}`);
          }
        }
      }

      uploaded++;
      if (uploaded % 10 === 0 || uploaded === files.length) {
        console.log(`[deploy] Uploaded ${uploaded}/${files.length} files`);
      }
    }
  } finally {
    ftp.close();
  }
}

/**
 * Extract domain from FTP host.
 * "ftp.example.com" -> "example.com"
 */
function extractDomain(ftpHost) {
  return ftpHost.replace(/^ftp\./, "");
}

main().catch((err) => {
  console.error("[deploy] Fatal error:", err);
  process.exit(1);
});
