# components/

Shared React components used across one or more pages. Nothing in this directory owns a URL route.

## Responsibility

**Reusable UI building blocks.** Components here receive props from page files in `../app/` and render markup + styles. No component in this directory should import from `../app/`.

## Structure

```
components/
├── Navbar.tsx          # Site-wide sticky navigation with dropdown and mobile menu
├── Footer.tsx          # Site-wide footer with link columns
├── DonateModal.tsx     # Overlay modal triggered by the Donate button in Navbar
├── ui/                 # Self-contained feature sections and generic UI primitives
└── motion/             # Framer Motion wrappers that add scroll and transition effects
```

## ui/ vs motion/

| Subdirectory | Contains | Key dependency |
|---|---|---|
| `ui/` | Feature content (programs cards, team grid, about section, etc.) and generic primitives (Button) | Lucide icons, clsx/tailwind-merge |
| `motion/` | Pure animation wrappers with no domain content of their own | Framer Motion only |

Keep the two separate: `ui/` components may import from `motion/`, but `motion/` components must not import from `ui/`.

## Adding a new component

- Drop it in `ui/` if it has domain content or is a new reusable primitive.
- Drop it in `motion/` if it is purely an animation wrapper with no domain-specific text or data.
- Mark `'use client'` at the top if it uses any React hook or browser API.
