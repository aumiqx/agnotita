/**
 * Google Maps Scraper Source
 *
 * PRIMARY source — runs first for every category.
 * Uses SerpAPI's Google Maps API (serpapi.com) to get structured business data.
 *
 * Provides: name, address, city, state, coordinates, phone, website, rating,
 *           reviewCount, hours, photos, reviews, amenities, category
 *
 * Env: SERPAPI_KEY
 *
 * Fallback: If SerpAPI fails, tries Outscraper API (outscraper.com).
 * Env: OUTSCRAPER_KEY
 */

const SERPAPI_BASE = "https://serpapi.com/search.json";
const OUTSCRAPER_BASE = "https://api.app.outscraper.com/maps/search-v3";

/**
 * @param {{ query: string, category: string, city: string }} params
 * @returns {Promise<import('../schema.ts').PartialBusinessData | null>}
 */
export async function scrapeGoogleMaps({ query, category, city }) {
  const apiKey = process.env.SERPAPI_KEY;
  const outscraper = process.env.OUTSCRAPER_KEY;

  if (!apiKey && !outscraper) {
    console.warn("[google-maps] No API key found (SERPAPI_KEY or OUTSCRAPER_KEY). Skipping.");
    return null;
  }

  // Try SerpAPI first
  if (apiKey) {
    try {
      return await fetchViaSerpAPI(query, city, apiKey);
    } catch (err) {
      console.warn("[google-maps] SerpAPI failed, trying Outscraper:", err.message);
    }
  }

  // Fallback to Outscraper
  if (outscraper) {
    return await fetchViaOutscraper(query, city, outscraper);
  }

  return null;
}

/**
 * Fetch business data from SerpAPI Google Maps endpoint.
 *
 * API docs: https://serpapi.com/google-maps-api
 *
 * Steps:
 * 1. Search for the business name + city on Google Maps
 * 2. Get the first result's place_id
 * 3. Fetch place details (reviews, photos, hours)
 * 4. Map response fields to PartialBusinessData
 */
async function fetchViaSerpAPI(query, city, apiKey) {
  const searchQuery = city ? `${query} ${city}` : query;

  // Step 1: Search
  const searchUrl = new URL(SERPAPI_BASE);
  searchUrl.searchParams.set("engine", "google_maps");
  searchUrl.searchParams.set("q", searchQuery);
  searchUrl.searchParams.set("type", "search");
  searchUrl.searchParams.set("api_key", apiKey);

  const searchRes = await fetch(searchUrl);
  if (!searchRes.ok) throw new Error(`SerpAPI search failed: ${searchRes.status}`);

  const searchData = await searchRes.json();
  const place = searchData.local_results?.[0];
  if (!place) throw new Error("No results found on Google Maps");

  // Step 2: Get place details using data_id
  const detailUrl = new URL(SERPAPI_BASE);
  detailUrl.searchParams.set("engine", "google_maps");
  detailUrl.searchParams.set("type", "place");
  detailUrl.searchParams.set("data_id", place.data_id);
  detailUrl.searchParams.set("api_key", apiKey);

  const detailRes = await fetch(detailUrl);
  if (!detailRes.ok) throw new Error(`SerpAPI detail fetch failed: ${detailRes.status}`);

  const detail = await detailRes.json();
  const info = detail.place_results || detail;

  // Step 3: Map to schema
  return {
    name: info.title || place.title,
    sources: ["google-maps"],
    address: info.address || place.address,
    city: extractCity(info.address || place.address),
    state: extractState(info.address || place.address),
    phone: info.phone || null,
    website: info.website || null,
    rating: info.rating || place.rating || null,
    reviewCount: info.reviews || place.reviews || null,
    coordinates: info.gps_coordinates
      ? { lat: info.gps_coordinates.latitude, lng: info.gps_coordinates.longitude }
      : null,
    hours: mapHours(info.operating_hours || info.hours),
    photos: (info.images || []).slice(0, 20).map((img) => ({
      url: img.image || img.thumbnail,
      source: "google-maps",
      caption: img.title || null,
    })),
    reviews: (info.user_reviews || info.reviews_results || []).slice(0, 30).map((r) => ({
      author: r.user?.name || r.username || "Anonymous",
      text: r.snippet || r.extracted_snippet?.content || "",
      rating: r.rating || 0,
      date: r.date || r.iso_date || new Date().toISOString(),
      source: "google-maps",
    })),
    amenities: extractAmenities(info),
    description: info.description || info.snippet || null,
  };
}

/**
 * Fetch business data from Outscraper Google Maps API.
 *
 * API docs: https://app.outscraper.com/api-docs
 *
 * Steps:
 * 1. POST search query
 * 2. Poll for results
 * 3. Map response to PartialBusinessData
 */
async function fetchViaOutscraper(query, city, apiKey) {
  const searchQuery = city ? `${query}, ${city}, India` : `${query}, India`;

  const res = await fetch(`${OUTSCRAPER_BASE}?query=${encodeURIComponent(searchQuery)}&limit=1`, {
    headers: { "X-API-KEY": apiKey },
  });

  if (!res.ok) throw new Error(`Outscraper failed: ${res.status}`);

  const data = await res.json();
  const place = data.data?.[0]?.[0];
  if (!place) throw new Error("No Outscraper results");

  return {
    name: place.name,
    sources: ["google-maps"],
    address: place.full_address || place.street_address,
    city: place.city || extractCity(place.full_address),
    state: place.state || extractState(place.full_address),
    phone: place.phone || null,
    website: place.site || null,
    rating: place.rating || null,
    reviewCount: place.reviews || null,
    coordinates: place.latitude
      ? { lat: place.latitude, lng: place.longitude }
      : null,
    hours: mapOutscraperHours(place.working_hours),
    photos: (place.photos_sample || []).map((p) => ({
      url: p.photo_url,
      source: "google-maps",
      caption: p.photo_caption || null,
    })),
    reviews: (place.reviews_data || []).slice(0, 30).map((r) => ({
      author: r.author_title || "Anonymous",
      text: r.review_text || "",
      rating: r.review_rating || 0,
      date: r.review_datetime_utc || new Date().toISOString(),
      source: "google-maps",
    })),
    amenities: place.about?.flatMap((section) =>
      Object.entries(section)
        .filter(([, v]) => v === true)
        .map(([k]) => k.replace(/_/g, " "))
    ) || [],
    description: place.description || null,
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function extractCity(address) {
  if (!address) return "";
  // Indian addresses usually: "..., City, State PIN"
  const parts = address.split(",").map((s) => s.trim());
  return parts.length >= 3 ? parts[parts.length - 3] : parts[0];
}

function extractState(address) {
  if (!address) return "";
  const parts = address.split(",").map((s) => s.trim());
  const last = parts[parts.length - 1];
  // Strip PIN code
  return last.replace(/\d{6}/, "").trim();
}

function mapHours(hours) {
  if (!hours) return null;
  const dayMap = {
    Monday: "mon", Tuesday: "tue", Wednesday: "wed",
    Thursday: "thu", Friday: "fri", Saturday: "sat", Sunday: "sun",
  };
  const result = {};
  for (const entry of hours) {
    const day = dayMap[entry.day];
    if (day) result[day] = entry.hours || "Closed";
  }
  return result;
}

function mapOutscraperHours(hours) {
  if (!hours) return null;
  const dayMap = {
    Monday: "mon", Tuesday: "tue", Wednesday: "wed",
    Thursday: "thu", Friday: "fri", Saturday: "sat", Sunday: "sun",
  };
  const result = {};
  for (const [day, time] of Object.entries(hours)) {
    const key = dayMap[day];
    if (key) result[key] = Array.isArray(time) ? time.join(", ") : time;
  }
  return result;
}

function extractAmenities(info) {
  // SerpAPI returns amenities in various fields depending on place type
  const amenities = [];
  if (info.amenities) {
    for (const section of Object.values(info.amenities)) {
      if (Array.isArray(section)) amenities.push(...section);
    }
  }
  return amenities;
}
