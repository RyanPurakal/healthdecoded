// Quiz play page. Server component: loads the activity WITH its answer key,
// grades happen server-side (see submitQuiz), and only sanitized questions
// (prompt + options) are ever handed to the client.
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { GameActivity, QuizContent } from '@/types/database';
import { sanitizeQuestions } from '../quiz';
import QuizRunner from './QuizRunner';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from('game_activities').select('title').eq('slug', slug).maybeSingle();
  return { title: data?.title ?? 'Activity' };
}

export default async function ActivityPlayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // RLS returns published rows to non-admins; unpublished 404s for them.
  const { data } = await supabase.from('game_activities').select('*').eq('slug', slug).maybeSingle();
  const activity = data as GameActivity | null;

  if (!activity || !activity.is_published) notFound();

  // Only quizzes have a play page today; other types are handled on /activities.
  if (activity.type !== 'quiz') redirect('/activities');

  const content = activity.content as QuizContent | null;
  const hasQuestions = Boolean(content && Array.isArray(content.questions) && content.questions.length > 0);

  let alreadyCompleted = false;
  if (user) {
    const { data: completion } = await supabase
      .from('activity_completions')
      .select('id')
      .eq('user_id', user.id)
      .eq('activity_id', activity.id)
      .maybeSingle();
    alreadyCompleted = Boolean(completion);
  }

  return (
    <div className="hd-app-page">
      <div className="hd-app-container hd-app-container--narrow">
        <p className="hd-app-eyebrow">
          <Link href="/activities">← Activities</Link>
        </p>
        <h1 className="hd-app-heading">{activity.title}</h1>
        {activity.description && <p className="hd-app-subtitle">{activity.description}</p>}

        {!hasQuestions ? (
          <div className="hd-app-card">
            <p className="hd-app-empty">This quiz doesn&apos;t have any questions yet.</p>
          </div>
        ) : !user ? (
          <div className="hd-app-card">
            <p className="hd-app-empty">
              <Link href={`/login?next=/activities/${slug}`}>Sign in</Link> to take this quiz and earn XP.
            </p>
          </div>
        ) : (
          <QuizRunner
            activityId={activity.id}
            questions={sanitizeQuestions(content!)}
            passThreshold={content!.pass_threshold}
            xpValue={activity.xp_value}
            alreadyCompleted={alreadyCompleted}
          />
        )}
      </div>
    </div>
  );
}
