import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import type { Database } from '@/types/database';
// Gamification access gate — single flip point in lib/feature-flags.ts.
import { GAMIFICATION_ADMIN_ONLY, isGamificationPath } from '@/lib/feature-flags';

const PROTECTED_PREFIXES = ['/dashboard', '/admin', '/profile'];

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: do not run logic between createServerClient and getUser() —
  // it can refresh the auth token and needs to run before any redirect decision.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isProtected = PROTECTED_PREFIXES.some((prefix) => path.startsWith(prefix));
  // While the gate is on, the gamification routes require admin — same handling
  // as /admin below.
  const needsAdmin = path.startsWith('/admin') || (GAMIFICATION_ADMIN_ONLY && isGamificationPath(path));

  if ((isProtected || needsAdmin) && !user) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('next', path);
    return NextResponse.redirect(redirectUrl);
  }

  if (needsAdmin && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return response;
}
