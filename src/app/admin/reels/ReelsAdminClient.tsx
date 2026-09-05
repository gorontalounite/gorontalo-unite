"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export interface AdminReel {
  id: string;
  account_username: string;
  description: string;
  publish_time: string;
  permalink: string;
  post_type: string;
  category: string;
  sponsored: boolean;
  thumbnail_url: string | null;
  status: "draft" | "published";
  display_order: number;
  featured: boolean;
  views: number;
  reach: number;
  likes: number;
  shares: number;
  follows: number;
  comments: number;
  saves: number;
  created_at: string;
  updated_at: string;
}

type ReelForm = Omit<AdminReel, "id" | "created_at" | "updated_at">;

const DEFAULT_CATEGORIES = ["Wisata", "Food", "Event", "Brand"];
const METRICS: Array<{ key: keyof Pick<ReelForm, "views" | "reach" | "likes" | "shares" | "follows" | "comments" | "saves">; label: string }> = [
  { key: "views", label: "Views" },
  { key: "reach", label: "Reach" },
  { key: "likes", label: "Likes" },
  { key: "shares", label: "Shares" },
  { key: "follows", label: "Follows" },
  { key: "comments", label: "Comments" },
  { key: "saves", label: "Saves" },
];

function datetimeLocal(value: string) {
  const date = new Date(value);
  const pad = (part: number) => String(part).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function emptyForm(): ReelForm {
  return {
    account_username: "gorontalo.unite",
    description: "",
    publish_time: datetimeLocal(new Date().toISOString()),
    permalink: "",
    post_type: "Reel",
    category: "Wisata",
    sponsored: false,
    thumbnail_url: "",
    status: "draft",
    display_order: 0,
    featured: false,
    views: 0,
    reach: 0,
    likes: 0,
    shares: 0,
    follows: 0,
    comments: 0,
    saves: 0,
  };
}

const fieldClass = "w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-[#F5C400] focus:ring-2 focus:ring-[#F5C400]/10";

export default function ReelsAdminClient({ initialItems, initialError }: { initialItems: AdminReel[]; initialError: string | null }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState(initialItems);
  const [form, setForm] = useState<ReelForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(initialError);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const categories = useMemo(() => [
    ...DEFAULT_CATEGORIES,
    ...[...new Set(items.map((item) => item.category))]
      .filter((category) => !DEFAULT_CATEGORIES.includes(category))
      .sort(),
  ], [items]);

  const visibleItems = useMemo(() => items.filter((item) => {
    const needle = query.toLowerCase();
    const matchesQuery = !needle || item.account_username.toLowerCase().includes(needle) || item.description.toLowerCase().includes(needle);
    return matchesQuery
      && (categoryFilter === "all" || item.category === categoryFilter)
      && (statusFilter === "all" || item.status === statusFilter);
  }), [categoryFilter, items, query, statusFilter]);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm());
    setError(null);
    setShowForm(true);
  }

  function openEdit(item: AdminReel) {
    setEditingId(item.id);
    setForm({
      account_username: item.account_username,
      description: item.description,
      publish_time: datetimeLocal(item.publish_time),
      permalink: item.permalink,
      post_type: item.post_type,
      category: item.category,
      sponsored: item.sponsored,
      thumbnail_url: item.thumbnail_url,
      status: item.status,
      display_order: item.display_order,
      featured: item.featured,
      views: item.views,
      reach: item.reach,
      likes: item.likes,
      shares: item.shares,
      follows: item.follows,
      comments: item.comments,
      saves: item.saves,
    });
    setError(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function uploadThumbnail(file: File) {
    setUploading(true);
    setError(null);
    const body = new FormData();
    body.append("file", file);
    body.append("folder", "reels");
    const response = await fetch("/api/admin/upload", { method: "POST", body });
    const result = await response.json();
    if (!response.ok) setError(result.error ?? "Upload thumbnail gagal.");
    else setForm((current) => ({ ...current, thumbnail_url: result.url }));
    setUploading(false);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    const response = await fetch("/api/admin/reels", {
      method: editingId ? "PATCH" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(editingId ? { ...form, id: editingId } : form),
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.error ?? "Reel gagal disimpan.");
      setSaving(false);
      return;
    }

    const saved = result.data as AdminReel;
    setItems((current) => editingId
      ? current.map((item) => item.id === editingId ? saved : item)
      : [saved, ...current]);
    setShowForm(false);
    setEditingId(null);
    setSaving(false);
    router.refresh();
  }

  async function remove(id: string) {
    const response = await fetch("/api/admin/reels", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const result = await response.json();
    if (!response.ok) setError(result.error ?? "Reel gagal dihapus.");
    else setItems((current) => current.filter((item) => item.id !== id));
    setDeleteId(null);
    router.refresh();
  }

  return (
    <div className="max-w-6xl p-4 sm:p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reels</h1>
          <p className="mt-1 text-sm text-gray-500">Kelola thumbnail, kategori, status, dan insight Reel pilihan.</p>
        </div>
        <button type="button" onClick={openCreate} className="rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-600">
          + Tambah Reel
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">{editingId ? "Edit Reel" : "Reel Baru"}</h2>
              <p className="mt-0.5 text-xs text-gray-400">Kolom bertanda * wajib diisi.</p>
            </div>
            <button type="button" onClick={() => setShowForm(false)} className="rounded-lg px-2 py-1 text-sm text-gray-400 hover:bg-gray-100">✕</button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-medium text-gray-700">Account username *
                  <input required value={form.account_username} onChange={(e) => setForm({ ...form, account_username: e.target.value })} className={`${fieldClass} mt-1`} placeholder="gorontalo.unite" />
                </label>
                <label className="text-xs font-medium text-gray-700">Post type *
                  <input required value={form.post_type} onChange={(e) => setForm({ ...form, post_type: e.target.value })} className={`${fieldClass} mt-1`} placeholder="Reel" />
                </label>
              </div>

              <label className="block text-xs font-medium text-gray-700">Description *
                <textarea required rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${fieldClass} mt-1 resize-y`} placeholder="Caption atau deskripsi singkat Reel..." />
              </label>

              <label className="block text-xs font-medium text-gray-700">Permalink Instagram *
                <input required type="url" value={form.permalink} onChange={(e) => setForm({ ...form, permalink: e.target.value })} className={`${fieldClass} mt-1`} placeholder="https://www.instagram.com/reel/.../" />
              </label>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <label className="text-xs font-medium text-gray-700">Publish time *
                  <input required type="datetime-local" value={form.publish_time} onChange={(e) => setForm({ ...form, publish_time: e.target.value })} className={`${fieldClass} mt-1`} />
                </label>
                <label className="text-xs font-medium text-gray-700">Kategori *
                  <input required list="reel-category-options" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={`${fieldClass} mt-1`} placeholder="Wisata" />
                  <datalist id="reel-category-options">
                    {categories.map((category) => <option key={category} value={category} />)}
                  </datalist>
                  <span className="mt-1 block text-[10px] font-normal leading-relaxed text-gray-400">Pilih kategori yang ada atau ketik kategori baru. Default: Wisata.</span>
                </label>
                <label className="text-xs font-medium text-gray-700">Status *
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as AdminReel["status"] })} className={`${fieldClass} mt-1`}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </label>
                <label className="text-xs font-medium text-gray-700">Urutan tampil
                  <input min="0" type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} className={`${fieldClass} mt-1`} />
                </label>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Instagram Insights</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {METRICS.map(({ key, label }) => (
                    <label key={key} className="text-xs font-medium text-gray-700">{label}
                      <input min="0" step="1" type="number" value={form[key]} onChange={(e) => setForm({ ...form, [key]: Number(e.target.value) })} className={`${fieldClass} mt-1`} />
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                <label className="inline-flex items-start gap-2 text-sm font-medium text-gray-700">
                  <input type="checkbox" checked={form.sponsored} onChange={(e) => setForm({ ...form, sponsored: e.target.checked })} className="mt-0.5 h-4 w-4 accent-violet-500" />
                  <span>
                    Sponsored
                    <span className="mt-0.5 block text-[10px] font-normal leading-relaxed text-gray-400">Tampilkan label Sponsored untuk konten kerja sama atau berbayar.</span>
                  </span>
                </label>
                <label className="inline-flex items-start gap-2 text-sm font-medium text-gray-700">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="mt-0.5 h-4 w-4 accent-amber-500" />
                  <span>
                    Featured Reel
                    <span className="mt-0.5 block text-[10px] font-normal leading-relaxed text-gray-400">Prioritaskan Reel ini agar tampil sebelum Reel non-featured.</span>
                  </span>
                </label>
              </div>
            </div>

            <div>
              <p className="mb-1 text-xs font-medium text-gray-700">Thumbnail 9:16</p>
              <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="relative flex aspect-[9/16] w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50 text-center text-xs text-gray-400 hover:border-amber-400 disabled:opacity-60">
                {form.thumbnail_url ? (
                  <Image src={form.thumbnail_url} alt="Preview thumbnail" fill sizes="280px" className="object-cover" unoptimized />
                ) : (
                  <span className="max-w-[180px] px-4">{uploading ? "Mengunggah…" : "Klik untuk mengunggah. Jika dikosongkan, thumbnail otomatis diambil dari permalink Instagram saat disimpan."}</span>
                )}
              </button>
              <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) uploadThumbnail(file); }} />
              {form.thumbnail_url && (
                <button type="button" onClick={() => setForm({ ...form, thumbnail_url: "" })} className="mt-2 text-xs text-red-500 hover:underline">Hapus dan ambil ulang dari Instagram</button>
              )}
            </div>
          </div>

          {error && <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
          <div className="mt-6 flex justify-end gap-2 border-t border-gray-100 pt-4">
            <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">Batal</button>
            <button disabled={saving || uploading} className="rounded-xl bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-black disabled:opacity-50">
              {saving ? (form.thumbnail_url ? "Menyimpan…" : "Mengambil thumbnail…") : "Simpan Reel"}
            </button>
          </div>
        </form>
      )}

      {!showForm && error && <p className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <div className="mb-4 grid gap-2 sm:grid-cols-[1fr_160px_160px]">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari username atau deskripsi…" className={fieldClass} />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={fieldClass}>
          <option value="all">Semua kategori</option>
          {categories.map((category) => <option key={category}>{category}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={fieldClass}>
          <option value="all">Semua status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {visibleItems.length === 0 ? (
          <p className="px-5 py-16 text-center text-sm text-gray-400">Belum ada Reel untuk filter ini.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {visibleItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
                <div className="relative h-24 w-[54px] shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {item.thumbnail_url && <Image src={item.thumbnail_url} alt="" fill sizes="54px" className="object-cover" unoptimized />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">@{item.account_username}</p>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">{item.category}</span>
                    {item.sponsored && <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-700">Sponsored</span>}
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${item.status === "published" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{item.status === "published" ? "Published" : "Draft"}</span>
                    {item.featured && <span className="text-[10px] font-semibold text-amber-600">★ Featured</span>}
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">{item.description}</p>
                  <p className="mt-2 text-[11px] text-gray-400">{new Date(item.publish_time).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })} · {item.views.toLocaleString("id-ID")} views · {item.reach.toLocaleString("id-ID")} reach · urutan {item.display_order}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row">
                  <button type="button" onClick={() => openEdit(item)} className="text-xs font-medium text-amber-600 hover:underline">Edit</button>
                  <a href={item.permalink} target="_blank" rel="noreferrer" className="hidden text-xs text-gray-400 hover:underline sm:inline">Instagram ↗</a>
                  <button type="button" onClick={() => setDeleteId(item.id)} className="text-xs text-red-400 hover:underline">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <p className="font-semibold text-gray-900">Hapus Reel ini?</p>
            <p className="mt-1 text-sm text-gray-500">Data insight akan ikut dihapus.</p>
            <div className="mt-5 flex gap-2">
              <button type="button" onClick={() => setDeleteId(null)} className="flex-1 rounded-xl border border-gray-200 py-2 text-sm text-gray-600">Batal</button>
              <button type="button" onClick={() => remove(deleteId)} className="flex-1 rounded-xl bg-red-500 py-2 text-sm font-semibold text-white">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
