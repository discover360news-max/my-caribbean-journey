/* =============================================================
   I Am Tobago — Historical Map Location Data
   Static data from the book. Never changes.
   x / y = percentage of SVG viewBox (0-100) width / height.
   Categories: history | folklore | nature | village | religious

   Pin placement formula (georeferenced to Quincy's traced island):
   Derived from 9 manually-verified ground control points (2026-03-22).
   Max residual error: 1.3% x, 1.0% y.

     x% = 218.8825 * lon + 1.9429 * lat + 13310.65
     y% = -8.5133  * lon - 293.6998 * lat + 2832.00

   Where lon = decimal degrees West (negative), lat = decimal degrees North.
   Example: Fort King George (11.177666°N, 60.727098°W):
     x% = 218.8825 * (-60.727098) + 1.9429 * 11.177666 + 13310.65 ≈ 40.2
     y% = -8.5133  * (-60.727098) - 293.6998 * 11.177666 + 2832.00 ≈ 65.5

   Offshore features (Buccoo Reef, Nylon Pool) retain offshore positions —
   they render just off the SW coast as expected.
   ============================================================= */

const MAP_LOCATIONS = [

  /* ── Village ─────────────────────────────────────────────── */
  {
    id: 'les-coteaux',
    name: 'Les Coteaux',
    category: 'village',
    x: 47.3, y: 69.0,
    image: '/blog/images/beyondfolklore.webp',
    description: 'For many in Tobago, the name Les Coteaux carries a feeling before it carries a meaning. Long before it became known for folklore — for Gang Gang Sarah who first landed here, for La Diablesse who walks its roads — Les Coteaux was shaped by the weight of plantation history and the quiet, enduring survival of its people.'
  },

];
