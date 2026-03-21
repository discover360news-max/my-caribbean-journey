# Claude Session Protocol — My Caribbean Journey Memory System

## On every session start
1. Read INDEX.md fully
2. Identify entries relevant to today's task by ID
3. Read only those entry files (not all of them)
4. State out loud: "Memory loaded. Relevant context: [list IDs and one-line summaries]"
   If no entries are relevant yet, say: "Memory loaded. No prior context for this task."

## When creating something new (component, feature, config, etc.)
1. Create a new entry file in .memory/entries/ using the template
2. Add one index line to INDEX.md immediately
3. ID format: C### for components, F### for features, D### for decisions,
   L### for learnings, B### for bugs, CFG### for config, DEP### for dependencies
4. Increment the number based on existing entries of that type

## When changing something that already has an entry
1. Read the existing entry file
2. Update the relevant sections (Implementation Details, Known Issues, etc.)
3. Append a new line to the entry's Change Log with today's date and what changed
4. Update the `updated:` frontmatter field
5. Update STATUS in both the entry file AND the index line if it changed

## When fixing a bug
1. If it already has a B### entry, update it and mark DEPRECATED when resolved
2. If it's new, create a B### entry — even for small bugs
3. Add a LEARNING entry (L###) if the bug revealed something non-obvious about the stack

## When making a tech decision (library choice, approach, pattern)
1. Always create a D### entry — even for small decisions
2. Include what alternatives were considered and why they were rejected
3. These entries are the most valuable for future sessions — don't skip them

## When deprecating something
1. Change STATUS to DEPRECATED in both the index line and the entry file frontmatter
2. Add a Change Log note explaining why it was deprecated and what replaced it
3. Do NOT delete entry files — they are project history

## Index line format (strict)
[ID] | [TYPE] | [STATUS] | [one-line summary max 80 chars] → .memory/entries/[filename].md

## What NOT to put in INDEX.md
- No paragraphs, no sub-bullets, no headers except the ones already there
- No more than 60 entry lines total (archive old DEPRECATED entries to .memory/archive/ if needed)
- No duplicate entries for the same thing — update instead

---

## Entry file template

```md
---
id: [ID]
type: [COMPONENT | FEATURE | DECISION | LEARNING | BUG | CONFIG | DEPENDENCY]
status: [ACTIVE | PAUSED | DEPRECATED | PLANNED]
created: [YYYY-MM-DD]
updated: [YYYY-MM-DD]
related: [comma-separated IDs or "none"]
---

# [Short descriptive title]

## Summary
2–4 sentences. What is this? What does it do? Why does it exist?

## Implementation Details
File paths, key variables, libraries, config values, data shapes,
CSS class names, data formats — whatever is needed to fully reproduce this.

## Decisions Made
Why this approach over alternatives? What tradeoffs were accepted?

## Known Issues / Gotchas
Bugs, edge cases, quirks, non-obvious behaviour.

## Change Log
- [YYYY-MM-DD] Created
```

---

## Rules
- Entry files have no line limit — be thorough.
- Do not summarise or paraphrase entries when reading them. Read the actual file.
- The memory system exists for Claude's benefit. Write entries as if briefing
  your future self who has zero session context.
