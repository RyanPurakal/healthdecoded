# app/

Next.js 15 App Router directory. Each subdirectory is a URL route; files named `page.tsx` are the rendered page, `layout.tsx` wraps its subtree, and `template.tsx` re-mounts on every navigation (used for page-transition animations).

## Responsibility

Owns all **routing, metadata, and page-level composition**. Pages are kept thin — they set `export const metadata`, then delegate content to components from `../components/`. Client-side interactivity is split into separate `*Client.tsx` or `*Content.tsx` files so that the page file itself can remain a Server Component.

## What passes through here

```
Browser request
  → Next.js router matches a route segment
  → layout.tsx   (RootLayout: HTML shell, GA scripts, ClientLayout wrapper)
  → template.tsx (page-transition animation, re-mounts on each navigation)
  → page.tsx     (sets metadata, renders the feature component)
  → components/  (actual UI lives here)
```

## Key design decisions

- **`ClientLayout.tsx`** is the only place that mounts Navbar, Footer, and DonateModal, keeping those concerns out of every individual page.
- **`template.tsx`** is used instead of a layout animation so Framer Motion re-mounts and replays the entrance animation on each route change.
- **`about/page.tsx`** is a pure redirect to `/about/us` — the `/about` URL has no UI of its own.
- Pages that need `useState`/`useRef`/browser APIs extract a `*Client.tsx` sibling (e.g. `HomeClient.tsx`, `GetInvolvedContent.tsx`) so the route file stays a Server Component for SEO metadata export.

## Adding a new page

1. Create `app/your-route/page.tsx` with `export const metadata` and a default export.
2. If the page needs client-side state, create `app/your-route/YourClient.tsx` marked `'use client'` and import it from the page file.
3. Add the route link to `components/Navbar.tsx` and `components/Footer.tsx`.
