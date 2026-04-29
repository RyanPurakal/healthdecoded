# utils/

Small, stateless helper modules shared across the application.

## Files

| File | Role |
|---|---|
| `analytics.ts` | Google Analytics helpers: `pageview(url)` is called on every client-side route change in `ClientLayout.tsx`; `event()` can be imported anywhere to track custom interactions |

## Analytics configuration

The GA Measurement ID defaults to the hardcoded value in `analytics.ts`. To override it without changing source, set `NEXT_PUBLIC_GA_TRACKING_ID` in a `.env` file at the project root. The `AnalyticsScript` component in `app/AnalyticsScript.tsx` must also be updated if the ID changes, as it injects the gtag snippet directly.
