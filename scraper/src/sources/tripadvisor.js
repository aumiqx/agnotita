/**
 * TripAdvisor Scraper Source
 *
 * Scrapes TripAdvisor for reviews, photos, and traveller insights.
 * Particularly valuable for hotels, hostels, and restaurants.
 *
 * Strategy:
 * 1. Search TripAdvisor for the business name + city
 * 2. Scrape the listing page for reviews, photos, nearby attractions
 * 3. Extract "traveller type" insights and busy times
 *
 * Uses: Apify TripAdvisor scraper actor
 * Env: APIFY_TOKEN
 *
 * Provides: reviews, photos, nearbyPlaces, rating, reviewCount,
 *           busyTimes, social.tripadvisor
 */

/**
 * @param {{ query: string, category: string, city: string }} params
 * @returns {Promise<import('../schema.ts').PartialBusinessData | null>}
 */
export async function scrapeTripAdvisor({ query, category, city }) {
  // Relevant for hospitality and food categories
  if (!["hostel", "hotel", "restaurant", "cafe"].includes(category)) {
    return null;
  }

  const token = process.env.APIFY_TOKEN;

  if (!token) {
    console.warn("[tripadvisor] No APIFY_TOKEN set. Skipping.");
    return null;
  }

  console.log(`[tripadvisor] Scraping for: ${query}`);

  /**
   * Implementation plan:
   *
   * 1. SEARCH
   *    Use Apify actor: maxcrawler/tripadvisor
   *    Input: {
   *      searchQuery: "Zostel Varanasi",
   *      maxItems: 1,
   *      includeReviews: true,
   *      maxReviews: 30,
   *      includeNearby: true
   *    }
   *
   * 2. EXTRACT from actor response:
   *    - name, address, rating (out of 5), numberOfReviews
   *    - reviews[]: { title, text, rating, tripDate, user.username, publishedDate }
   *    - photos[]: { url, caption }
   *    - nearbyAttractions[]: { name, type, distance }
   *    - rankingString: e.g., "#3 of 45 hostels in Varanasi"
   *    - subRatings: { location, cleanliness, service, value }
   *
   * 3. MAP to PartialBusinessData:
   *    - reviews -> reviews[] with source: "tripadvisor"
   *    - photos -> photos[] with source: "tripadvisor"
   *    - nearbyAttractions -> nearbyPlaces[]
   *    - Extract busyTimes from review date distribution:
   *      "Most reviews in Oct-Dec" -> best: "October to December"
   *    - social.tripadvisor = listing URL
   *
   * 4. BUSY TIMES analysis:
   *    - Group reviews by month
   *    - Find peak months (highest review volume = busiest)
   *    - Find quiet months (lowest review volume = best time to visit)
   *    - Map to: busyTimes: { best: "...", avoid: "..." }
   */

  // TODO: Implement TripAdvisor scraping via Apify
  console.log("[tripadvisor] Scraper not yet implemented");
  return null;
}
