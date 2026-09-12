import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import ReelsFeed from "./ReelsFeed";
import { reels as fallbackReels, type ReelItem } from "./data";

export const metadata: Metadata = {
  title: "Reels",
  description: "Pilihan Reel tentang wisata, kuliner, event, dan kolaborasi dari Gorontalo Unite.",
  alternates: { canonical: "/reels" },
};

function getCategory(value: string | string[] | undefined, reels: ReelItem[]): "All" | string {
  const normalized = Array.isArray(value) ? value[0] : value;
  const category = reels.map((item) => item.category)
    .find((item) => item.toLowerCase() === normalized?.toLowerCase());
  return category ?? "All";
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
    .select("id, account_username, description, publish_time, permalink, category, sponsored, thumbnail_url, views, reach, likes")
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("display_order")
    .order("publish_time", { ascending: false });

  const databaseReels: ReelItem[] = (data ?? [])
    .filter((item) => item.thumbnail_url)
    .map((item) => ({
      id: item.id,
      username: item.account_username,
      category: item.category,
      sponsored: item.sponsored,
      description: item.description,
      publishedAt: item.publish_time,
      permalink: item.permalink,
      thumbnail: item.thumbnail_url as string,
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
