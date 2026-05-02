"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  tags: string[] | null;
  published: boolean;
  created_at: string;
}

interface PortfolioForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  source_url: string;
  stack: string;
  published: boolean;
}

const STACK_OPTIONS = [
  { value: "stack:web-design",      label: "Web Design" },
  { value: "stack:programming",     label: "Programming" },
  { value: "stack:data-analytics",  label: "Data Analytics" },
  { value: "stack:editing",         label: "Video Editing" },
  { value: "stack:carousel-design", label: "Carousel Design" },
  { value: "stack:videography",     label: "Videography" },
];

const emptyForm: PortfolioForm = {
  title: "", slug: "", excerpt: "", content: "",
  image_url: "", source_url: "", stack: "stack:web-design", published: false,
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getStackFromTags(tags: string[] | null): string {
  return tags?.find((t) => t.startsWith("stack:")) ?? "stack:web-design";
}

/* ─── Rich Toolbar ─────────────────────────────────────── */
function RichToolbar({ target }: { target: React.RefObject<HTMLTextAreaElement | null> }) {
  const wrap = (before: string, after: string, placeholder = "") => {
    const el = target.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const selected = value.slice(s, e) || placeholder;
    const newVal = value.slice(0, s) + before + selected + after + value.slice(e);
    const nativeSet = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
    nativeSet?.call(el, newVal);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.focus();
  };
  const insertLine = (prefix: string) => {
    const el = target.current;
    if (!el) return;
    const { selectionStart: s, value } = el;
    const lineStart = value.lastIndexOf("\n", s - 1) + 1;
    const newVal = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    const nativeSet = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
    nativeSet?.call(el, newVal);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.focus();
  };
  const tools = [
    { label: "B", title: "Bold", action: () => wrap("**", "**", "tebal") },
    { label: "I", title: "Italic", action: () => wrap("_", "_", "miring") },
    { label: "H2", title: "Heading 2", action: () => insertLine("## ") },
    { label: "• List", title: "Bullet", action: () => insertLine("- ") },
    { label: "🔗 URL", title: "Link", action: () => wrap("[", "](https://)", "teks") },
    { label: "</> Code", title: "Code", action: () => wrap("`", "`", "kode") },
  ];
  return (
    <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border border-b-0 border-gray-200 rounded-t-xl">
      {tools.map((t) => (
        <button key={t.title} type="button" title={t.title} onClick={t.action}
          className="px-2 py-1 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-100">
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ─── Image field ────────────────────────────────────────── */
function ImageField({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true); setUploadError(null);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (!res.ok) setUploadError(json.error ?? "Upload gagal");
    else onChange(json.url);
    setUploading(false);
  };

  return (
    <div>
      <label className="text-xs font-medium text-gray-700 block mb-1">Gambar Cover</label>
      <div className="flex gap-2">
        <input value={value} onChange={(e) => onChange(e.target.value)}
          placeholder="https://... atau unggah file"
          className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]" />
        <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
          className="text-xs px-3 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 whitespace-nowrap">
          {uploading ? "Mengunggah…" : "📂 Unggah"}
        </button>
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
      {uploadError && <p className="text-xs text-red-500 mt-1">{uploadError}</p>}
      {value && (
        <div className="mt-2 w-full h-32 relative rounded-xl overflow-hidden border border-gray-100">
          <Image src={value} alt="preview" fill className="object-cover" unoptimized />
        </div>
      )}
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────── */
export default function PortfolioAdminClient({ initialItems }: { initialItems: PortfolioItem[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<PortfolioForm>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setShowForm(true); setError(null); };

  const openEdit = async (id: string) => {
    const res = await fetch(`/api/admin/articles?id=${id}`);
    const { data: item } = await res.json();
    if (item) {
      setForm({
        title: item.title, slug: item.slug,
        excerpt: item.excerpt ?? "", content: item.content ?? "",
        image_url: item.image_url ?? "", source_url: item.source_url ?? "",
        stack: getStackFromTags(item.tags),
        published: item.published,
      });
      setEditId(id); setShowForm(true); setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);

    const payload = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      excerpt: form.excerpt || null,
      content: form.content || null,
      image_url: form.image_url || null,
      source_url: form.source_url || null,
      category: "Portfolio",
      tags: [form.stack],
      published: form.published,
      published_at: form.published ? new Date().toISOString() : null,
    };

    const res = await fetch("/api/admin/articles", {
      method: editId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editId ? { id: editId, ...payload } : payload),
    });
    const json = await res.json();
    if (!res.ok) { setError(json.error ?? "Terjadi kesalahan"); setLoading(false); return; }

    setLoading(false); setShowForm(false); router.refresh();
    const listRes = await fetch("/api/admin/articles?category=Portfolio");
    const { data } = await listRes.json();
    setItems(data ?? []);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await fetch("/api/admin/articles", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setItems((prev) => prev.filter((i) => i.id !== id));
    setDeleteId(null); setLoading(false);
  };

  const togglePublished = async (id: string, cur: boolean) => {
    await fetch("/api/admin/articles", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, published: !cur, published_at: !cur ? new Date().toISOString() : null }),
    });
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, published: !cur } : i));
  };

  const getStackLabel = (tags: string[] | null) => {
    const tag = tags?.find((t) => t.startsWith("stack:"));
    return STACK_OPTIONS.find((s) => s.value === tag)?.label ?? "—";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Portofolio</h1>
          <p className="text-sm text-gray-500">{items.length} proyek — tampil di halaman utama & /portfolio</p>
        </div>
        <button onClick={openCreate}
          className="bg-[#2D7D46] text-white text-sm px-4 py-2 rounded-xl hover:bg-[#236137] transition-colors flex items-center gap-2">
          <span>+</span> Proyek Baru
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 flex flex-col">
            <div className="aspect-square bg-gray-50 relative overflow-hidden">
              {item.image_url ? (
                <Image src={item.image_url} alt={item.title} fill className="object-cover" unoptimized />
              ) : (
                <div className="w-full h-full flex items-center justify-center"><span className="text-3xl">🌿</span></div>
              )}
              <span className="absolute top-2 left-2 text-[10px] font-semibold bg-white/90 text-gray-700 px-2 py-0.5 rounded-full">
                {getStackLabel(item.tags)}
              </span>
            </div>
            <div className="p-3 flex flex-col gap-2 flex-1">
              <p className="text-xs font-semibold text-gray-800 line-clamp-2">{item.title}</p>
              <div className="flex items-center gap-2 mt-auto flex-wrap">
                <button onClick={() => togglePublished(item.id, item.published)}
                  className={`text-xs px-2 py-0.5 rounded-full font-medium transition-colors ${item.published ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400"}`}>
                  {item.published ? "Publik" : "Draft"}
                </button>
                <button onClick={() => openEdit(item.id)} className="text-xs text-[#2D7D46] hover:underline">Edit</button>
                <button onClick={() => setDeleteId(item.id)} className="text-xs text-red-400 hover:underline">Hapus</button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-4 py-16 text-center text-gray-400 text-sm">
            Belum ada portofolio. Tambahkan proyek pertama!
          </div>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="font-semibold text-gray-900">{editId ? "Edit Proyek" : "Proyek Baru"}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {error && <div className="bg-red-50 text-red-600 text-xs px-3 py-2 rounded-lg">{error}</div>}

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Judul *</label>
                <input required value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: f.slug || slugify(e.target.value) }))}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]" />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Slug (URL)</label>
                <input value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46] font-mono" />
              </div>

              {/* Stack tag */}
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Kategori Stack</label>
                <div className="grid grid-cols-3 gap-2">
                  {STACK_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, stack: opt.value }))}
                      className={`text-xs px-3 py-2 rounded-xl border text-center transition-all ${
                        form.stack === opt.value
                          ? "bg-[#2D7D46] text-white border-[#2D7D46]"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#2D7D46]/40"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Deskripsi singkat</label>
                <textarea rows={2} value={form.excerpt}
                  onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46] resize-none" />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Konten lengkap (Markdown)</label>
                <RichToolbar target={contentRef} />
                <textarea ref={contentRef} rows={8} value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-b-xl border-t-0 px-3 py-2 outline-none focus:border-[#2D7D46] resize-y font-mono" />
              </div>

              <ImageField value={form.image_url} onChange={(url) => setForm((f) => ({ ...f, image_url: url }))} />

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">URL Proyek / Link Live</label>
                <input value={form.source_url}
                  onChange={(e) => setForm((f) => ({ ...f, source_url: e.target.value }))}
                  placeholder="https://..."
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]" />
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={form.published}
                  onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                  className="w-4 h-4 rounded" />
                Publikasikan (tampil di situs)
              </label>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 text-sm border border-gray-200 text-gray-600 py-2.5 rounded-xl hover:bg-gray-50">Batal</button>
                <button type="submit" disabled={loading}
                  className="flex-1 text-sm bg-[#2D7D46] text-white py-2.5 rounded-xl hover:bg-[#236137] disabled:opacity-50">
                  {loading ? "Menyimpan…" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <p className="font-semibold text-gray-900 mb-2">Hapus proyek ini?</p>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setDeleteId(null)} className="flex-1 text-sm border border-gray-200 text-gray-600 py-2 rounded-xl">Batal</button>
              <button onClick={() => handleDelete(deleteId)} disabled={loading}
                className="flex-1 text-sm bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 disabled:opacity-50">
                {loading ? "Menghapus…" : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
