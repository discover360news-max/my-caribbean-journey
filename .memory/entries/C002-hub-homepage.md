---
id: C002
type: COMPONENT
status: ACTIVE
created: 2026-03-11
updated: 2026-03-11
related: CFG01, D001, D002
---

# Hub Homepage — index.njk

## Summary
`index.njk` is the hub homepage rendered by Eleventy. It features a film reel hero effect,
book cards, an author bio section, and an island guides explore grid. It is the main entry
point to the site and the book sales funnel. Requires `npm start` to preview locally.

## Implementation Details

**File:** `index.njk` (Eleventy template — NOT static HTML)
**Styles:** `css/hub.css`
**JS:** `js/hero-reel.js` (film reel flash effect)

**Section order:** Hero → Books → About/Bio → Author → Explore (guides)
- Explore is last — keeps the book funnel intact before branching to guides

**Hero reel:**
- 6 optimised JPEGs in `images/hero/` cycle with a film flash effect
- `js/hero-reel.js` handles the animation loop + flash overlay
- Full viewport height, dark overlay, gold text

**Books grid:**
- Full image overlay cards — `aspect-ratio: 2/3` (portrait), gradient overlay
- `.book-card-badge` — absolute top-right, gold→orange gradient, white ring shadow
- `.book-card-overlay` — bottom of image; title + subtitle + foot row
- Coming-soon cards: `linear-gradient(135deg, var(--green-mid), var(--green-deep))` bg; large Playfair italic centered label

**Bio section:**
Structured 3-act author bio with:
- **Drop cap** — `.bio-drop-cap::first-letter`: gold, Playfair, `4rem`, floated left
- **Chapter breaks** — `.bio-chapter` flex row with gold hairlines; labels: *The Island*, *The Music*, *The Work*
- **Pull quote** — `.bio-pull-quote`: large gold italic Playfair; text: *"Music became my first language."*
- **Island 2-column** — `.bio-island-layout`: `grid-template-columns: 1fr 1.5fr`; photo (`aspect-ratio: 3/4`)

**Explore grid:**
- Island guide cards linking to guide pages
- Same card pattern as book cards

**Charity callout:**
- Opt-in with `showCharity: true` in `SiteComponents.init()`
- Hub has this enabled

**Section icons (hub):**
- 80px circle, `linear-gradient(135deg, var(--green-mid), var(--green-light))`, gold icon colour
- Reference: `.blog-promo-icon` in `css/hub.css`

**Inline links in dark sections:**
- `.bio-inline-link` — gold, underlined (hub bio section)

## Decisions Made
- **Eleventy for hub** — hub uses Nunjucks template inheritance and Eleventy data, so `index.njk`
  is the right approach. Book/guide pages don't need this.
- **Film reel hero** — visual storytelling before the user even reads a word. Unique brand
  moment that sets the site apart from generic book landing pages.

## Known Issues / Gotchas
- `index.njk` CANNOT be served with `python3 -m http.server` — always use `npm start`
- Adding a new book: create `/new-book-title/` folder + add card to hub books grid in `index.njk`

## Change Log
- 2026-03-11 Created
