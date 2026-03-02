# My Caribbean Journey — Design System

The single source of truth for visual decisions. Reference this before building anything new so every page feels like it belongs to the same family.

---

## Color Palette
All tokens live in `/shared/shared.css` under `:root`. Never hardcode hex values in page CSS.

| Token | Value | Usage |
|-------|-------|-------|
| `--green-deep` | `#0d1f12` | Dark backgrounds, hero, footer |
| `--green-dark` | `#142a19` | Gradient pair for `--green-deep` |
| `--green-mid` | `#1a4a2e` | Accent green, icons, card borders |
| `--green-light` | `#2d6b45` | Lighter green accents |
| `--gold` | `#d4a030` | Primary accent — CTAs, highlights, stars |
| `--gold-light` | `#e8b84a` | Hover state for gold elements |
| `--gold-glow` | `#d4a03060` | Box shadows, glow effects |
| `--orange` | `#e8652a` | Secondary accent — use sparingly |
| `--cream` | `#f5f0e8` | Text on dark backgrounds |
| `--warm-white` | `#faf8f4` | Page/section background |
| `--text-dark` | `#1a1a1a` | Body text |
| `--text-muted` | `#5a5a52` | Descriptive / secondary text |
| `--text-light` | `#e8e4dc` | Nav links, footer text on dark |

---

## Typography
Loaded via Google Fonts in every page `<head>`. Do not centralise — each page loads its own.

| Token | Font | Usage |
|-------|------|-------|
| `--font-display` | Playfair Display, Georgia, serif | Headings, section titles, pull quotes |
| `--font-body` | Inter, system sans-serif | Body copy, UI labels, buttons |

### Type scale
| Role | Size |
|------|------|
| Hero title | `clamp(2.5rem, 5vw, 4rem)` |
| Section title (`.section-title`) | `clamp(2rem, 4vw, 3rem)` |
| Section label (`.section-label`) | `0.85rem`, uppercase, `letter-spacing: 0.15em` |
| Card title | `1.25–1.5rem` |
| Body | `1rem – 1.05rem` |
| Small / meta | `0.85–0.9rem` |

---

## Spacing
| Token | Value |
|-------|-------|
| `--space-xs` | `0.5rem` |
| `--space-sm` | `1rem` |
| `--space-md` | `1.5rem` |
| `--space-lg` | `3rem` |
| `--space-xl` | `5rem` |
| `--space-2xl` | `8rem` |

---

## Shape & Motion
| Token | Value | Usage |
|-------|-------|-------|
| `--radius` | `12px` | Inputs, small elements |
| `--radius-lg` | `20px` | Cards, hero images, modals |
| `--transition` | `0.3s ease` | All hover/state transitions |

---

## Buttons
Base class is always `.btn`. Combine with a variant. Defined in `/shared/shared.css`.

| Variant | Background | Text | Use on |
|---------|-----------|------|--------|
| `.btn-primary` | `--gold` | `--green-deep` | Any background — primary CTA |
| `.btn-outline` | Transparent | `--cream` | **Dark sections only** (hero, features, buy) |
| `.btn-outline-dark` | Transparent | `--green-deep` | **Light sections only** (about, author, stores) |
| `.btn-large` | — modifier | — | Adds larger padding, for standalone CTAs |
| `.btn-firefly` | — modifier | — | Adds firefly particle effect on hover (requires page JS) |

---

## Section Patterns

### Dark section
Used for: hero, features, buy CTA, bio, book newsletter, guide book promo, footer.
```css
background: linear-gradient(135deg, var(--green-deep) 0%, #0a2e15 50%, var(--green-dark) 100%);
color: var(--cream);
```
Use `.btn-outline` here. Section label colour: `--gold`.

### Light section
Used for: about, author, reviews, stores, guide results.
```css
background: var(--warm-white); /* alternate with var(--cream) */
```
Use `.btn-outline-dark` here. Section label colour: `--green-mid`.

### Hub page container width
All sections on the hub (`index.html`) override the shared container to `max-width: 1100px` via `hub.css`. Any new section added to the hub must be included in that override rule to stay consistent. The shared default is `1200px`.

### Standard section header
```html
<div class="section-header">
  <p class="section-label">Category Label</p>
  <h2 class="section-title">Section Title</h2>
</div>
```

---

## Cards

### Book card
- White bg, `--radius-lg`, green gradient image panel on top
- Hover: `translateY(-6px)` + shadow lift
- Link footer: arrow SVG, green → gold on hover
- Grid: `repeat(auto-fill, minmax(300px, 480px))`, `justify-content: center` — cards cap at 480px and centre; row fills naturally as titles are added

### Guide / Store card
- White bg, `--radius-lg`, `display: flex; flex-direction: column`
- Category badge: `rgba(26,74,46,0.08)` bg, `--green-mid` text
- Link footer: `.guide-card-link` — green text + external-link SVG, gold on hover
- Multi-link variant (radio, store): `.guide-card-actions` with `.guide-card-action-link` per link
- Featured: `border-color: --gold` + `box-shadow: 0 0 0 1px --gold-glow`

### Explore card (hub)
- Horizontal flex, white bg, left green border (`border-left: 4px solid --green-mid`)
- Icon block: 68×68, `border-radius: 14px`, green gradient bg, gold icon
- Hover lifts and turns link gold
- Grid: `repeat(auto-fill, minmax(340px, 520px))`, `justify-content: center` — cards cap at 520px and centre; row fills naturally as guides are added

### Store card
- White bg, `--radius-lg`, `display: flex; flex-direction: column; gap: 0.5rem`
- Nation badge → name → address → contact details → socials
- Fields only render when data is present — no empty rows

---

## Icon Blocks
Used in explore cards and section toggles. Always the same treatment:
```css
width: 60–68px;
height: 60–68px;
border-radius: 14px;
background: linear-gradient(135deg, var(--green-deep), var(--green-mid));
color: var(--gold);
```

---

## Hero Newsletter Form
Defined in `/shared/shared.css` under `.hero-newsletter`. Dark section context only.
- Sits below hero action buttons, separated by a subtle `border-top`
- Inputs: `rgba(255,255,255,0.07)` bg, cream text, gold focus border
- Submit: `.btn .btn-primary`
- Inline success message in gold on submit

---

## Special Effects
| Effect | Where | How |
|--------|-------|-----|
| Firefly button | Any `.btn-firefly` | 6 gold/green dots on mouseenter, staggered 80ms, drift up and fade |
| Section fireflies | `.stores` section | Continuous spawn on hover via `setInterval(180ms)`, clear on mouseleave |
| Hero film reel | Hub hero only | Rotating images with white flash, defined in `hero-reel.js` |
| Hero fireflies | I Am Tobago hero | Canvas-based ambient animation, defined in `main.js` |

---

## Link Management — Live / Disabled Pattern

### The rule
Every link that could need to go offline has a `live: true/false` toggle. One change, instant effect across every page it appears on. No hunting through HTML.

### Site-wide CTAs — `SITE_CTAS` in `shared/components.js`
Named CTA registry. Each entry has:

```js
'key-name': {
  label:    'Button label',
  href:     'https://example.com',
  live:     true,       // false = href becomes '#', tooltip shown
  cta:      true,       // true = styled as a nav CTA button
  external: true        // true = opens in new tab
}
```

**To use in a page's `SiteComponents.init()` config:**
```js
navLinks: [
  { label: 'About', href: '#about' },
  SiteComponents.cta('i-am-tobago')   // pulls label, href, cta flag from registry
]
```

**To kill a CTA site-wide:** set `live: false` in the registry. `SiteComponents.cta()` returns `href: '#'` automatically.

**To add a new CTA:** add one entry to `SITE_CTAS`. Reference it from any page.

### Buy buttons — `SITE_CTAS['i-am-tobago-buy']`
Book buy buttons use `.amazon-book-link` class. `main.js` reads `SiteComponents.cta('i-am-tobago-buy')` and applies the url. When `live: false`, all buy buttons become dead + show tooltip.

### Charity component — `CHARITY.live` in `shared/components.js`
```js
var CHARITY = { ..., live: false };
```
- `live: true` — button links to the charity page, opens in new tab
- `live: false` — button stays visible but goes to `#` with a "Coming soon" tooltip

### Guide directory cards — `live` field in `guide-data.js`
```js
{ title: 'Business Name', url: 'https://...', category: 'food-recipes', live: false }
```
- `live: true` (or omitted) — card renders normally
- `live: false` — card is hidden entirely (no confidence in the listing)

### Tooltip
One site-wide label defined as `DISABLED_LABEL` in `shared/components.js`. Change it once, updates everywhere. Currently: `'Coming soon'`.

CSS lives in `shared/shared.css` under `[data-tooltip]`. Tooltip appears above the element on hover/focus.

### `.btn-disabled` class
Applies `opacity: 0.6` and `cursor: not-allowed`. Combined with `data-tooltip` and `href="#"` for the full disabled button treatment.

---

## Modern CSS

Four progressive-enhancement features are used across the codebase. They are zero-JS, forward-compatible, and do not change the visual design — they improve code quality and robustness.

---

### @layer (cascade layers)

**File:** `/shared/shared.css`

**Why:** Locks the shared/page-override hierarchy into the spec. Page CSS always wins over shared components even at equal specificity — no guessing about load order.

**Layer declaration (top of shared.css):**
```css
@layer reset, base, components;
```

| Layer | Contents |
|-------|----------|
| `reset` | Universal box-sizing reset |
| `base` | `:root` tokens + `html`, `body`, `img`, `a` base styles |
| `components` | Everything else — utilities, buttons, nav, footer, animations, etc. |

Page-specific CSS files (`hub.css`, `guide.css`, `style.css`, `blog.css`) are **unlayered** — unlayered styles always beat any `@layer`, so page overrides continue to work at lower specificity.

**Rule for new pages:** Keep page CSS unlayered (no `@layer` wrapper). Only shared.css uses layers.

---

### text-wrap

**Files:** `/shared/shared.css`, `/css/blog.css`

**Why:** Eliminates awkward single-word orphan lines with zero JS.

| Rule | Value | Effect |
|------|-------|--------|
| `body` | `text-wrap: pretty` | Avoids orphans in all body text (inherited) |
| `h1–h5` | `text-wrap: balance` | Even line lengths across all headings |
| `.post-card-title` | `text-wrap: balance` | Card titles in the blog listing |

**Rule for new pages:** No action needed — `body` and heading rules inherit automatically from `shared.css`.

---

### Container Queries

**Why:** Cards adapt to their container width, not the viewport — components are portable to any layout context.

| File | Selector with `container-type` | `@container` query |
|------|---------------------------------|--------------------|
| `hub.css` | `.books-grid` | `max-width: 340px` → reduce `.book-card-image` height |
| `hub.css` | `.explore-grid` | (declared; no query yet — future-proofing) |
| `guide.css` | `.guide-category-cards` | `max-width: 340px` → compact card body padding + title size |
| `blog.css` | `.post-grid` | `max-width: 360px` → compact post card padding + title size |

**Rule for new card grids:** Add `container-type: inline-size` to the grid wrapper. Place `@container` queries immediately after the wrapper rule or in a grouped section at the end of the relevant selector block.

---

### Scroll-Driven Animations

**File:** `/shared/shared.css` (animations section)

**Why:** Replaces the JS `IntersectionObserver` → `.fade-in` / `.visible` class toggle with native CSS `animation-timeline: view()` in supporting browsers.

**How the two systems coexist:**
- JS still adds `.fade-in` (opacity: 0) on load and `.visible` on intersection — this is the fallback for all browsers.
- The `@supports (animation-timeline: view())` block adds a CSS `animation` to `.fade-in` elements. In supporting browsers, the `animation` property takes precedence over the `transition` for `opacity` and `transform`.
- `animation-fill-mode: both` + `animation-range: entry 0% entry 25%` means elements above the fold at load time are held at `opacity: 1` — no flash.

```css
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .fade-in {
      animation: fade-in-up 0.6s ease both;
      animation-timeline: view();
      animation-range: entry 0% entry 25%;
    }
  }
}
```

**Rule for new pages:** Apply `.fade-in` to elements as before — JS adds the class, shared.css handles both the transition fallback and the scroll-driven enhancement automatically. No additional setup needed.

---

## Non-Hero Pages (transparent nav treatment)

Pages without a full-screen hero (e.g. Privacy Policy, Contact) need a green gradient at the top so nav text is legible against the transparent header on load.

**Pattern:** Add a `::before` pseudo-element to the page's main wrapper:

```css
.privacy-page {
  position: relative;
}

.privacy-page::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 18rem;
  background: linear-gradient(to bottom, var(--green-deep) 0%, transparent 100%);
  pointer-events: none;
  z-index: 0;
}

/* Lift content above the gradient */
.privacy-page .container {
  position: relative;
  z-index: 1;
}
```

**Top padding:** `12rem` on the page's main wrapper aligns the first content element with the same distance from the header as the blog listing hero (`9rem` hero padding + `3rem` container padding-top).

---

## Music Player Pill

The music player hangs below the fixed header as a centred pill (`position: absolute; bottom: -22px; left: 50%`).

**States:**
- **Unscrolled:** fully transparent background, invisible border — blends into whatever hero is behind it
- **Scrolled (`.scrolled` on `.site-header`):** semi-transparent dark green + `backdrop-filter: blur(12px)` — matches the header's frosted-glass treatment

```css
/* Base — transparent */
.music-player {
  background: transparent;
  backdrop-filter: none;
  border: 1px solid rgba(212, 160, 48, 0);
  border-radius: 100px;
}

/* Scrolled — blur pill */
.site-header.scrolled .music-player {
  background: rgba(13, 31, 18, 0.6);
  backdrop-filter: blur(12px);
  border-color: rgba(212, 160, 48, 0.22);
}
```

---

## Rules
- Always use tokens — never hardcode hex values in page CSS
- `.btn-outline` on dark backgrounds only; `.btn-outline-dark` on light backgrounds only
- Do not duplicate shared styles (tokens, buttons, nav, footer) in page CSS files
- New pages always load `/shared/shared.css` before their own CSS
- `--orange` is an accent only — never use it as a primary button or heading colour
