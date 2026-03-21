---
id: CFG01
type: CONFIG
status: ACTIVE
created: 2026-03-11
updated: 2026-03-11
related: D001, D002, D003
---

# Project Setup — Eleventy 2.0 + Plain HTML/CSS/JS + Cloudflare Pages

## Summary
My Caribbean Journey is a Caribbean culture hub featuring books, island guides, and curated
resources. The site is a hybrid: most pages are plain static HTML/CSS/JS, while the blog and
hub use Eleventy 2.0 for templating. Deployed to Cloudflare Pages from the `main` branch.

## Implementation Details

**Location:** `/Users/kavellforde/Documents/Side Projects/my-caribbean-journey/`
**Repo:** https://github.com/discover360news-max/my-caribbean-journey (private)
**Live URL:** https://mycaribbeanjourney.com
**Domain:** GoDaddy (nameservers → Cloudflare)

**Stack:**
- Static HTML/CSS/JS — book pages, guide pages, contact page
- Eleventy 2.0 — hub homepage (`index.njk`), blog (`blog/`), sitemap
- No bundler, no framework, no build step for static pages

**Key package versions:**
- `@11ty/eleventy`: 2.0.x
- `alpinejs`: not used (plain JS only)

**Eleventy config (`.eleventy.js`):**
- Passthrough copies: `shared/`, `images/`, `i-am-tobago/`, `my-tobago-guide/`, `contact/`, `admin/`, `blog/images/`, `gas/`, `privacy-policy/`, `css/`, `js/`, `robots.txt`, `_headers`, `sitemap.njk`
- Filters: `readableDate`, `htmlDateString`, `categoryLabel`, `truncateWords`, `markdownify`
- Collections: `collections.post` (both `type:post` and `type:story` from `blog/posts/`)
- Output dir: `_site/` (gitignored — Cloudflare builds fresh on every deploy)

**Local dev:**
```bash
# Hub + blog (requires Eleventy):
npm start          # npx @11ty/eleventy --serve → http://localhost:8080

# Book/guide pages only (no Eleventy needed):
python3 -m http.server 8888
# Note: hub (index.njk) will NOT render this way — needs Eleventy
```

**Cloudflare Pages config:**
- Build command: `npm ci && npx eleventy`
- Output directory: `_site`
- Deploy branch: `main`
- `_site/` is gitignored — Cloudflare builds it on every push

**Folder layout:**
```
/
  index.njk              ← Hub homepage (Eleventy)
  shared/                ← Shared nav/footer/components across all pages
  i-am-tobago/           ← First book landing page (static HTML)
  my-tobago-guide/       ← Island guide directory (static HTML, data-driven)
  blog/                  ← Blog listing + posts (Eleventy)
  _includes/             ← Eleventy layouts (blog-base.njk, blog-post.njk)
  admin/                 ← Decap CMS (Quincy calls it "Evently")
  contact/               ← Contact form page (static HTML + GAS backend)
  css/                   ← blog.css lives here
  images/                ← Favicon, hub hero reel images, shared images
  gas/                   ← Google Apps Script source + setup guide
  .memory/               ← Project memory system (this system)
```

**GitHub / deployment:**
- Push to `main` → Cloudflare Pages auto-deploys (1-2 min)
- Decap CMS pushes directly to `main` when posts are saved — divergence is common
- Always `git pull --rebase` before pushing

## Decisions Made
- **Eleventy only for blog + hub** — book pages and guide pages don't need templating,
  keeping them fully self-contained and portable.
- **No bundler/framework** — site is simple enough that plain HTML/CSS/JS is faster to
  develop, easier to debug, and requires no build step for static pages.
- **Cloudflare Pages** — free tier handles the Eleventy build, auto-deploys from GitHub,
  provides CDN + SSL. No server-side logic needed beyond Cloudflare Functions (none yet).

## Known Issues / Gotchas
- `python3 -m http.server` cannot serve the hub — `index.njk` renders as raw text without Eleventy.
- `_site/` is gitignored — never edit files inside it directly.
- CMS (Decap/Evently) pushes directly to `main`. Pull before pushing to avoid conflicts.
- Cloudflare **Browser Cache TTL** must be set to "Respect Existing Headers" — otherwise it
  overrides the `_headers` cache rules. Fix: Cloudflare Dashboard → Caching → Configuration.

## Change Log
- 2026-03-11 Created
