# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

---

## Project Overview

**My Caribbean Journey** is a book publishing hub showcasing Caribbean folklore, culture, and island life titles. The site serves as a landing page platform for individual books with links to purchase on Amazon.

**Domain:** mycaribbeanjourney.com
**Hosting:** Cloudflare Pages (auto-deploy from GitHub)
**DNS:** GoDaddy (nameservers pointed to Cloudflare)
**Tech Stack:** Plain HTML / CSS / JS (no framework, no build step)
**Repo:** https://github.com/discover360news-max/my-caribbean-journey

---

## Site Structure

```
/ (root)
  index.html                  ← Hub homepage (book collection grid)
  images/                     ← Shared site images (favicon, etc.)
  i-am-tobago/                ← First book landing page
    index.html                ← Full landing page (hero, about, author, reviews, buy CTA)
    css/style.css             ← Book-specific styles
    js/main.js                ← Firefly animation, nav, scroll effects
    images/book-cover.png     ← Book cover artwork
```

**Adding a new book:** Create a new folder at root (e.g., `/next-book-title/`) with its own `index.html`, `css/`, `js/`, `images/`. Then add a book card to the hub `index.html`.

---

## Books

### I Am Tobago (First Title)
- **Genre:** Tourism / Folklore / Culture
- **Subject:** Tobago folklore, traditions, and cultural heritage
- **Author:** Quincy
- **Amazon Link:** TBD (placeholder `#` in buy button)
- **Status:** Landing page complete, awaiting Amazon link + real reviews

**Placeholder content still needed:**
- Amazon purchase link (swap `#` on "Buy on Amazon" button)
- Author photo (`i-am-tobago/images/author.jpg`)
- Real reviewer names and quotes (3 review cards)
- Page count (currently "TBD")
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
- **Source:** Google Fonts (external link)

### Component Patterns
- **Buttons:** `btn btn-primary` (gold bg), `btn btn-outline` (transparent, border)
- **Cards:** `border-radius: 20px`, subtle border, hover lift
- **Sections:** Alternating `--warm-white` and `--cream` backgrounds
- **Dark sections:** `--green-deep` gradient backgrounds

---

## Key Features

### Firefly Hero Animation (I Am Tobago)
- Canvas-based particle system in hero section
- 18 particles: 60% warm gold, 25% pale green, 15% soft orange
- Organic wander paths with sine-wave pulsing opacity
- Auto-pauses via IntersectionObserver when hero scrolls out of view
- `pointer-events: none` so clicks pass through to content below

### Hub Homepage
- Hero with brand intro
- Book collection grid (cards link to individual book pages)
- "Coming Soon" placeholder card for future titles
- About section explaining the brand mission

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
- Each book gets its own folder at root level
- Book folders are self-contained (own CSS, JS, images)
- Hub homepage (`index.html`) references book folders for images and links
- All styles use CSS custom properties from the shared palette

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
- Each book page should be fully self-contained in its folder
- Reuse the color palette across all book pages for brand consistency
- Test locally with `python3 -m http.server` before pushing

### DON'T:
- Add a build step unless absolutely necessary
- Hardcode Amazon links in multiple places (each book has one buy button)
- Add frameworks, bundlers, or package managers for simple static content
- Commit sensitive data or API keys
