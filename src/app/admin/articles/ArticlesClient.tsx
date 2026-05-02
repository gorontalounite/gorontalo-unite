"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

interface ArticleForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  customCategory: string;
  published: boolean;
  published_at: string;
}

const PRESET_CATEGORIES = [
  "Wisata", "Budaya", "Kuliner", "Ekonomi", "Pendidikan",
  "Kesehatan", "Infrastruktur", "Sejarah", "Umum", "+ Kategori Baru",
];

const emptyForm: ArticleForm = {
  title: "", slug: "", excerpt: "", content: "",
  image_url: "", category: "Wisata", customCategory: "",
  published: false, published_at: "",
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 80);
}

function todayISO() {
  return new Date().toISOString().slice(0, 16);
}

/* ─── Rich Text Toolbar ───────────────────────────────── */
function RichToolbar({ target }: { target: React.RefObject<HTMLTextAreaElement | null> }) {
  const wrap = (before: string, after: string, placeholder = "") => {
    const el = target.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const selected = value.slice(s, e) || placeholder;
    const newVal = value.slice(0, s) + before + selected + after + value.slice(e);
    const newPos = s + before.length + selected.length + after.length;
    // Trigger React synthetic change
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
    nativeInputValueSetter?.call(el, newVal);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.focus();
    el.setSelectionRange(newPos, newPos);
  };

  const insertLine = (prefix: string) => {
    const el = target.current;
    if (!el) return;
    const { selectionStart: s, value } = el;
    const lineStart = value.lastIndexOf("\n", s - 1) + 1;
    const newVal = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
    nativeInputValueSetter?.call(el, newVal);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.focus();
  };

  const tools = [
    { label: "B", title: "Bold", action: () => wrap("**", "**", "teks tebal") },
    { label: "I", title: "Italic", action: () => wrap("_", "_", "teks miring") },
    { label: "S̶", title: "Strikethrough", action: () => wrap("~~", "~~", "teks coret") },
    { label: "H2", title: "Heading 2", action: () => insertLine("## ") },
    { label: "H3", title: "Heading 3", action: () => insertLine("### ") },
    { label: "—", title: "Divider", action: () => wrap("\n\n---\n\n", "") },
    { label: "• List", title: "Bullet list", action: () => insertLine("- ") },
    { label: "1. List", title: "Numbered list", action: () => insertLine("1. ") },
    { label: "🔗 URL", title: "Link", action: () => wrap("[", "](https://)", "teks link") },
    { label: '" Quote', title: "Blockquote", action: () => insertLine("> ") },
    { label: "</> Code", title: "Inline code", action: () => wrap("`", "`", "kode") },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border border-b-0 border-gray-200 rounded-t-xl">
      {tools.map((t) => (
        <button
          key={t.title}
          type="button"
          title={t.title}
          onClick={t.action}
          className="px-2 py-1 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ─── Image field with upload + URL ─────────────────────── */
function ImageField({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (!res.ok) {
      setUploadError(json.error ?? "Upload gagal");
    } else {
      onChange(json.url);
    }
    setUploading(false);
  };

  return (
    <div>
      <label className="text-xs font-medium text-gray-700 block mb-1">Gambar</label>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... atau unggah file di bawah"
          className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="text-xs px-3 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {uploading ? "Mengunggah…" : "📂 Unggah"}
        </button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
      {uploadError && <p className="text-xs text-red-500 mt-1">{uploadError}</p>}
      {value && (
        <img
          src={value}
          alt="preview"
          className="mt-2 h-28 w-full object-cover rounded-xl border border-gray-100"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function ArticlesClient({ initialArticles }: { initialArticles: Article[] }) {
  const router = useRouter();
  const [articles, setArticles] = useState(initialArticles);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<ArticleForm>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const finalCategory = form.category === "+ Kategori Baru" ? form.customCategory.trim() : form.category;

  const openCreate = () => {
    setForm({ ...emptyForm, published_at: todayISO() });
    setEditId(null);
    setShowForm(true);
    setError(null);
  };

  const openEdit = async (id: string) => {
    const res = await fetch(`/api/admin/articles?id=${id}`);
    const { data: article } = await res.json();
    if (article) {
      setForm({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt ?? "",
        content: article.content ?? "",
        image_url: article.image_url ?? "",
        category: PRESET_CATEGORIES.slice(0, -1).includes(article.category)
          ? article.category
          : "+ Kategori Baru",
        customCategory: PRESET_CATEGORIES.slice(0, -1).includes(article.category)
          ? ""
          : article.category,
        published: article.published,
        published_at: article.published_at ? article.published_at.slice(0, 16) : todayISO(),
      });
      setEditId(id);
      setShowForm(true);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const cat = finalCategory || "Umum";
    const payload = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      excerpt: form.excerpt || null,
      content: form.content || null,
      image_url: form.image_url || null,
      category: cat,
      published: form.published,
      published_at: form.published
        ? form.published_at
          ? new Date(form.published_at).toISOString()
          : new Date().toISOString()
        : null,
    };

    const res = await fetch("/api/admin/articles", {
      method: editId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editId ? { id: editId, ...payload } : payload),
    });
    const json = await res.json();

    if (!res.ok) {
      setError(json.error ?? "Terjadi kesalahan");
      setLoading(false);
      return;
    }

    setLoading(false);
    setShowForm(false);
    router.refresh();

    // Refresh list
    const listRes = await fetch("/api/admin/articles");
    const { data } = await listRes.json();
    setArticles((data ?? []).filter((a: Article) => a.category !== "Portfolio" && a.category !== "Good News"));
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await fetch("/api/admin/articles", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setArticles((prev) => prev.filter((a) => a.id !== id));
    setDeleteId(null);
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manajemen Artikel</h1>
          <p className="text-sm text-gray-500">{articles.length} artikel total</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-[#2D7D46] text-white text-sm px-4 py-2 rounded-xl hover:bg-[#236137] transition-colors flex items-center gap-2"
        >
          <span>+</span> Artikel Baru
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {articles.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            Belum ada artikel. Buat yang pertama!
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
              {articles.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 truncate max-w-xs">{a.title}</p>
                    <p className="text-xs text-gray-400">/news/{a.slug}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {a.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-400 text-xs">
                    {new Date(a.published_at ?? a.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        a.published
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {a.published ? "Publik" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(a.id)}
                        className="text-xs text-[#2D7D46] hover:underline"
                      >
                        Edit
                      </button>
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

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="font-semibold text-gray-900">
                {editId ? "Edit Artikel" : "Artikel Baru"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 text-xs px-3 py-2 rounded-lg">{error}</div>
              )}

              {/* Title */}
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Judul *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      title: e.target.value,
                      slug: f.slug || slugify(e.target.value),
                    }))
                  }
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Slug (URL)</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46] font-mono"
                />
              </div>

              {/* Category + Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">Kategori</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]"
                  >
                    {PRESET_CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  {form.category === "+ Kategori Baru" && (
                    <input
                      value={form.customCategory}
                      onChange={(e) => setForm((f) => ({ ...f, customCategory: e.target.value }))}
                      placeholder="Nama kategori baru..."
                      className="mt-2 w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]"
                    />
                  )}
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Tanggal Tayang
                  </label>
                  <input
                    type="datetime-local"
                    value={form.published_at}
                    onChange={(e) => setForm((f) => ({ ...f, published_at: e.target.value }))}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46]"
                  />
                </div>
              </div>

              {/* Publish toggle */}
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                  className="w-4 h-4 rounded"
                />
                Publikasikan (tampil di situs)
              </label>

              {/* Excerpt */}
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Ringkasan / Excerpt
                </label>
                <textarea
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  placeholder="Ringkasan singkat artikel..."
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46] resize-none"
                />
              </div>

              {/* Content with rich toolbar */}
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Konten (Markdown)
                </label>
                <RichToolbar target={contentRef} />
                <textarea
                  ref={contentRef}
                  rows={10}
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  placeholder="Tulis konten artikel dalam format Markdown..."
                  className="w-full text-sm border border-gray-200 rounded-b-xl border-t-0 px-3 py-2 outline-none focus:border-[#2D7D46] resize-y font-mono"
                />
              </div>

              {/* Image */}
              <ImageField
                value={form.image_url}
                onChange={(url) => setForm((f) => ({ ...f, image_url: url }))}
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 text-sm border border-gray-200 text-gray-600 py-2.5 rounded-xl hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 text-sm bg-[#2D7D46] text-white py-2.5 rounded-xl hover:bg-[#236137] disabled:opacity-50"
                >
                  {loading ? "Menyimpan…" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <p className="font-semibold text-gray-900 mb-2">Hapus artikel ini?</p>
            <p className="text-sm text-gray-500 mb-5">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 text-sm border border-gray-200 text-gray-600 py-2 rounded-xl"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={loading}
                className="flex-1 text-sm bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 disabled:opacity-50"
              >
                {loading ? "Menghapus…" : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
