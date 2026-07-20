import { createClient } from '@/lib/supabase/server';

export const metadata = {
  title: 'Admin Overview',
};

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [{ count: eventCount }, { count: registrationCount }, { count: publishedCount }, { count: draftCount }] =
    await Promise.all([
      supabase.from('events').select('*', { count: 'exact', head: true }),
      supabase.from('event_registrations').select('*', { count: 'exact', head: true }),
      supabase.from('news_posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
      supabase.from('news_posts').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
    ]);

  const stats = [
    { label: 'Events', value: eventCount ?? 0 },
    { label: 'Registrations', value: registrationCount ?? 0 },
    { label: 'Published Posts', value: publishedCount ?? 0 },
    { label: 'Draft Posts', value: draftCount ?? 0 },
  ];

  return (
    <div className="hd-app-card">
      {stats.map((stat) => (
        <div className="hd-app-row" key={stat.label}>
          <span className="hd-app-row-title">{stat.label}</span>
          <span className="hd-app-row-meta">{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
