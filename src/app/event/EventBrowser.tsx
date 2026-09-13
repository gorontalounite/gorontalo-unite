"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import CategoryIcon from "./CategoryIcon";
import { EVENT_CATEGORIES, eventDay, rupiah, type EventItem } from "./data";

const GRID_STEP = 8;
/** Each curated section shows six, then offers the rest. */
const SECTION_SIZE = 6;

function Poster({ event, className = "" }: { event: EventItem; className?: string }) {
  const icon = EVENT_CATEGORIES.find((item) => item.label === event.category)?.icon ?? "festival";
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#f4e2c2] via-[#efd3ad] to-[#e3c9a8] ${className}`}>
      {event.imageUrl ? (
        <Image src={event.imageUrl} alt={event.title} fill unoptimized sizes="(min-width: 1024px) 300px, 45vw" className="object-cover" />
      ) : (
        <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-[#a08a5c]">
          <CategoryIcon name={icon} className="h-9 w-9" />
        </span>
      )}
      {event.isSample && (
        <span className="absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
          Contoh
        </span>
      )}
    </div>
  );
}

function priceLabel(event: EventItem) {
  if (event.priceFrom === null) return "Cek harga";
  return event.priceFrom === 0 ? "Gratis" : rupiah(event.priceFrom);
}

const ViewAll = ({ total, expanded, onToggle }: { total: number; expanded: boolean; onToggle: () => void }) => (
  <button
    type="button"
    onClick={onToggle}
    className="shrink-0 text-sm font-semibold text-[#1b4dd8] hover:underline dark:text-sky-400"
  >
    {expanded ? "Tampilkan lebih sedikit" : `View all (${total}) \u203a`}
  </button>
);

/** The wide card used by the "Event Seru Untukmu" rail. */
function RailCard({ event }: { event: EventItem }) {
  return (
    <Link href={`/event/${event.slug}`} className="group block h-full min-w-0">
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-[#e7e2d8] bg-white transition hover:shadow-[0_18px_36px_-24px_rgba(0,0,0,.45)] dark:border-zinc-800 dark:bg-zinc-900">
        <Poster event={event} className="aspect-[4/3]" />
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-heading text-[15px] font-bold leading-snug transition group-hover:text-[#9b7513] sm:text-base">
            {event.title}
          </h3>
          {/* Two fixed lines, so the rule below lands on one baseline across a row. */}
          <p className="mt-1.5 line-clamp-2 min-h-10 text-xs leading-relaxed text-[#78716c] dark:text-zinc-400">
            {event.organizer ? `Oleh ${event.organizer}` : eventDay(event.startsAt)}
          </p>
          <div className="mt-3 flex items-center gap-3 border-t border-[#f0ece4] pt-3 text-[11px] text-[#78716c] dark:border-zinc-800 dark:text-zinc-400">
            <span className="shrink-0">{event.city ?? "Gorontalo"}</span>
            <span aria-hidden="true" className="hidden h-1 w-1 shrink-0 rounded-full bg-[#d7d1c6] sm:block" />
            <span className="hidden min-w-0 truncate sm:block">{eventDay(event.startsAt)}</span>
          </div>
          <div className="mt-3">
            <p className="text-[11px] text-[#78716c] dark:text-zinc-400">Mulai dari</p>
            <p className="text-[15px] font-bold">{priceLabel(event)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

/** The bordered card used by the "Event Lainnya" grid. */
function GridCard({ event }: { event: EventItem }) {
  return (
    <Link
      href={`/event/${event.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-[#e7e2d8] bg-white transition hover:shadow-[0_18px_36px_-24px_rgba(0,0,0,.45)] dark:border-zinc-800 dark:bg-zinc-900"
    >
      <Poster event={event} className="aspect-[4/3]" />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-[15px] font-bold leading-snug transition group-hover:text-[#9b7513] sm:text-base">
          {event.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 min-h-10 text-xs leading-relaxed text-[#78716c] dark:text-zinc-400">
          {event.venue ?? event.city ?? "Gorontalo"}
        </p>
        <div className="mt-3 flex items-center gap-3 border-t border-[#f0ece4] pt-3 text-[11px] text-[#78716c] dark:border-zinc-800 dark:text-zinc-400">
          <span className="shrink-0">{event.category}</span>
          <span aria-hidden="true" className="hidden h-1 w-1 shrink-0 rounded-full bg-[#d7d1c6] sm:block" />
          <span className="hidden min-w-0 truncate sm:block">{eventDay(event.startsAt)}</span>
        </div>
        <div className="mt-3">
          {event.soldOut ? (
            <p className="text-[15px] font-bold text-[#78716c] dark:text-zinc-400">Terjual habis</p>
          ) : (
            <>
              <p className="text-[11px] text-[#78716c] dark:text-zinc-400">Mulai dari</p>
              <p className="text-[15px] font-bold">{priceLabel(event)}</p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function EventBrowser({ events, showingSamples, nowIso }: { events: EventItem[]; showingSamples: boolean; nowIso: string }) {
  const [query, setQuery] = useState("");
  const [showAllFeatured, setShowAllFeatured] = useState(false);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [category, setCategory] = useState<string | null>(null);
  const [city, setCity] = useState("");
  const [shown, setShown] = useState(GRID_STEP);

  const needle = query.trim().toLowerCase();
  const cities = useMemo(
    () => [...new Set(events.map((event) => event.city).filter((name): name is string => Boolean(name)))].sort(),
    [events],
  );
  const filtered = useMemo(() => events.filter((event) => {
    if (category && event.category !== category) return false;
    if (city && event.city !== city) return false;
    if (!needle) return true;
    return [event.title, event.organizer, event.venue, event.city, event.category]
      .filter(Boolean).join(" ").toLowerCase().includes(needle);
  }), [events, category, city, needle]);

  const filtering = Boolean(needle) || Boolean(category) || Boolean(city);

  // An event that runs today is still ahead of you, so the boundary is the
  // start of today rather than the exact moment the page was rendered.
  const startOfToday = useMemo(() => {
    const day = new Date(nowIso);
    day.setHours(0, 0, 0, 0);
    return day.getTime();
  }, [nowIso]);
  const hasFinished = (event: EventItem) =>
    new Date(event.endsAt ?? event.startsAt).getTime() < startOfToday;

  const upcoming = useMemo(
    () => filtered.filter((event) => !hasFinished(event))
      .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filtered, startOfToday],
  );
  const finished = useMemo(
    () => filtered.filter(hasFinished)
      .sort((a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filtered, startOfToday],
  );
  // Curated picks lead; the rest of what is ahead follows, without repeating them.
  const featured = upcoming.filter((event) => event.featured);
  const rest = upcoming.filter((event) => !event.featured);

  return (
    <div className="bg-[#fafafa] pb-10 text-neutral-900 dark:bg-zinc-950 dark:text-white md:pb-12">
      {showingSamples && (
        <p className="bg-amber-100 px-4 py-2.5 text-center text-[13px] text-amber-900 dark:bg-amber-500/15 dark:text-amber-200">
          Tampilan contoh. Belum ada event yang dipublikasikan, jadi acara, tanggal, dan harga di bawah ini bukan acara sungguhan.
        </p>
      )}

      {/* A — Hero, built to the same measurements as the City Guide hero: same
          heights, same overlay, same search panel riding the lower half. The
          gradient stands in until there is an event photograph to put here. */}
      <section className="relative mx-auto max-w-[1280px] sm:px-6 sm:pt-8 lg:px-8">
        <div className="relative h-[calc(100svh-3.5rem)] w-full overflow-hidden bg-[#1b1a17] sm:aspect-[32/15] sm:h-auto">
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#7b4bd8] via-[#c2417a] to-[#f0a020]" />
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.28),transparent_45%)]" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/65" />

          <div className="relative mx-auto flex h-full max-w-[1280px] flex-col items-center justify-center px-4 text-center text-white sm:px-6 lg:px-8">
            <h1 className="font-heading max-w-3xl text-[34px] leading-[1.08] sm:text-[52px] lg:text-[60px]">
              Semua acara Gorontalo,
              <br />
              satu halaman
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              {showingSamples
                ? "Cari berdasarkan area, kategori, atau nama acara."
                : `${events.length} acara untuk didatangi. Pilih area, atau cari yang Anda tuju.`}
            </p>
            <a
              href="#browse"
              className="mt-7 inline-flex min-h-11 items-center rounded-md bg-white px-7 text-sm font-bold text-[#302f2c] transition hover:bg-amber-300"
            >
              Lihat semua event
            </a>

            {/* Same panel as the City Guide: three axes and a solid button. The
                colour is set explicitly, or the fields inherit the hero's white
                type and vanish against their own white background. */}
            <form
              onSubmit={(submit) => {
                submit.preventDefault();
                document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-8 grid w-full max-w-3xl gap-px overflow-hidden rounded-lg border border-[#d7d1c6] bg-[#d7d1c6] text-left text-[#302f2c] shadow-[0_18px_40px_-24px_rgba(0,0,0,.6)] sm:max-w-4xl sm:grid-cols-[1.1fr_1fr_1.2fr_auto] dark:border-zinc-700 dark:bg-zinc-700 dark:text-zinc-100"
            >
              <label className="flex items-center gap-2 bg-white px-4 py-3 dark:bg-zinc-900">
                <span className="sr-only">Area</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 shrink-0 text-[#9b7513]">
                  <path d="M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <select
                  value={city}
                  onChange={(change) => { setCity(change.target.value); setShown(GRID_STEP); }}
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                >
                  <option value="">Semua area</option>
                  {cities.map((name) => <option key={name} value={name}>{name}</option>)}
                </select>
              </label>

              <label className="flex items-center gap-2 bg-white px-4 py-3 dark:bg-zinc-900">
                <span className="sr-only">Kategori</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 shrink-0 text-[#9b7513]">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 10h18" />
                </svg>
                <select
                  value={category ?? ""}
                  onChange={(change) => { setCategory(change.target.value || null); setShown(GRID_STEP); }}
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                >
                  <option value="">Semua kategori</option>
                  {EVENT_CATEGORIES.map((item) => <option key={item.label} value={item.label}>{item.label}</option>)}
                </select>
              </label>

              <label className="flex items-center gap-2 bg-white px-4 py-3 dark:bg-zinc-900">
                <span className="sr-only">Kata kunci</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 shrink-0 text-[#9b7513]">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
                <input
                  value={query}
                  onChange={(change) => { setQuery(change.target.value); setShown(GRID_STEP); }}
                  type="search"
                  placeholder="Nama event, artis, atau venue"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#a8a29e]"
                />
              </label>

              <button
                type="submit"
                className="min-h-12 bg-[#302f2c] px-8 text-sm font-bold uppercase tracking-[.1em] text-white transition hover:bg-[#9b7513] dark:bg-amber-300 dark:text-zinc-950 dark:hover:bg-amber-200"
              >
                Cari
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section id="browse" className="mx-auto max-w-[1280px] scroll-mt-16 px-4 pt-8 sm:px-6 lg:px-8">
        {/* Eleven tiles on one row from lg up, and a single scrolling row below
            it — each tile the same width so the labels line up. */}
        <div className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto pb-1 lg:grid lg:grid-cols-11 lg:gap-2 lg:overflow-visible">
          {EVENT_CATEGORIES.map((item) => {
            const active = category === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => { setCategory(active ? null : item.label); setShown(GRID_STEP); }}
                aria-pressed={active}
                className={`flex w-[84px] shrink-0 flex-col items-center gap-2 rounded-xl px-1 py-3 text-center transition lg:w-auto ${
                  active
                    ? "bg-white shadow-sm ring-1 ring-neutral-200 dark:bg-zinc-900 dark:ring-zinc-700"
                    : "hover:bg-white/70 dark:hover:bg-zinc-900/60"
                }`}
              >
                <span className={`grid h-11 w-11 place-items-center rounded-full ring-1 transition ${
                  active
                    ? "bg-[#302f2c] text-white ring-[#302f2c] dark:bg-amber-300 dark:text-zinc-950 dark:ring-amber-300"
                    : "bg-white text-[#302f2c] ring-neutral-200/70 dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-700"
                }`}>
                  <CategoryIcon name={item.icon} className="h-[22px] w-[22px]" />
                </span>
                <span className="text-[10px] leading-tight text-neutral-600 dark:text-neutral-300">{item.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {filtering ? (
        <section className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h2 className="font-heading flex items-center gap-2 text-[20px] font-bold tracking-[-.025em] sm:text-[24px]">
              <span className="text-[#f5c400]" aria-hidden="true">/</span>
              <span>{filtered.length} event{category ? ` · ${category}` : ""}{needle ? ` · “${query.trim()}”` : ""}</span>
              <span className="text-[#f5c400]" aria-hidden="true">/</span>
            </h2>
            <button
              type="button"
              onClick={() => { setQuery(""); setCategory(null); setCity(""); }}
              className="text-xs text-neutral-500 underline-offset-2 hover:underline"
            >
              Bersihkan filter
            </button>
          </div>
          {filtered.length === 0 ? (
            <p className="rounded-xl border border-dashed border-neutral-300 px-6 py-16 text-center text-sm text-neutral-500 dark:border-zinc-700">
              Tidak ada event yang cocok.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
              {filtered.map((event) => <GridCard key={event.id} event={event} />)}
            </div>
          )}
        </section>
      ) : (
        <>
          {featured.length > 0 && (
            <section className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
              <SectionHeading
                action={featured.length > SECTION_SIZE
                  ? <ViewAll total={featured.length} expanded={showAllFeatured} onToggle={() => setShowAllFeatured((value) => !value)} />
                  : null}
              >
                Event Seru Untukmu
              </SectionHeading>
              <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
                {(showAllFeatured ? featured : featured.slice(0, SECTION_SIZE))
                  .map((event) => <RailCard key={event.id} event={event} />)}
              </div>
            </section>
          )}

          {rest.length > 0 && (
            <section className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
              <SectionHeading
                action={rest.length > SECTION_SIZE
                  ? <ViewAll total={rest.length} expanded={showAllUpcoming} onToggle={() => setShowAllUpcoming((value) => !value)} />
                  : null}
              >
                Event akan datang
              </SectionHeading>
              <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
                {(showAllUpcoming ? rest : rest.slice(0, SECTION_SIZE))
                  .map((event) => <RailCard key={event.id} event={event} />)}
              </div>
            </section>
          )}

          <section className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
            <Link
              href="/city-guide"
              className="flex min-h-[120px] items-center justify-between gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-[#1b4dd8] to-[#2a7bf0] px-6 py-6 text-white sm:min-h-[170px] sm:px-10"
            >
              <span>
                <span className="font-heading block text-lg font-bold sm:text-2xl">Rencanakan sekalian perjalanannya</span>
                <span className="mt-1 block text-sm text-white/80">Tempat makan, penginapan, dan hal-hal yang bisa dilihat di enam wilayah Gorontalo.</span>
              </span>
              <span aria-hidden="true" className="shrink-0 text-2xl">→</span>
            </Link>
          </section>

          {finished.length > 0 && (
            <section className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
              <SectionHeading
                className="mb-2"
                action={finished.length > shown
                  ? <button type="button" onClick={() => setShown((value) => value + GRID_STEP)} className="shrink-0 text-sm font-semibold text-[#1b4dd8] hover:underline dark:text-sky-400">Lebih Banyak Event ›</button>
                  : null}
              >
                Event Lainnya
              </SectionHeading>
              <p className="mb-4 text-xs text-neutral-500 dark:text-neutral-400">Acara yang sudah selesai.</p>
              <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
                {finished.slice(0, shown).map((event) => <GridCard key={event.id} event={event} />)}
              </div>
            </section>
          )}

          {filtered.length === 0 && (
            <section className="mx-auto max-w-[1280px] px-4 pt-10 sm:px-6 lg:px-8">
              <p className="rounded-xl border border-dashed border-neutral-300 px-6 py-20 text-center text-sm text-neutral-500 dark:border-zinc-700">
                Belum ada event mendatang. Agenda Gorontalo akan muncul di sini.
              </p>
            </section>
          )}
        </>
      )}
    </div>
  );
}
