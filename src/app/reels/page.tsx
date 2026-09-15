import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import ReelsFeed from "./ReelsFeed";
import {
  CHOICES_SHELF, DEFAULT_REEL_CATEGORIES, FEATURED_SHELF, RECENT_SHELF, reelSlug,
  reels as fallbackReels, type ReelItem,
} from "./data";

export const metadata: Metadata = {
  title: "Reels",
  description: "Reel pilihan Gorontalo Unite: Tourism, Culinary, Culture, Event, dan kolaborasi Sponsored.",
  alternates: { canonical: "/reels" },
};

function getCategory(value: string | string[] | undefined, reels: ReelItem[]): "All" | string {
  const normalized = Array.isArray(value) ? value[0] : value;
  // Match the whole taxonomy, not only categories that currently have reels —
  // otherwise a link to an empty category silently lands on All instead.
  const known = [
    FEATURED_SHELF, CHOICES_SHELF, RECENT_SHELF,
    ...DEFAULT_REEL_CATEGORIES, ...reels.map((item) => item.category),
  ];
  const wanted = normalized?.toLowerCase();
  // Links written before names were slugified used a space, so both forms match.
  return known.find((item) => reelSlug(item) === wanted || item.toLowerCase() === wanted) ?? "All";
}

/** Only an account that actually has reels; anything else falls back to all. */
function getAccount(value: string | string[] | undefined, reels: ReelItem[]): string {
  const normalized = Array.isArray(value) ? value[0] : value;
  if (!normalized) return "all";
  return reels.some((item) => item.username === normalized) ? normalized : "all";
}

function getPeriod(value: string | string[] | undefined): string {
  const normalized = Array.isArray(value) ? value[0] : value;
  if (!normalized || !/^\d{4}(?:-\d{2})?$/.test(normalized)) return "all";
  return normalized;
}

const REEL_COLUMNS =
  "id, account_username, description, publish_time, permalink, category, sponsored, thumbnail_url, orientation, featured, editor_choice, views, reach, likes";

/**
 * PostgREST caps a single response at 1000 rows and says nothing about it. The
 * archive passed that mark, and because the order is newest-first the cap was
 * silently amputating the oldest end: 2022 vanished from the year filter
 * altogether and 2023 came back 76 short.
 *
 * `id` is the last sort key so the order is total — paging over a sort with
 * ties can otherwise repeat a row on one page and drop another.
 */
async function loadPublishedReels(supabase: Awaited<ReturnType<typeof createClient>>) {
  const PAGE = 1000;
  const rows: Record<string, unknown>[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from("reels")
      .select(REEL_COLUMNS)
      .eq("status", "published")
      // Newest first, with anything ticked Featured pinned above it. Display
      // order used to sit in between, but every row shares the same value, so
      // it only ever pushed a reel down — the publish date is the honest handle.
      .order("featured", { ascending: false })
      .order("publish_time", { ascending: false })
      .order("id")
      .range(from, from + PAGE - 1);
    if (error || !data?.length) break;
    rows.push(...data);
    if (data.length < PAGE) break;
  }
  return rows;
}

export default async function ReelsPage({ searchParams }: PageProps<"/reels">) {
  const query = await searchParams;
  const supabase = await createClient();
  const data = await loadPublishedReels(supabase);

  const databaseReels: ReelItem[] = (data ?? [])
    .map((item) => ({
      id: String(item.id),
      username: String(item.account_username),
      category: String(item.category),
      sponsored: Boolean(item.sponsored),
      description: String(item.description ?? ""),
      publishedAt: String(item.publish_time),
      permalink: String(item.permalink),
      thumbnail: (item.thumbnail_url as string | null) ?? null,
      orientation: (item.orientation as "portrait" | "landscape" | null) ?? "portrait",
      featured: Boolean(item.featured),
      editorChoice: Boolean(item.editor_choice),
      views: Number(item.views),
      reach: Number(item.reach),
      likes: Number(item.likes),
    }));
  const reels = databaseReels.length ? databaseReels : fallbackReels;

  return (
    <ReelsFeed
      reels={reels}
      initialCategory={getCategory(query.kategori, reels)}
      initialPeriod={getPeriod(query.periode)}
      initialAccount={getAccount(query.akun, reels)}
    />
  );
}
