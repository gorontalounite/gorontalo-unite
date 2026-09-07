import type { MetadataRoute } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { WEB_CATEGORIES } from "@/app/berita/categories";

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

  // Fetch all published articles
  const { data: articles } = await admin
    .from("articles")
    .select("slug, category, updated_at, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });

  const newsSlugs = (articles ?? [])
    .filter((a) => a.category !== "Portfolio")
    .map((a) => ({
      url:          `${BASE}/${a.slug}`,
      lastModified: new Date(a.updated_at ?? a.published_at ?? Date.now()),
      changeFrequency: "weekly" as const,
      priority:     0.8,
    }));

  return [...staticPages, ...newsSlugs];
}
