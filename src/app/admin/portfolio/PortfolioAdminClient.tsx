"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  published: boolean;
  created_at: string;
}

interface PortfolioForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  source_url: string;
  published: boolean;
}

const emptyForm: PortfolioForm = {
  title: "", slug: "", excerpt: "", content: "", image_url: "", source_url: "", published: false,
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function PortfolioAdminClient({ initialItems }: { initialItems: PortfolioItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<PortfolioForm>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setShowForm(true); setError(null); };

  const openEdit = async (id: string) => {
    const supabase = createClient();
    const { data } = await supabase.from("articles").select("*").eq("id", id).single();
    if (data) {
      setForm({
        title: data.title, slug: data.slug, excerpt: data.excerpt ?? "",
        content: data.content ?? "", image_url: data.image_url ?? "",
        source_url: data.source_url ?? "", published: data.published,
      });
      setEditId(id); setShowForm(true); setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    const supabase = createClient();
    const payload = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      excerpt: form.excerpt || null,
      content: form.content || null,
      image_url: form.image_url || null,
      source_url: form.source_url || null,
      category: "Portfolio",
      published: form.published,
      tags: [],
    };

    let err;
    if (editId) {
      ({ error: err } = await supabase.from("articles").update(payload).eq("id", editId));
    } else {
      ({ error: err } = await supabase.from("articles").insert(payload));
    }
    if (err) { setError(err.message); setLoading(false); return; }

    setLoading(false); setShowForm(false);
    const { data } = await supabase.from("articles")
      .select("id, title, slug, excerpt, image_url, published, created_at")
      .eq("category", "Portfolio")
      .order("created_at", { ascending: false });
    setItems(data ?? []);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    const supabase = createClient();
    await supabase.from("articles").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    setDeleteId(null); setLoading(false);
  };

  const togglePublished = async (id: string, cur: boolean) => {
    const supabase = createClient();
    await supabase.from("articles").update({ published: !cur, published_at: !cur ? new Date().toISOString() : null }).eq("id", id);
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, published: !cur } : i));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Portofolio</h1>
          <p className="text-sm text-gray-500">{items.length} proyek — tampil di halaman utama & /portfolio</p>
        </div>
        <button onClick={openCreate}
          className="bg-[#2D7D46] text-white text-sm px-4 py-2 rounded-xl hover:bg-[#236137] transition-colors flex items-center gap-2">
          <span>+</span> Proyek Baru
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col">
            <div className="aspect-square bg-gray-50 relative overflow-hidden">
              {item.image_url ? (
                <Image src={item.image_url} alt={item.title} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center"><span className="text-3xl">🌿</span></div>
              )}
            </div>
            <div className="p-3 flex flex-col gap-2 flex-1">
              <p className="text-xs font-semibold text-gray-800 line-clamp-2">{item.title}</p>
              <div className="flex items-center gap-2 mt-auto">
                <button onClick={() => togglePublished(item.id, item.published)}
                  className={`text-xs px-2 py-0.5 rounded-full font-medium transition-colors ${item.published ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400"}`}>
                  {item.published ? "Publik" : "Draft"}
                </button>
                <button onClick={() => openEdit(item.id)} className="text-xs text-[#2D7D46] hover:underline">Edit</button>
                <button onClick={() => setDeleteId(item.id)} className="text-xs text-red-400 hover:underline">Hapus</button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-4 py-16 text-center text-gray-400 text-sm">
            Belum ada portofolio. Tambahkan proyek pertama!
          </div>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">{editId ? "Edit Proyek" : "Proyek Baru"}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {error && <div className="bg-red-50 text-red-600 text-xs px-3 py-2 rounded-lg">{error}</div>}
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Judul *</label>
                <input required value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: f.slug || slugify(e.target.value) }))}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Slug (URL)</label>
                <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="contoh: website-umkm-gorontalo"
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46] font-mono" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Deskripsi singkat</label>
                <textarea rows={2} value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46] resize-none" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Konten lengkap</label>
                <textarea rows={5} value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46] resize-none" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">URL Gambar</label>
                <input value={form.image_url} onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                  placeholder="https://..."
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]" />
                {form.image_url && (
                  <div className="mt-2 w-24 h-24 relative rounded-xl overflow-hidden border border-gray-100">
                    <Image src={form.image_url} alt="preview" fill className="object-cover" unoptimized />
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">URL Proyek / Link</label>
                <input value={form.source_url} onChange={(e) => setForm((f) => ({ ...f, source_url: e.target.value }))}
                  placeholder="https://..."
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]" />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                  className="w-4 h-4 text-[#2D7D46] rounded" />
                Publikasikan (tampil di situs)
              </label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 text-sm border border-gray-200 text-gray-600 py-2 rounded-xl hover:bg-gray-50">Batal</button>
                <button type="submit" disabled={loading}
                  className="flex-1 text-sm bg-[#2D7D46] text-white py-2 rounded-xl hover:bg-[#236137] disabled:opacity-50">
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <p className="font-semibold text-gray-900 mb-2">Hapus proyek ini?</p>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setDeleteId(null)} className="flex-1 text-sm border border-gray-200 text-gray-600 py-2 rounded-xl">Batal</button>
              <button onClick={() => handleDelete(deleteId)} disabled={loading}
                className="flex-1 text-sm bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 disabled:opacity-50">
                {loading ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
