// Sign-in page: Google OAuth (primary) + magic link email (fallback). No passwords.
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { signInWithGoogle, signInWithMagicLink } from '@/app/auth/actions';

export const metadata = {
  title: 'Sign In',
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string; sent?: string }>;
}) {
  const { next = '/dashboard', error, sent } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(next);
  }

  const signInWithGoogleForNext = signInWithGoogle.bind(null, next);

  return (
    <div className="hd-app-page">
      <div className="hd-app-container hd-app-container--narrow">
        <p className="hd-app-eyebrow">Health Decoded</p>
        <h1 className="hd-app-heading">Sign In</h1>
        <p className="hd-app-subtitle">
          Ambassadors and volunteers sign in here to register for events and track their activity.
        </p>

        {error && <div className="hd-app-banner hd-app-banner--error">{error}</div>}
        {sent && (
          <div className="hd-app-banner hd-app-banner--success">
            Check {sent} for a sign-in link.
          </div>
        )}

        <div className="hd-app-card">
          <form action={signInWithGoogleForNext}>
            <button type="submit" className="hd-app-oauth-btn">
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62z" />
                <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.81.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.94v2.33A9 9 0 0 0 9 18z" />
                <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.94A9 9 0 0 0 0 9c0 1.45.35 2.83.94 4.03z" />
                <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .94 4.97L3.95 7.3C4.66 5.17 6.65 3.58 9 3.58z" />
              </svg>
              Continue with Google
            </button>
          </form>

          <div className="hd-app-divider-or">Or</div>

          <form action={signInWithMagicLink} className="ct-form">
            <input type="hidden" name="next" value={next} />
            <div className="ct-field-group">
              <label htmlFor="email" className="ct-label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="ct-input"
              />
            </div>
            <button type="submit" className="ct-btn ct-btn-filled">
              Send Magic Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
