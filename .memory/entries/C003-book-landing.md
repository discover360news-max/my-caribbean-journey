---
id: C003
type: COMPONENT
status: ACTIVE
created: 2026-03-11
updated: 2026-03-23
related: D001, D002, B001
---

# I Am Tobago — Book Landing Page

## Summary
`i-am-tobago/index.html` is the landing page for the first book. It has a full-screen hero,
about section, "What's Inside" features, author bio, review carousel, buy CTA, newsletter,
and a store locator. It is a self-contained static HTML page. All buy buttons use a single
`AMAZON_URL` constant in `js/main.js`.

## Implementation Details

**Files:**
```
i-am-tobago/
  index.html            ← Full landing page
  css/style.css         ← Book-specific styles
  js/main.js            ← Firefly animation, carousel, read-more, newsletter, stores
  js/store-data.js      ← Physical store locations data (edit to add/update stores)
  js/stores.js          ← Store section rendering + toggle logic
  images/               ← Book cover, author photo, tote bag mockup
  images/stores/        ← One webp per store (named to match store slug)
```

**Section order:** Hero → About the Book → What's Inside → Author → Reviews → Buy CTA → Newsletter → Find In Store

**Amazon link — centralised:**
- All buy buttons use class `.amazon-book-link`
- `AMAZON_URL` constant at top of `js/main.js` — change once, updates everywhere
- DO NOT hardcode the URL in multiple places

**Script load order:**
```html
<script src="/shared/components.js"></script>
<script src="js/store-data.js"></script>   <!-- data must load before stores.js -->
<script src="js/stores.js"></script>
<script src="js/main.js"></script>
<script>SiteComponents.init({...})</script>
```

**Review carousel:**
- Implemented in `js/main.js`
- 5 real customer reviews
- Auto-advances + swipe support

**Firefly effects:**
- `.btn-firefly` class + JS → 6 staggered gold/green particles on hover
- Stores section → continuous setInterval spawn on hover
- Both use `requestAnimationFrame` double-tick

**Buy section background (B001 fix):**
- `i-am-tobago/images/Tote_Bag_Mockup_2.webp` at `opacity: 0.12`
- Implemented as `.buy::after` pseudo-element in `css/style.css`
- ⚠️ NOT an `<img>` tag — a decorative `<img>` as first child caused FOUC on first load
- `.buy .container` has `position: relative; z-index: 1` to sit above the pseudo-element

**Store locator:**
- Data in `js/store-data.js` — stores by nation
- Rendered by `js/stores.js`
- Toggle between nations; all optional fields (phone, address, etc.) — unused fields don't render
- Each store card has a `.store-card-image` area that shows a real photo when `image` is set
- `image` field = absolute path e.g. `/i-am-tobago/images/stores/nelsons-bookstore.webp`
- `stores.js` injects `background-image` inline; green gradient is the fallback for stores without a photo
- Nation badge uses dark translucent bg (`rgba(0,0,0,0.45)`) for readability over photos

**Inline links (dark sections):**
- `.bio-listen-link` — gold, underlined (author section links)
- `.bio-cta` — gold button with glow shadow, external link icon (author section CTA)

**Buy Me a Coffee:**
- Inline link in author section using `.author-support` wrapper + `.bio-listen-link`
- Below author-actions buttons

**Mailchimp newsletter:**
- `MAILCHIMP_URL_BOOK` constant in `js/main.js`
- JSONP submission (`/post-json`) — inline success without page redirect
- Merge tags: `FNAME` (first name), `EMAIL`

## Decisions Made
- **Centralised `AMAZON_URL`** — single source of truth for the Amazon link. Changing the URL
  requires editing one line in `main.js`.

## Known Issues / Gotchas
- `store-data.js` must load BEFORE `stores.js` — see script load order above
- Smart/curly quotes in JS data files break parsing silently — always use straight ASCII quotes

## Change Log
- 2026-03-11 Created
- 2026-03-23 Added store photos + Facebook links for Nelson's and Gumbs; nation badge darkened
