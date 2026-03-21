---
id: L002
type: LEARNING
status: ACTIVE
created: 2026-03-11
updated: 2026-03-11
related: B001, CFG01
---

# Page Transitions (@view-transition) Cause FOUC — Removed

## Summary
The CSS `@view-transition { navigation: auto }` rule was briefly added to `shared/shared.css`
to enable smooth cross-document page transitions. It caused images and nav/footer to flash on
every page navigation. The rule has been removed and must NOT be re-added.

## Implementation Details

**What was added (now removed):**
```css
/* In shared/shared.css — DO NOT ADD THIS BACK */
@view-transition {
  navigation: auto;
}
```

**What happened:**
When navigating between pages, the browser captures a snapshot of the NEW page before JavaScript
has run. At that moment:
- The nav and footer `<div>` placeholders are empty (JS hasn't injected the shared components yet)
- Images with `opacity: 0` (fade-in pattern) are still invisible
- The browser shows this "empty" snapshot as the transition frame, causing a visible flash

**Result:** Every page navigation showed a flash of blank nav/footer + invisible images before
the shared components initialised.

**Fix:** Removed `@view-transition` entirely from `shared/shared.css`. Page transitions are
not compatible with the JS-injected component pattern used on this site.

## Decisions Made
- View transitions are incompatible with the `SiteComponents.init()` pattern because the browser
  snapshots the page before JS runs. The flash is worse than no transition at all.
- If view transitions are ever needed in the future, the site would need server-side rendering
  (e.g., Eleventy pre-rendering nav/footer as static HTML) to avoid the FOUC.

## Known Issues / Gotchas
- This is easy to accidentally re-add if someone thinks "let's add smooth page transitions".
  The trade-off is fundamental to the current architecture — don't add it back.

## Change Log
- 2026-03-11 Created
