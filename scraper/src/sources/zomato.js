/**
 * Zomato Scraper Source
 *
 * For cafes and restaurants — scrapes Zomato listing for menu, photos,
 * reviews, and dining details.
 *
 * Strategy:
 * 1. Search Zomato for the restaurant name + city
 * 2. Scrape the listing page
 * 3. Extract menu, photos, reviews, hours, amenities
 *
 * Uses: Direct HTML scraping with fetch + cheerio (Zomato has no public API)
 * Alternative: Apify Zomato scraper actor
 * Env: APIFY_TOKEN (optional)
 *
 * Provides: menu, photos, reviews, rating, reviewCount, amenities, hours, description
 */

/**
 * @param {{ query: string, category: string, city: string }} params
 * @returns {Promise<import('../schema.ts').PartialBusinessData | null>}
 */
export async function scrapeZomato({ query, category, city }) {
  // Only relevant for food categories
  if (!["cafe", "restaurant"].includes(category)) {
    return null;
  }

  console.log(`[zomato] Scraping for: ${query}`);

  /**
   * Implementation plan:
   *
   * 1. SEARCH
   *    URL: https://www.zomato.com/<city>/search?q=<query>
   *    - Parse search results page
   *    - Match by restaurant name similarity (Levenshtein distance)
   *    - Extract restaurant page URL
   *
   * 2. LISTING PAGE
   *    URL: https://www.zomato.com/<city>/<restaurant-slug>/info
   *    Extract:
   *    - Name, address, cuisine types
   *    - Rating (out of 5), number of reviews/votes
   *    - Known for (popular dishes)
   *    - Average cost for two
   *    - Opening hours
   *    - Features: "Serves Alcohol", "Indoor Seating", "WiFi", etc.
   *
   * 3. MENU
   *    URL: https://www.zomato.com/<city>/<restaurant-slug>/menu
   *    Extract:
   *    - Menu items: name, price, category (starters, mains, etc.)
   *    - Menu photos (if available)
   *    Map to: menu: [{ name: "Masala Dosa", price: 180, category: "South Indian" }]
   *
   * 4. PHOTOS
   *    URL: https://www.zomato.com/<city>/<restaurant-slug>/photos
   *    Extract:
   *    - Photo URLs (food, ambience, menu)
   *    - Photo captions
   *    Map to: photos: [{ url, source: "zomato", caption }]
   *
   * 5. REVIEWS
   *    URL: https://www.zomato.com/<city>/<restaurant-slug>/reviews
   *    Extract:
   *    - Reviewer name, rating, review text, date
   *    - Filter for reviews in English
   *    Map to: reviews: [{ author, text, rating, date, source: "zomato" }]
   *
   * 6. MERGE
   *    Combine all data into PartialBusinessData.
   *    - amenities = extracted features
   *    - description = "Known for X, Y. Average cost for two: Rs Z."
   */

  // TODO: Implement Zomato scraping
  // Consider: Zomato uses heavy client-side rendering.
  // May need to use Apify browser-based scraper or Playwright.
  console.log("[zomato] Scraper not yet implemented");
  return null;
}
