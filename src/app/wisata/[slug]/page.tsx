import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Json } from "@/types/database";
import BlockRenderer from "@/components/ui/BlockRenderer";
import ListingActions from "@/components/city-guide/ListingActions";
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
function instagramEmbedUrl(value: string) {
  const match = value.match(/instagram\.com\/(?:p|reel|tv)\/([^/?#]+)/i);
  return match ? `https://www.instagram.com/p/${match[1]}/embed/captioned/` : value;
}

export default async function TourismDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: place } = await supabase.from("tourism_places").select("*").eq("slug", slug).eq("published", true).single();
  if (!place) notFound();

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

  return <main className="bg-[#fcfbf8] pb-20 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100">
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500 dark:text-zinc-400"><Link href="/wisata" className="font-medium text-amber-700 hover:underline dark:text-amber-300">City Guide</Link><span className="mx-2 text-slate-300">/</span><span>Wisata</span><span className="mx-2 text-slate-300">/</span><span className="truncate">{place.name}</span></nav>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-end">
        <div><p className="text-xs font-bold uppercase tracking-[.22em] text-amber-700 dark:text-amber-300">{category}{place.location ? ` · ${place.location}` : ""}</p><h1 className="mt-3 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">{place.name}</h1><div className="mt-5 flex flex-wrap gap-2">{highlights.map((highlight) => <span key={highlight} className="rounded-full bg-white px-3 py-1.5 text-sm text-slate-600 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-white/10">{highlight}</span>)}</div></div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/60 dark:bg-amber-950/25"><p className="text-xs font-bold uppercase tracking-[.18em] text-amber-700 dark:text-amber-300">Simpan untuk perjalanan</p><p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-300">Cek jam operasional dan rute sebelum berkunjung agar pengalamanmu lebih nyaman.</p><div className="mt-4 flex gap-3">{place.maps_url && <a href={place.maps_url} target="_blank" rel="noreferrer" className="rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-amber-300 dark:text-zinc-950">Buka peta</a>}{place.website_url && <a href={place.website_url} target="_blank" rel="noreferrer" className="rounded-xl border border-amber-300 px-3.5 py-2 text-sm font-semibold text-amber-800 hover:bg-white dark:border-amber-700 dark:text-amber-200">Website</a>}</div></div>
      </div>
    </div>

    <div className="mx-auto mt-9 max-w-7xl px-4 sm:px-6 lg:px-8"><div className="relative aspect-[16/8] overflow-hidden rounded-[2rem] bg-gradient-to-br from-amber-200 via-orange-100 to-stone-200 shadow-lg shadow-stone-900/10 dark:from-amber-900 dark:to-zinc-800">{place.image_url ? <Image src={place.image_url} alt={place.name} fill priority unoptimized className="object-cover" /> : <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,.75),transparent_13%),linear-gradient(135deg,transparent_0_50%,rgba(120,53,15,.13)_50.5%_51%,transparent_51.5%)]" />}</div>{gallery.length > 1 && <div className="mt-3 grid grid-cols-4 gap-3">{gallery.slice(1, 5).map((image, index) => <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-stone-200 dark:bg-zinc-800"><Image src={image} alt={`${place.name} ${index + 2}`} fill unoptimized className="object-cover" /></div>)}</div>}</div>

    <div className="mx-auto mt-10 grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_21rem] lg:px-8">
      <article className="min-w-0"><section><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-700 dark:text-amber-300">Tentang tempat ini</p>{contentBlocks.length > 0 ? <BlockRenderer blocks={contentBlocks} className="mt-4 text-[1.05rem] leading-8" /> : <div className="mt-4 space-y-5 text-[1.05rem] leading-8 text-slate-700 dark:text-zinc-300">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>}</section>
        <section className="mt-10"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-700 dark:text-amber-300">Panduan kunjungan</p><h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Informasi yang perlu diketahui</h2></div></div>{generalInfo.length ? <div className="mt-5 grid gap-3 sm:grid-cols-2">{generalInfo.map((item) => <InfoCard key={item.label} {...item} />)}</div> : <div className="mt-5 rounded-2xl border border-dashed border-stone-300 bg-white p-6 text-sm text-slate-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">Detail kunjungan sedang dilengkapi oleh tim City Guide.</div>}</section>
        {instagramPosts.length > 0 && <section className="mt-10"><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-700 dark:text-amber-300">Dari Instagram</p><h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Lihat suasananya</h2><div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3">{instagramPosts.slice(0, 9).map((post) => <div key={post} className="aspect-square overflow-hidden rounded-2xl bg-stone-100 ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10"><iframe src={instagramEmbedUrl(post)} title={`Instagram ${place.name}`} loading="lazy" className="h-full w-full border-0" allow="encrypted-media" /></div>)}</div></section>}
        <ListingActions name={place.name} />
      </article>
      <aside className="h-fit lg:sticky lg:top-24"><div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10"><div className="border-b border-stone-100 p-5 dark:border-zinc-800"><p className="text-xs font-bold uppercase tracking-[.18em] text-amber-700 dark:text-amber-300">Ringkasan</p><h2 className="mt-2 text-xl font-bold">Rencanakan kunjungan</h2></div><ul className="divide-y divide-stone-100 dark:divide-zinc-800">{highlights.map((highlight) => <li key={highlight} className="flex gap-3 px-5 py-4 text-sm leading-relaxed text-slate-600 dark:text-zinc-300"><span className="mt-0.5 text-amber-600">✓</span>{highlight}</li>)}</ul>{place.maps_url && <div className="p-5"><a href={place.maps_url} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center rounded-xl bg-amber-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300">Dapatkan petunjuk arah</a></div>}</div></aside>
    </div>
  </main>;
}

function InfoCard({ label, value }: DetailItem) { return <div className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"><p className="text-xs font-bold uppercase tracking-[.14em] text-slate-400 dark:text-zinc-500">{label}</p><p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-zinc-200">{value}</p></div>; }
