/**
 * sync-tags.js
 * Reads all blog post frontmatter, collects unique postTags,
 * and injects them into the Tags field hint in admin/config.yml.
 * Runs before every build so the CMS always shows tags in use.
 */

const fs   = require('fs');
const path = require('path');

const POSTS_DIR   = path.join(__dirname, '../blog/posts');
const CONFIG_PATH = path.join(__dirname, '../admin/config.yml');

// ── Collect tags ─────────────────────────────────────────────

const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
const tagSet = new Set();

for (const file of files) {
  const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
  const fmMatch = content.match(/^---[\r\n]([\s\S]*?)[\r\n]---/);
  if (!fmMatch) continue;

  const tagBlock = fmMatch[1].match(/postTags:[\r\n]((?:[ \t]+-[ \t]+.+[\r\n]?)+)/);
  if (!tagBlock) continue;

  for (const line of tagBlock[1].matchAll(/[ \t]+-[ \t]+(.+)/g)) {
    tagSet.add(line[1].trim());
  }
}

const tags = [...tagSet].sort();

// ── Update config.yml hint ────────────────────────────────────

let config = fs.readFileSync(CONFIG_PATH, 'utf8');

const BASE_HINT = "Specific keywords like 'tobago', 'history', 'folklore'. One word per tag, lowercase. Press Enter to add each one.";
const newHint = tags.length > 0
  ? `${BASE_HINT} Currently in use: ${tags.join(', ')}.`
  : BASE_HINT;

// Matches the hint on both the Blog Posts and Island Stories Tags fields
config = config.replace(/hint: "Specific keywords like[^"]*"/g, `hint: "${newHint}"`);

fs.writeFileSync(CONFIG_PATH, config, 'utf8');
console.log(`[sync-tags] ${tags.length} tag(s) synced: ${tags.join(', ') || '(none)'}`);
