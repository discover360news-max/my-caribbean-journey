---
id: C004
type: COMPONENT
status: ACTIVE
created: 2026-03-11
updated: 2026-04-01
related: D001, D002
---

# My Tobago Guide — Island Directory Page

## Summary
`my-tobago-guide/index.html` is a data-driven, filterable directory of curated resources for
expats and tourists in Tobago. Categories, links, and all content live in `guide-data.js`.
The rendering, search, and filter logic lives in `guide.js`. Adding a new listing = editing
the data file only.

## Files
```
my-tobago-guide/
  index.html            ← Page shell: search bar, filter UI, results grid, hero, tray, modal
  css/guide.css         ← Guide-specific styles
  js/guide-data.js      ← Categories + links data (EDIT THIS to add content)
  js/guide.js           ← Rendering, search, filter, favourites, tray logic
  js/guide-effects.js   ← Firefly hover; video fade-in; Love Tobago scroll modal
  images/               ← Card banner photos (.webp)
```

**Script load order:**
```html
leaflet.js → components.js → support.js → guide-data.js → guide.js → guide-effects.js
```

**Leaflet 1.9.4** loaded from CDN (unpkg) for the listing tray mini map.

## Section Order
Hero → Search bar (desktop) / Search pill (mobile) → Browse (categories) → Results grid → Book cross-sell → Blog invite → Footer

## Adding a New Listing (edit `guide-data.js`)
```js
{
  title: 'Business Name',
  description: 'What this resource offers.',
  url: 'https://example.com',
  category: 'food-recipes',       // must match a category id
  area: 'crown-point',            // 'island-wide' | 'crown-point' | 'scarborough' |
                                  // 'charlotteville' | 'castara' | 'speyside' |
                                  // 'roxborough' | 'mason-hall' | 'whim-estate' etc.
  quincyNote: 'Personal take...',  // shown in listing tray — Quincy\'s voice, 2-3 sentences
  coords: [11.1234, -60.5678],    // optional: [lat, lng] — powers mini Leaflet map in tray
  featured: false,                 // true = gold border highlight
  image: 'images/photo.webp',     // optional: path relative to /my-tobago-guide/
  embedPage: 'https://...',        // optional: adds Visit + Stream buttons (used for radio)
  live: true,                      // false = hidden from directory
  plusCode: '3HGQ+P8 ...',         // optional: enables "Get Directions" link in card + tray
  tags: ['keyword', 'synonym']    // hidden search keywords — never shown to user
}
```

**Adding a new category:**
1. Add object to `categories` array in `guide-data.js`
2. Add Lucide SVG path to `CAT_ICONS` object in `guide.js`

## Card Layouts
- **Image cards** (`image` field set): full-card image with `::after` dark gradient overlay; all text at bottom via `.guide-card-img-overlay`
- **No-image cards**: category icon badge top-left, body has `padding-top: 5rem` to clear it
- `embedPage` cards render Visit + Stream action links (`.guide-card-action-link`) instead of plain Visit
- Footer row: `📍 Area` left, `Visit →` right; `plusCode` → "Get Directions" instead of plain area
- All cards have `cursor: pointer` — clicking opens the listing tray

## Search (guide.js)
- **Live search**: keyword field debounced 300ms — results update as you type
- **Dropdowns auto-apply** on change (no Search button press needed)
- **Pre-indexed**: each entry gets `_titleLc`, `_tagsLc`, `_descLc`, `_searchText` at load — no string rebuilding per keystroke
- **Synonym map** (`SYNONYMS` object): handles British/American spelling variants and conceptual aliases (e.g. `hike→hiking`, `eat→food`, `hotel→accommodation`)
- **Multi-word AND logic**: all space-separated words must match
- **Relevance scoring** (`scoreLink`): title match 30pts > tag match 10pts > description match 3pts — results sorted by score when keyword is active
- **Search button** repurposed: if filters active → smooth scroll to results (320ms delay for mobile tray); if nothing entered → tooltip hint "Enter a keyword or pick a filter first." auto-dismisses after 3.5s, keyword input focused
- Results bar: count + active filter chips + "Clear filters"

## Listing Detail Tray
Clicking any card (except heart/directions/action links) opens a detail tray instead of navigating away.

**Tray content (top → bottom):**
1. Hero image (full-bleed, 210px tall) — if entry has `image`
2. Category label (gold, uppercase)
3. Title
4. Location line: area text, or "Area · Get Directions" link if `plusCode`
5. Full description (no truncation)
6. **Quincy's take** — gold left-border quote block, italic text, labelled "Quincy's take"
7. **Leaflet mini map** (175px, zoom 14, static + zoom controls) — if entry has `coords`
8. CTAs: `Visit` (btn-primary) + `Stream` if embedPage + `Get Directions` (btn-outline-dark) if coords or plusCode

**Directions URL priority:** `plusCode` → `https://maps.google.com/?q=encodedPlusCode`; fallback `coords` → `https://maps.google.com/?q=lat,lng`

**Layout:**
- Desktop: right-side drawer, `width: min(440px, 92vw)`, slides in from right
- Mobile: bottom sheet, `max-height: 85dvh`, slides up, drag pill indicator

**Behaviour:**
- Opens: scrollbar width measured → `padding-right` added to body → `overflow: hidden` (prevents page shift)
- Closes: 280ms slide-out animation (right on desktop, down on mobile) + backdrop fade → then `hidden` set, body padding/overflow restored
- Closes on: X button, backdrop tap, Escape key
- Leaflet map destroyed and reinitialised on each open (prevents stale map state)

**Key JS functions:** `openListingTray(link)`, `closeListingTray()` — in `guide.js` before `// --- Initial render ---`

## Love Tobago Scroll Modal (guide-effects.js)
- Fires once per session (sessionStorage key `guide_modal_shown`) at 50% page scroll
- Shows book cross-sell CTA + secondary Essays CTA
- Closes on X, backdrop, or Escape

## Favourites
- Heart button on every card
- State stored in `localStorage` key `guide-favs` (array of URLs)
- "My Favourites" pill filters grid to hearted items

## Mobile Search Tray (≤768px)
- `.guide-search-bar-wrapper` hidden; "Search & Filter" pill in hero
- Tap pill → `guide-tray-open` on `<body>` → wrapper becomes bottom sheet
- Same DOM inputs reused — no duplication
- Open/close: `openSearchTray()`, `closeSearchTray()` in `guide.js`

## Hero Video
- Self-hosted MP4 (`hero-bg.mp4`, 6MB, 720p) — YouTube iframe triggered "sign in" prompts
- Fade-in: `.guide-hero-video-bg` starts `opacity: 0`, JS adds `.video-ready` on `canplay`
- Fallback: `error` event + `setTimeout(reveal, 2500)`

## Known Issues / Gotchas
- ⚠️ Smart/curly quotes in `guide-data.js` break JS parsing silently — ASCII only
- `live: false` hides a listing without deleting it
- `embedPage` changes card UI — only use for entries with a stream/embed URL
- Leaflet needs a visible (non-hidden) container to initialise — always `removeAttribute('hidden')` before `L.map()`
- `btn-outline` is for dark backgrounds (cream text); use `btn-outline-dark` for white/light backgrounds

## Change Log
- 2026-03-11 Created
- 2026-04-01 Major update: live search, relevance scoring, synonym map, Search button repurpose, listing detail tray with Quincy notes + Leaflet map, Love Tobago scroll modal, coords field, quincyNote field
