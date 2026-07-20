// Admin-only CSV export of all event registrations. Route Handler (not a
// Server Action) so the response can carry Content-Disposition and trigger
// a real file download.
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

function csvEscape(value: string) {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
  }

  const { data: callerProfile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (callerProfile?.role !== 'admin') {
    return NextResponse.json({ error: 'Admins only.' }, { status: 403 });
  }

  const { data: registrations } = await supabase
    .from('event_registrations')
    .select('user_id, status, registered_at, profiles(full_name)')
    .order('registered_at', { ascending: false });

  const admin = createAdminClient();
  const { data: usersPage } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const emailById = new Map(usersPage?.users.map((u) => [u.id, u.email ?? '']) ?? []);

  const rows = (registrations ?? []) as unknown as {
    user_id: string;
    status: string;
    registered_at: string;
    profiles: { full_name: string | null } | null;
  }[];

  const header = ['Name', 'Email', 'Status', 'Registered At'];
  const lines = [header.join(',')];

  for (const row of rows) {
    lines.push(
      [
        csvEscape(row.profiles?.full_name ?? ''),
        csvEscape(emailById.get(row.user_id) ?? ''),
        csvEscape(row.status),
        csvEscape(row.registered_at),
      ].join(',')
    );
  }

  return new NextResponse(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="registrations.csv"',
    },
  });
}
