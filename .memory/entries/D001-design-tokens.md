---
id: D001
type: DECISION
status: ACTIVE
created: 2026-03-11
updated: 2026-05-01
related: C001, CFG01
---

# Design Tokens — My Caribbean Journey Design System

## Summary
Global design system defined in `/shared/shared.css`. Palette is derived from the I Am Tobago
book cover — deep greens and warm gold. Full reference lives in `/DESIGN.md` in the repo.
Tokens are CSS custom properties on `:root`; never hardcoded.

## Implementation Details

**Token file:** `/shared/shared.css` (`:root` block at the top)
**Full reference:** `/DESIGN.md`

### Color tokens
```css
--green-deep:   #0d1f12   /* darkest bg, footer */
--green-dark:   #142a19   /* gradient pair with green-deep */
--green-mid:    #1a4a2e   /* accent green, icons, labels on light bg */
--green-light:  #2d6b45   /* lighter green accents */
--gold:         #d4a030   /* primary accent, CTAs, highlights */
--gold-light:   #e8b84a   /* hover states */
--gold-glow:    rgba(212,160,48,0.25)  /* gold box-shadow glow */
--orange:       #e8652a   /* secondary accent — sparingly, never primary */
--cream:        #f5f0e8   /* light text on dark backgrounds */
--warm-white:   #faf8f4   /* page background */
--text-dark:    #1a1a1a   /* body text on light bg */
--text-muted:   #5a5a52   /* secondary/subdued text */
```

### Typography
```
Display: Playfair Display (serif) — headings, titles, quotes
Body:    Inter (sans-serif)       — paragraphs, UI text, buttons
```
Both loaded from Google Fonts via `<link>` in each page's `<head>` — not centralised.

### Buttons (all in `/shared/shared.css`)
- `.btn-primary` — gold bg, dark text; works on any background; use for CTAs on light sections
- `.btn-outline` — cream text + near-invisible border; dark sections ONLY (invisible on light bg)
- `.btn-outline-dark` — dark text/border; light sections ONLY
- `.btn-large` — size modifier
- `.btn-firefly` — adds firefly particle hover effect (requires page JS)

### Gradient tokens (added 2026-05-01)
Replaces all hardcoded hex gradient stops across hub.css, blog.css, style.css, guide.css:
- `--gradient-hero` — 4-stop 135deg, full-screen heroes
- `--gradient-card-bg` — 3-stop 145deg, card image fallback panels
- `--gradient-section` — 3-stop 135deg, interior dark sections

### Prose tokens (added 2026-05-01)
For `.prose` context in blog posts only:
- `--prose-body: #6b6560` — main paragraph text
- `--prose-lead: #2a2a22` — opening paragraph
- `--prose-strong: #4a4540` — bold text
- `--prose-gold-dark: #9a7020` — definition badge, callout-fact strong

### Keyboard focus (added 2026-05-01)
Global `:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px }` in `@layer base`. Form inputs exempted (use border-color instead). No per-element setup needed.

### Section background rules
- **Dark sections** (hero, features, buy, bio, book-newsletter, guide-book-promo):
  `var(--gradient-section)` bg → use `--gold` labels, `.btn-outline`
- **Hero sections**: `var(--gradient-hero)` (4-stop, darker and richer)
- **Light sections** (about, author, explore, reviews, stores):
  warm-white/cream bg → use `--green-mid` labels, `.btn-outline-dark`

### Icons
- Library: [Lucide Icons](https://lucide.dev/icons) — inline SVG, no icon library
- Standard attributes: `width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"`
- Always normalise pasted Lucide SVGs to `width="40" height="40"` and `stroke-width="1.5"`

### Section icons (dark circular bg)
- 80px circle, `linear-gradient(135deg, var(--green-mid), var(--green-light))`, gold icon colour
- Reference pattern: `.blog-promo-icon` in `css/hub.css`

### Hero sections
- Default: `min-height: 100vh`, full screen
- Scroll indicator: `<div class="hero-scroll"><span>Scroll to explore</span><div class="scroll-arrow"></div></div>` as last child of hero — styles in `shared.css`

### Modern CSS (added Mar 2026)
Four progressive-enhancement features — full docs in `DESIGN.md § Modern CSS`:
- **`@layer reset, base, components`** — declared at top of `shared/shared.css`; page CSS stays unlayered (always wins)
- **`text-wrap: balance`** — on h1–h5 and select elements; `text-wrap: pretty` on body
- **Container queries** — `container-type: inline-size` on books grid, explore grid, guide cards, post grid
- **Scroll-driven animations** — `@supports (animation-timeline: view())` overrides JS `.fade-in` in supporting browsers

## Decisions Made
- **Palette from book cover** — green/gold derived from I Am Tobago cover art to keep brand unified.
- **CSS custom properties** — not Tailwind, not SCSS. Framework-agnostic, readable, no build step.
- **Playfair + Inter** — Playfair gives the editorial, Caribbean feel; Inter is clean and neutral for UI.
- **Google Fonts per-page** — each page loads its own fonts; no centralised font CDN call since pages
  are self-contained and the hub/blog use separate layouts.

## Known Issues / Gotchas
- `.btn-outline` is invisible on light backgrounds — never use it outside dark sections.
- `--orange` is a secondary accent only — using it as a primary CTA colour will look off-brand.
- Lucide SVG `stroke-width` default is 2 — always reduce to 1.5 to match site style.

## Change Log
- 2026-03-11 Created
- 2026-05-01 Added gradient tokens (hero/card-bg/section), prose tokens (body/lead/strong/gold-dark), global :focus-visible rule; replaced all hardcoded gradient hex stops across 4 CSS files
