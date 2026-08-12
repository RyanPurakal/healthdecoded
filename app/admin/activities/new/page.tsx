import { createActivity } from '../actions';
import ActivityForm from '../ActivityForm';

export const metadata = {
  title: 'New Activity',
};

export default function NewActivityPage() {
  return (
    <div className="hd-app-card">
      <p className="hd-app-card-title">New Activity</p>
      <ActivityForm action={createActivity} submitLabel="Create Activity" />
    </div>
  );
}
