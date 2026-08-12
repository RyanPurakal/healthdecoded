import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { updateActivity } from '../../actions';
import ActivityForm from '../../ActivityForm';

export const metadata = {
  title: 'Edit Activity',
};

export default async function EditActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: activity } = await supabase.from('game_activities').select('*').eq('id', id).single();

  if (!activity) notFound();

  const updateActivityForId = updateActivity.bind(null, id);

  return (
    <div className="hd-app-card">
      <p className="hd-app-card-title">Edit Activity</p>
      <ActivityForm action={updateActivityForId} activity={activity} submitLabel="Save Changes" />
    </div>
  );
}
