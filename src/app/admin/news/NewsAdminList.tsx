"use client";

import Link from "next/link";
import { useState, useTransition, useCallback } from "react";
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
  Politik:"bg-blue-50 text-blue-700", Pemerintahan:"bg-sky-50 text-sky-700",
  Wisata:"bg-yellow-50 text-yellow-700", Budaya:"bg-purple-50 text-purple-700",
  Ekonomi:"bg-emerald-50 text-emerald-700", Bisnis:"bg-green-50 text-green-700",
  Pendidikan:"bg-teal-50 text-teal-700", Sosial:"bg-orange-50 text-orange-700",
  Kemasyarakatan:"bg-amber-50 text-amber-700", Kesehatan:"bg-red-50 text-red-700",
  Pertanian:"bg-lime-50 text-lime-700", Perikanan:"bg-cyan-50 text-cyan-700",
  Teknologi:"bg-violet-50 text-violet-700", Digital:"bg-indigo-50 text-indigo-700",
  Infrastruktur:"bg-gray-100 text-gray-600", Pembangunan:"bg-stone-50 text-stone-700",
  Hukum:"bg-rose-50 text-rose-700", Keamanan:"bg-pink-50 text-pink-700",
  Agama:"bg-amber-50 text-amber-800", Lingkungan:"bg-green-50 text-green-800",
  Alam:"bg-emerald-50 text-emerald-800", Olahraga:"bg-indigo-50 text-indigo-700",
};

type SortField = "title" | "category" | "published_at" | "created_at";
type SortDir   = "asc" | "desc";

interface Props {
  initialItems:   NewsItem[];
  totalCount:     number;
  page:           number;
  pageSize:       number;
  q:              string;
  category:       string;
  status:         string;
  sortField:      SortField;
  sortDir:        SortDir;
  allCategories:  string[];
}

export default function NewsAdminList({
  initialItems, totalCount, page, pageSize,
  q, category, status, sortField, sortDir, allCategories,
}: Props) {
  const router             = useRouter();
  const [, startT]         = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [searchVal, setSearchVal] = useState(q);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const nav = useCallback((params: Record<string, string>) => {
    const sp = new URLSearchParams({
      q, category, status,
      page: String(page), pageSize: String(pageSize),
      sort: sortField, dir: sortDir,
      ...params,
    });
    // Remove empty keys
    for (const [k, v] of [...sp.entries()]) {
      if (!v || v === "all" || (k === "page" && v === "1")) sp.delete(k);
    }
    startT(() => router.push("/admin/news?" + sp.toString()));
  }, [q, category, status, page, pageSize, sortField, sortDir, router]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) nav({ sort: field, dir: sortDir === "asc" ? "desc" : "asc", page: "1" });
    else nav({ sort: field, dir: "asc", page: "1" });
  };

  const SortIcon = ({ field }: { field: SortField }) =>
    sortField === field
      ? <span className="ml-0.5 text-[10px]">{sortDir === "asc" ? "▲" : "▼"}</span>
      : <span className="ml-0.5 text-[10px] text-gray-300">⬍</span>;

  const handleDelete = async (id: string) => {
    setDeleting(true);
    await fetch("/api/admin/articles", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setDeleteId(null);
    setDeleting(false);
    router.refresh();
  };

  // Search with debounce via simple timeout
  let searchTimer: ReturnType<typeof setTimeout>;
  const handleSearch = (val: string) => {
    setSearchVal(val);
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => nav({ q: val, page: "1" }), 400);
  };

  const publishedCount = initialItems.filter((i) => i.published).length;
  const draftCount     = initialItems.filter((i) => !i.published).length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manajemen Konten</h1>
          <p className="text-sm text-gray-500">
            {totalCount.toLocaleString("id-ID")} total artikel
            {q || category || status !== "all"
              ? ` · ${initialItems.length} di halaman ini`
              : <> · <span className="text-green-600 font-medium">{publishedCount} publik</span> · <span className="text-gray-400">{draftCount} draft</span></>
            }
          </p>
        </div>
        <Link
          href="/admin/news/new"
          className="text-sm px-4 py-2 rounded-xl font-semibold flex items-center gap-2"
          style={{ backgroundColor: "#F5C400", color: "#000" }}
        >
          <span className="text-base leading-none">+</span> Konten Baru
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
          <input
            type="text"
            value={searchVal}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Cari judul atau slug…"
            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-[#F5C400]"
          />
          {searchVal && (
            <button onClick={() => { setSearchVal(""); nav({ q: "", page: "1" }); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs">✕</button>
          )}
        </div>

        {/* Category */}
        <select value={category} onChange={(e) => nav({ category: e.target.value, page: "1" })}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#F5C400] bg-white">
          <option value="">Semua kategori</option>
          {allCategories.map((c) => <option key={c}>{c}</option>)}
        </select>

        {/* Status */}
        <select value={status} onChange={(e) => nav({ status: e.target.value, page: "1" })}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#F5C400] bg-white">
          <option value="all">Semua status</option>
          <option value="published">Publik</option>
          <option value="draft">Draft</option>
        </select>

        {/* Page size */}
        <select value={pageSize} onChange={(e) => nav({ pageSize: e.target.value, page: "1" })}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#F5C400] bg-white">
          {[10, 25, 50].map((s) => <option key={s} value={s}>{s} / halaman</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {initialItems.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            {q || category || status !== "all"
              ? "Tidak ada hasil untuk filter ini."
              : "Belum ada berita."}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase select-none">
              <tr>
                <th className="px-4 py-3 text-left">
                  <button type="button" onClick={() => toggleSort("title")}
                    className="flex items-center hover:text-gray-800 font-semibold">
                    Judul <SortIcon field="title" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left hidden md:table-cell">
                  <button type="button" onClick={() => toggleSort("category")}
                    className="flex items-center hover:text-gray-800 font-semibold">
                    Kategori <SortIcon field="category" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">
                  <button type="button" onClick={() => toggleSort("published_at")}
                    className="flex items-center hover:text-gray-800 font-semibold">
                    Tanggal <SortIcon field="published_at" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {initialItems.map((a) => (
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
                      a.published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      {a.published ? "Publik" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/news/edit/${a.id}`}
                        className="text-xs text-brand hover:underline font-medium">Edit</Link>
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
        <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
          <p className="text-xs text-gray-500">
            Menampilkan {((page - 1) * pageSize + 1).toLocaleString("id-ID")}–{Math.min(page * pageSize, totalCount).toLocaleString("id-ID")} dari {totalCount.toLocaleString("id-ID")} artikel
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => nav({ page: "1" })} disabled={page === 1}
              className="w-8 h-8 text-xs rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 flex items-center justify-center">«</button>
            <button onClick={() => nav({ page: String(page - 1) })} disabled={page === 1}
              className="w-8 h-8 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 flex items-center justify-center">‹</button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
              .reduce<(number | "…")[]>((acc, p, i, arr) => {
                if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push("…");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "…" ? (
                  <span key={`e${i}`} className="w-8 text-center text-xs text-gray-400">…</span>
                ) : (
                  <button key={p} onClick={() => nav({ page: String(p) })}
                    className={`w-8 h-8 text-xs rounded-lg border transition-colors ${
                      page === p ? "bg-gray-900 text-white border-gray-900" : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >{p}</button>
                )
              )
            }

            <button onClick={() => nav({ page: String(page + 1) })} disabled={page === totalPages}
              className="w-8 h-8 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 flex items-center justify-center">›</button>
            <button onClick={() => nav({ page: String(totalPages) })} disabled={page === totalPages}
              className="w-8 h-8 text-xs rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 flex items-center justify-center">»</button>
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
                {deleting ? "Menghapus…" : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
