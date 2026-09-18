import { createClient } from "@/lib/supabase/server";
import { headline, HOME_SLIDES, type VideoStoryItem } from "./data";

/**
 * Kept apart from data.ts because the rail is a client component: importing
 * the server Supabase client from there dragged next/headers into the browser
 * bundle and broke the build.
 */

const COLUMNS = "id, description, account_username, permalink, thumbnail_url, duration_sec, publish_time, views";

interface Row {
  id: string;
  description: string | null;
  account_username: string;
  permalink: string;
  thumbnail_url: string | null;
  duration_sec: number | null;
  publish_time: string;
  views: number | null;
}

const toItem = (row: Row): VideoStoryItem => ({
  id: row.id,
  title: headline(row.description ?? ""),
  username: row.account_username,
  permalink: row.permalink,
  thumbnail: row.thumbnail_url,
  durationSec: row.duration_sec,
  publishedAt: row.publish_time,
  views: row.views ?? 0,
});

/**
 * Newest first, and only reels that have a cover: this section is nothing but
 * pictures, so an entry without one is a hole rather than a story.
 */
export async function getVideoStories(limit = HOME_SLIDES): Promise<VideoStoryItem[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("reels")
      .select(COLUMNS)
      .eq("status", "published")
      .eq("category", "Sponsored")
      .not("thumbnail_url", "is", null)
      .order("publish_time", { ascending: false })
      .limit(limit);
    return ((data ?? []) as unknown as Row[]).map(toItem);
  } catch {
    return [];
  }
}
