/**
 * Merge Utility
 *
 * Combines partial business data from multiple scraper sources into a single
 * unified BusinessData object. Uses priority-based merging where Google Maps
 * data is authoritative for core fields, and other sources supplement.
 */

import { slugify } from "./slugify.js";

/**
 * Source priority — higher index = higher authority for scalar fields.
 * For array fields (photos, reviews), all sources are combined.
 */
const SOURCE_PRIORITY = {
  "justdial": 1,
  "instagram": 2,
  "hostelworld": 3,
  "zomato": 4,
  "booking": 5,
  "tripadvisor": 6,
  "google-maps": 7, // highest authority
};

/**
 * Merge an array of PartialBusinessData objects into a single BusinessData.
 *
 * Merge strategy:
 * - Scalar fields (name, address, phone, etc.): highest-priority source wins
 * - Numeric fields (rating): weighted average by source priority
 * - Array fields (photos, reviews, amenities): deduplicated union
 * - Object fields (hours, social, coordinates): deep merge
 * - Category-specific (rooms, menu, services): best source wins (most items)
 *
 * @param {Array<import('../schema.ts').PartialBusinessData>} partials
 * @param {string} category
 * @returns {import('../schema.ts').BusinessData}
 */
export function mergeBusinessData(partials, category) {
  if (!partials || partials.length === 0) {
    throw new Error("Cannot merge: no data provided");
  }

  // Sort partials by source priority (lowest first, highest last = overrides)
  const sorted = [...partials].sort((a, b) => {
    const pa = getMaxPriority(a.sources);
    const pb = getMaxPriority(b.sources);
    return pa - pb;
  });

  const merged = {
    // Identity
    name: "",
    slug: "",
    category,

    // Location
    address: "",
    city: "",
    state: "",
    coordinates: null,

    // Contact
    phone: null,
    email: null,
    website: null,

    // Ratings
    rating: null,
    reviewCount: null,

    // Details
    hours: null,
    photos: [],
    reviews: [],
    amenities: [],
    description: null,
    longDescription: null,

    // Social
    social: {},

    // Category-specific
    rooms: null,
    menu: null,
    services: null,

    // Surroundings
    nearbyPlaces: [],
    busyTimes: null,

    // Metadata
    scrapedAt: new Date().toISOString(),
    sources: [],
  };

  // Merge each partial in priority order (highest priority last = wins)
  for (const partial of sorted) {
    mergeScalars(merged, partial);
    mergeArrayFields(merged, partial);
    mergeObjectFields(merged, partial);
    mergeCategorySpecific(merged, partial);
  }

  // Post-processing
  merged.slug = merged.slug || slugify(merged.name);
  merged.sources = collectSources(partials);
  merged.rating = computeWeightedRating(partials);
  merged.reviewCount = computeTotalReviewCount(partials);
  merged.photos = deduplicatePhotos(merged.photos);
  merged.reviews = deduplicateReviews(merged.reviews);
  merged.amenities = [...new Set(merged.amenities)];
  merged.nearbyPlaces = deduplicateNearbyPlaces(merged.nearbyPlaces);

  return merged;
}

// ─── Merge helpers ───────────────────────────────────────────────────────────

function mergeScalars(target, partial) {
  const scalarFields = [
    "name", "slug", "address", "city", "state",
    "phone", "email", "website", "description", "longDescription",
  ];

  for (const field of scalarFields) {
    if (partial[field] && partial[field].trim?.() !== "") {
      target[field] = partial[field];
    }
  }
}

function mergeArrayFields(target, partial) {
  if (partial.photos?.length) {
    target.photos.push(...partial.photos);
  }
  if (partial.reviews?.length) {
    target.reviews.push(...partial.reviews);
  }
  if (partial.amenities?.length) {
    target.amenities.push(...partial.amenities);
  }
  if (partial.nearbyPlaces?.length) {
    target.nearbyPlaces.push(...partial.nearbyPlaces);
  }
}

function mergeObjectFields(target, partial) {
  if (partial.coordinates) {
    target.coordinates = partial.coordinates;
  }
  if (partial.hours) {
    target.hours = { ...target.hours, ...partial.hours };
  }
  if (partial.social) {
    target.social = { ...target.social, ...partial.social };
  }
  if (partial.busyTimes) {
    target.busyTimes = partial.busyTimes;
  }
}

function mergeCategorySpecific(target, partial) {
  // For rooms/menu/services, take the source with the most items
  if (partial.rooms?.length) {
    if (!target.rooms || partial.rooms.length > target.rooms.length) {
      target.rooms = partial.rooms;
    }
  }
  if (partial.menu?.length) {
    if (!target.menu || partial.menu.length > target.menu.length) {
      target.menu = partial.menu;
    }
  }
  if (partial.services?.length) {
    if (!target.services || partial.services.length > target.services.length) {
      target.services = partial.services;
    }
  }
}

// ─── Post-processing helpers ─────────────────────────────────────────────────

function getMaxPriority(sources) {
  return Math.max(...sources.map((s) => SOURCE_PRIORITY[s] || 0));
}

function collectSources(partials) {
  const all = partials.flatMap((p) => p.sources);
  return [...new Set(all)];
}

/**
 * Weighted average rating across sources.
 * Higher-priority sources get more weight.
 */
function computeWeightedRating(partials) {
  let totalWeight = 0;
  let weightedSum = 0;

  for (const p of partials) {
    if (p.rating != null) {
      const weight = getMaxPriority(p.sources);
      weightedSum += p.rating * weight;
      totalWeight += weight;
    }
  }

  if (totalWeight === 0) return null;
  return Math.round((weightedSum / totalWeight) * 10) / 10; // 1 decimal
}

/**
 * Total review count: take the maximum across sources.
 * (Different sources count differently, so max is best approximation.)
 */
function computeTotalReviewCount(partials) {
  const counts = partials.map((p) => p.reviewCount).filter((c) => c != null);
  return counts.length > 0 ? Math.max(...counts) : null;
}

/**
 * Deduplicate photos by URL.
 * Prefer photos with captions over those without.
 */
function deduplicatePhotos(photos) {
  const seen = new Map();
  for (const photo of photos) {
    const key = photo.url;
    if (!seen.has(key) || (photo.caption && !seen.get(key).caption)) {
      seen.set(key, photo);
    }
  }
  return [...seen.values()];
}

/**
 * Deduplicate reviews by author + approximate text match.
 * Same author with >80% text overlap = duplicate.
 */
function deduplicateReviews(reviews) {
  const unique = [];
  for (const review of reviews) {
    const isDupe = unique.some(
      (r) =>
        r.author === review.author &&
        r.source === review.source &&
        textSimilarity(r.text, review.text) > 0.8
    );
    if (!isDupe) {
      unique.push(review);
    }
  }
  // Sort by date descending
  unique.sort((a, b) => new Date(b.date) - new Date(a.date));
  return unique;
}

/**
 * Simple text similarity using Jaccard index on word sets.
 */
function textSimilarity(a, b) {
  if (!a || !b) return 0;
  const wordsA = new Set(a.toLowerCase().split(/\s+/));
  const wordsB = new Set(b.toLowerCase().split(/\s+/));
  const intersection = new Set([...wordsA].filter((w) => wordsB.has(w)));
  const union = new Set([...wordsA, ...wordsB]);
  return intersection.size / union.size;
}

/**
 * Deduplicate nearby places by name similarity.
 */
function deduplicateNearbyPlaces(places) {
  const seen = new Map();
  for (const place of places) {
    const key = place.name.toLowerCase().replace(/\s+/g, "");
    if (!seen.has(key)) {
      seen.set(key, place);
    }
  }
  return [...seen.values()];
}
