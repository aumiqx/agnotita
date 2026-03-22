/**
 * Agnotita Generator — Main Entry Point
 *
 * Takes scraped business JSON + a template name, generates a complete
 * Next.js project ready for static export.
 *
 * Usage:
 *   node generator/src/index.js scraper/output/zostel-varanasi.json --template hostel
 *   npm run generate -- scraper/output/zostel-varanasi.json --template hostel
 *
 * Output: generated site in generator/output/<slug>/
 */

import { loadTemplate } from "./template-loader.js";
import { generateContent } from "./content-generator.js";
import { processPhotos } from "./photo-processor.js";
import { buildSite } from "./build.js";
import { parseArgs } from "node:util";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "..", "output");

// ─── CLI ─────────────────────────────────────────────────────────────────────

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    template: { type: "string", short: "t", default: "" },
    "skip-content": { type: "boolean", default: false },
    "skip-photos": { type: "boolean", default: false },
    "skip-build": { type: "boolean", default: false },
    output: { type: "string", short: "o", default: "" },
    help: { type: "boolean", short: "h", default: false },
  },
});

if (values.help || positionals.length === 0) {
  console.log(`
  Agnotita Generator

  Usage:
    node generator/src/index.js <business.json> --template <name>

  Options:
    --template, -t     Template to use (hostel, hotel, cafe, restaurant, salon)
    --skip-content     Don't generate AI content (use scraped data only)
    --skip-photos      Don't process/optimize photos
    --skip-build       Don't run next build (generate files only)
    --output, -o       Custom output directory
    --help, -h         Show this help

  Examples:
    node generator/src/index.js scraper/output/zostel-varanasi.json -t hostel
    node generator/src/index.js data.json -t cafe --skip-build
  `);
  process.exit(0);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const inputPath = resolve(positionals[0]);

  if (!existsSync(inputPath)) {
    console.error(`[generator] Input file not found: ${inputPath}`);
    process.exit(1);
  }

  // Load business data
  const businessData = JSON.parse(readFileSync(inputPath, "utf-8"));
  console.log(`[generator] Loaded data for: ${businessData.name}`);

  // Determine template
  const templateName = values.template || businessData.category;
  if (!templateName) {
    console.error("[generator] No template specified. Use --template or set category in data.");
    process.exit(1);
  }

  const outputDir = values.output || join(OUTPUT_DIR, businessData.slug);

  // Step 1: Copy template and inject data
  console.log(`[generator] Using template: ${templateName}`);
  await loadTemplate(templateName, businessData, outputDir);

  // Step 2: Generate missing content with AI
  if (!values["skip-content"]) {
    console.log("[generator] Generating AI content...");
    await generateContent(businessData, outputDir);
  }

  // Step 3: Process photos
  if (!values["skip-photos"] && businessData.photos?.length > 0) {
    console.log("[generator] Processing photos...");
    await processPhotos(businessData, outputDir);
  }

  // Step 4: Build static site
  if (!values["skip-build"]) {
    console.log("[generator] Building static site...");
    await buildSite(outputDir);
  }

  console.log(`\n[generator] Site generated at: ${outputDir}`);
  if (!values["skip-build"]) {
    console.log(`[generator] Static output at: ${join(outputDir, "out")}`);
  }
  console.log("[generator] Done.\n");
}

main().catch((err) => {
  console.error("[generator] Fatal error:", err);
  process.exit(1);
});
