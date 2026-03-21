---
id: B001
type: BUG
status: DEPRECATED
created: 2026-03-11
updated: 2026-03-11
related: C003, L002
---

# Buy Section Background — Decorative img Caused FOUC (RESOLVED)

## Summary
The I Am Tobago buy section had a decorative tote bag image (`Tote_Bag_Mockup_2.webp`) as an
`<img>` tag inside the section. On first load (before CSS applied), it rendered as a full-size
block element above the section content — a FOUC (flash of unstyled content). Fixed by moving
it to a CSS `::after` pseudo-element, which is immune to this problem.

## Implementation Details

**Symptom:** On first page load, a large tote bag image appeared above the buy section content
for a fraction of a second before CSS applied `position: absolute` and hid it behind the content.
On refresh (cached CSS), no flash. Always happened on first load.

**Root cause:** The `<img>` relied on external CSS (`position: absolute`) to be visually hidden.
Before CSS applied (FOUC window), the browser rendered it as a block-level element.

**Fix (current state):**
```css
/* i-am-tobago/css/style.css */
.buy::after {
  content: '';
  position: absolute;
  inset: 0;
  background: url('../images/Tote_Bag_Mockup_2.webp') center/cover no-repeat;
  opacity: 0.12;
  pointer-events: none;
}

.buy .container {
  position: relative;
  z-index: 1;
}
```

The `<img>` tag was removed from the HTML. CSS `::after` pseudo-elements don't cause FOUC
because they're only created after CSS is parsed and applied.

## Decisions Made
- **CSS `::after` over `<img>`** — pure CSS decorative backgrounds don't participate in normal
  document flow and can't cause FOUC. This is the correct pattern for any decorative background
  image that uses a fallback state before CSS applies.
- ⚠️ Do NOT revert to `<img>` — the flash is noticeable and degrades first-impression UX.

## Known Issues / Gotchas
- None — bug is fully resolved.

## Change Log
- 2026-03-11 Created (documenting historical fix, status: DEPRECATED = resolved)
