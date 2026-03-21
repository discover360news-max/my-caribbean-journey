---
id: L001
type: LEARNING
status: ACTIVE
created: 2026-03-11
updated: 2026-03-11
related: C006, C005
---

# Evently References Field — YAML Format

## Summary
The `references` frontmatter field in blog post Markdown files must use a specific YAML format:
`>-` block scalar with `- ` bullet prefix per item and double blank lines between items.
Any other format breaks both the CMS markdown widget toggle AND the live rendered output.
A plain paragraph format in `>-` causes a Slate.js crash when switching Rich Text ↔ Markdown mode.

## Implementation Details

**Correct format:**
```yaml
references: >-
  - First reference — [Author Name](https://url.com)

  - Second reference — Plain text or markdown link

  - Third reference
```

**Rules:**
- Use `>-` YAML block scalar (not `|`, not `references:\n  - "item"` YAML list)
- Each item starts with `- ` (hyphen + space) on its own line
- Double blank line between items (single blank within `>-` = space; double = paragraph break)
- No smart/curly quotes — straight ASCII only

**Why `>-` and not YAML list?**
YAML list format (`references:\n  - "item one"\n  - "item two"`) produces an array.
The `markdownify` Eleventy filter expects a string. Arrays cause the filter to fail silently.
`>-` scalar collapses the block to a single string, which `markdownify` can render correctly.

**Why the Slate.js crash?**
Decap CMS's markdown widget uses Slate.js internally. When the `references` field contains
a non-string value (e.g., a YAML array), Slate receives it and calls `.split()` on it —
which fails (`e.value.split is not a function`) because arrays don't have `.split`.
The `- ` bullet format keeps the value as a string in all code paths.

**Template (copy for new posts):**
```yaml
references: >-
  - Reference one here

  - Reference two here
```

## Decisions Made
- `>-` was chosen after testing multiple YAML formats. It's the only one that satisfies
  both the Eleventy `markdownify` filter (needs a string) and Slate.js (needs a string).

## Known Issues / Gotchas
- This format is non-obvious — future sessions will likely forget it. Always check this entry.
- The Slate.js crash manifests when switching the CMS editor between Rich Text and Markdown mode.
- All existing posts' `references` fields have been updated to use this format.

## Change Log
- 2026-03-11 Created
