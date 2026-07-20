import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import type { Database } from '@/types/database';

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

  if (isProtected && !user) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('next', path);
    return NextResponse.redirect(redirectUrl);
  }

  if (path.startsWith('/admin') && user) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    // TEMP DIAGNOSTIC — remove once the role bug is confirmed fixed.
    console.log('[middleware /admin check]', {
      userId: user.id,
      email: user.email,
      profile,
      profileError,
    });

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return response;
}
