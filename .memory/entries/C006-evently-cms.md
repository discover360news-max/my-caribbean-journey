---
id: C006
type: COMPONENT
status: ACTIVE
created: 2026-03-11
updated: 2026-04-30
related: C005, L001
---

# Evently (Decap CMS) — Admin Interface

## Summary
Decap CMS is the content management system at `/admin/`. Quincy calls it "Evently". It uses
the GitHub OAuth backend — Quincy authenticates with GitHub and publishes posts directly to
the `main` branch. Custom toolbar components live in `admin/cms-components.js`.

## Implementation Details

**Files:**
```
admin/
  index.html          ← CMS entry point (minimal — loads Decap CMS + cms-components.js)
  config.yml          ← Field definitions for both collections (Blog Posts + Island Stories)
  cms-components.js   ← All CMS.registerEditorComponent() toolbar button definitions
```

**Decap CMS version (pinned):**
- Loaded via unpkg CDN: `decap-cms@3.12.2` (pinned as of 2026-04-30)
- To upgrade: test the new version locally first, then update the version in `admin/index.html`

**Access:**
- URL: `mycaribbeanjourney.com/admin/`
- Quincy authenticates via GitHub OAuth — must have Write access to the repo
- To grant access: GitHub repo → Settings → Collaborators → add GitHub username → Write

**CMS pushes directly to `main`:**
- Every time Quincy saves or publishes a post, a commit is pushed to `main`
- This means local and remote diverge frequently
- Always `git pull --rebase` before pushing local changes

**Collections defined in `config.yml`:**
1. **Blog Posts** — `type: post` (set in `posts/posts.11tydata.js`)
2. **Island Stories** — `type: story` (set in `posts/stories.11tydata.js`)

⚠️ Both collections have 100% identical fields. Any field added/changed must be done in BOTH.
A warning comment is at the top of config.yml as a reminder.

**Fields per collection (as of 2026-04-30):**
- Title, Collection Type, Category, Draft, Featured
- Featured Image, Publish Date, Author
- **SEO Title** (optional — overrides title in <title>, OG, Twitter, ld+json)
- **SEO Description** (optional — overrides excerpt in all meta description slots)
- YouTube Video ID
- **Audio Tracks** (list of `{title (optional), url}` objects — NOT flat strings)
- Excerpt, Tags (postTags), Body (markdown), References

**Custom toolbar components (registered in `cms-components.js`):**
| ID | Label | What it inserts |
|----|-------|----------------|
| `data-table` | Table | GFM pipe-table with optional caption |
| `callout` | Callout | Tip / Fun Fact / Note / Warning / Contributor boxes |
| `youtube` | YouTube | Responsive 16:9 iframe from any YouTube URL |
| `spotify` | Spotify | Compact (152px) or expanded (352px) Spotify embed — handles track/album/playlist/episode |
| `pull-quote` | Pull Quote | Large italic standout line with optional attribution |
| `definition` | Definition | Term + language label + explanation (ideal for patois/folklore) |
| `image-caption` | Image | `<figure>` with `<figcaption>` + size/ratio/border/shadow options |
| `gallery` | Gallery | 2-col or 3-col image grid, per-image alt+caption, optional shared caption |
| `cta-button` | Button | Centred gold or bordered link button |

**audioTracks format — ⚠️ object format, not plain strings:**
```yaml
audioTracks:
  - title: "Part 1"   # optional — falls back to "Track N" if blank
    url: https://media.mycaribbeanjourney.com/...
```
The template (`blog-post.njk`) uses `track.url` and `track.title`. Plain string format will break.

**`references` field — ⚠️ critical format (see L001):**
Must use bullet points (`- ` prefix per item). Plain paragraphs or numbered lists crash Slate.js.

**postTags currently in use:** colonialism, coralreef, culture, history, les-coteau, pride, tobago

## Decisions Made
- **GitHub OAuth backend** — no separate CMS backend to maintain
- **Custom components in `cms-components.js`** — extends toolbar without modifying Decap internals
- **SEO fields are optional overrides** — fallback chain: seoTitle → title, seoDescription → excerpt

## Known Issues / Gotchas
- CMS pushes to `main` → always pull before pushing local commits
- The `references` YAML format is non-obvious — see L001
- audioTracks must be object format `{title, url}` — flat strings will break the audio player
- Both collections are duplicated in config.yml — update fields in both or they'll diverge
- Decap's remark serializer pretty-prints HTML blocks on save/reload, adding newlines between tags — patterns must use `\s*` between structural elements or they'll fail after the first round-trip (see L006)
- `\r\n` line endings from certain browsers/OS in textarea widgets leave bare `\r` if only `\n` is replaced — normalise with `/\r\n?/g` before `/\n/g` in all `toBlock` functions (see L006)
- **Preview styles must use `raw: true`** — `CMS.registerPreviewStyle(url)` injects a `<link>` tag that Decap CMS 3.x drops during live preview re-renders. Use `CMS.registerPreviewStyle('@import url("...");', { raw: true })` instead — `<style>` tags survive re-renders. See `admin/cms-components.js` lines 663–671.

## Change Log
- 2026-03-11 Created
- 2026-04-13 Pinned Decap CMS CDN from @^3.0.0 to @3.11.0
- 2026-04-30 Bumped to 3.12.2; added SEO Title/Description fields; restructured audioTracks to {title,url} objects; added Spotify and Gallery toolbar components; fixed references and postTags hints
- 2026-05-24 Fixed callout/pull-quote/definition component bugs: \r\n line endings, strict patterns, <br> variant matching (see L006)
- 2026-05-24 Switched registerPreviewStyle to raw:true @import — fixes preview losing styles during live editing in Decap CMS 3.x
