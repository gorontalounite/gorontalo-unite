import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import ReelsFeed from "./ReelsFeed";
import { DEFAULT_REEL_CATEGORIES, reels as fallbackReels, type ReelItem } from "./data";

export const metadata: Metadata = {
  title: "Reels",
  description: "Reel pilihan Gorontalo Unite: Tourism, Culinary, Culture, Event, dan kolaborasi Sponsored.",
  alternates: { canonical: "/reels" },
};

function getCategory(value: string | string[] | undefined, reels: ReelItem[]): "All" | string {
  const normalized = Array.isArray(value) ? value[0] : value;
  // Match the whole taxonomy, not only categories that currently have reels —
  // otherwise a link to an empty category silently lands on All instead.
  const known = [...DEFAULT_REEL_CATEGORIES, ...reels.map((item) => item.category)];
  return known.find((item) => item.toLowerCase() === normalized?.toLowerCase()) ?? "All";
}

function getPeriod(value: string | string[] | undefined): string {
  const normalized = Array.isArray(value) ? value[0] : value;
  if (!normalized || !/^\d{4}(?:-\d{2})?$/.test(normalized)) return "all";
  return normalized;
}

export default async function ReelsPage({ searchParams }: PageProps<"/reels">) {
  const query = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase
    .from("reels")
    .select("id, account_username, description, publish_time, permalink, category, sponsored, thumbnail_url, orientation, featured, views, reach, likes")
    .eq("status", "published")
    // Newest first, with anything ticked Featured pinned above it. Display
    // order used to sit in between, but every row shares the same value, so it
    // only ever pushed a reel down — the publish date is the honest handle.
    .order("featured", { ascending: false })
    .order("publish_time", { ascending: false });

  const databaseReels: ReelItem[] = (data ?? [])
    .map((item) => ({
      id: item.id,
      username: item.account_username,
      category: item.category,
      sponsored: item.sponsored,
      description: item.description,
      publishedAt: item.publish_time,
      permalink: item.permalink,
      thumbnail: (item.thumbnail_url as string | null) ?? null,
      orientation: (item.orientation as "portrait" | "landscape" | null) ?? "portrait",
      featured: Boolean(item.featured),
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
    />
  );
}
