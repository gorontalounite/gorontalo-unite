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

function StoryImage({ article, priority = false }: { article: Article; priority?: boolean }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-zinc-800">
      {article.image_url ? (
        <Image src={article.image_url} alt={article.title} fill unoptimized priority={priority} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
      ) : (
        <div className="flex h-full items-end bg-gradient-to-br from-amber-100 via-stone-100 to-stone-200 p-5 text-sm font-medium text-stone-500 dark:from-zinc-800 dark:to-zinc-700">Gorontalo Unite</div>
      )}
    </div>
  );
}

function StoryMeta({ article }: { article: Article }) {
  const category = categoryList(article)[0];
  return <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.14em] text-amber-700 dark:text-amber-300"><span>{category}</span><span className="h-1 w-1 rounded-full bg-stone-300" /><span className="text-stone-400 dark:text-zinc-500">{formatDate(article.published_at ?? article.created_at)}</span></div>;
}

function FeaturedStory({ article }: { article: Article }) {
  return <article className="group overflow-hidden rounded-[1.8rem] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-stone-900/10 dark:border-zinc-800 dark:bg-zinc-900">
    <Link href={`/berita/${article.slug}`} className="block"><StoryImage article={article} priority /><div className="p-5 sm:p-7"><StoryMeta article={article} /><h2 className="mt-3 font-display text-2xl font-semibold leading-[1.08] text-stone-900 transition group-hover:text-amber-700 dark:text-white dark:group-hover:text-amber-300 sm:text-3xl">{article.title}</h2>{article.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-stone-500 dark:text-zinc-400">{article.excerpt}</p>}</div></Link>
  </article>;
}

function CompactStory({ article }: { article: Article }) {
  return <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:border-amber-200 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"><Link href={`/berita/${article.slug}`} className="block"><StoryImage article={article} /><div className="p-4"><StoryMeta article={article} /><h2 className="mt-2 font-display text-lg font-semibold leading-snug text-stone-900 group-hover:text-amber-700 dark:text-white dark:group-hover:text-amber-300">{article.title}</h2></div></Link></article>;
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
  const editorialFront = !categoryKey && !search && page === 1;
  const featured = editorialFront ? articles[0] : undefined;
  const supportingStories = editorialFront ? articles.slice(1, 4) : [];
  const latestStories = editorialFront ? articles.slice(4) : articles;

  return (
    <div className="min-h-screen bg-[#f7f5ef] text-stone-900 dark:bg-zinc-950 dark:text-white">
      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <header className="border-b border-stone-300 py-7 dark:border-zinc-800">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[.18em] text-stone-500 dark:text-zinc-400"><span>Berita & cerita Gorontalo</span><Link href="/" className="transition hover:text-amber-700 dark:hover:text-amber-300">Kembali ke beranda ↗</Link></div>
          <h1 className="mt-6 text-center font-display text-4xl font-semibold tracking-[-.045em] text-stone-900 dark:text-white sm:text-6xl">Gorontalo Unite</h1>
          <p className="mt-2 text-center text-sm text-stone-500 dark:text-zinc-400">Informasi, cerita, dan kabar baik dari Gorontalo.</p>
        </header>

        <section className="sticky top-14 z-20 border-b border-stone-200 bg-[#f7f5ef]/95 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
          <Suspense fallback={<div className="h-10 animate-pulse rounded-xl bg-gray-100 dark:bg-zinc-800" />}>
            <BeritaFilters activeCategory={categoryKey} activeSearch={search} catCounts={categoryCounts} />
          </Suspense>
        </section>

        {featured && <section className="py-10 sm:py-14"><div className="mb-6 flex items-end justify-between border-b border-stone-300 pb-4 dark:border-zinc-800"><div><p className="text-[11px] font-semibold uppercase tracking-[.2em] text-amber-700 dark:text-amber-300">Pilihan utama</p><h2 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Gorontalo Unite</h2></div><span className="text-xs text-stone-400">{totalCount} artikel</span></div><div className="grid gap-4 lg:grid-cols-12"><div className="lg:col-span-7"><FeaturedStory article={featured} /></div><div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">{supportingStories.map((article) => <CompactStory key={article.id} article={article} />)}</div></div></section>}

        <section className="py-8">
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-stone-300 pb-4 dark:border-zinc-800"><div><p className="text-[11px] font-semibold uppercase tracking-[.2em] text-amber-700 dark:text-amber-300">{categoryLabel || "Berita terbaru"}</p><h2 className="mt-1 font-display text-3xl font-semibold tracking-tight">{editorialFront ? "Terbaru dari Gorontalo" : "Hasil berita"}</h2></div><p className="text-sm text-stone-500 dark:text-zinc-400">{totalCount} artikel</p></div>
          {search && <p className="mb-5 truncate text-sm text-stone-500 dark:text-zinc-400">Hasil untuk “{search}”</p>}

          {articles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-20 text-center dark:border-zinc-700 dark:bg-zinc-900">
              <h2 className="font-display text-xl font-semibold text-gray-800 dark:text-gray-100">Artikel sedang disiapkan</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Artikel kurasi Gorontalo Unite akan hadir di sini setelah proses editorial selesai.</p>
            </div>
          ) : latestStories.length === 0 && editorialFront ? (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-12 text-center text-sm text-stone-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">Artikel berikutnya akan muncul di bagian ini.</div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{latestStories.map((article) => <ArticleCard key={article.id} article={article} />)}</div>
          )}
        </section>

        <Suspense><BeritaPagination page={page} totalPages={totalPages} /></Suspense>
      </main>
    </div>
  );
}
