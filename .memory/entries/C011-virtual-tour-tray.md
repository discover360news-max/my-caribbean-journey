---
id: C011
type: COMPONENT
status: ACTIVE
created: 2026-05-16
updated: 2026-05-16
related: C003, C004
---

# Tobago Global Virtual Tour — Slide-up Tray

## Summary
An iframe tray that loads the Tobago Global Virtual Tour (TourMkr) without navigating away.
Implemented on two pages. The iframe is lazy-loaded on open and cleared on close.

**Tour URL:** `https://tourmkr.com/F1h6s2HYN5/`
**Platform:** TourMkr — supports iframe embedding natively (confirmed). Direct URL works; no separate embed code needed unless TourMkr's server starts blocking iframes, in which case Quincy can get the official embed URL from his TourMkr account dashboard.

---

## Pages & Trigger Locations

### My Tobago Guide (`/my-tobago-guide/`)
Three triggers, one shared tray:
1. **Pill bar** — compact `guide-vtour-pill-trigger` button just below the search section (always visible at the top of content)
2. **Banner section** — full `guide-vtour-banner` section between results grid and book promo (`id="guide-vtour-open-btn"`, `id="guide-vtour-open-btn-top"` for the pill)
3. **Scroll modal** — "Virtual Tour" button (`id="guide-vtour-modal-btn"`) added to `.guide-modal-ctas` in the Love Tobago modal; closes modal before opening tray

**CSS:** `my-tobago-guide/css/guide.css` (classes: `guide-vtour-*`)
**JS:** Inline `<script>` in `index.html`, before `SiteComponents.init()`

### I Am Tobago (`/i-am-tobago/`)
One trigger, one tray:
- **"Virtual Tour" button** in the Guide Cross-sell section (`section.guide-promo`), beside "Explore the Guide"

**CSS:** Inline `<style>` block in `i-am-tobago/index.html` (classes: `iat-vtour-*`)
**JS:** Inline `<script>` at bottom of `i-am-tobago/index.html`, before `</body>`

---

## Tray Behaviour
- **z-index:** 800 (above listing tray 700, below scroll modal 900 on guide page)
- **Height:** `92dvh` — slides up from bottom, `border-radius: 20px 20px 0 0`
- **Open:** sets `iframe.src = TOUR_URL`, removes `hidden`, locks body scroll
- **Close:** adds `.is-closing` (slide-down animation), on `animationend` → sets `hidden`, clears `iframe.src` (unloads tour), restores scroll
- **Close triggers:** ✕ button, backdrop click, Escape key
- **Animations:** reuses `guide-tray-slide-up` / `guide-tray-slide-down` keyframes on guide page; own `iat-slide-up` / `iat-slide-down` keyframes on i-am-tobago

---

## CSS Class Naming Convention
| Guide page (`guide-vtour-*`) | i-am-tobago (`iat-vtour-*`) |
|---|---|
| `.guide-vtour-tray` | `.iat-vtour-tray` |
| `.guide-vtour-panel` | `.iat-vtour-panel` |
| `.guide-vtour-head` | `.iat-vtour-head` |
| `.guide-vtour-iframe-wrap` | `.iat-vtour-iframe-wrap` |

---

## If the iframe goes blank
TourMkr may restrict framing of the direct URL in the future. Fix: Quincy logs into his TourMkr account → Share/Embed on that tour → copies the `<iframe src="...">` URL → replace `TOUR_URL` constant in both inline scripts.
