"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import BlockCanvas from "./BlockCanvas";
import EditorSidebar, { PostMeta, EMPTY_META } from "./EditorSidebar";
import { Block, createBlock, blocksToText } from "./types";

/* ─── Types ───────────────────────────────────────────────── */
export interface PostEditorProps {
  postType:         "news" | "portfolio";
  editId?:          string;
  initialMeta?:     Partial<PostMeta>;
  initialBlocks?:   Block[];
  initialSections?: {
    problem?:  Block[];
    solution?: Block[];
    process?:  Block[];
    result?:   Block[];
  };
}

type SectionKey = "overview" | "problem" | "solution" | "process" | "result";

const PORTFOLIO_SECTIONS: { key: SectionKey; label: string; emoji: string }[] = [
  { key: "overview",  label: "Overview",           emoji: "📋" },
  { key: "problem",   label: "Problem Statement",  emoji: "🎯" },
  { key: "solution",  label: "Solution",           emoji: "💡" },
  { key: "process",   label: "Process",            emoji: "⚙️" },
  { key: "result",    label: "Result / Outcome",   emoji: "🏆" },
];

const MAX_HISTORY = 50;

/* ─── Top bar ─────────────────────────────────────────────── */
function TopBar({
  postType, title, saving, saved, published,
  previewMode, onPreview,
  onSaveDraft, onPublish, onBack,
  canUndo, canRedo, onUndo, onRedo,
  isFullscreen, onToggleFullscreen,
}: {
  postType: string; title: string; saving: boolean; saved: boolean;
  published: boolean; previewMode: boolean;
  onPreview: () => void; onSaveDraft: () => void;
  onPublish: () => void; onBack: () => void;
  canUndo: boolean; canRedo: boolean;
  onUndo: () => void; onRedo: () => void;
  isFullscreen: boolean; onToggleFullscreen: () => void;
}) {
  return (
    <div className="h-12 border-b border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center px-4 gap-3 flex-shrink-0 z-10">
      <button
        type="button"
        onClick={onBack}
        className="text-xs text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 flex items-center gap-1.5 transition-colors"
      >
        ← {postType === "portfolio" ? "Portofolio" : "Berita"}
      </button>

      <div className="flex-1 flex items-center gap-2 min-w-0">
        <span className="text-xs text-gray-300 dark:text-zinc-600">|</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">{title || "Post tanpa judul"}</span>
        {saved && !saving && (
          <span className="text-[11px] text-yellow-500">● Tersimpan</span>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        {/* Undo / Redo */}
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
          className="text-xs px-2 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-30 transition-colors"
        >↩</button>
        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
          className="text-xs px-2 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-30 transition-colors"
        >↪</button>

        <div className="w-px h-4 bg-gray-200 dark:bg-zinc-600 mx-0.5" />

        <button
          type="button"
          onClick={onToggleFullscreen}
          title={isFullscreen ? "Keluar Fullscreen" : "Fullscreen"}
          className={`text-xs px-2 py-1.5 rounded-lg border transition-colors ${
            isFullscreen
              ? "border-gray-900 dark:border-zinc-300 bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
              : "border-gray-200 dark:border-zinc-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
          }`}
        >
          {isFullscreen ? "✕ Keluar Fullscreen" : "⛶"}
        </button>

        <button
          type="button"
          onClick={onPreview}
          className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
            previewMode
              ? "bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-gray-900 dark:border-zinc-100"
              : "border-gray-200 dark:border-zinc-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
          }`}
        >
          {previewMode ? "✎ Edit" : "👁 Preview"}
        </button>
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={saving}
          className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-50 transition-colors"
        >
          {saving ? "Menyimpan…" : "Simpan Draft"}
        </button>
        <button
          type="button"
          onClick={onPublish}
          disabled={saving}
          className="text-xs px-4 py-1.5 rounded-lg bg-[#F5C400] text-black hover:bg-[#c9a000] disabled:opacity-50 transition-colors font-medium"
        >
          {published ? "Perbarui" : "Terbitkan"}
        </button>
      </div>
    </div>
  );
}

/* ─── Live preview pane ──────────────────────────────────── */
function PreviewPane({ blocks, meta, postType }: {
  blocks: Block[]; meta: PostMeta; postType: "news" | "portfolio";
}) {
  return (
    <div className="flex-1 overflow-auto bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Simulated article header */}
        <div className="mb-6">
          {meta.category && (
            <span className="text-xs font-semibold bg-yellow-100 text-emerald-700 px-2.5 py-1 rounded-full">
              {meta.category}
            </span>
          )}
          <h1 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white leading-tight">
            {meta.title || <span className="text-gray-300 dark:text-zinc-600">Judul artikel…</span>}
          </h1>
          {meta.excerpt && (
            <p className="mt-3 text-gray-500 italic border-l-4 border-[#F5C400] pl-4">
              {meta.excerpt}
            </p>
          )}
          {meta.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={meta.image_url} alt="" className="mt-4 w-full h-64 object-cover rounded-2xl" />
          )}
        </div>

        {/* Blocks rendered */}
        <div className="prose max-w-none dark:prose-invert">
          {blocks.map((block) => <PreviewBlock key={block.id} block={block} />)}
        </div>

        {/* Portfolio meta */}
        {postType === "portfolio" && (meta.project_url || meta.client_name) && (
          <div className="mt-8 border-t border-gray-100 pt-6 grid grid-cols-2 gap-4 text-sm text-gray-600">
            {meta.client_name && <div><span className="font-medium">Klien:</span> {meta.client_name}</div>}
            {meta.role        && <div><span className="font-medium">Peran:</span> {meta.role}</div>}
            {meta.duration    && <div><span className="font-medium">Durasi:</span> {meta.duration}</div>}
            {meta.project_url && (
              <div className="col-span-2">
                <a href={meta.project_url} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#F5C400] text-black text-sm px-4 py-2 rounded-xl hover:bg-[#1f5a33]">
                  Lihat Proyek →
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-gray-700 leading-relaxed mb-4">{block.content}</p>;
    case "heading": {
      const l = (block.attrs.level as number) ?? 2;
      const cls = ["","text-4xl font-bold","text-3xl font-bold","text-2xl font-semibold","text-xl font-semibold","text-lg font-medium","text-base font-medium"][l];
      const HTag = `h${l}` as "h1"|"h2"|"h3"|"h4"|"h5"|"h6";
      return <HTag className={`${cls} text-gray-900 mt-6 mb-3`}>{block.content}</HTag>;
    }
    case "image":
      return block.attrs.url ? (
        <figure className="my-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.attrs.url as string} alt={(block.attrs.alt as string | undefined) ?? ""}
            className="w-full rounded-xl border border-gray-100" />
          {block.attrs.caption ? (
            <figcaption className="text-xs text-center text-gray-400 mt-1.5">{block.attrs.caption as string}</figcaption>
          ) : null}
        </figure>
      ) : null;
    case "gallery": {
      const imgs = (block.attrs.images as Array<{ url: string; caption?: string }>) ?? [];
      const cols = (block.attrs.columns as number) ?? 2;
      return (
        <div className={`grid gap-2 my-4 ${cols === 3 ? "grid-cols-3" : cols === 4 ? "grid-cols-4" : "grid-cols-2"}`}>
          {imgs.map((img, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={img.url} alt={img.caption ?? ""} className="w-full aspect-video object-cover rounded-xl" />
          ))}
        </div>
      );
    }
    case "list": {
      const items   = (block.attrs.items as string[]) ?? [];
      const ordered = block.attrs.ordered as boolean;
      const Tag = ordered ? "ol" : "ul";
      return (
        <Tag className={`${ordered ? "list-decimal" : "list-disc"} pl-5 space-y-1 mb-4 text-gray-700`}>
          {items.map((it, i) => <li key={i}>{it}</li>)}
        </Tag>
      );
    }
    case "quote":
      return (
        <blockquote className="border-l-4 border-[#F5C400] pl-4 italic text-gray-600 my-4">
          <p>{block.content}</p>
          {block.attrs.cite ? <cite className="text-xs text-gray-400 not-italic">— {block.attrs.cite as string}</cite> : null}
        </blockquote>
      );
    case "code":
      return (
        <pre className="bg-gray-900 text-green-300 p-4 rounded-xl my-4 overflow-x-auto font-mono text-sm">
          {block.content}
        </pre>
      );
    case "divider":
      return <hr className="border-gray-200 my-6" />;
    case "embed": {
      const url = block.attrs.url as string;
      const yt  = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([A-Za-z0-9_-]{11})/)?.[1];
      return yt ? (
        <div className="aspect-video rounded-xl overflow-hidden my-4">
          <iframe src={`https://www.youtube.com/embed/${yt}`} allowFullScreen className="w-full h-full" />
        </div>
      ) : url ? (
        <div className="border border-gray-200 rounded-xl p-4 my-4 text-sm text-gray-500">
          🔗 <a href={url} target="_blank" rel="noreferrer" className="text-brand underline">{url}</a>
        </div>
      ) : null;
    }
    case "callout": {
      const ctype = (block.attrs.type as string) ?? "info";
      const icon  = (block.attrs.icon as string) ?? "ℹ️";
      const colorMap: Record<string, string> = {
        info:    "border-blue-600 bg-blue-50",
        warning: "border-amber-700 bg-amber-50",
        success: "border-yellow-700 bg-yellow-50",
        error:   "border-red-600 bg-red-50",
      };
      return (
        <div className={`border-l-4 ${colorMap[ctype] ?? colorMap.info} rounded-r-xl px-4 py-3 my-4 flex gap-3`}>
          <span className="text-xl flex-shrink-0">{icon}</span>
          <p className="text-sm text-gray-700">{block.content}</p>
        </div>
      );
    }
    default: return null;
  }
}

/* ─── Main PostEditor ────────────────────────────────────── */
export default function PostEditor({ postType, editId, initialMeta, initialBlocks, initialSections }: PostEditorProps) {
  const router = useRouter();

  const initialBlocksValue = initialBlocks?.length ? initialBlocks : [createBlock("paragraph")];

  const [blocks, setBlocksRaw]   = useState<Block[]>(initialBlocksValue);
  const [history, setHistory]    = useState<Block[][]>([initialBlocksValue]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const isUndoRedoRef = useRef(false);

  // Wrap setBlocks to also push history
  const setBlocks = useCallback((newBlocks: Block[] | ((prev: Block[]) => Block[])) => {
    setBlocksRaw((prev) => {
      const next = typeof newBlocks === "function" ? newBlocks(prev) : newBlocks;
      if (!isUndoRedoRef.current) {
        setHistory((h) => {
          const sliced = h.slice(0, historyIndex + 1);
          const updated = [...sliced, next];
          if (updated.length > MAX_HISTORY) updated.shift();
          return updated;
        });
        setHistoryIndex((i) => Math.min(i + 1, MAX_HISTORY - 1));
      }
      return next;
    });
  }, [historyIndex]);

  const undo = useCallback(() => {
    setHistory((h) => {
      const newIdx = historyIndex - 1;
      if (newIdx < 0) return h;
      isUndoRedoRef.current = true;
      setHistoryIndex(newIdx);
      setBlocksRaw(h[newIdx]);
      setTimeout(() => { isUndoRedoRef.current = false; }, 0);
      return h;
    });
  }, [historyIndex]);

  const redo = useCallback(() => {
    setHistory((h) => {
      const newIdx = historyIndex + 1;
      if (newIdx >= h.length) return h;
      isUndoRedoRef.current = true;
      setHistoryIndex(newIdx);
      setBlocksRaw(h[newIdx]);
      setTimeout(() => { isUndoRedoRef.current = false; }, 0);
      return h;
    });
  }, [historyIndex]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  // Portfolio sections (separate block arrays per section)
  const [activeSection, setActiveSection] = useState<SectionKey>("overview");
  const [sectionBlocks, setSectionBlocks] = useState<Record<string, Block[]>>({
    problem:  initialSections?.problem  ?? [createBlock("paragraph")],
    solution: initialSections?.solution ?? [createBlock("paragraph")],
    process:  initialSections?.process  ?? [createBlock("paragraph")],
    result:   initialSections?.result   ?? [createBlock("paragraph")],
  });
  const [meta, setMeta]       = useState<PostMeta>({
    ...EMPTY_META,
    published_at: new Date().toISOString().slice(0, 16),
    ...initialMeta,
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(!!editId);
  const [error, setError]     = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [draftBanner, setDraftBanner] = useState<string | null>(null);
  const slugManualRef = useRef(false);
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const draftKey = `gu-draft-${postType}-${editId ?? "new"}`;

  /* ─── Keyboard shortcuts ────────────────────────────────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.includes("Mac");
      const ctrl  = isMac ? e.metaKey : e.ctrlKey;
      if (!ctrl) return;
      if (e.key === "z" && !e.shiftKey) { e.preventDefault(); undo(); }
      if (e.key === "y" || (e.key === "z" && e.shiftKey)) { e.preventDefault(); redo(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo]);

  /* ─── Autosave ──────────────────────────────────────────── */
  useEffect(() => {
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      const draft = {
        blocks,
        meta,
        savedAt: Date.now(),
      };
      try {
        localStorage.setItem(draftKey, JSON.stringify(draft));
      } catch {
        // quota exceeded — ignore
      }
    }, 2000);
    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks, meta]);

  /* ─── Check for draft on mount ──────────────────────────── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(draftKey);
      if (!raw) return;
      const draft = JSON.parse(raw) as { blocks: Block[]; meta: PostMeta; savedAt: number };
      if (draft.blocks && Array.isArray(draft.blocks)) {
        setDraftBanner(new Date(draft.savedAt).toLocaleString("id-ID"));
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDraft = () => {
    try {
      const raw = localStorage.getItem(draftKey);
      if (!raw) return;
      const draft = JSON.parse(raw) as { blocks: Block[]; meta: PostMeta; savedAt: number };
      if (draft.blocks) setBlocks(draft.blocks);
      if (draft.meta)   setMeta(draft.meta);
    } catch {
      // ignore
    }
    setDraftBanner(null);
  };

  const dismissDraft = () => setDraftBanner(null);

  /* ─── Fullscreen ────────────────────────────────────────── */
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {
          // CSS-only fallback if native fails
        });
      }
      setIsFullscreen(true);
    } else {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  // Listen for Escape key / browser exiting fullscreen
  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) setIsFullscreen(false);
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const selectedBlock = blocks.find((b) => b.id === selectedId) ?? null;

  function slugify(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 80);
  }

  const handleBlockChange = useCallback((updated: Block) => {
    setBlocksRaw((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  }, []);

  const buildPayload = (publish: boolean) => {
    const finalSlug = meta.slug || slugify(meta.title);
    const cat = postType === "portfolio" ? "Portfolio" : (meta.category || "Umum");
    return {
      title:        meta.title,
      slug:         finalSlug,
      excerpt:      meta.excerpt || null,
      content:      blocksToText(blocks),
      blocks:       blocks,
      image_url:    meta.image_url || null,
      category:     cat,
      tags:         meta.tags?.length ? meta.tags : null,
      published:    publish,
      published_at: publish
        ? meta.published_at ? new Date(meta.published_at).toISOString() : new Date().toISOString()
        : null,
      seo_title:       meta.seo_title || null,
      seo_description: meta.seo_description || null,
      focus_keyword:    meta.focus_keyword    || null,
      schema_type:      meta.schema_type      || "Article",
      allow_comments:   meta.allow_comments   ?? false,
      ...(postType === "portfolio" ? {
        project_url:      meta.project_url  || null,
        client_name:      meta.client_name  || null,
        project_date:     meta.project_date || null,
        role:             meta.role         || null,
        repo_url:         meta.repo_url     || null,
        duration:         meta.duration     || null,
        tech_stack:       meta.tech_stack?.length ? meta.tech_stack : null,
        source_url:       meta.project_url  || null,
        section_problem:  sectionBlocks.problem,
        section_solution: sectionBlocks.solution,
        section_process:  sectionBlocks.process,
        section_result:   sectionBlocks.result,
      } : {}),
    };
  };

  const save = async (publish: boolean) => {
    if (!meta.title.trim()) { setError("Judul wajib diisi"); return; }
    setSaving(true);
    setError(null);

    const payload  = buildPayload(publish);
    const method   = editId ? "PATCH" : "POST";
    const body     = editId ? { id: editId, ...payload } : payload;

    const res  = await fetch("/api/admin/articles", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json();

    setSaving(false);
    if (!res.ok) { setError(json.error ?? "Terjadi kesalahan"); return; }

    setSaved(true);
    // Clear autosave draft after successful save
    try { localStorage.removeItem(draftKey); } catch { /* ignore */ }
    setMeta((m) => ({ ...m, published: publish, slug: payload.slug }));

    if (!editId && json.data?.id) {
      router.replace(`/admin/${postType === "portfolio" ? "portfolio" : "news"}/edit/${json.data.id}`);
    }
  };

  const backPath = postType === "portfolio" ? "/admin/portfolio" : "/admin/news";

  return (
    <div className={`flex flex-col ${isFullscreen ? "fixed inset-0 z-50 bg-white dark:bg-zinc-900" : "h-full"}`}>
      <TopBar
        postType={postType}
        title={meta.title}
        saving={saving}
        saved={saved}
        published={meta.published}
        previewMode={previewMode}
        onPreview={() => setPreviewMode((v) => !v)}
        onSaveDraft={() => save(false)}
        onPublish={() => save(true)}
        onBack={() => router.push(backPath)}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Draft banner */}
      {draftBanner && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-300 text-xs px-4 py-2 flex items-center gap-3 flex-shrink-0">
          <span>💾 Draft tersimpan ditemukan — {draftBanner} — Muat draft?</span>
          <button
            type="button"
            onClick={loadDraft}
            className="px-2.5 py-1 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium"
          >Muat</button>
          <button
            type="button"
            onClick={dismissDraft}
            className="px-2.5 py-1 border border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30"
          >Abaikan</button>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs px-4 py-2 flex items-center gap-2 flex-shrink-0">
          ⚠ {error}
          <button type="button" onClick={() => setError(null)} className="ml-auto text-red-400">✕</button>
        </div>
      )}

      <div className="flex flex-1 min-h-0">
        {previewMode ? (
          /* ── Preview mode ── */
          <PreviewPane blocks={blocks} meta={meta} postType={postType} />
        ) : (
          /* ── Edit mode ── */
          <div
            className="flex-1 overflow-auto bg-gray-50 dark:bg-zinc-950 p-8"
            onClick={() => setSelectedId(null)}
          >
            <div className="max-w-3xl mx-auto">
              {/* Post title */}
              <input
                type="text"
                value={meta.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setMeta((m) => ({
                    ...m,
                    title,
                    slug: slugManualRef.current ? m.slug : slugify(title),
                  }));
                  setSaved(false);
                }}
                placeholder="Tambahkan judul…"
                className="w-full text-4xl font-bold text-gray-900 dark:text-white outline-none bg-transparent placeholder:text-gray-200 dark:placeholder:text-zinc-700 mb-6 leading-tight"
              />

              {/* Portfolio section tabs */}
              {postType === "portfolio" && (
                <div className="flex gap-1 mb-6 border-b border-gray-100 dark:border-zinc-700 pb-2 flex-wrap">
                  {PORTFOLIO_SECTIONS.map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setActiveSection(s.key); setSelectedId(null); }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        activeSection === s.key
                          ? "bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                          : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-700 dark:hover:text-gray-200"
                      }`}
                    >
                      <span>{s.emoji}</span> {s.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Block canvas */}
              <div onClick={(e) => e.stopPropagation()}>
                {(postType !== "portfolio" || activeSection === "overview") && (
                  <BlockCanvas
                    blocks={blocks}
                    selectedId={selectedId}
                    onChange={(newBlocks) => { setBlocks(newBlocks); setSaved(false); }}
                    onSelect={setSelectedId}
                  />
                )}
                {postType === "portfolio" && activeSection !== "overview" && (
                  <BlockCanvas
                    key={activeSection}
                    blocks={sectionBlocks[activeSection] ?? [createBlock("paragraph")]}
                    selectedId={selectedId}
                    onChange={(newBlocks) => {
                      setSectionBlocks((prev) => ({ ...prev, [activeSection]: newBlocks }));
                      setSaved(false);
                    }}
                    onSelect={setSelectedId}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Sidebar */}
        <EditorSidebar
          postType={postType}
          meta={meta}
          onMeta={(m) => { setMeta(m); setSaved(false); }}
          selectedBlock={selectedBlock}
          onBlockChange={handleBlockChange}
          onSlugManualEdit={() => { slugManualRef.current = true; }}
        />
      </div>
    </div>
  );
}
