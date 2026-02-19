# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

---

## Project Overview

**My Caribbean Journey** is a Caribbean culture hub featuring books, island guides, and curated resources. The site serves as a platform for book landing pages, island-specific directories for expats and tourists, and links to purchase on Amazon.

**Domain:** mycaribbeanjourney.com
**Hosting:** Cloudflare Pages (auto-deploy from GitHub)
**DNS:** GoDaddy (nameservers pointed to Cloudflare)
**Tech Stack:** Plain HTML / CSS / JS (no framework, no build step)
**Repo:** https://github.com/discover360news-max/my-caribbean-journey

---

## Site Structure

```
/ (root)
  index.html                  ← Hub homepage (hero reel, books, about, bio)
  css/hub.css                 ← Hub-specific styles
  js/hero-reel.js             ← Film reel flash effect for hub hero
  images/                     ← Shared site images (favicon, etc.)
  images/hero/                ← Hub hero reel images (6 optimized JPEGs)
  shared/                     ← Shared components used across all pages
    shared.css                ← Design tokens, reset, nav, footer, buttons
    components.js             ← Nav + footer template literals, rendered via JS
  i-am-tobago/                ← First book landing page
    index.html                ← Full landing page (hero, about, author, reviews, buy CTA)
    css/style.css             ← Book-specific styles
    js/main.js                ← Firefly animation, scroll effects, review carousel
    images/                   ← Book cover, author photo
  my-tobago-guide/            ← Island guide directory page
    index.html                ← Page shell with search, filters, card grid
    css/guide.css             ← Guide-specific styles
    js/guide-data.js          ← Categories + links data (edit this to add content)
    js/guide.js               ← Rendering, search, and filtering logic
```

**Adding a new book:** Create a new folder at root (e.g., `/next-book-title/`) with its own `index.html`, `css/`, `js/`, `images/`. Add a book card to the hub `index.html`. Use shared components for nav/footer.

**Adding a new island guide:** Copy `/my-tobago-guide/` to a new folder (e.g., `/my-trinidad-guide/`). Update `guide-data.js` with island-specific categories and links.

---

## Shared Components

The site uses a JS template literal component system (no framework, no build step) for shared nav and footer across all pages.

### How it works
1. Each page includes `<div id="site-nav"></div>` and `<div id="site-footer"></div>` placeholders
2. Each page loads `/shared/components.js` and calls `SiteComponents.init(config)`
3. The config object controls nav links, footer links, and CTA buttons per page
4. Nav behavior (scroll effect, mobile hamburger, smooth scroll) is handled automatically

### Shared CSS (`/shared/shared.css`)
Contains: CSS custom properties (colors, spacing, fonts), reset, base styles, `.container`, `.text-gold`, `.btn` variants, `.section-header`/`.section-label`/`.section-title`, `.site-nav-*` styles, `.site-footer-*` styles, `.fade-in` animation, responsive breakpoints for nav/footer.

### Page-specific CSS
Each page's own CSS file contains only styles unique to that page. Shared styles (variables, buttons, nav, footer) are NOT duplicated in page CSS files.

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

### Adding a new link
Edit `/my-tobago-guide/js/guide-data.js` — add an object to the `links` array:
```js
{
  title: 'Business Name',
  description: 'What this resource offers.',
  url: 'https://example.com',
  category: 'food-recipes',   // must match a category id
  featured: false              // optional: true for gold border highlight
}
```

### Adding a new category
Add an object to the `categories` array in the same file:
```js
{
  id: 'nightlife',
  label: 'Nightlife & Events',
  icon: '\uD83C\uDF89',
  note: 'Quincy\'s personal note about this category (or null)'
}
```

Filter buttons and category headings are auto-generated from the data.

---

## Books

### I Am Tobago (First Title)
- **Genre:** Tourism / Folklore / Culture
- **Subject:** Tobago folklore, traditions, and cultural heritage
- **Author:** Quincy
- **Amazon Link:** Centralized in `i-am-tobago/js/main.js` as `AMAZON_URL` constant
- **Status:** Landing page complete with 5 real reviews

**Amazon link:** All buy buttons use class `amazon-book-link` — change `AMAZON_URL` in one place and it updates everywhere.

**Placeholder content still needed:**
- Site favicon (`images/favicon.png`)

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

### Component Patterns
- **Buttons:** `btn btn-primary` (gold bg), `btn btn-outline` (transparent, border), `btn btn-large`
- **Cards:** `border-radius: 20px`, subtle border, hover lift
- **Sections:** Alternating `--warm-white` and `--cream` backgrounds
- **Dark sections:** `--green-deep` gradient backgrounds
- **Inline links (dark bg):** `bio-inline-link` (hub) / `bio-listen-link` (book pages) — gold, underlined
- **CTA in dark sections:** `bio-cta` — gold button with glow shadow, external link icon

---

## Development

### No Build Step
This is plain HTML/CSS/JS. No `npm install`, no bundler, no framework.

**Local preview:**
```bash
cd my-caribbean-journey
python3 -m http.server 8888
# Visit http://localhost:8888
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
- Use shared components (nav/footer) for all pages — edit once, updates everywhere
- Reuse the color palette across all pages for brand consistency
- Test locally with `python3 -m http.server` before pushing
- Use absolute paths for shared assets (`/shared/shared.css`, `/shared/components.js`)

### DON'T:
- Add a build step unless absolutely necessary
- Hardcode Amazon links in multiple places (each book has one buy button)
- Duplicate shared styles in page-specific CSS (variables, buttons, nav, footer are in shared.css)
- Add frameworks, bundlers, or package managers for simple static content
- Commit sensitive data or API keys
