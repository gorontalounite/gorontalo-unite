"use client";

import { useRef, useState, type ReactNode } from "react";

/* Header, toolbar, bulk bar and pagination — identical on all three screens so
   News, City Guide and Reels read as one dashboard rather than three. */

const CONTROL = "rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#F5C400]";

export function GridHeader({ title, summary, actions }: { title: string; summary: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        <p className="mt-0.5 text-sm text-gray-500">{summary}</p>
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

export function CountSummary({
  total, filtered, published, draft, noun, filtering,
}: {
  total: number;
  filtered: number;
  published: number;
  draft: number;
  noun: string;
  filtering: boolean;
}) {
  return (
    <>
      {total.toLocaleString("id-ID")} total {noun}
      {filtering ? (
        ` · ${filtered.toLocaleString("id-ID")} cocok dengan filter`
      ) : (
        <>
          {" · "}<span className="font-medium text-green-600">{published.toLocaleString("id-ID")} publik</span>
          {" · "}<span className="text-gray-400">{draft.toLocaleString("id-ID")} draft</span>
        </>
      )}
    </>
  );
}

export function GridToolbar({
  search, onSearch, placeholder,
  category, categories, onCategory, categoryLabel = "Semua kategori",
  status, statuses, onStatus,
  pageSize, onPageSize,
}: {
  search: string;
  onSearch: (value: string) => void;
  placeholder: string;
  category: string;
  categories: string[];
  onCategory: (value: string) => void;
  categoryLabel?: string;
  status: string;
  statuses: Array<{ value: string; label: string }>;
  onStatus: (value: string) => void;
  pageSize: number;
  onPageSize: (value: string) => void;
}) {
  const [draft, setDraft] = useState(search);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const type = (value: string) => {
    setDraft(value);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => onSearch(value), 400);
  };

  return (
    <div className="mb-4 flex flex-wrap gap-3">
      <div className="relative min-w-48 flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">🔍</span>
        <input
          type="text"
          value={draft}
          onChange={(event) => type(event.target.value)}
          placeholder={placeholder}
          className={`${CONTROL} w-full pl-8`}
        />
        {draft && (
          <button
            type="button"
            onClick={() => { setDraft(""); onSearch(""); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      <select value={category} onChange={(event) => onCategory(event.target.value)} className={CONTROL}>
        <option value="">{categoryLabel}</option>
        {categories.map((name) => <option key={name} value={name}>{name}</option>)}
      </select>

      <select value={status} onChange={(event) => onStatus(event.target.value)} className={CONTROL}>
        {statuses.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>

      <select value={pageSize} onChange={(event) => onPageSize(event.target.value)} className={CONTROL}>
        {[10, 25, 50].map((size) => <option key={size} value={size}>{size} / halaman</option>)}
      </select>
    </div>
  );
}

export function BulkBar({
  count, onDraft, onDelete, onClear,
}: {
  count: number;
  onDraft: () => void;
  onDelete: () => void;
  onClear: () => void;
}) {
  if (count === 0) return null;
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-[#F5C400]/40 bg-yellow-50 px-4 py-2.5">
      <p className="text-sm font-medium text-gray-700">{count} baris dipilih</p>
      <div className="ml-auto flex items-center gap-2">
        <button type="button" onClick={onDraft} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-white">Jadikan Draft</button>
        <button type="button" onClick={onDelete} className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">Hapus</button>
        <button type="button" onClick={onClear} className="text-xs text-gray-400 hover:text-gray-600">Batalkan pilihan</button>
      </div>
    </div>
  );
}

export function GridPagination({
  page, pageSize, totalCount, noun, onPage,
}: {
  page: number;
  pageSize: number;
  totalCount: number;
  noun: string;
  onPage: (page: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  if (totalPages <= 1) return null;

  const numbers = Array.from({ length: totalPages }, (_, index) => index + 1)
    .filter((value) => value === 1 || value === totalPages || Math.abs(value - page) <= 2)
    .reduce<(number | "…")[]>((accumulator, value, index, all) => {
      if (index > 0 && value - (all[index - 1] as number) > 1) accumulator.push("…");
      accumulator.push(value);
      return accumulator;
    }, []);

  const step = "flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-40";

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-gray-500">
        Menampilkan {((page - 1) * pageSize + 1).toLocaleString("id-ID")}–
        {Math.min(page * pageSize, totalCount).toLocaleString("id-ID")} dari {totalCount.toLocaleString("id-ID")} {noun}
      </p>
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => onPage(1)} disabled={page === 1} className={step}>«</button>
        <button type="button" onClick={() => onPage(page - 1)} disabled={page === 1} className={step}>‹</button>
        {numbers.map((value, index) => value === "…" ? (
          <span key={`gap-${index}`} className="w-8 text-center text-xs text-gray-400">…</span>
        ) : (
          <button
            key={value}
            type="button"
            onClick={() => onPage(value)}
            className={`h-8 w-8 rounded-lg border text-xs transition-colors ${
              page === value ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {value}
          </button>
        ))}
        <button type="button" onClick={() => onPage(page + 1)} disabled={page === totalPages} className={step}>›</button>
        <button type="button" onClick={() => onPage(totalPages)} disabled={page === totalPages} className={step}>»</button>
      </div>
    </div>
  );
}

export function ConfirmDialog({
  title, body, confirmLabel, danger, busy, onCancel, onConfirm,
}: {
  title: string;
  body: string;
  confirmLabel: string;
  danger?: boolean;
  busy?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="mt-1 text-sm text-gray-500">{body}</p>
        <div className="mt-5 flex gap-3">
          <button type="button" onClick={onCancel} disabled={busy} className="flex-1 rounded-xl border border-gray-200 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50">Batal</button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className={`flex-1 rounded-xl py-2 text-sm font-semibold text-white disabled:opacity-50 ${danger ? "bg-red-500 hover:bg-red-600" : "bg-gray-900 hover:bg-black"}`}
          >
            {busy ? "Memproses…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
