/**
 * CRM Export
 *
 * Generates a CSV/spreadsheet with business data and live URLs.
 * Used by the calling team to track which businesses have been:
 * 1. Scraped (data collected)
 * 2. Generated (site built)
 * 3. Deployed (live on subdomain)
 * 4. Contacted (owner notified)
 *
 * Usage:
 *   node pipeline/src/crm.js --input scraper/output/ --output pipeline/crm/leads.csv
 *   node pipeline/src/crm.js --add scraper/output/zostel-varanasi.json --url https://zostel-varanasi.agnotita.com
 */

import { parseArgs } from "node:util";
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from "node:fs";
import { join, dirname, resolve, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_CRM_DIR = join(__dirname, "..", "crm");
const DEFAULT_CRM_FILE = join(DEFAULT_CRM_DIR, "leads.csv");

// ─── CLI ─────────────────────────────────────────────────────────────────────

const { values } = parseArgs({
  options: {
    input: { type: "string", short: "i", default: "" },
    output: { type: "string", short: "o", default: DEFAULT_CRM_FILE },
    add: { type: "string" },
    url: { type: "string" },
    format: { type: "string", short: "f", default: "csv" },
    help: { type: "boolean", short: "h", default: false },
  },
});

if (values.help) {
  console.log(`
  Agnotita CRM Export

  Usage:
    node pipeline/src/crm.js --input <scraper-output-dir>     Build full CRM from all scraped data
    node pipeline/src/crm.js --add <business.json> --url <url>  Add a single business to CRM

  Options:
    --input, -i    Directory containing scraped JSON files
    --output, -o   Output file path (default: pipeline/crm/leads.csv)
    --add          Add a single business JSON file
    --url          Live URL for the --add business
    --format, -f   Output format: csv or json (default: csv)
    --help, -h     Show this help
  `);
  process.exit(0);
}

// ─── CSV columns ─────────────────────────────────────────────────────────────

const CSV_HEADERS = [
  "Name",
  "Slug",
  "Category",
  "City",
  "State",
  "Phone",
  "Email",
  "Website",
  "Rating",
  "Review Count",
  "Address",
  "Instagram",
  "Live URL",
  "Status",
  "Scraped At",
  "Notes",
];

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  if (values.add) {
    // Add a single business to existing CRM
    await addToCRM(values.add, values.url);
    return;
  }

  if (values.input) {
    // Build CRM from all scraped data
    await buildCRM(values.input);
    return;
  }

  console.error("[crm] Specify --input or --add. Use --help for usage.");
  process.exit(1);
}

/**
 * Build a complete CRM spreadsheet from all scraped business JSON files.
 *
 * @param {string} inputDir - directory containing *.json scraper output files
 */
async function buildCRM(inputDir) {
  const resolvedDir = resolve(inputDir);

  if (!existsSync(resolvedDir)) {
    console.error(`[crm] Input directory not found: ${resolvedDir}`);
    process.exit(1);
  }

  // Find all JSON files
  const jsonFiles = readdirSync(resolvedDir)
    .filter((f) => extname(f) === ".json")
    .map((f) => join(resolvedDir, f));

  if (jsonFiles.length === 0) {
    console.error(`[crm] No JSON files found in ${resolvedDir}`);
    process.exit(1);
  }

  console.log(`[crm] Found ${jsonFiles.length} business files`);

  // Parse all business data
  const rows = jsonFiles.map((file) => {
    const data = JSON.parse(readFileSync(file, "utf-8"));
    return businessToRow(data);
  });

  // Write output
  writeOutput(rows, values.output, values.format);
}

/**
 * Add a single business to the existing CRM file.
 *
 * @param {string} jsonPath - path to business JSON
 * @param {string} liveUrl - optional live URL
 */
async function addToCRM(jsonPath, liveUrl) {
  const resolvedPath = resolve(jsonPath);

  if (!existsSync(resolvedPath)) {
    console.error(`[crm] File not found: ${resolvedPath}`);
    process.exit(1);
  }

  const data = JSON.parse(readFileSync(resolvedPath, "utf-8"));
  const row = businessToRow(data, liveUrl);

  const outputPath = resolve(values.output);
  const outputDir = dirname(outputPath);

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  if (values.format === "json") {
    // Append to JSON array
    let existing = [];
    if (existsSync(outputPath)) {
      existing = JSON.parse(readFileSync(outputPath, "utf-8"));
    }
    existing.push(rowToObject(row));
    writeFileSync(outputPath, JSON.stringify(existing, null, 2), "utf-8");
  } else {
    // Append to CSV
    let csvContent = "";

    if (!existsSync(outputPath)) {
      csvContent = CSV_HEADERS.join(",") + "\n";
    }

    csvContent += rowToCSV(row) + "\n";

    if (existsSync(outputPath)) {
      const existing = readFileSync(outputPath, "utf-8");
      writeFileSync(outputPath, existing + csvContent, "utf-8");
    } else {
      writeFileSync(outputPath, csvContent, "utf-8");
    }
  }

  console.log(`[crm] Added ${data.name} to ${outputPath}`);
}

// ─── Data mapping ────────────────────────────────────────────────────────────

/**
 * Convert business data to a CRM row.
 */
function businessToRow(data, liveUrl) {
  return [
    data.name || "",
    data.slug || "",
    data.category || "",
    data.city || "",
    data.state || "",
    data.phone || "",
    data.email || "",
    data.website || "",
    data.rating != null ? String(data.rating) : "",
    data.reviewCount != null ? String(data.reviewCount) : "",
    data.address || "",
    data.social?.instagram || "",
    liveUrl || "",
    liveUrl ? "deployed" : "scraped",
    data.scrapedAt || new Date().toISOString(),
    "",
  ];
}

/**
 * Convert a row array to a named object.
 */
function rowToObject(row) {
  const obj = {};
  CSV_HEADERS.forEach((header, i) => {
    obj[header] = row[i];
  });
  return obj;
}

/**
 * Escape and format a row as CSV.
 */
function rowToCSV(row) {
  return row
    .map((cell) => {
      const str = String(cell);
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    })
    .join(",");
}

/**
 * Write full CRM output.
 */
function writeOutput(rows, outputPath, format) {
  const resolvedPath = resolve(outputPath);
  const outputDir = dirname(resolvedPath);

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  if (format === "json") {
    const data = rows.map(rowToObject);
    writeFileSync(resolvedPath, JSON.stringify(data, null, 2), "utf-8");
  } else {
    const csv = [CSV_HEADERS.join(","), ...rows.map(rowToCSV)].join("\n") + "\n";
    writeFileSync(resolvedPath, csv, "utf-8");
  }

  console.log(`[crm] CRM written to ${resolvedPath} (${rows.length} businesses)`);
}

main().catch((err) => {
  console.error("[crm] Fatal error:", err);
  process.exit(1);
});
