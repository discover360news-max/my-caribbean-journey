# L003 — Mobile UX Standards (from 2026-03-21 audit)

## Summary
A comprehensive mobile UX/UI audit was completed on 2026-03-21. It produced 27 issues across 4 severity tiers and established the mobile CSS standards now documented in `DESIGN.md § Mobile Best Practices`. The live tracker is `AUDIT.md` at the project root.

---

## Established rules (apply to all new pages + components)

### 1. iOS safe-area insets
The `.site-nav` in `shared/shared.css` now uses `env(safe-area-inset-top)` — **do not duplicate this on page CSS**. If a new page adds its own fixed element (e.g. a sticky footer bar), add `padding-bottom: env(safe-area-inset-bottom)` to it.

### 2. Viewport height — always `dvh` after `vh`
```css
min-height: 100vh;   /* fallback */
min-height: 100dvh;  /* overrides in supporting browsers — excludes browser chrome */
```
Apply to any `min-height: NNvh` declaration, not just 100%. Already applied to hub hero, I Am Tobago hero, and guide hero.

### 3. Touch targets — 44px minimum
- Hamburger: `padding: 14px 8px` (bar content ~16px + 28px padding = 44px)
- Icon buttons on mobile: `width: 32px; height: 32px` minimum (music player set to this)
- Ideally 44×44px; 32px is acceptable for small notch-area controls
- Filter chips, share buttons, media tabs all currently below threshold — tracked in AUDIT.md

### 4. Font size floor
Never render informational text below `0.75rem` (12px). Decorative labels at `0.7rem` are acceptable only at high contrast.

---

## Audit file location
`/AUDIT.md` at the project root. Read this at the start of any session where the goal is continuing mobile fixes.

## Audit severity counts (as of 2026-03-21)
| Tier | Total | Closed | Open |
|------|-------|--------|------|
| 🔴 Critical | 4 | 4 | 0 |
| 🟠 High | 6 | 6 | 0 |
| 🟡 Medium | 8 | 8 | 0 |
| 🟢 Minor | 9 | 9 | 0 |

## M-tier fix notes (2026-03-21)
- **M-1** — Font floor raised to `0.75rem` across `.explore-card-badge` (hub.css), `.store-card-nation-badge` (i-am-tobago/css/style.css), `.music-player-title` and `.music-toast-cue` (shared/shared.css). Note: `.music-player-title` is already `display:none` at ≤480px.
- **M-2** — All four footer text opacities raised to `0.55` in shared/shared.css: `.site-footer-tagline`, `.site-footer-copy`, `.site-footer-bottom`, `.footer-support`. The two `0.3` values were failing WCAG AA; `0.35` and `0.4` were also raised for consistency.
- **M-3** — `.share-btn { min-height: 44px }` added inside the existing `@media (max-width: 900px)` block in css/blog.css.
- **M-4** — `.media-tab` padding raised from `0.7rem` to `0.9rem` globally (no breakpoint — acceptable for the compact sidebar widget).
- **M-5** — `.post-meta { gap: 0 }` changed to `gap: 0.5rem 1rem` so date + author items don't run together at narrow widths.
- **M-6** — Added `padding: 2rem 1.25rem` to `.guide-cat-card` in the ≤768px breakpoint in guide.css. The base `4rem 1.5rem` is fine on desktop.
- **M-7** — `.guide-search-mobile-trigger` padding raised from `0.8rem` to `0.95rem` (the pill only renders on mobile).
- **M-8** — `.blog-hero-word { display: none }` added to the existing `@media (max-width: 640px)` block in css/blog.css. Words are decorative; hiding is safe.

## H-tier fix notes (2026-03-21)
- **H-1** — Mobile menu top is now set via `header.getBoundingClientRect().bottom` on each open in `components.js`. The CSS `top: 82px` fallback remains but is overridden by the inline style. Do not hardcode a new value.
- **H-2** — `support.js` gates the float button on `mcj:gdpr-accepted` event on first visit. The existing `initGdprBanner()` hide/show logic in `components.js` is still present but was insufficient alone because the float is created 4s after load.
- **H-3** — Hero padding-top pattern for mobile: `calc(Xrem + env(safe-area-inset-top))`. Apply this to any new hero section's mobile breakpoint. On non-notched devices `env()` = 0, so it's safe everywhere.
- **H-4** — Author image: `aspect-ratio: 350/675` at base, `max-height` caps at tablet/mobile. Do not add explicit `height` overrides — they reintroduce the distortion.
- **H-5** — Drop cap floor: `3rem` at ≤480px. The blog prose drop cap was already handled separately.
- **H-6** — Full-width button pattern at ≤480px: `flex-direction: column; align-items: stretch` on the flex container + `width: 100%; text-align: center` on each `.btn`.
