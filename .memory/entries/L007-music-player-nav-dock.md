---
id: L007
type: LEARNING
status: ACTIVE
created: 2026-07-01
updated: 2026-07-01
related: C001
---

# Sitewide Music Player — Moved From Floating Notch to Docked Nav Widget

## What changed
The sitewide music player (`#mcj-music-player`, plays "Jamboulé — Ramajay
Intercoastal") used to be `position: absolute; bottom: -22px` — a pill-shaped
"notch" hanging below `.site-header`, a sibling of `<nav>`. Quincy flagged it as
visually flawed. Redesigned to sit inline within the nav bar itself: a compact,
rounded-square two-button cluster (play/pause + mute), docked to the right of the
nav links, before the hamburger toggle.

## Where
- Markup: `shared/components.js` → `renderHeader()` — music player markup is now
  built as `musicPlayerHtml` and inserted inside a new `.site-nav-right` wrapper
  (which also holds `.site-nav-links` and `.site-nav-toggle`), so `.site-nav-inner`
  still cleanly space-betweens just two children (logo, site-nav-right).
- Styles: `shared/shared.css` — `.music-player`, `.music-player-btn`,
  `.music-player-note` (all sitewide, since nav is shared).

## Design notes
- Track title text was dropped entirely (doesn't fit the square format) — now only
  available as a `title` attribute tooltip on the container.
- The pulsing "now playing" indicator became a small gold dot badge on the corner
  of the play button (`.music-player-note`, absolutely positioned), instead of a
  separate `♪` glyph taking up its own flex slot.
- All JS behavior (play/pause, mute, fade-in volume ramp, first-visit toast
  highlight via `.highlight` class, pausing when blog audio plays via
  `window._mcjPauseSiteMusic`) was left untouched — every element kept the same
  `id`, so no JS changes were needed, only the surrounding markup/CSS.
