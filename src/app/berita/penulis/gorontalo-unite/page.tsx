import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import NewsCard, { type NewsArticle } from "@/components/news/NewsCard";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Gorontalo Unite — Penulis", description: "Artikel dan kurasi editorial Gorontalo Unite." };

export default async function GorontaloUniteAuthorPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("id, title, slug, excerpt, image_url, category, categories, published_at, created_at, is_trending")
    .eq("published", true)
    .neq("category", "Portfolio")
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(24);
  const articles = (data ?? []) as NewsArticle[];

  return (
    <div className="bg-[#f7f5ef] py-8 pb-20 text-stone-900 dark:bg-zinc-950 dark:text-white sm:py-12">
      <section className="bg-[#b68921] text-white dark:bg-[#6f5312]">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-white/70">Penulis</p>
          <div className="mt-5 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div><h1 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">Gorontalo Unite</h1><p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">Redaksi dan kurator cerita, informasi, serta kabar baik dari Gorontalo.</p></div>
            <div className="grid h-24 w-24 place-items-center rounded-full border-4 border-white/60 bg-stone-900 text-2xl font-bold">GU</div>
          </div>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="py-8 text-sm text-stone-500 dark:text-zinc-400"><Link href="/berita" className="font-semibold text-brand hover:underline">← Semua berita</Link><span className="mx-2">/</span>{articles.length} artikel</div>
        {articles.length ? <div className="grid gap-5 sm:grid-cols-2">{articles.map((article) => <NewsCard key={article.id} article={article} variant="feature" />)}</div> : <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-16 text-center text-stone-500 dark:border-zinc-700 dark:bg-zinc-900">Artikel sedang disiapkan.</div>}
      </main>
    </div>
  );
}
