/**
 * Convert a business name to a URL-safe slug.
 *
 * "Zostel Varanasi" -> "zostel-varanasi"
 * "Third Wave Coffee, Indiranagar" -> "third-wave-coffee-indiranagar"
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // strip non-word chars (except spaces and hyphens)
    .replace(/[\s_]+/g, "-") // spaces and underscores to hyphens
    .replace(/-+/g, "-") // collapse consecutive hyphens
    .replace(/^-|-$/g, ""); // trim leading/trailing hyphens
}
