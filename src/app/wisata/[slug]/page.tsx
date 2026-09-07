import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Json } from "@/types/database";
import BlockRenderer from "@/components/ui/BlockRenderer";
import ListingActions from "@/components/city-guide/ListingActions";
import InstagramEmbedGrid from "@/components/city-guide/InstagramEmbedGrid";
import type { Block } from "@/components/editor/types";

export const dynamic = "force-dynamic";

type Details = Record<string, Json | undefined>;
type DetailItem = { label: string; value: string };

const categoryFields: Record<string, Array<[string, string]>> = {
  "Akomodasi": [["room_details", "Detail kamar"], ["facilities", "Fasilitas"], ["hotel_policies", "Kebijakan hotel"], ["price_range", "Rentang harga"]],
  "Kuliner": [["signature_menu", "Menu andalan"], ["dietary_options", "Pilihan diet"], ["vibe", "Suasana"], ["price_range", "Kisaran harga"]],
  "Atraksi & Wisata": [["entry_fee", "Tiket masuk"], ["special_rules", "Aturan kunjungan"], ["visitor_facilities", "Fasilitas wisatawan"], ["best_time", "Waktu terbaik berkunjung"]],
  "Belanja": [["product_specialty", "Produk unggulan"], ["payment_methods", "Metode pembayaran"], ["bargaining_tip", "Tips berbelanja"]],
  "Layanan Publik & Transportasi": [["routes_schedule", "Rute & jadwal"], ["medical_services", "Layanan medis"], ["financial_services", "Informasi keuangan"]],
};

function toText(value: Json | undefined) {
  if (typeof value === "string" || typeof value === "number") return String(value).trim();
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string").join(", ");
  return "";
}
function toList(value: Json | undefined) {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0).map((item) => item.trim());
  return toText(value).split(/\n|,/).map((item) => item.trim()).filter(Boolean);
}
function mapEmbedUrl(lat: number, lon: number) {
  const delta = 0.006;
  const bbox = [lon - delta, lat - delta, lon + delta, lat + delta].join("%2C");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
}

export default async function TourismDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: place } = await supabase.from("tourism_places").select("*").eq("slug", slug).eq("published", true).single();
  if (!place) notFound();

  const { data: relatedRaw } = await supabase.from("tourism_places").select("id, name, slug, image_url, category, subcategory").eq("published", true).eq("category", place.category).neq("id", place.id).limit(3);
  const related = relatedRaw ?? [];

  const details = (place.listing_details && typeof place.listing_details === "object" && !Array.isArray(place.listing_details) ? place.listing_details : {}) as Details;
  const category = place.category || "Atraksi & Wisata";
  const categoryTemplate = categoryFields[category] ?? (category.toLocaleLowerCase("id-ID").includes("wisata") ? categoryFields["Atraksi & Wisata"] : []);
  const categoryInfo = categoryTemplate.map(([key, label]) => ({ label, value: toText(details[key]) })).filter((item) => item.value);
  const instagramPosts = toList(details.instagram_posts);
  const gallery = Array.from(new Set([place.image_url, ...(place.gallery ?? [])].filter((image): image is string => Boolean(image))));
  const contentBlocks = Array.isArray(details.content_blocks) ? details.content_blocks as unknown as Block[] : [];
  const generalInfo: DetailItem[] = [
    { label: "Alamat lengkap", value: place.address || "" },
    { label: "Jam operasional", value: place.opening_hours || "" },
    { label: "Kontak resmi", value: place.contact || "" },
    ...categoryInfo,
  ];
  const highlights = [place.location ? `Berada di ${place.location}` : "Lokasi di Gorontalo", place.opening_hours ? `Jam kunjungan: ${place.opening_hours}` : "Cek detail kunjungan sebelum berangkat", categoryInfo[0]?.value].filter(Boolean) as string[];
  const paragraphs: string[] = String(place.description ?? "").split(/\n\s*\n/).filter(Boolean);
  const tags = Array.isArray(place.tags) ? place.tags.filter((tag: unknown): tag is string => typeof tag === "string" && tag.trim().length > 0) : [];
  const hasCoords = typeof place.latitude === "number" && typeof place.longitude === "number";

  const crumbs = [category, place.location].filter(Boolean) as string[];

  return <main className="bg-[#fcfbf8] pb-20 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100">
    <nav aria-label="Breadcrumb" className="bg-[#17191d] text-white/70"><div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 text-sm sm:px-6 lg:px-8"><Link href="/city-guide" className="font-medium hover:text-white">City Guide</Link>{crumbs.map((crumb) => <span key={crumb} className="flex items-center gap-2"><span className="text-white/30">/</span><span>{crumb}</span></span>)}<span className="flex items-center gap-2"><span className="text-white/30">/</span><span className="truncate font-semibold text-amber-300">{place.name}</span></span></div></nav>
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mt-2 grid gap-8 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-end">
        <div><p className="text-xs font-bold uppercase tracking-[.22em] text-amber-700 dark:text-amber-300">{category}{place.location ? ` · ${place.location}` : ""}</p><h1 className="mt-3 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">{place.name}</h1><div className="mt-5 flex flex-wrap gap-2">{highlights.map((highlight) => <span key={highlight} className="rounded-full bg-white px-3 py-1.5 text-sm text-slate-600 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-white/10">{highlight}</span>)}</div>{(place.subcategory || tags.length > 0) && <div className="mt-3 flex flex-wrap gap-2">{place.subcategory && <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">{place.subcategory}</span>}{tags.map((tag: string) => <span key={tag} className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">#{tag}</span>)}</div>}</div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/60 dark:bg-amber-950/25">{place.price_range ? <><p className="text-xs font-bold uppercase tracking-[.18em] text-amber-700 dark:text-amber-300">Kisaran harga</p><p className="mt-2 text-lg font-bold text-slate-900 dark:text-zinc-100">{place.price_range}</p></> : <><p className="text-xs font-bold uppercase tracking-[.18em] text-amber-700 dark:text-amber-300">Simpan untuk perjalanan</p><p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-300">Cek jam operasional dan rute sebelum berkunjung agar pengalamanmu lebih nyaman.</p></>}</div>
      </div>
    </div>

    <div className="mx-auto mt-9 max-w-7xl px-4 sm:px-6 lg:px-8">{gallery.length > 1 ? <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-xl sm:grid-cols-4 sm:grid-rows-2 sm:gap-2">
        <div className="relative col-span-2 row-span-2 aspect-[4/3] overflow-hidden bg-gradient-to-br from-amber-200 via-orange-100 to-stone-200 dark:from-amber-900 dark:to-zinc-800 sm:aspect-auto"><Image src={gallery[0]} alt={place.name} fill priority unoptimized className="object-cover" /></div>
        {gallery.slice(1, 5).map((image, index) => {
          const isLastVisible = index === 3 || index === gallery.slice(1, 5).length - 1;
          const remaining = gallery.length - 5;
          return <div key={image} className="relative aspect-square overflow-hidden bg-stone-200 dark:bg-zinc-800 sm:aspect-auto">
            <Image src={image} alt={`${place.name} ${index + 2}`} fill unoptimized className="object-cover" />
            {isLastVisible && remaining > 0 && <div className="absolute inset-0 flex items-center justify-center bg-slate-900/55 text-sm font-semibold text-white">⛶ Lihat {remaining} Foto Lagi</div>}
          </div>;
        })}
      </div> : <div className="relative aspect-[16/8] overflow-hidden rounded-xl bg-gradient-to-br from-amber-200 via-orange-100 to-stone-200 shadow-lg shadow-stone-900/10 dark:from-amber-900 dark:to-zinc-800">{place.image_url ? <Image src={place.image_url} alt={place.name} fill priority unoptimized className="object-cover" /> : <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,.75),transparent_13%),linear-gradient(135deg,transparent_0_50%,rgba(120,53,15,.13)_50.5%_51%,transparent_51.5%)]" />}</div>}<div className="mt-4 flex flex-wrap gap-3">{place.maps_url && <a href={place.maps_url} target="_blank" rel="noreferrer" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-amber-300 dark:text-zinc-950">Buka peta</a>}{place.website_url && <a href={place.website_url} target="_blank" rel="noreferrer" className="rounded-xl border border-amber-300 bg-white px-4 py-2.5 text-sm font-semibold text-amber-800 hover:bg-amber-50 dark:border-amber-700 dark:bg-zinc-900 dark:text-amber-200">Website</a>}</div></div>

    <div className="mx-auto mt-10 grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_21rem] lg:px-8">
      <article className="min-w-0"><section><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-700 dark:text-amber-300">Tentang tempat ini</p>{contentBlocks.length > 0 ? <BlockRenderer blocks={contentBlocks} className="mt-4 text-[1.05rem] leading-8" /> : <div className="mt-4 space-y-5 text-[1.05rem] leading-8 text-slate-700 dark:text-zinc-300">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>}</section>
        <section className="mt-10"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-700 dark:text-amber-300">Panduan kunjungan</p><h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Informasi yang perlu diketahui</h2></div></div>{generalInfo.length ? <div className="mt-5 grid gap-3 sm:grid-cols-2">{generalInfo.map((item) => <InfoCard key={item.label} {...item} />)}</div> : <div className="mt-5 rounded-2xl border border-dashed border-stone-300 bg-white p-6 text-sm text-slate-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">Detail kunjungan sedang dilengkapi oleh tim City Guide.</div>}</section>
        <section className="mt-10"><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-700 dark:text-amber-300">Ulasan</p><h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Rating &amp; ulasan pengunjung</h2>{place.rating && place.review_count > 0 ? <div className="mt-5 flex items-center gap-4"><span className="text-3xl font-bold text-amber-600">{Number(place.rating).toFixed(1)}</span><span className="text-sm text-slate-500 dark:text-zinc-400">dari {place.review_count} ulasan</span></div> : <div className="mt-5 flex flex-wrap items-center gap-5 rounded-2xl border border-dashed border-stone-300 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900"><div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-stone-300 text-lg font-bold text-stone-400 dark:border-zinc-700 dark:text-zinc-500">–</div><div><p className="text-sm tracking-[.2em] text-stone-300 dark:text-zinc-600">☆ ☆ ☆ ☆ ☆</p><p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">Belum ada ulasan untuk tempat ini.</p></div></div>}</section>
        {hasCoords && <section className="mt-10"><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-700 dark:text-amber-300">Lokasi</p><h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Peta kunjungan</h2><div className="mt-5 overflow-hidden rounded-2xl border border-stone-200 dark:border-zinc-800"><iframe title={`Peta ${place.name}`} src={mapEmbedUrl(place.latitude as number, place.longitude as number)} className="h-80 w-full" loading="lazy" /></div></section>}
        {instagramPosts.length > 0 && <section className="mt-10"><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-700 dark:text-amber-300">Dari Instagram</p><h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Lihat suasananya</h2><InstagramEmbedGrid posts={instagramPosts} /></section>}
        {related.length > 0 && <section className="mt-10"><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-700 dark:text-amber-300">Sekitar sini</p><h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Tempat serupa</h2><div className="mt-5 grid gap-4 sm:grid-cols-3">{related.map((item) => <Link key={item.id} href={`/wisata/${item.slug}`} className="group overflow-hidden rounded-2xl border border-stone-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"><div className="relative aspect-[4/3] bg-stone-200 dark:bg-zinc-800">{item.image_url ? <Image src={item.image_url} alt={item.name} fill unoptimized className="object-cover transition group-hover:scale-105" /> : null}</div><div className="p-4"><p className="text-xs font-bold uppercase tracking-[.14em] text-amber-700 dark:text-amber-300">{item.subcategory || item.category}</p><p className="mt-1 text-sm font-semibold leading-snug text-slate-900 dark:text-zinc-100">{item.name}</p></div></Link>)}</div></section>}
        <ListingActions name={place.name} />
      </article>
      <aside className="h-fit lg:sticky lg:top-24"><div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10"><div className="border-b border-stone-100 p-5 dark:border-zinc-800"><p className="text-xs font-bold uppercase tracking-[.18em] text-amber-700 dark:text-amber-300">Ringkasan</p><h2 className="mt-2 text-xl font-bold">Rencanakan kunjungan</h2></div><ul className="divide-y divide-stone-100 dark:divide-zinc-800">{highlights.map((highlight) => <li key={highlight} className="flex gap-3 px-5 py-4 text-sm leading-relaxed text-slate-600 dark:text-zinc-300"><span className="mt-0.5 text-amber-600">✓</span>{highlight}</li>)}</ul></div></aside>
    </div>
  </main>;
}

function InfoCard({ label, value }: DetailItem) { return <div className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"><p className="text-xs font-bold uppercase tracking-[.14em] text-slate-400 dark:text-zinc-500">{label}</p><p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-zinc-200">{value}</p></div>; }
