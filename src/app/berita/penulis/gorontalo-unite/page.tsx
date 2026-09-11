import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "gorontalounite — Author",
  description: "Articles and editorial curation by gorontalounite.",
  alternates: { canonical: "/author/gorontalounite" },
};

interface AuthorArticle {
  id: string;
  title: string;
  slug: string;
  image_url: string | null;
  category: string;
  categories: string[] | null;
  published_at: string | null;
  created_at: string;
}

const CATEGORY_DOTS: Record<string, string> = {
  Politik: "bg-blue-500",
  Pemerintahan: "bg-sky-500",
  Wisata: "bg-yellow-500",
  Budaya: "bg-purple-500",
  Ekonomi: "bg-green-500",
  Bisnis: "bg-emerald-500",
  Pendidikan: "bg-teal-500",
  Sosial: "bg-orange-500",
  Kesehatan: "bg-red-500",
  Teknologi: "bg-violet-500",
  Olahraga: "bg-indigo-500",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default async function GorontaloUniteAuthorPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("id, title, slug, image_url, category, categories, published_at, created_at")
    .eq("published", true)
    .neq("category", "Portfolio")
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(24);

  const articles = (data ?? []) as AuthorArticle[];

  return (
    <div className="min-h-screen bg-[#f7f7f7] pb-20 text-[#101018] dark:bg-zinc-950 dark:text-white">
      <section className="relative overflow-hidden border-b border-stone-100 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60 dark:opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(120,120,120,.24) 1.2px, transparent 1.2px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 py-12 text-center sm:px-8 sm:py-16">
          <div className="author-avatar relative shrink-0 overflow-hidden rounded-full border-4 border-white bg-black shadow-[0_8px_30px_rgba(0,0,0,.14)] ring-1 ring-stone-300 dark:border-zinc-900 dark:ring-zinc-700">
            <Image
              src="/logo.png"
              alt="Logo Gorontalo Unite"
              fill
              className="object-cover"
              sizes="128px"
              priority
            />
          </div>

          <p className="mt-6 text-[10px] font-bold uppercase tracking-[.2em] text-stone-400 dark:text-zinc-500">Author</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-.025em] sm:text-4xl">gorontalounite</h1>
          <p className="mt-1 text-[11px] font-medium text-stone-500 dark:text-zinc-400">@gorontalounite</p>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 dark:text-zinc-300 sm:text-base">
            Editorial team and curator of stories, information, and good news from Gorontalo.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 sm:px-8">
        <div className="flex items-center justify-between py-7 text-xs text-stone-500 dark:text-zinc-400 sm:text-sm">
          <Link href="/" className="font-semibold text-brand hover:underline">← All news</Link>
          <span>{articles.length} articles</span>
        </div>

        {articles.length > 0 ? (
          <div className="space-y-4">
            {articles.map((article) => {
              const category = article.categories?.[0] || article.category;
              const publishedAt = article.published_at || article.created_at;
              const dotColor = CATEGORY_DOTS[category] || "bg-stone-400";

              return (
                <Link
                  key={article.id}
                  href={`/${article.slug}`}
                  className="group flex min-h-36 overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-[0_10px_35px_rgba(15,23,42,.06)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(15,23,42,.1)] dark:border-zinc-800 dark:bg-zinc-900 sm:min-h-48"
                >
                  <div className="author-article-image relative min-h-full shrink-0 overflow-hidden bg-stone-100 dark:bg-zinc-800">
                    {article.image_url ? (
                      <Image
                        src={article.image_url}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 639px) 124px, 208px"
                      />
                    ) : (
                      <Image src="/logo.png" alt="" fill className="object-contain p-7 opacity-30" sizes="208px" />
                    )}
                  </div>

                  <div className="flex min-w-0 flex-col justify-center px-4 py-4 sm:px-7 sm:py-6">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.1em] text-stone-600 dark:text-zinc-300 sm:text-xs">
                      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotColor}`} />
                      <span className="truncate">{category}</span>
                    </div>
                    <h2 className="mt-3 line-clamp-3 text-sm font-semibold leading-snug tracking-[-.015em] text-[#101018] group-hover:text-brand dark:text-white sm:text-xl">
                      {article.title}
                    </h2>
                    <time dateTime={publishedAt} className="mt-4 text-[10px] text-stone-400 dark:text-zinc-500 sm:text-xs">
                      {formatDate(publishedAt)}
                    </time>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center text-sm text-stone-500 dark:border-zinc-700 dark:bg-zinc-900">
            Stories are being prepared.
          </div>
        )}
      </main>
    </div>
  );
}
