---
id: C006
type: COMPONENT
status: ACTIVE
created: 2026-03-11
updated: 2026-03-11
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

**Custom toolbar components (registered in `cms-components.js`):**
| ID | Label | What it inserts |
|----|-------|----------------|
| `data-table` | Table | GFM pipe-table with optional caption |
| `callout` | Callout | Tip / Fun Fact / Note / Warning box |
| `youtube` | YouTube | Responsive 16:9 iframe from any YouTube URL |
| `pull-quote` | Pull Quote | Large italic standout line with optional attribution |
| `definition` | Definition | Term + language label + explanation (ideal for patois/folklore) |
| `image-caption` | Image | `<figure>` with `<figcaption>` + size/ratio/border/shadow options |
| `cta-button` | Button | Centred gold or bordered link button |

**To add a new toolbar component:**
Copy the template block at the bottom of `cms-components.js` and fill in:
`id`, `label`, `fields`, `pattern`, `fromBlock`, `toBlock`, `toPreview`

**Image component fields (Mar 2026 addition):**
- Size: full / half / float-left / float-right
- Ratio: natural / 16:9 / 4:3 / 3:4 / 1:1
- Border: yes/no; Shadow: yes/no

**`references` field — ⚠️ critical format (see L001):**
Must use `>-` YAML block scalar with `- ` bullet prefix per item:
```yaml
references: >-
  - First reference text here

  - Second reference text here
```
Plain paragraph format or YAML list format (`- "item"`) breaks the Slate.js markdown widget
toggle AND causes a Slate.js crash (`e.value.split is not a function`).

## Decisions Made
- **GitHub OAuth backend** — no separate CMS backend to maintain. Quincy authenticates with
  his existing GitHub account. Posts are stored as Markdown in the repo.
- **Custom components in `cms-components.js`** — extends the CMS toolbar without modifying
  Decap CMS internals. Easy to add new components by following the existing pattern.

## Known Issues / Gotchas
- CMS pushes to `main` → always pull before pushing local commits
- The `references` YAML format is non-obvious — see L001 for the full story
- Slate.js markdown widget crashes if `references` content is not in the `- ` bullet format

## Change Log
- 2026-03-11 Created
