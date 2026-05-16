---
id: C001
type: COMPONENT
status: ACTIVE
created: 2026-03-11
updated: 2026-05-16 (mobile menu UX pass)
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
- Transparent at rest → dark bg + backdrop-blur on scroll (threshold 50px)
- Hamburger below **1024px** (covers all tablets + small laptops) — full-screen overlay with all nav links
- Hamburger spans animate to an X via `[aria-expanded="true"]` CSS — no JS needed
- Smooth scroll to anchor links

**Mobile menu behaviour:**
- `openMenu()` / `closeMenu()` helpers in `attachNavBehavior()` — single source of truth for all close paths
- Escape key closes menu (`keydown` on document, guarded by `menuOpen` flag)
- Scroll lock: `document.body.style.overflow = 'hidden'` on open, reset to `''` on close
- Resize guard: `window resize` listener calls `closeMenu()` if viewport grows above 1024px while open — prevents state drift on rotation/resize
- `aria-controls="site-mobile-menu"` + `aria-expanded` on toggle button; `role="navigation"` + `aria-label="Mobile navigation"` + `aria-hidden` on menu div (toggled on open/close)
- Active link: `aria-current="page"` added at render time via `window.location.pathname` comparison — skips anchor links (`#`) and CTA links. Styled in CSS as gold color + 3px gold left border
- Links: hover background pill (`rgba(255,255,255,0.06)` + `border-radius: 6px`) replaces border-bottom separators
- `@media (prefers-reduced-motion: reduce)` disables the slide/fade transition on `.site-mobile-menu`

**Nav CSS key classes:**
- `.site-nav` — fixed shell
- `.site-nav-inner` — inner container, max-width 1200px
- `.site-nav-links a:not(.site-nav-cta)` — desktop link styles (use `:not` to avoid cascade fights with CTA)
- `.site-nav-cta` — gold gradient CTA pill; **no `!important`** — specificity handled by the `:not` above
- `.site-nav-crumb-bar` — breadcrumb row, below nav links, `0.67rem`
- Mobile overlay: full-screen, `z-index: 99`, top set dynamically by JS to `header.getBoundingClientRect().bottom`

**Breakpoints:**
- `≤1024px` — hamburger; hides `.site-nav-links`, shows `.site-nav-toggle` and `.site-mobile-menu`
- `1025–1280px` — compact desktop: link gap `1rem`, font-size `0.85rem` (handles pages with many links)
- `≤768px` — footer/layout breakpoint (stacks footer columns); container padding tightens
- `≤480px` — logo `38px` / `1.1rem`; music player title hidden; player buttons expand to 32px touch target

**Logo sizing:**
- Desktop: `44px` image height, `1.3rem` wordmark — has `white-space: nowrap; flex-shrink: 0` to prevent wrapping
- 480px: `38px` / `1.1rem`

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

## Site Music Player — notch behaviour
- At rest: transparent background, hairline gold border `rgba(212,160,48,0.12)` — visible on any page bg
- On scroll: dark glass pill — `rgba(13,31,18,0.6)`, `backdrop-filter: blur(12px)`, gold border brightens
- Pill positioned `bottom: -22px` on `.site-header` (hangs below nav row)

## Change Log
- 2026-03-11 Created
- 2026-03-21 Documented music player; removed autoplay; added window._mcjPauseSiteMusic bridge (see C009)
- 2026-05-16 Header audit: breakpoint 768→1024px, hamburger X animation, logo 54→44px/1.5→1.3rem, music player border always-visible, !important removed from CTA, compact-gap rule at 1025–1280px
- 2026-05-16 Mobile menu UX pass: Escape key, scroll lock, resize guard, ARIA wiring, active link highlight, hover pill style, prefers-reduced-motion guard
