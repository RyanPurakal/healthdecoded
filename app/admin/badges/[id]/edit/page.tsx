import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { updateBadge } from '../../actions';
import BadgeForm from '../../BadgeForm';

export const metadata = {
  title: 'Edit Badge',
};

export default async function EditBadgePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: badge } = await supabase.from('badges').select('*').eq('id', id).single();

  if (!badge) notFound();

  const updateBadgeForId = updateBadge.bind(null, id);

  return (
    <div className="hd-app-card">
      <p className="hd-app-card-title">Edit Badge</p>
      <BadgeForm action={updateBadgeForId} badge={badge} submitLabel="Save Changes" />
    </div>
  );
}
