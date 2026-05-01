# My Caribbean Journey — Project Memory Index
Last updated: 2026-04-13
Project: Caribbean culture hub — books, island guides, curated resources | Stack: Eleventy 3.x + plain HTML/CSS/JS | Deploy: Cloudflare Pages

## How to use this index
- Read this file at the start of every session
- Each line = one memory entry. Read the linked .md file for full context.
- Keep this file under 60 lines. Never add prose — entries only.
- Update STATUS inline when things change (ACTIVE → DEPRECATED etc.)

## Entries
CFG01 | CONFIG    | ACTIVE      | Eleventy 3.x + plain HTML/CSS/JS + Cloudflare Pages setup → .memory/entries/CFG01-project-setup.md
D001  | DECISION  | ACTIVE      | Design tokens: green/gold palette, Playfair+Inter, shared.css tokens → .memory/entries/D001-design-tokens.md
D002  | DECISION  | ACTIVE      | Shared component system: SiteComponents.init() JS template literal pattern → .memory/entries/D002-shared-component-system.md
D003  | DECISION  | ACTIVE      | No-framework rule: plain HTML/CSS/JS; Eleventy only for blog + hub → .memory/entries/D003-no-framework-rule.md
C001  | COMPONENT | ACTIVE      | Shared nav + footer: components.js, SiteComponents.init() per page → .memory/entries/C001-shared-nav-footer.md
C002  | COMPONENT | ACTIVE      | Hub homepage: index.njk + hero reel + Eleventy, books/bio/explore sections → .memory/entries/C002-hub-homepage.md
C003  | COMPONENT | ACTIVE      | I Am Tobago book landing: hero, carousel, reviews, buy CTA, store locator → .memory/entries/C003-book-landing.md
C004  | COMPONENT | ACTIVE      | My Tobago Guide: directory, live search + scoring + synonyms, listing tray (Quincy notes, Leaflet map, directions), scroll modal → .memory/entries/C004-island-guide.md
C005  | COMPONENT | ACTIVE      | Blog system: Eleventy collections, listing + post templates, image overlay cards → .memory/entries/C005-blog.md
C006  | COMPONENT | ACTIVE      | Evently (Decap CMS): /admin/, config.yml, custom toolbar components → .memory/entries/C006-evently-cms.md
C007  | COMPONENT | ACTIVE      | Contact page: /contact/, GAS-powered form, all contact links updated → .memory/entries/C007-contact.md
L001  | LEARNING  | ACTIVE      | Evently references YAML: >- scalar + "- " prefix per item (Slate.js crash fix) → .memory/entries/L001-evently-references-format.md
L002  | LEARNING  | ACTIVE      | @view-transition causes FOUC with JS-injected nav/footer — removed, do not re-add → .memory/entries/L002-page-transitions-fouc.md
B001  | BUG       | DEPRECATED  | Buy section bg: decorative <img> → CSS ::after resolved FOUC on first load → .memory/entries/B001-buy-section-bg-fouc.md
C008  | COMPONENT | ACTIVE      | Reviews carousel: SiteComponents.initReviews(), data in reviews-data.js, .review-quote card structure → .memory/entries/C008-reviews-component.md
S001  | STANDARD  | ACTIVE      | SEO metadata: target intents, title/desc conventions, BlogPosting schema, OG article tags, sitemap lastmod, GSC setup → .memory/entries/S001-seo-metadata.md
C009  | COMPONENT | ACTIVE      | Listen/Watch sidebar widget: audioTracks (R2), youtubeId, playlist UI, ElevenLabs workflow → .memory/entries/C009-listen-watch-widget.md
L003  | LEARNING  | ACTIVE      | Mobile UX standards: safe-area, dvh, touch targets, font floor — audit tracker at /AUDIT.md → .memory/entries/L003-mobile-ux-standards.md
C010  | COMPONENT | ACTIVE      | I Am Tobago historical map: 27 georeferenced pins, affine transform formula, Photon API geocoding, pan/zoom, filter, popup → .memory/entries/C010-historical-map.md
L004  | LEARNING  | ACTIVE      | Curly quotes in blog frontmatter break Decap CMS js-yaml — pre-commit hook added, fix command documented → .memory/entries/L004-curly-quotes-cms-yaml-error.md
FB001 | FEEDBACK  | ACTIVE      | btn-outline (cream text) is for dark backgrounds; use btn-outline-dark on white/light backgrounds → .memory/entries/feedback-btn-outline-variants.md
