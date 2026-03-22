# CLAUDE.md — My Caribbean Journey

Auto-loaded by Claude Code at session start.
Read this, then follow the memory protocol below before doing any work.

---

## Step 1 — Read the memory system

```
.memory/INDEX.md    ← Read this first, every session
.memory/SESSION.md  ← Protocol for reading and writing entries
.memory/entries/    ← Full entry files, ID-referenced from INDEX.md
```

1. Read `.memory/INDEX.md` in full
2. Identify entries relevant to today's task by ID
3. Read only those entry files
4. Say out loud: "Memory loaded. Relevant context: [list IDs]"

---

## Step 2 — Project at a glance

**Site:** My Caribbean Journey — Caribbean culture hub (books, island guides, curated resources)
**Stack:** Plain HTML/CSS/JS + Eleventy 2.0 (blog + hub only)
**Deploy:** Cloudflare Pages (push `main` → auto-deploy, 1–2 min)
**Dev (hub + blog):** `npm start` → http://localhost:8080
**Dev (static pages only):** `python3 -m http.server 8888` (hub will NOT render)
**Root:** `/Users/kavellforde/Documents/Side Projects/my-caribbean-journey/`
**Repo:** https://github.com/discover360news-max/my-caribbean-journey
**Live:** https://mycaribbeanjourney.com

All design tokens   → `/shared/shared.css`
All shared components → `/shared/components.js`
All blog styles     → `/css/blog.css`
Full design ref     → `/DESIGN.md`
All memory          → `.memory/`

**Key directories:**
```
shared/           shared nav/footer/components (used by all pages)
i-am-tobago/      first book landing page (static HTML)
my-tobago-guide/  island guide directory (static HTML, data-driven)
blog/             blog listing + posts (Eleventy)
_includes/        Eleventy layouts
admin/            Decap CMS ("Evently") — Quincy's CMS
contact/          contact form (static HTML + GAS backend)
gas/              Google Apps Script source + setup guide
```

---

## Step 3 — Non-negotiable rules

- Never duplicate shared styles in page CSS — tokens, buttons, nav, footer live in `shared/shared.css`
- Always use absolute paths for shared assets — `/shared/shared.css`, `/shared/components.js`
- Never hardcode Amazon links — each book has one `AMAZON_URL` constant in its `js/main.js`
- Never add `tags:` to blog post frontmatter — use `postTags:` (Eleventy reserves `tags` for collections)
- Evently `references` field must use `>-` YAML scalar + `- ` prefix per item — see L001
- Never re-add `@view-transition { navigation: auto }` to `shared/shared.css` — see L002
- Never use `<img>` for decorative section backgrounds — use CSS `::after` pseudo-element — see B001
- Keep plain HTML/CSS/JS for static pages — no frameworks unless the project grows significantly
- After building anything new: write a memory entry + update `.memory/INDEX.md`
- Always `git pull --rebase` before pushing — CMS pushes directly to `main`
- ⚠️ Never use smart/curly quotes in JS data files — they break parsing silently
