---
id: C007
type: COMPONENT
status: ACTIVE
created: 2026-03-11
updated: 2026-03-11
related: D002
---

# Contact Page — /contact/ with GAS Form

## Summary
`/contact/` is a static contact form page. Submissions are sent via `fetch` (no-cors mode) to
a Google Apps Script (GAS) Web App that emails Quincy at `booksbyquincy@gmail.com`. The GAS
script source and setup guide live in `gas/`. All `mailto:` footer links across the site now
point to `/contact/` instead of a raw email address.

## Implementation Details

**Files:**
```
contact/
  index.html          ← Contact page (Name / Email / Message form)
  css/contact.css     ← Contact-specific styles
  js/contact.js       ← Form submission logic; GAS_URL at top of file
gas/
  contact-form.gs     ← Google Apps Script — paste into script.google.com
  SETUP.md            ← Quincy's step-by-step GAS deployment instructions
```

**Form fields:** Name, Email, Message

**Submission logic (`contact/js/contact.js`):**
```js
const GAS_URL = 'https://script.google.com/macros/s/.../exec';  // line 6
fetch(GAS_URL, { method: 'POST', mode: 'no-cors', body: formData })
```
- `mode: 'no-cors'` — GAS doesn't return CORS headers; response is opaque
- On success: form hides, success message shows
- On error: error message shows inline

**GAS script (`gas/contact-form.gs`):**
- Receives POST, sends email to `booksbyquincy@gmail.com`
- Sets `replyTo` to the sender's email address
- Quincy deploys it as a Web App in Google Apps Script dashboard, then pastes the URL into `contact/js/contact.js`

**Fallback:**
- Raw email address (`booksbyquincy@gmail.com`) shown below the form as a plain-text fallback

**All contact links updated:**
- All `mailto:booksbyquincy@gmail.com` footer/inline links now point to `/contact/`
- Contact footer links in `components.js` use `/contact/` href

## Decisions Made
- **GAS backend** — free, no third-party service, emails go directly to Quincy's Gmail.
  No database, no subscription required.
- **`no-cors` mode** — GAS Web Apps don't return CORS headers for POST requests. Using
  `no-cors` means the response is opaque (no status check), but for a contact form this
  is acceptable — the script runs server-side regardless.

## Known Issues / Gotchas
- The GAS_URL in `contact/js/contact.js` line 6 must be updated by Quincy after he deploys
  the script — it's not committed to the repo (or it's a placeholder)
- `mode: 'no-cors'` means the JS cannot read the GAS response — success/error state is inferred,
  not confirmed from the server

## Change Log
- 2026-03-11 Created
