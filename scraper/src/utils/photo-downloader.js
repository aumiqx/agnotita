/**
 * Photo Downloader & Optimizer
 *
 * Downloads business photos from URLs, saves locally, and generates
 * optimized versions for web use (WebP, multiple sizes).
 *
 * Uses: sharp (image processing)
 */

import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname } from "node:path";

/**
 * Size presets for responsive images.
 * Templates use srcset with these widths.
 */
const SIZES = {
  thumb: { width: 400, height: 300 },
  medium: { width: 800, height: 600 },
  large: { width: 1200, height: 900 },
  hero: { width: 1920, height: 1080 },
};

/**
 * Download and optimize all photos for a business.
 *
 * @param {Array<import('../schema.ts').BusinessPhoto>} photos
 * @param {string} outputDir - directory to save photos to
 * @returns {Promise<Array<import('../schema.ts').BusinessPhoto>>} photos with localPath set
 */
export async function downloadPhotos(photos, outputDir) {
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  const results = [];
  let index = 0;

  for (const photo of photos) {
    try {
      const filename = `photo-${String(index).padStart(3, "0")}`;
      const localPath = await downloadAndOptimize(photo.url, outputDir, filename);

      results.push({
        ...photo,
        localPath,
      });

      index++;
      console.log(`[photos] Downloaded ${index}/${photos.length}: ${filename}`);
    } catch (err) {
      console.warn(`[photos] Failed to download ${photo.url}:`, err.message);
      results.push(photo); // keep original URL, no localPath
    }

    // Rate limiting: small delay between downloads
    await sleep(200);
  }

  return results;
}

/**
 * Download a single photo and create optimized variants.
 *
 * Steps:
 * 1. Fetch the image from URL
 * 2. Save original
 * 3. Create WebP variants at each size preset
 * 4. Return path to the medium variant (default display size)
 *
 * @param {string} url
 * @param {string} outputDir
 * @param {string} filename - base filename without extension
 * @returns {Promise<string>} path to the medium-sized optimized image
 */
async function downloadAndOptimize(url, outputDir, filename) {
  // Fetch the image
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; Agnotita/1.0)",
      "Accept": "image/*",
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const ext = guessExtension(response.headers.get("content-type"), url);

  // Save original
  const originalPath = join(outputDir, `${filename}-original${ext}`);
  await writeFile(originalPath, buffer);

  // Create optimized variants using sharp (if available)
  try {
    const sharp = (await import("sharp")).default;

    for (const [sizeName, dimensions] of Object.entries(SIZES)) {
      const outPath = join(outputDir, `${filename}-${sizeName}.webp`);

      await sharp(buffer)
        .resize(dimensions.width, dimensions.height, {
          fit: "cover",
          position: "centre",
          withoutEnlargement: true,
        })
        .webp({ quality: 80 })
        .toFile(outPath);
    }

    // Return path to medium variant
    return join(outputDir, `${filename}-medium.webp`);
  } catch {
    // sharp not installed — return original path
    console.warn("[photos] sharp not available, saving originals only");
    return originalPath;
  }
}

/**
 * Guess file extension from content-type header or URL.
 */
function guessExtension(contentType, url) {
  if (contentType) {
    const map = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
      "image/gif": ".gif",
      "image/avif": ".avif",
    };
    if (map[contentType]) return map[contentType];
  }

  const ext = extname(new URL(url).pathname);
  return ext || ".jpg";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
