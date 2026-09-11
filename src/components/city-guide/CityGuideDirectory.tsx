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

type SectionKey = "explore" | "eat" | "stay" | "shop" | "services" | "events";

type DirectoryItem = {
  id: string;
  href: string;
  title: string;
  imageUrl: string | null;
  badge: string;
  place: string;
  dek: string;
  featured: boolean;
  searchable: string;
};

const SECTION_META: Record<SectionKey, { label: string; category: string | null; icon: React.ReactNode }> = {
  explore: { label: "Explore", category: "Atraksi & Wisata", icon: <path d="M3 18l5-7 4 5 3-4 6 6M8 7a2 2 0 100-4 2 2 0 000 4z" /> },
  eat: { label: "Eat", category: "Kuliner", icon: <path d="M6 3v7a2 2 0 002 2v9M6 3v7M10 3v9M18 3c-2 0-3 2-3 4v4h3v9" /> },
  stay: { label: "Stay", category: "Akomodasi", icon: <path d="M3 19V7m0 12h18M3 19v-4h18v4M7 15V9a2 2 0 012-2h2a2 2 0 012 2v6" /> },
  shop: { label: "Shop", category: "Belanja", icon: <path d="M6 8h12l1 12H5L6 8zM9 8V6a3 3 0 016 0v2" /> },
  services: { label: "Services", category: "Layanan Publik & Transportasi", icon: <path d="M3 16l2-6h14l2 6M5 16v3M19 16v3M7 10V6h10v4" /> },
  events: { label: "Events", category: null, icon: <path d="M8 3v3M16 3v3M4 9h16M5 6h14a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1z" /> },
};

const SECTION_ORDER: SectionKey[] = ["explore", "eat", "stay", "shop", "services", "events"];

// Places load six at a time — two full rows on desktop, three on phones.
const PAGE_SIZE = 6;
const DEK_WORDS = 10;

const normalize = (value: string) => value.toLocaleLowerCase("id-ID").trim();

function toDek(text: string) {
  const words = String(text ?? "").replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  if (words.length === 0) return "";
  return words.slice(0, DEK_WORDS).join(" ") + (words.length > DEK_WORDS ? "…" : "");
}

function eventDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Makassar" }).format(new Date(value));
}

export default function CityGuideDirectory({
  places,
  events,
  initialTab,
}: {
  places: CityGuidePlace[];
  events: CityGuideEvent[];
  initialTab?: string;
}) {
  const [query, setQuery] = useState("");
  const opening = SECTION_ORDER.find((key) => key === initialTab) ?? "all";
  const [tab, setTab] = useState<"all" | SectionKey>(opening);

  const bySections = useMemo(() => {
    const map = new Map<SectionKey, DirectoryItem[]>();
    for (const key of SECTION_ORDER) map.set(key, []);

    for (const place of places) {
      const key = (Object.keys(SECTION_META) as SectionKey[]).find((k) => SECTION_META[k].category === place.category) ?? "explore";
      map.get(key)!.push({
        id: place.id,
        href: `/city-guide/${place.slug}`,
        title: place.name,
        imageUrl: place.image_url,
        badge: SECTION_META[key].label,
        place: place.location || place.address || "Gorontalo",
        dek: toDek(place.description),
        featured: place.featured,
        searchable: normalize([place.name, place.description, place.category, place.location, place.address].filter(Boolean).join(" ")),
      });
    }

    for (const event of events) {
      map.get("events")!.push({
        id: event.id,
        href: `/event/${event.slug}`,
        title: event.title,
        imageUrl: event.image_url,
        badge: eventDate(event.starts_at),
        place: event.venue || event.address || "Gorontalo",
        dek: toDek(event.description),
        featured: event.featured,
        searchable: normalize([event.title, event.description, event.category, event.venue, event.address].filter(Boolean).join(" ")),
      });
    }

    for (const list of map.values()) list.sort((a, b) => Number(b.featured) - Number(a.featured));
    return map;
  }, [places, events]);

  const needle = normalize(query);
  const filteredSections = useMemo(() => {
    const result = new Map<SectionKey, DirectoryItem[]>();
    for (const key of SECTION_ORDER) {
      const items = bySections.get(key) ?? [];
      result.set(key, needle ? items.filter((item) => item.searchable.includes(needle)) : items);
    }
    return result;
  }, [bySections, needle]);

  const totalMatches = useMemo(() => SECTION_ORDER.reduce((sum, key) => sum + (filteredSections.get(key)?.length ?? 0), 0), [filteredSections]);

  const sectionsToRender = tab === "all" ? SECTION_ORDER : [tab];

  return (
    <main className="bg-white text-[#302f2c] dark:bg-zinc-950 dark:text-zinc-50">
      <div className="border-b border-[#d7d1c6] dark:border-zinc-800">
        <div className="mx-auto max-w-[1280px] px-4 py-7 sm:px-6 sm:py-8 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#555149] dark:text-zinc-400">Gorontalo Unite</p>
          <h1 className="font-heading mt-2 text-[34px] font-bold tracking-[.01em] sm:text-[42px]">City Guide</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#78716c] dark:text-zinc-400">
            Satu direktori untuk menjawab: mau ke mana, makan di mana, menginap di mana, dan event apa yang berlangsung di Gorontalo minggu ini.
          </p>

          <div className="mt-5 flex max-w-xl gap-2">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search places, food, or events…"
              aria-label="Search City Guide"
              className="min-h-11 min-w-0 flex-1 rounded border border-[#d7d1c6] bg-white px-3.5 text-sm outline-none placeholder:text-[#a8a29e] focus-visible:border-[#9b7513] dark:border-zinc-700 dark:bg-zinc-900"
            />
            <button
              type="button"
              className="min-h-11 shrink-0 rounded bg-[#302f2c] px-5 text-sm font-bold text-white dark:bg-amber-300 dark:text-zinc-950"
            >
              Search
            </button>
          </div>

          <div className="mt-5 flex gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Directory categories">
            <TabButton active={tab === "all"} onClick={() => setTab("all")}>All</TabButton>
            {SECTION_ORDER.map((key) => (
              <TabButton key={key} active={tab === key} onClick={() => setTab(key)}>{SECTION_META[key].label}</TabButton>
            ))}
          </div>
        </div>
      </div>

      {needle && totalMatches === 0 ? (
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded border border-dashed border-[#d7d1c6] bg-white px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900">
            <h3 className="font-heading text-lg font-bold">No results for &ldquo;{query}&rdquo;</h3>
            <p className="mt-2 text-sm text-[#78716c] dark:text-zinc-400">Try another keyword, or reset the search.</p>
            <button type="button" onClick={() => setQuery("")} className="mt-5 rounded bg-[#302f2c] px-5 py-2.5 text-sm font-bold text-white dark:bg-amber-300 dark:text-zinc-950">
              Reset search
            </button>
          </div>
        </div>
      ) : (
        sectionsToRender.map((key, index) => (
          <Section
            key={`${key}-${needle}`}
            sectionKey={key}
            items={filteredSections.get(key) ?? []}
            band={key === "events" ? "dark" : index % 2 === 1 ? "light" : "plain"}
            onViewAll={() => setTab(key)}
            showViewAll={tab === "all"}
          />
        ))
      )}
    </main>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="tab"
      aria-selected={active}
      className={`shrink-0 min-h-11 border-b-2 py-2 text-[11px] font-bold uppercase tracking-[.1em] transition ${
        active ? "border-[#9b7513] text-[#302f2c] dark:border-amber-300 dark:text-white" : "border-transparent text-[#555149] hover:text-[#9b7513] dark:text-zinc-400"
      }`}
    >
      {children}
    </button>
  );
}

function Section({
  sectionKey,
  items,
  band,
  onViewAll,
  showViewAll,
}: {
  sectionKey: SectionKey;
  items: DirectoryItem[];
  band: "plain" | "light" | "dark";
  onViewAll: () => void;
  showViewAll: boolean;
}) {
  const meta = SECTION_META[sectionKey];
  const isDark = band === "dark";
  // Events stay a slider with a View All; every place section pages instead.
  const isRail = sectionKey === "events";
  const bandClass = band === "dark" ? "bg-[#17191d] text-white" : band === "light" ? "border-y border-[#dedede] bg-[#f6f6f6] dark:border-zinc-800 dark:bg-zinc-900" : "";

  // Paging resets by remount — the parent keys each Section on the active
  // search, so a new query always starts back at the first page.
  const [visible, setVisible] = useState(PAGE_SIZE);

  const shown = isRail ? items : items.slice(0, visible);
  const remaining = items.length - shown.length;

  return (
    <section className={`py-12 sm:py-16 ${bandClass}`} aria-labelledby={`section-${sectionKey}`}>
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 id={`section-${sectionKey}`} className="font-heading text-[20px] font-bold tracking-[-.025em] sm:text-[24px]">
            / {meta.label} /
          </h2>
          {isRail && showViewAll && (
            <button type="button" onClick={onViewAll} className={`shrink-0 min-h-11 text-xs font-bold ${isDark ? "text-white hover:text-[#f5c400]" : "hover:text-[#9b7513]"}`}>
              View All →
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className={`rounded border border-dashed px-6 py-14 text-center ${isDark ? "border-white/15" : "border-[#d7d1c6] dark:border-zinc-700"}`}>
            <p className={`text-sm ${isDark ? "text-white/60" : "text-[#78716c] dark:text-zinc-400"}`}>
              No {meta.label.toLowerCase()} listings published yet.
            </p>
          </div>
        ) : isRail ? (
          <div className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-1 [scroll-snap-type:x_mandatory] sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {shown.map((item) => (
              <EventCard key={item.id} item={item} isDark={isDark} className="w-[15.5rem] shrink-0 [scroll-snap-align:start]" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
              {shown.map((item) => (
                <PlaceCard key={item.id} item={item} sectionKey={sectionKey} isDark={isDark} />
              ))}
            </div>
            {remaining > 0 && (
              <div className="mt-9 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisible((current) => current + PAGE_SIZE)}
                  className="min-h-11 rounded border border-[#302f2c] px-7 text-xs font-bold uppercase tracking-[.12em] transition hover:bg-[#302f2c] hover:text-white dark:border-zinc-600 dark:hover:bg-amber-300 dark:hover:text-zinc-950 dark:hover:border-amber-300"
                >
                  Load more ({remaining})
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function PlaceCard({ item, sectionKey, isDark }: { item: DirectoryItem; sectionKey: SectionKey; isDark: boolean }) {
  return (
    <Link href={item.href} className="group block">
      <div className={`relative overflow-hidden rounded-[4px] aspect-[4/3] ${isDark ? "bg-[#23262c]" : "bg-[#e8e4dc] dark:bg-zinc-800"}`}>
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            unoptimized
            sizes="(max-width: 639px) 46vw, (max-width: 1279px) 31vw, 400px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={`h-8 w-8 ${isDark ? "text-[#4b4536]" : "text-[#a08a5c]"}`}>
              {SECTION_META[sectionKey].icon}
            </svg>
          </div>
        )}

        {/* Category and location ride on the photo, so they never shout over the name. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-2.5 pb-2.5 pt-9">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="rounded-full border border-white/45 bg-black/25 px-2 py-[3px] text-[9px] font-bold uppercase leading-none tracking-[.1em] text-white">
              {item.badge}
            </span>
            {/* Wraps rather than truncates: these values end on the kecamatan as
                often as the kabupaten, so a cut would hide the useful half. */}
            <span className="line-clamp-2 min-w-0 text-[10px] font-medium uppercase leading-[1.35] tracking-[.05em] text-white/85">
              {item.place}
            </span>
          </div>
        </div>
      </div>

      <h3 className={`font-heading mt-3 text-[15px] font-bold leading-snug transition sm:text-base ${isDark ? "text-white group-hover:text-[#f5c400]" : "group-hover:text-[#9b7513]"}`}>
        {item.title}
      </h3>

      {/* Two fixed lines, so the Read more links stay on one baseline across a row. */}
      {item.dek && (
        <p className={`mt-1.5 line-clamp-2 min-h-10 text-xs leading-relaxed ${isDark ? "text-zinc-400" : "text-[#78716c] dark:text-zinc-400"}`}>
          {item.dek}
        </p>
      )}

      <span className={`mt-2 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[.08em] ${isDark ? "text-[#f5c400]" : "text-[#9b7513] dark:text-amber-300"}`}>
        Read more
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3 w-3 transition group-hover:translate-x-0.5" aria-hidden="true">
          <path d="M5 12h13M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

function EventCard({ item, isDark, className = "" }: { item: DirectoryItem; isDark: boolean; className?: string }) {
  return (
    <Link href={item.href} className={`group block ${className}`}>
      <div className={`relative aspect-[9/16] overflow-hidden rounded-[4px] ${isDark ? "bg-[#23262c]" : "bg-[#e8e4dc] dark:bg-zinc-800"}`}>
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={item.title} fill unoptimized sizes="(max-width: 639px) 45vw, 20vw" className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={`h-8 w-8 ${isDark ? "text-[#4b4536]" : "text-[#a08a5c]"}`}>
              {SECTION_META.events.icon}
            </svg>
          </div>
        )}
      </div>
      <p className={`mt-2.5 text-[11px] font-bold uppercase tracking-[.08em] ${isDark ? "text-[#f5c400]/90" : "text-[#9b7513]"}`}>{item.badge}</p>
      <h3 className={`font-heading mt-1 text-sm font-bold leading-snug tracking-[.01em] transition ${isDark ? "text-white group-hover:text-[#f5c400]" : "group-hover:text-[#9b7513]"}`}>
        {item.title}
      </h3>
      <p className={`mt-1 text-xs ${isDark ? "text-zinc-400" : "text-[#78716c] dark:text-zinc-400"}`}>{item.place}</p>
    </Link>
  );
}
