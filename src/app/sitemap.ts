import type { MetadataRoute } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { WEB_CATEGORIES, categoryHref } from "@/app/berita/categories";
import { REGIONS } from "@/lib/city-guide/regions";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gorontalounite.com";

type Entry = MetadataRoute.Sitemap[number];

/**
 * Static routes. lastmod is left out unless real content dates are known:
 * a timestamp that reads "now" on every fetch teaches crawlers to ignore it.
 */
function staticPages(latestStory?: Date, latestPlace?: Date): MetadataRoute.Sitemap {
  const page = (path: string, changeFrequency: Entry["changeFrequency"], priority: number, lastModified?: Date): Entry => ({
    url: `${BASE}${path}`,
    ...(lastModified ? { lastModified } : {}),
    changeFrequency,
    priority,
  });

  return [
    page("", "daily", 1.0, latestStory),
    page("/city-guide", "weekly", 0.9, latestPlace),
    ...WEB_CATEGORIES.map((category) => page(categoryHref(category.key), "daily", 0.8, latestStory)),
    ...REGIONS.map((region) => page(`/city-guide/area/${region.slug}`, "monthly", 0.6, latestPlace)),
    page("/reels", "weekly", 0.8),
    page("/event", "weekly", 0.8),
    page("/about", "monthly", 0.5),
    page("/author/gorontalounite", "weekly", 0.5, latestStory),
    page("/pedoman-media-siber", "yearly", 0.3),
    page("/privacy-policy", "yearly", 0.3),
    page("/terms", "yearly", 0.3),
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Preview builds may intentionally omit production secrets. Keep the
  // static sitemap available rather than failing the entire deployment.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return staticPages();
  }

  const admin = createAdminClient();

  const [{ data: articles }, { data: places }, { data: events }] = await Promise.all([
    admin
      .from("articles")
      .select("slug, category, updated_at, published_at")
      .eq("published", true)
      .order("published_at", { ascending: false }),
    admin
      .from("tourism_places")
      .select("slug, updated_at")
      .eq("published", true),
    admin
      .from("events")
      .select("slug, updated_at")
      .eq("published", true),
  ]);

  const newsSlugs = (articles ?? [])
    .filter((a) => a.category !== "Portfolio")
    .map((a) => ({
      url:          `${BASE}/${a.slug}`,
      lastModified: new Date(a.updated_at ?? a.published_at ?? Date.now()),
      changeFrequency: "weekly" as const,
      priority:     0.8,
    }));

  const placeSlugs = (places ?? []).map((p) => ({
    url:          `${BASE}/city-guide/${p.slug}`,
    lastModified: new Date(p.updated_at ?? Date.now()),
    changeFrequency: "weekly" as const,
    priority:     0.7,
  }));

  const eventSlugs = (events ?? []).map((e) => ({
    url:          `${BASE}/event/${e.slug}`,
    lastModified: new Date(e.updated_at ?? Date.now()),
    changeFrequency: "weekly" as const,
    priority:     0.7,
  }));

  const newest = (dates: Date[]) =>
    dates.length > 0 ? new Date(Math.max(...dates.map((date) => date.getTime()))) : undefined;

  return [
    ...staticPages(newest(newsSlugs.map((n) => n.lastModified)), newest(placeSlugs.map((p) => p.lastModified))),
    ...newsSlugs,
    ...placeSlugs,
    ...eventSlugs,
  ];
}
