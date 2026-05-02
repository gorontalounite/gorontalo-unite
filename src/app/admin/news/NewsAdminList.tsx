"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
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

const PAGE_SIZES = [10, 25, 50];

type SortField = "title" | "category" | "published_at" | "created_at";
type SortDir   = "asc" | "desc";

export default function NewsAdminList({ initialItems }: { initialItems: NewsItem[] }) {
  const router = useRouter();

  // ── Table state ──────────────────────────────────────────────
  const [items, setItems]           = useState(initialItems);
  const [globalSearch, setSearch]   = useState("");
  const [catFilter, setCat]         = useState("all");
  const [statusFilter, setStatus]   = useState("all");
  const [sortField, setSortField]   = useState<SortField>("created_at");
  const [sortDir, setSortDir]       = useState<SortDir>("desc");
  const [page, setPage]             = useState(1);
  const [pageSize, setPageSize]     = useState(10);
  const [deleteId, setDeleteId]     = useState<string | null>(null);
  const [deleting, setDeleting]     = useState(false);

  // Unique categories from data
  const categories = useMemo(
    () => ["all", ...Array.from(new Set(items.map((a) => a.category))).sort()],
    [items],
  );

  // ── Filtered + sorted + paginated ───────────────────────────
  const filtered = useMemo(() => {
    let result = [...items];

    // Global search
    if (globalSearch.trim()) {
      const q = globalSearch.toLowerCase();
      result = result.filter(
        (a) => a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q) || a.slug.includes(q),
      );
    }

    // Category filter
    if (catFilter !== "all") result = result.filter((a) => a.category === catFilter);

    // Status filter
    if (statusFilter === "published") result = result.filter((a) => a.published);
    if (statusFilter === "draft")     result = result.filter((a) => !a.published);

    // Sort
    result.sort((a, b) => {
      let aVal: string = "";
      let bVal: string = "";
      if (sortField === "title")       { aVal = a.title;       bVal = b.title; }
      if (sortField === "category")    { aVal = a.category;    bVal = b.category; }
      if (sortField === "published_at"){ aVal = a.published_at ?? a.created_at; bVal = b.published_at ?? b.created_at; }
      if (sortField === "created_at")  { aVal = a.created_at;  bVal = b.created_at; }
      const cmp = aVal.localeCompare(bVal);
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [items, globalSearch, catFilter, statusFilter, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated  = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
    setPage(1);
  };

  const SortIcon = ({ field }: { field: SortField }) =>
    sortField === field ? (
      <span className="ml-0.5 text-[10px]">{sortDir === "asc" ? "▲" : "▼"}</span>
    ) : (
      <span className="ml-0.5 text-[10px] text-gray-300">⬍</span>
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
          <p className="text-sm text-gray-500">{items.length} artikel total · {filtered.length} ditampilkan</p>
        </div>
        <Link
          href="/admin/news/new"
          className="bg-[#2D7D46] text-white text-sm px-4 py-2 rounded-xl hover:bg-[#236137] transition-colors flex items-center gap-2"
        >
          <span>+</span> Berita Baru
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 mb-4">
        {/* Global search */}
        <div className="relative flex-1 min-w-48">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Cari judul, kategori, atau slug…"
            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-[#2D7D46]"
          />
          {globalSearch && (
            <button onClick={() => { setSearch(""); setPage(1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs">✕</button>
          )}
        </div>

        {/* Category filter */}
        <select
          value={catFilter}
          onChange={(e) => { setCat(e.target.value); setPage(1); }}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46] bg-white"
        >
          <option value="all">Semua kategori</option>
          {categories.filter((c) => c !== "all").map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46] bg-white"
        >
          <option value="all">Semua status</option>
          <option value="published">Publik</option>
          <option value="draft">Draft</option>
        </select>

        {/* Page size */}
        <select
          value={pageSize}
          onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46] bg-white"
        >
          {PAGE_SIZES.map((s) => <option key={s} value={s}>{s} / halaman</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {paginated.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            {globalSearch || catFilter !== "all" || statusFilter !== "all"
              ? "Tidak ada hasil untuk filter ini."
              : "Belum ada berita. Buat yang pertama!"}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase select-none">
              <tr>
                <th className="px-4 py-3 text-left">
                  <button type="button" onClick={() => toggleSort("title")}
                    className="flex items-center hover:text-gray-800 transition-colors font-semibold">
                    Judul <SortIcon field="title" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left hidden md:table-cell">
                  <button type="button" onClick={() => toggleSort("category")}
                    className="flex items-center hover:text-gray-800 transition-colors font-semibold">
                    Kategori <SortIcon field="category" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">
                  <button type="button" onClick={() => toggleSort("published_at")}
                    className="flex items-center hover:text-gray-800 transition-colors font-semibold">
                    Tanggal <SortIcon field="published_at" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.map((a) => (
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
                    {new Date(a.published_at ?? a.created_at).toLocaleDateString("id-ID", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
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
                      <Link href={`/admin/news/edit/${a.id}`}
                        className="text-xs text-[#2D7D46] hover:underline font-medium">Edit</Link>
                      <Link href={`/news/${a.slug}`} target="_blank"
                        className="text-xs text-gray-400 hover:underline hidden lg:inline">Lihat →</Link>
                      <button onClick={() => setDeleteId(a.id)}
                        className="text-xs text-red-400 hover:underline">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-gray-500">
            Menampilkan {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} dari {filtered.length} hasil
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 flex items-center justify-center"
            >‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce<(number | "…")[]>((acc, p, i, arr) => {
                if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push("…");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "…" ? (
                  <span key={`ellipsis-${i}`} className="w-8 text-center text-xs text-gray-400">…</span>
                ) : (
                  <button key={p} onClick={() => setPage(p as number)}
                    className={`w-8 h-8 text-xs rounded-lg border transition-colors ${
                      page === p ? "bg-gray-900 text-white border-gray-900" : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >{p}</button>
                )
              )
            }
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 flex items-center justify-center"
            >›</button>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <p className="font-semibold text-gray-900 mb-2">Hapus berita ini?</p>
            <p className="text-sm text-gray-500 mb-5">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 text-sm border border-gray-200 text-gray-600 py-2 rounded-xl hover:bg-gray-50">Batal</button>
              <button onClick={() => handleDelete(deleteId)} disabled={deleting}
                className="flex-1 text-sm bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 disabled:opacity-50">
                {deleting ? "Menghapus…" : "Hapus"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
