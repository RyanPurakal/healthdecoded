// ─────────────────────────────────────────────────────────────────────────
// TEMPORARY ACCESS GATE — flip GAMIFICATION_ADMIN_ONLY to false to fully
// release the gamification feature.
//
// While true: /activities, /leaderboard, and the quiz detail routes
// (/activities/[slug]) are admin-only. Non-admins (signed in or out) are
// redirected away by middleware, and the Activities/Leaderboard nav links +
// the dashboard "Learn & Earn" card are hidden from them.
//
// Flipping this one boolean to false reverses ALL of that — the routes become
// public again and the links reappear. Nothing else needs editing.
// ─────────────────────────────────────────────────────────────────────────
export const GAMIFICATION_ADMIN_ONLY = true;

// Route prefixes covered by the gate above.
export const GAMIFICATION_PREFIXES = ['/activities', '/leaderboard'];

/** True if `path` is (under) a gamification route. Matches the prefix exactly
 *  or as a path segment boundary, so '/activities' and '/activities/foo' match
 *  but '/activities-archive' does not. */
export function isGamificationPath(path: string): boolean {
  return GAMIFICATION_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
}
