---
id: D002
type: DECISION
status: ACTIVE
created: 2026-03-11
updated: 2026-03-11
related: C001, CFG01
---

# Shared Component System — SiteComponents.init() Pattern

## Summary
Nav, footer, breadcrumb, charity callout, and Buy Me a Coffee button are shared across all pages
via a JS template literal system in `/shared/components.js`. Each page includes HTML placeholder
divs and calls `SiteComponents.init(config)` with a per-page config object. No framework, no
build step — pure JS string templates injected into the DOM.

## Implementation Details

**Files:**
- `/shared/shared.css` — all design tokens, reset, nav/footer/breadcrumb styles
- `/shared/components.js` — `SiteComponents.init()`, `renderNav()`, `renderFooter()`, `renderBreadcrumb()`, `renderCharity()`
- `/shared/support.js` — Buy Me a Coffee floating button (blog pages only)

**HTML placeholders every page needs:**
```html
<div id="site-nav"></div>
<!-- page content -->
<div id="site-footer"></div>
```

**Script loading order:**
```html
<link rel="stylesheet" href="/shared/shared.css">
<link rel="stylesheet" href="css/your-page.css">
<!-- ... page content ... -->
<script src="/shared/components.js"></script>
<script>
  SiteComponents.init({
    breadcrumbs: [...],
    navLinks: [...],
    footerLinks: [...],
    showCharity: false  // optional — defaults to false
  });
</script>
```

**Config shape:**
```js
SiteComponents.init({
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Page Name' }   // last item has no href — it's the current page
  ],
  navLinks: [
    { label: 'Home', href: '/' },
    { label: 'Section', href: '#section' },
    { label: 'CTA', href: '#buy', cta: true }  // cta: true = gold button style
  ],
  footerLinks: [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact/' }
  ],
  showCharity: true  // renders charity callout above footer
});
```

**Breadcrumb rules:**
- Renders inside the fixed header, below the nav row — left-aligned, 0.67rem
- Static pages: pass `breadcrumbs` in config
- Blog pages (Nunjucks): set `window._mcjCrumbs` BEFORE `SiteComponents.init()` runs:
  ```html
  <!-- blog/index.njk -->
  <script>window._mcjCrumbs = [{ label: 'Home', href: '/' }, { label: 'Blog' }];</script>
  <!-- _includes/blog-post.njk -->
  <script>window._mcjCrumbs = [{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog/' }, { label: {{ title | dump | safe }} }];</script>
  ```
- Single-item breadcrumbs (hub homepage) are suppressed — hub passes no breadcrumbs

**Footer layout:**
- 3-column CSS grid (`1.5fr 1fr 1fr`) — brand/copyright col 1, links split across cols 2 & 3
- Split logic is automatic in `renderFooter()`

**Charity callout component:**
- Opt-in with `showCharity: true` in config
- Placeholder: `<div id="site-charity"></div>`
- Data lives in the `CHARITY` object at the top of `components.js` — update once, reflects everywhere
- CSS: `shared/shared.css` under `.site-charity-*`
- Currently active on: hub (`index.njk`) and `i-am-tobago/index.html`

**Author stamp bar:**
- Rendered by `renderFooter()` in `components.js` — appears below footer site-wide
- `.site-stamp-bar` gradient (green → warm-white), `.site-stamp-container` 200×200px floats up
- Tooltip shows on hover + tap: Quincy's brother K.V. note
- Image: `/images/KV-11772609696.webp`

**Buy Me a Coffee (support.js):**
- Blog pages only — loaded in `_includes/blog-base.njk`
- Fades in after 4s delay, fixed bottom-right float
- URL: https://buymeacoffee.com/mycaribbeanjourney
- Island-aware copy: `/tobago` in path → "Buy me some Blue Food"; else → "Buy me a coffee"

## Decisions Made
- **JS template literals over a framework** — avoids build step, keeps pages fully self-contained,
  no React/Vue runtime. Each page is a standalone HTML file that works without a server.
- **Single config call per page** — all page-specific nav/footer data lives in one `SiteComponents.init()`
  call at the bottom of each page's HTML. Easy to audit and update.
- **Absolute paths for shared assets** — `/shared/shared.css` and `/shared/components.js` always
  resolve correctly from any subdirectory depth.

## Known Issues / Gotchas
- Always use absolute paths (`/shared/...`) — relative paths break when pages are nested in subdirectories.
- `support.js` must only be loaded on blog pages (in `blog-base.njk`) — loading it on other pages
  risks double-rendering the Buy Me a Coffee button.
- If `window._mcjCrumbs` is used (blog pages), the `<script>` setting it must come BEFORE the
  `<script src="/shared/components.js"></script>` line.

## Change Log
- 2026-03-11 Created
