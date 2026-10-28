import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { Event } from '@/types/database';

export const dynamic = 'force-dynamic';

const GRAPH_API_VERSION = 'v21.0';
const DATE_PROXIMITY_WINDOW_MS = 3 * 24 * 60 * 60 * 1000; // 3 days

type InstagramMedia = {
  id: string;
  caption?: string;
  media_type: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function matchEvent(media: InstagramMedia, events: Event[]): { event: Event; method: 'caption' | 'date_proximity' } | null {
  const caption = normalize(media.caption ?? '');
  const postedAt = new Date(media.timestamp).getTime();

  if (caption) {
    const captionMatches = events.filter((event) => {
      const title = normalize(event.title);
      return title.length > 3 && caption.includes(title);
    });
    if (captionMatches.length === 1) {
      return { event: captionMatches[0], method: 'caption' };
    }
    if (captionMatches.length > 1) {
      const closest = captionMatches.reduce((best, event) => {
        const diff = Math.abs(new Date(event.event_date).getTime() - postedAt);
        const bestDiff = Math.abs(new Date(best.event_date).getTime() - postedAt);
        return diff < bestDiff ? event : best;
      });
      return { event: closest, method: 'caption' };
    }
  }

  let closest: Event | null = null;
  let closestDiff = Infinity;
  for (const event of events) {
    const diff = Math.abs(new Date(event.event_date).getTime() - postedAt);
    if (diff <= DATE_PROXIMITY_WINDOW_MS && diff < closestDiff) {
      closest = event;
      closestDiff = diff;
    }
  }
  return closest ? { event: closest, method: 'date_proximity' } : null;
}

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const igUserId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
  if (!accessToken || !igUserId) {
    return NextResponse.json({ skipped: true, reason: 'Instagram integration not configured' });
  }

  const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
  const mediaUrl = `https://graph.facebook.com/${GRAPH_API_VERSION}/${igUserId}/media?fields=${fields}&access_token=${accessToken}`;

  const mediaRes = await fetch(mediaUrl);
  if (!mediaRes.ok) {
    const body = await mediaRes.text();
    return NextResponse.json({ error: 'Instagram API request failed', detail: body }, { status: 502 });
  }
  const mediaJson = (await mediaRes.json()) as { data: InstagramMedia[] };
  const media = mediaJson.data ?? [];

  const supabase = createAdminClient();

  const { data: existing, error: existingError } = await supabase
    .from('event_instagram_posts')
    .select('ig_media_id');
  if (existingError) {
    return NextResponse.json({ error: existingError.message }, { status: 500 });
  }
  const existingIds = new Set((existing ?? []).map((row) => row.ig_media_id));

  const newMedia = media.filter((item) => !existingIds.has(item.id));
  if (newMedia.length === 0) {
    return NextResponse.json({ fetched: media.length, matched: 0, skipped: 0 });
  }

  const { data: events, error: eventsError } = await supabase.from('events').select('*');
  if (eventsError) {
    return NextResponse.json({ error: eventsError.message }, { status: 500 });
  }

  let matched = 0;
  let skipped = 0;

  for (const item of newMedia) {
    if (!item.media_url && !item.thumbnail_url) {
      skipped += 1;
      continue;
    }
    const match = matchEvent(item, events ?? []);
    if (!match) {
      skipped += 1;
      continue;
    }
    const { error: insertError } = await supabase.from('event_instagram_posts').insert({
      event_id: match.event.id,
      ig_media_id: item.id,
      media_type: item.media_type,
      media_url: item.media_url ?? item.thumbnail_url!,
      permalink: item.permalink,
      caption: item.caption ?? null,
      posted_at: item.timestamp,
      matched_method: match.method,
    });
    if (insertError) {
      skipped += 1;
      continue;
    }
    matched += 1;
  }

  return NextResponse.json({ fetched: media.length, matched, skipped });
}
