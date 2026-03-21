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
| 🟡 Medium | 8 | 0 | 8 |
| 🟢 Minor | 9 | 0 | 9 |

## H-tier fix notes (2026-03-21)
- **H-1** — Mobile menu top is now set via `header.getBoundingClientRect().bottom` on each open in `components.js`. The CSS `top: 82px` fallback remains but is overridden by the inline style. Do not hardcode a new value.
- **H-2** — `support.js` gates the float button on `mcj:gdpr-accepted` event on first visit. The existing `initGdprBanner()` hide/show logic in `components.js` is still present but was insufficient alone because the float is created 4s after load.
- **H-3** — Hero padding-top pattern for mobile: `calc(Xrem + env(safe-area-inset-top))`. Apply this to any new hero section's mobile breakpoint. On non-notched devices `env()` = 0, so it's safe everywhere.
- **H-4** — Author image: `aspect-ratio: 350/675` at base, `max-height` caps at tablet/mobile. Do not add explicit `height` overrides — they reintroduce the distortion.
- **H-5** — Drop cap floor: `3rem` at ≤480px. The blog prose drop cap was already handled separately.
- **H-6** — Full-width button pattern at ≤480px: `flex-direction: column; align-items: stretch` on the flex container + `width: 100%; text-align: center` on each `.btn`.
