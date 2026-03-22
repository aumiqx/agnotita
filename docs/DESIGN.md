# Agnotita — System Design Document

> "For the unrecognized." Auto-generate premium websites for offline Indian businesses.

---

## Architecture Overview

Agnotita is a three-stage pipeline: **Scrape** -> **Generate** -> **Deploy**.

Each stage is independent, communicating through JSON files on disk. This means you can re-run any stage without affecting others, manually edit intermediate data, or plug in alternative implementations.

```
                           AGNOTITA ARCHITECTURE
  ============================================================================

  INPUT                     PROCESSING                          OUTPUT
  ─────                     ──────────                          ──────

  Google Maps query    ┌─────────────────────┐
  "Zostel Varanasi"    │     SCRAPER          │
  --category hostel    │                      │
         │             │  google-maps.js ─┐   │
         ▼             │  instagram.js  ──┤   │
  ┌──────────────┐     │  booking.js    ──┤   │    ┌──────────────────┐
  │ scraper/     │────▶│  zomato.js     ──┼──▶│───▶│ <slug>.json      │
  │ src/index.js │     │  tripadvisor.js──┤   │    │ (BusinessData)   │
  └──────────────┘     │  justdial.js   ──┘   │    └────────┬─────────┘
                       │                      │             │
                       │  merge.js            │             │
                       │  photo-downloader.js │             │
                       └─────────────────────┘             │
                                                            │
                       ┌─────────────────────┐             │
                       │     GENERATOR        │             │
                       │                      │             │
                       │  template-loader.js  │◀────────────┘
                       │  content-generator.js│
                       │  photo-processor.js  │    ┌──────────────────┐
                       │  build.js            │───▶│ Next.js static   │
                       │                      │    │ site in out/     │
                       └─────────────────────┘    └────────┬─────────┘
                                                            │
                       ┌─────────────────────┐             │
                       │     PIPELINE         │             │
                       │                      │◀────────────┘
                       │  subdomain.js        │
                       │  deploy.js (FTP)     │    ┌──────────────────┐
                       │  crm.js              │───▶│ Live website     │
                       │                      │    │ + CRM CSV        │
                       └─────────────────────┘    └──────────────────┘
```

---

## Data Flow

### Stage 1: Scrape

```
Google Maps query
       │
       ▼
  ┌────────────────────────────────────────────────────────┐
  │  index.js                                              │
  │                                                        │
  │  1. Parse CLI args (query, category, city)             │
  │  2. Select sources based on category:                  │
  │     hostel  → [google-maps, booking, tripadvisor,      │
  │                instagram, justdial]                     │
  │     cafe    → [google-maps, zomato, instagram,         │
  │                justdial]                                │
  │     salon   → [google-maps, justdial, instagram]       │
  │                                                        │
  │  3. Run all sources concurrently (Promise.allSettled)   │
  │  4. Each source returns PartialBusinessData or null     │
  │  5. merge.js combines partials into unified schema      │
  │  6. photo-downloader.js fetches and optimizes photos    │
  │  7. Write <slug>.json to scraper/output/                │
  └────────────────────────────────────────────────────────┘
```

**Merge strategy:**

| Field type        | Strategy                                       |
|-------------------|------------------------------------------------|
| Scalar (name)     | Highest-priority source wins                   |
| Numeric (rating)  | Weighted average by source priority             |
| Array (photos)    | Deduplicated union from all sources             |
| Object (hours)    | Deep merge (later source fills gaps)            |
| Category (rooms)  | Source with most items wins                     |

**Source priority** (highest = most authoritative):

```
google-maps (7) > tripadvisor (6) > booking (5) > zomato (4)
> hostelworld (3) > instagram (2) > justdial (1)
```

### Stage 2: Generate

```
<slug>.json + template name
       │
       ▼
  ┌────────────────────────────────────────────────────────┐
  │  index.js                                              │
  │                                                        │
  │  1. Load business JSON                                 │
  │  2. template-loader.js:                                │
  │     a. Copy template dir to generator/output/<slug>/   │
  │     b. Write business.json into src/data/              │
  │     c. Write seo.json (schema.org structured data)     │
  │     d. Patch package.json with business name           │
  │                                                        │
  │  3. content-generator.js (Claude API):                 │
  │     a. Generate/enhance description                    │
  │     b. Generate "A day at..." narrative                │
  │     c. Generate FAQ (10 questions)                     │
  │     d. Generate neighbourhood guide                    │
  │     e. Generate SEO meta description                   │
  │     f. Write generated.json into src/data/             │
  │                                                        │
  │  4. photo-processor.js:                                │
  │     a. Copy photos to public/photos/                   │
  │     b. Generate WebP variants (320-1920px)             │
  │     c. Generate blur placeholders (base64)             │
  │     d. Write photos.json manifest into src/data/       │
  │                                                        │
  │  5. build.js:                                          │
  │     a. npm install                                     │
  │     b. npm run build (next build + export)             │
  │     c. Verify out/ directory exists                    │
  │     d. Report stats (pages, total size)                │
  └────────────────────────────────────────────────────────┘
```

### Stage 3: Deploy

```
out/ directory
       │
       ▼
  ┌────────────────────────────────────────────────────────┐
  │  deploy.js                                             │
  │                                                        │
  │  1. subdomain.js:                                      │
  │     - Create <slug>.domain.com via Hostinger API       │
  │     - Or via cPanel UAPI (fallback)                    │
  │     - Points to /public_html/<slug>/                   │
  │                                                        │
  │  2. FTP upload:                                        │
  │     - Connect to Hostinger FTP (TLS)                   │
  │     - Create remote directory structure                │
  │     - Upload all files from out/ with retry logic      │
  │     - Report progress                                  │
  │                                                        │
  │  3. crm.js:                                            │
  │     - Add business to CRM spreadsheet (CSV/JSON)       │
  │     - Record live URL, status, contact details         │
  │     - Used by calling team for outreach                │
  └────────────────────────────────────────────────────────┘
```

---

## Template Structure

Every template follows this standard layout. The generator writes data files; templates read them.

```
templates/<category>/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (fonts, metadata)
│   │   ├── page.tsx            # Home page (hero, highlights)
│   │   ├── rooms/page.tsx      # Rooms listing (hotels/hostels)
│   │   ├── menu/page.tsx       # Menu page (cafes/restaurants)
│   │   ├── gallery/page.tsx    # Photo gallery
│   │   ├── reviews/page.tsx    # Guest reviews
│   │   ├── about/page.tsx      # About + neighbourhood
│   │   └── contact/page.tsx    # Contact + map + hours
│   │
│   ├── components/
│   │   ├── Hero.tsx            # Full-width hero with CTA
│   │   ├── PhotoGallery.tsx    # Responsive photo grid
│   │   ├── ReviewCard.tsx      # Single review display
│   │   ├── AmenityList.tsx     # Icons + labels
│   │   ├── ContactForm.tsx     # WhatsApp + phone CTA
│   │   ├── MapEmbed.tsx        # Google Maps embed
│   │   ├── FAQ.tsx             # Accordion FAQ section
│   │   ├── NearbyPlaces.tsx    # Grid of nearby attractions
│   │   └── Footer.tsx
│   │
│   ├── data/                   # *** GENERATOR WRITES HERE ***
│   │   ├── business.json       # Scraped business data
│   │   ├── generated.json      # AI-generated content
│   │   ├── seo.json            # SEO metadata + structured data
│   │   └── photos.json         # Photo manifest with variants
│   │
│   ├── assets/                 # Template static assets (icons, logos)
│   └── styles/                 # Template-specific CSS
│
├── public/
│   └── photos/                 # *** GENERATOR WRITES HERE ***
│       ├── hero.webp
│       ├── hero.jpg
│       ├── photo-000-320w.webp
│       ├── photo-000-640w.webp
│       ├── photo-000-960w.webp
│       └── ...
│
├── next.config.ts              # output: 'export' (REQUIRED)
├── package.json
└── tsconfig.json
```

### How templates consume data

Templates import data from `src/data/` using standard JSON imports:

```typescript
// In any component or page:
import business from "@/data/business.json";
import generated from "@/data/generated.json";
import seoData from "@/data/seo.json";
import photos from "@/data/photos.json";

// Use directly:
<h1>{business.name}</h1>
<p>{generated.description}</p>
```

### Template data contract

Every template MUST handle these cases gracefully:
- Missing optional fields (rooms, menu, services) -> hide the section
- Empty photo array -> show placeholder
- No AI content (generated.json missing) -> fall back to business.json
- No reviews -> show "No reviews yet" state

---

## Adding a New Template Category

To add a new template (e.g., "coworking"):

### 1. Create the template directory

```bash
mkdir -p templates/coworking/src/{app,components,data,assets,styles}
mkdir -p templates/coworking/public/photos
```

### 2. Create Next.js config

`templates/coworking/next.config.ts`:
```typescript
import type { NextConfig } from "next";
const config: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};
export default config;
```

### 3. Create pages specific to this category

For coworking, you might add:
- `src/app/plans/page.tsx` — membership plans
- `src/app/amenities/page.tsx` — detailed amenity list
- `src/app/events/page.tsx` — community events

### 4. Register the category in the scraper

In `scraper/src/index.js`, add to `SOURCES_BY_CATEGORY`:
```javascript
coworking: [scrapeGoogleMaps, scrapeInstagram, scrapeJustdial],
```

### 5. Add category to the schema

In `scraper/src/schema.ts`, add to `BusinessCategory`:
```typescript
export type BusinessCategory = ... | "coworking";
```

### 6. Add schema.org type mapping

In `generator/src/template-loader.js`, add to `categoryToSchemaType`:
```javascript
coworking: "OfficeSpace",
```

### 7. Add category-specific fields to the schema (optional)

If coworking spaces need unique data (e.g., membership plans), add to `BusinessData`:
```typescript
plans?: [{ name: string, price: number, period: string, features: string[] }]
```

### 8. Write the scraper source (optional)

If there's a category-specific platform (like Zomato for restaurants), create a new source:
```javascript
// scraper/src/sources/coworker.js
export async function scrapeCoworker({ query, category, city }) { ... }
```

---

## Directory Structure

```
agnotita/
├── scraper/
│   ├── src/
│   │   ├── index.js                 # CLI entry point
│   │   ├── schema.ts               # TypeScript type definitions
│   │   ├── sources/
│   │   │   ├── google-maps.js       # SerpAPI / Outscraper
│   │   │   ├── instagram.js         # Apify Instagram scraper
│   │   │   ├── booking.js           # Booking.com / Hostelworld
│   │   │   ├── zomato.js            # Zomato (food)
│   │   │   ├── tripadvisor.js       # TripAdvisor reviews
│   │   │   └── justdial.js          # JustDial (service businesses)
│   │   └── utils/
│   │       ├── merge.js             # Multi-source data merger
│   │       ├── photo-downloader.js  # Download + optimize photos
│   │       └── slugify.js           # URL-safe slug generation
│   └── output/                      # Scraped business JSON files
│
├── generator/
│   ├── src/
│   │   ├── index.js                 # CLI entry point
│   │   ├── template-loader.js       # Copy template + inject data
│   │   ├── content-generator.js     # Claude API content generation
│   │   ├── photo-processor.js       # Photo optimization + manifest
│   │   └── build.js                 # Run next build
│   └── output/                      # Generated site projects
│
├── pipeline/
│   ├── src/
│   │   ├── deploy.js                # FTP upload to Hostinger
│   │   ├── subdomain.js             # Subdomain creation (API/cPanel)
│   │   └── crm.js                   # CRM spreadsheet generation
│   └── crm/                         # CRM output files
│
├── templates/
│   ├── hostel/                      # Hostel template (Next.js)
│   ├── hotel/                       # Hotel template (Next.js)
│   ├── cafe/                        # (planned)
│   ├── restaurant/                  # (planned)
│   └── salon/                       # (planned)
│
├── docs/
│   └── DESIGN.md                    # This file
│
├── package.json                     # Root scripts
├── .env.example                     # Required environment variables
└── .gitignore
```

---

## Deployment Strategy

### Hosting: Hostinger Shared Hosting

Chosen for cost efficiency at scale. Each business gets a subdomain.

```
agnotita.com                  # Main site (not part of this project)
zostel-varanasi.agnotita.com  # Generated site
madpackers-delhi.agnotita.com # Generated site
...
```

### DNS and SSL

- Hostinger provides wildcard SSL for `*.agnotita.com`
- Subdomains are created via hPanel API or cPanel UAPI
- Each subdomain maps to `/public_html/<slug>/`
- DNS propagation is usually instant on Hostinger's nameservers

### File structure on server

```
/public_html/
├── zostel-varanasi/
│   ├── index.html
│   ├── rooms.html
│   ├── gallery.html
│   ├── _next/
│   │   └── static/
│   └── photos/
│       ├── hero.webp
│       └── ...
├── madpackers-delhi/
│   └── ...
└── ...
```

### Scaling considerations

- **Per-site cost**: ~0 (shared hosting, subdomain)
- **Storage**: ~5-15 MB per site (static HTML + photos)
- **Bandwidth**: Hostinger shared plans include 100 GB/month
- **Estimated capacity**: 500+ sites on a single Premium plan
- **Upgrade path**: Move to VPS or CDN (Cloudflare Pages) when needed

### Future: CDN-based deployment

When scale demands it, switch from FTP to:
1. **Cloudflare Pages** — deploy via Wrangler CLI, free for 500 deploys/month
2. **Netlify** — deploy via CLI, custom domains via API
3. **Vercel** — if per-site SSR is ever needed

The generator output (static HTML in `out/`) is deployment-target agnostic. Only `pipeline/src/deploy.js` needs to change.

---

## Environment Variables

All secrets are read from environment variables. Never hardcoded.

### Scraper

| Variable         | Required | Source                                |
|------------------|----------|---------------------------------------|
| `SERPAPI_KEY`    | Yes*     | serpapi.com — Google Maps search      |
| `OUTSCRAPER_KEY` | Alt*     | outscraper.com — alternative to SerpAPI |
| `APIFY_TOKEN`   | Optional | apify.com — Instagram, TripAdvisor   |

*At least one of SERPAPI_KEY or OUTSCRAPER_KEY is required.

### Generator

| Variable            | Required | Source                             |
|---------------------|----------|------------------------------------|
| `ANTHROPIC_API_KEY` | Optional | anthropic.com — content generation |

### Pipeline

| Variable            | Required | Source                          |
|---------------------|----------|---------------------------------|
| `FTP_HOST`          | Yes      | Hostinger FTP server            |
| `FTP_USER`          | Yes      | Hostinger FTP username          |
| `FTP_PASSWORD`      | Yes      | Hostinger FTP password          |
| `FTP_BASE_DIR`      | Optional | Default: /public_html           |
| `BASE_DOMAIN`       | Optional | e.g., agnotita.com              |
| `HOSTINGER_API_KEY` | Optional | Hostinger hPanel API            |
| `CPANEL_URL`        | Optional | cPanel URL (fallback)           |
| `CPANEL_USER`       | Optional | cPanel username                 |
| `CPANEL_TOKEN`      | Optional | cPanel API token                |

---

## Technology Choices

| Component        | Technology          | Rationale                                            |
|------------------|---------------------|------------------------------------------------------|
| Scraper runtime  | Node.js (ESM)       | Same runtime as templates; native fetch; good async  |
| Template engine  | Next.js 15          | Static export; React ecosystem; SEO; image optimization |
| Styling          | Tailwind CSS v4     | Consistent with aumiqx stack; rapid prototyping      |
| AI content       | Claude (Sonnet)     | Best quality for narrative content; aumiqx has API access |
| Image processing | sharp               | Industry standard; WebP support; fast                |
| FTP client       | basic-ftp           | Reliable; TLS support; active maintenance            |
| Type definitions | TypeScript (schema) | Schema is .ts for type safety; runtime code is .js for simplicity |
| Hosting          | Hostinger shared    | Cost: Rs 150/month; supports 500+ static sites      |

### Why not a database?

The entire system uses JSON files on disk as its data layer. Reasons:
- Each business is self-contained (one JSON file)
- No concurrent writes (pipeline is sequential per business)
- Easy to inspect, edit, and version control
- No infra to manage
- If needed later, the CRM module can push to Google Sheets or Airtable

### Why not a monorepo with shared packages?

- Each stage (scraper, generator, pipeline) should be independently runnable
- Templates are self-contained Next.js projects with their own dependencies
- Adding shared packages would complicate the "fork and modify" workflow
- The schema.ts file serves as the single source of truth for data shape

---

## Error Handling

Each stage handles failures independently:

### Scraper
- Individual sources can fail without blocking others (`Promise.allSettled`)
- If ALL sources fail, the scraper exits with error
- If a source returns partial data, it still contributes to the merge

### Generator
- Missing API key -> writes placeholder content (still builds)
- Missing photos -> templates show placeholder images
- Build failure -> logs error with full stderr/stdout for debugging

### Pipeline
- Subdomain creation failure -> logs warning, continues with upload
- FTP upload failure -> retries each file 3 times
- CRM write failure -> logs error, does not block deployment

---

## CLI Quick Reference

```bash
# Full pipeline for a single business
npm run scrape -- "Zostel Varanasi" -c hostel
npm run generate -- scraper/output/zostel-varanasi.json -t hostel
npm run deploy -- generator/output/zostel-varanasi/out -s zostel-varanasi

# Scraper options
node scraper/src/index.js "Name" -c category --city City --skip-photos

# Generator options
node generator/src/index.js data.json -t template --skip-content --skip-build

# Deploy options
node pipeline/src/deploy.js out/ -s subdomain --dry-run

# CRM
node pipeline/src/crm.js --input scraper/output/
node pipeline/src/crm.js --add data.json --url https://slug.agnotita.com
```
