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
`/AUDIT.md` at the project root — 27 issues, 4 already closed (C-1 through C-4). Read this at the start of any session where the goal is continuing mobile fixes.

## Audit severity counts (as of 2026-03-21)
| Tier | Total | Closed | Open |
|------|-------|--------|------|
| 🔴 Critical | 4 | 4 | 0 |
| 🟠 High | 6 | 0 | 6 |
| 🟡 Medium | 8 | 0 | 8 |
| 🟢 Minor | 9 | 0 | 9 |
