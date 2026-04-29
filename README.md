# public/

Static assets served directly by Next.js at the root URL path. Files here are **not** processed by webpack — they are copied verbatim to the `out/` directory on build.

## Contents

| Path | Purpose |
|---|---|
| `favicon.ico`, `logo192.png`, `logo512.png` | Site icons referenced in `app/layout.tsx` and the PWA manifest |
| `og-image.jpg` | Open Graph preview image for social media sharing |
| `manifest.json` | PWA web app manifest (name, icons, theme colour) |
| `robots.txt` | Search engine crawl rules |
| `sitemap.xml` | URL map for search engine indexing — update when adding new routes |
| `CNAME` | Custom domain for GitHub Pages deployment (`healthdecodedinitiative.org`) |
| `images/events/` | Workshop and event photography used in page components |
| `team/` | Headshot photos for each team member, referenced by `team-section-block-shadcnui.tsx` |

## Adding a new image

1. Place the file in `public/images/` (or `public/team/` for headshots).
2. Reference it with an absolute path from the root, e.g. `src="/images/events/my-photo.png"`.
3. Next.js static export will include it in `out/` automatically — no import required.

## Adding a new team member photo

Name the file `public/team/<firstname>.jpg` and update the `teamMembers` array in `components/ui/team-section-block-shadcnui.tsx`.
