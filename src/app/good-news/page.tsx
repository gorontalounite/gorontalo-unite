import type { Metadata }  from "next";
import Link                from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import GoodNewsList, { type NewsItem } from "./GoodNewsList";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:       "Berita Gorontalo — Kabar Terkini dari Bumi Serambi Madinah",
  description: "Kumpulan berita terkini, positif, dan inspiratif dari Gorontalo. Wisata, budaya, kuliner, pendidikan, ekonomi, dan banyak lagi.",
  openGraph: {
    title:       "Berita Gorontalo | Gorontalo Unite",
    description: "Portal berita hyperlokal Gorontalo — kabar terbaru dan terpercaya.",
    type:        "website",
  },
};

export default async function GoodNewsPage() {
  const admin = createAdminClient();

  const { data: raw } = await admin
    .from("articles")
    .select("id, title, slug, category, excerpt, image_url, published_at, created_at, view_count, is_trending")
    .eq("published", true)
    .neq("category", "Portfolio")
    .order("published_at", { ascending: false })
    .limit(200);

  const items: NewsItem[] = (raw ?? []).map((a) => ({
    id:           a.id as string,
    title:        a.title as string,
    slug:         a.slug as string,
    category:     a.category as string,
    excerpt:      a.excerpt as string | null,
    image_url:    a.image_url as string | null,
    published_at: a.published_at as string | null,
    created_at:   a.created_at as string,
    view_count:   (a.view_count as number | null) ?? 0,
    is_trending:  (a.is_trending as boolean | null) ?? false,
  }));

  // Featured: first trending item, fallback to latest
  const featured: NewsItem | null =
    items.find((a) => a.is_trending) ?? items[0] ?? null;

  // Non-featured list
  const rest = featured ? items.filter((a) => a.id !== featured.id) : items;

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#2D7D46] dark:hover:text-emerald-400 transition-colors">Beranda</Link>
        <span>/</span>
        <span className="text-gray-600 dark:text-gray-300">Berita</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Berita Gorontalo</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Kabar terkini dari Bumi Serambi Madinah — {items.length} artikel tersedia.
        </p>
      </div>

      {/* Interactive list: featured hero + filter/search/pagination */}
      <GoodNewsList items={rest} featured={featured} />
    </div>
  );
}
