"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

interface ArticleForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  published: boolean;
}

const emptyForm: ArticleForm = {
  title: "", slug: "", excerpt: "", content: "",
  image_url: "", category: "Umum", published: false,
};

const CATEGORIES = ["Umum", "Wisata", "Budaya", "Kuliner", "Ekonomi", "Pendidikan", "Kesehatan", "Infrastruktur", "Sejarah"];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 80);
}

export default function ArticlesClient({ initialArticles }: { initialArticles: Article[] }) {
  const router = useRouter();
  const [articles, setArticles] = useState(initialArticles);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<ArticleForm>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setShowForm(true); setError(null); };

  const openEdit = async (id: string) => {
    const supabase = createClient();
    const { data } = await supabase.from("articles").select("*").eq("id", id).single();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const article = data as any;
    if (article) {
      setForm({ title: article.title, slug: article.slug, excerpt: article.excerpt ?? "", content: article.content ?? "",
        image_url: article.image_url ?? "", category: article.category, published: article.published });
      setEditId(id);
      setShowForm(true);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const payload = { ...form, published_at: form.published ? new Date().toISOString() : null };

    if (editId) {
      const { error } = await supabase.from("articles").update(payload).eq("id", editId);
      if (error) { setError(error.message); setLoading(false); return; }
    } else {
      const { error } = await supabase.from("articles").insert(payload);
      if (error) { setError(error.message); setLoading(false); return; }
    }
    setLoading(false);
    setShowForm(false);
    router.refresh();
    // Refresh list
    const { data } = await supabase.from("articles")
      .select("id, title, slug, category, published, published_at, created_at")
      .order("created_at", { ascending: false });
    setArticles(data ?? []);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    const supabase = createClient();
    await supabase.from("articles").delete().eq("id", id);
    setArticles((prev) => prev.filter((a) => a.id !== id));
    setDeleteId(null);
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manajemen Artikel</h1>
          <p className="text-sm text-gray-500">{articles.length} artikel total</p>
        </div>
        <button onClick={openCreate}
          className="bg-[#2D7D46] text-white text-sm px-4 py-2 rounded-xl hover:bg-[#236137] transition-colors flex items-center gap-2">
          <span>+</span> Artikel Baru
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {articles.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">Belum ada artikel. Buat yang pertama!</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Judul</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Kategori</th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">Tanggal</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {articles.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 truncate max-w-xs">{a.title}</p>
                    <p className="text-xs text-gray-400">/news/{a.slug}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{a.category}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-400 text-xs">
                    {new Date(a.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      a.published ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      {a.published ? "Publik" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(a.id)} className="text-xs text-[#2D7D46] hover:underline">Edit</button>
                      <button onClick={() => setDeleteId(a.id)} className="text-xs text-red-400 hover:underline">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">{editId ? "Edit Artikel" : "Artikel Baru"}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {error && <div className="bg-red-50 text-red-600 text-xs px-3 py-2 rounded-lg">{error}</div>}

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Judul *</label>
                <input required value={form.title} onChange={(e) => {
                  setForm((f) => ({ ...f, title: e.target.value, slug: f.slug || slugify(e.target.value) }));
                }}
                className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]" />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Slug *</label>
                <input required value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46] font-mono" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">Kategori</label>
                  <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]">
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" checked={form.published}
                      onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                      className="w-4 h-4 text-[#2D7D46] rounded" />
                    Publikasikan
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Excerpt</label>
                <textarea rows={2} value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46] resize-none" />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Konten</label>
                <textarea rows={6} value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46] resize-none" />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">URL Gambar</label>
                <input value={form.image_url} onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                  placeholder="https://..."
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 text-sm border border-gray-200 text-gray-600 py-2 rounded-xl hover:bg-gray-50">
                  Batal
                </button>
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
            <p className="font-semibold text-gray-900 mb-2">Hapus artikel ini?</p>
            <p className="text-sm text-gray-500 mb-5">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3">
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
