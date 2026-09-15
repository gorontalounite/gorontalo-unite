"use client";

import Image from "next/image";
import { useCallback, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  ACCOUNT_NAMED_FROM, CHOICES_SHELF, FEATURED_SHELF, OTHER_ACCOUNTS, OTHER_ACCOUNTS_LABEL,
  RECENT_SHELF, reelSlug, shelfLabel, type ReelItem,
} from "./data";

/* ---------------------------------------------------------------------------
 * The Reels page reads as a video service: a hero, then shelves you push
 * sideways.
 *
 * It no longer holds the archive. The server sends the rows for the view being
 * looked at, and every chip is a link — which is why the filtering that used
 * to live here is gone. What is left is how a reel looks and how a rail moves.
 * ------------------------------------------------------------------------ */

const FEATURED = FEATURED_SHELF;
const CHOICES = CHOICES_SHELF;
const RECENT = RECENT_SHELF;
/** The publication's own account, pinned to the top of the Account filter. */
const HOUSE_ACCOUNT = "gorontalo.unite";

export interface ShelfData {
  key: string;
  reels: ReelItem[];
  /** There is more behind this shelf than the six on it. */
  more: boolean;
  shape?: Shape;
}

export interface Facets {
  total: number;
  years: string[];
  accounts: Array<{ username: string; count: number }>;
}

const CATEGORY_ACCENT: Record<string, string> = {
  Tourism: "bg-sky-500",
  Culinary: "bg-amber-500",
  Event: "bg-rose-500",
  Sponsored: "bg-violet-500",
  Culture: "bg-fuchsia-500",
  "Choices for You": "bg-teal-500",
  Lifestyle: "bg-lime-600",
  News: "bg-slate-500",
  "Untold Story": "bg-indigo-500",
};
const categoryAccent = (category: string) => CATEGORY_ACCENT[category] ?? "bg-emerald-500";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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

/**
 * `mixed` is 4:5 — the frame a shelf uses when it holds both shapes. Neither
 * 9:16 nor 16:9 can show the other without gutting it, and 4:5 is the shape
 * that costs each of them the least.
 */
type Shape = "tall" | "wide" | "mixed";
const SHAPE_CLASS: Record<Shape, string> = {
  tall: "aspect-[9/16]",
  wide: "aspect-video",
  mixed: "aspect-[4/5]",
};
const GRID_COLS: Record<Shape, string> = {
  tall: "grid-cols-2 sm:grid-cols-4 lg:grid-cols-6",
  wide: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  mixed: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
};
const SHAPE_SIZES: Record<Shape, string> = {
  tall: "(max-width: 639px) 42vw, 220px",
  wide: "(max-width: 639px) 78vw, 420px",
  mixed: "(max-width: 639px) 52vw, 260px",
};

/** One frame for a whole row or grid, chosen by what is actually in it. */
function shapeOf(reels: ReelItem[]): Shape {
  if (reels.length === 0) return "tall";
  if (reels.every((reel) => reel.orientation === "landscape")) return "wide";
  return reels.some((reel) => reel.orientation === "landscape") ? "mixed" : "tall";
}

function Poster({ reel, shape = "tall" }: { reel: ReelItem; shape?: Shape }) {
  return (
    <span className={`relative block w-full overflow-hidden rounded-lg bg-neutral-900 ring-1 ring-black/10 dark:ring-white/10 ${SHAPE_CLASS[shape]}`}>
      {reel.thumbnail ? (
        <Image
          src={reel.thumbnail}
          alt=""
          fill
          sizes={SHAPE_SIZES[shape]}
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        <span className={`absolute inset-0 ${categoryAccent(reel.category)} opacity-90`} />
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
      <span className="absolute inset-0 grid place-items-center opacity-0 transition group-hover:opacity-100">
        <PlayBadge small={shape !== "wide"} />
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

function ReelCard({ reel, shape = "tall" }: { reel: ReelItem; shape?: Shape }) {
  return (
    <a
      href={reel.permalink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open the ${reel.category} Reel by @${reel.username} on Instagram`}
      className={`group block shrink-0 snap-start focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c400] ${
        shape === "wide" ? "w-[78vw] sm:w-[420px]"
        : shape === "mixed" ? "w-[52vw] sm:w-[260px]"
        : "w-[42vw] sm:w-[200px]"
      }`}
    >
      <Poster reel={reel} shape={shape} />
      <span className="mt-2 block truncate text-xs text-neutral-600 dark:text-neutral-300">{reel.description}</span>
      <span className="mt-0.5 block text-[11px] text-neutral-400">{reelDate(reel)}</span>
    </a>
  );
}

/* ------------------------------- the shelf ------------------------------ */

function Shelf({ title, reels, shape, onViewAll }: {
  title: string;
  reels: ReelItem[];
  shape?: Shape;
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
        {reels.map((reel) => (
          <ReelCard key={reel.id} reel={reel} shape={shape ?? shapeOf(reels)} />
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
    <label className={`relative inline-flex h-9 max-w-[46vw] items-center rounded-lg border px-3.5 text-[10px] font-bold uppercase tracking-[.08em] shadow-sm sm:max-w-none ${active ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black" : "border-black/10 bg-white/80 text-neutral-700 dark:border-white/15 dark:bg-neutral-900 dark:text-neutral-200"}`}>
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

export default function ReelsFeed({
  shelves, hero, facets, view, viewReels, viewCount, page, pageSize, period, account,
}: {
  shelves: ShelfData[];
  hero: ReelItem[];
  facets: Facets;
  /** The shelf being looked at on its own, or null while browsing them all. */
  view: string | null;
  viewReels: ReelItem[];
  viewCount: number;
  page: number;
  pageSize: number;
  period: string;
  account: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  /**
   * Every chip is a link. The filters used to be React state over the whole
   * archive; now the server decides what a view contains, so changing one has
   * to ask it. The hash lands on the filter bar rather than the top of the
   * hero — you came back to pick something else, not to read the headline.
   */
  const go = (next: { view?: string | null; period?: string; account?: string; page?: number }) => {
    const params = new URLSearchParams();
    const wantView = next.view === undefined ? view : next.view;
    const wantPeriod = next.period ?? period;
    const wantAccount = next.account ?? account;
    const wantPage = next.page ?? 1;
    if (wantView) params.set("kategori", reelSlug(wantView));
    if (wantPeriod !== "all") params.set("periode", wantPeriod);
    if (wantAccount !== "all") params.set("akun", wantAccount);
    if (wantPage > 1) params.set("hal", String(wantPage));
    const url = params.size ? `/reels?${params}#shelves` : "/reels";
    startTransition(() => router.push(url));
  };

  // Named accounts lead with the house account, then alphabetical: there is no
  // ranking to apply to contributors, and alphabetical is an order a reader can
  // predict. Everyone below the threshold is reachable as one entry.
  const named = facets.accounts.filter((row) => row.count >= ACCOUNT_NAMED_FROM);
  const namedAccounts = [
    ...named.filter((row) => row.username === HOUSE_ACCOUNT),
    ...named.filter((row) => row.username !== HOUSE_ACCOUNT).sort((a, b) => a.username.localeCompare(b.username)),
  ];
  const otherCount = facets.accounts.filter((row) => row.count < ACCOUNT_NAMED_FROM).length;

  const accountLabel =
    account === "all" ? "Account"
    : account === OTHER_ACCOUNTS ? OTHER_ACCOUNTS_LABEL
    : `@${account}`;

  const gridShape = shapeOf(viewReels);
  const lastPage = Math.max(1, Math.ceil(viewCount / pageSize));
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, viewCount);

  return (
    <div className={`bg-[#fafafa] pb-10 text-neutral-900 transition-opacity dark:bg-zinc-950 dark:text-white md:pb-12 ${pending ? "opacity-60" : ""}`}>
      {/* A — Hero, to the same measurements as the City Guide and Event heroes.
          No search panel here: a reel is found by browsing, not by typing. */}
      {!view && (
        <section className="relative mx-auto max-w-[1280px] sm:px-6 sm:pt-8 lg:px-8">
          <div className="relative h-[calc(100svh-3.5rem)] w-full overflow-hidden bg-[#1b1a17] sm:aspect-[32/15] sm:h-auto">
            {hero[0]?.thumbnail && (
              <Image src={hero[0].thumbnail} alt="" fill priority sizes="100vw" className="object-cover sm:hidden" />
            )}
            <div aria-hidden="true" className="absolute inset-0 hidden sm:grid sm:grid-cols-5">
              {hero.map((reel) => (
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
      )}

      {/* B — Filters */}
      <section id="shelves" className="mx-auto max-w-[1280px] scroll-mt-16 px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <FilterSelect
            name="category"
            label={view ? shelfLabel(view) : "Category"}
            value={view ?? "All"}
            active={Boolean(view)}
            onChange={(value) => go({ view: value === "All" ? null : value })}
          >
            <option value="All">All categories</option>
            <option value={FEATURED}>{FEATURED}</option>
            <option value={CHOICES}>{CHOICES}</option>
            <option value={RECENT}>{RECENT}</option>
            {shelves
              .map((entry) => entry.key)
              .filter((key) => key !== FEATURED && key !== CHOICES && key !== RECENT)
              .map((key) => <option key={key} value={key}>{shelfLabel(key)}</option>)}
          </FilterSelect>
          <FilterSelect
            name="year"
            label={period === "all" ? "Year" : period}
            value={period}
            active={period !== "all"}
            onChange={(value) => go({ period: value })}
          >
            <option value="all">All years</option>
            {facets.years.map((year) => <option key={year} value={year}>{year}</option>)}
          </FilterSelect>
          <FilterSelect
            name="account"
            label={accountLabel}
            value={account}
            active={account !== "all"}
            onChange={(value) => go({ account: value })}
          >
            <option value="all">All accounts</option>
            {namedAccounts.map((row) => (
              <option key={row.username} value={row.username}>@{row.username} ({row.count})</option>
            ))}
            {otherCount > 0 && (
              <option value={OTHER_ACCOUNTS}>{OTHER_ACCOUNTS_LABEL} ({otherCount})</option>
            )}
          </FilterSelect>
        </div>
      </section>

      {view ? (
        // One shelf, one page of it, as a grid rather than a rail.
        <section className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
          <SectionHeading
            leading={
              <button
                type="button"
                onClick={() => go({ view: null })}
                aria-label="Back to all shelves"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#d7d1c6] text-[#302f2c] transition hover:border-[#302f2c] dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-amber-300"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            }
          >
            {`${shelfLabel(view)} · ${viewCount}`}
          </SectionHeading>

          {viewReels.length === 0 ? (
            <p className="rounded-xl border border-dashed border-neutral-300 px-6 py-16 text-center text-sm text-neutral-500 dark:border-zinc-700">
              No Reels here yet.
            </p>
          ) : (
            <>
              <div className={`grid gap-x-5 gap-y-8 ${GRID_COLS[gridShape]}`}>
                {viewReels.map((reel) => (
                  <a
                    key={reel.id}
                    href={reel.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open the ${reel.category} Reel by @${reel.username} on Instagram`}
                    className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c400]"
                  >
                    <Poster reel={reel} shape={gridShape} />
                    <span className="mt-2 block truncate text-xs text-neutral-600 dark:text-neutral-300">{reel.description}</span>
                    <span className="mt-0.5 block text-[11px] text-neutral-400">{reelDate(reel)}</span>
                  </a>
                ))}
              </div>

              {lastPage > 1 && (
                <div className="mt-10 flex items-center justify-between gap-4">
                  <p className="text-xs text-neutral-500">{from}–{to} of {viewCount}</p>
                  <div className="flex items-center gap-2">
                    <RailArrow direction="prev" disabled={page <= 1} onClick={() => go({ page: page - 1 })} />
                    <span className="text-xs tabular-nums text-neutral-500">{page} / {lastPage}</span>
                    <RailArrow direction="next" disabled={page >= lastPage} onClick={() => go({ page: page + 1 })} />
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      ) : (
        shelves.map((entry) => (
          <Shelf
            key={entry.key}
            title={shelfLabel(entry.key)}
            reels={entry.reels}
            shape={entry.shape}
            onViewAll={entry.more ? () => go({ view: entry.key }) : undefined}
          />
        ))
      )}
    </div>
  );
}
