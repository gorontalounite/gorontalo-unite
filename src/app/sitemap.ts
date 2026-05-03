import type { MetadataRoute } from "next";
import { createAdminClient } from "@/lib/supabase/admin";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gorontalounite.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const admin = createAdminClient();

  // Fetch all published articles (news + portfolio)
  const { data: articles } = await admin
    .from("articles")
    .select("slug, category, updated_at, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });

  const newsSlugs = (articles ?? [])
    .filter((a) => a.category !== "Portfolio")
    .map((a) => ({
      url:          `${BASE}/news/${a.slug}`,
      lastModified: new Date(a.updated_at ?? a.published_at ?? Date.now()),
      changeFrequency: "weekly" as const,
      priority:     0.8,
    }));

  const portfolioSlugs = (articles ?? [])
    .filter((a) => a.category === "Portfolio")
    .map((a) => ({
      url:          `${BASE}/portfolio/${a.slug}`,
      lastModified: new Date(a.updated_at ?? a.published_at ?? Date.now()),
      changeFrequency: "monthly" as const,
      priority:     0.7,
    }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                     lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE}/good-news`,      lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/portfolio`,      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/affiliate`,      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/about`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/terms`,          lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  return [...staticPages, ...newsSlugs, ...portfolioSlugs];
}
