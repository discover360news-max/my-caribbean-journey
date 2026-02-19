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
Used for: hero, features, buy CTA, bio, footer.
```css
background: linear-gradient(135deg, var(--green-deep) 0%, #0a2e15 50%, var(--green-dark) 100%);
color: var(--cream);
```
Use `.btn-outline` here. Section label colour: `--gold`.

### Light section
Used for: about, explore, reviews, stores, guide results.
```css
background: var(--warm-white); /* alternate with var(--cream) */
```
Use `.btn-outline-dark` here. Section label colour: `--green-mid`.

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

## Rules
- Always use tokens — never hardcode hex values in page CSS
- `.btn-outline` on dark backgrounds only; `.btn-outline-dark` on light backgrounds only
- Do not duplicate shared styles (tokens, buttons, nav, footer) in page CSS files
- New pages always load `/shared/shared.css` before their own CSS
- `--orange` is an accent only — never use it as a primary button or heading colour
