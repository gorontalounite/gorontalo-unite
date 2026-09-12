"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import AdminGrid, { type GridColumn } from "@/components/admin/grid/AdminGrid";
import { DateCell, PillSelectCell, StatusCell, TextCell, ThumbCell } from "@/components/admin/grid/cells";
import {
  BulkBar, ConfirmDialog, CountSummary, GridHeader, GridPagination, GridToolbar,
} from "@/components/admin/grid/GridChrome";
import { useRowEditor } from "@/components/admin/grid/useRowEditor";
import { DEFAULT_REEL_CATEGORIES } from "@/app/reels/data";

export interface AdminReel {
  id: string;
  title: string | null;
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

type ReelForm = Omit<AdminReel, "id" | "created_at" | "updated_at" | "title"> & { title: string };


const METRICS: Array<{ key: keyof Pick<ReelForm, "views" | "reach" | "likes" | "shares" | "follows" | "comments" | "saves">; label: string }> = [
  { key: "views", label: "Views" },
  { key: "reach", label: "Reach" },
  { key: "likes", label: "Likes" },
  { key: "shares", label: "Shares" },
  { key: "follows", label: "Follows" },
  { key: "comments", label: "Comments" },
  { key: "saves", label: "Saves" },
];

const STATUS_OPTIONS = [
  { value: "published", label: "Live",  tone: "bg-[#e3f6ec] text-[#0f8a52]" },
  { value: "draft",     label: "Draft", tone: "bg-[#f1f0ee] text-gray-600" },
];

function datetimeLocal(value: string) {
  const date = new Date(value);
  const pad = (part: number) => String(part).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function emptyForm(): ReelForm {
  return {
    title: "",
    account_username: "gorontalo.unite",
    description: "",
    publish_time: datetimeLocal(new Date().toISOString()),
    permalink: "",
    post_type: "Reel",
    category: "Tourism",
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

interface Props {
  initialItems: AdminReel[];
  initialError: string | null;
  /** False until the admin-grid migration adds reels.title. */
  titleColumnReady: boolean;
  totalCount: number;
  allCount: number;
  publishedCount: number;
  draftCount: number;
  categories: string[];
  page: number;
  pageSize: number;
  q: string;
  category: string;
  status: string;
  sortField: string;
  sortDir: "asc" | "desc";
}

export default function ReelsAdminClient({
  initialItems, initialError, titleColumnReady, totalCount, allCount, publishedCount, draftCount,
  categories, page, pageSize, q, category, status, sortField, sortDir,
}: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<ReelForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(initialError);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState<"draft" | "delete" | null>(null);
  const [bulkRunning, setBulkRunning] = useState(false);

  const { rows, setRows, update, savingIds, error: rowError, setError: setRowError } = useRowEditor<AdminReel>(initialItems, {
    endpointFor: () => "/api/admin/reels",
    // The full-form PATCH revalidates every field; inline cell edits are narrow.
    bodyFor: (_row, patch) => ({ ...patch, inline: true }),
  });

  // The canonical list first, then anything older that is still on a row.
  const categoryOptions = useMemo(() => [
    ...DEFAULT_REEL_CATEGORIES,
    ...categories.filter((name) => !(DEFAULT_REEL_CATEGORIES as readonly string[]).includes(name)),
  ], [categories]);

  const nav = useCallback((params: Record<string, string>) => {
    const sp = new URLSearchParams({
      q, category, status,
      page: String(page), pageSize: String(pageSize),
      sort: sortField, dir: sortDir,
      ...params,
    });
    for (const [key, value] of [...sp.entries()]) {
      if (!value || value === "all" || (key === "page" && value === "1")) sp.delete(key);
    }
    startTransition(() => router.push("/admin/reels?" + sp.toString()));
  }, [q, category, status, page, pageSize, sortField, sortDir, router]);

  const toggleSort = (field: string) => nav(field === sortField
    ? { sort: field, dir: sortDir === "asc" ? "desc" : "asc", page: "1" }
    : { sort: field, dir: field === "order" ? "asc" : "desc", page: "1" });

  const toggleRow = (id: string) => setSelected((current) => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });
  const toggleAll = () => setSelected((current) =>
    rows.every((row) => current.has(row.id)) ? new Set() : new Set(rows.map((row) => row.id)));

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm());
    setFormError(null);
    setShowForm(true);
  }

  function openEdit(item: AdminReel) {
    setEditingId(item.id);
    setForm({
      title: item.title ?? "",
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
    setFormError(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function uploadThumbnail(file: File) {
    setUploading(true);
    setFormError(null);
    const body = new FormData();
    body.append("file", file);
    body.append("folder", "reels");
    const response = await fetch("/api/admin/upload", { method: "POST", body });
    const result = await response.json();
    if (!response.ok) setFormError(result.error ?? "Upload thumbnail gagal.");
    else setForm((current) => ({ ...current, thumbnail_url: result.url }));
    setUploading(false);
  }

  function payloadOf(id: string | null) {
    const { title, ...rest } = form;
    const base = titleColumnReady ? { ...rest, title } : rest;
    return id ? { ...base, id } : base;
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setFormError(null);
    const response = await fetch("/api/admin/reels", {
      method: editingId ? "PATCH" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payloadOf(editingId)),
    });
    const result = await response.json();
    if (!response.ok) {
      setFormError(result.error ?? "Reel gagal disimpan.");
      setSaving(false);
      return;
    }
    setShowForm(false);
    setEditingId(null);
    setSaving(false);
    router.refresh();
  }

  async function runBulk(action: "draft" | "delete") {
    setBulkRunning(true);
    const ids = [...selected];
    await Promise.all(ids.map((id) => fetch("/api/admin/reels", {
      method: action === "delete" ? "DELETE" : "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(action === "delete" ? { id } : { id, status: "draft", inline: true }),
    })));
    setBulkRunning(false);
    setBulkAction(null);
    setSelected(new Set());
    router.refresh();
  }

  /**
   * Reordering only means anything while the grid is showing display order,
   * so the handles appear on that view alone. Positions are renumbered across
   * the visible page and every row that actually moved is saved.
   */
  const reorderable = sortField === "order";
  async function reorder(draggedId: string, targetId: string) {
    const from = rows.findIndex((row) => row.id === draggedId);
    const to = rows.findIndex((row) => row.id === targetId);
    if (from < 0 || to < 0) return;

    const next = [...rows];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);

    const base = Math.min(...rows.map((row) => row.display_order));
    const renumbered = next.map((row, index) => ({ ...row, display_order: base + index }));
    setRows(renumbered);

    const changed = renumbered.filter((row) => {
      const before = rows.find((item) => item.id === row.id);
      return before && before.display_order !== row.display_order;
    });
    const results = await Promise.all(changed.map((row) => fetch("/api/admin/reels", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: row.id, display_order: row.display_order, inline: true }),
    })));
    if (results.some((response) => !response.ok)) {
      setRowError("Urutan gagal disimpan seluruhnya.");
      router.refresh();
    }
  }

  const columns: GridColumn<AdminReel>[] = [
    {
      // Position on the current page, continuing across pages rather than
      // restarting — the number an editor reads out loud.
      key: "no", header: "No", width: 56, frozen: true,
      render: (_row, index) => <span className="text-gray-500">{(page - 1) * pageSize + index + 1}</span>,
    },
    {
      key: "title", header: "Title", width: 260, frozen: true, sort: "title",
      render: (row) => (
        <button type="button" onClick={() => openEdit(row)} title={row.title ?? row.description} className="block w-full min-w-0 text-left">
          <span className="block truncate font-medium text-gray-900 hover:underline">{row.title || "Tanpa judul"}</span>
          <span className="block truncate text-[11px] text-gray-400">@{row.account_username}</span>
        </button>
      ),
    },
    {
      key: "status", header: "Status", width: 108,
      render: (row) => (
        <StatusCell
          value={row.status}
          options={STATUS_OPTIONS}
          onChange={(next) => update(row, { status: next as AdminReel["status"] })}
        />
      ),
    },
    {
      key: "description", header: "Description", width: 300,
      render: (row) => <TextCell value={row.description} muted />,
    },
    {
      key: "date", header: "Date", width: 116, sort: "publish_time",
      render: (row) => <DateCell value={row.publish_time} />,
    },
    {
      key: "permalink", header: "URL Video Reels", width: 150,
      render: (row) => (
        <a href={row.permalink} target="_blank" rel="noreferrer" title={row.permalink} className="inline-flex items-center gap-2">
          <ThumbCell src={row.thumbnail_url} portrait />
          <span className="text-[11px] text-gray-400 hover:text-gray-600">↗</span>
        </a>
      ),
    },
    {
      key: "category", header: "Category", width: 150, sort: "category",
      render: (row) => (
        <PillSelectCell
          value={row.category}
          options={[...categoryOptions]}
          onChange={(next) => update(row, { category: next })}
        />
      ),
    },
    {
      // Reels have no page of their own, so this opens the public feed
      // already filtered to the reel's category.
      key: "view", header: "View Content", width: 130,
      render: (row) => (
        <a
          href={`/reels?kategori=${encodeURIComponent(row.category.toLowerCase())}`}
          target="_blank"
          rel="noreferrer"
          className="text-[12px] text-gray-500 underline-offset-2 hover:text-gray-900 hover:underline"
        >
          View ↗
        </a>
      ),
    },
  ];

  const filtering = Boolean(q) || Boolean(category) || status !== "all";

  return (
    <div className="p-6">
      <GridHeader
        title="Reels"
        summary={<CountSummary total={allCount} filtered={totalCount} published={publishedCount} draft={draftCount} noun="reel" filtering={filtering} />}
        actions={
          <button type="button" onClick={openCreate} className="rounded-xl px-4 py-2 text-sm font-semibold" style={{ backgroundColor: "#F5C400", color: "#000" }}>
            + Tambah Reel
          </button>
        }
      />

      {(formError || rowError) && (
        <p className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {formError || rowError}
          <button type="button" onClick={() => { setFormError(null); setRowError(null); }} className="text-red-400 hover:text-red-600">✕</button>
        </p>
      )}

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
              {titleColumnReady && <label className="block text-xs font-medium text-gray-700">Judul
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={`${fieldClass} mt-1`} placeholder="Judul singkat untuk dashboard" />
                <span className="mt-1 block text-[10px] font-normal leading-relaxed text-gray-400">Dipakai di tabel admin. Kosongkan jika caption sudah cukup jelas.</span>
              </label>}

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
                  <input required list="reel-category-options" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={`${fieldClass} mt-1`} placeholder="Tourism" />
                  <datalist id="reel-category-options">
                    {categoryOptions.map((name) => <option key={name} value={name} />)}
                  </datalist>
                  <span className="mt-1 block text-[10px] font-normal leading-relaxed text-gray-400">Pilih kategori yang ada atau ketik kategori baru. Default: Tourism.</span>
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

          <div className="mt-6 flex justify-end gap-2 border-t border-gray-100 pt-4">
            <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">Batal</button>
            <button disabled={saving || uploading} className="rounded-xl bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-black disabled:opacity-50">
              {saving ? (form.thumbnail_url ? "Menyimpan…" : "Mengambil thumbnail…") : "Simpan Reel"}
            </button>
          </div>
        </form>
      )}

      <GridToolbar
        search={q}
        onSearch={(value) => nav({ q: value, page: "1" })}
        placeholder="Cari judul, username atau deskripsi…"
        category={category}
        categories={[...categoryOptions]}
        categoryLabel="All"
        onCategory={(value) => nav({ category: value, page: "1" })}
        status={status}
        statuses={[{ value: "all", label: "Semua status" }, { value: "published", label: "Published" }, { value: "draft", label: "Draft" }]}
        onStatus={(value) => nav({ status: value, page: "1" })}
        pageSize={pageSize}
        onPageSize={(value) => nav({ pageSize: value, page: "1" })}
      />

      <BulkBar
        count={selected.size}
        onDraft={() => setBulkAction("draft")}
        onDelete={() => setBulkAction("delete")}
        onClear={() => setSelected(new Set())}
      />

      {!reorderable && (
        <p className="mb-2 text-[11px] text-gray-400">
          Urutan tampil hanya bisa diseret saat tabel diurutkan menurut urutan aslinya — klik ulang header untuk kembali.
        </p>
      )}

      <AdminGrid
        rows={rows}
        columns={columns}
        rowKey={(row) => row.id}
        selected={selected}
        onToggleRow={toggleRow}
        onToggleAll={toggleAll}
        sortField={sortField}
        sortDir={sortDir}
        onSort={toggleSort}
        onReorder={reorderable ? reorder : undefined}
        savingIds={savingIds}
        empty={filtering ? "Tidak ada Reel untuk filter ini." : "Belum ada Reel."}
      />

      <GridPagination page={page} pageSize={pageSize} totalCount={totalCount} noun="reel" onPage={(next) => nav({ page: String(next) })} />

      {bulkAction && (
        <ConfirmDialog
          title={bulkAction === "delete" ? `Hapus ${selected.size} Reel?` : `Jadikan ${selected.size} Reel draft?`}
          body={bulkAction === "delete" ? "Data insight akan ikut dihapus." : "Reel yang dipilih akan disembunyikan dari publik."}
          confirmLabel={bulkAction === "delete" ? "Hapus" : "Jadikan Draft"}
          danger={bulkAction === "delete"}
          busy={bulkRunning}
          onCancel={() => setBulkAction(null)}
          onConfirm={() => runBulk(bulkAction)}
        />
      )}
    </div>
  );
}
