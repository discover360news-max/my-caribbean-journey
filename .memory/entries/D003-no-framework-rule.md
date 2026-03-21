---
id: D003
type: DECISION
status: ACTIVE
created: 2026-03-11
updated: 2026-03-11
related: CFG01, D002
---

# No-Framework Rule — Plain HTML/CSS/JS

## Summary
The site deliberately avoids JavaScript frameworks, bundlers, and package managers for static
pages. Eleventy is used only for the blog and hub (where templating is genuinely needed). All
other pages are plain HTML with vanilla JS. This decision keeps the site fast, simple, and
easy to maintain without build tooling.

## Implementation Details

**What IS used:**
- Plain HTML, CSS (custom properties), vanilla JS — book page, guide, contact
- Eleventy 2.0 — hub homepage (`index.njk`), blog (`blog/`), sitemap
- Python HTTP server for local preview of static pages only

**What is NOT used:**
- React, Vue, Svelte, Astro (for this project — rummonday uses Astro)
- Webpack, Vite, Rollup, Parcel
- Tailwind CSS, Bootstrap, any CSS framework
- Alpine.js, HTMX (rummonday uses Alpine — this project does not)

**Where Eleventy is used:**
- `index.njk` — hub homepage (needs template inheritance + Eleventy data)
- `blog/index.njk` — blog listing page
- `_includes/blog-base.njk` — HTML shell for blog pages
- `_includes/blog-post.njk` — individual post template
- `sitemap.njk` — dynamic sitemap generation

**Where plain HTML is used:**
- `i-am-tobago/index.html` — book landing page
- `my-tobago-guide/index.html` — island guide directory
- `contact/index.html` — contact form page
- `privacy-policy/index.html` — static policy page

## Decisions Made
- **Avoid frameworks for static content** — adds complexity without benefit when pages are
  self-contained, infrequently changed, and have no shared state.
- **Eleventy only where needed** — blog posts and the hub benefit from collection-based
  templating; book and guide pages don't.
- **This will not scale if the site grows significantly** — if more pages, more shared logic,
  or more interactivity are added, a proper framework (likely Astro) would be worth introducing.
  The rummonday project shows the right approach for that level.

## Known Issues / Gotchas
- `python3 -m http.server` cannot render `index.njk` — always use `npm start` for hub/blog work.
- Each page imports Google Fonts separately — no centralised font loading. Acceptable for now.

## Change Log
- 2026-03-11 Created
