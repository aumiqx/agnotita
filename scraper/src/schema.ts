/**
 * Agnotita — Unified Business Schema
 *
 * Every scraper source outputs partial data conforming to subsets of this schema.
 * The merge utility combines partials into a single BusinessData object.
 * The generator reads BusinessData to hydrate templates.
 */

// ─── Sub-types ───────────────────────────────────────────────────────────────

export interface BusinessHours {
  mon?: string;
  tue?: string;
  wed?: string;
  thu?: string;
  fri?: string;
  sat?: string;
  sun?: string;
}

export interface BusinessPhoto {
  url: string;
  source: string; // "google-maps" | "instagram" | "booking" | "tripadvisor" | "zomato" | "justdial"
  caption?: string;
  localPath?: string; // filled after download
}

export interface BusinessReview {
  author: string;
  text: string;
  rating: number;
  date: string; // ISO date string
  source: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  tripadvisor?: string;
  zomato?: string;
  justdial?: string;
  website?: string;
}

export interface RoomInfo {
  name: string;
  price: number; // INR
  description?: string;
  photo?: string;
}

export interface MenuItem {
  name: string;
  price: number; // INR
  category?: string;
  photo?: string;
}

export interface ServiceInfo {
  name: string;
  price: number; // INR
  duration?: string; // e.g. "30 min"
}

export interface NearbyPlace {
  name: string;
  type: string; // "temple" | "beach" | "market" | "station" | etc.
  distance: string; // e.g. "1.2 km"
}

export interface BusyTimes {
  best: string; // e.g. "Weekday mornings, 7-9 AM"
  avoid: string; // e.g. "Saturday evenings"
}

// ─── Category ────────────────────────────────────────────────────────────────

export type BusinessCategory =
  | "hostel"
  | "hotel"
  | "cafe"
  | "restaurant"
  | "salon"
  | "coworking"
  | "gym"
  | "clinic"
  | "shop";

// ─── Main Schema ─────────────────────────────────────────────────────────────

export interface BusinessData {
  // Identity
  name: string;
  slug: string; // URL-safe, e.g. "zostel-varanasi"
  category: BusinessCategory;

  // Location
  address: string;
  city: string;
  state: string;
  coordinates?: Coordinates;

  // Contact
  phone?: string;
  email?: string;
  website?: string;

  // Ratings
  rating?: number; // 0-5
  reviewCount?: number;

  // Details
  hours?: BusinessHours;
  photos: BusinessPhoto[];
  reviews: BusinessReview[];
  amenities: string[];
  description?: string;
  longDescription?: string;

  // Social
  social: SocialLinks;

  // Category-specific (optional)
  rooms?: RoomInfo[]; // hotels, hostels
  menu?: MenuItem[]; // cafes, restaurants
  services?: ServiceInfo[]; // salons, clinics

  // Surroundings
  nearbyPlaces: NearbyPlace[];
  busyTimes?: BusyTimes;

  // Metadata
  scrapedAt: string; // ISO timestamp
  sources: string[]; // which scrapers contributed data
}

// ─── Partial used by individual scrapers ──────────────────────────────────────

/**
 * Each scraper source returns a Partial<BusinessData>.
 * Required: at least `name` and `sources`.
 */
export type PartialBusinessData = Partial<BusinessData> & {
  name: string;
  sources: string[];
};
