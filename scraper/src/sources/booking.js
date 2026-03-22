/**
 * Booking.com / Hostelworld Scraper Source
 *
 * For hotels and hostels — scrapes listing pages for room types, prices,
 * amenities, photos, and guest reviews.
 *
 * Strategy:
 * 1. Search Booking.com for the property name + city
 * 2. If not found, try Hostelworld (for hostels specifically)
 * 3. Scrape the listing page for structured data
 *
 * Uses: Apify Booking Scraper actor or direct HTML parsing via fetch + cheerio
 * Env: APIFY_TOKEN (optional — can also scrape directly)
 *
 * Provides: rooms, amenities, photos, reviews, rating, reviewCount, description
 */

/**
 * @param {{ query: string, category: string, city: string }} params
 * @returns {Promise<import('../schema.ts').PartialBusinessData | null>}
 */
export async function scrapeBooking({ query, category, city }) {
  // Only relevant for accommodation categories
  if (!["hostel", "hotel"].includes(category)) {
    return null;
  }

  console.log(`[booking] Scraping for: ${query} (${category})`);

  // Try Booking.com first, then Hostelworld for hostels
  let data = await scrapeBookingDotCom(query, city);

  if (!data && category === "hostel") {
    data = await scrapeHostelworld(query, city);
  }

  return data;
}

/**
 * Scrape Booking.com listing.
 *
 * Approach A — Apify actor (if APIFY_TOKEN is set):
 *   Actor: voyager/booking-scraper
 *   Input: { search: "Zostel Varanasi", maxItems: 1, includeReviews: true }
 *
 * Approach B — Direct HTML scrape:
 *   1. GET https://www.booking.com/searchresults.html?ss=<query>&dest_type=city
 *   2. Parse search results page for the first matching property link
 *   3. GET the property page
 *   4. Extract JSON-LD structured data (schema.org/Hotel)
 *   5. Parse room table, amenities list, photo gallery, reviews
 *
 * Data mapping:
 *   - rooms: from room availability table (name, price per night, description)
 *   - amenities: from "Most popular facilities" section
 *   - photos: from photo gallery carousel
 *   - reviews: from guest review section (author, text, score, date)
 *   - rating: from review score badge (e.g., 8.5/10 -> 4.25/5)
 *   - description: from property description section
 *
 * @returns {Promise<import('../schema.ts').PartialBusinessData | null>}
 */
async function scrapeBookingDotCom(query, city) {
  // TODO: Implement booking.com scraping
  // Consider rate limiting and respectful scraping practices
  // Use User-Agent rotation and request delays
  console.log("[booking] Booking.com scraper not yet implemented");
  return null;
}

/**
 * Scrape Hostelworld listing.
 *
 * Hostelworld has a public API-like structure in their search.
 *
 * Steps:
 * 1. GET https://www.hostelworld.com/s?q=<query>&country=India
 * 2. Parse search results for best match
 * 3. GET property page: /hosteldetails.php/HostelName/City/PropertyID
 * 4. Extract:
 *    - Dorm and private room types with prices
 *    - Hostel amenities (wifi, kitchen, lockers, etc.)
 *    - Photo gallery (usually 10-30 photos)
 *    - Guest reviews with ratings by category
 *    - Overall rating (out of 10)
 *    - Description and "what makes this hostel special"
 *
 * Data mapping:
 *   - rooms: [{ name: "6-Bed Mixed Dorm", price: 450, description: "..." }]
 *   - amenities: ["Free WiFi", "Shared Kitchen", "Lockers", ...]
 *   - rating: hostelworld_score / 2 (convert 10-scale to 5-scale)
 *
 * @returns {Promise<import('../schema.ts').PartialBusinessData | null>}
 */
async function scrapeHostelworld(query, city) {
  // TODO: Implement Hostelworld scraping
  console.log("[booking] Hostelworld scraper not yet implemented");
  return null;
}
