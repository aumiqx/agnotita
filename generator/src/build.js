/**
 * Build System
 *
 * Runs the Next.js build on a generated site, producing static HTML
 * in the `out/` directory, ready for deployment.
 *
 * Steps:
 * 1. Install dependencies (npm install)
 * 2. Run next build (npm run build)
 * 3. Verify output exists
 * 4. Report build stats (page count, total size)
 */

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

/**
 * Build a generated Next.js site into static HTML.
 *
 * @param {string} siteDir - path to the generated site
 * @returns {Promise<{ outputDir: string, pageCount: number, totalSizeKB: number }>}
 */
export async function buildSite(siteDir) {
  const outputDir = join(siteDir, "out");

  // Verify site directory has a package.json
  if (!existsSync(join(siteDir, "package.json"))) {
    throw new Error(`No package.json found in ${siteDir}. Is this a valid template?`);
  }

  // Step 1: Install dependencies
  console.log("[build] Installing dependencies...");
  try {
    execSync("npm install --production=false", {
      cwd: siteDir,
      stdio: "pipe",
      timeout: 120000, // 2 minutes
    });
  } catch (err) {
    throw new Error(`npm install failed: ${err.stderr?.toString() || err.message}`);
  }

  // Step 2: Run build
  console.log("[build] Running next build...");
  try {
    execSync("npm run build", {
      cwd: siteDir,
      stdio: "pipe",
      timeout: 300000, // 5 minutes
      env: {
        ...process.env,
        NODE_ENV: "production",
      },
    });
  } catch (err) {
    const stderr = err.stderr?.toString() || "";
    const stdout = err.stdout?.toString() || "";
    throw new Error(`Build failed:\n${stderr}\n${stdout}`);
  }

  // Step 3: Verify output
  if (!existsSync(outputDir)) {
    throw new Error(
      `Build completed but no 'out/' directory found. ` +
      `Ensure next.config has output: 'export'.`
    );
  }

  // Step 4: Report stats
  const stats = await getBuildStats(outputDir);
  console.log(`[build] Build complete:`);
  console.log(`[build]   Output: ${outputDir}`);
  console.log(`[build]   Pages: ${stats.pageCount}`);
  console.log(`[build]   Total size: ${stats.totalSizeKB} KB`);

  return {
    outputDir,
    ...stats,
  };
}

/**
 * Get build output statistics.
 */
async function getBuildStats(outputDir) {
  let pageCount = 0;
  let totalSize = 0;

  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else {
        const fileStat = await stat(fullPath);
        totalSize += fileStat.size;

        if (entry.name.endsWith(".html")) {
          pageCount++;
        }
      }
    }
  }

  await walk(outputDir);

  return {
    pageCount,
    totalSizeKB: Math.round(totalSize / 1024),
  };
}
