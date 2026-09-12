"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useMemo, useState, useTransition } from "react";
import CityGuideRichEditor from "@/components/city-guide/CityGuideRichEditor";
import type { Block } from "@/components/editor/types";
import AdminGrid, { type GridColumn } from "@/components/admin/grid/AdminGrid";
import {
  DateCell, EditableTextCell, GalleryCell, PillSelectCell, StatusCell, SwitchCell, TextCell, ThumbCell,
} from "@/components/admin/grid/cells";
import {
  BulkBar, ConfirmDialog, CountSummary, GridHeader, GridPagination, GridToolbar,
} from "@/components/admin/grid/GridChrome";
import { useRowEditor } from "@/components/admin/grid/useRowEditor";

type Item = Record<string, unknown> & { id: string; slug: string; published: boolean; featured: boolean; archived?: boolean };
type Kind = "place" | "event";

export type SortField = "title" | "section" | "date";
export type SortDir = "asc" | "desc";

export interface AdminRow {
  id: string;
  kind: Kind;
  title: string;
  slug: string;
  section: string;
  imageUrl: string | null;
  published: boolean;
  archived: boolean;
  featured: boolean;
  description: string | null;
  gallery: string[];
  mapsUrl: string | null;
  location: string | null;
  subcategory: string | null;
  date: string;
  href: string;
  raw: Record<string, unknown>;
}

/** Editing the Category cell writes the real column that sits behind a section. */
const CATEGORY_OF_SECTION: Record<string, string> = {
  Explore: "Atraksi & Wisata",
  Eat: "Kuliner",
  Stay: "Akomodasi",
  Shop: "Belanja",
  Services: "Layanan Publik & Transportasi",
};

const STATUS_OPTIONS = [
  { value: "published", label: "Live",  tone: "bg-[#e3f6ec] text-[#0f8a52]" },
  { value: "draft",     label: "Draft", tone: "bg-[#f1f0ee] text-gray-600" },
  { value: "archived",  label: "Arsip", tone: "bg-[#ece9e3] text-stone-600" },
];

interface Props {
  rows: AdminRow[];
  totalCount: number;
  allCount: number;
  publishedCount: number;
  draftCount: number;
  page: number;
  pageSize: number;
  q: string;
  section: string;
  status: string;
  sortField: SortField;
  sortDir: SortDir;
  sections: string[];
}
type Status = "draft" | "published" | "archived";
const tourismCategories = ["Atraksi & Wisata", "Akomodasi", "Kuliner", "Belanja", "Layanan Publik & Transportasi"];

const slugify = (value: string) => value.toLowerCase().trim().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const localDateTime = () => new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().slice(0, 16);
const statusOf = (published: boolean, archived: boolean): Status => (archived ? "archived" : published ? "published" : "draft");

export default function CityGuideManager({
  rows, totalCount, allCount, publishedCount, draftCount,
  page, pageSize, q, section, status, sortField, sortDir, sections,
}: Props) {
  const router = useRouter();
  const [, startT] = useTransition();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState<"draft" | "delete" | null>(null);
  const [bulkRunning, setBulkRunning] = useState(false);

  const endpointOf = (row: AdminRow) => row.kind === "event" ? "/api/admin/events" : "/api/admin/tourism";
  const { rows: gridRows, update, savingIds, error: rowError, setError: setRowError } = useRowEditor<AdminRow>(rows, {
    endpointFor: endpointOf,
    // Grid fields are named for the editor, not for the two tables underneath.
    bodyFor: (row, patch) => {
      const body: Record<string, unknown> = {};
      if ("published" in patch) body.published = patch.published;
      if ("archived" in patch) body.archived = patch.archived;
      if ("featured" in patch) body.featured = patch.featured;
      if ("mapsUrl" in patch) body.maps_url = patch.mapsUrl;
      if ("subcategory" in patch) body.subcategory = patch.subcategory;
      // An event records a venue where a place records its area.
      if ("location" in patch) body[row.kind === "event" ? "venue" : "location"] = patch.location;
      if ("section" in patch) body.category = CATEGORY_OF_SECTION[String(patch.section)] ?? patch.section;
      return body;
    },
  });

  // The form is shared by both tables, so its shape follows the row being
  // edited rather than the page it sits on.
  const [kind, setKind] = useState<Kind>("place");
  const isEvent = kind === "event";
  const endpoint = isEvent ? "/api/admin/events" : "/api/admin/tourism";
  const [editing, setEditing] = useState<Item | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const titleField = isEvent ? "title" : "name";
  const form = useMemo(() => ({
    [titleField]: "", slug: "", description: "", category: isEvent ? "" : "Atraksi & Wisata", subcategory: "", listing_details: "{}", content_blocks: "[]", image_url: "", location: "", address: "", maps_url: "", latitude: "", longitude: "", tags: "", contact: "", featured: false, published: false, archived: false,
    ...(isEvent ? { venue: "", organizer: "", registration_url: "", price_label: "", starts_at: localDateTime(), ends_at: "" } : { opening_hours: "", website_url: "", price_range: "", gallery: "[]" }),
  }), [isEvent, titleField]);
  const [values, setValues] = useState<Record<string, string | boolean>>(form);

  function start(item?: Item, itemKind: Kind = "place") {
    setKind(itemKind); setEditing(item ?? null); setError("");
    setValues(item ? Object.fromEntries(Object.entries(form).map(([key, fallback]) => [key, key === "listing_details" ? JSON.stringify(item[key] ?? {}) : key === "content_blocks" ? JSON.stringify((item.listing_details as Record<string, unknown> | null)?.content_blocks ?? []) : key === "gallery" ? JSON.stringify(Array.isArray(item.gallery) ? item.gallery : []) : key === "tags" ? (Array.isArray(item.tags) ? (item.tags as string[]).join(", ") : "") : key === "featured" || key === "published" || key === "archived" ? Boolean(item[key] ?? fallback) : key === "starts_at" || key === "ends_at" ? (item[key] ? String(item[key]).slice(0, 16) : "") : String(item[key] ?? fallback)])) as Record<string, string | boolean> : form);
    setOpen(true);
  }
  function change(key: string, value: string | boolean) {
    setValues((current) => ({ ...current, [key]: value, ...(key === titleField && !editing ? { slug: slugify(String(value)) } : {}) }));
  }
  function setStatus(status: Status) {
    setValues((current) => ({ ...current, published: status === "published", archived: status === "archived" }));
  }
  async function uploadImage(file: File): Promise<string | null> {
    const data = new FormData(); data.append("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body: data });
    const result = await response.json();
    if (!response.ok) { setError(result.error ?? "Unggahan gambar gagal."); return null; }
    return String(result.url);
  }
  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; if (!file) return;
    setSaving(true); setError("");
    const url = await uploadImage(file); setSaving(false);
    if (url) change("image_url", url);
  }
  async function uploadGallery(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []); if (files.length === 0) return;
    setSaving(true); setError("");
    const uploaded: string[] = [];
    for (const file of files) { const url = await uploadImage(file); if (url) uploaded.push(url); }
    setSaving(false); event.target.value = "";
    if (uploaded.length > 0) change("gallery", JSON.stringify([...parseGallery(String(values.gallery ?? "[]")), ...uploaded]));
  }
  function removeGalleryImage(url: string) {
    change("gallery", JSON.stringify(parseGallery(String(values.gallery ?? "[]")).filter((item) => item !== url)));
  }
  async function submit(event: FormEvent) {
    event.preventDefault(); setSaving(true); setError("");
    let listingDetails: Record<string, unknown> = {};
    try { listingDetails = JSON.parse(String(values.listing_details || "{}")); } catch { setSaving(false); return setError("Detail listing tidak dapat dibaca."); }
    let contentBlocks: Block[] = [];
    if (!isEvent) { try { contentBlocks = JSON.parse(String(values.content_blocks || "[]")); } catch { setSaving(false); return setError("Konten listing tidak dapat dibaca."); } }
    const plainDescription = contentBlocks.map((block) => block.content || (Array.isArray(block.attrs?.items) ? block.attrs.items.join(" ") : "")).join(" ").trim();
    const tags = String(values.tags || "").split(",").map((tag) => tag.trim()).filter(Boolean);
    const baseValues = Object.fromEntries(Object.entries(values).filter(([key]) => key !== "content_blocks" && key !== "listing_details" && key !== "tags" && key !== "gallery"));
    const payload = {
      ...baseValues,
      tags,
      latitude: values.latitude ? Number(values.latitude) : null,
      longitude: values.longitude ? Number(values.longitude) : null,
      listing_details: !isEvent ? { ...listingDetails, content_blocks: contentBlocks } : listingDetails,
      ...(!isEvent ? { description: plainDescription, gallery: parseGallery(String(values.gallery ?? "[]")) } : {}),
      ...(isEvent ? { starts_at: new Date(String(values.starts_at)).toISOString(), ends_at: values.ends_at ? new Date(String(values.ends_at)).toISOString() : null } : {}),
    };
    const response = await fetch(endpoint, { method: editing ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing ? { id: editing.id, ...payload } : payload) });
    const result = await response.json(); setSaving(false);
    if (!response.ok) return setError(result.error ?? "Tidak dapat menyimpan.");
    setOpen(false); router.refresh();
  }
  const galleryImages = parseGallery(String(values.gallery ?? "[]"));
  const itemWord = isEvent ? "event" : "tempat";
  const filtering = Boolean(q) || Boolean(section) || status !== "all";

  const nav = useCallback((params: Record<string, string>) => {
    const sp = new URLSearchParams({
      q, section, status,
      page: String(page), pageSize: String(pageSize),
      sort: sortField, dir: sortDir,
      ...params,
    });
    for (const [key, value] of [...sp.entries()]) {
      if (!value || value === "all" || (key === "page" && value === "1")) sp.delete(key);
    }
    startT(() => router.push("/admin/city-guide?" + sp.toString()));
  }, [q, section, status, page, pageSize, sortField, sortDir, router, startT]);

  const toggleSort = (field: string) =>
    nav(field === sortField
      ? { sort: field, dir: sortDir === "asc" ? "desc" : "asc", page: "1" }
      : { sort: field, dir: "asc", page: "1" });

  const toggleRow = (id: string) => setSelected((current) => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });
  const toggleAll = () => setSelected((current) =>
    gridRows.every((row) => current.has(row.id)) ? new Set() : new Set(gridRows.map((row) => row.id)));

  async function runBulk(action: "draft" | "delete") {
    setBulkRunning(true);
    const targets = gridRows.filter((row) => selected.has(row.id));
    await Promise.all(targets.map((row) => fetch(endpointOf(row), {
      method: action === "delete" ? "DELETE" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(action === "delete" ? { id: row.id } : { id: row.id, published: false }),
    })));
    setBulkRunning(false);
    setBulkAction(null);
    setSelected(new Set());
    router.refresh();
  }

  const statusValue = (row: AdminRow) => row.archived ? "archived" : row.published ? "published" : "draft";
  const knownLocations = [...new Set(gridRows.map((row) => row.location).filter((value): value is string => Boolean(value)))].sort();

  const columns: GridColumn<AdminRow>[] = [
    {
      key: "thumbnail", header: "Thumbnail", width: 84, frozen: true,
      render: (row) => <ThumbCell src={row.imageUrl} alt={row.title} />,
    },
    {
      key: "title", header: "Title", width: 240, frozen: true, sort: "title",
      render: (row) => (
        <button
          type="button"
          onClick={() => start(row.raw as Item, row.kind)}
          title={row.title}
          className="block w-full min-w-0 text-left"
        >
          <span className="block truncate font-medium text-gray-900 hover:underline">{row.title || "Tanpa nama"}</span>
          <span className="block truncate text-[11px] text-gray-400">/{row.slug}</span>
        </button>
      ),
    },
    {
      key: "status", header: "Status", width: 108,
      render: (row) => (
        <StatusCell
          value={statusValue(row)}
          options={STATUS_OPTIONS}
          onChange={(next) => update(row, { published: next === "published", archived: next === "archived" })}
        />
      ),
    },
    {
      key: "featured", header: "Featured?", width: 96,
      render: (row) => (
        <SwitchCell
          checked={row.featured}
          label={`Tampilkan ${row.title} di beranda`}
          onChange={(next) => update(row, { featured: next })}
        />
      ),
    },
    {
      key: "description", header: "Description", width: 230,
      render: (row) => <TextCell value={row.description} muted />,
    },
    {
      key: "date", header: "Date", width: 116, sort: "date",
      render: (row) => <DateCell value={row.date} />,
    },
    {
      key: "gallery", header: "Galery Foto", width: 110,
      render: (row) => <GalleryCell images={row.gallery} />,
    },
    {
      key: "maps", header: "Maps URL", width: 170,
      render: (row) => (
        <EditableTextCell
          value={row.mapsUrl}
          placeholder="Tambah URL"
          onSave={(next) => update(row, { mapsUrl: next || null })}
        />
      ),
    },
    {
      key: "location", header: "Location", width: 170,
      render: (row) => (
        <EditableTextCell
          value={row.location}
          options={knownLocations}
          placeholder={row.kind === "event" ? "Tambah venue" : "Tambah lokasi"}
          onSave={(next) => update(row, { location: next || null })}
        />
      ),
    },
    {
      key: "category", header: "Category", width: 150, sort: "section",
      render: (row) => row.kind === "event"
        // Events live in their own table, so the section is fixed for them.
        ? <span className="inline-flex rounded-md bg-[#f1f0ee] px-2 py-0.5 text-[12px] text-gray-700">Events</span>
        : (
          <PillSelectCell
            value={row.section}
            options={Object.keys(CATEGORY_OF_SECTION)}
            onChange={(next) => update(row, { section: next })}
          />
        ),
    },
    {
      key: "subcategory", header: "Sub Category", width: 150,
      render: (row) => (
        <EditableTextCell
          value={row.subcategory}
          placeholder="Tambah"
          onSave={(next) => update(row, { subcategory: next || null })}
        />
      ),
    },
  ];

  return <div className="p-6">
    <GridHeader
      title="City Guide"
      summary={<CountSummary total={allCount} filtered={totalCount} published={publishedCount} draft={draftCount} noun="entri" filtering={filtering} />}
      actions={<>
        <button type="button" onClick={() => start(undefined, "place")} className="rounded-xl px-4 py-2 text-sm font-semibold" style={{ backgroundColor: "#F5C400", color: "#000" }}>+ Tempat</button>
        <button type="button" onClick={() => start(undefined, "event")} className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">+ Event</button>
      </>}
    />

    {(error || rowError) && (
      <p className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">
        {error || rowError}
        <button type="button" onClick={() => { setError(""); setRowError(null); }} className="text-red-400 hover:text-red-600">✕</button>
      </p>
    )}

    <GridToolbar
      search={q}
      onSearch={(value) => nav({ q: value, page: "1" })}
      placeholder="Cari nama atau slug…"
      category={section}
      categories={sections}
      onCategory={(value) => nav({ section: value, page: "1" })}
      status={status}
      statuses={[
        { value: "all", label: "Semua status" },
        { value: "published", label: "Publik" },
        { value: "draft", label: "Draft" },
        { value: "archived", label: "Arsip" },
      ]}
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

    <AdminGrid
      rows={gridRows}
      columns={columns}
      rowKey={(row) => row.id}
      selected={selected}
      onToggleRow={toggleRow}
      onToggleAll={toggleAll}
      sortField={sortField}
      sortDir={sortDir}
      onSort={toggleSort}
      savingIds={savingIds}
      empty={filtering ? "Tidak ada hasil untuk filter ini." : "Belum ada entri. Tambahkan yang pertama dari tombol di atas."}
    />

    <GridPagination page={page} pageSize={pageSize} totalCount={totalCount} noun="entri" onPage={(next) => nav({ page: String(next) })} />

    {bulkAction && (
      <ConfirmDialog
        title={bulkAction === "delete" ? `Hapus ${selected.size} entri?` : `Jadikan ${selected.size} entri draft?`}
        body={bulkAction === "delete" ? "Tindakan ini tidak dapat dibatalkan." : "Entri yang dipilih akan disembunyikan dari publik."}
        confirmLabel={bulkAction === "delete" ? "Hapus" : "Jadikan Draft"}
        danger={bulkAction === "delete"}
        busy={bulkRunning}
        onCancel={() => setBulkAction(null)}
        onConfirm={() => runBulk(bulkAction)}
      />
    )}

    {open && <div className="fixed inset-0 z-50 overflow-y-auto bg-black/35 p-4"><div className="mx-auto my-8 max-w-3xl rounded-2xl bg-white shadow-2xl"><form onSubmit={submit} className="p-6"><div className="mb-6 flex items-start justify-between"><div><h2 className="text-xl font-bold text-gray-900">{editing ? `Edit ${itemWord}` : `Tambah ${itemWord}`}</h2><p className="mt-1 text-sm text-gray-500">Simpan sebagai draft dahulu atau terbitkan saat siap.</p></div><button type="button" onClick={() => setOpen(false)} className="text-2xl text-gray-400">×</button></div><div className="grid gap-4 sm:grid-cols-2">
      <Field label={isEvent ? "Nama event" : "Nama tempat"} value={String(values[titleField])} onChange={(v) => change(titleField, v)} required />
      <Field label="Permalink" value={String(values.slug)} onChange={(v) => change("slug", slugify(v))} required prefix="/" />
      {isEvent ? <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium text-gray-700">Deskripsi</label><textarea required value={String(values.description)} onChange={(e) => change("description", e.target.value)} rows={7} className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-amber-400" /></div> : <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium text-gray-700">Konten listing</label><p className="mb-2 text-xs text-gray-500">Tulis bebas seperti artikel: heading, paragraf, daftar, quote, tautan, gambar, itinerary, menu, atau fasilitas.</p><CityGuideRichEditor key={editing?.id ?? "new"} value={parseBlocks(String(values.content_blocks || "[]"))} onChange={(blocks) => change("content_blocks", JSON.stringify(blocks))} /></div>}
      {isEvent ? <Field label="Kategori" value={String(values.category)} onChange={(v) => change("category", v)} /> : <CategoryField value={String(values.category)} onChange={(value) => change("category", value)} />}
      <Field label="Subkategori (opsional)" value={String(values.subcategory)} onChange={(v) => change("subcategory", v)} placeholder={isEvent ? "mis. Konser, Komunitas" : "mis. Cafe, Street Food"} />
      {isEvent ? <><Field label="Nama venue" value={String(values.venue)} onChange={(v) => change("venue", v)} /><Field label="Mulai (UTC+8)" value={String(values.starts_at)} onChange={(v) => change("starts_at", v)} type="datetime-local" required /><Field label="Selesai (opsional)" value={String(values.ends_at)} onChange={(v) => change("ends_at", v)} type="datetime-local" /></> : <><Field label="Lokasi / kabupaten" value={String(values.location)} onChange={(v) => change("location", v)} /><Field label="Jam buka" value={String(values.opening_hours)} onChange={(v) => change("opening_hours", v)} /></>}
      <Field label="Alamat" value={String(values.address)} onChange={(v) => change("address", v)} /><Field label="Google Maps URL" value={String(values.maps_url)} onChange={(v) => change("maps_url", v)} type="url" />
      <Field label="Latitude (opsional)" value={String(values.latitude)} onChange={(v) => change("latitude", v)} type="number" placeholder="0.543" /><Field label="Longitude (opsional)" value={String(values.longitude)} onChange={(v) => change("longitude", v)} type="number" placeholder="123.062" />
      {isEvent ? <><Field label="Penyelenggara" value={String(values.organizer)} onChange={(v) => change("organizer", v)} /><Field label="Tautan pendaftaran" value={String(values.registration_url)} onChange={(v) => change("registration_url", v)} type="url" /><Field label="Harga tiket (opsional)" value={String(values.price_label)} onChange={(v) => change("price_label", v)} placeholder="Gratis / Rp50.000" /></> : <><Field label="Website" value={String(values.website_url)} onChange={(v) => change("website_url", v)} type="url" /><Field label="Rentang harga (opsional)" value={String(values.price_range)} onChange={(v) => change("price_range", v)} placeholder="mis. Rp20rb–50rb" /></>}
      <Field label="Kontak" value={String(values.contact)} onChange={(v) => change("contact", v)} />
      <Field label="Tags (pisahkan koma)" value={String(values.tags)} onChange={(v) => change("tags", v)} placeholder="keluarga, outdoor, gratis" />
      <div><label className="mb-1 block text-sm font-medium text-gray-700">Gambar utama</label><input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={upload} className="block w-full text-sm" />{values.image_url && <img src={String(values.image_url)} alt="Pratinjau" className="mt-2 h-20 w-32 rounded-lg object-cover" />}</div>
      {!isEvent && <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium text-gray-700">Galeri foto</label><p className="mb-2 text-xs text-gray-500">Foto tambahan untuk galeri di halaman listing. Gambar utama selalu tampil pertama.</p><input type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif" onChange={uploadGallery} className="block w-full text-sm" />{galleryImages.length > 0 && <div className="mt-3 flex flex-wrap gap-3">{galleryImages.map((url) => <div key={url} className="relative"><img src={url} alt="" className="h-20 w-28 rounded-lg object-cover" /><button type="button" onClick={() => removeGalleryImage(url)} aria-label="Hapus foto dari galeri" className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white text-sm font-bold leading-none text-red-600 shadow ring-1 ring-gray-200">×</button></div>)}</div>}</div>}
      <SocialLinksFields value={String(values.listing_details || "{}")} onChange={(value) => change("listing_details", value)} label={isEvent ? "Media sosial & promosi" : "Media Instagram & sosial"} />
    </div><div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-5"><div className="flex flex-wrap items-center gap-4"><StatusField value={statusOf(Boolean(values.published), Boolean(values.archived))} onChange={setStatus} /><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(values.featured)} onChange={(e) => change("featured", e.target.checked)} />Tampilkan di beranda</label></div><button disabled={saving} className="rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-semibold text-gray-950 disabled:opacity-50">{saving ? "Menyimpan…" : "Simpan"}</button></div></form></div></div>}
  </div>;
}

function StatusField({ value, onChange }: { value: Status; onChange: (status: Status) => void }) {
  const options: { value: Status; label: string }[] = [{ value: "draft", label: "Draft" }, { value: "published", label: "Terbitkan" }, { value: "archived", label: "Arsipkan" }];
  return <div className="flex items-center gap-1 rounded-xl border border-gray-200 p-1">{options.map((option) => <button key={option.value} type="button" onClick={() => onChange(option.value)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${value === option.value ? "bg-amber-400 text-gray-950" : "text-gray-500 hover:bg-gray-50"}`}>{option.label}</button>)}</div>;
}

function CategoryField({ value, onChange }: { value: string; onChange: (value: string) => void }) { return <label><span className="mb-1 block text-sm font-medium text-gray-700">Kategori utama</span><select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-400">{tourismCategories.map((category) => <option key={category}>{category}</option>)}</select></label>; }
function parseGallery(value: string): string[] { try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : []; } catch { return []; } }
function parseBlocks(value: string): Block[] { try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? parsed : []; } catch { return []; } }

const SOCIAL_PLATFORMS = [
  { key: "instagram_url", label: "Instagram", placeholder: "https://www.instagram.com/..." },
  { key: "facebook_url", label: "Facebook", placeholder: "https://www.facebook.com/..." },
  { key: "tiktok_url", label: "TikTok", placeholder: "https://www.tiktok.com/@..." },
] as const;

function SocialLinksFields({ value, onChange, label }: { value: string; onChange: (value: string) => void; label: string }) {
  let details: Record<string, unknown> = {};
  try { details = JSON.parse(value) as Record<string, unknown>; } catch { /* validation happens before save */ }
  const posts = Array.isArray(details.instagram_posts) ? (details.instagram_posts as unknown[]).filter((post): post is string => typeof post === "string") : [];
  function set(key: string, next: string) { onChange(JSON.stringify({ ...details, [key]: next })); }
  function updatePosts(next: string[]) { onChange(JSON.stringify({ ...details, instagram_posts: next })); }
  return <div className="sm:col-span-2 rounded-xl border border-amber-100 bg-amber-50/60 p-4">
    <p className="text-sm font-semibold text-gray-900">{label}</p>
    <p className="mt-1 text-xs text-gray-500">Tautan akun sosial (opsional) dan post/reel Instagram spesifik untuk listing ini.</p>
    <div className="mt-3 grid gap-3 sm:grid-cols-3">
      {SOCIAL_PLATFORMS.map((platform) => <label key={platform.key}><span className="mb-1 block text-xs font-medium text-gray-700">{platform.label}</span><input type="url" value={typeof details[platform.key] === "string" ? String(details[platform.key]) : ""} onChange={(event) => set(platform.key, event.target.value)} placeholder={platform.placeholder} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-400" /></label>)}
    </div>
    <InstagramMediaManager posts={posts} onChange={updatePosts} />
  </div>;
}

function InstagramMediaManager({ posts, onChange }: { posts: string[]; onChange: (posts: string[]) => void }) {
  const [draft, setDraft] = useState("");
  function add() { const url = draft.trim(); if (!url || posts.includes(url)) return; onChange([...posts, url]); setDraft(""); }
  return <div className="mt-4"><div className="flex gap-2"><input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); add(); } }} placeholder="https://www.instagram.com/p/..." type="url" className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-400" /><button type="button" onClick={add} className="shrink-0 rounded-xl bg-amber-400 px-3 py-2 text-sm font-semibold text-gray-950 hover:bg-amber-300">+ Tambah post</button></div>{posts.length > 0 && <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{posts.map((post) => <div key={post} className="rounded-xl border border-amber-200 bg-white p-3"><p className="truncate text-xs text-slate-600">{post}</p><button type="button" onClick={() => onChange(posts.filter((item) => item !== post))} className="mt-2 text-xs font-semibold text-red-600">Hapus</button></div>)}</div>}</div>;
}

function Field({ label, value, onChange, type = "text", required, prefix, placeholder }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; prefix?: string; placeholder?: string }) { return <label><span className="mb-1 block text-sm font-medium text-gray-700">{label}</span><div className="flex rounded-xl border border-gray-200 focus-within:border-amber-400">{prefix && <span className="px-3 py-2 text-sm text-gray-400">{prefix}</span>}<input required={required} type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl bg-transparent px-3 py-2 text-sm outline-none" /></div></label>; }
