"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { EVENT_CATEGORIES, eventDay, rupiah, type EventItem } from "./data";

const GRID_STEP = 8;

function Poster({ event, className = "" }: { event: EventItem; className?: string }) {
  const icon = EVENT_CATEGORIES.find((item) => item.label === event.category)?.icon ?? "🎫";
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#f4e2c2] via-[#efd3ad] to-[#e3c9a8] ${className}`}>
      {event.imageUrl ? (
        <Image src={event.imageUrl} alt={event.title} fill unoptimized sizes="(min-width: 1024px) 300px, 45vw" className="object-cover" />
      ) : (
        <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-3xl opacity-70">{icon}</span>
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

/** The wide card used by the "Event Seru Untukmu" rail. */
function RailCard({ event }: { event: EventItem }) {
  return (
    <Link href={`/event/${event.slug}`} className="group block min-w-0">
      <Poster event={event} className="aspect-[4/3] rounded-xl" />
      <p className="mt-3 truncate text-[11px] text-neutral-500 dark:text-neutral-400">{event.city ?? "Gorontalo"}</p>
      <h3 className="font-heading mt-1 line-clamp-2 text-[15px] font-semibold leading-snug group-hover:underline">{event.title}</h3>
      {event.organizer && <p className="mt-1 truncate text-xs text-neutral-500 dark:text-neutral-400">Oleh {event.organizer}</p>}
      <p className="mt-3 text-[11px] text-neutral-400">Mulai dari</p>
      <p className="text-[15px] font-bold">{priceLabel(event)}</p>
    </Link>
  );
}

/** The bordered card used by the "Event Lainnya" grid. */
function GridCard({ event }: { event: EventItem }) {
  return (
    <Link
      href={`/event/${event.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:border-neutral-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <Poster event={event} className="aspect-[16/9]" />
      <div className="flex flex-1 flex-col p-3">
        <p className="truncate text-[11px] text-neutral-500 dark:text-neutral-400">{event.category}</p>
        <h3 className="font-heading mt-1 line-clamp-2 text-sm font-semibold leading-snug group-hover:underline">{event.title}</h3>
        <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">{eventDay(event.startsAt)}</p>
        <p className="truncate text-[11px] text-neutral-500 dark:text-neutral-400">{event.venue ?? event.city ?? "Gorontalo"}</p>
        <div className="mt-auto pt-3">
          {event.soldOut ? (
            <p className="text-sm font-semibold text-neutral-400">Terjual habis</p>
          ) : (
            <>
              <p className="text-sm font-bold text-[#c0392b] dark:text-red-400">{priceLabel(event)}</p>
              <p className="mt-0.5 text-[11px] text-emerald-600 dark:text-emerald-400">Tersedia sekarang</p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function EventBrowser({ events, showingSamples }: { events: EventItem[]; showingSamples: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [shown, setShown] = useState(GRID_STEP);

  const needle = query.trim().toLowerCase();
  const filtered = useMemo(() => events.filter((event) => {
    if (category && event.category !== category) return false;
    if (!needle) return true;
    return [event.title, event.organizer, event.venue, event.city, event.category]
      .filter(Boolean).join(" ").toLowerCase().includes(needle);
  }), [events, category, needle]);

  const filtering = Boolean(needle) || Boolean(category);
  const featured = filtered.filter((event) => event.featured).slice(0, 4);
  const rest = filtered.filter((event) => !featured.includes(event));

  return (
    <main className="min-h-screen bg-[#fafafa] pb-24 text-neutral-900 dark:bg-zinc-950 dark:text-white md:pb-12">
      {showingSamples && (
        <p className="bg-amber-100 px-4 py-2.5 text-center text-[13px] text-amber-900 dark:bg-amber-500/15 dark:text-amber-200">
          Tampilan contoh. Belum ada event yang dipublikasikan, jadi acara, tanggal, dan harga di bawah ini bukan acara sungguhan.
        </p>
      )}

      {/* Hero + search */}
      <section className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
        <div className="relative flex min-h-[220px] items-end overflow-hidden rounded-2xl bg-gradient-to-br from-[#7b4bd8] via-[#c2417a] to-[#f0a020] sm:min-h-[320px]">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.28),transparent_45%)]" />
          <div className="relative w-full p-4 sm:p-8">
            <label className="sr-only" htmlFor="event-search">Cari event</label>
            <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3.5 shadow-lg dark:bg-zinc-900">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5 shrink-0 text-neutral-400" aria-hidden="true">
                <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                id="event-search"
                value={query}
                onChange={(event) => { setQuery(event.target.value); setShown(GRID_STEP); }}
                placeholder="Cari event, artis, venue…"
                className="w-full bg-transparent text-[15px] outline-none placeholder:text-neutral-400"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} className="shrink-0 text-sm text-neutral-400 hover:text-neutral-600">✕</button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6">
        <div className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto pb-1">
          {EVENT_CATEGORIES.map((item) => {
            const active = category === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => { setCategory(active ? null : item.label); setShown(GRID_STEP); }}
                aria-pressed={active}
                className={`flex w-[86px] shrink-0 flex-col items-center gap-1.5 rounded-xl px-1 py-2 text-center transition ${
                  active ? "bg-white shadow-sm ring-1 ring-neutral-200 dark:bg-zinc-900 dark:ring-zinc-700" : "hover:bg-white/70 dark:hover:bg-zinc-900/60"
                }`}
              >
                <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-xl bg-white text-xl shadow-sm ring-1 ring-neutral-200/70 dark:bg-zinc-800 dark:ring-zinc-700">
                  {item.icon}
                </span>
                <span className="text-[10px] leading-tight text-neutral-600 dark:text-neutral-300">{item.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {filtering ? (
        <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h2 className="font-heading flex items-center gap-2 text-[20px] font-bold tracking-[-.025em] sm:text-[24px]">
              <span className="text-[#f5c400]" aria-hidden="true">/</span>
              <span>{filtered.length} event{category ? ` · ${category}` : ""}{needle ? ` · “${query.trim()}”` : ""}</span>
              <span className="text-[#f5c400]" aria-hidden="true">/</span>
            </h2>
            <button
              type="button"
              onClick={() => { setQuery(""); setCategory(null); }}
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
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {filtered.map((event) => <GridCard key={event.id} event={event} />)}
            </div>
          )}
        </section>
      ) : (
        <>
          {featured.length > 0 && (
            <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
              <SectionHeading>Event Seru Untukmu</SectionHeading>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {featured.map((event) => <RailCard key={event.id} event={event} />)}
              </div>
            </section>
          )}

          <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
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

          {rest.length > 0 && (
            <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="font-heading flex items-center gap-2 text-[20px] font-bold tracking-[-.025em] sm:text-[24px]">
                  <span className="text-[#f5c400]" aria-hidden="true">/</span>
                  <span>Event Lainnya</span>
                  <span className="text-[#f5c400]" aria-hidden="true">/</span>
                </h2>
                {rest.length > shown && (
                  <button type="button" onClick={() => setShown((value) => value + GRID_STEP)} className="text-sm font-semibold text-[#1b4dd8] hover:underline dark:text-sky-400">
                    Lebih Banyak Event ›
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {rest.slice(0, shown).map((event) => <GridCard key={event.id} event={event} />)}
              </div>
            </section>
          )}

          {filtered.length === 0 && (
            <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
              <p className="rounded-xl border border-dashed border-neutral-300 px-6 py-20 text-center text-sm text-neutral-500 dark:border-zinc-700">
                Belum ada event mendatang. Agenda Gorontalo akan muncul di sini.
              </p>
            </section>
          )}
        </>
      )}
    </main>
  );
}
