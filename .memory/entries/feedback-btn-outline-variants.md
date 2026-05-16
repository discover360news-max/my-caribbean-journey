---
name: btn-outline vs btn-outline-dark
description: Which outline button variant to use depending on background colour
type: feedback
---

Use `btn-outline-dark` on white or light backgrounds (e.g. listing tray, modals on white).
Use `btn-outline` on dark backgrounds (e.g. the green book promo sections, hero areas).

**Why:** `btn-outline` uses cream text and a near-invisible border — designed for dark backgrounds. On a white background it disappears entirely. Learned when the Stream and Get Directions buttons in the listing tray were invisible until switched to `btn-outline-dark`.

**How to apply:** Any time a btn-outline is added inside the listing tray, a modal with a white background, or any light-coloured section, default to `btn-outline-dark`.

**Verified instances (2026-05-16):**
- `i-am-tobago` guide-promo section — dark image bg + `rgba(13,31,18,0.88)` overlay → `btn-outline` ✓ (was incorrectly `btn-outline-dark`, now fixed)
- Guide page scroll modal (`.guide-modal-box`) — `var(--green-deep)` gradient bg → `btn-outline` ✓ (already correct)
