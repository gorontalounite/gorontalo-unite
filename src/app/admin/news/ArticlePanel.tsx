"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SidePanel from "@/components/admin/SidePanel";
import type { Block } from "@/components/editor/types";
import type { PostMeta } from "@/components/editor/EditorSidebar";

// The editor pulls in Tiptap and its extensions — several hundred kilobytes
// that the grid itself never needs. Loading it only when a row is opened keeps
// /admin/news as light as it was when editing meant leaving the page.
const PostEditor = dynamic(() => import("@/components/editor/PostEditor"), {
  ssr: false,
  loading: () => <PanelMessage>Memuat editor…</PanelMessage>,
});

function PanelMessage({ children }: { children: React.ReactNode }) {
  return <div className="flex h-full items-center justify-center p-10 text-sm text-gray-400">{children}</div>;
}

interface ArticleRecord {
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  category?: string | null;
  categories?: string[] | null;
  tags?: string[] | null;
  image_url?: string | null;
  source_url?: string | null;
  published?: boolean | null;
  published_at?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  focus_keyword?: string | null;
  is_trending?: boolean | null;
  is_sponsored?: boolean | null;
  sponsor_name?: string | null;
  sponsor_logo_url?: string | null;
  schema_type?: string | null;
  allow_comments?: boolean | null;
  blocks?: unknown;
}

/** The same shape the standalone edit page builds, from the same columns. */
function metaOf(article: ArticleRecord): Partial<PostMeta> {
  return {
    title:            article.title ?? "",
    slug:             article.slug ?? "",
    excerpt:          article.excerpt ?? "",
    category:         article.category ?? "",
    categories:       article.categories ?? (article.category ? [article.category] : []),
    tags:             article.tags ?? [],
    image_url:        article.image_url ?? "",
    source_url:       article.source_url ?? "",
    published:        article.published ?? false,
    published_at:     article.published_at ? article.published_at.slice(0, 16) : "",
    seo_title:        article.seo_title ?? "",
    seo_description:  article.seo_description ?? "",
    focus_keyword:    article.focus_keyword ?? "",
    is_trending:      article.is_trending ?? false,
    is_sponsored:     article.is_sponsored ?? false,
    sponsor_name:     article.sponsor_name ?? "",
    sponsor_logo_url: article.sponsor_logo_url ?? "",
    schema_type:      article.schema_type ?? "NewsArticle",
    allow_comments:   article.allow_comments ?? false,
  };
}

/**
 * Opens one article over the grid instead of navigating to its own page, so
 * closing it returns to the same filter, page and scroll position.
 */
export default function ArticlePanel({
  id, open, onClose, onSaved,
}: {
  /** Null opens the editor on a new article. */
  id: string | null;
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  // Carrying the id alongside the result is what makes the reset unnecessary:
  // a result belonging to a previously opened row simply stops matching, so
  // closing and reopening never shows the wrong article for a frame.
  const [result, setResult] = useState<{ id: string; record?: ArticleRecord; error?: string } | null>(null);

  useEffect(() => {
    if (!open || !id) return;
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(`/api/admin/articles?id=${encodeURIComponent(id)}`);
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(payload.error ?? `Artikel tidak dapat dimuat (${response.status}).`);
        if (!cancelled) setResult({ id, record: payload.data as ArticleRecord });
      } catch (cause) {
        if (!cancelled) setResult({ id, error: cause instanceof Error ? cause.message : "Artikel tidak dapat dimuat." });
      }
    })();
    return () => { cancelled = true; };
  }, [id, open]);

  const current = result && result.id === id ? result : null;
  const record = current?.record ?? null;
  const error = current?.error ?? null;
  const ready = !id || record !== null;

  return (
    <SidePanel
      open={open}
      onClose={onClose}
      title={id ? record?.title || "Memuat…" : "Konten Baru"}
      subtitle={id && record?.slug ? `/${record.slug}` : undefined}
      width="min(1120px, 94vw)"
      bodyScroll={false}
    >
      {error ? (
        <PanelMessage>{error}</PanelMessage>
      ) : !ready ? (
        <PanelMessage>Memuat artikel…</PanelMessage>
      ) : (
        <div className="h-full">
          <PostEditor
            postType="news"
            editId={id ?? undefined}
            onExit={onClose}
            onSaved={onSaved}
            initialMeta={record ? metaOf(record) : undefined}
            initialBlocks={Array.isArray(record?.blocks) ? (record.blocks as Block[]) : []}
          />
        </div>
      )}
    </SidePanel>
  );
}
