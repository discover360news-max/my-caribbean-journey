---
id: C008
type: COMPONENT
status: ACTIVE
created: 2026-03-15
updated: 2026-03-15
related: C003, D002
---

# Reviews Carousel Component

## Summary
Book reviews refactored out of `i-am-tobago/index.html` into a reusable
`SiteComponents.initReviews()` component. Data lives in a separate JS file.
The component is reusable on any page — pass any reviews array + config.

## Files
```
shared/components.js              ← renderReviews() + initReviews() added
i-am-tobago/js/reviews-data.js   ← BOOK_REVIEWS data array (edit to add/change reviews)
i-am-tobago/index.html            ← <div id="site-reviews"> slot replaces inline section
```

## Usage
```html
<!-- HTML slot -->
<div id="site-reviews"></div>

<!-- Scripts (reviews-data.js must load before SiteComponents.init) -->
<script src="/shared/components.js"></script>
<script src="js/reviews-data.js"></script>
<script>
  SiteComponents.init({...});
  SiteComponents.initReviews(BOOK_REVIEWS, {
    label: 'What Readers Are Saying',
    title: 'Reviews',
    cta: {
      label:    'Convinced? Get your copy.',
      text:     'Buy on Amazon',
      href:     '#buy',
      cssClass: 'btn btn-primary amazon-book-link',
      external: true
    }
  });
</script>
<script src="js/main.js"></script>  <!-- MUST come after SiteComponents calls -->
```

## Review Data Shape (reviews-data.js)
```js
var BOOK_REVIEWS = [
  {
    text:       "Review text here.",   // straight ASCII quotes only
    expandable: true,                  // true = show Read more/less if text > 150 chars
    reviewer:   "Reviewer Name",
    role:       "Title or location"    // may contain inline HTML e.g. <strong>
  }
];
```

## Card Structure
```html
<div class="review-card">           <!-- flex column -->
  <div class="review-stars">        <!-- stars -->
  <div class="review-quote">        <!-- flex: 1 — fills card space -->
    <div class="review-text">       <!-- overflow:hidden, max-height transition -->
      <p>text</p>
    </div>
    <button class="review-read-more" hidden>Read more</button>  <!-- revealed by JS -->
  </div>
  <div class="reviewer">            <!-- always at bottom, Playfair Display name -->
    <strong>Name</strong>
    <span>Role</span>
  </div>
</div>
```

## Script Load Order (Critical)
`SiteComponents.init()` + `initReviews()` MUST run before `main.js` because:
- `main.js` queries `.amazon-book-link` — the reviews CTA has this class
- `main.js` queries `.review-card` — for scroll fade-in animations
Both elements are injected by `initReviews()`, so they must exist before `main.js` runs.

## Read More Animation
- Uses `max-height` transition (not `-webkit-line-clamp` which can't animate)
- `.clamped` → `max-height: 7rem` (~4 lines)
- `.expanded` → `max-height: 60em`
- `::after` gradient fade on `.clamped` to indicate truncation
- Button is baked into template HTML with `hidden` attr — JS reveals it if text > 150 chars

## Reviewer Styling
- Name: `var(--font-display)` (Playfair Display), `1.15rem`, `var(--green-deep)`
- Role: Inter, `0.85rem`, `var(--text-muted)`
- Separated from quote block by subtle border-top

## Change Log
- 2026-03-15 Created
