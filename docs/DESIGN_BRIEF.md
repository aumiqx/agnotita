# Design Brief: Agnotita Hotel & Hostel Templates

> Research compiled from analysis of 9+ award-winning hospitality websites.
> This document drives the complete rebuild of both the hotel and hostel templates to Awwwards quality.

---

## Table of Contents

1. [Site-by-Site Analysis](#site-by-site-analysis)
2. [Top 10 Design Patterns to Steal](#top-10-design-patterns-to-steal)
3. [Typography Recommendations](#typography-recommendations)
4. [Color Palettes](#color-palettes)
5. [Section-by-Section Inspiration Mapping](#section-by-section-inspiration-mapping)
6. [Advanced Framer Motion Techniques](#advanced-framer-motion-techniques)
7. [What Makes These Sites NOT Look Like Templates](#what-makes-these-sites-not-look-like-templates)

---

## Site-by-Site Analysis

### 1. Casa Angelina (casangelina.com) -- Amalfi Coast

**What makes the hero section special:**
When you arrive on the site, you are treated to a cinematic view -- the photo pans from the hotel as an anchor point across an ocean sunset and lands on the Casa Angelina logo. Background classical music plays. The hero is not a static image -- it is a directed cinematic moment that puts you physically at the property before you read a single word.

**Scroll effects:**
Multi-layer parallax scrolling that creates depth between the clifftop hotel, the sea, and the sky. Sections transition with smooth fade-and-slide reveals. The entire page feels like peeling through layers of a postcard.

**Typography strategy:**
Minimal, refined serif for the logo and headings. Clean sans-serif for body copy. Extreme restraint -- very few words on screen at any time. The typography never competes with the photography.

**Color palette:**
White-dominant with Mediterranean blue accents. The site is almost entirely white space + full-bleed photography. No dark mode. The white amplifies the luminosity of the Amalfi Coast photography.

**Photo handling:**
Full-bleed, edge-to-edge photographs that bleed past viewport boundaries. Photos are the architecture of the page -- text sits on top of or between massive image blocks. Every photo is professionally lit with golden-hour warmth.

**Micro-interactions:**
Subtle hover states on navigation items. Smooth page transitions that feel like turning pages of a coffee-table book. No gimmicks -- every interaction serves the luxury narrative.

**Emotional narrative arc:**
Arrival (cinematic hero) -> Discovery (rooms, views) -> Desire (dining, spa) -> Action (booking). The site makes you feel like you are already there.

**Mobile experience:**
Simplified to stacked full-bleed images with minimal text overlays. The cinematic quality translates by making each scroll a new "frame" of the experience.

---

### 2. DDD Hotel (dddhotel.jp) -- Tokyo

**What makes the hero section special:**
A fullscreen menu overlays the entire screen with a parallax effect behind it. Photography is the content -- minimal text explanation. The hero uses WebGL rendering for subtle texture and depth effects on images. The design philosophy is "photographs speak, words step aside."

**Scroll effects:**
GSAP-powered scroll animations with Three.js WebGL layer for subtle image distortion on scroll. ScrollToPlugin for precision navigation. DrawSVGPlugin for animated line art elements. CustomEase for organic, non-linear motion curves.

**Typography strategy:**
Extreme kerning adjustment on every letter, treated as if it were printed editorial design. Sans-serif, ultra-light weight for body, medium weight for navigation. Japanese/English bilingual typography handled with distinct weight hierarchies. Typography as graphic design, not just text.

**Color palette:**
Near-monochrome. Black, white, and grey dominate. Photography provides all color. The restraint makes each image feel like a gallery piece.

**Photo handling:**
Photography is presented as art, not decoration. Images have generous negative space around them. No overlapping, no grids -- each photo gets its own moment. Subtle WebGL distortion on hover creates a living, breathing quality.

**Micro-interactions:**
Custom cursor element that changes form based on context (pointer, drag, expand). Animated text reveals with character-by-character staggering. Menu items with parallax displacement on hover. Scroll-triggered SVG line drawings.

**Emotional narrative arc:**
Curiosity (minimal hero) -> Intrigue (art gallery vibes) -> Understanding (the three Ds: Design, Development, Destination) -> Connection (food, culture, stay).

**Mobile experience:**
Stripped to essential photography and navigation. The WebGL effects gracefully degrade. Touch interactions replace cursor-based micro-interactions with tap reveals.

**Tech stack:** Nuxt.js, GSAP (DrawSVGPlugin, CustomEase, ScrollToPlugin), Three.js, WebGL.

---

### 3. Grand Hotel Miramare (grandhotelmiramare.it) -- Italian Riviera

**What makes the hero section special:**
A broken-grid layout with colorful imagery that immediately signals this is not a typical luxury hotel site. Bold, all-caps typography with angled italic fonts overlap and interplay with photography. The hero feels like an editorial magazine spread, not a website.

**Scroll effects:**
Parallax scrolling creates depth between text layers and image layers. Sections reveal with staggered animations. The broken grid shifts and realigns as you scroll, creating a kinetic, editorial rhythm.

**Typography strategy:**
Customized Engravers Gothic Bold -- uppercase-only, extended letter-spacing. This font was modified specifically for the brand to convey stability and iconic status. Complemented by italic, angled display fonts for accent titles. The typography IS the design -- it is as prominent as the photography.

**Color palette:**
Bright, unexpected for luxury: reds, yellows, warm terracottas, and Mediterranean blues. Ample white space prevents the brightness from feeling chaotic. Proves that luxury does not require dark/muted palettes.

**Photo handling:**
Broken grid with asymmetric photo placement. Images overlap text blocks. Photos break out of their containers. Some images are masked with geometric shapes. The layout feels curated and intentional, like a magazine art director placed each element.

**Micro-interactions:**
Custom cursor that transforms on video sections (play icon). Hover effects on navigation that feel weighty and intentional. Image reveals with subtle scale transitions. Text elements that shift position slightly on scroll.

**Emotional narrative arc:**
Excitement (bold colors, editorial layout) -> Romance (the Italian Riviera story) -> Indulgence (dining, spa, rooms) -> Belonging ("Estate Italiana" lifestyle).

**Mobile experience:**
The broken grid simplifies to a single column but retains the bold typography scale and color confidence. Images remain large. The editorial personality survives the responsive transformation.

---

### 4. Badrutt's Palace (badruttspalace.com) -- St. Moritz

**What makes the hero section special:**
A fullscreen video slideshow that rotates short cinematic clips -- fresh floral arrangements, snow-peaked mountains, Christmas splendors. Each clip is 5-8 seconds, creating an ambient, looping narrative. The effect is like looking through a window at the hotel.

**Scroll effects:**
Smooth parallax on background images. Sections slide in with opacity and position transitions. The scrolling is measured and stately -- matching the pace of old-world luxury.

**Typography strategy:**
White serifed typeface that echoes the elegance of the property. The logo uses the same serif with a castle illustration. Serif in blue for titles and headlines. Readable sans-serif for body copy. The serif choice communicates heritage and permanence.

**Color palette:**
Deep navy blue, white, gold accents. Classic luxury palette executed with restraint -- only 2-3 core colors plus neutrals. The gold is used sparingly as highlight, never as background. Navy carries the weight of tradition.

**Photo handling:**
Curated, editorial photography with Champalimaud Design interiors. Images alternate between full-width and contained within elegant frames. Gallery views use a lightbox with smooth transitions. Every photo is styled and lit to communicate "restrained elegance."

**Micro-interactions:**
Elegant hover states on navigation. Smooth transitions between seasonal content (summer/winter toggle is a key UX pattern). Video controls with custom styling. Subtle parallax displacement on imagery.

**Emotional narrative arc:**
Grandeur (cinematic hero) -> Heritage (150+ year history) -> Exclusivity (rooms, suites, spa) -> Aspiration (the St. Moritz lifestyle) -> Return (seasonal storytelling that invites repeat visits).

**Mobile experience:**
Video hero transitions to curated stills. Navigation collapses to a refined hamburger menu. The stately pace translates well -- each section becomes a full-screen moment.

---

### 5. Generator Hostels (staygenerator.com) -- Europe & US

**What makes the hero section special:**
Design-forward imagery of the hostel interiors and social spaces leads. The hero communicates "this is not your parents' hostel" through photography of bold interiors, neon signage, and young travelers in curated common spaces. A search/booking bar is integrated into the hero without dominating it.

**Scroll effects:**
Smooth scroll with section-based reveals. Card-based layouts for property listings that animate in with stagger effects. Less parallax, more clean motion design.

**Typography strategy:**
Bold, contemporary sans-serif that feels young but not juvenile. Clean hierarchy -- large headlines, compact body text. The typography matches the interior design philosophy: bold, designed, accessible.

**Color palette:**
Black-dominant with electric accent colors -- neon reds, bright whites, and property-specific pops of color. Each Generator location has its own color accent derived from local culture (Amsterdam uses tulip-inspired colors, red neon for the Red Light District).

**Photo handling:**
Lifestyle photography dominates -- people in spaces, not empty rooms. The photography shows the social energy of the hostels. Interior shots highlight the design details: reclaimed lighting from East German factories, Studio Job wallpapers, works by local Dutch artists. Photos are cropped dynamically, not always full-width.

**Micro-interactions:**
Booking widget interactions with smooth state changes. Location cards with hover image reveals. Navigation with clean dropdown animations. CTA buttons with confidence-building micro-animations.

**Emotional narrative arc:**
Discovery (bold hero) -> Community (social spaces, people) -> Design (interiors that rival boutique hotels) -> Affordability (price without sacrificing style) -> Booking (integrated, friction-free).

**Mobile experience:**
Mobile-first booking flow. Location cards stack vertically with swipeable galleries. The bold design language works perfectly at mobile scale -- large type, strong colors, lifestyle photography.

---

### 6. Zostel (zostel.com) -- India

**What makes the hero section special:**
Interactive map integration that bridges digital browsing with real-world exploration. A search-forward hero that prioritizes helping travelers find their next destination. Circular progress bars and gamification elements for user profiles. The hero says "where to next?" not "look at us."

**Scroll effects:**
Clean, functional transitions. Less emphasis on scroll art, more on utility and speed. Card-based destination grids with smooth loading states.

**Typography strategy:**
Modern sans-serif, clean and functional. Optimized for readability across India's diverse user base. Clear hierarchy between Zostel (hostels), Zostel Plus (premium), and Zostel Homes (entire properties).

**Color palette:**
Warm, adventurous tones. Earth tones mixed with vibrant destination photography. The palette communicates "India" -- warmth, diversity, adventure. Orange and earthy reds feature prominently.

**Photo handling:**
Destination-focused photography with "Explore Cards" that function as visual trip planners. Images are used to sell destinations first, properties second. User-generated content and authentic travel photography alongside professional shoots.

**Micro-interactions:**
Map interactions (zoom, pin hover). Booking flow with step-by-step progress indicators. Card hover states with destination previews. Search suggestions with auto-complete.

**Emotional narrative arc:**
Wanderlust (map, destinations) -> Community (fellow travelers) -> Trust (clear categorization of property types) -> Adventure (activity-focused content) -> Booking (streamlined flow).

**Mobile experience:**
App-first mentality -- the web experience mirrors the Zostel App. Mobile booking is the primary flow. Interactive map simplifies to a list view with location pins.

---

### 7. Selina (selina.com) -- Global

**What makes the hero section special:**
Vibrant, culturally-rooted imagery that changes by location. The hero communicates Selina's multi-functional nature: stay, work, play. Photography features local art, colorful interiors, and the blend of coworking and travel lifestyle.

**Scroll effects:**
Smooth transitions between content sections. Destination carousels with momentum-based scrolling. Section reveals timed to natural reading pace.

**Typography strategy:**
Custom typeface "Selina Brocha" -- handwritten, expressive, deliberately uneven. It looks like lettering, not a font. This adds human character that no template could replicate. The logo has a handwritten quality with uneven lines that waver and pulse with Latin American rhythm. Standard sans-serif for body copy.

**Color palette:**
Base of black and white, with a 20-color palette where 5 colors are chosen per country. Each sub-brand (Coworking, F&B, Music & Arts, Wellness) has its own color derivation. The palette is inspired by South American native cultures -- traditional patterns, textiles, and architectural motifs transformed into modern design.

**Photo handling:**
Instagram-worthy photography that prioritizes vibe over architecture. Rooms decorated with local art. Common areas photographed with energy and people. The visual language is bright, quirky, and distinctly non-corporate.

**Micro-interactions:**
Location search with animated suggestions. Sub-brand navigation with color-coded transitions. Event and activity cards with hover previews. Booking flow with location-aware defaults.

**Emotional narrative arc:**
Belonging (community, culture) -> Productivity (coworking, WiFi) -> Adventure (activities, exploration) -> Wellness (yoga, spa) -> Lifestyle (this is not a hotel stay, it is a way of living).

**Mobile experience:**
App integration for real-time guest interaction. Event discovery and community features. The colorful, Instagram-native aesthetic translates perfectly to mobile screens.

---

### 8. Awwwards Hotel Category Winners -- Patterns Observed

**Recent Site of the Day winners include:** Paris by Emily (Developer Award, Dec 2025), Kimpton Vividora Barcelona, BLESS Collection Hotels, Grupo Isabella's, Grand Hotel Central, The Drake Hotel.

**Common patterns among winners:**

1. **Asymmetrical grids** with floating images and rounded corners create organic, non-template layouts
2. **Bold serif fonts for headlines** with clean sans-serif for body -- the editorial/magazine aesthetic
3. **Dark mode defaults** with gold/white text for luxury positioning
4. **Scroll-based storytelling** ("scrollytelling") where each scroll reveals a new chapter
5. **Custom cursors** that change based on content context
6. **Video-first heroes** over static images
7. **Broken grids** that deliberately misalign elements for editorial tension
8. **Typography as design element** -- oversized type used architecturally, not just for reading
9. **Minimal navigation** that reveals on scroll or through overlay menus
10. **Seasonal/dynamic content** that changes the entire site experience based on time of year

**Kimpton Hotels Redesign:**
The redesign "closes a loop between search, booking, and content as never before." Fully responsive. Custom-coded with thousands of curated images. The approach is "from scratch" -- technology bows to guest needs, not the reverse. This is the benchmark for integrating booking with storytelling.

---

### 9. Olivier Larose Blog (blog.olivierlarose.com) -- Framer Motion Techniques

**Complete technique library (relevant to hotel/hostel templates):**

| Technique | Relevance | Tutorial |
|-----------|-----------|----------|
| Smooth Parallax Scroll | Hero sections, image galleries | `tutorials/smooth-parallax-scroll` |
| Cards Parallax | Room cards, destination cards | `tutorials/cards-parallax` |
| Zoom Parallax | Hero zoom reveal, section transitions | `tutorials/zoom-parallax` |
| Background Image Parallax | Full-bleed section backgrounds | `tutorials/background-image-parallax` |
| Text Parallax | Sliding text banners, brand statements | `tutorials/text-parallax` |
| Perspective Section Transition | Section-to-section transitions | `tutorials/perspective-section-transition` |
| Text Mask Animation | Headline reveals | `tutorials/text-mask-animation` |
| 3D Perspective Scroll | Gallery carousels | `tutorials/3d-perspective-scroll` |
| SVG Mask Scroll | Creative section reveals | `tutorials/svg-mask-scroll` |
| Mouse Scale Image Gallery | Room/property galleries | `tutorials/mouse-scale-image-gallery` |
| Magnetic Button | CTAs and booking buttons | `tutorials/magnetic-button` |
| Sticky Cursor | Custom cursor effects | `tutorials/sticky-cursor` |
| Blend Mode Cursor | Art-focused sections | `tutorials/blend-mode-cursor` |
| Awwwards Landing Page | Full page composition | `tutorials/awwwards-landing-page` |
| Paint Reveal | Hero image reveals | `tutorials/paint-reveal` |
| Mask Entry | Page load animations | `tutorials/mask-entry` |
| Infinite Text Move On Scroll | Marquee/ticker effects | `tutorials/infinite-text-move-on-scroll` |

**Core technical approach:**
- `useScroll` hook tracks scroll progression (returns 0-1 value)
- `useTransform` maps scroll values to CSS properties (scale, translateY, opacity, clipPath)
- `Lenis` library (`@studio-freight/lenis` or `lenis` package from Darkroom Engineering) provides smooth, performant scrolling
- Offset configuration: `['start end', 'end start']` defines trigger zones
- `useMotionTemplate` for dynamic CSS value composition

---

## Top 10 Design Patterns to Steal

### 1. Cinematic Hero with Directed Attention
**Source:** Casa Angelina
**What:** The hero is not a static image or video loop. It is a directed cinematic sequence -- camera movement, focal point shifts, and a deliberate reveal of the logo/brand. The visitor experiences a "moment" before they interact with anything.
**Implementation:** Use Framer Motion's `useScroll` + `useTransform` to create a multi-layer parallax hero where foreground and background move at different speeds. Add a subtle auto-pan on the hero image on load (CSS `@keyframes` or Framer Motion `animate`).

### 2. Editorial/Broken Grid Layout
**Source:** Grand Hotel Miramare
**What:** Reject the 12-column Bootstrap grid. Images overlap text. Text breaks out of containers. Elements are deliberately misaligned. The page feels like it was art-directed by a magazine designer, not generated by a CMS.
**Implementation:** CSS Grid with explicit `grid-row` and `grid-column` placement. Negative margins on images. `z-index` layering. Framer Motion for scroll-triggered position shifts.

### 3. Typography as Architecture
**Source:** DDD Hotel, Grand Hotel Miramare
**What:** Display text is not just for reading -- it IS the design. Oversized, carefully kerned headlines that span the viewport. Letters used as visual elements. Typography at 120px+ with letter-spacing adjustments per character.
**Implementation:** CSS `font-size: clamp()` for responsive scaling. Manual `letter-spacing` adjustments. Framer Motion character-by-character stagger animations. Use viewport units (`vw`) for truly fluid type.

### 4. Custom Cursor That Tells a Story
**Source:** DDD Hotel, Grand Hotel Miramare
**What:** The default cursor is replaced with a context-aware custom element. Over images, it becomes "View." Over videos, it becomes "Play." Over booking CTAs, it becomes "Book Now." The cursor itself narrates the interaction possibilities.
**Implementation:** React state-managed cursor component. `onMouseEnter`/`onMouseLeave` events update cursor mode. Framer Motion `spring` animation for smooth cursor following. `mix-blend-mode: difference` for visibility on varied backgrounds.

### 5. Fullscreen Overlay Navigation
**Source:** DDD Hotel
**What:** Navigation is not a sticky bar -- it is a fullscreen experience. When opened, the menu takes over the entire viewport with parallax-displaced menu items, atmospheric background imagery, and generous spacing. Navigation becomes a destination, not a utility.
**Implementation:** Framer Motion `AnimatePresence` for mount/unmount. Staggered children with `variants`. Background image with `scale` animation on open. Menu items with individual `y` displacement on scroll within the overlay.

### 6. Seasonal/Dual-Mode Experience
**Source:** Badrutt's Palace
**What:** The entire site transforms based on season (summer/winter). Different photography, different color accents, different content hierarchy. The visitor sees the property as it exists NOW, not a generic year-round representation.
**Implementation:** React context for season state. CSS custom properties for theming. Dynamic image sets. Toggle UI in header/hero. For templates: allow the property owner to define "modes" (e.g., monsoon/winter, beach season/off-season).

### 7. Lifestyle Photography Over Architecture
**Source:** Generator Hostels, Selina
**What:** Show people, not empty rooms. The most compelling hostel/hotel imagery shows travelers in the space -- socializing, working, exploring. The property is the backdrop to a lifestyle, not the subject.
**Implementation:** Image guidelines in the template: recommend 60% lifestyle, 30% interiors, 10% architectural/detail. Provide placeholder images that demonstrate this ratio. Gallery components that intersperse lifestyle shots between room photos.

### 8. Location-Adaptive Color System
**Source:** Selina (20 colors, 5 per country), Generator (location-specific accents)
**What:** The color palette adapts to the property's location. A beach hostel uses different accents than a mountain lodge. The template provides a base palette that can be "tuned" to local culture.
**Implementation:** CSS custom properties for accent colors. Tailwind v4 `@theme` with semantic color tokens. Template configuration that allows 2-3 accent color overrides. Sensible defaults per "vibe" (beach, mountain, city, heritage).

### 9. Scroll-Linked Clip-Path Image Reveals
**Source:** Awwwards winners, Olivier Larose techniques
**What:** Images do not just fade in -- they REVEAL. Using `clip-path` animations linked to scroll position, images expand from center, wipe from edges, or unmask through geometric shapes. Each image arrival is a small event.
**Implementation:** Framer Motion `useScroll` + `useTransform` mapping to `clipPath` values. `inset()` for rectangular reveals. `circle()` for radial reveals. `polygon()` for geometric shapes. Intersection Observer as fallback for performance.

### 10. Magnetic/Sticky Interactive Elements
**Source:** DDD Hotel, Awwwards patterns, Olivier Larose (Magnetic Button tutorial)
**What:** Buttons and interactive elements are not static -- they respond to cursor proximity. A booking CTA gently pulls toward the cursor when nearby. Navigation items tilt toward the pointer. The interface feels alive and responsive.
**Implementation:** Track mouse position relative to element center. Apply `transform: translate()` based on proximity. Framer Motion `spring` for physics-based return animation. Limit displacement to ~15px to keep it subtle.

---

## Typography Recommendations

### Hotel Template (Luxury/Boutique)

**Heading Font (Display):** `Cormorant Garamond` (Google Fonts)
- Why: High-contrast serif with calligraphic roots. More distinctive than Playfair Display (which is overused). The italic weight is particularly beautiful for accent headings.
- Weights to load: 300 (Light), 400 (Regular), 600 (SemiBold)
- Alternatives: `Prata` (more geometric), `Source Serif 4` (more editorial), `Lora` (warmer)

**Body Font:** `Inter` (Google Fonts)
- Why: Best-in-class readability. Variable font with optical sizing. Neutral enough to let the serif headline shine.
- Weights to load: 300, 400, 500
- Alternative: `Plus Jakarta Sans` (slightly more personality)

**Accent/Display Font:** `Italiana` (Google Fonts)
- Why: Ultra-thin, elegant display font for oversized section titles and decorative typography. Perfect for the "typography as architecture" pattern.
- Use sparingly: hero headlines, section markers, room names

**Monospace (for rates/details):** `JetBrains Mono` (Google Fonts)
- Why: Clean, modern. Use for prices, availability indicators, and data-forward elements.

### Hostel Template (Adventurous/Social)

**Heading Font (Display):** `Space Grotesk` (Google Fonts)
- Why: Geometric sans-serif with personality. Quirky details in specific characters (the "a", the "g") that feel young and designed without being juvenile. Works beautifully at large sizes.
- Weights to load: 400 (Regular), 500 (Medium), 700 (Bold)
- Alternatives: `Outfit` (rounder), `Sora` (more techy), `General Sans` (via Fontshare, free)

**Body Font:** `Satoshi` (Fontshare, free) or `DM Sans` (Google Fonts)
- Why: Satoshi has personality without sacrificing readability. DM Sans as a Google Fonts fallback with similar character.
- Weights to load: 400, 500, 700

**Accent/Display Font:** `Syne` (Google Fonts)
- Why: Variable-width display font with extreme personality at large sizes. The Extra Bold weight is perfect for bold hero statements. Captures the energy of Generator and Selina branding.
- Use for: hero headlines, section titles, CTA text

**Handwritten Accent:** `Caveat` (Google Fonts)
- Why: For annotation-style text, "from $/night" callouts, or personality moments. Inspired by Selina's custom Brocha typeface approach.
- Use very sparingly -- one or two instances per page max.

---

## Color Palettes

### Hotel Template Palette

```
Primary:

  --hotel-ink:          #1a1a2e    /* Near-black with blue undertone -- for text */
  --hotel-navy:         #16213e    /* Deep navy -- headers, nav background */
  --hotel-cream:        #f5f0e8    /* Warm cream -- page backgrounds */
  --hotel-white:        #fefefe    /* Clean white -- cards, overlays */
  --hotel-gold:         #c9a96e    /* Muted gold -- accents, CTAs, lines */
  --hotel-gold-light:   #e8d5b0    /* Light gold -- hover states, borders */
  --hotel-stone:        #8a8578    /* Warm grey -- secondary text, captions */
  --hotel-sage:         #7d8471    /* Sage green -- subtle accent for spa/nature */

Usage rules:
  - Gold is ONLY for accents -- lines, button borders, hover states. Never as background.
  - Navy for headers and overlays, never for body text.
  - Cream is the default background, not white. White is for cards that need to "lift."
  - Stone for secondary text, dates, captions, metadata.
  - Maximum 3 colors visible in any viewport at once.
```

### Hostel Template Palette

```
Primary:

  --hostel-ink:         #1e1e2f    /* Deep ink -- text, strong elements */
  --hostel-bg:          #fafaf7    /* Off-white warm -- page background */
  --hostel-coral:       #ff6b6b    /* Living coral -- primary CTA, energy */
  --hostel-teal:        #2ec4b6    /* Teal -- secondary accent, trust */
  --hostel-mustard:     #ffd166    /* Mustard yellow -- highlights, badges */
  --hostel-blush:       #ffeee6    /* Blush pink -- soft backgrounds */
  --hostel-midnight:    #2b2d42    /* Midnight blue -- nav, footer */
  --hostel-cloud:       #edf2f4    /* Cool grey -- card backgrounds */

Usage rules:
  - Coral is the energy color -- booking buttons, price highlights, key CTAs.
  - Teal for secondary actions, ratings, trust indicators.
  - Mustard for badges ("Best Value", "Popular"), warnings, highlights.
  - Blush for soft section backgrounds that need warmth without weight.
  - Use the 60-30-10 rule: 60% bg/white, 30% ink/midnight, 10% coral/teal/mustard.
  - This palette must feel vibrant on Instagram screenshots.
```

### Location-Adaptive Accent System (Both Templates)

```
Vibes (configurable per property):

  Beach:    coral #ff6b6b,   sandy #f4e0c2,   ocean #1a8fe3
  Mountain: forest #2d6a4f,  stone #a68a64,   snow #e8e8e8
  City:     neon #e63946,    concrete #6c757d, electric #4361ee
  Heritage: burgundy #800020, gold #c9a96e,    ivory #fffff0
  Tropical: lime #06d6a0,    sunset #ef476f,   palm #1b4332
```

---

## Section-by-Section Inspiration Mapping

### Hotel Template Sections

| Section | Inspired By | Key Design Element |
|---------|------------|-------------------|
| **Hero** | Casa Angelina + Badrutt's Palace | Cinematic video/image with directed attention. Parallax multi-layer effect. Logo reveal animation. No booking widget in hero -- the hero exists to create desire. |
| **Introduction/About** | Grand Hotel Miramare | Broken grid with oversized serif typography overlapping a curated photo. Angled italic accent text. Short, evocative copy (3-4 sentences max). |
| **Rooms** | DDD Hotel | Photography-as-content approach. Each room gets a full-width image moment. Minimal text -- room name, one line description, price. Hover reveals detail overlay. |
| **Gallery** | Olivier Larose Zoom Parallax | Scroll-triggered zoom parallax grid. Images scale from 0.8 to 1.0 as they enter viewport. Masonry-style but with intentional asymmetry. Click opens fullscreen lightbox. |
| **Dining** | Grand Hotel Miramare | Bold, warm photography with editorial text overlay. Custom cursor changes to fork/knife icon. Broken grid continues. |
| **Spa/Wellness** | Casa Angelina + Badrutt's Palace | Slow, breathing animations. Soft palette shift (more sage/cream). Background parallax with water/nature imagery. |
| **Location** | Zostel map integration | Interactive map with custom markers. Surrounding attractions with distance indicators. Photography of the neighborhood/locale, not just the property. |
| **Testimonials** | Awwwards patterns | Large pull-quote typography (display serif). Horizontal carousel with drag interaction. Star ratings with subtle animation. |
| **Booking/CTA** | Kimpton redesign | Full-width, high-contrast section. Magnetic CTA button. Clear pricing. Urgency without anxiety. |
| **Footer** | DDD Hotel | Minimal, dark, architectural. Large serif type for contact info. Social links with hover animations. |

### Hostel Template Sections

| Section | Inspired By | Key Design Element |
|---------|------------|-------------------|
| **Hero** | Generator Hostels + Selina | Lifestyle photography with people. Integrated search/booking bar (not dominating). Bold, punchy headline using display font. Overlay with vibrant accent color. |
| **Destinations/Locations** | Zostel + Selina | Card grid with location images. Each card has a color accent derived from the destination. Hover reveals quick info (beds, price, rating). Horizontal scroll on mobile. |
| **Experience/Vibe** | Generator Hostels | Social proof through lifestyle photography. Grid of "what it's like" -- common areas, events, people. Infinite text marquee: "STAY. CONNECT. EXPLORE." (Olivier Larose text parallax technique). |
| **Rooms/Beds** | Generator + Zostel | Clean comparison cards. Dorm vs Private vs Plus tiers. Price prominent. Amenity icons. Swipeable photo gallery per room type. |
| **Community** | Selina | Event calendar or activity showcase. User-generated content feel. Instagram-style image grid. Testimonials from real travelers with photos. |
| **Coworking/Digital Nomad** | Selina | If applicable -- WiFi speed callout, desk photos, monthly stay pricing. Clean, functional layout that communicates "this is a workplace too." |
| **Activities** | Zostel Explore Cards | Trip-planner style cards. Activity type icons. Duration, price, difficulty level. Photography of the actual experience. |
| **FAQ/Practical** | Zostel | Accordion with smooth expand animation. Common questions: check-in time, luggage storage, WiFi, cancellation. Clean, helpful, not buried. |
| **Booking CTA** | Generator | Bold, full-width. High contrast. "Book your bed" not "Reserve your stay." Language matches the audience. Coral CTA button with magnetic hover. |
| **Footer** | Selina | Colorful, not dark. Social links prominent. Blog/community links. Newsletter signup. Location-specific contact info. |

---

## Advanced Framer Motion Techniques

### Technique 1: Smooth Parallax Hero (Casa Angelina style)

```tsx
// Uses: useScroll, useTransform, Lenis
// Source: blog.olivierlarose.com/tutorials/smooth-parallax-scroll

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

// Key concept: Track scroll progress of a container
// Map scrollYProgress (0-1) to translateY values for parallax layers
// Foreground moves faster than background = depth illusion

// Offset config: ['start start', 'end start']
// = animation starts when element top hits viewport top
// = animation ends when element bottom hits viewport top
```

### Technique 2: Cards Parallax for Room Listings

```tsx
// Uses: useScroll, useTransform with per-card tracking
// Source: blog.olivierlarose.com/tutorials/cards-parallax

// Key concept: Each card tracks its own scroll entry
// scrollYProgress maps to scale (0.8 -> 1.0) and opacity (0 -> 1)
// Cards stack and reveal as user scrolls
// Combined with Lenis for butter-smooth scrolling
```

### Technique 3: Zoom Parallax for Gallery Section

```tsx
// Uses: useScroll, useTransform, sticky container
// Source: blog.olivierlarose.com/tutorials/zoom-parallax

// Key concept: Container is position: sticky
// Multiple images scale from different starting points (4x, 3x, 2x)
// As user scrolls, images zoom OUT to their final positions
// Creates a dramatic "zoom into the property" effect
```

### Technique 4: Text Parallax Marquee

```tsx
// Uses: useScroll, useTransform, useMotionTemplate
// Source: blog.olivierlarose.com/tutorials/text-parallax

// Key concept: Text slides horizontally based on vertical scroll
// Direction alternates per row (left on odd, right on even)
// Speed varies by row for depth
// Perfect for brand statement sections: "STAY. EXPLORE. CONNECT."
```

### Technique 5: Perspective Section Transitions

```tsx
// Uses: useScroll, useTransform for scale and rotateX
// Source: blog.olivierlarose.com/tutorials/perspective-section-transition

// Key concept: Outgoing section scales down and rotates in 3D
// Incoming section slides up and over
// Creates a physical "page flip" or "card stack" feeling
// Use for transitioning between major sections (rooms -> dining)
```

### Technique 6: Clip-Path Image Reveals

```tsx
// Uses: useScroll, useTransform, clipPath
// Synthesized from multiple Awwwards patterns

// Key concept: Map scrollYProgress to clipPath values
// inset(50% 50% 50% 50%) -> inset(0% 0% 0% 0%) = expand from center
// circle(0% at 50% 50%) -> circle(100% at 50% 50%) = radial reveal
// polygon() for custom geometric reveals
```

### Technique 7: Magnetic Buttons

```tsx
// Uses: onMouseMove, useMotionValue, useSpring
// Source: blog.olivierlarose.com/tutorials/magnetic-button

// Key concept: Track cursor distance from button center
// Apply inverse transform (button moves toward cursor)
// Spring physics for natural return to center
// Limit max displacement to ~15px
// Use for "Book Now" CTAs
```

### Technique 8: Scroll-Triggered Stagger Reveals

```tsx
// Uses: useInView, variants, staggerChildren
// Common Awwwards pattern

// Key concept: Parent container tracks viewport entry
// Children animate in with stagger delay (0.1s between each)
// Each child: opacity 0->1, y 30->0
// Use for amenity lists, feature grids, testimonial cards
```

### Lenis Setup (Required for all techniques)

```tsx
// Package: lenis (formerly @studio-freight/lenis)
// Source: github.com/darkroomengineering/lenis

// Wrap app in LenisProvider or initialize in layout.tsx
// Config: { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }
// Lenis handles smooth scrolling, Framer Motion handles animations
// They work together via shared scroll position tracking
```

---

## What Makes These Sites NOT Look Like Templates

### 1. Asymmetry is Intentional, Not Broken
Templates use symmetrical 2-column, 3-column grids. Award-winning sites use deliberate asymmetry -- a large image on the left with a small text block offset to the right, not centered. The "broken grid" of Grand Hotel Miramare is the clearest example: nothing aligns to a predictable grid, but everything feels balanced.

**How to achieve:** Use CSS Grid with named areas and explicit placement. Break the pattern every 3rd section. Allow images to span unexpected column ranges. Use negative margins to overlap elements across grid boundaries.

### 2. Negative Space is Generous and Uneven
Templates cram content into every pixel. Award-winning sites leave enormous, asymmetric whitespace. The padding above a section might be 200px while the padding below is 80px. DDD Hotel's photography breathes because each image has 15-20% viewport height of empty space around it.

**How to achieve:** Section padding in `vh` units, not fixed `px`. Intentionally vary top/bottom padding. Let some sections use only 60% of the viewport width, drifting left or right.

### 3. Photography Defines the Grid, Not Vice Versa
Templates have image "slots" that photos are cropped into. Award-winning sites let the photography dictate the layout. A vertical portrait shot gets a narrow, tall container. A wide landscape gets full-bleed treatment. Casa Angelina and DDD Hotel both design around each specific photo.

**How to achieve:** Flexible aspect ratio containers. `object-fit: cover` as last resort, not default. Allow portrait and landscape orientations in the same section. Template should provide guidance on photo dimensions, not force all images into 16:9.

### 4. Motion is Purposeful, Not Decorative
Templates add `fade-in` to everything because they can. Award-winning sites use motion to direct attention and create narrative rhythm. DDD Hotel animates text character by character because it wants you to read slowly. Casa Angelina pans across the view because it wants you to feel like you have arrived.

**How to achieve:** Every animation answers "why does this move?" If the answer is "because it looks cool," remove it. Use motion for: revealing content in reading order, creating spatial depth, providing interaction feedback, and building emotional pacing.

### 5. Color Restraint with Bold Moments
Templates use 5+ colors equally distributed. Award-winning sites use 2-3 colors with extreme discipline. Badrutt's Palace uses navy and gold -- that is it. Grand Hotel Miramare uses bright colors but never more than 2 in any single viewport. The restraint makes each color moment feel intentional.

**How to achieve:** Define a strict color budget per section. Most sections use only ink + background. Accent colors appear in specific, designed moments -- a single line, a button, a highlight -- never as section backgrounds.

### 6. Custom Interactive Elements Replace Defaults
Templates use default browser inputs, standard button styles, and generic hover states. Award-winning sites have custom date pickers, bespoke booking widgets, unique cursor behaviors, and hand-crafted form elements. DDD Hotel's custom cursor alone signals "this was designed, not assembled."

**How to achieve:** Custom cursor component. Styled select/input elements. Bespoke booking widget UI. Animated form labels. Custom scrollbar (or hidden scrollbar with Lenis). Every interactive element should look like it was designed specifically for this site.

### 7. The Narrative Has an Arc, Not Just Sections
Templates stack sections: hero, about, rooms, amenities, booking. Award-winning sites tell a story: desire -> discovery -> immersion -> action. The emotional temperature changes as you scroll. Casa Angelina starts with awe (the view), builds intimacy (rooms), creates craving (food), and only then asks you to book.

**How to achieve:** Plan the page as a story, not a list of features. Each section should raise the emotional stakes. The booking CTA should feel like the natural climax, not a bolted-on afterthought. The footer should feel like a gentle exhale after the experience.

### 8. Typography Scale is Dramatic
Templates use heading sizes like 32px, 24px, 18px. Award-winning sites use 120px, 80px, 14px. The contrast between display text and body text is extreme. Grand Hotel Miramare's all-caps headlines might be 10x the size of its body copy. This scale creates visual drama that no template replicates.

**How to achieve:** Display headings in `clamp(48px, 8vw, 140px)`. Body text stays at 16-18px. The ratio between largest and smallest visible text should be at least 6:1. Use viewport-relative sizing so display type scales with the screen.

---

## Implementation Priority

For the template rebuild, prioritize these in order:

1. **Lenis + Framer Motion foundation** -- smooth scroll and animation infrastructure
2. **Typography system** -- the font pairing and scale establish the entire personality
3. **Color system** -- CSS custom properties with the location-adaptive accent model
4. **Hero section** -- this is where 80% of first impressions happen
5. **Broken grid/asymmetric layout system** -- the layout engine that prevents template feel
6. **Image reveal animations** -- clip-path and parallax for visual drama
7. **Custom cursor** -- the single most impactful "this is not a template" signal
8. **Room/listing cards** -- the money section, needs to convert
9. **Navigation (overlay for hotel, sticky for hostel)** -- brand-appropriate navigation
10. **Micro-interactions** -- magnetic buttons, hover states, form animations

---

## Sources

- [Casa Angelina - Awwwards](https://www.awwwards.com/inspiration/casa-angelina-official-website-luxury-boutique-hotel-in-the-amalfi-coast-romantic-hotel-5-star-hotel-1)
- [Casa Angelina - DesignRush](https://www.designrush.com/best-designs/websites/casa-angelina)
- [DDD Hotel - Awwwards SOTD](https://www.awwwards.com/sites/ddd-hotel)
- [DDD Hotel - Communication Arts](https://www.commarts.com/webpicks/ddd-hotel)
- [DDD Hotel - Garden Eight Case Study](https://garden-eight.com/cases/ddd-hotel/)
- [Grand Hotel Miramare - Positioner Brand Design](https://www.positioner.com/hotel-brand-design/grand-hotel-miramare)
- [Grand Hotel Miramare - HTMLBurger](https://htmlburger.com/blog/best-hotel-website-design/)
- [Grand Hotel Miramare - Kijo](https://kijo.london/blog/best-hotel-website-design/)
- [Badrutt's Palace - DesignRush](https://www.designrush.com/best-designs/websites/badrutts-palace)
- [Badrutt's Palace Official](https://badruttspalace.com/)
- [Generator Hostels - Glenn Doherty Design](https://www.glenndoherty.work/branding/generatorhostels)
- [Generator Amsterdam - Architectural Record](https://www.architecturalrecord.com/articles/11720-generator-amsterdam-by-designagency-and-idea-ontwerp)
- [Zostel UX Analysis - Medium](https://medium.com/@chinmay.inamdar25/zostels-ux-journey-navigating-the-hostel-app-landscape-c970dbe787f8)
- [Selina Branding - Behance](https://www.behance.net/gallery/83896887/Selina-Branding)
- [Selina Branding - Squat NY](https://squatny.com/digital-creative-branding-projects/case-study/selina/)
- [Selina Branding - Cheung Yoon Kim](https://www.cheungyoon.com/work/selina-branding)
- [Kimpton Website Redesign - We Are Fine](https://www.wearefine.com/work/kimpton-hotels-website/)
- [Awwwards Hotel Category](https://www.awwwards.com/websites/hotel-restaurant/)
- [Hotel Design Trends 2026 - Mediaboom](https://mediaboom.com/news/hotel-website-design-trends/)
- [Hotel Design Trends 2026 - Rapt](https://www.thisrapt.com/blog/web-design-trends-for-hospitality-brands-2026/)
- [Hotel Design Trends 2026 - Drift Travel](https://drifttravel.com/hotel-website-design-trends-for-2026-that-actually-increase-conversions/)
- [Olivier Larose - All Tutorials](https://blog.olivierlarose.com/tutorials)
- [Olivier Larose - Cards Parallax](https://blog.olivierlarose.com/tutorials/cards-parallax)
- [Olivier Larose - Smooth Parallax Scroll](https://blog.olivierlarose.com/tutorials/smooth-parallax-scroll)
- [Olivier Larose - Zoom Parallax](https://blog.olivierlarose.com/tutorials/zoom-parallax)
- [Olivier Larose - Text Parallax](https://blog.olivierlarose.com/tutorials/text-parallax)
- [Olivier Larose - Magnetic Button](https://blog.olivierlarose.com/tutorials/magnetic-button)
- [Olivier Larose - Awwwards Landing Page](https://blog.olivierlarose.com/tutorials/awwwards-landing-page)
- [Lenis Smooth Scroll - GitHub](https://github.com/darkroomengineering/lenis)
- [Framer Motion Scroll Animations](https://motion.dev/docs/react-scroll-animations)
- [Google Fonts Luxury Alternatives - Typewolf](https://www.typewolf.com/google-fonts)
- [Luxury Website Colors - Hook Agency](https://hookagency.com/blog/luxury-website-colors/)
- [Color Psychology Hotels - Blue Magnet](https://www.bluemagnetinteractive.com/blog/color-psychology-boosting-web-conversion/)
