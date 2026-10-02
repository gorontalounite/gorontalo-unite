"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { resolveWebCategoryLabel } from "./categories";

export interface DeskArticle {
  id: string; title: string; slug: string; category: string; categories: string[] | null;
  tags: string[] | null;
  excerpt: string | null; image_url: string | null; image_thumb_url: string | null;
  published_at: string | null; created_at: string;
  is_trending: boolean | null; view_count: number | null;
}

const PAGE_SIZE = 5;

function articleDate(article: DeskArticle) {
  return article.published_at ?? article.created_at;
}

function displayDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Makassar" }).format(new Date(value));
}

function ArticleImage({ article, className, sizes }: { article: DeskArticle; className: string; sizes: string }) {
  const src = article.image_thumb_url ?? article.image_url;
  return (
    <div className={`relative overflow-hidden rounded-[4px] bg-[#e8e4dc] dark:bg-zinc-800 ${className}`}>
      {src ? (
        <Image src={src} alt={article.title} fill sizes={sizes} className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]" />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(245,196,0,.55),transparent_28%),linear-gradient(135deg,#eee9df,#cfc9bb)]" />
      )}
    </div>
  );
}

function Eyebrow({ article, light = false, deskMap }: { article: DeskArticle; light?: boolean; deskMap: Readonly<Record<string, string>> }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] ${light ? "text-white/70" : "text-[#67635b] dark:text-zinc-400"}`}>
      <span className={light ? "text-[#f5c400]" : "text-[#7a5c0d] dark:text-amber-400"}>{resolveWebCategoryLabel(article, deskMap)}</span>
      <span aria-hidden>•</span>
      <time dateTime={articleDate(article)}>{displayDate(articleDate(article))}</time>
    </div>
  );
}

function FeatureCard({ article, variant, deskMap }: { article: DeskArticle; variant: "dark" | "light"; deskMap: Readonly<Record<string, string>> }) {
  if (variant === "dark") {
    return (
      <article className="group relative min-h-[430px] overflow-hidden rounded-[4px] sm:min-h-[560px]">
        <ArticleImage article={article} className="absolute inset-0 h-full w-full" sizes="(max-width: 768px) 100vw, 70vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
        <Link href={`/${article.slug}`} className="absolute inset-0 flex items-end p-6 sm:p-9">
          <div className="max-w-3xl text-white">
            <Eyebrow article={article} light deskMap={deskMap} />
            <h3 className="font-heading mt-3 text-[26px] font-bold leading-[1.04] tracking-[-.035em] sm:text-[38px]">{article.title}</h3>
            {article.excerpt ? <p className="mt-4 hidden max-w-2xl text-sm leading-relaxed text-white/75 sm:line-clamp-2">{article.excerpt}</p> : null}
          </div>
        </Link>
      </article>
    );
  }
  return (
    <article className="group">
      <Link href={`/${article.slug}`} className="block">
        <ArticleImage article={article} className="aspect-[16/10]" sizes="(max-width: 768px) 100vw, 55vw" />
        <div className="pt-4">
          <Eyebrow article={article} deskMap={deskMap} />
          <h3 className="font-heading mt-2 text-[22px] font-bold leading-[1.1] tracking-[-.025em] transition group-hover:text-[#9b7513] sm:text-[30px]">{article.title}</h3>
          {article.excerpt ? <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#6d6961] dark:text-zinc-400">{article.excerpt}</p> : null}
        </div>
      </Link>
    </article>
  );
}

function CompactStory({ article, deskMap }: { article: DeskArticle; deskMap: Readonly<Record<string, string>> }) {
  return (
    <article className="group border-b border-[#d7d1c6] dark:border-zinc-800 pb-4 last:border-0 last:pb-0">
      <Link href={`/${article.slug}`} className="grid grid-cols-[1fr_108px] gap-4">
        <div>
          <Eyebrow article={article} deskMap={deskMap} />
          <h3 className="font-heading mt-2 line-clamp-3 text-[15px] font-bold leading-[1.16] tracking-[-.015em] transition group-hover:text-[#9b7513] sm:text-[17px]">{article.title}</h3>
        </div>
        <div className="relative">
          <ArticleImage article={article} className="aspect-square" sizes="108px" />
        </div>
      </Link>
    </article>
  );
}

export default function DeskPaginatedList({ articles, deskMap, variant }: {
  articles: DeskArticle[];
  deskMap: Readonly<Record<string, string>>;
  variant: "dark" | "light";
}) {
  const pages = useMemo(() => {
    const chunks: DeskArticle[][] = [];
    for (let i = 0; i < articles.length; i += PAGE_SIZE) chunks.push(articles.slice(i, i + PAGE_SIZE));
    return chunks;
  }, [articles]);
  const [page, setPage] = useState(0);
  const current = pages[page] ?? [];

  if (current.length === 0) return null;

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-[1.45fr_.55fr]">
        <FeatureCard article={current[0]} variant={variant} deskMap={deskMap} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {current.slice(1).map((article) => <CompactStory key={article.id} article={article} deskMap={deskMap} />)}
        </div>
      </div>

      {pages.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {pages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setPage(index)}
              aria-label={`Halaman ${index + 1}`}
              aria-current={index === page}
              className={`h-9 min-w-9 rounded-[4px] px-3 text-xs font-bold transition ${
                index === page
                  ? "bg-[#302f2c] text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "border border-[#d7d1c6] text-[#6d6961] hover:border-[#9b7513] dark:border-zinc-700 dark:text-zinc-400"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
