import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import BeritaFilters from "./BeritaFilters";
import BeritaPagination from "./BeritaPagination";
import { CAT_COLOR, CATEGORIES, DEFAULT_COLOR } from "./categories";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Berita Gorontalo — Gorontalo Unite",
  description: "Ringkasan berita dan informasi Gorontalo dari sumber yang dicantumkan.",
  openGraph: { title: "Berita Gorontalo | Gorontalo Unite", type: "website" },
};

const PAGE_SIZE = 12;

const CATEGORY_BY_KEY = Object.fromEntries(CATEGORIES.map((category) => [category.key, category.label]));

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  category: string;
  categories: string[] | null;
  tags: string[] | null;
  published_at: string | null;
  created_at: string;
  source_url: string | null;
  is_trending: boolean | null;
};

function formatDate(value: string | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Makassar" }).format(new Date(value));
}

function sourceName(url: string | null) {
  if (!url) return null;
  try { return new URL(url).hostname.replace(/^www\./, ""); }
  catch { return "Sumber asli"; }
}

function categoryList(article: Article) {
  return article.categories?.length ? article.categories : [article.category];
}

function ArticleCard({ article }: { article: Article }) {
  const categories = categoryList(article);
  const tags = article.tags?.slice(0, 3) ?? [];
  const color = CAT_COLOR[categories[0]] ?? DEFAULT_COLOR;

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5 dark:border-zinc-800 dark:bg-zinc-900">
      <Link href={`/berita/${article.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-700">
          {article.image_url ? (
            <Image src={article.image_url} alt={article.title} fill unoptimized className="object-cover transition duration-500 group-hover:scale-105" />
          ) : (
            <div className="flex h-full items-end p-5 text-sm font-medium text-gray-400 dark:text-zinc-500">Ilustrasi segera tersedia</div>
          )}
        </div>
        <div className="flex min-h-56 flex-col gap-3 p-5">
          <div className="flex flex-wrap gap-1.5">
            {categories.slice(0, 2).map((category) => (
              <span key={category} className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${color.badge}`}>{category}</span>
            ))}
          </div>
          <h2 className="font-display text-lg font-semibold leading-snug text-gray-900 transition group-hover:text-brand dark:text-white dark:group-hover:text-yellow-400">{article.title}</h2>
          {article.excerpt && <p className="line-clamp-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{article.excerpt}</p>}
          <div className="mt-auto flex items-center justify-between gap-3 pt-2 text-xs text-gray-400 dark:text-gray-500">
            <span>{formatDate(article.published_at ?? article.created_at)}</span>
            {sourceName(article.source_url) && <span className="truncate">{sourceName(article.source_url)}</span>}
          </div>
          {tags.length > 0 && <div className="flex flex-wrap gap-1">{tags.map((tag) => <span key={tag} className="text-[11px] text-gray-400 dark:text-gray-500">#{tag}</span>)}</div>}
        </div>
      </Link>
    </article>
  );
}

interface PageProps { searchParams: Promise<{ category?: string; page?: string; q?: string }>; }

export default async function BeritaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const categoryKey = CATEGORY_BY_KEY[params.category ?? ""] ? params.category ?? "" : "";
  const search = (params.q ?? "").trim();
  const page = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1);
  const offset = (page - 1) * PAGE_SIZE;
  let categoryRows: { category: string; categories: string[] | null }[] = [];
  let articles: Article[] = [];
  let totalCount = 0;

  try {
      const admin = await createClient();
      const { data: categoryData } = await admin
        .from("articles")
        .select("category, categories")
        .eq("published", true)
        .neq("category", "Portfolio");
      categoryRows = (categoryData ?? []) as { category: string; categories: string[] | null }[];

      let query = admin
        .from("articles")
        .select("id, title, slug, excerpt, image_url, category, categories, tags, published_at, created_at, source_url, is_trending", { count: "exact" })
        .eq("published", true)
        .neq("category", "Portfolio")
        .order("published_at", { ascending: false, nullsFirst: false });

      const categoryLabel = categoryKey ? CATEGORY_BY_KEY[categoryKey] : undefined;
      if (categoryLabel) query = query.contains("categories", [categoryLabel]);
      if (search) query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);

      const { data, count, error } = await query.range(offset, offset + PAGE_SIZE - 1);
      articles = (data ?? []) as Article[];
      totalCount = count ?? 0;
      if (error) articles = [];
  } catch {
    articles = [];
  }

  const categoryCounts: Record<string, number> = {};
  for (const row of categoryRows) {
    const labels = Array.isArray(row.categories) && row.categories.length ? row.categories : [row.category];
    for (const label of labels) if (typeof label === "string" && label !== "Portfolio") categoryCounts[label] = (categoryCounts[label] ?? 0) + 1;
  }

  const categoryLabel = categoryKey ? CATEGORY_BY_KEY[categoryKey] : undefined;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-gray-100 py-10 dark:border-zinc-800 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand dark:text-yellow-400">Gorontalo Unite</p>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">Berita</h1>
            <p className="mt-3 max-w-xl text-sm text-gray-500 dark:text-gray-400">Ringkasan berita Gorontalo dengan rujukan ke sumber asli.</p>
          </div>
          <Link href="/" className="text-sm text-gray-500 transition hover:text-brand dark:text-gray-400 dark:hover:text-yellow-400">← Kembali ke beranda</Link>
        </header>

        <section className="sticky top-14 z-20 border-b border-gray-100 bg-white/95 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
          <Suspense fallback={<div className="h-10 animate-pulse rounded-xl bg-gray-100 dark:bg-zinc-800" />}>
            <BeritaFilters activeCategory={categoryKey} activeSearch={search} catCounts={categoryCounts} />
          </Suspense>
        </section>

        <section className="py-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">{categoryLabel ? `${categoryLabel} · ` : ""}{totalCount} artikel</p>
            {search && <p className="truncate text-sm text-gray-400 dark:text-gray-500">Hasil untuk “{search}”</p>}
          </div>

          {articles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 px-6 py-20 text-center dark:border-zinc-700">
              <h2 className="font-display text-xl font-semibold text-gray-800 dark:text-gray-100">Artikel sedang disiapkan</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Artikel kurasi Gorontalo Unite akan hadir di sini setelah proses editorial selesai.</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{articles.map((article) => <ArticleCard key={article.id} article={article} />)}</div>
          )}
        </section>

        <Suspense><BeritaPagination page={page} totalPages={totalPages} /></Suspense>
      </main>
    </div>
  );
}
