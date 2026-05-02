"use client";

import { useState, useRef } from "react";
import { Block, BLOCK_REGISTRY, BlockType } from "./types";

/* ─── Types ─────────────────────────────────────────────────── */
export interface PostMeta {
  title:           string;
  slug:            string;
  excerpt:         string;
  category:        string;
  tags:            string[];
  image_url:       string;
  published:       boolean;
  published_at:    string;
  seo_title:       string;
  seo_description: string;
  focus_keyword?:  string;
  schema_type?:    string;
  allow_comments?: boolean;
  // Portfolio CPT
  project_url?:    string;
  client_name?:    string;
  project_date?:   string;
  role?:           string;
  repo_url?:       string;
  duration?:       string;
  tech_stack?:     string[];
  source_url?:     string;
}

export const EMPTY_META: PostMeta = {
  title: "", slug: "", excerpt: "", category: "", tags: [],
  image_url: "", published: false, published_at: "",
  seo_title: "", seo_description: "",
};

interface Props {
  postType:   "news" | "portfolio";
  meta:       PostMeta;
  onMeta:     (m: PostMeta) => void;
  selectedBlock: Block | null;
  onBlockChange: (b: Block) => void;
}

const NEWS_CATEGORIES = [
  "Wisata","Budaya","Kuliner","Ekonomi","Pendidikan",
  "Kesehatan","Infrastruktur","Sejarah","Good News","Umum",
];

const PORTFOLIO_STACKS = [
  "stack:web-design","stack:programming","stack:data-analytics",
  "stack:editing","stack:carousel-design","stack:videography",
];
const STACK_LABELS: Record<string, string> = {
  "stack:web-design":      "Web Design",
  "stack:programming":     "Programming",
  "stack:data-analytics":  "Data Analytics",
  "stack:editing":         "Video Editing",
  "stack:carousel-design": "Carousel Design",
  "stack:videography":     "Videography",
};

/* ─── Accordion panel ──────────────────────────────────────── */
function Panel({ title, children, defaultOpen = false }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
      >
        {title}
        <span className={`transition-transform duration-200 text-gray-400 ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && <div className="px-4 pb-4 space-y-3">{children}</div>}
    </div>
  );
}

/* ─── Image upload field ────────────────────────────────────── */
function ImageUploadField({ value, onChange, label }: {
  value: string; onChange: (url: string) => void; label?: string;
}) {
  const fileRef  = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = async (file: File) => {
    setLoading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (res.ok) onChange(json.url);
    setLoading(false);
  };

  return (
    <div>
      {label && <label className="text-[11px] font-medium text-gray-500 block mb-1">{label}</label>}
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="w-full h-28 object-cover" onError={(e) => (e.currentTarget.style.display="none")} />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/50 text-white text-xs rounded-full flex items-center justify-center hover:bg-black/70"
          >✕</button>
        </div>
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-[#2D7D46] transition-colors"
        >
          <p className="text-2xl mb-1">🖼</p>
          <p className="text-[11px] text-gray-400">{loading ? "Mengunggah…" : "Klik untuk unggah"}</p>
        </div>
      )}
      <input
        type="text" value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="atau tempel URL gambar…"
        className="mt-1.5 w-full text-[11px] border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#2D7D46]"
      />
      <input ref={fileRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
    </div>
  );
}

/* ─── Category selector with custom option ─────────────────── */
function CategorySelector({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  const [custom, setCustom] = useState("");
  const [adding, setAdding] = useState(false);
  const isPreset = NEWS_CATEGORIES.includes(value);

  return (
    <div className="space-y-1.5">
      <div className="grid grid-cols-2 gap-1">
        {NEWS_CATEGORIES.map((c) => (
          <label key={c} className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 rounded px-1 py-0.5">
            <input type="radio" name="category" value={c}
              checked={value === c}
              onChange={() => onChange(c)}
              className="accent-[#2D7D46]" />
            <span className="text-[11px] text-gray-600">{c}</span>
          </label>
        ))}
        {/* Custom category if set */}
        {!isPreset && value && (
          <label className="flex items-center gap-1.5 cursor-pointer bg-emerald-50 rounded px-1 py-0.5 col-span-2">
            <input type="radio" name="category" value={value}
              checked={true} onChange={() => {}}
              className="accent-[#2D7D46]" />
            <span className="text-[11px] text-emerald-700 font-medium">{value}</span>
          </label>
        )}
      </div>
      {!adding ? (
        <button type="button" onClick={() => setAdding(true)}
          className="text-[11px] text-[#2D7D46] hover:underline flex items-center gap-1">
          + Tambah kategori baru
        </button>
      ) : (
        <div className="flex gap-1 mt-1">
          <input
            autoFocus
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && custom.trim()) { onChange(custom.trim()); setAdding(false); setCustom(""); }
              if (e.key === "Escape") { setAdding(false); setCustom(""); }
            }}
            placeholder="Nama kategori baru…"
            className="flex-1 text-[11px] border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#2D7D46]"
          />
          <button type="button"
            onClick={() => { if (custom.trim()) { onChange(custom.trim()); setAdding(false); setCustom(""); } }}
            className="text-[11px] bg-[#2D7D46] text-white px-2.5 py-1.5 rounded-lg hover:bg-[#236137]">OK</button>
          <button type="button" onClick={() => { setAdding(false); setCustom(""); }}
            className="text-[11px] border border-gray-200 text-gray-500 px-2 py-1.5 rounded-lg hover:bg-gray-50">✕</button>
        </div>
      )}
    </div>
  );
}

/* ─── Tag input ─────────────────────────────────────────────── */
function TagInput({ tags, onChange }: { tags: string[]; onChange: (t: string[]) => void }) {
  const [input, setInput] = useState("");
  const add = () => {
    const v = input.trim();
    if (v && !tags.includes(v)) onChange([...tags, v]);
    setInput("");
  };
  return (
    <div>
      <div className="flex flex-wrap gap-1 mb-1.5">
        {tags.map((t) => (
          <span key={t} className="inline-flex items-center gap-1 text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
            {t}
            <button type="button" onClick={() => onChange(tags.filter((x) => x !== t))} className="text-gray-400 hover:text-red-400">✕</button>
          </span>
        ))}
      </div>
      <div className="flex gap-1">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(); } }}
          placeholder="Tambah tag, tekan Enter…"
          className="flex-1 text-[11px] border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#2D7D46]"
        />
        <button type="button" onClick={add} className="text-[11px] bg-gray-100 text-gray-700 px-2 py-1.5 rounded-lg hover:bg-gray-200">+</button>
      </div>
    </div>
  );
}

/* ─── Block settings panel ──────────────────────────────────── */
function BlockSettingsPanel({ block, onChange }: { block: Block | null; onChange: (b: Block) => void }) {
  if (!block) return (
    <div className="px-4 py-8 text-center text-xs text-gray-400">
      Pilih sebuah blok untuk melihat pengaturannya
    </div>
  );
  const meta = BLOCK_REGISTRY.find((m) => m.type === block.type);
  return (
    <div className="px-4 py-4 space-y-3">
      <p className="text-xs font-semibold text-gray-600">{meta?.icon} {meta?.label}</p>
      {/* Typography */}
      {(block.type === "paragraph" || block.type === "heading") && (
        <div>
          <label className="text-[11px] font-medium text-gray-500 block mb-1">Perataan teks</label>
          <div className="flex gap-1">
            {(["left","center","right"] as const).map((a) => (
              <button key={a} type="button"
                onClick={() => onChange({ ...block, attrs: { ...block.attrs, align: a } })}
                className={`flex-1 text-xs py-1.5 rounded-lg border ${
                  block.attrs.align === a
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {a === "left" ? "⬤⬤⬤" : a === "center" ? "⬤⬤" : "⬤⬤⬤"}
              </button>
            ))}
          </div>
        </div>
      )}
      {block.type === "heading" && (
        <div>
          <label className="text-[11px] font-medium text-gray-500 block mb-1">Level heading</label>
          <div className="flex gap-1">
            {[1,2,3,4,5,6].map((l) => (
              <button key={l} type="button"
                onClick={() => onChange({ ...block, attrs: { ...block.attrs, level: l } })}
                className={`flex-1 text-xs py-1.5 rounded-lg border font-bold ${
                  block.attrs.level === l
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >H{l}</button>
            ))}
          </div>
        </div>
      )}
      {block.type === "image" && (
        <div>
          <label className="text-[11px] font-medium text-gray-500 block mb-1">Ukuran gambar</label>
          <div className="grid grid-cols-2 gap-1">
            {(["small","medium","large","full"] as const).map((s) => (
              <button key={s} type="button"
                onClick={() => onChange({ ...block, attrs: { ...block.attrs, size: s } })}
                className={`text-xs py-1.5 rounded-lg border capitalize ${
                  block.attrs.size === s
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >{s}</button>
            ))}
          </div>
        </div>
      )}
      {block.type === "code" && (
        <div>
          <label className="text-[11px] font-medium text-gray-500 block mb-1">Bahasa</label>
          <select
            value={(block.attrs.language as string) ?? "javascript"}
            onChange={(e) => onChange({ ...block, attrs: { ...block.attrs, language: e.target.value } })}
            className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#2D7D46]"
          >
            {["javascript","typescript","python","html","css","json","bash","sql","php","java","kotlin","swift","go","rust","plaintext"].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
      )}
      {block.type === "list" && (
        <div>
          <label className="text-[11px] font-medium text-gray-500 block mb-1">Jenis daftar</label>
          <div className="flex gap-1">
            {([false, true] as const).map((o) => (
              <button key={String(o)} type="button"
                onClick={() => onChange({ ...block, attrs: { ...block.attrs, ordered: o } })}
                className={`flex-1 text-xs py-1.5 rounded-lg border ${
                  block.attrs.ordered === o
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >{o ? "1. Bernomor" : "• Bullet"}</button>
            ))}
          </div>
        </div>
      )}
      {block.type === "gallery" && (
        <div>
          <label className="text-[11px] font-medium text-gray-500 block mb-1">Jumlah kolom</label>
          <div className="flex gap-1">
            {[2,3,4].map((c) => (
              <button key={c} type="button"
                onClick={() => onChange({ ...block, attrs: { ...block.attrs, columns: c } })}
                className={`flex-1 text-xs py-1.5 rounded-lg border font-medium ${
                  block.attrs.columns === c
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >{c}</button>
            ))}
          </div>
        </div>
      )}
      <p className="text-[10px] text-gray-300 pt-2">ID blok: {block.id.slice(0,8)}…</p>
    </div>
  );
}

/* ─── Main sidebar ──────────────────────────────────────────── */
export default function EditorSidebar({
  postType, meta, onMeta, selectedBlock, onBlockChange, onSlugManualEdit,
}: Props & { onSlugManualEdit?: () => void }) {
  const [tab, setTab] = useState<"post" | "block">("post");

  const setField = <K extends keyof PostMeta>(k: K, v: PostMeta[K]) =>
    onMeta({ ...meta, [k]: v });

  function slugify(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 80);
  }

  return (
    <aside className="w-72 flex-shrink-0 border-l border-gray-200 bg-white flex flex-col h-full overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 flex-shrink-0">
        {(["post","block"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-xs font-semibold transition-colors ${
              tab === t
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {t === "post" ? "Post" : "Blok"}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* ── Block tab ── */}
        {tab === "block" && (
          <BlockSettingsPanel block={selectedBlock} onChange={onBlockChange} />
        )}

        {/* ── Post tab ── */}
        {tab === "post" && (
          <>
            {/* Status & Visibility */}
            <Panel title="Status & Visibilitas" defaultOpen>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-500">Status</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={meta.published}
                    onChange={(e) => setField("published", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2D7D46]"></div>
                </label>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                meta.published ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
              }`}>
                {meta.published ? "Publik" : "Draft"}
              </span>
              <div>
                <label className="text-[11px] font-medium text-gray-500 block mb-1">Tanggal tayang</label>
                <input
                  type="datetime-local"
                  value={meta.published_at}
                  onChange={(e) => setField("published_at", e.target.value)}
                  className="w-full text-[11px] border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#2D7D46]"
                />
              </div>
            </Panel>

            {/* Permalink */}
            <Panel title="Permalink">
              <div>
                <label className="text-[11px] font-medium text-gray-500 block mb-1">Slug URL</label>
                <div className="flex gap-1">
                  <input
                    type="text"
                    value={meta.slug}
                    onChange={(e) => {
                      onSlugManualEdit?.();
                      setField("slug", e.target.value);
                    }}
                    className="flex-1 font-mono text-[11px] border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#2D7D46]"
                  />
                  <button type="button"
                    onClick={() => { setField("slug", slugify(meta.title)); }}
                    className="text-[11px] bg-gray-100 text-gray-600 px-2 py-1.5 rounded-lg hover:bg-gray-200"
                    title="Reset dari judul"
                  >↺</button>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  /{postType === "portfolio" ? "portfolio" : "news"}/{meta.slug || "…"}
                </p>
              </div>
            </Panel>

            {/* Category — news only */}
            {postType === "news" && (
              <Panel title="Kategori" defaultOpen>
                <CategorySelector
                  value={meta.category}
                  onChange={(c) => setField("category", c)}
                />
              </Panel>
            )}

            {/* Stack — portfolio only */}
            {postType === "portfolio" && (
              <Panel title="Jenis Karya (Stack)">
                <div className="space-y-1">
                  {PORTFOLIO_STACKS.map((s) => {
                    const currentTags = meta.tags ?? [];
                    const checked = currentTags.includes(s);
                    return (
                      <label key={s} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg px-1 py-0.5">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            const next = checked
                              ? currentTags.filter((t) => t !== s)
                              : [...currentTags.filter((t) => !t.startsWith("stack:")), s];
                            setField("tags", next);
                          }}
                          className="accent-[#2D7D46]"
                        />
                        <span className="text-[11px] text-gray-600">{STACK_LABELS[s]}</span>
                      </label>
                    );
                  })}
                </div>
              </Panel>
            )}

            {/* Tags */}
            <Panel title="Tag">
              <TagInput
                tags={(meta.tags ?? []).filter((t) => !t.startsWith("stack:"))}
                onChange={(newTags) => {
                  const stackTags = (meta.tags ?? []).filter((t) => t.startsWith("stack:"));
                  setField("tags", [...stackTags, ...newTags]);
                }}
              />
            </Panel>

            {/* Featured image */}
            <Panel title="Gambar Unggulan">
              <ImageUploadField
                value={meta.image_url}
                onChange={(url) => setField("image_url", url)}
              />
            </Panel>

            {/* Excerpt */}
            <Panel title="Ringkasan / Excerpt">
              <textarea
                rows={3}
                value={meta.excerpt}
                onChange={(e) => setField("excerpt", e.target.value)}
                placeholder="Ringkasan singkat yang tampil di halaman daftar…"
                className="w-full text-[11px] border border-gray-200 rounded-lg px-2.5 py-2 outline-none focus:border-[#2D7D46] resize-none"
              />
            </Panel>

            {/* Portfolio CPT fields */}
            {postType === "portfolio" && (
              <Panel title="Detail Proyek">
                {[
                  { key: "project_url",  label: "URL Live Demo",     placeholder: "https://…" },
                  { key: "repo_url",     label: "Repository",        placeholder: "https://github.com/…" },
                  { key: "client_name", label: "Nama Klien",         placeholder: "PT. Contoh" },
                  { key: "role",         label: "Peran / Jabatan",   placeholder: "Lead Developer" },
                  { key: "duration",     label: "Durasi / Timeline", placeholder: "3 bulan" },
                ] .map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label className="text-[11px] font-medium text-gray-500 block mb-1">{label}</label>
                    <input
                      type="text"
                      value={(meta as unknown as Record<string, string>)[key] ?? ""}
                      onChange={(e) => setField(key as keyof PostMeta, e.target.value as never)}
                      placeholder={placeholder}
                      className="w-full text-[11px] border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#2D7D46]"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-[11px] font-medium text-gray-500 block mb-1">Tanggal Proyek</label>
                  <input
                    type="date"
                    value={meta.project_date ?? ""}
                    onChange={(e) => setField("project_date", e.target.value)}
                    className="w-full text-[11px] border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#2D7D46]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-gray-500 block mb-1">Tech Stack (pisah koma)</label>
                  <input
                    type="text"
                    value={(meta.tech_stack ?? []).join(", ")}
                    onChange={(e) => setField("tech_stack", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                    placeholder="Next.js, TypeScript, Supabase…"
                    className="w-full text-[11px] border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#2D7D46]"
                  />
                </div>
              </Panel>
            )}

            {/* Discussion */}
            <Panel title="Diskusi">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={meta.allow_comments ?? false}
                  onChange={(e) => setField("allow_comments", e.target.checked)}
                  className="accent-[#2D7D46]"
                />
                <span className="text-[11px] text-gray-600">Izinkan komentar</span>
              </label>
            </Panel>

            {/* SEO & Distribusi */}
            <Panel title="SEO & Distribusi">
              <div>
                <label className="text-[11px] font-medium text-gray-500 block mb-1">Meta Title</label>
                <input
                  type="text"
                  value={meta.seo_title}
                  onChange={(e) => setField("seo_title", e.target.value)}
                  placeholder={meta.title || "Judul SEO…"}
                  className="w-full text-[11px] border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#2D7D46]"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-gray-500 block mb-1">Meta Description</label>
                <textarea
                  rows={2}
                  value={meta.seo_description}
                  onChange={(e) => setField("seo_description", e.target.value)}
                  placeholder={meta.excerpt || "Deskripsi SEO (max 160 karakter)…"}
                  maxLength={160}
                  className="w-full text-[11px] border border-gray-200 rounded-lg px-2.5 py-2 outline-none focus:border-[#2D7D46] resize-none"
                />
                <p className="text-[10px] text-gray-300 text-right">{meta.seo_description.length}/160</p>
              </div>
              <div>
                <label className="text-[11px] font-medium text-gray-500 block mb-1">
                  Focus Keyword
                  <span className="ml-1 text-gray-300 font-normal">(utama SEO)</span>
                </label>
                <input
                  type="text"
                  value={meta.focus_keyword ?? ""}
                  onChange={(e) => setField("focus_keyword", e.target.value)}
                  placeholder="wisata gorontalo, kuliner khas…"
                  className="w-full text-[11px] border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#2D7D46]"
                />
                {meta.focus_keyword && meta.title && (
                  <p className={`text-[10px] mt-1 ${
                    meta.title.toLowerCase().includes(meta.focus_keyword.toLowerCase())
                      ? "text-emerald-500" : "text-amber-500"
                  }`}>
                    {meta.title.toLowerCase().includes(meta.focus_keyword.toLowerCase())
                      ? "✓ Keyword ada di judul"
                      : "⚠ Keyword belum ada di judul"}
                  </p>
                )}
              </div>
              <div>
                <label className="text-[11px] font-medium text-gray-500 block mb-1">
                  Schema Markup
                </label>
                <select
                  value={meta.schema_type ?? "Article"}
                  onChange={(e) => setField("schema_type", e.target.value)}
                  className="w-full text-[11px] border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#2D7D46]"
                >
                  <option value="Article">Article</option>
                  <option value="NewsArticle">NewsArticle</option>
                  <option value="BlogPosting">BlogPosting</option>
                  <option value="TechArticle">TechArticle</option>
                  {postType === "portfolio" && (
                    <option value="CreativeWork">CreativeWork</option>
                  )}
                </select>
                <p className="text-[10px] text-gray-400 mt-1">
                  Digunakan untuk structured data (Google Rich Results)
                </p>
              </div>
            </Panel>
          </>
        )}
      </div>
    </aside>
  );
}
