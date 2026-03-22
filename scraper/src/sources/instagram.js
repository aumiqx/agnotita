/**
 * Instagram Scraper Source
 *
 * Finds a business's Instagram profile and scrapes recent posts for photos,
 * captions, and engagement data.
 *
 * Strategy:
 * 1. Search Instagram for the business name + city
 * 2. Match the best profile (verified, follower count, bio keywords)
 * 3. Scrape recent posts for photos and captions
 *
 * Uses: Apify Instagram Scraper actor (apify.com)
 * Env: APIFY_TOKEN
 *
 * Provides: photos, social.instagram, description (from bio)
 */

const APIFY_BASE = "https://api.apify.com/v2";

/**
 * @param {{ query: string, category: string, city: string }} params
 * @returns {Promise<import('../schema.ts').PartialBusinessData | null>}
 */
export async function scrapeInstagram({ query, category, city }) {
  const token = process.env.APIFY_TOKEN;

  if (!token) {
    console.warn("[instagram] No APIFY_TOKEN set. Skipping.");
    return null;
  }

  // Step 1: Search for the Instagram profile
  // Uses Apify's "instagram-search" actor to find profiles matching the business name.
  // The search query combines business name + city for disambiguation.
  //
  // Actor: apify/instagram-profile-scraper
  // Input: { search: "zostel varanasi", resultsLimit: 5, searchType: "user" }

  const searchQuery = city ? `${query} ${city}` : query;
  const profileUrl = await findInstagramProfile(searchQuery, token);

  if (!profileUrl) {
    console.warn("[instagram] Could not find matching profile for:", query);
    return null;
  }

  // Step 2: Scrape the profile for posts, bio, photos
  // Uses Apify's "instagram-scraper" actor.
  // Input: { directUrls: [profileUrl], resultsLimit: 20, resultsType: "posts" }
  //
  // Response includes:
  // - profilePic, bio, followersCount, postsCount
  // - For each post: displayUrl, caption, likesCount, timestamp

  const profileData = await scrapeProfile(profileUrl, token);

  if (!profileData) {
    return null;
  }

  // Step 3: Map to PartialBusinessData
  return {
    name: query,
    sources: ["instagram"],
    social: {
      instagram: profileUrl,
    },
    description: profileData.bio || null,
    photos: (profileData.posts || []).slice(0, 15).map((post) => ({
      url: post.displayUrl,
      source: "instagram",
      caption: truncateCaption(post.caption),
    })),
  };
}

/**
 * Find the best matching Instagram profile for a business.
 *
 * Heuristics for matching:
 * - Profile name or username contains business name keywords
 * - Bio mentions the city
 * - Prefers verified accounts
 * - Prefers accounts with >100 followers
 * - Prefers business/creator accounts over personal
 *
 * @returns {Promise<string | null>} Instagram profile URL
 */
async function findInstagramProfile(searchQuery, token) {
  // TODO: Implement Apify actor run
  // 1. Run apify/instagram-search with { search: searchQuery, resultsLimit: 5 }
  // 2. Wait for run to complete
  // 3. Fetch dataset items
  // 4. Score each profile and return best match URL
  //
  // For now, return null (stub)
  console.log("[instagram] Profile search not yet implemented for:", searchQuery);
  return null;
}

/**
 * Scrape an Instagram profile for posts, bio, and photos.
 *
 * @returns {Promise<{ bio: string, posts: Array<{ displayUrl: string, caption: string }> } | null>}
 */
async function scrapeProfile(profileUrl, token) {
  // TODO: Implement Apify actor run
  // 1. Run apify/instagram-scraper with { directUrls: [profileUrl], resultsLimit: 20 }
  // 2. Wait for completion
  // 3. Return { bio, posts: [{ displayUrl, caption }] }
  //
  // For now, return null (stub)
  console.log("[instagram] Profile scrape not yet implemented for:", profileUrl);
  return null;
}

/**
 * Truncate long Instagram captions for use as photo captions.
 * Keeps first sentence or first 120 chars.
 */
function truncateCaption(caption) {
  if (!caption) return null;
  const firstSentence = caption.split(/[.\n]/)[0];
  if (firstSentence.length <= 120) return firstSentence;
  return firstSentence.slice(0, 117) + "...";
}
