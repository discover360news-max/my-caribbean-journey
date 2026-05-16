---
name: Leaflet version — do not upgrade to 2.0
description: Leaflet 2.0 has breaking API changes; stay on 1.9.x unless explicitly planned
type: feedback
---

Do not upgrade Leaflet past 1.9.x without a dedicated migration effort.

**Why:** Leaflet 2.0 introduces breaking changes to map init syntax, event names, and plugin compatibility. The guide tray uses Leaflet for the listing mini-map; upgrading would require code changes and full retesting with no user-visible benefit.

**How to apply:** When running version audits or updating CDN links, leave `leaflet@1.9.4` in `my-tobago-guide/index.html` alone. If a future upgrade is ever warranted, treat it as a standalone task with explicit testing.
