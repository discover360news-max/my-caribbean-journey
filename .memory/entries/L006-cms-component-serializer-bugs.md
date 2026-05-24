---
name: L006-cms-component-serializer-bugs
description: Three recurring bugs in Decap CMS custom components caused by remark serializer and textarea line endings — patterns, toBlock, fromBlock fixes
metadata:
  type: feedback
---

# Decap CMS Component Bugs — Serializer & Line Endings

Three root-cause bugs that manifested as: literal newlines instead of `<br>` in content, missing closing tags, and blocks showing as raw markdown after the first save/reload. Affected callout, pull-quote, and definition components. Fixed 2026-05-24 in `admin/cms-components.js`.

**Why:** Decap CMS's remark-based markdown serializer pretty-prints HTML blocks on every save, adding newlines between structural tags. Some browsers/OS also send `\r\n` or bare `\r` line endings from `<textarea>` widgets.

---

## Bug 1 — Pattern too strict (fails after first save)

Decap's serializer converts a single-line block like:
```html
<div class="callout callout-note"><p><strong>📌 Note</strong> content</p></div>
```
into a multi-line form on next load:
```html
<div class="callout callout-note">
<p><strong>📌 Note</strong> content</p>
</div>
```
The old `pattern` had no tolerance for whitespace between tags, so it stopped matching after the first round-trip and the block was shown as raw HTML.

**Fix:** Add `\s*` between all structural HTML elements in every `pattern` regex.

```js
// Before
pattern: /^<div class="callout callout-(...)"><p><strong>[^<]+<\/strong> ([\s\S]*?)<\/p><\/div>$/

// After
pattern: /^<div class="callout callout-(...)">\s*<p>\s*<strong>[^<]+<\/strong>\s*([\s\S]*?)<\/p>\s*<\/div>$/
```

---

## Bug 2 — `\r\n` / `\r` line endings not normalised in `toBlock`

`toBlock` only replaced `\n`:
```js
content.replace(/\n/g, '<br>')
```
If the textarea sent `\r\n` (Windows) or `\r` alone (old Mac), the `\r` survived into the saved markdown, where some parsers treat it as a line ending — splitting the HTML block and breaking the pattern match on reload.

**Fix:** Normalise before replacing:
```js
content.replace(/\r\n?/g, '\n').replace(/\n/g, '<br>')
```

---

## Bug 3 — `fromBlock` only matched `<br>`, not `<br/>` or `<br />`

The serializer normalises self-closing tags, so `<br>` in stored HTML could become `<br/>` or `<br />`. The old `fromBlock` didn't match those variants, leaving literal `<br/>` text in the content field on second edit.

**Fix:**
```js
// Before
content.replace(/<br>/g, '\n')

// After
content.replace(/<br\s*\/?>/gi, '\n').trim()
```

---

## Components fixed
All three bugs were applied to: **callout**, **pull-quote**, **definition**.

Other components (youtube, spotify, gallery, cta-button, data-table, image-caption) don't have multiline text content, so they're unaffected.

**How to apply:** If adding a new component with a `widget: 'text'` field, apply all three patterns above from the start.
