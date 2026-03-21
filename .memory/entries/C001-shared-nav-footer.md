---
id: C001
type: COMPONENT
status: ACTIVE
created: 2026-03-11
updated: 2026-03-21
related: D002, D001
---

# Shared Nav + Footer — components.js

## Summary
`/shared/components.js` renders the site-wide fixed header (nav + breadcrumb bar) and footer
into placeholder `<div>` elements on every page. Nav includes scroll effect, mobile hamburger,
and smooth scroll. Footer is a 3-column grid with brand, links, and author stamp bar. Configured
per-page via `SiteComponents.init(config)`.

## Implementation Details

**File:** `/shared/components.js`
**Styles:** `/shared/shared.css` — all `.site-nav-*`, `.site-footer-*`, `.site-nav-crumb-bar` styles

**HTML structure every page needs:**
```html
<div id="site-nav"></div>
<!-- page content -->
<div id="site-footer"></div>
```

**Nav behaviour (automatic, no config needed):**
- Fixed to top of viewport, `z-index` above page content
- Transparent at rest → dark bg + backdrop-blur on scroll (threshold ~60px)
- Mobile hamburger below 768px — full-screen overlay with all nav links
- Smooth scroll to anchor links
- Active link highlighting (scrollspy via IntersectionObserver where sections exist)

**Nav CSS key classes:**
- `.site-nav` — fixed shell
- `.site-nav-inner` — inner container, max-width constrained
- `.site-nav-link` — desktop link; `.site-nav-link.is-cta` — gold button style
- `.site-nav-crumb-bar` — breadcrumb row, below nav links, `0.67rem`
- `.nav-crumb` — individual breadcrumb item
- Mobile overlay: full-screen, covers viewport

**Footer layout:**
- `display: grid; grid-template-columns: 1.5fr 1fr 1fr`
- Col 1: brand logo + site tagline + copyright
- Cols 2 & 3: footer links (split automatically in `renderFooter()`)
- Dark bg: `--green-deep` gradient

**Author stamp bar (below footer):**
- `.site-stamp-bar` — `linear-gradient(to bottom, var(--green-deep) 0%, var(--warm-white) 55%)`
- `.site-stamp-container` — 200×200px, `border-radius: 22px`, `transform: translateY(-40px)`, floats over footer seam
- Tooltip on hover + tap: "Psst — K.V., proud brother of the visionary bringing Tobago's history and culture to the world."
- Image: `/images/KV-11772609696.webp` (144px wide)

## Site Music Player

**Function:** `initMusicPlayer()` in `/shared/components.js`
**Audio file:** `/shared/audio/jamboule.mp3` — loops at `volume: 0.45`
**HTML elements (rendered in nav):** `#mcj-play-btn`, `#mcj-mute-btn`, `#mcj-icon-play`, `#mcj-icon-pause`, `#mcj-icon-muted`, `#mcj-icon-sound`, `#mcj-music-note`

**Behaviour:**
- ⚠️ Does NOT autoplay — player starts paused, plays only on explicit user click (autoplay removed Mar 2026)
- Play button toggles play/pause; mute button toggles mute
- `fadeIn()` ramps volume from 0 → 0.45 over 3.5s when user first presses play
- Before playing, pauses all other `<audio>` elements on the page

**Global coordination bridge:**
- Exposes `window._mcjPauseSiteMusic()` — any page can call this to pause site music and sync the play/pause UI
- Used by the blog Listen/Watch widget (C009) — blog audio `play` event calls `_mcjPauseSiteMusic` automatically
- ⚠️ `_mcjPauseSiteMusic` is only defined after `initMusicPlayer()` runs (i.e. after `SiteComponents.init()`). Safe to call conditionally: `if (window._mcjPauseSiteMusic) window._mcjPauseSiteMusic()`

## Decisions Made
- **JS template literals** — avoids a framework while sharing nav/footer across pages. Update
  `components.js` once and all pages reflect the change instantly.
- **Config per page** — each page controls its own nav links, footer links, and CTAs. The
  shared component renders whatever it's given.

## Known Issues / Gotchas
- Always use absolute paths when loading: `<script src="/shared/components.js"></script>`
- Blog pages: set `window._mcjCrumbs` BEFORE loading `components.js` or before calling `SiteComponents.init()`
- The stamp bar tooltip requires JS interaction — it won't render without JS

## Change Log
- 2026-03-11 Created
- 2026-03-21 Documented music player; removed autoplay; added window._mcjPauseSiteMusic bridge (see C009)
