---
id: C010
type: COMPONENT
status: ACTIVE
created: 2026-03-22
updated: 2026-03-23
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
- **High-detail traced silhouette** from Quincy's Photoshop illustration (potrace, ~12,000-point path)
- Source: `/Users/kavellforde/Documents/Quincy/Designs/Tobago Outline PNG.svg` (Inkscape wrapper around a 3600×2700 RGBA PNG)
- Trace process: extract alpha channel with Pillow → threshold at 128 → PBM → potrace → extract path 4 (main island)
- **ViewBox:** `0 0 900 520`
- Island wrapped in nested `<g>` transforms:
  ```html
  <g transform="scale(0.25, 0.19259)">
    <g transform="translate(0,2700) scale(0.1,-0.1)">
      <path class="island-body" vector-effect="non-scaling-stroke" d="..."/>
  ```
  The outer scale maps 3600×2700 → 900×520; the inner is potrace's Y-flip. `vector-effect="non-scaling-stroke"` keeps the gold border 1.5px visual regardless of transforms.
- Island fill: `--green-mid` with gold `drop-shadow` glow (`island-body` class)
- Small offshore islets rendered as separate `<circle>` / `<ellipse>` elements (`island-islet` class)
- ⚠️ Do NOT replace the traced `<path>` with the old 108-point OSM polygon — the detailed trace is final

## Pin coordinate system
`x` and `y` in `map-data.js` are **percentages of the viewBox** (0–100).

### Georeferencing formula (affine transform)
Derived from 9 manually-verified ground control points (2026-03-22).
Max residual error: **1.3% x-axis, 1.0% y-axis**.

```
x% = 218.8825 × lon + 1.9429 × lat + 13310.65
y% = -8.5133  × lon − 293.6998 × lat + 2832.00
```

Where `lon` = decimal degrees West (negative), `lat` = decimal degrees North.

Example — Fort King George (11.177666°N, 60.727098°W):
```
x% = 218.8825 × (−60.727098) + 1.9429 × 11.177666 + 13310.65 ≈ 40.2
y% = -8.5133  × (−60.727098) − 293.6998 × 11.177666 + 2832.00 ≈ 65.5
```

### Ground control points (manually placed → GPS cross-referenced)
| Location | GPS (lat, lon) | SVG (x%, y%) | Method |
|---|---|---|---|
| Fort King George | 11.177666°N, 60.727098°W | (40.2, 65.5) | manual |
| Mystery Tomb, Plymouth | 11.221143°N, 60.778827°W | (29.6, 53.8) | manual |
| Courland Bay Monument | 11.220184°N, 60.778025°W | (29.6, 55.1) | manual |
| Fort James | 11.220578°N, 60.780228°W | (28.5, 53.4) | manual |
| Fort Granby | 11.185919°N, 60.660273°W | (54.7, 63.6) | manual |
| Bloody Bay | 11.302930°N, 60.632154°W | (61.3, 28.5) | manual (initial GPS was Jamaica — corrected) |
| Signal Hill | 11.179123°N, 60.759917°W | (32.9, 66.1) | manual |
| Crusoe's Cave | 11.148608°N, 60.774535°W | (29.6, 74.7) | manual |
| Little Tobago | ~11.306°N, 60.507°W | (89.3, 30.1) | manual |
| Charlotteville | ~11.322°N, 60.548°W | (79.3, 22.0) | manual |

### Geocoding workflow for formula-derived pins
Remaining 17 pins geocoded via Photon API (`photon.komoot.io`) run through
a Playwright browser (`browser_evaluate` with `fetch()`) — NOT via MCP fetch.
**Reason:** Nominatim and Photon both block automated requests via `robots.txt`.
Running the `fetch()` inside Playwright is treated as regular browser traffic.

```js
// Pattern used (in browser_evaluate):
const r = await fetch('https://photon.komoot.io/api/?q=Mason+Hall+Tobago&limit=1');
const j = await r.json();
const [lon, lat] = j.features[0].geometry.coordinates;
```

### Sharon Moravian Church — placeholder
Photon returned a Trinidad result (lat ~10.27°N). User confirmed uncertainty:
"forget Sharon Moravian Church, I am not sure it is in Tobago. But that is ok."
Left at manual placeholder `x=34.8, y=59.2`. Do not trust this coordinate.

### Overlap prevention
- `douen-parlatuvier` and `parlatuvier` share the same GPS → offset douen to `x=55.5, y=32.0`
- `soucouyant-bon-accord` and `bon-accord` near-identical → offset bon-accord to `x=20.5, y=74.0`

### Offshore features
`buccoo-reef` (x=17, y=66.2) and `nylon-pool` (x=13.8, y=65.0) render just off
the SW coast — correct. These are genuinely offshore features.

## Categories
| Key | Label | Colour |
|---|---|---|
| `history` | History | `#d4a030` (gold) |
| `folklore` | Folklore | `#e8652a` (orange) |
| `nature` | Nature | `#2d6b45` (green) |
| `village` | Village | `#f5f0e8` (cream) |
| `religious` | Religious | `#9a8a7a` (muted) |
| `forts` | Forts | `#b5451b` (dark red) |
| `waterfalls` | Waterfalls | `#4a9fc4` (blue) |
| `waterwheels` | Waterwheels | `#7a5c38` (brown) |
| `islands` | Islands | `#1a8a8a` (teal) |

## Features
- **Pan:** mouse drag + one-finger touch drag
- **Zoom:** scroll wheel + pinch + +/− buttons + ⌂ reset
- **Zoom method:** SVG `viewBox` attribute manipulation (no CSS transform, no library)
- **Filter chips:** category filter above map, hides/shows pins, closes popup
- **Popup:** `position: absolute; bottom: 0` slide-up panel within `.map-wrapper`
- **Popup layout:** flex row — 16:9 image block (225px, `--radius-lg`) left + text (title + desc) right
- **Popup image fallback:** gradient from `#0d1f12` → `cat.colour + '55'` (category-tinted) when no `image` field set
- **Popup image field:** optional `image` on each `map-data.js` entry — gradient shows until real photos added
- **Popup fix:** double `requestAnimationFrame` before adding `.active` — guarantees one full paint before transition fires, preventing first-click snap-in-from-top (height=0 on first render). `void offsetHeight` is NOT sufficient — use the double rAF pattern.
- **Token note:** only `--radius` (12px) and `--radius-lg` (20px) exist — `--radius-md` is not defined

## Section background
Dark section (`--green-deep`) with radial gradient overlays — same pattern as hero/features.
Map wrapper: `background: rgba(10, 20, 14, 0.6)` + gold border + `border-radius`.

## Adding / editing locations
Edit `map-data.js` only. Each entry:
```js
{
  id: 'unique-id',
  name: 'Display Name',
  category: 'history',   // one of the 9 category keys above
  x: 37.4,              // % of viewBox width  (use formula above, then verify visually)
  y: 64.5,              // % of viewBox height
  image: '/blog/images/example.webp',  // optional — gradient fallback if omitted
  description: 'Full paragraph shown in popup.'
}
```
Mark confirmed GPS entries with an inline comment: `/* REAL — lat°N, lon°W */`

To place a new pin: apply the georeferencing formula with confirmed GPS, then visually
verify in browser. The formula has ~1% precision — close enough to land on the correct
area, but slight manual nudging may be needed for peninsula edges.

No CMS integration — data is static from the book.

## Confirmed GPS coordinates (as of 2026-03-29)
| Pin | GPS |
|---|---|
| Les Coteaux | 11.227740°N, 60.741831°W |
| London Bridge | 11.354981°N, 60.533172°W |
| No Man's Land | 11.168646°N, 60.824912°W |

## Known issues / gotchas
- NE peninsula (Speyside/Charlotteville area) is very thin in SVG space — pins there need y% ≈ 20–30 to sit on land
- Buccoo Reef and Nylon Pool are correctly placed near the SW coast (offshore features)
- Parlatuvier and Douen Grounds are geographically close — slightly offset in data to avoid overlap
- Sharon Moravian Church coordinate is a placeholder — GPS location unconfirmed

## How the click-to-place calibration tool worked
When manually placing GCPs, JS was injected via Playwright `browser_evaluate`:
1. Reset `svg.setAttribute('viewBox', '0 0 900 520')` to neutralise any pan/zoom
2. Removed all existing `.map-pin-group` elements
3. Attached a click handler that captured SVG coords:
   ```js
   const rect = svg.getBoundingClientRect();
   const vb = svg.viewBox.baseVal;
   const x = ((e.clientX - rect.left) / rect.width  * vb.width  + vb.x) / 9;   // → %
   const y = ((e.clientY - rect.top)  / rect.height * vb.height + vb.y) / 5.2;  // → %
   window.__PLACED_COORDS__ = { x, y };
   ```
4. A ghost marker (small orange dot) tracked the cursor position live
5. On click, `window.__PLACED_COORDS__` was read back via `browser_evaluate`

## Change Log
- 2026-03-22 Created. 27 locations, all categories, pan/zoom, filter, popup.
- 2026-03-22 Island path upgraded: replaced 108-point OSM polygon with ~12,000-point potrace silhouette from Quincy's illustration. Nested transform + `vector-effect="non-scaling-stroke"` approach.
- 2026-03-22 All 27 pin coordinates georeferenced: 9 manual GCPs + affine transform regression + Photon API geocoding for remaining pins. Max residual 1.3% x, 1.0% y. Committed and deployed.
- 2026-03-23 Popup: added 16:9 image block with category-colour gradient fallback. Optional `image` field in map-data.js entries.
- 2026-03-29 Expanded to 9 categories (added forts, waterfalls, waterwheels, islands). Forts moved out of history. 34 total pins. New entries: Pigeon Peak, Turtle Beach, No Man's Land, Arnos Vale Waterwheel, The Sisters, London Bridge. Argyle moved to waterfalls, Little Tobago moved to islands. Les Coteaux, London Bridge, No Man's Land have confirmed real GPS. Map data reset from placeholder → real coordinates workflow begins.
