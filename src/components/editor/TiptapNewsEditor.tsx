"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import type { JSONContent } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { useRouter } from "next/navigation";
import EditorSidebar, { EMPTY_META, type PostMeta } from "./EditorSidebar";
import { blocksToText, type Block } from "./types";

type Props = {
  editId?: string;
  initialMeta?: Partial<PostMeta>;
  initialBlocks?: Block[];
};

const EMPTY_DOC: JSONContent = { type: "doc", content: [{ type: "paragraph" }] };

const MAKASSAR_OFFSET = "+08:00";
const STOP_WORDS = new Set(["dan", "yang", "di", "ke", "dari", "untuk", "pada", "dengan", "atas", "dalam", "oleh", "akan", "ini", "itu", "sebagai", "atau", "karena"]);

function makassarInputValue(date = new Date()) {
  const parts = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Makassar", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(date);
  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? "00";
  return `${value("year")}-${value("month")}-${value("day")}T${value("hour")}:${value("minute")}`;
}

function toMakassarIso(value: string) {
  return value ? new Date(`${value}:00${MAKASSAR_OFFSET}`).toISOString() : new Date().toISOString();
}

function firstParagraph(blocks: Block[]) {
  return blocks.find((block) => block.type === "paragraph" && block.content.trim())?.content.trim() ?? blocksToText(blocks).trim();
}

function focusKeyword(title: string, tags: string[], category: string) {
  if (tags[0]?.trim()) return tags[0].trim();
  const words = title.toLowerCase().match(/[a-zà-ÿ0-9]+/gi)?.filter((word) => word.length > 2 && !STOP_WORDS.has(word.toLowerCase())) ?? [];
  return words.slice(0, 3).join(" ") || category;
}

function textFromNode(node: JSONContent): string {
  if (node.type === "text") return node.text ?? "";
  if (node.type === "hardBreak") return "\n";
  return (node.content ?? []).map(textFromNode).join("");
}

function legacyBlocksToDoc(blocks?: Block[]): JSONContent {
  if (!blocks?.length) return EMPTY_DOC;

  const content = blocks.flatMap((block): JSONContent[] => {
    switch (block.type) {
      case "heading":
        return [{ type: "heading", attrs: { level: Number(block.attrs.level) || 2 }, content: block.content ? [{ type: "text", text: block.content }] : [] }];
      case "list": {
        const items = (block.attrs.items as string[] | undefined) ?? [];
        const type = block.attrs.ordered ? "orderedList" : "bulletList";
        return [{ type, content: items.map((item) => ({ type: "listItem", content: [{ type: "paragraph", content: item ? [{ type: "text", text: item }] : [] }] })) }];
      }
      case "quote":
        return [{ type: "blockquote", content: [{ type: "paragraph", content: block.content ? [{ type: "text", text: block.content }] : [] }] }];
      case "code":
        return [{ type: "codeBlock", attrs: { language: String(block.attrs.language ?? "") || null }, content: block.content ? [{ type: "text", text: block.content }] : [] }];
      case "divider":
        return [{ type: "horizontalRule" }];
      case "image":
        return block.attrs.url ? [{ type: "image", attrs: { src: String(block.attrs.url), alt: String(block.attrs.alt ?? ""), title: String(block.attrs.caption ?? "") } }] : [];
      case "gallery":
        return ((block.attrs.images as Array<{ url: string; caption?: string }> | undefined) ?? [])
          .filter((image) => image.url)
          .map((image) => ({ type: "image", attrs: { src: image.url, alt: image.caption ?? "", title: image.caption ?? "" } }));
      case "embed":
        return [{ type: "paragraph", content: block.attrs.url ? [{ type: "text", text: String(block.attrs.url) }] : [] }];
      case "table":
      case "callout":
      case "paragraph":
      default:
        return [{ type: "paragraph", content: block.content ? [{ type: "text", text: block.content }] : [] }];
    }
  });

  return { type: "doc", content: content.length ? content : [{ type: "paragraph" }] };
}

function docToLegacyBlocks(doc: JSONContent): Block[] {
  const create = (type: Block["type"], content: string, attrs: Record<string, unknown> = {}): Block => ({ id: crypto.randomUUID(), type, content, attrs });
  const result: Block[] = [];

  for (const node of doc.content ?? []) {
    switch (node.type) {
      case "paragraph": result.push(create("paragraph", textFromNode(node))); break;
      case "heading": result.push(create("heading", textFromNode(node), { level: node.attrs?.level ?? 2, align: node.attrs?.textAlign ?? "left" })); break;
      case "bulletList":
      case "orderedList": result.push(create("list", "", { ordered: node.type === "orderedList", items: (node.content ?? []).map(textFromNode) })); break;
      case "blockquote": result.push(create("quote", textFromNode(node))); break;
      case "codeBlock": result.push(create("code", textFromNode(node), { language: node.attrs?.language ?? "plaintext" })); break;
      case "horizontalRule": result.push(create("divider", "")); break;
      case "image": result.push(create("image", "", { url: node.attrs?.src ?? "", alt: node.attrs?.alt ?? "", caption: node.attrs?.title ?? "", size: "full", align: "center" })); break;
      default: {
        const text = textFromNode(node);
        if (text) result.push(create("paragraph", text));
      }
    }
  }
  return result.length ? result : [create("paragraph", "")];
}

function ToolbarButton({ active, disabled, label, onClick, children }: {
  active?: boolean; disabled?: boolean; label: string; onClick: () => void; children: React.ReactNode;
}) {
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick} disabled={disabled}
      className={`min-w-8 rounded-md px-2 py-1.5 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-30 ${active ? "bg-[#F5C400] text-black" : "text-gray-600 hover:bg-gray-100"}`}>
      {children}
    </button>
  );
}

function SeoDistribution({ meta, onChange }: { meta: PostMeta; onChange: (next: PostMeta) => void }) {
  const field = <K extends keyof PostMeta>(key: K, value: PostMeta[K]) => onChange({ ...meta, [key]: value });
  return <section className="mt-10 rounded-2xl border border-gray-200 bg-gray-50/70 p-5">
    <h2 className="text-sm font-semibold text-gray-900">SEO & Distribusi</h2>
    <p className="mt-1 text-xs text-gray-500">Terisi otomatis saat diterbitkan. Anda tetap dapat menyesuaikannya bila perlu.</p>
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      <label className="text-xs font-medium text-gray-600 sm:col-span-2">Meta title
        <input value={meta.seo_title} onChange={(event) => field("seo_title", event.target.value)} placeholder={meta.title || "Judul SEO"} className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#F5C400]" />
      </label>
      <label className="text-xs font-medium text-gray-600 sm:col-span-2">Meta description
        <textarea value={meta.seo_description} onChange={(event) => field("seo_description", event.target.value)} maxLength={160} rows={3} placeholder="Otomatis dari paragraf pertama saat diterbitkan" className="mt-1 w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#F5C400]" />
      </label>
      <label className="text-xs font-medium text-gray-600">Focus keyword
        <input value={meta.focus_keyword ?? ""} onChange={(event) => field("focus_keyword", event.target.value)} placeholder="Otomatis dari judul atau tag" className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#F5C400]" />
      </label>
      <label className="text-xs font-medium text-gray-600">Schema markup
        <select value={meta.schema_type ?? "NewsArticle"} onChange={(event) => field("schema_type", event.target.value)} className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#F5C400]">
          <option value="NewsArticle">NewsArticle</option><option value="Article">Article</option><option value="BlogPosting">BlogPosting</option>
        </select>
      </label>
    </div>
  </section>;
}

export default function TiptapNewsEditor({ editId, initialMeta, initialBlocks }: Props) {
  const router = useRouter();
  const [meta, setMeta] = useState<PostMeta>({
    ...EMPTY_META,
    ...initialMeta,
    published_at: initialMeta?.published_at ? makassarInputValue(new Date(initialMeta.published_at)) : makassarInputValue(),
    allow_comments: initialMeta?.allow_comments ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(Boolean(editId));
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const slugManual = useRef(false);
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const draftKey = `gu-tiptap-draft-news-${editId ?? "new"}`;

  const initialDoc = useMemo(() => legacyBlocksToDoc(initialBlocks), [initialBlocks]);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4] } }),
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, autolink: true, defaultProtocol: "https" }),
      Placeholder.configure({ placeholder: "Mulai menulis cerita Anda…" }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: initialDoc,
    editorProps: { attributes: { class: "tiptap-editor" } },
    onUpdate: () => setSaved(false),
  });

  useEffect(() => { editor?.setEditable(!preview); }, [editor, preview]);

  useEffect(() => {
    if (!editor) return;
    const saveDraft = () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
      autosaveTimer.current = setTimeout(() => {
        try { localStorage.setItem(draftKey, JSON.stringify({ doc: editor.getJSON(), meta, savedAt: Date.now() })); } catch { /* local draft is optional */ }
      }, 1200);
    };
    editor.on("update", saveDraft);
    return () => { editor.off("update", saveDraft); if (autosaveTimer.current) clearTimeout(autosaveTimer.current); };
  }, [draftKey, editor, meta]);

  const slugify = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 80);
  const setTitle = (title: string) => {
    setMeta((current) => ({ ...current, title, slug: slugManual.current ? current.slug : slugify(title) }));
    setSaved(false);
  };

  const uploadInlineImage = async (file: File) => {
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await response.json();
    if (!response.ok || !data.url) { setError(data.error ?? "Gambar tidak dapat diunggah"); return; }
    editor?.chain().focus().setImage({ src: data.url }).run();
  };

  const save = useCallback(async (publish: boolean) => {
    if (!editor || !meta.title.trim()) { setError("Judul wajib diisi"); return; }
    setSaving(true); setError(null);
    const blocks = docToLegacyBlocks(editor.getJSON());
    const categories = meta.categories.length ? meta.categories : (meta.category ? [meta.category] : ["Umum"]);
    const autoDescription = firstParagraph(blocks).slice(0, 160);
    const seo = publish ? {
      seo_title: meta.seo_title || meta.title,
      seo_description: meta.seo_description || autoDescription,
      focus_keyword: meta.focus_keyword || focusKeyword(meta.title, meta.tags, categories[0]),
    } : { seo_title: meta.seo_title || null, seo_description: meta.seo_description || null, focus_keyword: meta.focus_keyword || null };
    const payload = {
      title: meta.title, slug: meta.slug || slugify(meta.title), excerpt: firstParagraph(blocks).slice(0, 280) || null,
      content: blocksToText(blocks), blocks, image_url: meta.image_url || null,
      category: categories[0], categories, tags: meta.tags.length ? meta.tags : null,
      published: publish,
      published_at: publish ? toMakassarIso(meta.published_at) : null,
      ...seo, schema_type: meta.schema_type || "NewsArticle",
      allow_comments: meta.allow_comments ?? true, source_url: meta.source_url || null,
    };
    const response = await fetch("/api/admin/articles", {
      method: editId ? "PATCH" : "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editId ? { id: editId, ...payload } : payload),
    });
    const data = await response.json();
    setSaving(false);
    if (!response.ok) { setError(data.error ?? "Konten tidak dapat disimpan"); return; }
    try { localStorage.removeItem(draftKey); } catch { /* ignore */ }
    setMeta((current) => ({ ...current, slug: payload.slug, published: publish, seo_title: payload.seo_title ?? "", seo_description: payload.seo_description ?? "", focus_keyword: payload.focus_keyword ?? "", excerpt: payload.excerpt ?? "" }));
    setSaved(true);
    if (!editId && data.data?.id) router.replace(`/admin/news/edit/${data.data.id}`);
  }, [draftKey, editId, editor, meta, router]);

  if (!editor) return <div className="flex h-full items-center justify-center text-sm text-gray-400">Memuat editor…</div>;

  return (
    <div className="flex h-full min-h-0 flex-col bg-white text-gray-900">
      <header className="flex min-h-14 flex-wrap items-center gap-2 border-b border-gray-200 bg-white px-3 py-2 sm:px-5">
        <button type="button" onClick={() => router.push("/admin/news")} className="text-sm text-gray-500 hover:text-gray-950">← Konten</button>
        <span className="hidden text-gray-200 sm:inline">/</span>
        <span className="hidden min-w-0 flex-1 truncate text-sm text-gray-500 sm:block">{meta.title || "Artikel tanpa judul"}</span>
        <span className={`rounded-full px-2 py-1 text-[11px] ${saved ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{saving ? "Menyimpan…" : saved ? "Tersimpan" : "Belum disimpan"}</span>
        <button type="button" onClick={() => setPreview((value) => !value)} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium hover:bg-gray-50">{preview ? "Edit" : "Preview"}</button>
        <button type="button" onClick={() => save(false)} disabled={saving} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium hover:bg-gray-50 disabled:opacity-50">Simpan draft</button>
        <button type="button" onClick={() => save(true)} disabled={saving} className="rounded-lg bg-[#F5C400] px-3 py-1.5 text-xs font-semibold text-black hover:bg-[#d9ae00] disabled:opacity-50">{meta.published ? "Perbarui" : "Terbitkan"}</button>
        <button type="button" onClick={() => setShowSettings((value) => !value)} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium lg:hidden">Pengaturan</button>
      </header>

      {error && <div className="border-b border-red-100 bg-red-50 px-5 py-2 text-sm text-red-700">{error}</div>}

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <main className={`min-w-0 flex-1 overflow-y-auto ${preview ? "bg-gray-50" : "bg-white"}`}>
          <div className="mx-auto w-full max-w-3xl px-5 py-8 sm:px-10 sm:py-12">
            {preview && <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-amber-600">Pratinjau artikel</p>}
            <input value={meta.title} onChange={(event) => setTitle(event.target.value)} placeholder="Judul artikel yang kuat…"
              className={`mb-7 w-full border-0 bg-transparent font-serif text-4xl font-bold leading-tight outline-none placeholder:text-gray-200 sm:text-5xl ${preview ? "pointer-events-none" : ""}`} />
            {!preview && (
              <div className="sticky top-0 z-10 -mx-2 mb-6 flex flex-wrap items-center gap-0.5 rounded-xl border border-gray-200 bg-white/95 p-1.5 shadow-sm backdrop-blur">
                <ToolbarButton label="Undo" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>↶</ToolbarButton>
                <ToolbarButton label="Redo" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>↷</ToolbarButton>
                <span className="mx-1 h-5 w-px bg-gray-200" />
                <ToolbarButton label="Tebal" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>B</ToolbarButton>
                <ToolbarButton label="Miring" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><em>I</em></ToolbarButton>
                <ToolbarButton label="Coret" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><s>S</s></ToolbarButton>
                <ToolbarButton label="Judul" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolbarButton>
                <ToolbarButton label="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>•≡</ToolbarButton>
                <ToolbarButton label="Daftar bernomor" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1≡</ToolbarButton>
                <ToolbarButton label="Kutipan" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>❝</ToolbarButton>
                <ToolbarButton label="Garis pemisah" onClick={() => editor.chain().focus().setHorizontalRule().run()}>—</ToolbarButton>
                <span className="mx-1 h-5 w-px bg-gray-200" />
                <ToolbarButton label="Unggah gambar ke konten" onClick={() => fileInput.current?.click()}>🖼</ToolbarButton>
                <ToolbarButton label="Tambahkan tautan" onClick={() => { const url = window.prompt("URL tautan"); if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run(); }}>↗</ToolbarButton>
                <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) uploadInlineImage(file); event.currentTarget.value = ""; }} />
              </div>
            )}
            <EditorContent editor={editor} />
            <SeoDistribution meta={meta} onChange={(next) => { setMeta(next); setSaved(false); }} />
          </div>
        </main>

        <div className={`${showSettings ? "block" : "hidden"} border-t border-gray-200 bg-white lg:block lg:w-80 lg:flex-shrink-0 lg:border-l lg:border-t-0`}>
          <EditorSidebar postType="news" meta={meta} onMeta={(value) => { setMeta(value); setSaved(false); }} selectedBlock={null} onBlockChange={() => {}} onSlugManualEdit={() => { slugManual.current = true; }} showBlockTab={false} showSeoPanel={false} />
        </div>
      </div>
    </div>
  );
}
