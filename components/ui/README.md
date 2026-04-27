# components/ui/

Self-contained UI components: feature sections, content blocks, and generic primitives. All are marked `'use client'` because they use Framer Motion hooks or React state.

## Files

| File | Role |
|---|---|
| `button.tsx` | Generic Button/Link primitive used everywhere; renders as `<button>` or Next.js `<Link>` depending on whether `href`/`to` is provided |
| `about-us-section.tsx` | Full About Us content block: services grid, animated stat counters, CTA banner |
| `connect-with-us.tsx` | Single-card CTA section that links visitors to the Contact page; used at the bottom of the home page |
| `feature-section.tsx` | `FeatureSteps` — hover-driven milestone timeline; hover a step on the left to swap the image on the right |
| `feature-sections.tsx` | `ProgramsFeatureSections` — two program cards (School Workshops, Peer Ambassador) with stagger-fade entry |
| `sticky-scroll-reveal.tsx` | `StickyScroll` — tabbed card+panel widget; clicking a left-column item swaps the right-column content |
| `team-section-block-shadcnui.tsx` | Team member cards with 3D mouse-tilt effect and a mailto email button |
| `interactive-hover-button.tsx` | Button with animated idle → loading → success state cycle |
| `shimmer-button.tsx` | Thin wrapper applying the CSS shimmer animation; styling lives in `app/globals.css` |

## Key design pattern

Content data (team members, program bullets, story steps) is defined inline as `const` arrays near the top of each file — there is no external data fetch or CMS. To update content, edit the array in the relevant component file.
