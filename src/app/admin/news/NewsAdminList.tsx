"use client";

import Link from "next/link";
import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import AdminGrid, { type GridColumn } from "@/components/admin/grid/AdminGrid";
import {
  DateCell, EditableTextCell, PillSelectCell, StatusCell, SwitchCell, TextCell, ThumbCell, TitleCell,
} from "@/components/admin/grid/cells";
import {
  BulkBar, ConfirmDialog, CountSummary, GridHeader, GridPagination, GridToolbar, StatusTabs, TrashRowActions,
} from "@/components/admin/grid/GridChrome";
import { useRowEditor } from "@/components/admin/grid/useRowEditor";

export interface NewsRow {
  id:                string;
  title:             string;
  slug:              string;
  category:          string;
  canonicalCategory: string;
  excerpt:           string | null;
  image_url:         string | null;
  video_url:         string | null;
  is_trending:       boolean;
  author_id:         string | null;
  published:         boolean;
  published_at:      string | null;
  created_at:        string;
  /** Null unless the article is in the bin. */
  deleted_at:        string | null;
}

type SortField = "title" | "category" | "published_at" | "created_at";
type SortDir   = "asc" | "desc";

type BulkAction = "draft" | "trash" | "restore" | "purge";

const BULK_COPY: Record<BulkAction, { title: (n: number) => string; body: string; confirm: string }> = {
  draft:   { title: (n) => `Jadikan ${n} artikel draft?`,        body: "Artikel yang dipilih akan disembunyikan dari publik.", confirm: "Jadikan Draft" },
  trash:   { title: (n) => `Pindahkan ${n} artikel ke sampah?`,  body: "Artikel turun dari situs dan bisa dipulihkan dari tab Sampah.", confirm: "Pindahkan" },
  restore: { title: (n) => `Pulihkan ${n} artikel?`,             body: "Artikel kembali sebagai draft, belum terbit lagi.",    confirm: "Pulihkan" },
  purge:   { title: (n) => `Hapus permanen ${n} artikel?`,       body: "Artikel dan seluruh komentarnya hilang untuk selamanya. Tindakan ini tidak dapat dibatalkan.", confirm: "Hapus permanen" },
};

const STATUS_OPTIONS = [
  { value: "published", label: "Live",  tone: "bg-[#e3f6ec] text-[#0f8a52]" },
  { value: "draft",     label: "Draft", tone: "bg-[#f1f0ee] text-gray-600" },
];

interface Props {
  initialItems:  NewsRow[];
  totalCount:    number;
  allCount:      number;
  publishedCount:number;
  draftCount:    number;
  trashCount:    number;
  page:          number;
  pageSize:      number;
  q:             string;
  category:      string;
  status:        string;
  sortField:     SortField;
  sortDir:       SortDir;
  allCategories: string[];
  authors:       Array<{ id: string; name: string }>;
  /** False until the admin-grid migration adds articles.video_url. */
  videoColumnReady: boolean;
}

export default function NewsAdminList({
  initialItems, totalCount, allCount, publishedCount, draftCount, trashCount,
  page, pageSize, q, category, status, sortField, sortDir, allCategories, authors, videoColumnReady,
}: Props) {
  const inTrash = status === "trash";
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState<BulkAction | null>(null);
  const [bulkRunning, setBulkRunning] = useState(false);

  const { rows, update, savingIds, error, setError } = useRowEditor<NewsRow>(initialItems, {
    endpointFor: () => "/api/admin/articles",
  });

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
    startTransition(() => router.push("/admin/news?" + sp.toString()));
  }, [q, category, status, page, pageSize, sortField, sortDir, router]);

  const toggleSort = (field: string) => nav(field === sortField
    ? { sort: field, dir: sortDir === "asc" ? "desc" : "asc", page: "1" }
    : { sort: field, dir: "asc", page: "1" });

  const toggleRow = (id: string) => setSelected((current) => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });
  const toggleAll = () => setSelected((current) =>
    rows.every((row) => current.has(row.id)) ? new Set() : new Set(rows.map((row) => row.id)));

  const runOne = (id: string, action: BulkAction) => fetch("/api/admin/articles", {
    method: action === "trash" || action === "purge" ? "DELETE" : "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      action === "trash"   ? { id }
      : action === "purge" ? { id, permanent: true }
      : action === "restore" ? { id, restore: true }
      : { id, published: false, published_at: null },
    ),
  });

  async function runBulk(action: BulkAction) {
    setBulkRunning(true);
    await Promise.all([...selected].map((id) => runOne(id, action)));
    setBulkRunning(false);
    setBulkAction(null);
    setSelected(new Set());
    router.refresh();
  }

  async function runRow(id: string, action: BulkAction) {
    await runOne(id, action);
    router.refresh();
  }

  const authorName = (id: string | null) => authors.find((author) => author.id === id)?.name ?? "";

  const columns: GridColumn<NewsRow>[] = [
    {
      key: "title", header: "Title", width: 260, frozen: true, sort: "title",
      render: (row) => <TitleCell href={`/admin/news/edit/${row.id}`} title={row.title} slug={row.slug} />,
    },
    {
      key: "status", header: inTrash ? "Sampah" : "Status", width: inTrash ? 150 : 108,
      render: (row) => inTrash ? (
        <TrashRowActions
          onRestore={() => runRow(row.id, "restore")}
          onPurge={() => { setSelected(new Set([row.id])); setBulkAction("purge"); }}
        />
      ) : (
        <StatusCell
          value={row.published ? "published" : "draft"}
          options={STATUS_OPTIONS}
          onChange={(next) => update(row, {
            published: next === "published",
            published_at: next === "published" ? (row.published_at ?? new Date().toISOString()) : null,
          })}
        />
      ),
    },
    {
      key: "thumbnail", header: "Thumbnail", width: 96,
      render: (row) => <ThumbCell src={row.image_url} alt={row.title} />,
    },
    {
      key: "featured", header: "Featured?", width: 96,
      render: (row) => (
        <SwitchCell
          checked={row.is_trending}
          label={`Jadikan ${row.title} berita pilihan`}
          onChange={(next) => update(row, { is_trending: next })}
        />
      ),
    },
    {
      key: "excerpt", header: "Short Description", width: 230,
      render: (row) => <TextCell value={row.excerpt} muted />,
    },
    {
      key: "date", header: "Date", width: 116, sort: "published_at",
      render: (row) => <DateCell value={row.published_at ?? row.created_at} />,
    },
    {
      key: "video", header: "Video URL", width: 200,
      render: (row) => videoColumnReady ? (
        <EditableTextCell
          value={row.video_url}
          placeholder="Tambah URL"
          onSave={(next) => update(row, { video_url: next || null })}
        />
      ) : (
        <span title="Kolom video_url belum ada di database — jalankan migrasi 20260912090000." className="text-gray-300">
          belum aktif
        </span>
      ),
    },
    {
      key: "author", header: "Author", width: 170,
      render: (row) => (
        <PillSelectCell
          value={authorName(row.author_id)}
          options={authors.map((author) => author.name)}
          placeholder="Tanpa penulis"
          onChange={(next) => update(row, {
            author_id: authors.find((author) => author.name === next)?.id ?? null,
          })}
        />
      ),
    },
    {
      key: "category", header: "Category", width: 150, sort: "category",
      render: (row) => (
        <PillSelectCell
          value={row.category || row.canonicalCategory}
          options={allCategories}
          onChange={(next) => update(row, { category: next })}
        />
      ),
    },
  ];

  const filtering = Boolean(q) || Boolean(category) || status !== "all";

  return (
    <div className="p-6">
      <GridHeader
        title="Manajemen Konten"
        summary={<CountSummary total={allCount} filtered={totalCount} published={publishedCount} draft={draftCount} trash={trashCount} noun="artikel" filtering={filtering} />}
        actions={
          <Link href="/admin/news/new" className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold" style={{ backgroundColor: "#F5C400", color: "#000" }}>
            <span className="text-base leading-none">+</span> Konten Baru
          </Link>
        }
      />

      {error && (
        <p className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {error}
          <button type="button" onClick={() => setError(null)} className="text-red-400 hover:text-red-600">✕</button>
        </p>
      )}

      <StatusTabs
        value={status}
        tabs={[
          { value: "all", label: "Semua", count: allCount },
          { value: "published", label: "Publik", count: publishedCount },
          { value: "draft", label: "Draft", count: draftCount },
          { value: "trash", label: "Sampah", count: trashCount },
        ]}
        onChange={(value) => { setSelected(new Set()); nav({ status: value, page: "1" }); }}
      />

      <GridToolbar
        search={q}
        onSearch={(value) => nav({ q: value, page: "1" })}
        placeholder="Cari judul atau slug…"
        category={category}
        categories={allCategories}
        onCategory={(value) => nav({ category: value, page: "1" })}
        pageSize={pageSize}
        onPageSize={(value) => nav({ pageSize: value, page: "1" })}
      />

      <BulkBar
        count={selected.size}
        inTrash={inTrash}
        onDraft={() => setBulkAction("draft")}
        onRestore={() => setBulkAction("restore")}
        onDelete={() => setBulkAction(inTrash ? "purge" : "trash")}
        onClear={() => setSelected(new Set())}
      />

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
        savingIds={savingIds}
        empty={inTrash ? "Sampah kosong." : filtering ? "Tidak ada hasil untuk filter ini." : "Belum ada berita."}
      />

      <GridPagination page={page} pageSize={pageSize} totalCount={totalCount} noun="artikel" onPage={(next) => nav({ page: String(next) })} />

      {bulkAction && (
        <ConfirmDialog
          title={BULK_COPY[bulkAction].title(selected.size)}
          body={BULK_COPY[bulkAction].body}
          confirmLabel={BULK_COPY[bulkAction].confirm}
          danger={bulkAction === "purge"}
          busy={bulkRunning}
          onCancel={() => setBulkAction(null)}
          onConfirm={() => runBulk(bulkAction)}
        />
      )}
    </div>
  );
}
