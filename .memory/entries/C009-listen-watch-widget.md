---
id: C009
type: COMPONENT
status: ACTIVE
created: 2026-03-21
updated: 2026-03-21
related: C005, CFG01
---

# Listen / Watch Sidebar Widget

## Summary
Tabbed media widget in the blog post sidebar, above "Down the rabbit hole". Lets readers listen
to an audio version or watch a YouTube video of the post without reading. Listen tab supports
1 or 2+ audio tracks (split ElevenLabs exports). All posts show "Coming soon" when no media is set.

## Files Changed
```
_includes/blog-post.njk   ← Widget HTML + tab/playlist JS (inline scripts)
css/blog.css              ← .post-media-widget, .media-tab, .audio-playlist, .audio-track-btn etc.
admin/config.yml          ← audioTracks (list) + youtubeId (string) fields in both collections
```

## Frontmatter Fields
| Field | Type | CMS Widget | Notes |
|-------|------|------------|-------|
| `youtubeId` | string | string | YouTube video ID only — e.g. `dQw4w9WgXcQ` (not the full URL) |
| `audioTracks` | list of strings | list → string | One R2 URL per track. Order = playback order. |

## Behaviour
- **Watch tab**: If `youtubeId` set → `youtube-nocookie.com` iframe embed. Else → "Coming soon".
- **Listen tab**:
  - No `audioTracks` → "Coming soon"
  - 1 track → plain `<audio controls>`
  - 2+ tracks → `.audio-track-btn` selector above the player; clicking a button swaps `audio.src` and calls `audio.play()`
- Sidebar always renders (previously conditional on related posts)
- On mobile (≤900px) sidebar drops below content — widget appears below article

## Audio Hosting — Cloudflare R2
- **Bucket:** connected to custom domain `media.mycaribbeanjourney.com`
- **URL pattern:** `https://media.mycaribbeanjourney.com/{folder}/{filename}.mp3`
- **Directory convention:** one folder per post, named after the post title (URL-encoded spaces as `%20`)
- **First live post:** `Reefs and the Comfort of Not Caring` — Track 1 + Track 2
- **ElevenLabs limit:** long articles may need to be split into 2 tracks; `audioTracks` list handles this natively
- ⚠️ Spaces in folder/file names encode as `%20` in YAML — this is fine, browsers handle it correctly

## Adding Audio to a New Post (Workflow)
1. Generate audio in ElevenLabs — split into parts if needed
2. In Cloudflare R2 → bucket → create folder named after the post
3. Upload MP3(s) into that folder
4. In Evently: open the post → **Audio Tracks** field → **Add** → paste the full R2 URL
5. Add a second item for Track 2 if split
6. Save/publish — player appears live immediately after deploy

## Adding a YouTube Video
1. Publish the video on YouTube
2. Copy just the video ID from the URL (the part after `?v=`)
3. In Evently: open the post → **YouTube Video ID** field → paste ID → save

## Future: Listen with TTS
- When ElevenLabs audio is ready for a post, `audioTracks` activates the player automatically
- No code changes needed — just add the URLs in Evently
- If a proper podcast feed is wanted later, consider Buzzsprout or Transistor; `audioTracks` can still point to R2 for the in-page player

## CSS Classes Reference
| Class | Purpose |
|-------|---------|
| `.post-media-widget` | Outer wrapper — rounded, gold border, overflow hidden |
| `.media-tabs` | Dark green tab bar |
| `.media-tab` | Individual tab button; `.is-active` → gold underline + text |
| `.media-panel` | Content area (cream bg); `.is-hidden` → `display:none` |
| `.media-panel--video` | Removes padding for flush YouTube embed |
| `.media-coming-soon` | Centred placeholder with icon + gold "Coming soon" badge |
| `.audio-playlist` | Wraps track buttons + audio element |
| `.audio-track-btn` | Per-track selector; `.is-active` → solid gold bg |
| `.media-audio-player` | Native `<audio>` element, full width |
