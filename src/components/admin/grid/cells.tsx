"use client";

import Link from "next/link";
import { useRef, useState } from "react";

/* -------------------------------------------------------------------------
 * Cell primitives shared by the News, City Guide and Reels grids.
 * Everything here is sized for a 44px row: one line, never wrapping.
 * ---------------------------------------------------------------------- */

export function TextCell({ value, muted }: { value: string | null; muted?: boolean }) {
  if (!value) return <span className="text-gray-300">—</span>;
  return <span className={`block truncate ${muted ? "text-gray-500" : "text-gray-800"}`}>{value}</span>;
}

/** Pass `onOpen` to edit in a side panel, or `href` to open an editor page. */
export function TitleCell({ href, onOpen, title, slug }: { href?: string; onOpen?: () => void; title: string; slug?: string }) {
  const label = (
    <>
      <span className="block truncate font-medium text-gray-900 hover:underline">{title || "Tanpa judul"}</span>
      {slug && <span className="block truncate text-[11px] text-gray-400">/{slug}</span>}
    </>
  );
  if (onOpen) {
    return (
      <button type="button" onClick={onOpen} title={title} className="block w-full min-w-0 text-left">
        {label}
      </button>
    );
  }
  return <Link href={href ?? "#"} className="block min-w-0" title={title}>{label}</Link>;
}

export function DateCell({ value }: { value: string | null }) {
  if (!value) return <span className="text-gray-300">—</span>;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return <span className="text-gray-300">—</span>;
  return (
    <span className="block truncate text-gray-600">
      {date.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" })}
    </span>
  );
}

export function ThumbCell({ src, alt = "", portrait }: { src: string | null; alt?: string; portrait?: boolean }) {
  return (
    <div className={`overflow-hidden rounded bg-gray-100 ${portrait ? "h-8 w-[22px]" : "h-6 w-11"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- Supabase Storage + Instagram CDN, both remote and unoptimised here. */}
      {src ? <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" /> : null}
    </div>
  );
}

/**
 * A thumbnail you can set, swap and clear without leaving the row.
 *
 * Clearing only drops the reference — the file stays in the `media` bucket.
 * Deleting it here would break any other row still pointing at the same URL,
 * and nothing tracks that, so the orphan is the safer of the two mistakes.
 */
export function ImageCell({
  src, alt = "", folder = "articles", portrait, onChange, onError,
}: {
  src: string | null;
  alt?: string;
  folder?: "articles" | "reels";
  portrait?: boolean;
  onChange: (next: string | null) => void;
  onError?: (message: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const picker = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setBusy(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", folder);
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error ?? `Unggahan ditolak (${response.status}).`);
      onChange(payload.url as string);
    } catch (cause) {
      onError?.(cause instanceof Error ? cause.message : "Unggahan gagal.");
    } finally {
      setBusy(false);
      // Reset the input, or picking the same file twice in a row fires nothing.
      if (picker.current) picker.current.value = "";
    }
  }

  return (
    <div className="group/img relative inline-flex">
      <button
        type="button"
        onClick={() => picker.current?.click()}
        disabled={busy}
        title={src ? "Ganti gambar" : "Tambah gambar"}
        aria-label={src ? `Ganti gambar ${alt}` : `Tambah gambar ${alt}`}
        className={`flex items-center justify-center overflow-hidden rounded border bg-gray-100 ${
          portrait ? "h-8 w-[22px]" : "h-6 w-11"
        } ${src ? "border-transparent" : "border-dashed border-gray-300"} ${
          busy ? "opacity-40" : "hover:border-[#F5C400]"
        }`}
      >
        {src ? (
          /* eslint-disable-next-line @next/next/no-img-element -- Supabase Storage, remote and unoptimised here. */
          <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <span aria-hidden="true" className="text-[11px] leading-none text-gray-400">+</span>
        )}
      </button>

      {src && !busy && (
        <button
          type="button"
          onClick={() => onChange(null)}
          title="Hapus gambar"
          aria-label={`Hapus gambar ${alt}`}
          className="absolute -right-1.5 -top-1.5 hidden h-3.5 w-3.5 items-center justify-center rounded-full bg-gray-700 text-[8px] leading-none text-white group-hover/img:flex"
        >
          ✕
        </button>
      )}

      <input
        ref={picker}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void upload(file);
        }}
      />
    </div>
  );
}

export function GalleryCell({ images }: { images: string[] }) {
  if (images.length === 0) return <span className="text-gray-300">—</span>;
  return (
    <div className="flex items-center gap-1">
      <ThumbCell src={images[0]} />
      {images.length > 1 && <span className="text-[11px] text-gray-400">+{images.length - 1}</span>}
    </div>
  );
}

/* ------------------------------- editable ------------------------------- */

export interface StatusOption {
  value: string;
  label: string;
  /** Tailwind classes for the pill; the design uses green for the live state. */
  tone: string;
}

export function StatusCell({
  value, options, onChange,
}: {
  value: string;
  options: StatusOption[];
  onChange: (next: string) => void;
}) {
  const active = options.find((option) => option.value === value) ?? options[0];
  return (
    <div className={`relative inline-flex items-center rounded-md pl-2 pr-5 ${active.tone}`}>
      <span className="truncate py-0.5 text-[12px] font-medium">{active.label}</span>
      <span aria-hidden="true" className="pointer-events-none absolute right-1.5 text-[8px] opacity-60">▼</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Ubah status"
        className="absolute inset-0 cursor-pointer opacity-0"
      >
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </div>
  );
}

export function PillSelectCell({
  value, options, onChange, placeholder = "—",
}: {
  value: string | null;
  options: string[];
  onChange: (next: string) => void;
  placeholder?: string;
}) {
  // A value that is not in the list is still shown, so a miscategorised row
  // stays visible instead of silently snapping to the first option.
  const choices = value && !options.includes(value) ? [value, ...options] : options;
  return (
    <div className="relative inline-flex max-w-full items-center rounded-md bg-[#f1f0ee] pl-2 pr-5 text-gray-700">
      <span className="truncate py-0.5 text-[12px]">{value || placeholder}</span>
      <span aria-hidden="true" className="pointer-events-none absolute right-1.5 text-[8px] opacity-50">▼</span>
      <select
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Ubah nilai"
        className="absolute inset-0 cursor-pointer opacity-0"
      >
        <option value="">{placeholder}</option>
        {choices.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  );
}

export function SwitchCell({
  checked, onChange, label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`inline-flex h-[18px] w-[32px] shrink-0 items-center rounded-full p-[2px] transition-colors ${
        checked ? "bg-[#1a7cf5]" : "bg-gray-200"
      }`}
    >
      <span
        className={`h-[14px] w-[14px] rounded-full bg-white shadow-sm transition-[translate] duration-150 ${
          checked ? "translate-x-[14px]" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export function EditableTextCell({
  value, onSave, placeholder = "—", options,
}: {
  value: string | null;
  onSave: (next: string) => void;
  placeholder?: string;
  /** Optional suggestions; the field still accepts anything typed. */
  options?: string[];
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? "");
  const listId = options ? `opts-${Math.abs(hash(options.join("|")))}` : undefined;

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => { setDraft(value ?? ""); setEditing(true); }}
        title={value ?? undefined}
        className="block w-full truncate text-left text-gray-700 hover:text-gray-900"
      >
        {value || <span className="text-gray-300">{placeholder}</span>}
      </button>
    );
  }

  const commit = () => {
    setEditing(false);
    const next = draft.trim();
    if (next !== (value ?? "")) onSave(next);
  };

  return (
    <>
      <input
        autoFocus
        value={draft}
        list={listId}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") commit();
          if (event.key === "Escape") setEditing(false);
        }}
        className="w-full rounded border border-[#F5C400] px-1.5 py-0.5 text-[13px] outline-none"
      />
      {options && (
        <datalist id={listId}>
          {options.map((option) => <option key={option} value={option} />)}
        </datalist>
      )}
    </>
  );
}

function hash(value: string) {
  let out = 0;
  for (let i = 0; i < value.length; i += 1) out = (out * 31 + value.charCodeAt(i)) | 0;
  return out;
}
