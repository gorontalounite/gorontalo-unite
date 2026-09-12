"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { REGIONS, regionBySlug, regionOf, type RegionSlug } from "@/lib/city-guide/regions";
import SectionHeading from "@/components/ui/SectionHeading";

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


type SectionKey = "explore" | "eat" | "stay" | "shop" | "services";

type DirectoryItem = {
  id: string;
  href: string;
  title: string;
  imageUrl: string | null;
  badge: string;
  place: string;
  /** Short area name, for the meta row. */
  area: string;
  hours: string;
  dek: string;
  region: RegionSlug | null;
  featured: boolean;
  searchable: string;
};

const SECTION_META: Record<SectionKey, { label: string; category: string | null; icon: React.ReactNode }> = {
  explore: { label: "Explore", category: "Atraksi & Wisata", icon: <path d="M3 18l5-7 4 5 3-4 6 6M8 7a2 2 0 100-4 2 2 0 000 4z" /> },
  eat: { label: "Eat", category: "Kuliner", icon: <path d="M6 3v7a2 2 0 002 2v9M6 3v7M10 3v9M18 3c-2 0-3 2-3 4v4h3v9" /> },
  stay: { label: "Stay", category: "Akomodasi", icon: <path d="M3 19V7m0 12h18M3 19v-4h18v4M7 15V9a2 2 0 012-2h2a2 2 0 012 2v6" /> },
  shop: { label: "Shop", category: "Belanja", icon: <path d="M6 8h12l1 12H5L6 8zM9 8V6a3 3 0 016 0v2" /> },
  services: { label: "Services", category: "Layanan Publik & Transportasi", icon: <path d="M3 16l2-6h14l2 6M5 16v3M19 16v3M7 10V6h10v4" /> },
};

const SECTION_ORDER: SectionKey[] = ["explore", "eat", "stay", "shop", "services"];

// Places load six at a time — two full rows on desktop, three on phones.
const PAGE_SIZE = 6;
const DEK_WORDS = 10;

const normalize = (value: string) => value.toLocaleLowerCase("id-ID").trim();

function toDek(text: string) {
  const words = String(text ?? "").replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  if (words.length === 0) return "";
  return words.slice(0, DEK_WORDS).join(" ") + (words.length > DEK_WORDS ? "…" : "");
}


export default function CityGuideDirectory({
  places,
  initialTab,
  initialRegion,
  initialQuery,
}: {
  places: CityGuidePlace[];
  initialTab?: string;
  initialRegion?: string;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery ?? "");
  const opening = SECTION_ORDER.find((key) => key === initialTab) ?? "all";
  const [tab, setTab] = useState<"all" | SectionKey>(opening);
  const openingRegion = REGIONS.find((r) => r.slug === initialRegion)?.slug ?? null;
  const [region, setRegion] = useState<RegionSlug | null>(openingRegion);

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
        area: regionBySlug(regionOf(place))?.short ?? "Gorontalo",
        hours: place.opening_hours ?? "",
        dek: toDek(place.description),
        region: regionOf(place),
        featured: place.featured,
        searchable: normalize([place.name, place.description, place.category, place.location, place.address].filter(Boolean).join(" ")),
      });
    }

    for (const list of map.values()) list.sort((a, b) => Number(b.featured) - Number(a.featured));
    return map;
  }, [places]);

  const needle = normalize(query);
  const searchedSections = useMemo(() => {
    const result = new Map<SectionKey, DirectoryItem[]>();
    for (const key of SECTION_ORDER) {
      const items = bySections.get(key) ?? [];
      result.set(key, needle ? items.filter((item) => item.searchable.includes(needle)) : items);
    }
    return result;
  }, [bySections, needle]);

  // Counted over the sections the active tab actually shows, so switching to
  // Eat drops Boalemo to zero rather than advertising places it has none of.
  const regionCounts = useMemo(() => {
    const counts = new Map<RegionSlug, number>();
    for (const r of REGIONS) counts.set(r.slug, 0);
    let all = 0;
    for (const key of tab === "all" ? SECTION_ORDER : [tab]) {
      for (const item of searchedSections.get(key) ?? []) {
        all++;
        if (item.region) counts.set(item.region, (counts.get(item.region) ?? 0) + 1);
      }
    }
    return { counts, all };
  }, [searchedSections, tab]);

  const filteredSections = useMemo(() => {
    const result = new Map<SectionKey, DirectoryItem[]>();
    for (const key of SECTION_ORDER) {
      const items = searchedSections.get(key) ?? [];
      result.set(key, region ? items.filter((item) => item.region === region) : items);
    }
    return result;
  }, [searchedSections, region]);

  const totalMatches = useMemo(() => SECTION_ORDER.reduce((sum, key) => sum + (filteredSections.get(key)?.length ?? 0), 0), [filteredSections]);

  // Browsing unfiltered shows every section, empty ones included, so the shape
  // of the guide is visible. Once a search or an area narrows things down, an
  // empty section is just noise — picking Boalemo would otherwise return four
  // places under four empty boxes.
  const narrowed = Boolean(needle) || region !== null;
  const sectionsToRender = (tab === "all" ? SECTION_ORDER : [tab]).filter(
    (key) => !narrowed || (filteredSections.get(key)?.length ?? 0) > 0,
  );

  return (
    <div className="bg-white text-[#302f2c] dark:bg-zinc-950 dark:text-zinc-50">
      <div id="browse" className="scroll-mt-16 border-y border-[#d7d1c6] dark:border-zinc-800">
        <div className="mx-auto max-w-[1280px] px-4 pt-6 pb-5 sm:px-6 sm:pb-6 lg:px-8">
          {needle && (
            <div className="mb-4 flex items-center gap-2 text-sm">
              <span className="text-[#78716c] dark:text-zinc-400">Searching for</span>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="inline-flex min-h-8 items-center gap-2 rounded-md border border-[#302f2c] px-3 text-xs font-semibold dark:border-amber-300"
              >
                {query}
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Clear search</span>
              </button>
            </div>
          )}

          <div className="flex gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Directory categories">
            <TabButton active={tab === "all"} onClick={() => setTab("all")}>All</TabButton>
            {SECTION_ORDER.map((key) => (
              <TabButton key={key} active={tab === key} onClick={() => setTab(key)}>{SECTION_META[key].label}</TabButton>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by area">
            <RegionChip active={region === null} count={regionCounts.all} onClick={() => setRegion(null)}>
              All areas
            </RegionChip>
            {REGIONS.map((area) => {
              const count = regionCounts.counts.get(area.slug) ?? 0;
              return (
                <RegionChip
                  key={area.slug}
                  active={region === area.slug}
                  count={count}
                  disabled={count === 0}
                  title={`${area.label} — ibu kota ${area.seat}`}
                  onClick={() => setRegion(area.slug)}
                >
                  {area.short}
                </RegionChip>
              );
            })}
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
            key={`${key}-${needle}-${region ?? "all"}`}
            sectionKey={key}
            items={filteredSections.get(key) ?? []}
            band={index % 2 === 1 ? "light" : "plain"}
            first={index === 0}
          />
        ))
      )}
    </div>
  );
}

function RegionChip({
  active,
  count,
  disabled = false,
  title,
  onClick,
  children,
}: {
  active: boolean;
  count: number;
  disabled?: boolean;
  title?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-pressed={active}
      className={`inline-flex min-h-9 items-center gap-1.5 rounded-md border px-3 text-xs font-medium transition ${
        active
          ? "border-[#302f2c] bg-[#302f2c] text-white dark:border-amber-300 dark:bg-amber-300 dark:text-zinc-950"
          : disabled
            ? "cursor-not-allowed border-[#e7e2d8] text-[#b5aea2] dark:border-zinc-800 dark:text-zinc-600"
            : "border-[#d7d1c6] text-[#555149] hover:border-[#9b7513] hover:text-[#9b7513] dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-amber-300 dark:hover:text-amber-300"
      }`}
    >
      {children}
      <span className={active ? "text-white/70 dark:text-zinc-950/60" : "text-[#a8a29e] dark:text-zinc-500"}>
        {count}
      </span>
    </button>
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
  first,
}: {
  sectionKey: SectionKey;
  items: DirectoryItem[];
  band: "plain" | "light" | "dark";
  first: boolean;
}) {
  const meta = SECTION_META[sectionKey];
  const isDark = band === "dark";
  const bandClass = band === "dark" ? "bg-[#17191d] text-white" : band === "light" ? "border-y border-[#dedede] bg-[#f6f6f6] dark:border-zinc-800 dark:bg-zinc-900" : "";

  // Paging resets by remount — the parent keys each Section on the active
  // search, so a new query always starts back at the first page.
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  // Clamped rather than trusted: an area filter can shrink the list under the
  // page the reader is standing on, which would otherwise render nothing.
  const current = Math.min(page, pageCount - 1);
  const shown = items.slice(current * PAGE_SIZE, (current + 1) * PAGE_SIZE);

  return (
    <section
      className={`pb-12 sm:pb-16 ${first ? "pt-6 sm:pt-8" : "pt-12 sm:pt-16"} ${bandClass}`}
      aria-labelledby={`section-${sectionKey}`}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading id={`section-${sectionKey}`}>{meta.label}</SectionHeading>

        {items.length === 0 ? (
          <div className={`rounded border border-dashed px-6 py-14 text-center ${isDark ? "border-white/15" : "border-[#d7d1c6] dark:border-zinc-700"}`}>
            <p className={`text-sm ${isDark ? "text-white/60" : "text-[#78716c] dark:text-zinc-400"}`}>
              No {meta.label.toLowerCase()} listings published yet.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
              {shown.map((item) => (
                <PlaceCard key={item.id} item={item} sectionKey={sectionKey} />
              ))}
            </div>
            {pageCount > 1 && (
              <div className="mt-9 flex items-center justify-center gap-4">
                <PageArrow
                  direction="prev"
                  disabled={current === 0}
                  onClick={() => setPage(current - 1)}
                  label={`Previous page of ${meta.label}`}
                />
                <p className="text-xs tabular-nums text-[#78716c] dark:text-zinc-400">
                  {current + 1} / {pageCount}
                </p>
                <PageArrow
                  direction="next"
                  disabled={current === pageCount - 1}
                  onClick={() => setPage(current + 1)}
                  label={`Next page of ${meta.label}`}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

/** Arrows only — the label is for screen readers, not the page. */
function PageArrow({
  direction,
  disabled,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-[#d7d1c6] transition hover:border-[#302f2c] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[#d7d1c6] dark:border-zinc-700 dark:hover:border-amber-300 dark:disabled:hover:border-zinc-700"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
        <path d={direction === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}

function PlaceCard({ item, sectionKey }: { item: DirectoryItem; sectionKey: SectionKey }) {
  return (
    <Link
      href={item.href}
      className="group flex flex-col overflow-hidden rounded-lg border border-[#e7e2d8] bg-white transition hover:shadow-[0_18px_36px_-24px_rgba(0,0,0,.45)] dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e4dc] dark:bg-zinc-800">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            unoptimized
            sizes="(max-width: 639px) 46vw, (max-width: 1279px) 31vw, 400px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8 text-[#a08a5c]">
              {SECTION_META[sectionKey].icon}
            </svg>
          </div>
        )}
      </div>

      {/* Everything sits inside the card now. The category and location used to
          ride on the photograph; here they read as one block with the name. */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-[15px] font-bold leading-snug transition group-hover:text-[#9b7513] sm:text-base">
          {item.title}
        </h3>

        {/* Two fixed lines, so the rule below sits on one baseline across a row. */}
        {item.dek && (
          <p className="mt-1.5 line-clamp-2 min-h-10 text-xs leading-relaxed text-[#78716c] dark:text-zinc-400">
            {item.dek}
          </p>
        )}

        <div className="mt-3 flex items-center gap-3 border-t border-[#f0ece4] pt-3 text-[11px] text-[#78716c] dark:border-zinc-800 dark:text-zinc-400">
          <span className="shrink-0">{item.area}</span>
          {/* Two columns on a phone leave about 155px of card; opening hours run
              far past that, so they wait for the wider layout. */}
          {item.hours && (
            <>
              <span aria-hidden="true" className="hidden h-1 w-1 shrink-0 rounded-full bg-[#d7d1c6] sm:block" />
              <span className="hidden min-w-0 truncate sm:block">{item.hours}</span>
            </>
          )}
        </div>

        <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[.08em] text-[#9b7513] dark:text-amber-300">
          Read more
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3 w-3 transition group-hover:translate-x-0.5" aria-hidden="true">
            <path d="M5 12h13M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

