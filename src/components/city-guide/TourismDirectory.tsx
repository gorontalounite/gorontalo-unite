"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export type TourismPlace = {
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

type TourismDirectoryProps = { places: TourismPlace[] };

const normalise = (value: string) => value.toLocaleLowerCase("id-ID").trim();

export default function TourismDirectory({ places }: TourismDirectoryProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");
  const [location, setLocation] = useState("Semua lokasi");

  const categories = useMemo(
    () => Array.from(new Set(places.map((place) => place.category?.trim()).filter(Boolean) as string[])).sort((a, b) => a.localeCompare(b, "id")),
    [places],
  );
  const locations = useMemo(
    () => Array.from(new Set(places.map((place) => place.location?.trim()).filter(Boolean) as string[])).sort((a, b) => a.localeCompare(b, "id")),
    [places],
  );
  const results = useMemo(() => {
    const needle = normalise(query);
    return places.filter((place) => {
      const matchesCategory = category === "Semua" || place.category === category;
      const matchesLocation = location === "Semua lokasi" || place.location === location;
      const searchable = [place.name, place.description, place.category, place.location, place.address]
        .filter(Boolean)
        .join(" ");
      return matchesCategory && matchesLocation && (!needle || normalise(searchable).includes(needle));
    });
  }, [category, location, places, query]);

  return (
    <main className="bg-[#fcfbf8] pb-20 text-slate-900 dark:bg-zinc-950 dark:text-zinc-50">
      <section className="overflow-hidden border-b border-stone-200 bg-[#f5f0e8] dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:py-20">
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[.24em] text-amber-700 dark:text-amber-300">Gorontalo City Guide</p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[.98] tracking-tight sm:text-6xl">Temukan tempat terbaik di Gorontalo.</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-zinc-300 sm:text-lg">Rencanakan perjalananmu dengan rekomendasi tempat wisata pilihan, informasi lokasi, dan detail kunjungan yang mudah dibaca.</p>
            <SearchPanel
              category={category}
              categories={categories}
              location={location}
              locations={locations}
              query={query}
              setCategory={setCategory}
              setLocation={setLocation}
              setQuery={setQuery}
            />
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-[2rem] bg-gradient-to-br from-amber-300 via-orange-200 to-stone-100 shadow-[0_28px_60px_-34px_rgba(120,53,15,.55)] dark:from-amber-500 dark:via-orange-700 dark:to-zinc-800 lg:min-h-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,.75)_0_3%,transparent_3.4%),radial-gradient(circle_at_74%_72%,rgba(120,53,15,.25)_0_7%,transparent_7.5%),linear-gradient(130deg,transparent_0_44%,rgba(120,53,15,.18)_44.5%_45%,transparent_45.5%)]" />
            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/50 bg-white/80 p-5 shadow-lg backdrop-blur dark:border-white/10 dark:bg-zinc-950/75">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-amber-700 dark:text-amber-300">Jelajah dengan santai</p>
              <p className="mt-2 text-lg font-semibold">Dari pesisir sampai perbukitan, mulai dari sini.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col gap-5 border-b border-stone-200 pb-6 dark:border-zinc-800 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-amber-700 dark:text-amber-300">Direktori tempat</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">Rekomendasi untuk dikunjungi</h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-zinc-400"><b className="text-slate-900 dark:text-zinc-100">{results.length}</b> {results.length === 1 ? "tempat ditemukan" : "tempat ditemukan"}</p>
        </div>

        {places.length === 0 ? <DirectoryEmpty /> : results.length === 0 ? <NoResults reset={() => { setQuery(""); setCategory("Semua"); setLocation("Semua lokasi"); }} /> : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((place, index) => <PlaceCard key={place.id} place={place} rank={index + 1} />)}
          </div>
        )}
      </section>
    </main>
  );
}

function SearchPanel({ query, setQuery, category, setCategory, categories, location, setLocation, locations }: {
  query: string; setQuery: (value: string) => void; category: string; setCategory: (value: string) => void; categories: string[]; location: string; setLocation: (value: string) => void; locations: string[];
}) {
  return <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-3 shadow-xl shadow-stone-900/5 dark:border-zinc-700 dark:bg-zinc-950">
    <div className="grid gap-2 md:grid-cols-[1fr_11rem_11rem]">
      <label className="flex min-h-12 items-center gap-3 rounded-xl bg-stone-50 px-4 dark:bg-zinc-900">
        <SearchIcon /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari pantai, air terjun, museum…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" aria-label="Cari tempat wisata" />
      </label>
      <FilterSelect value={category} onChange={setCategory} options={["Semua", ...categories]} label="Kategori" />
      <FilterSelect value={location} onChange={setLocation} options={["Semua lokasi", ...locations]} label="Lokasi" />
    </div>
  </div>;
}

function FilterSelect({ value, onChange, options, label }: { value: string; onChange: (value: string) => void; options: string[]; label: string }) {
  return <label className="relative flex min-h-12 items-center rounded-xl bg-stone-50 px-3 dark:bg-zinc-900"><span className="sr-only">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="h-full w-full appearance-none bg-transparent pr-6 text-sm font-medium outline-none"><>{options.map((option) => <option key={option} value={option}>{option}</option>)}</></select><span className="pointer-events-none absolute right-3 text-xs text-slate-500">⌄</span></label>;
}

function PlaceCard({ place, rank }: { place: TourismPlace; rank: number }) {
  return <Link href={`/wisata/${place.slug}`} className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/10 dark:bg-zinc-900 dark:ring-white/10">
    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-amber-200 via-orange-100 to-stone-200 dark:from-amber-800 dark:to-zinc-800">
      {place.image_url ? <Image src={place.image_url} alt={place.name} fill unoptimized className="object-cover transition duration-500 group-hover:scale-105" /> : <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,.75),transparent_13%),linear-gradient(135deg,transparent_0_50%,rgba(120,53,15,.13)_50.5%_51%,transparent_51.5%)]" />}
      <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-slate-800 shadow-sm backdrop-blur dark:bg-zinc-950/85 dark:text-zinc-100">{place.featured ? "Pilihan City Guide" : `Rekomendasi #${rank}`}</div>
      <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-slate-950/75 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur"><PinIcon /> {place.location || "Gorontalo"}</div>
    </div>
    <div className="p-5">
      <p className="text-[11px] font-bold uppercase tracking-[.16em] text-amber-700 dark:text-amber-300">{place.category || "Wisata"}</p>
      <h3 className="mt-2 text-xl font-bold tracking-tight">{place.name}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">{place.description || "Informasi tempat ini sedang dilengkapi oleh tim City Guide."}</p>
      <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4 text-sm dark:border-zinc-800"><span className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400"><ClockIcon />{place.opening_hours || "Lihat info kunjungan"}</span><span className="font-semibold text-amber-700 group-hover:underline dark:text-amber-300">Lihat detail →</span></div>
    </div>
  </Link>;
}

function DirectoryEmpty() { return <div className="mt-8 rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-20 text-center dark:border-zinc-700 dark:bg-zinc-900"><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-700 dark:text-amber-300">Segera hadir</p><h3 className="mt-3 font-display text-2xl font-bold">Direktori wisata sedang disiapkan</h3><p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500 dark:text-zinc-400">Entri pertama akan tampil dengan pencarian, kategori, lokasi, dan detail kunjungan di halaman ini.</p></div>; }
function NoResults({ reset }: { reset: () => void }) { return <div className="mt-8 rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-20 text-center dark:border-zinc-700 dark:bg-zinc-900"><h3 className="font-display text-2xl font-bold">Belum ada tempat yang cocok</h3><p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">Coba kata kunci atau filter lain.</p><button onClick={reset} className="mt-5 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white dark:bg-amber-300 dark:text-zinc-950">Reset pencarian</button></div>; }

function SearchIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></svg>; }
function PinIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>; }
function ClockIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></svg>; }
