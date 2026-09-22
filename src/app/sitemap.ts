import type { MetadataRoute } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { WEB_CATEGORIES } from "@/app/berita/categories";
import { REGIONS } from "@/lib/city-guide/regions";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gorontalounite.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                     lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE}/city-guide`,     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    ...WEB_CATEGORIES.map((category) => ({
      url: `${BASE}/category/${category.key}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...REGIONS.map((region) => ({
      url: `${BASE}/city-guide/area/${region.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${BASE}/reels`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/event`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/about`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/terms`,          lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  // Preview builds may intentionally omit production secrets. Keep the
  // static sitemap available rather than failing the entire deployment.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return staticPages;
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

  return [...staticPages, ...newsSlugs, ...placeSlugs, ...eventSlugs];
}
