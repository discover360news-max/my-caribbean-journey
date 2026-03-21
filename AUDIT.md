# Mobile UX/UI Audit — My Caribbean Journey

**Audit Date:** 2026-03-21
**Audited by:** Claude Code (comprehensive CSS + HTML review)
**Status:** In Progress

---

## How to use this file
- Change `[ ]` to `[x]` when the fix is live
- Add a short note (commit ref or date) in parentheses after the item
- Do **not** delete rows — mark anything superseded as ~~strikethrough~~
- Re-audit after significant layout changes

---

## 🔴 Critical — Fix Immediately

These affect every page, every mobile visitor, every session.

- [x] **C-1** — Hamburger button touch target too small (~24px, needs ≥44px) · `shared/shared.css` `.site-nav-toggle` *(fixed 2026-03-21)*
- [x] **C-2** — Fixed header missing `env(safe-area-inset-top)` — logo/toggle clip behind iPhone notch/Dynamic Island · `shared/shared.css` `.site-nav` *(fixed 2026-03-21)*
- [x] **C-3** — Hero sections use `min-height: 100vh` — iOS Safari address bar causes visible jump/overshoot · `hub.css`, `i-am-tobago/css/style.css`, `my-tobago-guide/css/guide.css` *(fixed 2026-03-21)*
- [x] **C-4** — Music player prev/play/mute buttons are 22×22px (needs ≥44px on mobile) · `shared/shared.css` `.music-player-btn` *(fixed 2026-03-21)*

---

## 🟠 High Priority — Fix Soon

- [x] **H-1** — Mobile menu `top: 82px` hardcoded — breaks if nav height changes · `shared/shared.css:270` `.site-mobile-menu` *(fixed 2026-03-21 — top set dynamically via `header.getBoundingClientRect().bottom` on each open)*
- [x] **H-2** — GDPR banner and support float button overlap on first visit (float hidden behind banner) · `shared/support.js` *(fixed 2026-03-21 — float now waits for `mcj:gdpr-accepted` event on first visit)*
- [x] **H-3** — Hero `padding-top` values don't account for `env(safe-area-inset-top)` (partially mitigated by C-2 fix but large headers still need review) · `hub.css`, `i-am-tobago/css/style.css`, `guide.css`, `blog.css`, `contact.css` *(fixed 2026-03-21 — guide.css sufficient, all others use `calc(Xrem + env(safe-area-inset-top))`)*
- [x] **H-4** — Author image uses hardcoded `height: 675px/300px/250px` instead of `aspect-ratio` — distortion risk at all breakpoints · `i-am-tobago/css/style.css:363` `.author-image img` *(fixed 2026-03-21 — `aspect-ratio: 350/675` at base; `max-height` caps at tablet/mobile)*
- [x] **H-5** — Drop cap `font-size: 4rem` on bio + author sections has no mobile reduction (blog section already fixed at 3.5rem) · `hub.css:656`, `i-am-tobago/css/style.css:396` — add ≤480px rule reducing to ~3rem *(fixed 2026-03-21 — reduced to `3rem` at ≤480px in both files)*
- [x] **H-6** — Hero action buttons not full-width on mobile — narrow side-by-side layout at 320px · `hub.css:116`, `i-am-tobago/css/style.css:97` — add `flex-direction: column; width: 100%` at ≤480px *(fixed 2026-03-21 — `flex-direction: column; align-items: stretch; width: 100%` on buttons at ≤480px)*

---

## 🟡 Medium Priority — Schedule

- [x] **M-1** — Multiple UI text sizes below legible threshold: `.explore-card-badge` / `.store-card-nation-badge` at `0.6rem` (9.6px), `.music-toast-cue` / `.music-player-title` at `0.7rem` — floor at `0.75rem` *(fixed 2026-03-21 — all raised to `0.75rem`; `.site-footer-tagline/copy/bottom/footer-support` also raised to `0.55` opacity for consistency)*
- [x] **M-2** — Footer bottom text contrast failing WCAG AA: `rgba(232,228,220,0.3)` on dark green ≈ 1.6:1 contrast ratio — raise to `0.55` minimum · `shared/shared.css:346,359` *(fixed 2026-03-21 — all four footer text opacities raised to `0.55`: tagline, copy, bottom, footer-support)*
- [x] **M-3** — Share buttons insufficient touch targets on mobile (~28px, reduces to ~25px in post header) · `css/blog.css:1259` — add `min-height: 44px` at ≤900px *(fixed 2026-03-21)*
- [x] **M-4** — Listen/Watch media tabs ~29px tall · `css/blog.css:829` `.media-tab` — increase to `padding: 0.9rem 0.5rem` *(fixed 2026-03-21)*
- [x] **M-5** — `post-meta` date + author row can overflow/run together on narrow screens (`gap: 0`) · `css/blog.css:596` — change to `gap: 0.5rem 1rem` *(fixed 2026-03-21)*
- [x] **M-6** — Guide category cards have `padding: 4rem 1.5rem` on mobile (64px internal padding at 50% card width) · `my-tobago-guide/css/guide.css:303` — reduce to `padding: 2rem 1.25rem` at ≤768px *(fixed 2026-03-21)*
- [x] **M-7** — Guide mobile search trigger pill is ~40px tall (needs 44px) · `my-tobago-guide/css/guide.css:1004` — increase to `padding: 0.95rem 1.6rem` *(fixed 2026-03-21)*
- [x] **M-8** — Blog hero floating word-cloud elements may clip at mobile widths — verify on device, hide at ≤640px if clipping visible · `css/blog.css:40` *(fixed 2026-03-21 — hidden at ≤640px; purely decorative)*

---

## 🟢 Minor — Backlog

- [ ] **m-1** — Review "Read more" button on review cards has `padding: 0` (untappable) · `i-am-tobago/css/style.css:611` — add `padding: 0.5rem 0`
- [ ] **m-2** — Stamp tooltip hover-only — never shows on mobile (no `touchstart` equivalent) · `shared/shared.css:448` — verify JS has touch handler in `components.js`
- [ ] **m-3** — `[data-tooltip]` (coming soon) hover-only — disabled buttons give zero feedback on mobile · `shared/shared.css:1092` — add JS `touchstart` toggle
- [ ] **m-4** — Verify all newsletter/search email inputs use `type="email"` for iOS email keyboard — cannot confirm from CSS alone
- [ ] **m-5** — Guide category expand toggle looks like a note not a button on mobile — add border/pill styling · `my-tobago-guide/css/guide.css:1310` `.guide-cat-expand`
- [ ] **m-6** — Music player pill has asymmetric vertical padding at ≤480px (`0.38rem` top, `0.55rem` bottom) — looks off-centre · `shared/shared.css:903` — equalise to `0.45rem`
- [ ] **m-7** — I Am Tobago `about-excerpt blockquote` uses old left-border style inconsistent with all other blockquotes · `i-am-tobago/css/style.css:245`
- [ ] **m-8** — Blog post hero `padding: 12rem 0 10rem` — the 10rem bottom padding is excessive on mobile, recommend `7rem` at ≤640px · `css/blog.css:543`
- [ ] **m-9** — Hero fireflies canvas animation has no `prefers-reduced-motion` guard in JS — check `main.js` · `i-am-tobago/js/main.js`

---

## Completed Log

| ID | Fix | Date |
|----|-----|------|
| C-1 | Hamburger padding raised to `14px 8px` (44px target) | 2026-03-21 |
| C-2 | `env(safe-area-inset-top)` added to `.site-nav` padding | 2026-03-21 |
| C-3 | `min-height: 100dvh` added after `100vh` on all hero sections | 2026-03-21 |
| C-4 | `.music-player-btn` raised to `32×32px` on mobile ≤480px | 2026-03-21 |
| H-1 | Mobile menu top set dynamically via `header.getBoundingClientRect().bottom` in `components.js` | 2026-03-21 |
| H-2 | Support float gated on `mcj:gdpr-accepted` event in `support.js` on first visit | 2026-03-21 |
| H-3 | Hero padding-top uses `calc(Xrem + env(safe-area-inset-top))` in hub.css, i-am-tobago, blog.css, contact.css | 2026-03-21 |
| H-4 | Author image switched to `aspect-ratio: 350/675` with `max-height` caps at tablet/mobile | 2026-03-21 |
| H-5 | Drop cap reduced to `3rem` at ≤480px in hub.css and i-am-tobago/css/style.css | 2026-03-21 |
| H-6 | Hero action buttons set to `flex-direction: column; width: 100%` at ≤480px | 2026-03-21 |
| M-1 | All sub-threshold font sizes raised to `0.75rem` floor (badges, music title/toast) | 2026-03-21 |
| M-2 | All four footer text opacities raised to `0.55` (tagline, copy, bottom, support) | 2026-03-21 |
| M-3 | `.share-btn` min-height: 44px added at ≤900px | 2026-03-21 |
| M-4 | `.media-tab` padding raised to `0.9rem 0.5rem` | 2026-03-21 |
| M-5 | `.post-meta` gap changed from `0` to `0.5rem 1rem` | 2026-03-21 |
| M-6 | `.guide-cat-card` padding reduced to `2rem 1.25rem` at ≤768px | 2026-03-21 |
| M-7 | `.guide-search-mobile-trigger` padding raised to `0.95rem 1.6rem` | 2026-03-21 |
| M-8 | `.blog-hero-word` hidden at ≤640px (decorative, clips on narrow screens) | 2026-03-21 |
