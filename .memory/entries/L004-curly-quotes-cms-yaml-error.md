---
name: Curly quotes in blog frontmatter break Decap CMS
description: Smart/curly apostrophes in YAML block scalars cause js-yaml "scanning simple key" error in Decap CMS — documented error pattern, root cause, and pre-commit hook fix
type: feedback
---

# Curly Quotes in Blog Post Frontmatter Break Decap CMS

## Rule
Never allow curly/smart quotes in `blog/posts/*.md` frontmatter. Replace with straight ASCII equivalents before committing.

**Why:** Quincy's writing tool auto-converts apostrophes and quotes to their curly Unicode equivalents (U+2018 `'`, U+2019 `'`, U+201C `"`, U+201D `"`). When these land in a YAML block scalar (e.g., the `references: >-` or `excerpt:` fields), Decap CMS's bundled js-yaml throws:

```
Error in user YAML:(unkown): could not find expected ':'
while scanning simple key at line N column 1
```

The line number in the error is **0-indexed** and points to the line containing the curly quote within the frontmatter block.

**How to apply:** Before committing any blog post, scan frontmatter for curly quotes. A pre-commit hook at `.git/hooks/pre-commit` now does this automatically — it blocks commits to `blog/posts/*.md` if curly quotes are found in frontmatter and prints the offending file + line.

## Root Cause Detail
The `>-` block scalar is read verbatim by js-yaml, but certain older/bundled versions of js-yaml mishandle specific Unicode characters within block scalars, causing the parser to exit the scalar prematurely. The subsequent indented content (e.g., `  - Burke, L...`) is then encountered at an unexpected parse context, triggering "could not find expected simple key".

## Fix Command
```bash
python3 -c "
import sys
with open('blog/posts/FILENAME.md', 'rb') as f: c = f.read()
fixed = c.replace(b'\xe2\x80\x98', b\"'\").replace(b'\xe2\x80\x99', b\"'\").replace(b'\xe2\x80\x9c', b'\"').replace(b'\xe2\x80\x9d', b'\"')
open('blog/posts/FILENAME.md', 'wb').write(fixed)
"
```

## Pre-commit Hook
Location: `.git/hooks/pre-commit` (not tracked by git — must be re-added after fresh clone).
Scans staged `blog/posts/*.md` files, extracts frontmatter, blocks commit if curly quotes found.

## History
- 2026-03-28: Diagnosed on `reefs-and-the-comfort-of-not-caring.md` (2 curly quotes in frontmatter)
- 2026-03-29: Same issue on `les-coteaux-more-than-folklore.md` (new post by Quincy)
- 2026-03-29: Pre-commit hook added to prevent recurrence
