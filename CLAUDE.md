# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

---

## Project Overview

**My Caribbean Journey** is a Caribbean culture hub featuring books, island guides, and curated resources. The site serves as a platform for book landing pages, island-specific directories for expats and tourists, and links to purchase on Amazon.

**Domain:** mycaribbeanjourney.com
**Hosting:** Cloudflare Pages (auto-deploy from GitHub)
**DNS:** GoDaddy (nameservers pointed to Cloudflare)
**Tech Stack:** Plain HTML / CSS / JS + Eleventy 2.0 (blog + hub only)
**Repo:** https://github.com/discover360news-max/my-caribbean-journey

---

## Site Structure

```
/ (root)
  index.njk                   ← Hub homepage (Eleventy template — requires npm start)
  css/hub.css                 ← Hub-specific styles
  js/hero-reel.js             ← Film reel flash effect for hub hero
  images/                     ← Shared site images (favicon, etc.)
  images/hero/                ← Hub hero reel images (6 optimized JPEGs)
  shared/                     ← Shared components used across all pages
    shared.css                ← Design tokens, reset, nav, footer, breadcrumb, buttons
    components.js             ← Nav + footer + breadcrumb rendered via JS
    support.js                ← Buy Me a Coffee float, misc utilities
  i-am-tobago/                ← First book landing page
    index.html                ← Full landing page (hero, about, author, reviews, buy CTA)
    css/style.css             ← Book-specific styles
    js/main.js                ← Firefly animation, scroll effects, review carousel
    images/                   ← Book cover, author photo
  my-tobago-guide/            ← Island guide directory page
    index.html                ← Page shell with search, filters, card grid, hero video
    css/guide.css             ← Guide-specific styles
    js/guide-data.js          ← Categories + links data (edit this to add content)
    js/guide.js               ← Rendering, search, filtering, card UI logic
    js/guide-effects.js       ← Scroll animations and visual effects
  blog/
    index.njk                 ← Blog listing page (Eleventy)
  _includes/
    blog-base.njk             ← Blog page wrapper (head, nav, footer)
    blog-post.njk             ← Individual post layout
  _site/                      ← Eleventy build output (auto-generated, not edited directly)
  admin/                      ← Decap CMS (Quincy calls it "Evently")
    index.html                ← CMS entry point
    cms-components.js         ← Custom CMS toolbar components
```

**Adding a new book:** Create a new folder at root (e.g., `/next-book-title/`) with its own `index.html`, `css/`, `js/`, `images/`. Add a book card to the hub `index.njk`. Use shared components for nav/footer.

**Adding a new island guide:** Copy `/my-tobago-guide/` to a new folder (e.g., `/my-trinidad-guide/`). Update `guide-data.js` with island-specific categories and links.

---

## Shared Components

The site uses a JS template literal component system (no framework, no build step) for shared nav, footer, and breadcrumb across all pages.

### How it works
1. Each page includes `<div id="site-nav"></div>` and `<div id="site-footer"></div>` placeholders
2. Each page loads `/shared/components.js` and calls `SiteComponents.init(config)`
3. The config object controls nav links, footer links, breadcrumbs, and CTA buttons per page
4. Nav behavior (scroll effect, mobile hamburger, smooth scroll) is handled automatically

### Breadcrumb
Breadcrumbs render inside the fixed header, below the nav row — left-aligned, small text (0.67rem).

**Static pages** (guide, book): pass `breadcrumbs` in `SiteComponents.init()`:
```js
SiteComponents.init({
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'My Tobago Guide' }   // last item has no href — it's the current page
  ],
  ...
});
```

**Blog pages** (Nunjucks): set `window._mcjCrumbs` before `SiteComponents.init()` runs:
```html
<!-- Blog listing (blog/index.njk) -->
<script>window._mcjCrumbs = [{ label: 'Home', href: '/' }, { label: 'Blog' }];</script>

<!-- Blog post (_includes/blog-post.njk) -->
<script>window._mcjCrumbs = [{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog/' }, { label: {{ title | dump | safe }} }];</script>
```

Single-item breadcrumbs (homepage) are suppressed — the hub passes no breadcrumbs.

### Shared CSS (`/shared/shared.css`)
Contains: CSS custom properties (colors, spacing, fonts), reset, base styles, `.container`, `.text-gold`, `.btn` variants, `.section-header`/`.section-label`/`.section-title`, `.site-nav-*` styles, `.site-nav-crumb-bar` (breadcrumb in header), `.site-footer-*` styles, `.fade-in` animation, responsive breakpoints for nav/footer.

### Page-specific CSS
Each page's own CSS file contains only styles unique to that page. Shared styles (variables, buttons, nav, footer, breadcrumb) are NOT duplicated in page CSS files.

### Adding nav/footer to a new page
```html
<link rel="stylesheet" href="/shared/shared.css">
<link rel="stylesheet" href="css/your-page.css">

<div id="site-nav"></div>
<!-- page content -->
<div id="site-footer"></div>

<script src="/shared/components.js"></script>
<script>
  SiteComponents.init({
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Page Name' }
    ],
    navLinks: [
      { label: 'Home', href: '/' },
      { label: 'Section', href: '#section' },
      { label: 'CTA', href: '#buy', cta: true }
    ],
    footerLinks: [
      { label: 'Home', href: '/' },
      { label: 'Contact', href: 'mailto:booksbyquincy@gmail.com' }
    ]
  });
</script>
```

---

## My Tobago Guide (Island Directory)

A data-driven, filterable directory of curated resources for expats and tourists in Tobago.

### Hero
The guide hero has a muted YouTube background video (desktop only; mobile < 768px shows the green gradient fallback). Implemented as a direct `<iframe>` injection — no IFrame API. The `::before` overlay (dark green tint) intercepts mouse events so YouTube hover controls never show.

To update the video: change the video ID in `index.html` in the hero script block (search for `youtube-nocookie.com/embed/`).

### Card UI
Each listing card contains:
- **Category icon badge** — 48px square (warm-white bg, green border) overlapping top-left; straddles image/body boundary on image cards
- **Title** — clamped to 2 lines
- **Description** — clamped to 3 lines; "More info" button expands it (hidden when text isn't truncated)
- **Footer row** — `📍 Area` label on the left, `Visit →` on the right, separated from body by a subtle border + `1.5rem` padding-top

### Search
- Multi-word AND logic: all space-separated words must match
- Searches across `title`, `description`, and `tags`
- No live-fire on dropdown changes — fires on button click or Enter key only
- Results bar shows count + active filter chips + "Clear filters"

### Adding a new link
Edit `/my-tobago-guide/js/guide-data.js` — add an object to the `links` array:
```js
{
  title: 'Business Name',
  description: 'What this resource offers.',
  url: 'https://example.com',
  category: 'food-recipes',     // must match a category id
  area: 'crown-point',          // required: 'island-wide' | 'crown-point' | 'scarborough' | 'charlotteville' | 'castara' | 'speyside'
  featured: false,              // optional: true = gold border highlight
  image: 'images/photo.jpg',    // optional: path relative to /my-tobago-guide/
  embedPage: 'https://...',     // optional: adds Visit + Stream buttons
  live: true,                   // optional: false = hidden from directory
  tags: ['synonym', 'local term', 'vibe', 'activity type']  // optional: hidden search keywords
}
```

### Adding a new category
Add an object to the `categories` array in `guide-data.js`, and add its Lucide SVG path to `CAT_ICONS` in `guide.js`:
```js
// guide-data.js
{
  id: 'nightlife',
  label: 'Nightlife & Events',
  icon: '\uD83C\uDF89',   // emoji fallback only — actual icon is in guide.js CAT_ICONS
  note: 'Quincy\'s personal note about this category (or null)'
}

// guide.js — add to CAT_ICONS object
'nightlife': '<path d="..."/>',   // Lucide SVG path content only (no <svg> wrapper)
```

Filter buttons, category headings, and card badges are auto-generated from the data.

---

## Books

### I Am Tobago (First Title)
- **Genre:** Tourism / Folklore / Culture
- **Subject:** Tobago folklore, traditions, and cultural heritage
- **Author:** Quincy
- **Amazon Link:** Centralized in `i-am-tobago/js/main.js` as `AMAZON_URL` constant
- **Status:** Landing page complete with 5 real reviews

**Amazon link:** All buy buttons use class `amazon-book-link` — change `AMAZON_URL` in one place and it updates everywhere.

---

## Design System

### Color Palette (derived from I Am Tobago book cover)
| Token | Value | Usage |
|-------|-------|-------|
| `--green-deep` | `#0d1f12` | Dark backgrounds, footer |
| `--green-mid` | `#1a4a2e` | Accent green, icons |
| `--green-light` | `#2d6b45` | Lighter green accents |
| `--gold` | `#d4a030` | Primary accent, CTAs, highlights |
| `--gold-light` | `#e8b84a` | Hover states |
| `--orange` | `#e8652a` | Secondary accent (sparingly) |
| `--cream` | `#f5f0e8` | Light text on dark backgrounds |
| `--warm-white` | `#faf8f4` | Page background |

### Typography
- **Display:** Playfair Display (serif) — headings, titles
- **Body:** Inter (sans-serif) — paragraphs, UI text
- **Source:** Google Fonts (external link in each page's `<head>`)

### Icons
- **Library:** [Lucide Icons](https://lucide.dev/icons) — browse and copy SVG code directly
- **Standard attributes:** `width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"`
- Always normalise pasted Lucide SVGs to `width="40" height="40"` and `stroke-width="1.5"` to match the site style

### Hero Sections
- **Default style:** `min-height: 100vh`, full screen
- **Scroll indicator:** Add `<div class="hero-scroll"><span>Scroll to explore</span><div class="scroll-arrow"></div></div>` as last child of the hero — styles live in `shared.css`
- **Video hero:** See guide hero pattern — direct iframe injection, `::before` overlay intercepts mouse events, mobile skipped via JS width check

### Footer
- **Layout:** 3-column CSS grid (`1.5fr 1fr 1fr`) — brand/copyright in col 1, footer links split evenly across cols 2 & 3
- Links are passed via `footerLinks` config array in each page's `SiteComponents.init()` call — split logic is automatic in `renderFooter()`

### Component Patterns
- **Buttons:** `btn btn-primary` (gold bg), `btn btn-outline` (transparent, border), `btn btn-large`
- **Cards:** `border-radius: 20px`, subtle border, hover lift
- **Sections:** Alternating `--warm-white` and `--cream` backgrounds
- **Dark sections:** `--green-deep` gradient backgrounds
- **Inline links (dark bg):** `bio-inline-link` (hub) / `bio-listen-link` (book pages) — gold, underlined
- **CTA in dark sections:** `bio-cta` — gold button with glow shadow, external link icon
- **Section icons:** 80px circle, `linear-gradient(135deg, var(--green-mid), var(--green-light))`, gold icon colour — see `.blog-promo-icon` in `hub.css` as the reference pattern

---

## Development

### Local Preview
The hub (`index.njk`) and blog require Eleventy. Use:
```bash
npm start
# Eleventy builds and serves — visit http://localhost:8080
```

For guide and book pages only (no Eleventy needed):
```bash
python3 -m http.server 8888
# Visit http://localhost:8888/my-tobago-guide/ or /i-am-tobago/
# NOTE: the homepage (/) will not render — index.njk needs Eleventy
```

**Deployment:** Push to `main` → Cloudflare Pages auto-deploys (no build command, output dir is `/`)

### File Conventions
- Each book/guide gets its own folder at root level
- Folders are self-contained (own CSS, JS, images) but use shared components
- Shared styles in `/shared/shared.css`, shared components in `/shared/components.js`
- Page-specific styles in each page's `css/` folder
- All styles use CSS custom properties from the shared palette
- Keep files under 500 lines — extract CSS/JS to separate files when needed
- Use absolute paths (starting with `/`) for cross-page links and shared assets

---

## Hosting Setup

### Cloudflare Pages
- **Project:** my-caribbean-journey
- **Build command:** (none)
- **Build output:** `/`
- **Branch:** `main`

### GoDaddy DNS
- Domain: mycaribbeanjourney.com
- Nameservers: Pointed to Cloudflare
- SSL: Auto-provisioned by Cloudflare

---

## Rules

### DO:
- Keep it plain HTML/CSS/JS (no frameworks unless the project grows significantly)
- Use shared components (nav/footer/breadcrumb) for all pages — edit once, updates everywhere
- Reuse the color palette across all pages for brand consistency
- Use `npm start` for local dev (Eleventy serves everything including the hub)
- Use absolute paths for shared assets (`/shared/shared.css`, `/shared/components.js`)

### DON'T:
- Add a build step unless absolutely necessary
- Hardcode Amazon links in multiple places (each book has one buy button)
- Duplicate shared styles in page-specific CSS (variables, buttons, nav, footer, breadcrumb are in shared.css)
- Add frameworks, bundlers, or package managers for simple static content
- Commit sensitive data or API keys
- Use `python3 -m http.server` to test the hub homepage — it serves raw `.njk` and won't render
