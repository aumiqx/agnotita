/**
 * Photo Processor
 *
 * Takes downloaded photos from scraper output and prepares them for
 * the generated Next.js site:
 *
 * 1. Copies photos into the template's public/photos directory
 * 2. Generates responsive variants (if sharp is available)
 * 3. Creates a photo manifest (photos.json) that templates import
 * 4. Generates blur placeholders for lazy loading
 *
 * Uses: sharp (optional — degrades gracefully to copy-only)
 */

import { cp, writeFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, basename, extname } from "node:path";

/**
 * Responsive breakpoints for srcset generation.
 */
const WIDTHS = [320, 640, 960, 1280, 1920];

/**
 * Process photos for a generated site.
 *
 * @param {import('../../scraper/src/schema.ts').BusinessData} businessData
 * @param {string} siteDir - the generated site directory
 */
export async function processPhotos(businessData, siteDir) {
  const photosDir = join(siteDir, "public", "photos");

  if (!existsSync(photosDir)) {
    await mkdir(photosDir, { recursive: true });
  }

  const manifest = [];
  let sharp = null;

  // Try to load sharp
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.warn("[photos] sharp not available. Photos will be copied without optimization.");
  }

  for (let i = 0; i < businessData.photos.length; i++) {
    const photo = businessData.photos[i];
    const photoEntry = {
      id: i,
      caption: photo.caption || null,
      source: photo.source,
      variants: {},
    };

    if (photo.localPath && existsSync(photo.localPath)) {
      // Photo was downloaded by scraper — process from local file
      const filename = `photo-${String(i).padStart(3, "0")}`;

      if (sharp) {
        // Generate optimized WebP variants at each breakpoint
        for (const width of WIDTHS) {
          const outName = `${filename}-${width}w.webp`;
          const outPath = join(photosDir, outName);

          await sharp(photo.localPath)
            .resize(width, null, { withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(outPath);

          photoEntry.variants[width] = `/photos/${outName}`;
        }

        // Generate blur placeholder (tiny 20px wide base64)
        const blurBuffer = await sharp(photo.localPath)
          .resize(20, null)
          .webp({ quality: 20 })
          .toBuffer();

        photoEntry.blurDataURL = `data:image/webp;base64,${blurBuffer.toString("base64")}`;
      } else {
        // No sharp: just copy the file
        const ext = extname(photo.localPath);
        const outName = `${filename}${ext}`;
        const outPath = join(photosDir, outName);
        await cp(photo.localPath, outPath);
        photoEntry.variants.original = `/photos/${outName}`;
      }
    } else if (photo.url) {
      // Photo not downloaded — use remote URL directly
      // Templates will use <img src={url}> with no optimization
      photoEntry.variants.original = photo.url;
      photoEntry.remote = true;
    }

    manifest.push(photoEntry);
  }

  // Write photo manifest
  const manifestPath = join(siteDir, "src", "data", "photos.json");
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");

  console.log(`[photos] Processed ${manifest.length} photos, manifest at photos.json`);

  // Generate hero image (first photo, full width, high quality)
  if (sharp && businessData.photos[0]?.localPath) {
    await generateHeroImage(sharp, businessData.photos[0].localPath, photosDir);
  }
}

/**
 * Generate a high-quality hero image for the landing section.
 * Creates both a full-size WebP and a blur placeholder.
 */
async function generateHeroImage(sharp, sourcePath, photosDir) {
  try {
    await sharp(sourcePath)
      .resize(1920, 1080, { fit: "cover", position: "centre" })
      .webp({ quality: 85 })
      .toFile(join(photosDir, "hero.webp"));

    await sharp(sourcePath)
      .resize(1920, 1080, { fit: "cover", position: "centre" })
      .jpeg({ quality: 75 })
      .toFile(join(photosDir, "hero.jpg")); // fallback for older browsers

    console.log("[photos] Hero image generated");
  } catch (err) {
    console.warn("[photos] Failed to generate hero image:", err.message);
  }
}
