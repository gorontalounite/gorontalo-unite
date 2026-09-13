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
    <Link href={`/event/${event.slug}`} className="group block h-full min-w-0">
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-[#e7e2d8] bg-white transition hover:shadow-[0_18px_36px_-24px_rgba(0,0,0,.45)] dark:border-zinc-800 dark:bg-zinc-900">
        <Poster event={event} className="aspect-[4/3]" />
        <div className="flex flex-1 flex-col p-3">
          <p className="truncate text-[11px] text-neutral-500 dark:text-neutral-400">{event.city ?? "Gorontalo"}</p>
          <h3 className="font-heading mt-1 line-clamp-2 text-[15px] font-semibold leading-snug group-hover:underline">{event.title}</h3>
          {event.organizer && <p className="mt-1 truncate text-xs text-neutral-500 dark:text-neutral-400">Oleh {event.organizer}</p>}
          <div className="mt-auto border-t border-[#f0ece4] pt-3 dark:border-zinc-800">
            <p className="text-[11px] text-neutral-400">Mulai dari</p>
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
      <div className="flex flex-1 flex-col p-3">
        <p className="truncate text-[11px] text-neutral-500 dark:text-neutral-400">{event.category}</p>
        <h3 className="font-heading mt-1 line-clamp-2 text-[15px] font-semibold leading-snug group-hover:underline">{event.title}</h3>
        <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">{eventDay(event.startsAt)}</p>
        <p className="truncate text-[11px] text-neutral-500 dark:text-neutral-400">{event.venue ?? event.city ?? "Gorontalo"}</p>
        <div className="mt-auto border-t border-[#f0ece4] pt-3 dark:border-zinc-800">
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
  const featured = filtered.filter((event) => event.featured).slice(0, 4);
  const rest = filtered.filter((event) => !featured.includes(event));

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
      <section className="relative">
        <div className="relative h-[calc(100svh-3.5rem)] w-full overflow-hidden bg-[#1b1a17] sm:h-[70vh] sm:max-h-[620px]">
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
      <section id="browse" className="mx-auto max-w-7xl scroll-mt-16 px-4 pt-8 sm:px-6">
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
    </div>
  );
}
