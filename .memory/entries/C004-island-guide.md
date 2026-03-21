---
id: C004
type: COMPONENT
status: ACTIVE
created: 2026-03-11
updated: 2026-03-11
related: D001, D002
---

# My Tobago Guide — Island Directory Page

## Summary
`my-tobago-guide/index.html` is a data-driven, filterable directory of curated resources for
expats and tourists in Tobago. Categories, links, and all content live in `guide-data.js`.
The rendering, search, and filter logic lives in `guide.js`. Adding a new listing = editing
the data file only.

## Implementation Details

**Files:**
```
my-tobago-guide/
  index.html            ← Page shell: search bar, filter UI, results grid, hero
  css/guide.css         ← Guide-specific styles
  js/guide-data.js      ← Categories + links data (EDIT THIS to add content)
  js/guide.js           ← Rendering, search, filter, favourites, category cards
  js/guide-effects.js   ← Firefly hover on listing cards (event delegation); video fade-in
  js/palms.js           ← Palm tree parallax effect
  images/               ← Card banner photos
```

**Script load order:**
```html
components.js → support.js → guide-data.js → guide.js → guide-effects.js
```

**Section order:** Hero → Search bar (desktop) / Search pill (mobile) → Browse (categories) → Results grid → Book cross-sell → Blog invite → Footer

**Hero video:**
- Self-hosted MP4 (`my-tobago-guide/hero-bg.mp4`, 6MB, 720p)
- Replaced YouTube iframe which triggered "sign in to confirm" on the live site
- `<video autoplay muted loop playsinline>` — no JS needed
- CSS cover formula: `width: max(100%, 177.78vh); height: max(56.25vw, 100%)`
- Fade-in: `.guide-hero-video-bg` starts `opacity: 0`, JS adds `.video-ready` on `canplay` event
- Fallback: `error` event + `setTimeout(reveal, 2500)` in `guide-effects.js`

**Adding a new link (edit `guide-data.js`):**
```js
{
  title: 'Business Name',
  description: 'What this resource offers.',
  url: 'https://example.com',
  category: 'food-recipes',      // must match a category id
  area: 'crown-point',           // 'island-wide' | 'crown-point' | 'scarborough' | 'charlotteville' | 'castara' | 'speyside'
  featured: false,               // true = gold border highlight
  image: 'images/photo.jpg',     // optional: path relative to /my-tobago-guide/
  embedPage: 'https://...',      // optional: adds Visit + Stream buttons
  live: true,                    // false = hidden from directory
  plusCode: '3HGQ+P8 ...',       // optional: enables "Get Directions" link
  tags: ['keyword', 'synonym']   // optional: hidden search keywords
}
```

**Adding a new category:**
1. Add object to `categories` array in `guide-data.js`
2. Add Lucide SVG path to `CAT_ICONS` object in `guide.js`

**Card layouts:**
- **Image cards** (`image` field set): full-card image with `::after` dark gradient overlay; all text at bottom via `.guide-card-img-overlay`
- **No-image cards**: category icon badge at top-left, body has `padding-top: 5rem` to clear it
- Cat icon badge: 48px square, warm-white bg, green border
- Footer row: `📍 Area` left, `Visit →` right; `plusCode` → "Get Directions" instead of plain area

**Search:**
- Multi-word AND logic — all space-separated words must match
- Searches `title`, `description`, and `tags`
- Fires on button click or Enter key only (not on dropdown change)
- Results bar: count + active filter chips + "Clear filters"

**Favourites:**
- Heart button on every card
- State stored in `localStorage` key `guide-favs` (array of URLs)
- "My Favourites" pill filters grid to hearted items

**Mobile search tray (≤768px):**
- `.guide-search-bar-wrapper` hidden; "Search & Filter" pill appears in hero
- Tap pill → `guide-tray-open` on `<body>` → wrapper becomes a bottom sheet (`position: fixed; bottom: 0`)
- Same DOM inputs reused — no duplication
- Backdrop: `<div id="guide-tray-backdrop">`, z-index 499
- Open/close JS: `openSearchTray()`, `closeSearchTray()` in `guide.js`

**Mobile category cards (≤768px):**
- Cards 1 & 2: visible as full cards in 2-col flex
- Cards 3+: hidden as pills behind "See all" / "Show less" toggle (`#guide-cat-expand`)

**Floating labels (search fields):**
- `.guide-field-wrap` + `.guide-field-label` — label floats up on focus or when `.has-value`
- `.has-value` set/cleared via JS `input`/`change` events

## Decisions Made
- **Self-hosted hero video** — YouTube iframe triggered "sign in" prompts on the live site.
  Self-hosted MP4 works everywhere, no external dependency.
- **Data/rendering separation** — all content in `guide-data.js`, all logic in `guide.js`.
  Quincy can add listings without touching any rendering code.

## Known Issues / Gotchas
- ⚠️ Smart/curly quotes in `guide-data.js` break JS parsing silently — use straight ASCII quotes
- `live: false` hides a listing without deleting it — safe to disable temporarily
- `embedPage` field changes the card UI — adds Visit + Stream buttons (used for radio streams)

## Change Log
- 2026-03-11 Created
