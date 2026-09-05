"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_REEL_CATEGORIES, type ReelItem } from "./data";

type CategoryFilter = "Semua" | string;
type PeriodFilter = "all" | string;

function categoryAccent(category: string) {
  if (category === "Wisata") return "bg-sky-500";
  if (category === "Food") return "bg-amber-500";
  if (category === "Event") return "bg-rose-500";
  if (category === "Brand") return "bg-violet-500";
  return "bg-emerald-500";
}

const number = new Intl.NumberFormat("id-ID", { notation: "compact", maximumFractionDigits: 1 });
const date = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" });
const month = new Intl.DateTimeFormat("id-ID", { month: "long" });

function reelPeriod(reel: ReelItem) {
  return reel.publishedAt.slice(0, 7);
}

function reelYear(reel: ReelItem) {
  return reel.publishedAt.slice(0, 4);
}

function matchesPeriod(reel: ReelItem, period: PeriodFilter) {
  if (period === "all") return true;
  return period.length === 4 ? reelYear(reel) === period : reelPeriod(reel) === period;
}

function orderedCategories(reels: ReelItem[]) {
  const available = [...new Set(reels.map((item) => item.category))];
  return [
    ...DEFAULT_REEL_CATEGORIES.filter((item) => available.includes(item)),
    ...available.filter((item) => !DEFAULT_REEL_CATEGORIES.includes(item as (typeof DEFAULT_REEL_CATEGORIES)[number])).sort(),
  ];
}

function PlayIcon() {
  return (
    <span className="grid h-14 w-14 place-items-center rounded-full border border-white/50 bg-black/35 text-white shadow-xl backdrop-blur-md transition-transform group-hover:scale-105 md:h-16 md:w-16">
      <svg className="ml-1 h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8 5.14v13.72c0 .78.85 1.26 1.52.86l10.8-6.86a1 1 0 0 0 0-1.72L9.52 4.28A1 1 0 0 0 8 5.14Z" />
      </svg>
    </span>
  );
}

function CategoryTabs({ active, onChange, reels, vertical = false }: {
  active: CategoryFilter;
  onChange: (category: CategoryFilter) => void;
  reels: ReelItem[];
  vertical?: boolean;
}) {
  const categories: CategoryFilter[] = ["Semua", ...orderedCategories(reels)];
  return (
    <div className={vertical ? "space-y-1" : "no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3"}>
      {categories.map((category) => {
        const count = category === "Semua" ? reels.length : reels.filter((item) => item.category === category).length;
        const selected = active === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={vertical
              ? `flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold uppercase tracking-[.15em] transition ${selected ? "bg-black text-white dark:bg-white dark:text-black" : "text-neutral-500 hover:bg-black/5 dark:text-neutral-400 dark:hover:bg-white/10"}`
              : `shrink-0 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold transition ${selected ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black" : "border-black/10 bg-white/70 text-neutral-600 dark:border-white/15 dark:bg-neutral-900 dark:text-neutral-300"}`}
            aria-pressed={selected}
          >
            <span>{category}</span>
            {vertical && <span className={selected ? "text-white/60 dark:text-black/50" : "text-neutral-400"}>{count}</span>}
          </button>
        );
      })}
    </div>
  );
}

function FilterSelect({ label, value, onChange, children, active = false }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <label className={`relative inline-flex h-8 items-center rounded-full border px-3 text-[10px] font-bold uppercase tracking-[.08em] shadow-sm ${active ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black" : "border-black/10 bg-white/80 text-neutral-700 dark:border-white/15 dark:bg-neutral-900 dark:text-neutral-200"}`}>
      <span>{label}</span>
      <svg className="ml-1.5 h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
      </svg>
      <select
        aria-label={`Filter ${label.toLowerCase()}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        {children}
      </select>
    </label>
  );
}

export default function ReelsFeed({ reels, initialCategory = "Semua", initialPeriod = "all" }: {
  reels: ReelItem[];
  initialCategory?: CategoryFilter;
  initialPeriod?: PeriodFilter;
}) {
  const [category, setCategory] = useState<CategoryFilter>(initialCategory);
  const [period, setPeriod] = useState<PeriodFilter>(initialPeriod);
  const [activeId, setActiveId] = useState<string>(reels[0]?.id ?? "");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const categories = useMemo(() => orderedCategories(reels), [reels]);
  const filtered = useMemo(
    () => reels.filter((item) => (
      (category === "Semua" || item.category === category) && matchesPeriod(item, period)
    )),
    [category, period, reels],
  );
  const periodGroups = useMemo(() => {
    const categoryReels = category === "Semua" ? reels : reels.filter((item) => item.category === category);
    const years = [...new Set(categoryReels.map(reelYear))].sort((a, b) => b.localeCompare(a));
    return years.map((year) => ({
      year,
      months: [...new Set(categoryReels.filter((item) => reelYear(item) === year).map(reelPeriod))]
        .sort((a, b) => b.localeCompare(a)),
    }));
  }, [category, reels]);
  const activeIndex = Math.max(0, filtered.findIndex((item) => item.id === activeId));

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target instanceof HTMLElement) setActiveId(visible.target.dataset.reelId ?? "");
    }, { root, threshold: [0.55, 0.75] });
    root.querySelectorAll<HTMLElement>("[data-reel-id]").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [filtered]);

  function updateUrl(nextCategory: CategoryFilter, nextPeriod: PeriodFilter) {
    const params = new URLSearchParams();
    if (nextCategory !== "Semua") params.set("kategori", nextCategory.toLowerCase());
    if (nextPeriod !== "all") params.set("periode", nextPeriod);
    window.history.replaceState(null, "", params.size ? `/reels?${params}` : "/reels");
  }

  function resetFeed(nextItems: ReelItem[]) {
    setActiveId(nextItems[0]?.id ?? "");
    scrollerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectCategory(next: CategoryFilter) {
    const categoryItems = next === "Semua" ? reels : reels.filter((item) => item.category === next);
    const nextPeriod = period === "all" || categoryItems.some((item) => matchesPeriod(item, period)) ? period : "all";
    setCategory(next);
    setPeriod(nextPeriod);
    const nextItems = categoryItems.filter((item) => matchesPeriod(item, nextPeriod));
    resetFeed(nextItems);
    updateUrl(next, nextPeriod);
  }

  function selectPeriod(next: PeriodFilter) {
    setPeriod(next);
    const nextItems = reels.filter((item) => (
      (category === "Semua" || item.category === category) && matchesPeriod(item, next)
    ));
    resetFeed(nextItems);
    updateUrl(category, next);
  }

  return (
    <section className="flex h-[calc(100svh-7.5rem)] min-h-[560px] flex-col overflow-hidden bg-[#f5f4ef] text-neutral-950 dark:bg-[#090909] dark:text-white md:h-[calc(100svh-3.5rem)] md:min-h-[640px]">
      <header className="shrink-0 border-b border-black/10 bg-[#f5f4ef]/95 px-4 py-4 backdrop-blur dark:border-white/10 dark:bg-[#090909]/95 md:px-8 md:py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="font-display text-xl font-bold tracking-tight md:text-2xl">
            <span className="mr-2 text-[#d6aa00]">/</span>Reels<span className="ml-2 text-[#d6aa00]">/</span>
          </h1>
          <p className="hidden text-[11px] font-semibold uppercase tracking-[.18em] text-neutral-500 md:block">Scroll untuk melihat berikutnya ↓</p>
          <div className="flex items-center gap-1.5 md:hidden">
            <FilterSelect
              label="Kategori"
              value={category}
              active={category !== "Semua"}
              onChange={(value) => selectCategory(value as CategoryFilter)}
            >
              <option value="Semua">Semua kategori</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </FilterSelect>
            <FilterSelect
              label="Tanggal"
              value={period}
              active={period !== "all"}
              onChange={selectPeriod}
            >
              <option value="all">Semua tanggal</option>
              {periodGroups.map(({ year, months }) => (
                <optgroup key={year} label={year}>
                  <option value={year}>Semua bulan {year}</option>
                  {months.map((value) => (
                    <option key={value} value={value}>
                      {month.format(new Date(`${value}-01T00:00:00+08:00`))} {year}
                    </option>
                  ))}
                </optgroup>
              ))}
            </FilterSelect>
          </div>
        </div>
      </header>

      <div ref={scrollerRef} className="no-scrollbar min-h-0 flex-1 snap-y snap-mandatory overflow-y-auto overscroll-contain scroll-smooth">
        {filtered.map((reel, index) => (
          <article
            key={reel.id}
            data-reel-id={reel.id}
            className="grid h-full snap-start snap-always place-items-center px-3 py-3 md:px-8 md:py-4"
          >
            <div className="mx-auto grid h-full w-full max-w-6xl place-items-center gap-7 lg:grid-cols-[170px_minmax(280px,430px)_minmax(260px,360px)]">
              <aside className="hidden w-full self-center lg:block">
                <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-neutral-400">Kategori</p>
                <CategoryTabs active={category} onChange={selectCategory} reels={reels} vertical />
              </aside>

              <a
                href={reel.permalink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Buka Reel ${reel.category} oleh @${reel.username} di Instagram`}
                className="group relative block aspect-[9/16] h-full max-h-[760px] w-auto max-w-full shrink-0 overflow-hidden rounded-[10px] bg-neutral-900 shadow-[0_18px_70px_rgba(0,0,0,.18)] ring-1 ring-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c400] md:max-h-[calc(100svh-9rem)]"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={reel.thumbnail}
                    alt={reel.description}
                    fill
                    preload={index === 0}
                    sizes="(max-width: 767px) 92vw, 430px"
                    className="object-cover transition duration-500 group-hover:scale-[1.015]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/85 md:from-transparent md:to-black/25" />
                  <div className="absolute inset-0 grid place-items-center"><PlayIcon /></div>

                  <div className="absolute inset-x-0 bottom-0 p-4 text-white md:hidden">
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${categoryAccent(reel.category)}`} />
                      <span className="text-[10px] font-bold uppercase tracking-[.17em]">{reel.category}</span>
                      {reel.sponsored && <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider backdrop-blur">Sponsored</span>}
                    </div>
                    <p className="text-xs font-semibold">@{reel.username}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/85">{reel.description}</p>
                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-[.14em] text-[#f5c400]">Buka di Instagram ↗</p>
                  </div>
                </div>
              </a>

              <aside className="hidden self-center md:block">
                <div className="mb-5 flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${categoryAccent(reel.category)}`} />
                  <p className="text-[11px] font-bold uppercase tracking-[.19em] text-neutral-500 dark:text-neutral-400">{reel.category}</p>
                  {reel.sponsored && <span className="rounded-full bg-violet-100 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">Sponsored</span>}
                </div>
                <p className="text-sm font-semibold">@{reel.username}</p>
                <p className="mt-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-300">{reel.description}</p>
                <div className="mt-5 flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                  {reel.views > 0 && <span>{number.format(reel.views)} views</span>}
                  {typeof reel.reach === "number" && reel.reach > 0 && <span>{number.format(reel.reach)} reach</span>}
                  <span>{number.format(reel.likes)} likes</span>
                </div>
                <p className="mt-2 text-xs text-neutral-400">{date.format(new Date(reel.publishedAt))}</p>
                <a
                  href={reel.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-bold text-white transition hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c400] dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                >
                  Buka di Instagram
                  <span aria-hidden="true">↗</span>
                </a>
                <p className="mt-8 text-xs tabular-nums text-neutral-400">
                  {String(activeIndex + 1).padStart(2, "0")} <span className="mx-2 text-neutral-300 dark:text-neutral-700">/</span> {String(filtered.length).padStart(2, "0")}
                </p>
              </aside>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
