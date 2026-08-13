"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import CityGuideRichEditor from "@/components/city-guide/CityGuideRichEditor";
import type { Block } from "@/components/editor/types";

type Item = Record<string, unknown> & { id: string; slug: string; published: boolean; featured: boolean };
type Kind = "wisata" | "event";
const tourismCategories = ["Atraksi & Wisata", "Akomodasi", "Kuliner", "Belanja", "Layanan Publik & Transportasi"];

const slugify = (value: string) => value.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const localDateTime = () => new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().slice(0, 16);

export default function CityGuideManager({ kind, initialItems }: { kind: Kind; initialItems: Item[] }) {
  const isEvent = kind === "event";
  const endpoint = isEvent ? "/api/admin/events" : "/api/admin/tourism";
  const [items, setItems] = useState(initialItems);
  const [editing, setEditing] = useState<Item | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const titleField = isEvent ? "title" : "name";
  const form = useMemo(() => ({
    [titleField]: "", slug: "", description: "", category: isEvent ? "" : "Atraksi & Wisata", listing_details: "{}", content_blocks: "[]", image_url: "", location: "", address: "", maps_url: "", contact: "", featured: false, published: false,
    ...(isEvent ? { venue: "", organizer: "", registration_url: "", price_label: "", starts_at: localDateTime(), ends_at: "" } : { opening_hours: "", website_url: "" }),
  }), [isEvent, titleField]);
  const [values, setValues] = useState<Record<string, string | boolean>>(form);

  function start(item?: Item) {
    setEditing(item ?? null); setError("");
    setValues(item ? Object.fromEntries(Object.entries(form).map(([key, fallback]) => [key, key === "listing_details" ? JSON.stringify(item[key] ?? {}) : key === "content_blocks" ? JSON.stringify((item.listing_details as Record<string, unknown> | null)?.content_blocks ?? []) : key === "featured" || key === "published" ? Boolean(item[key] ?? fallback) : key === "starts_at" || key === "ends_at" ? (item[key] ? String(item[key]).slice(0, 16) : "") : String(item[key] ?? fallback)])) as Record<string, string | boolean> : form);
    setOpen(true);
  }
  function change(key: string, value: string | boolean) {
    setValues((current) => ({ ...current, [key]: value, ...(key === titleField && !editing ? { slug: slugify(String(value)) } : {}) }));
  }
  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; if (!file) return;
    const data = new FormData(); data.append("file", file); setSaving(true); setError("");
    const response = await fetch("/api/admin/upload", { method: "POST", body: data }); const result = await response.json(); setSaving(false);
    if (!response.ok) return setError(result.error ?? "Unggahan gambar gagal.");
    change("image_url", result.url);
  }
  async function submit(event: FormEvent) {
    event.preventDefault(); setSaving(true); setError("");
    let listingDetails: Record<string, string> = {};
    if (!isEvent) { try { listingDetails = JSON.parse(String(values.listing_details || "{}")); } catch { setSaving(false); return setError("Detail listing tidak dapat dibaca."); } }
    let contentBlocks: Block[] = [];
    if (!isEvent) { try { contentBlocks = JSON.parse(String(values.content_blocks || "[]")); } catch { setSaving(false); return setError("Konten listing tidak dapat dibaca."); } }
    const plainDescription = contentBlocks.map((block) => block.content || (Array.isArray(block.attrs?.items) ? block.attrs.items.join(" ") : "")).join(" ").trim();
    const baseValues = Object.fromEntries(Object.entries(values).filter(([key]) => key !== "content_blocks" && key !== "listing_details"));
    const payload = { ...baseValues, ...(!isEvent ? { description: plainDescription, listing_details: { ...listingDetails, content_blocks: contentBlocks } } : {}), ...(isEvent ? { starts_at: new Date(String(values.starts_at)).toISOString(), ends_at: values.ends_at ? new Date(String(values.ends_at)).toISOString() : null } : {}) };
    const response = await fetch(endpoint, { method: editing ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing ? { id: editing.id, ...payload } : payload) });
    const result = await response.json(); setSaving(false);
    if (!response.ok) return setError(result.error ?? "Tidak dapat menyimpan.");
    setItems((current) => editing ? current.map((item) => item.id === editing.id ? result.data : item) : [result.data, ...current]); setOpen(false);
  }
  async function remove(item: Item) {
    if (!window.confirm(`Hapus ${item[titleField]}? Tindakan ini tidak dapat dibatalkan.`)) return;
    const response = await fetch(endpoint, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id }) });
    if (response.ok) setItems((current) => current.filter((row) => row.id !== item.id));
    else setError("Tidak dapat menghapus item.");
  }

  const label = isEvent ? "Event" : "Wisata";
  return <div className="p-6 max-w-6xl">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
      <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-amber-600">City Guide</p><h1 className="mt-1 text-3xl font-bold text-gray-900">{label}</h1><p className="mt-2 text-sm text-gray-500">{isEvent ? "Kelola agenda, detail acara, dan tautan pendaftaran." : "Kelola direktori tempat, lokasi, dan informasi kunjungan."}</p></div>
      <button onClick={() => start()} className="rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-gray-950 hover:bg-amber-300">+ Tambah {label}</button>
    </div>
    {error && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {items.length === 0 ? <div className="px-6 py-16 text-center text-sm text-gray-400">Belum ada {label.toLowerCase()}. Tambahkan entri pertama dari tombol di atas.</div> : <div className="divide-y divide-gray-100">{items.map((item) => <div key={item.id} className="flex items-center gap-4 px-5 py-4"><div className="h-12 w-16 overflow-hidden rounded-lg bg-gray-100">{item.image_url ? <img src={String(item.image_url)} alt="" className="h-full w-full object-cover" /> : null}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-gray-900">{String(item[titleField])}</p><p className="mt-0.5 truncate text-xs text-gray-400">/{item.slug}{isEvent && item.starts_at ? ` · ${new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeZone: "Asia/Makassar" }).format(new Date(String(item.starts_at)))}` : ""}</p></div><span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${item.published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{item.published ? "Publik" : "Draft"}</span><button onClick={() => start(item)} className="text-sm font-medium text-amber-700">Edit</button><button onClick={() => remove(item)} className="text-sm text-gray-400 hover:text-red-600">Hapus</button></div>)}</div>}
    </div>
    {open && <div className="fixed inset-0 z-50 overflow-y-auto bg-black/35 p-4"><div className="mx-auto my-8 max-w-3xl rounded-2xl bg-white shadow-2xl"><form onSubmit={submit} className="p-6"><div className="mb-6 flex items-start justify-between"><div><h2 className="text-xl font-bold text-gray-900">{editing ? `Edit ${label}` : `Tambah ${label}`}</h2><p className="mt-1 text-sm text-gray-500">Simpan sebagai draft dahulu atau terbitkan saat siap.</p></div><button type="button" onClick={() => setOpen(false)} className="text-2xl text-gray-400">×</button></div><div className="grid gap-4 sm:grid-cols-2">
      <Field label={isEvent ? "Nama event" : "Nama tempat"} value={String(values[titleField])} onChange={(v) => change(titleField, v)} required />
      <Field label="Permalink" value={String(values.slug)} onChange={(v) => change("slug", slugify(v))} required prefix="/" />
      {isEvent ? <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium text-gray-700">Deskripsi</label><textarea required value={String(values.description)} onChange={(e) => change("description", e.target.value)} rows={7} className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-amber-400" /></div> : <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium text-gray-700">Konten listing</label><p className="mb-2 text-xs text-gray-500">Tulis bebas seperti artikel: heading, paragraf, daftar, quote, tautan, gambar, itinerary, menu, atau fasilitas.</p><CityGuideRichEditor key={editing?.id ?? "new"} value={parseBlocks(String(values.content_blocks || "[]"))} onChange={(blocks) => change("content_blocks", JSON.stringify(blocks))} /></div>}
      {isEvent ? <Field label="Kategori" value={String(values.category)} onChange={(v) => change("category", v)} /> : <CategoryField value={String(values.category)} onChange={(value) => change("category", value)} />}
      {!isEvent && <ListingDetailsFields category={String(values.category)} value={String(values.listing_details || "{}") } onChange={(value) => change("listing_details", value)} />}
      {isEvent ? <><Field label="Nama venue" value={String(values.venue)} onChange={(v) => change("venue", v)} /><Field label="Mulai (UTC+8)" value={String(values.starts_at)} onChange={(v) => change("starts_at", v)} type="datetime-local" required /><Field label="Selesai (opsional)" value={String(values.ends_at)} onChange={(v) => change("ends_at", v)} type="datetime-local" /></> : <><Field label="Lokasi / kabupaten" value={String(values.location)} onChange={(v) => change("location", v)} /><Field label="Jam buka" value={String(values.opening_hours)} onChange={(v) => change("opening_hours", v)} /></>}
      <Field label="Alamat" value={String(values.address)} onChange={(v) => change("address", v)} /><Field label="Google Maps URL" value={String(values.maps_url)} onChange={(v) => change("maps_url", v)} type="url" />
      {isEvent ? <><Field label="Penyelenggara" value={String(values.organizer)} onChange={(v) => change("organizer", v)} /><Field label="Tautan pendaftaran" value={String(values.registration_url)} onChange={(v) => change("registration_url", v)} type="url" /></> : <Field label="Website" value={String(values.website_url)} onChange={(v) => change("website_url", v)} type="url" />}
      <Field label="Kontak" value={String(values.contact)} onChange={(v) => change("contact", v)} />
      <div><label className="mb-1 block text-sm font-medium text-gray-700">Gambar utama</label><input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={upload} className="block w-full text-sm" />{values.image_url && <img src={String(values.image_url)} alt="Pratinjau" className="mt-2 h-20 w-32 rounded-lg object-cover" />}</div>
    </div><div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-5"><div className="flex gap-4"><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(values.featured)} onChange={(e) => change("featured", e.target.checked)} />Tampilkan di beranda</label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(values.published)} onChange={(e) => change("published", e.target.checked)} />Terbitkan</label></div><button disabled={saving} className="rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-semibold text-gray-950 disabled:opacity-50">{saving ? "Menyimpan…" : "Simpan"}</button></div></form></div></div>}
  </div>;
}

function CategoryField({ value, onChange }: { value: string; onChange: (value: string) => void }) { return <label><span className="mb-1 block text-sm font-medium text-gray-700">Kategori utama</span><select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-400">{tourismCategories.map((category) => <option key={category}>{category}</option>)}</select></label>; }
function parseBlocks(value: string): Block[] { try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? parsed : []; } catch { return []; } }

function ListingDetailsFields({ category, value, onChange }: { category: string; value: string; onChange: (value: string) => void }) {
  let details: Record<string, string | string[]> = {};
  try { details = JSON.parse(value) as Record<string, string | string[]>; } catch { /* validation happens before save */ }
  const posts = Array.isArray(details.instagram_posts) ? details.instagram_posts.filter((post): post is string => typeof post === "string") : [];
  function updateInstagramPosts(next: string[]) { onChange(JSON.stringify({ ...details, instagram_posts: next })); }
  return <InstagramMediaManager category={category} posts={posts} onChange={updateInstagramPosts} />;
}

function InstagramMediaManager({ category, posts, onChange }: { category: string; posts: string[]; onChange: (posts: string[]) => void }) {
  const [draft, setDraft] = useState("");
  function add() { const url = draft.trim(); if (!url || posts.includes(url)) return; onChange([...posts, url]); setDraft(""); }
  return <div className="sm:col-span-2 rounded-xl border border-amber-100 bg-amber-50/60 p-4"><p className="text-sm font-semibold text-gray-900">Media Instagram</p><p className="mt-1 text-xs text-gray-500">Tambahkan beberapa URL post atau reel Instagram untuk {category}. Konten naratif, fasilitas, itinerary, menu, dan aturan ditulis langsung di editor di atas.</p><div className="mt-4 flex gap-2"><input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); add(); } }} placeholder="https://www.instagram.com/p/..." type="url" className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-400" /><button type="button" onClick={add} className="shrink-0 rounded-xl bg-amber-400 px-3 py-2 text-sm font-semibold text-gray-950 hover:bg-amber-300">+ Tambah post</button></div>{posts.length > 0 && <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{posts.map((post) => <div key={post} className="rounded-xl border border-amber-200 bg-white p-3"><p className="truncate text-xs text-slate-600">{post}</p><button type="button" onClick={() => onChange(posts.filter((item) => item !== post))} className="mt-2 text-xs font-semibold text-red-600">Hapus</button></div>)}</div>}</div>;
}

function Field({ label, value, onChange, type = "text", required, prefix }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; prefix?: string }) { return <label><span className="mb-1 block text-sm font-medium text-gray-700">{label}</span><div className="flex rounded-xl border border-gray-200 focus-within:border-amber-400">{prefix && <span className="px-3 py-2 text-sm text-gray-400">{prefix}</span>}<input required={required} type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl bg-transparent px-3 py-2 text-sm outline-none" /></div></label>; }
