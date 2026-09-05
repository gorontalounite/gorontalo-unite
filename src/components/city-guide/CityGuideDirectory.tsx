"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export type CityGuidePlace = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string | null;
  category: string | null;
  location: string | null;
  address: string | null;
  opening_hours: string | null;
  featured: boolean;
};

export type CityGuideEvent = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string | null;
  category: string | null;
  venue: string | null;
  address: string | null;
  starts_at: string;
  ends_at: string | null;
  featured: boolean;
};

type DirectoryKind = "all" | "destination" | "event";

type DirectoryItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string | null;
  category: string;
  location: string;
  detail: string;
  featured: boolean;
  kind: Exclude<DirectoryKind, "all">;
};

const normalize = (value: string) => value.toLocaleLowerCase("id-ID").trim();

function eventDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Makassar",
  }).format(new Date(value));
}

export default function CityGuideDirectory({ places, events }: { places: CityGuidePlace[]; events: CityGuideEvent[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<DirectoryKind>("all");

  const items = useMemo<DirectoryItem[]>(() => [
    ...places.map((place) => ({
      id: place.id,
      title: place.name,
      slug: place.slug,
      description: place.description,
      imageUrl: place.image_url,
      category: place.category || "Destination",
      location: place.location || place.address || "Gorontalo",
      detail: place.opening_hours || "View visitor information",
      featured: place.featured,
      kind: "destination" as const,
    })),
    ...events.map((event) => ({
      id: event.id,
      title: event.title,
      slug: event.slug,
      description: event.description,
      imageUrl: event.image_url,
      category: event.category || "Event",
      location: event.venue || event.address || "Gorontalo",
      detail: eventDate(event.starts_at),
      featured: event.featured,
      kind: "event" as const,
    })),
  ].sort((a, b) => Number(b.featured) - Number(a.featured)), [events, places]);

  const results = useMemo(() => {
    const needle = normalize(query);
    return items.filter((item) => {
      const matchesKind = kind === "all" || item.kind === kind;
      const searchable = normalize([item.title, item.description, item.category, item.location].join(" "));
      return matchesKind && (!needle || searchable.includes(needle));
    });
  }, [items, kind, query]);

  return (
    <main className="min-h-screen bg-[#fcfbf8] pb-24 text-slate-950 dark:bg-zinc-950 dark:text-white">
      <header className="border-b border-stone-200 bg-[#f5f0e8] px-4 py-10 dark:border-zinc-800 dark:bg-zinc-900 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-bold uppercase tracking-[.24em] text-amber-700 dark:text-amber-300">Gorontalo Unite</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-[-.04em] sm:text-6xl">City Guide</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-zinc-300 sm:text-base">
            Discover destinations and upcoming events across Gorontalo.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto]">
            <label className="flex h-12 items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
              <SearchIcon />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search destinations or events…"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                aria-label="Search City Guide"
              />
            </label>
            <div className="grid grid-cols-3 gap-2" aria-label="Directory type">
              <FilterButton active={kind === "all"} onClick={() => setKind("all")}>All</FilterButton>
              <FilterButton active={kind === "destination"} onClick={() => setKind("destination")}>Destinations</FilterButton>
              <FilterButton active={kind === "event"} onClick={() => setKind("event")}>Events</FilterButton>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex items-end justify-between border-b border-stone-200 pb-5 dark:border-zinc-800">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-amber-700 dark:text-amber-300">Directory listing</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Explore Gorontalo</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400">{results.length} listings</p>
        </div>

        {results.length ? (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {results.map((item) => <DirectoryCard key={`${item.kind}-${item.id}`} item={item} />)}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-stone-300 bg-white px-5 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900">
            <h3 className="font-display text-xl font-bold">No listings found</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">Try another search or directory type.</p>
          </div>
        )}
      </section>
    </main>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-10 rounded-xl px-3 text-[10px] font-bold transition sm:text-xs ${active ? "bg-slate-950 text-white dark:bg-amber-300 dark:text-zinc-950" : "border border-stone-200 bg-white text-slate-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"}`}
    >
      {children}
    </button>
  );
}

function DirectoryCard({ item }: { item: DirectoryItem }) {
  const href = item.kind === "event" ? `/event/${item.slug}` : `/wisata/${item.slug}`;
  return (
    <Link href={href} className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-900 dark:ring-white/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-amber-200 via-orange-100 to-stone-200 dark:from-amber-800 dark:to-zinc-800">
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={item.title} fill unoptimized sizes="(max-width: 639px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
        ) : null}
        <span className={`absolute left-2 top-2 rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-[.08em] backdrop-blur ${item.kind === "event" ? "bg-orange-500/90 text-white" : "bg-white/90 text-slate-900"}`}>
          {item.kind === "event" ? "Event" : "Destination"}
        </span>
      </div>
      <div className="p-3 sm:p-5">
        <p className="line-clamp-1 text-[9px] font-bold uppercase tracking-[.12em] text-amber-700 dark:text-amber-300">{item.category}</p>
        <h3 className="mt-1.5 line-clamp-2 text-sm font-bold leading-tight sm:text-xl">{item.title}</h3>
        <p className="mt-2 line-clamp-1 text-[10px] text-slate-500 dark:text-zinc-400 sm:text-xs">{item.location}</p>
        <p className="mt-2 text-[10px] font-semibold text-slate-800 dark:text-zinc-200 sm:text-xs">{item.detail}</p>
      </div>
    </Link>
  );
}

function SearchIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></svg>;
}
