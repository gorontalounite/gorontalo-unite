import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import BeritaPagination from "./BeritaPagination";
import { CATEGORIES } from "./categories";
import NewsCard, { type NewsArticle } from "@/components/news/NewsCard";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Berita Gorontalo — Gorontalo Unite",
  description: "Berita, cerita, dan informasi terbaru dari Gorontalo.",
  openGraph: { title: "Berita Gorontalo | Gorontalo Unite", type: "website" },
};

const PAGE_SIZE = 12;
const CATEGORY_BY_KEY = Object.fromEntries(CATEGORIES.map((category) => [category.key, category.label]));
type PageProps = { searchParams: Promise<{ category?: string; page?: string; q?: string }> };

function SectionHeading({ eyebrow, title, count }: { eyebrow: string; title: string; count?: string }) {
  return <div className="mb-5 flex items-end justify-between gap-4 border-b border-stone-300 pb-4 dark:border-zinc-700"><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-brand">{eyebrow}</p><h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2></div>{count && <p className="pb-1 text-sm text-stone-500 dark:text-zinc-400">{count}</p>}</div>;
}

export default async function BeritaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const categoryKey = CATEGORY_BY_KEY[params.category ?? ""] ? params.category ?? "" : "";
  const categoryLabel = categoryKey ? CATEGORY_BY_KEY[categoryKey] : undefined;
  const search = (params.q ?? "").trim();
  const page = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1);
  const offset = (page - 1) * PAGE_SIZE;
  let articles: NewsArticle[] = [];
  let totalCount = 0;

  try {
    const supabase = await createClient();
    let articleRequest = supabase.from("articles")
      .select("id, title, slug, excerpt, image_url, category, categories, published_at, created_at, is_trending", { count: "exact" })
      .eq("published", true).neq("category", "Portfolio")
      .order("published_at", { ascending: false, nullsFirst: false });
    if (categoryLabel) articleRequest = articleRequest.contains("categories", [categoryLabel]);
    if (search) articleRequest = articleRequest.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
    const { data, count, error } = await articleRequest.range(offset, offset + PAGE_SIZE - 1);
    articles = error ? [] : (data ?? []) as NewsArticle[];
    totalCount = count ?? 0;
  } catch { articles = []; }

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const editorial = !categoryKey && !search && page === 1;
  const lead = editorial ? articles[0] : undefined;
  const sideStories = editorial ? articles.slice(1, 3) : [];
  const newsStories = editorial ? articles.slice(3, 9) : articles;
  const choiceStories = editorial ? articles.filter((article) => article.is_trending).slice(0, 3) : [];

  return (
    <div className="min-h-screen bg-[#f7f5ef] text-stone-900 dark:bg-zinc-950 dark:text-white">
      <main className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        {search ? <section className="pb-4 pt-9 sm:pb-6 sm:pt-12"><div className="rounded-3xl bg-stone-900 px-6 py-10 text-white dark:bg-amber-500 dark:text-stone-950 sm:px-10"><p className="text-[10px] font-bold uppercase tracking-[.24em] text-amber-300 dark:text-stone-900">Pencarian berita</p><h2 className="mt-2 font-display text-3xl font-semibold sm:text-5xl">Hasil untuk “{search}”</h2><p className="mt-3 text-sm text-stone-300 dark:text-stone-800">{totalCount} artikel ditemukan.</p></div></section> : categoryLabel ? <section className="pb-4 pt-9 sm:pb-6 sm:pt-12"><p className="text-[10px] font-bold uppercase tracking-[.24em] text-brand">Kategori</p><h2 className="mt-2 font-display text-4xl font-semibold sm:text-6xl">{categoryLabel}</h2><p className="mt-3 text-sm text-stone-500 dark:text-zinc-400">{totalCount} artikel dalam kategori ini.</p></section> : null}

        {editorial && lead && <>
          <section aria-label="Sorotan hari ini" className="pb-8 pt-9 sm:pb-10 sm:pt-12"><div className="grid gap-5 lg:grid-cols-[1.6fr_.8fr]"><NewsCard article={lead} variant="hero" /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">{sideStories.map((article) => <NewsCard key={article.id} article={article} variant="compact" />)}</div></div></section>
          {sideStories.length > 0 && <section className="overflow-hidden rounded-3xl bg-[#b68921] px-5 py-6 text-white sm:px-8 sm:py-7"><div className="mb-5 flex items-center justify-between"><h2 className="font-display text-2xl font-semibold">Terbaca minggu ini</h2><span className="text-xs text-white/70">Pilihan pembaca</span></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{articles.slice(0, 4).map((article, index) => <Link key={article.id} href={`/berita/${article.slug}`} className="group min-h-28 rounded-xl border border-white/20 bg-stone-900/85 p-4 transition hover:bg-stone-900"><span className="text-xs font-bold text-amber-300">0{index + 1}</span><p className="mt-2 line-clamp-2 text-sm font-semibold leading-snug">{article.title}</p></Link>)}</div></section>}
        </>}

        <section className={editorial ? "pb-12 pt-12 sm:pb-16 sm:pt-16" : "pb-12 pt-9 sm:pb-16 sm:pt-12"}><SectionHeading eyebrow={search ? "Hasil pencarian" : categoryLabel ? "Berita kategori" : "Berita terbaru"} title={search ? "Ditemukan untuk Anda" : categoryLabel ? categoryLabel : "Kabar terbaru"} count={`${totalCount} artikel`} />
          {articles.length === 0 ? <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-20 text-center dark:border-zinc-700 dark:bg-zinc-900"><h2 className="font-display text-xl font-semibold">Artikel sedang disiapkan</h2><p className="mt-2 text-sm text-stone-500 dark:text-zinc-400">Coba ubah kata kunci atau pilih kategori lain.</p></div> : newsStories.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{newsStories.map((article) => <NewsCard key={article.id} article={article} variant="card" />)}</div> : <p className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center text-sm text-stone-500 dark:border-zinc-700 dark:bg-zinc-900">Artikel berikutnya akan tampil di sini.</p>}</section>

        {editorial && choiceStories.length > 0 && <section className="pb-12 sm:pb-16"><SectionHeading eyebrow="Pilihan redaksi" title="Direkomendasikan untuk Anda" /><div className="mx-auto grid max-w-5xl gap-5">{choiceStories.map((article) => <NewsCard key={article.id} article={article} variant="list" />)}</div></section>}
        {!search && !categoryLabel && <section className="rounded-3xl bg-stone-900 px-6 py-10 text-center text-white dark:bg-zinc-900 sm:px-12"><p className="text-[10px] font-bold uppercase tracking-[.24em] text-amber-300">Dari redaksi</p><h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Ikuti kabar baik dari Gorontalo</h2><p className="mx-auto mt-3 max-w-xl text-sm text-stone-300">Temukan berita, cerita, dan rekomendasi yang dikurasi Gorontalo Unite.</p><Link href="/berita/penulis/gorontalo-unite" className="mt-6 inline-flex rounded-full bg-[#f5c400] px-5 py-2.5 text-sm font-bold text-stone-950 transition hover:bg-yellow-300">Lihat profil redaksi →</Link></section>}
        <Suspense><BeritaPagination page={page} totalPages={totalPages} /></Suspense>
      </main>
    </div>
  );
}
