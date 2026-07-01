---
id: C012
type: COMPONENT
status: ACTIVE
created: 2026-07-01
updated: 2026-07-01
related: C004, C008
---

# Partners Section — Sponsor/Tour-Operator Profile Pages

## Summary
New `/partners/` top-level directory — a reusable template for full profile pages
offered to trusted local tour operators, guides, and sponsors as part of a package
(beyond just a directory card). First entry: **Tobago Tours With Keiron**.

**Live path:** `/partners/tobago-tours-with-keiron/`
**Structure:** Plain static HTML page, same conventions as `i-am-tobago/` (own
`css/style.css` + `js/reviews-data.js`, shared nav/footer via `SiteComponents.init()`).

---

## Why this exists
Quincy wanted Frankie Tours (previously featured in the My Tobago Guide directory)
replaced with Tobago Tours With Keiron, but linked to a full page on-site instead of
straight to Facebook — something sponsors/partners can be given as a value-add.

## Page sections (Keiron's page, reusable pattern for future partners)
1. Hero — logo, tagline, Call/WhatsApp CTA
2. Signature excursion callout (hand-feeding hummingbirds, w/ real photo)
3. "Five Ways to Experience..." numbered grid — copy pulled directly from the
   partner's own marketing flyer (not invented), for authenticity
4. Package deep-dive section (dark green, like `.package`) — full breakdown of an
   all-inclusive excursion
5. Nightlife/after-hours section
6. Gallery — real cropped photos (see below)
7. Book cross-sell — if a partner already promotes Quincy's book on tour, a
   two-column section with their own flyer image
8. Quincy's endorsement quote (site revolves around this — always ask Quincy for
   wording or a draft to edit, never publish unreviewed)
9. Reviews carousel (`SiteComponents.initReviews()`) — **critical gotcha below**
10. Contact CTA (Call / WhatsApp / Email using `tel:` / `wa.me` / `mailto:`)
11. Dark-green "Explore the Guide" cross-sell back to `/my-tobago-guide/`

## Gotcha: reviews carousel CSS is NOT in shared.css
`SiteComponents.initReviews()` injects markup referencing `.review-card`,
`.reviews-track`, `.reviewer`, `.review-stars`, etc. — but ALL of that CSS lives in
each page's own stylesheet (e.g. `i-am-tobago/css/style.css`), not `shared/shared.css`.
A new page's stylesheet must copy this whole block or the reviews section renders
completely unstyled. Same applies to `.hero`, `.about-grid`, `.features-grid`,
`.buy-layout` etc. — only tokens/buttons/nav/footer/`.container`/`.section-title`
are truly global; section layouts are copy-per-page by convention on this site.

## Asset workflow for partner-provided marketing images
Partners often hand over Facebook flyer graphics (JPEG collages with baked-in text),
not raw stock photos. Workflow used:
1. `sips -g pixelWidth -g pixelHeight` to get dimensions
2. ImageMagick `magick <src> -crop WxH+X+Y +repage <out>.jpg` to isolate individual
   photos/logos from a collage (sips crop offsets don't behave as expected — use
   ImageMagick instead)
3. `cwebp -q 82-90` to convert to webp for the site
4. Read tool to visually verify each crop before using it

## Eleventy passthrough gotcha
New top-level static directories are NOT served automatically — must be added to
`.eleventy.js`'s `addPassthroughCopy()` list or the dev server 404s and the live
build won't include them either. `partners` was added alongside `my-tobago-guide` etc.

## Related file
`my-tobago-guide/js/guide-data.js` — Keiron's directory card entry now points to
`/partners/tobago-tours-with-keiron/` instead of an external Facebook URL.
