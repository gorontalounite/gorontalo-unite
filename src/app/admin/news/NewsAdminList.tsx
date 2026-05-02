"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface NewsItem {
  id:           string;
  title:        string;
  slug:         string;
  category:     string;
  published:    boolean;
  published_at: string | null;
  created_at:   string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Wisata: "bg-emerald-100 text-emerald-700", Budaya: "bg-purple-100 text-purple-700",
  Kuliner: "bg-orange-100 text-orange-700",  Pendidikan: "bg-blue-100 text-blue-700",
  Ekonomi: "bg-amber-100 text-amber-700",    Kesehatan: "bg-red-100 text-red-700",
  "Good News": "bg-emerald-100 text-emerald-700", Umum: "bg-gray-100 text-gray-600",
};

export default function NewsAdminList({ initialItems }: { initialItems: NewsItem[] }) {
  const router   = useRouter();
  const [items, setItems]     = useState(initialItems);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch]   = useState("");

  const filtered = items.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (id: string) => {
    setDeleting(true);
    await fetch("/api/admin/articles", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setItems((prev) => prev.filter((a) => a.id !== id));
    setDeleteId(null);
    setDeleting(false);
    router.refresh();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manajemen Berita</h1>
          <p className="text-sm text-gray-500">{items.length} artikel total</p>
        </div>
        <Link
          href="/admin/news/new"
          className="bg-[#2D7D46] text-white text-sm px-4 py-2 rounded-xl hover:bg-[#236137] transition-colors flex items-center gap-2"
        >
          <span>+</span> Berita Baru
        </Link>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari judul atau kategori…"
          className="w-full sm:w-80 text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            {search ? "Tidak ada hasil untuk pencarian ini." : "Belum ada berita. Buat yang pertama!"}
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
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 truncate max-w-xs">{a.title}</p>
                    <p className="text-xs text-gray-400">/news/{a.slug}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      CATEGORY_COLORS[a.category] ?? "bg-gray-100 text-gray-600"
                    }`}>
                      {a.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-400 text-xs">
                    {new Date(a.published_at ?? a.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      a.published ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      {a.published ? "Publik" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/news/edit/${a.id}`}
                        className="text-xs text-[#2D7D46] hover:underline font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => setDeleteId(a.id)}
                        className="text-xs text-red-400 hover:underline"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <p className="font-semibold text-gray-900 mb-2">Hapus berita ini?</p>
            <p className="text-sm text-gray-500 mb-5">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 text-sm border border-gray-200 text-gray-600 py-2 rounded-xl hover:bg-gray-50">
                Batal
              </button>
              <button onClick={() => handleDelete(deleteId)} disabled={deleting}
                className="flex-1 text-sm bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 disabled:opacity-50">
                {deleting ? "Menghapus…" : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
