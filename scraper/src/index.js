/**
 * Agnotita Scraper — Main Entry Point
 *
 * Usage:
 *   node scraper/src/index.js "Zostel Varanasi" --category hostel
 *   node scraper/src/index.js "Third Wave Coffee Indiranagar" --category cafe
 *   npm run scrape -- "Zostel Varanasi" --category hostel
 *
 * Output: writes business JSON to scraper/output/<slug>.json
 */

import { scrapeGoogleMaps } from "./sources/google-maps.js";
import { scrapeInstagram } from "./sources/instagram.js";
import { scrapeBooking } from "./sources/booking.js";
import { scrapeZomato } from "./sources/zomato.js";
import { scrapeTripAdvisor } from "./sources/tripadvisor.js";
import { scrapeJustdial } from "./sources/justdial.js";
import { mergeBusinessData } from "./utils/merge.js";
import { downloadPhotos } from "./utils/photo-downloader.js";
import { slugify } from "./utils/slugify.js";
import { parseArgs } from "node:util";
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "..", "output");

// ─── Source registry by category ─────────────────────────────────────────────
// Each category has a list of scraper sources to try, in priority order.

const SOURCES_BY_CATEGORY = {
  hostel: [scrapeGoogleMaps, scrapeBooking, scrapeTripAdvisor, scrapeInstagram, scrapeJustdial],
  hotel: [scrapeGoogleMaps, scrapeBooking, scrapeTripAdvisor, scrapeInstagram, scrapeJustdial],
  cafe: [scrapeGoogleMaps, scrapeZomato, scrapeInstagram, scrapeJustdial],
  restaurant: [scrapeGoogleMaps, scrapeZomato, scrapeTripAdvisor, scrapeInstagram, scrapeJustdial],
  salon: [scrapeGoogleMaps, scrapeJustdial, scrapeInstagram],
  coworking: [scrapeGoogleMaps, scrapeInstagram, scrapeJustdial],
  gym: [scrapeGoogleMaps, scrapeJustdial, scrapeInstagram],
  clinic: [scrapeGoogleMaps, scrapeJustdial],
  shop: [scrapeGoogleMaps, scrapeJustdial, scrapeInstagram],
};

// ─── CLI parsing ─────────────────────────────────────────────────────────────

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    category: { type: "string", short: "c", default: "hostel" },
    city: { type: "string", default: "" },
    "skip-photos": { type: "boolean", default: false },
    output: { type: "string", short: "o", default: "" },
    help: { type: "boolean", short: "h", default: false },
  },
});

if (values.help || positionals.length === 0) {
  console.log(`
  Agnotita Scraper

  Usage:
    node scraper/src/index.js "<business name>" --category <type>

  Options:
    --category, -c   Business type: hostel|hotel|cafe|restaurant|salon|coworking|gym|clinic|shop
    --city           City hint (helps disambiguation)
    --skip-photos    Don't download photos
    --output, -o     Custom output path
    --help, -h       Show this help

  Examples:
    node scraper/src/index.js "Zostel Varanasi" -c hostel
    node scraper/src/index.js "Third Wave Coffee Indiranagar" -c cafe --city Bangalore
  `);
  process.exit(0);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const query = positionals[0];
  const category = values.category;
  const city = values.city;

  console.log(`\n[agnotita] Scraping: "${query}" (category: ${category})`);

  const sources = SOURCES_BY_CATEGORY[category];
  if (!sources) {
    console.error(`[agnotita] Unknown category: ${category}`);
    console.error(`[agnotita] Valid categories: ${Object.keys(SOURCES_BY_CATEGORY).join(", ")}`);
    process.exit(1);
  }

  // Run all scrapers concurrently. Each returns a partial or null.
  const results = await Promise.allSettled(
    sources.map((scraper) =>
      scraper({ query, category, city }).catch((err) => {
        console.warn(`[agnotita] ${scraper.name} failed:`, err.message);
        return null;
      })
    )
  );

  // Collect successful partials
  const partials = results
    .filter((r) => r.status === "fulfilled" && r.value !== null)
    .map((r) => r.value);

  if (partials.length === 0) {
    console.error("[agnotita] All scrapers failed. No data collected.");
    process.exit(1);
  }

  console.log(`[agnotita] Got data from ${partials.length} source(s)`);

  // Merge all partials into unified schema
  const merged = mergeBusinessData(partials, category);

  // Generate slug if missing
  if (!merged.slug) {
    merged.slug = slugify(merged.name);
  }

  // Download photos unless skipped
  if (!values["skip-photos"] && merged.photos.length > 0) {
    console.log(`[agnotita] Downloading ${merged.photos.length} photos...`);
    const photoDir = join(OUTPUT_DIR, merged.slug, "photos");
    await downloadPhotos(merged.photos, photoDir);
  }

  // Write output
  const outputPath = values.output || join(OUTPUT_DIR, `${merged.slug}.json`);
  const outputDir = dirname(outputPath);

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  writeFileSync(outputPath, JSON.stringify(merged, null, 2), "utf-8");
  console.log(`[agnotita] Output written to: ${outputPath}`);
  console.log(`[agnotita] Done.\n`);

  return merged;
}

main().catch((err) => {
  console.error("[agnotita] Fatal error:", err);
  process.exit(1);
});
