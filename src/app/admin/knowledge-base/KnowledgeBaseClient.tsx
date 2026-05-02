"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface KBEntry {
  id: string;
  title: string;
  category: string;
  is_active: boolean;
  created_at: string;
}

interface KBForm {
  title: string;
  content: string;
  category: string;
  tags: string;
  source_url: string;
  is_active: boolean;
}

const emptyForm: KBForm = { title: "", content: "", category: "Umum", tags: "", source_url: "", is_active: true };
const CATEGORIES = ["Umum", "Wisata", "Budaya", "Kuliner", "Ekonomi", "Pendidikan", "Kesehatan", "Infrastruktur", "Sejarah", "Layanan Publik", "Informasi Umum"];

export default function KnowledgeBaseClient({ initialEntries }: { initialEntries: KBEntry[] }) {
  const router = useRouter();
  const [entries, setEntries] = useState(initialEntries);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<KBForm>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = entries.filter(
    (e) => e.title.toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => { setForm(emptyForm); setEditId(null); setShowForm(true); setError(null); };

  const openEdit = async (id: string) => {
    const supabase = createClient();
    const { data } = await supabase.from("knowledge_base").select("*").eq("id", id).single();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entry = data as any;
    if (entry) {
      setForm({ title: entry.title, content: entry.content, category: entry.category,
        tags: (entry.tags ?? []).join(", "), source_url: entry.source_url ?? "", is_active: entry.is_active });
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
    const payload = {
      title: form.title, content: form.content, category: form.category,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      source_url: form.source_url || null,
      is_active: form.is_active,
    };

    if (editId) {
      const { error } = await supabase.from("knowledge_base").update(payload).eq("id", editId);
      if (error) { setError(error.message); setLoading(false); return; }
    } else {
      const { error } = await supabase.from("knowledge_base").insert(payload);
      if (error) { setError(error.message); setLoading(false); return; }
    }
    setLoading(false);
    setShowForm(false);
    router.refresh();
    const { data } = await supabase.from("knowledge_base")
      .select("id, title, category, is_active, created_at")
      .order("created_at", { ascending: false });
    setEntries(data ?? []);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    const supabase = createClient();
    await supabase.from("knowledge_base").delete().eq("id", id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
    setDeleteId(null);
    setLoading(false);
  };

  const toggleActive = async (id: string, current: boolean) => {
    const supabase = createClient();
    await supabase.from("knowledge_base").update({ is_active: !current }).eq("id", id);
    setEntries((prev) => prev.map((e) => e.id === id ? { ...e, is_active: !current } : e));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-sm text-gray-500">{entries.length} entri RAG — digunakan AI chatbot</p>
        </div>
        <button onClick={openCreate}
          className="bg-[#2D7D46] text-white text-sm px-4 py-2 rounded-xl hover:bg-[#236137] transition-colors flex items-center gap-2">
          <span>+</span> Entri Baru
        </button>
      </div>

      <div className="mb-4">
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari entri..." className="w-full sm:w-72 text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            {search ? "Tidak ada hasil" : "Belum ada entri knowledge base."}
          </div>
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
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 truncate max-w-xs">{e.title}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{e.category}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-400 text-xs">
                    {new Date(e.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(e.id, e.is_active)}
                      className={`text-xs px-2 py-0.5 rounded-full font-medium transition-colors ${
                        e.is_active ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400"
                      }`}>
                      {e.is_active ? "Aktif" : "Nonaktif"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(e.id)} className="text-xs text-[#2D7D46] hover:underline">Edit</button>
                      <button onClick={() => setDeleteId(e.id)} className="text-xs text-red-400 hover:underline">Hapus</button>
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
              <h2 className="font-semibold text-gray-900">{editId ? "Edit Entri" : "Entri Baru"}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {error && <div className="bg-red-50 text-red-600 text-xs px-3 py-2 rounded-lg">{error}</div>}

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Judul *</label>
                <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]" />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Konten RAG *</label>
                <textarea required rows={6} value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  placeholder="Masukkan konten yang akan digunakan AI sebagai referensi..."
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46] resize-none" />
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
                    <input type="checkbox" checked={form.is_active} onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
                      className="w-4 h-4 text-[#2D7D46] rounded" />
                    Aktif (dipakai AI)
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Tags (pisah koma)</label>
                <input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                  placeholder="wisata, bahari, gorontalo"
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]" />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">URL Sumber</label>
                <input value={form.source_url} onChange={(e) => setForm((f) => ({ ...f, source_url: e.target.value }))}
                  placeholder="https://..."
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]" />
              </div>

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
            <p className="font-semibold text-gray-900 mb-2">Hapus entri ini?</p>
            <p className="text-sm text-gray-500 mb-5">AI tidak akan lagi menggunakan data ini.</p>
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
