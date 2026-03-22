---
id: C010
type: COMPONENT
status: ACTIVE
created: 2026-03-22
updated: 2026-03-22
related: C003, D001, D003
---

# I Am Tobago — Interactive Historical Map

## Summary
A full interactive map section on the I Am Tobago book landing page (`i-am-tobago/index.html`).
Shows 27 historical, folklore, nature, village, and religious locations drawn from the book.
Inserted between "What's Inside" (features) and "About the Author" sections.

## Files
```
i-am-tobago/js/map-data.js   ← Static location data (27 entries, never changes)
i-am-tobago/js/map.js        ← Pan/zoom, filter, pin render, popup logic
i-am-tobago/css/style.css    ← Map styles appended at end of file
i-am-tobago/index.html       ← Map section + script tags
```

## Script load order
```html
<script src="js/map-data.js"></script>   <!-- must load before map.js -->
<script src="js/map.js"></script>
```

## Island SVG
- **Real 108-point OSM-derived coastline** (Douglas-Peucker simplified from OpenStreetMap relation 555717)
- **ViewBox:** `0 0 900 520`
- **Transformation:** `x = (60.90 - lon) / 0.43 * 900`, `y = (11.37 - lat) / 0.29 * 520`
- Island fill: `--green-mid` with gold `drop-shadow` glow (`island-body` class)
- Small offshore islets rendered as separate `<circle>` / `<ellipse>` elements (`island-islet` class)
- ⚠️ Do NOT re-add the old fake `<polygon>` — the real `<path>` is in place

## Pin coordinates
`x` and `y` in `map-data.js` are **percentages of the viewBox** (0–100).
To convert geographic coordinates: `x% = (60.90 - lon) / 0.43 * 100`, `y% = (11.37 - lat) / 0.29 * 100`.
Pin positions have been manually verified to sit on land (not in the sea).

## Categories
| Key | Label | Colour |
|---|---|---|
| `history` | History | `#d4a030` (gold) |
| `folklore` | Folklore | `#e8652a` (orange) |
| `nature` | Nature | `#2d6b45` (green) |
| `village` | Village | `#f5f0e8` (cream) |
| `religious` | Religious | `#9a8a7a` (muted) |

## Features
- **Pan:** mouse drag + one-finger touch drag
- **Zoom:** scroll wheel + pinch + +/− buttons + ⌂ reset
- **Zoom method:** SVG `viewBox` attribute manipulation (no CSS transform, no library)
- **Filter chips:** category filter above map, hides/shows pins, closes popup
- **Popup:** `position: absolute; bottom: 0` slide-up panel within `.map-wrapper`
- **Popup fix:** `void popup.offsetHeight` reflow trick before adding `.active` — prevents first-click snap-in-from-top glitch caused by height=0 on first render

## Section background
Dark section (`--green-deep`) with radial gradient overlays — same pattern as hero/features.
Map wrapper: `background: rgba(10, 20, 14, 0.6)` + gold border + `border-radius`.

## Adding / editing locations
Edit `map-data.js` only. Each entry:
```js
{
  id: 'unique-id',
  name: 'Display Name',
  category: 'history',   // one of the 5 category keys above
  x: 37.4,              // % of viewBox width
  y: 64.5,              // % of viewBox height
  description: 'Full paragraph shown in popup.'
}
```
No CMS integration — data is static from the book and is not expected to change.

## Known issues / gotchas
- NE peninsula (Speyside/Charlotteville area) is very thin in SVG space — pins there need y% ≈ 20–30 to sit on land
- Buccoo Reef and Nylon Pool are correctly placed near the SW coast (offshore features nudged to land)
- Parlatuvier and Douen Grounds are geographically close — slightly offset in data to avoid overlap

## Change Log
- 2026-03-22 Created. 27 locations, all categories, pan/zoom, filter, popup.
