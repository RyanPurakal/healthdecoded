# components/motion/

Pure Framer Motion animation wrappers. These components add entrance and scroll effects but contain **no domain content** — they only accept children and animation-control props.

## Files

| File | Role |
|---|---|
| `fade-in-section.tsx` | `FadeInSection` — fades and slides up its children when they scroll into view (fires once per mount) |
| `stagger-fade.tsx` | `StaggerFadeContainer` + `StaggerFadeItem` pair — cascades the fade-up animation across a list of children with a 100ms stagger |
| `hero-parallax-image.tsx` | `HeroParallaxImage` — tracks the hero section's scroll progress and applies a subtle y-translate + scale to create parallax depth |

## Accessibility

Every component reads `useReducedMotion()` and either disables animation entirely or reduces it to a simple opacity fade when the user has `prefers-reduced-motion` set. Do not remove these checks when modifying animation parameters.

## Adding a new motion wrapper

1. Mark `'use client'` (Framer Motion hooks require a client context).
2. Call `useReducedMotion()` and short-circuit or simplify the animation when it returns `true`.
3. Accept children and optional `className`/`delay` props — do not embed domain text or images.
