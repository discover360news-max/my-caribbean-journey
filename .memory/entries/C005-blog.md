---
id: C005
type: COMPONENT
status: ACTIVE
created: 2026-03-11
updated: 2026-03-11
related: CFG01, C006, D001
---

# Blog System — Eleventy + Decap CMS

## Summary
The blog uses Eleventy 2.0 for templating. Posts are Markdown files in `blog/posts/` with
YAML frontmatter. Two content types: Blog Posts (`type: post`) and Island Stories (`type: story`).
Both share the same layout and all features. Listing page is `blog/index.njk`.

## Implementation Details

**Key files:**
```
blog/
  index.njk             ← Listing page (filter bar + post grid)
  posts/                ← All .md post files
  images/               ← Blog post images (CMS media_folder)
  posts/posts.11tydata.js    ← Sets type:"post" + tags:"post" for collection
  posts/stories.11tydata.js  ← Sets type:"story" + tags:"post" for collection
_includes/
  blog-base.njk         ← HTML shell: head, nav, footer, support.js
  blog-post.njk         ← Post template: header, featured image, prose, tags, share, table JS
css/
  blog.css              ← All blog styles: listing, post, prose, CMS components, responsive
```

**Collections:**
- `collections.post` — both types, filtered by `tags: "post"` (set in 11tydata.js files)
- ⚠️ NEVER use `tags:` in post frontmatter — use `postTags:` for user-visible keywords
  (`tags` is reserved for Eleventy collection membership; overriding it breaks collection)

**Post frontmatter fields:**
| Field | Type | Notes |
|-------|------|-------|
| `type` | string | `"post"` or `"story"` |
| `title` | string | |
| `date` | YYYY-MM-DD | |
| `author` | string | Default "Quincy" from data file |
| `category` | string | Slug: `culture`, `history`, `travel`, `food`, `music`, `news` |
| `featuredImage` | path | e.g. `/blog/images/my-image.webp` |
| `postTags` | list | User-visible tags (NOT Eleventy `tags`) |
| `excerpt` | text | Listing cards + OG meta — target ~160 chars for full meta description |
| `featured` | boolean | Pins to top of listing |
| `draft` | boolean | Hides from live site |
| `references` | markdown | Optional — rendered below post body via `markdownify` filter |
| `youtubeId` | string | Optional — YouTube video ID only (not full URL). Powers Watch tab in sidebar. |
| `audioUrl` | string | Optional — Audio file URL for Listen tab. Shows "Coming soon" when absent. |

**Eleventy filters (`.eleventy.js`):**
| Filter | Usage | Notes |
|--------|-------|-------|
| `readableDate` | `{{ date \| readableDate }}` | "February 27, 2026" |
| `htmlDateString` | `{{ date \| htmlDateString }}` | ISO for `datetime` attr |
| `categoryLabel` | `{{ category \| categoryLabel }}` | Slug → display label |
| `truncateWords` | `{{ excerpt \| truncateWords(30) }}` | Trims to N words + `…` |
| `markdownify` | `{{ references \| markdownify \| safe }}` | Renders markdown from frontmatter |

**Blog listing cards (redesigned Mar 2026):**
- Image: always renders, `aspect-ratio: 1/1`, green gradient fallback
- Overlay: `::after` dark green gradient; `.post-card-overlay` (absolute, bottom 0) holds title + excerpt
- "NEW" badge: `position: absolute; top/right 0.75rem; z-index:2` — gold→orange gradient
- Featured card (`.is-featured`): `grid-column: 1/-1`, `aspect-ratio: 16/7`; collapses when filter active
- CTA text: **"Dive in"** (not "Read more") — Quincy's voice

**Filter section:**
- `.filter-pill` above grid — hidden until JS finds chips; links to `#filters` anchor
- Chips below grid in `.post-filters` section; highlights with 3-blink gold animation on pill click
- Active chip: solid gold bg; idle: green-tinted bg + border

**Blog post features:**
- **Featured image**: overlaps hero — `padding-bottom: 10rem` on header, `margin: -7rem auto 0` on image
- **Breadcrumb**: set via `window._mcjCrumbs` before `SiteComponents.init()` runs
- **Sidebar**: Always renders now (was conditional on related posts). Contains:
  1. **Listen/Watch widget** (`.post-media-widget`) — tab UI, "Coming soon" placeholders; Watch shows YouTube embed when `youtubeId` is set; Listen shows `<audio>` when `audioUrl` is set.
  2. **"Down the rabbit hole"** — related posts (conditional, only when related posts exist)
- **Table wrapper**: inline JS in `blog-post.njk` wraps all `.prose table` in `.table-wrapper` div on load
- **Em dash treatment**: `highlightEmDashes()` in shared JS applies gold colour to em dashes in prose

**Prose styles (`.prose` in `css/blog.css`):**
- Links: `var(--gold)` (not `--green-mid` — blends into body text)
- `text-wrap: pretty`; `max-width: 68ch; font-size: 1.075rem`
- `display: flow-root` — contains floated images without clearfix

**CMS component styles (all in `css/blog.css`):**
| Component | Class(es) | Visual |
|-----------|-----------|--------|
| Pull Quote | `.pull-quote` | Centred Playfair italic, gold borders, `"` watermark |
| Definition | `.definition-box` | Green-mid left border, tinted bg, optional gold pill |
| Image+Caption | `.post-figure` + modifiers | Full-width default; size/ratio/border/shadow via modifiers |
| Button/CTA | `.post-cta` + `.btn` | Centred, uses shared `.btn-primary`/`.btn-outline-dark` |
| Callout | `.callout .callout-{type}` | `tip` (green), `fact` (gold), `note` (muted), `warning` (orange) |
| YouTube | `.youtube-embed` | 16:9 padding-bottom, border-radius 12px |
| Table | `.table-wrapper` + `.prose table` | Rounded, green gradient thead, alternating rows |

**Image component modifier classes (`.post-figure`):**
- `.post-figure--half` — `max-width: 50%` centred
- `.post-figure--float-left` / `--float-right` — `max-width: 45%`, floated
- `.post-figure--ratio-16-9` / `--ratio-4-3` / `--ratio-3-4` / `--ratio-1-1` — forces aspect ratio
- `.post-figure--border` — gold tint border; `.post-figure--shadow` — box-shadow

**Blog images:**
- Target: 800px wide, WebP, ~80–130KB (quality 82 via Pillow)
- `sips` (macOS) cannot write WebP — use `pip3 install Pillow` + Pillow script
- Fade-in via JS: `opacity: 0` → `.img-loaded` class; CLS fixed via `aspect-ratio` on containers

**Local preview (blog):**
```bash
npx @11ty/eleventy        # builds to _site/
cd _site
python3 -m http.server 8888
```

## Known Issues / Gotchas
- ⚠️ NEVER add `tags:` to post frontmatter — use `postTags:` instead
- CMS (Decap/Evently) pushes directly to `main` — always `git pull --rebase` before local pushes
- References field format: must use `>-` YAML scalar with `- ` prefix (see L001)

## Change Log
- 2026-03-11 Created
- 2026-03-20 Updated: excerpt ~160 char target for meta description (see S001)
