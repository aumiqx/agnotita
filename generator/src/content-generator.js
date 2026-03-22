/**
 * AI Content Generator
 *
 * Uses Claude API to generate high-quality content that scrapers cannot provide:
 * - Business description (if missing or too short)
 * - Long-form "A day at..." narrative
 * - FAQ section (10 questions)
 * - SEO-optimized meta descriptions
 * - Neighbourhood guide
 *
 * Env: ANTHROPIC_API_KEY
 */

import { writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-20250514";

/**
 * Generate all missing content for a business site.
 *
 * Reads existing business.json, generates content, writes generated.json
 * that templates import alongside business.json.
 *
 * @param {import('../../scraper/src/schema.ts').BusinessData} businessData
 * @param {string} siteDir - the generated site directory
 */
export async function generateContent(businessData, siteDir) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.warn("[content] No ANTHROPIC_API_KEY set. Generating placeholder content.");
    await writePlaceholderContent(businessData, siteDir);
    return;
  }

  const generated = {};

  // Generate all content in parallel where possible
  const [description, narrative, faq, neighbourhood, metaDesc] = await Promise.allSettled([
    generateDescription(businessData, apiKey),
    generateNarrative(businessData, apiKey),
    generateFAQ(businessData, apiKey),
    generateNeighbourhoodGuide(businessData, apiKey),
    generateMetaDescription(businessData, apiKey),
  ]);

  if (description.status === "fulfilled") {
    generated.description = description.value;
  }
  if (narrative.status === "fulfilled") {
    generated.narrative = narrative.value;
  }
  if (faq.status === "fulfilled") {
    generated.faq = faq.value;
  }
  if (neighbourhood.status === "fulfilled") {
    generated.neighbourhood = neighbourhood.value;
  }
  if (metaDesc.status === "fulfilled") {
    generated.metaDescription = metaDesc.value;
  }

  // Write generated content
  const dataDir = join(siteDir, "src", "data");
  await writeFile(
    join(dataDir, "generated.json"),
    JSON.stringify(generated, null, 2),
    "utf-8"
  );

  console.log("[content] Generated content written to generated.json");
}

// ─── Content generators ──────────────────────────────────────────────────────

/**
 * Generate or enhance the business description.
 * Only generates if the existing description is missing or under 100 chars.
 */
async function generateDescription(data, apiKey) {
  if (data.description && data.description.length > 200) {
    return data.description;
  }

  const prompt = `Write a compelling 2-3 paragraph description for "${data.name}", a ${data.category} in ${data.city}, ${data.state}, India.

Use this context:
- Rating: ${data.rating}/5 (${data.reviewCount} reviews)
- Amenities: ${data.amenities?.join(", ") || "not available"}
- Address: ${data.address}
${data.description ? `- Existing description: ${data.description}` : ""}

Guidelines:
- Write in third person
- Mention the city and neighbourhood
- Highlight what makes this place special
- Include practical details (location, vibe)
- Keep it authentic — don't oversell
- No emojis, no marketing fluff
- 150-250 words`;

  return await callClaude(prompt, apiKey);
}

/**
 * Generate a "A day at..." narrative.
 * Immersive first-person story that helps visitors imagine their experience.
 */
async function generateNarrative(data, apiKey) {
  const reviewSnippets = (data.reviews || [])
    .slice(0, 10)
    .map((r) => `"${r.text}"`)
    .join("\n");

  const prompt = `Write a "A Day at ${data.name}" narrative — a vivid, immersive story that takes the reader through a typical day at this ${data.category} in ${data.city}.

Context:
- Category: ${data.category}
- City: ${data.city}, ${data.state}
- Amenities: ${data.amenities?.join(", ") || "unknown"}
- Rating: ${data.rating}/5
${data.rooms?.length ? `- Room types: ${data.rooms.map((r) => r.name).join(", ")}` : ""}
${data.menu?.length ? `- Menu highlights: ${data.menu.slice(0, 5).map((m) => m.name).join(", ")}` : ""}
${data.nearbyPlaces?.length ? `- Nearby: ${data.nearbyPlaces.map((p) => p.name).join(", ")}` : ""}

Guest reviews for tone/details:
${reviewSnippets || "No reviews available"}

Guidelines:
- Write in second person ("You wake up to...")
- Follow a morning-to-night arc
- Include sensory details (sounds, smells, textures)
- Mention real nearby places and local food
- Keep it grounded — use review details for authenticity
- 400-600 words
- No emojis`;

  return await callClaude(prompt, apiKey);
}

/**
 * Generate FAQ section — 10 questions a potential visitor would ask.
 */
async function generateFAQ(data, apiKey) {
  const prompt = `Generate 10 frequently asked questions (and answers) for "${data.name}", a ${data.category} in ${data.city}, ${data.state}.

Context:
- Address: ${data.address}
- Phone: ${data.phone || "not listed"}
- Rating: ${data.rating}/5
- Amenities: ${data.amenities?.join(", ") || "not listed"}
${data.hours ? `- Hours: ${JSON.stringify(data.hours)}` : ""}
${data.rooms?.length ? `- Room types: ${data.rooms.map((r) => `${r.name} (Rs ${r.price})`).join(", ")}` : ""}
${data.menu?.length ? `- Has menu with ${data.menu.length} items` : ""}
${data.busyTimes ? `- Best time: ${data.busyTimes.best}, Avoid: ${data.busyTimes.avoid}` : ""}

Guidelines:
- Questions a real traveller/customer would ask
- Include practical questions (booking, pricing, transport)
- Include experience questions (what's it like, best time to visit)
- Answers should be 2-3 sentences each
- Use real data from context — don't make up prices or details
- If data is missing, say "Contact the ${data.category} directly for..."

Return as JSON array: [{ "question": "...", "answer": "..." }]`;

  const response = await callClaude(prompt, apiKey);

  // Parse JSON from response
  try {
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch {
    // If parsing fails, return as raw text
  }

  return response;
}

/**
 * Generate a neighbourhood/area guide.
 */
async function generateNeighbourhoodGuide(data, apiKey) {
  const nearbyList = (data.nearbyPlaces || [])
    .map((p) => `${p.name} (${p.type}, ${p.distance})`)
    .join("\n");

  const prompt = `Write a neighbourhood guide for the area around "${data.name}" in ${data.city}, ${data.state}.

Known nearby places:
${nearbyList || "No specific places listed"}

Guidelines:
- Describe the neighbourhood's character and vibe
- Mention walkable attractions, food spots, markets
- Include practical transport info (nearest station, auto rates)
- Mention safety and best times to explore
- 200-300 words
- No emojis`;

  return await callClaude(prompt, apiKey);
}

/**
 * Generate SEO meta description (155 chars max).
 */
async function generateMetaDescription(data, apiKey) {
  const prompt = `Write an SEO meta description for "${data.name}", a ${data.category} in ${data.city}. Rating: ${data.rating}/5. Max 155 characters. No emojis.`;

  return await callClaude(prompt, apiKey);
}

// ─── Claude API ──────────────────────────────────────────────────────────────

/**
 * Call Claude API and return the text response.
 */
async function callClaude(prompt, apiKey) {
  const response = await fetch(ANTHROPIC_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
    signal: AbortSignal.timeout(60000),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

// ─── Placeholder content ─────────────────────────────────────────────────────

/**
 * Write placeholder content when no API key is available.
 * Templates should still render correctly with this data.
 */
async function writePlaceholderContent(businessData, siteDir) {
  const generated = {
    description: businessData.description || `${businessData.name} is a ${businessData.category} located in ${businessData.city}, ${businessData.state}. Visit us for a great experience.`,
    narrative: `Imagine a day at ${businessData.name}. You arrive in ${businessData.city} and find yourself at one of the city's finest ${businessData.category}s. The atmosphere is welcoming, the service is excellent, and the experience is unforgettable.`,
    faq: [
      { question: `Where is ${businessData.name} located?`, answer: businessData.address || `In ${businessData.city}, ${businessData.state}.` },
      { question: `What is the rating of ${businessData.name}?`, answer: `${businessData.name} has a rating of ${businessData.rating || "N/A"} out of 5.` },
      { question: `How can I contact ${businessData.name}?`, answer: businessData.phone ? `You can call ${businessData.phone}.` : `Please visit their website or social media pages for contact details.` },
    ],
    neighbourhood: `${businessData.name} is located in ${businessData.city}, ${businessData.state}. The area offers a variety of attractions and amenities for visitors.`,
    metaDescription: `${businessData.name} — ${businessData.category} in ${businessData.city}. ${businessData.rating ? `Rated ${businessData.rating}/5.` : ""} Book now.`.slice(0, 155),
  };

  const dataDir = join(siteDir, "src", "data");
  await writeFile(
    join(dataDir, "generated.json"),
    JSON.stringify(generated, null, 2),
    "utf-8"
  );

  console.log("[content] Placeholder content written (no API key)");
}
