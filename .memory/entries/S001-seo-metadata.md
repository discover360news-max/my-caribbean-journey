---
id: S001
type: STANDARD
status: ACTIVE
created: 2026-03-20
updated: 2026-03-20
related: C005, C003, C004, C007
---

# SEO Metadata — Patterns & Conventions

## Target search intents
1. "I Am Tobago book" — book landing (`/i-am-tobago/`)
2. "Tobago history / culture" — blog listing + posts (`/blog/`)
3. "Things to do in Tobago" — guide (`/my-tobago-guide/`)

## Per-page title / description conventions

| Page | Title pattern | Description notes |
|------|--------------|-------------------|
| `/i-am-tobago/` | `I Am Tobago — Folklore, Culture & Heritage of Tobago` | Must include the word **"book"** explicitly |
| `/my-tobago-guide/` | `Things to Do in Tobago \| The Insider Guide…` | Lead with "things to do in Tobago" — high-volume tourist intent |
| `/blog/` | `Tobago History, Culture & Caribbean Essays` | Tobago-specific; include author name in description |
| Blog posts | `{{ title }} — My Caribbean Journey` | Driven by post `excerpt` — keep excerpts ~160 chars |

## BlogPosting JSON-LD schema (`_includes/blog-base.njk`)

Required fields (as of Mar 2026):
```json
"image": "...",
"datePublished": "...",
"dateModified": "...",
"keywords": ["tag1", "tag2"],
"headline": "...",
"description": "...",
"author": { "@type": "Person", "name": "..." },
"publisher": { "@type": "Organization", ... },
"mainEntityOfPage": { "@type": "WebPage", "@id": "..." }
```

## OG article tags (`_includes/blog-base.njk`)

All blog posts emit these after the standard OG block:
```html
<meta property="og:article:published_time" content="{{ page.date | htmlDateString }}">
<meta property="og:article:modified_time" content="{{ page.date | htmlDateString }}">
<meta property="og:article:section" content="{{ category | categoryLabel if category else 'Culture' }}">
{% for tag in postTags %}<meta property="og:article:tag" content="{{ tag }}">{% endfor %}
```

`og:article:section` uses the Eleventy `categoryLabel` filter with a `'Culture'` fallback for posts without a category.

## Sitemap (`sitemap.njk`)

- Blog posts: `<lastmod>` auto-generated from `post.date`
- Static pages: `<lastmod>` is **hardcoded** — update manually when pages change significantly
- Current lastmod dates: homepage `2026-03-19`, blog `2026-03-19`, i-am-tobago `2026-03-01`, guide `2026-03-01`, contact `2026-03-01`
- `/contact/` entry: `priority: 0.5`, `changefreq: yearly`

## Google Search Console (not yet set up as of Mar 2026)
- Property: `https://mycaribbeanjourney.com`
- Verify via DNS TXT in Cloudflare
- Submit sitemap: `https://mycaribbeanjourney.com/sitemap.xml`

## Change Log
- 2026-03-20 Created
