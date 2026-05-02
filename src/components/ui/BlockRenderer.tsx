"use client";

import Image from "next/image";
import type { Block } from "@/components/editor/types";

interface Props {
  blocks: Block[];
  className?: string;
}

function getYouTubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([A-Za-z0-9_-]{11})/);
  return m?.[1] ?? null;
}

function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    /* ── Paragraph ────────────────────────────────── */
    case "paragraph": {
      const align = block.attrs?.align as string | undefined;
      const cls =
        align === "center" ? "text-center" :
        align === "right"  ? "text-right"  : "";
      return (
        <p className={`text-gray-700 dark:text-gray-300 leading-relaxed mb-4 ${cls}`}>
          {block.content}
        </p>
      );
    }

    /* ── Heading ──────────────────────────────────── */
    case "heading": {
      const level = (block.attrs?.level as number) ?? 2;
      const align = block.attrs?.align as string | undefined;
      const alignCls =
        align === "center" ? "text-center" :
        align === "right"  ? "text-right"  : "";
      const sizeCls = [
        "",
        "text-4xl font-bold mt-10 mb-4",
        "text-3xl font-bold mt-8 mb-3",
        "text-2xl font-semibold mt-6 mb-2",
        "text-xl font-semibold mt-5 mb-2",
        "text-lg font-medium mt-4 mb-1",
        "text-base font-medium mt-4 mb-1",
      ][level];
      const HTag = `h${level}` as "h1"|"h2"|"h3"|"h4"|"h5"|"h6";
      return (
        <HTag className={`${sizeCls} ${alignCls} text-gray-900 dark:text-white leading-tight`}>
          {block.content}
        </HTag>
      );
    }

    /* ── Image ────────────────────────────────────── */
    case "image": {
      const url     = block.attrs?.url as string | undefined;
      const alt     = (block.attrs?.alt as string | undefined) ?? "";
      const caption = block.attrs?.caption as string | undefined;
      const size    = block.attrs?.size as string | undefined;
      if (!url) return null;
      const wrapCls =
        size === "small"  ? "max-w-sm mx-auto" :
        size === "medium" ? "max-w-lg mx-auto" :
        size === "large"  ? "max-w-2xl mx-auto" : "w-full";
      return (
        <figure className={`my-6 ${wrapCls}`}>
          <div className="relative rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={alt} className="w-full h-auto object-cover" loading="lazy" />
          </div>
          {caption && (
            <figcaption className="text-xs text-center text-gray-400 dark:text-gray-500 mt-2">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    /* ── Gallery ──────────────────────────────────── */
    case "gallery": {
      const imgs = (block.attrs?.images as Array<{ url: string; caption?: string }>) ?? [];
      const cols = (block.attrs?.columns as number) ?? 2;
      if (!imgs.length) return null;
      const gridCls =
        cols === 3 ? "grid-cols-3" :
        cols === 4 ? "grid-cols-4" : "grid-cols-2";
      return (
        <div className={`grid ${gridCls} gap-3 my-6`}>
          {imgs.map((img, i) => (
            <div key={i} className="aspect-video relative rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.caption ?? ""} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      );
    }

    /* ── List ─────────────────────────────────────── */
    case "list": {
      const items   = (block.attrs?.items as string[]) ?? [];
      const ordered = block.attrs?.ordered as boolean;
      if (!items.length) return null;
      const Tag = ordered ? "ol" : "ul";
      return (
        <Tag className={`${ordered ? "list-decimal" : "list-disc"} list-inside space-y-1.5 mb-4 text-gray-700 dark:text-gray-300 pl-2`}>
          {items.filter(Boolean).map((item, i) => (
            <li key={i} className="leading-relaxed">{item}</li>
          ))}
        </Tag>
      );
    }

    /* ── Quote ────────────────────────────────────── */
    case "quote": {
      const cite = block.attrs?.cite as string | undefined;
      return (
        <blockquote className="border-l-4 border-[#2D7D46] dark:border-emerald-500 pl-4 italic text-gray-600 dark:text-gray-400 my-5">
          <p className="leading-relaxed">{block.content}</p>
          {cite && (
            <cite className="block mt-1 text-xs text-gray-400 dark:text-gray-500 not-italic">
              — {cite}
            </cite>
          )}
        </blockquote>
      );
    }

    /* ── Code ─────────────────────────────────────── */
    case "code": {
      const lang = block.attrs?.language as string | undefined;
      return (
        <div className="my-4">
          {lang && lang !== "plaintext" && (
            <div className="bg-gray-800 text-gray-400 text-[10px] font-mono px-3 py-1 rounded-t-xl">
              {lang}
            </div>
          )}
          <pre className={`bg-gray-900 text-green-300 px-4 py-3 overflow-x-auto font-mono text-sm ${lang && lang !== "plaintext" ? "rounded-b-xl" : "rounded-xl"}`}>
            <code>{block.content}</code>
          </pre>
        </div>
      );
    }

    /* ── Divider ──────────────────────────────────── */
    case "divider":
      return <hr className="border-gray-200 dark:border-zinc-700 my-8" />;

    /* ── Embed ────────────────────────────────────── */
    case "embed": {
      const url     = block.attrs?.url as string | undefined;
      const caption = block.attrs?.caption as string | undefined;
      if (!url) return null;
      const ytId = getYouTubeId(url);
      return (
        <figure className="my-6">
          {ytId ? (
            <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-gray-100 dark:border-zinc-800">
              <iframe
                src={`https://www.youtube.com/embed/${ytId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="border border-gray-200 dark:border-zinc-700 rounded-xl p-4 text-sm text-gray-500">
              🔗{" "}
              <a href={url} target="_blank" rel="noopener noreferrer"
                className="text-[#2D7D46] dark:text-emerald-400 underline underline-offset-2">
                {url}
              </a>
            </div>
          )}
          {caption && (
            <figcaption className="text-xs text-center text-gray-400 mt-2">{caption}</figcaption>
          )}
        </figure>
      );
    }

    default:
      return null;
  }
}

export default function BlockRenderer({ blocks, className = "" }: Props) {
  if (!blocks?.length) return null;
  return (
    <div className={className}>
      {blocks.map((block) => (
        <RenderBlock key={block.id} block={block} />
      ))}
    </div>
  );
}
