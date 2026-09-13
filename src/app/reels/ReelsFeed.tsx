"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { DEFAULT_REEL_CATEGORIES, type ReelItem } from "./data";

/* ---------------------------------------------------------------------------
 * The Reels page reads as a video service: a hero, then shelves you push
 * sideways. It used to be one full-screen snap feed, which only ever showed a
 * single reel and gave no sense of how much there was.
 * ------------------------------------------------------------------------ */

type CategoryFilter = "All" | string;
type PeriodFilter = "all" | string;

/** How many a shelf shows before "View all" is worth offering. */
const SHELF_SIZE = 6;
const FEATURED_SIZE = 4;

const CATEGORY_ACCENT: Record<string, string> = {
  Tourism: "bg-sky-500",
  Culinary: "bg-amber-500",
  Event: "bg-rose-500",
  Sponsored: "bg-violet-500",
  Culture: "bg-fuchsia-500",
  Destination: "bg-teal-500",
  Lifestyle: "bg-lime-600",
  News: "bg-slate-500",
  "Untold Story": "bg-indigo-500",
};
const categoryAccent = (category: string) => CATEGORY_ACCENT[category] ?? "bg-emerald-500";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const reelYear = (reel: ReelItem) => reel.publishedAt.slice(0, 4);
/**
 * The stored timestamp already carries +08:00, so the date written in the
 * string is the Gorontalo date. Slicing it beats building a Date, which the
 * server and the browser would render in two different zones and mismatch on
 * hydration.
 */
function reelDate(reel: ReelItem) {
  const [year, month, day] = reel.publishedAt.slice(0, 10).split("-");
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}
const reelPeriod = (reel: ReelItem) => reel.publishedAt.slice(0, 7);

function matchesPeriod(reel: ReelItem, period: PeriodFilter) {
  if (period === "all") return true;
  return period.length === 4 ? reelYear(reel) === period : reelPeriod(reel) === period;
}

function orderedCategories(reels: ReelItem[]) {
  const canonical: readonly string[] = DEFAULT_REEL_CATEGORIES;
  const leftovers = [...new Set(reels.map((item) => item.category))]
    .filter((item) => !canonical.includes(item))
    .sort();
  return [...canonical, ...leftovers];
}

function PlayBadge({ small }: { small?: boolean }) {
  return (
    <span className={`grid place-items-center rounded-full border border-white/50 bg-black/35 text-white backdrop-blur-md transition-transform group-hover:scale-105 ${small ? "h-9 w-9" : "h-12 w-12"}`}>
      <svg className={small ? "ml-0.5 h-4 w-4" : "ml-0.5 h-5 w-5"} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8 5.14v13.72c0 .78.85 1.26 1.52.86l10.8-6.86a1 1 0 0 0 0-1.72L9.52 4.28A1 1 0 0 0 8 5.14Z" />
      </svg>
    </span>
  );
}

/* ------------------------------- the card ------------------------------- */

function Poster({ reel, wide }: { reel: ReelItem; wide?: boolean }) {
  return (
    <span className={`relative block w-full overflow-hidden rounded-lg bg-neutral-900 ring-1 ring-black/10 dark:ring-white/10 ${wide ? "aspect-video" : "aspect-[9/16]"}`}>
      {reel.thumbnail ? (
        <Image
          src={reel.thumbnail}
          alt=""
          fill
          sizes={wide ? "(max-width: 639px) 78vw, 420px" : "(max-width: 639px) 42vw, 220px"}
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        <span className={`absolute inset-0 ${categoryAccent(reel.category)} opacity-90`} />
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
      <span className="absolute inset-0 grid place-items-center opacity-0 transition group-hover:opacity-100">
        <PlayBadge small={!wide} />
      </span>
      <span className="absolute inset-x-0 bottom-0 p-2.5">
        <span className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${categoryAccent(reel.category)}`} />
          <span className="truncate text-[9px] font-bold uppercase tracking-[.14em] text-white/90">{reel.category}</span>
        </span>
        <span className="mt-0.5 block truncate text-[11px] font-semibold text-white">@{reel.username}</span>
      </span>
    </span>
  );
}

function ReelCard({ reel, wide, rank }: { reel: ReelItem; wide?: boolean; rank?: number }) {
  return (
    <a
      href={reel.permalink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open the ${reel.category} Reel by @${reel.username} on Instagram`}
      className={`group block shrink-0 snap-start focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c400] ${
        rank ? "w-[62vw] sm:w-[300px]" : wide ? "w-[78vw] sm:w-[420px]" : "w-[42vw] sm:w-[200px]"
      }`}
    >
      {rank ? (
        // The rank is the point of the top shelf, so it sits beside the poster
        // at a size you read before the picture.
        <span className="flex items-end gap-1">
          <span
            aria-hidden="true"
            className="font-heading -mb-3 shrink-0 select-none text-[76px] font-bold leading-[0.72] text-neutral-300 dark:text-zinc-700 sm:text-[96px]"
          >
            {rank}
          </span>
          <span className="min-w-0 flex-1"><Poster reel={reel} /></span>
        </span>
      ) : (
        <Poster reel={reel} wide={wide} />
      )}
      <span className="mt-2 block truncate text-xs text-neutral-600 dark:text-neutral-300">{reel.description}</span>
      <span className="mt-0.5 block text-[11px] text-neutral-400">{reelDate(reel)}</span>
    </a>
  );
}

/* ------------------------------- the shelf ------------------------------ */

function Shelf({ title, reels, wide, ranked, onViewAll }: {
  title: string;
  reels: ReelItem[];
  wide?: boolean;
  ranked?: boolean;
  onViewAll?: () => void;
}) {
  const rail = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const readEdges = useCallback(() => {
    const node = rail.current;
    if (!node) return;
    setAtStart(node.scrollLeft <= 2);
    setAtEnd(node.scrollLeft + node.clientWidth >= node.scrollWidth - 2);
  }, []);

  const nudge = (direction: -1 | 1) => {
    const node = rail.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.round(node.clientWidth * 0.85), behavior: "smooth" });
  };

  if (reels.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
      <SectionHeading
        action={
          <span className="flex items-center gap-2">
            {onViewAll && (
              <button type="button" onClick={onViewAll} className="text-sm font-semibold text-[#1b4dd8] hover:underline dark:text-sky-400">
                View all ›
              </button>
            )}
            <span className="hidden gap-1 sm:flex">
              <RailArrow direction="prev" disabled={atStart} onClick={() => nudge(-1)} />
              <RailArrow direction="next" disabled={atEnd} onClick={() => nudge(1)} />
            </span>
          </span>
        }
      >
        {title}
      </SectionHeading>

      <div
        ref={rail}
        onScroll={readEdges}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:gap-4 sm:scroll-pl-0 sm:px-0"
      >
        {reels.map((reel, index) => (
          <ReelCard key={reel.id} reel={reel} wide={wide} rank={ranked ? index + 1 : undefined} />
        ))}
      </div>
    </section>
  );
}

function RailArrow({ direction, disabled, onClick }: { direction: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Scroll left" : "Scroll right"}
      className="grid h-9 w-9 place-items-center rounded-full border border-[#d7d1c6] text-[#302f2c] transition hover:border-[#302f2c] disabled:cursor-not-allowed disabled:opacity-35 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-amber-300"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d={direction === "prev" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}

/* ------------------------------- filters -------------------------------- */

function FilterSelect({ name, label, value, onChange, children, active = false }: {
  /** Stable field name for the accessible label; the visible text changes. */
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <label className={`relative inline-flex h-9 max-w-[46vw] items-center rounded-full border px-3.5 text-[10px] font-bold uppercase tracking-[.08em] shadow-sm sm:max-w-none ${active ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black" : "border-black/10 bg-white/80 text-neutral-700 dark:border-white/15 dark:bg-neutral-900 dark:text-neutral-200"}`}>
      <span className="truncate">{label}</span>
      <svg className="ml-1.5 h-3 w-3 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
      </svg>
      <select
        aria-label={`Filter ${name}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        {children}
      </select>
    </label>
  );
}

/* --------------------------------- page --------------------------------- */

export default function ReelsFeed({ reels, initialCategory = "All", initialPeriod = "all" }: {
  reels: ReelItem[];
  initialCategory?: CategoryFilter;
  initialPeriod?: PeriodFilter;
}) {
  const [category, setCategory] = useState<CategoryFilter>(initialCategory);
  const [period, setPeriod] = useState<PeriodFilter>(initialPeriod);

  const categories = useMemo(() => orderedCategories(reels), [reels]);
  const years = useMemo(
    () => [...new Set(reels.map(reelYear))].sort((a, b) => b.localeCompare(a)),
    [reels],
  );

  const inPeriod = useMemo(() => reels.filter((reel) => matchesPeriod(reel, period)), [reels, period]);
  const filtered = useMemo(
    () => inPeriod.filter((reel) => category === "All" || reel.category === category),
    [inPeriod, category],
  );

  // The top shelf is whatever has been ticked Featured. With nothing ticked it
  // falls back to the most-watched, and says so — an OTT front page without a
  // top shelf reads as broken, but the label should not claim an editor chose
  // these when the view count did.
  const picked = useMemo(() => inPeriod.filter((reel) => reel.featured), [inPeriod]);
  const topShelf = useMemo(() => (
    picked.length > 0
      ? picked.slice(0, FEATURED_SIZE)
      : [...inPeriod].sort((a, b) => b.views - a.views).slice(0, FEATURED_SIZE)
  ), [picked, inPeriod]);
  const topShelfTitle = picked.length > 0 ? "Featured" : "Most watched";
  const landscape = useMemo(() => inPeriod.filter((reel) => reel.orientation === "landscape"), [inPeriod]);

  // The hero is built from the archive's own covers rather than a stock photo.
  // A phone-shaped cover stretched across a 32:15 frame would be a blurred
  // sliver, so the wide layout tiles five of them instead — each shown at
  // close to its own ratio, and downscaled rather than blown up.
  const heroReels = useMemo(
    () => [...inPeriod].filter((reel) => reel.thumbnail).sort((a, b) => b.views - a.views).slice(0, 5),
    [inPeriod],
  );

  function updateUrl(nextCategory: CategoryFilter, nextPeriod: PeriodFilter) {
    const params = new URLSearchParams();
    if (nextCategory !== "All") params.set("kategori", nextCategory.toLowerCase());
    if (nextPeriod !== "all") params.set("periode", nextPeriod);
    window.history.replaceState(null, "", params.size ? `/reels?${params}` : "/reels");
  }
  const selectCategory = (next: CategoryFilter) => { setCategory(next); updateUrl(next, period); };
  const selectPeriod = (next: PeriodFilter) => { setPeriod(next); updateUrl(category, next); };

  // Picking a category swaps every shelf for one grid, and the "View all" that
  // did it is usually far down the page — leaving you dropped into the middle
  // of the new view. Scroll back to the filter bar so it opens at the first
  // item. This waits for the paint: the shorter page makes the browser clamp
  // the old scroll position, and that clamp cancels an animation started any
  // earlier (a handler call, or even two rAFs, both get eaten).
  const shelvesTop = useRef<HTMLElement>(null);
  const settled = useRef(false);
  useEffect(() => {
    if (!settled.current) { settled.current = true; return; }
    shelvesTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [category, period]);

  const browsing = category === "All";

  return (
    <div className="bg-[#fafafa] pb-10 text-neutral-900 dark:bg-zinc-950 dark:text-white md:pb-12">
      {/* A — Hero, to the same measurements as the City Guide and Event heroes.
          No search panel here: a reel is found by browsing, not by typing. */}
      <section className="relative mx-auto max-w-[1280px] sm:px-6 sm:pt-8 lg:px-8">
        <div className="relative h-[calc(100svh-3.5rem)] w-full overflow-hidden bg-[#1b1a17] sm:aspect-[32/15] sm:h-auto">
          {heroReels[0]?.thumbnail && (
            <Image
              src={heroReels[0].thumbnail}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover sm:hidden"
            />
          )}
          <div aria-hidden="true" className="absolute inset-0 hidden sm:grid sm:grid-cols-5">
            {heroReels.map((reel) => (
              <span key={reel.id} className="relative block h-full overflow-hidden">
                {reel.thumbnail && (
                  <Image src={reel.thumbnail} alt="" fill priority sizes="(min-width: 1280px) 250px, 20vw" className="object-cover" />
                )}
              </span>
            ))}
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/40 to-black/70" />

          <div className="relative mx-auto flex h-full max-w-[1280px] flex-col items-center justify-center px-4 text-center text-white sm:px-6 lg:px-8">
            <h1 className="font-heading max-w-3xl text-[34px] leading-[1.08] sm:text-[52px] lg:text-[60px]">
              Press play
              <br />
              on Gorontalo
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              Reels from across the province. Pick a shelf and keep scrolling.
            </p>
            <a
              href="#shelves"
              className="mt-7 inline-flex min-h-11 items-center rounded-md bg-white px-7 text-sm font-bold text-[#302f2c] transition hover:bg-amber-300"
            >
              Start watching
            </a>
          </div>
        </div>
      </section>

      {/* B — Filters */}
      <section ref={shelvesTop} id="shelves" className="mx-auto max-w-[1280px] scroll-mt-16 px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <FilterSelect
            name="category"
            label={category === "All" ? "Category" : category}
            value={category}
            active={category !== "All"}
            onChange={(value) => selectCategory(value as CategoryFilter)}
          >
            <option value="All">All categories</option>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </FilterSelect>
          <FilterSelect
            name="year"
            label={period === "all" ? "Year" : period}
            value={period}
            active={period !== "all"}
            onChange={selectPeriod}
          >
            <option value="all">All years</option>
            {years.map((year) => <option key={year} value={year}>{year}</option>)}
          </FilterSelect>
          {!browsing && (
            <button type="button" onClick={() => selectCategory("All")} className="text-xs text-neutral-500 underline-offset-2 hover:underline">
              Back to all shelves
            </button>
          )}
        </div>
      </section>

      {browsing ? (
        <>
          <Shelf title={topShelfTitle} reels={topShelf} ranked />
          <Shelf title="Widescreen" reels={landscape.slice(0, SHELF_SIZE)} wide />
          {categories.map((name) => {
            const shelf = inPeriod.filter((reel) => reel.category === name);
            return (
              <Shelf
                key={name}
                title={name}
                reels={shelf.slice(0, SHELF_SIZE)}
                onViewAll={shelf.length > SHELF_SIZE ? () => selectCategory(name) : undefined}
              />
            );
          })}
        </>
      ) : (
        // One category, everything in it, as a grid rather than a shelf.
        <section className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
          <SectionHeading>{`${category} · ${filtered.length}`}</SectionHeading>
          {filtered.length === 0 ? (
            <p className="rounded-xl border border-dashed border-neutral-300 px-6 py-16 text-center text-sm text-neutral-500 dark:border-zinc-700">
              No Reels here yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4 lg:grid-cols-6">
              {filtered.map((reel) => (
                <a
                  key={reel.id}
                  href={reel.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open the ${reel.category} Reel by @${reel.username} on Instagram`}
                  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c400]"
                >
                  <Poster reel={reel} wide={reel.orientation === "landscape"} />
                  <span className="mt-2 block truncate text-xs text-neutral-600 dark:text-neutral-300">{reel.description}</span>
                  <span className="mt-0.5 block text-[11px] text-neutral-400">{reelDate(reel)}</span>
                </a>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
