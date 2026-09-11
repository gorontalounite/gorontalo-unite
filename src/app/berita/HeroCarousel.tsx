"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { resolveWebCategoryLabel } from "./categories";

export interface HeroArticleData {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  image_url: string | null;
  category: string;
  categories: string[] | null;
  tags: string[] | null;
  published_at: string | null;
  created_at: string;
}

function articleDate(article: HeroArticleData) {
  return article.published_at ?? article.created_at;
}

function displayDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Makassar" }).format(new Date(value));
}

function HeroEyebrow({ article, deskMap }: { article: HeroArticleData; deskMap: Readonly<Record<string, string>> }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-white/70">
      <span className="text-[#f5c400]">{resolveWebCategoryLabel(article, deskMap)}</span>
      <span aria-hidden>•</span>
      <time dateTime={articleDate(article)}>{displayDate(articleDate(article))}</time>
    </div>
  );
}

function HeroImage({ article, className, priority = false, sizes }: { article: HeroArticleData; className: string; priority?: boolean; sizes: string }) {
  return (
    <div className={`bg-[#e8e4dc] dark:bg-zinc-800 ${className}`}>
      {article.image_url ? (
        <Image src={article.image_url} alt="" fill priority={priority} loading={priority ? "eager" : "lazy"} unoptimized sizes={sizes} className="object-cover" />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(245,196,0,.55),transparent_28%),linear-gradient(135deg,#eee9df,#cfc9bb)]" />
      )}
    </div>
  );
}

const ROTATE_MS = 6000;
const FADE_MS = 350;

export default function HeroCarousel({ pool, deskMap }: { pool: HeroArticleData[]; deskMap: Readonly<Record<string, string>> }) {
  const [offset, setOffset] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  // Only the lead article rotates. The two cards beside it used to be derived
  // from the same offset, so all three swapped at once.
  const sideCount = Math.min(2, Math.max(0, pool.length - 1));
  const sides = pool.slice(pool.length - sideCount);
  const rotating = pool.slice(0, pool.length - sideCount);
  const total = rotating.length;

  const go = useCallback((step: number) => {
    if (total <= 1) return;
    setVisible(false);
    window.setTimeout(() => {
      setOffset((value) => (value + step + total) % total);
      setVisible(true);
    }, FADE_MS);
  }, [total]);

  useEffect(() => {
    if (total <= 1 || paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => go(1), ROTATE_MS);
    return () => clearInterval(interval);
  }, [total, paused, go]);

  if (pool.length === 0) return null;

  const hero = rotating[offset % total];
  const fadeClass = `transition-[opacity,transform] duration-300 ease-out ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.7fr_.8fr]">
      <article
        className="group relative min-h-[440px] overflow-hidden rounded-[4px] bg-black sm:min-h-[570px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div key={hero.id} className={`absolute inset-0 ${fadeClass}`}>
          <HeroImage article={hero} className="absolute inset-0 h-full w-full" priority sizes="(max-width: 1024px) 100vw, 70vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <Link href={`/${hero.slug}`} className="absolute inset-0 flex items-end p-6 sm:p-10">
            <div className="max-w-3xl text-white">
              <HeroEyebrow article={hero} deskMap={deskMap} />
              <h1 className="mt-3 font-display text-[30px] font-extrabold leading-[1.02] sm:text-[46px]">{hero.title}</h1>
              {hero.excerpt ? <p className="mt-4 hidden max-w-2xl text-sm leading-relaxed text-white/75 sm:line-clamp-2">{hero.excerpt}</p> : null}
            </div>
          </Link>
        </div>

        {total > 1 && (
          <div className="absolute right-4 top-4 z-10 flex gap-2 sm:right-6 sm:top-6">
            <CarouselArrow label="Previous story" onClick={() => go(-1)} d="M15 18l-6-6 6-6" />
            <CarouselArrow label="Next story" onClick={() => go(1)} d="M9 6l6 6-6 6" />
          </div>
        )}
      </article>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
        {sides.map((article) => (
          <article key={article.id} className="group relative min-h-[240px] overflow-hidden rounded-[4px] bg-black sm:min-h-[275px]">
            <HeroImage article={article} className="absolute inset-0 h-full w-full" sizes="(max-width: 1024px) 50vw, 30vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
            <Link href={`/${article.slug}`} className="absolute inset-0 flex items-end p-4 sm:p-6">
              <div className="text-white">
                <HeroEyebrow article={article} deskMap={deskMap} />
                <h2 className="mt-2 line-clamp-3 font-display text-[16px] font-extrabold leading-[1.08] sm:text-[20px]">{article.title}</h2>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

function CarouselArrow({ label, onClick, d }: { label: string; onClick: () => void; d: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d={d} /></svg>
    </button>
  );
}
