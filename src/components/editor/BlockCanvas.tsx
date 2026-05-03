"use client";
import { useRef, useState } from "react";
import { Block, BlockType, BLOCK_REGISTRY, createBlock } from "./types";
import BlockInserter from "./BlockInserter";
import ParagraphBlock from "./blocks/ParagraphBlock";
import HeadingBlock   from "./blocks/HeadingBlock";
import ImageBlock     from "./blocks/ImageBlock";
import GalleryBlock   from "./blocks/GalleryBlock";
import ListBlock      from "./blocks/ListBlock";
import QuoteBlock     from "./blocks/QuoteBlock";
import CodeBlock      from "./blocks/CodeBlock";
import EmbedBlock     from "./blocks/EmbedBlock";
import TableBlock     from "./blocks/TableBlock";
import CalloutBlock   from "./blocks/CalloutBlock";

interface Props {
  blocks: Block[];
  selectedId: string | null;
  onChange: (blocks: Block[]) => void;
  onSelect: (id: string | null) => void;
}

function BlockEditor({ block, selected, onChange }: { block: Block; selected: boolean; onChange: (b: Block) => void }) {
  switch (block.type) {
    case "paragraph": return <ParagraphBlock block={block} onChange={onChange} selected={selected} />;
    case "heading":   return <HeadingBlock   block={block} onChange={onChange} selected={selected} />;
    case "image":     return <ImageBlock     block={block} onChange={onChange} selected={selected} />;
    case "gallery":   return <GalleryBlock   block={block} onChange={onChange} selected={selected} />;
    case "list":      return <ListBlock      block={block} onChange={onChange} selected={selected} />;
    case "quote":     return <QuoteBlock     block={block} onChange={onChange} selected={selected} />;
    case "code":      return <CodeBlock      block={block} onChange={onChange} selected={selected} />;
    case "embed":     return <EmbedBlock     block={block} onChange={onChange} selected={selected} />;
    case "table":     return <TableBlock     block={block} onChange={onChange} selected={selected} />;
    case "callout":   return <CalloutBlock   block={block} onChange={onChange} selected={selected} />;
    case "divider":   return <hr className="border-gray-200 dark:border-zinc-700 my-1" />;
    default:          return null;
  }
}

export default function BlockCanvas({ blocks, selectedId, onChange, onSelect }: Props) {
  /* ─── Drag state ─────────────────────────────────────── */
  const dragIdRef    = useRef<string | null>(null);
  const [dropTarget, setDropTarget] = useState<{ id: string; position: "above" | "below" } | null>(null);

  const insert = (index: number, type: BlockType) => {
    const next = [...blocks];
    next.splice(index, 0, createBlock(type));
    onChange(next);
    onSelect(next[index].id);
  };

  const update = (block: Block) =>
    onChange(blocks.map((b) => (b.id === block.id ? block : b)));

  const remove = (id: string) => {
    onChange(blocks.filter((b) => b.id !== id));
    onSelect(null);
  };

  const duplicate = (id: string) => {
    const idx = blocks.findIndex((b) => b.id === id);
    if (idx < 0) return;
    const copy = { ...blocks[idx], id: crypto.randomUUID(), attrs: { ...blocks[idx].attrs } };
    const next = [...blocks];
    next.splice(idx + 1, 0, copy);
    onChange(next);
  };

  const changeType = (id: string, type: BlockType) => {
    const meta = BLOCK_REGISTRY.find((m) => m.type === type)!;
    onChange(blocks.map((b) => b.id === id ? { ...b, type, attrs: { ...meta.defaultAttrs } } : b));
  };

  /* ─── Drag handlers ──────────────────────────────────── */
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    dragIdRef.current = id;
    e.dataTransfer.effectAllowed = "move";
    // Minimal ghost — use the block wrapper itself
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragIdRef.current === id) { setDropTarget(null); return; }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    setDropTarget({ id, position: e.clientY < midpoint ? "above" : "below" });
  };

  const handleDragLeave = () => {
    setDropTarget(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    setDropTarget(null);
    const fromId = dragIdRef.current;
    dragIdRef.current = null;
    if (!fromId || fromId === targetId) return;

    const fromIdx  = blocks.findIndex((b) => b.id === fromId);
    const toIdx    = blocks.findIndex((b) => b.id === targetId);
    if (fromIdx < 0 || toIdx < 0) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    const position: "above" | "below" = e.clientY < midpoint ? "above" : "below";

    const next = blocks.filter((b) => b.id !== fromId);
    let insertAt = next.findIndex((b) => b.id === targetId);
    if (position === "below") insertAt += 1;
    next.splice(insertAt, 0, blocks[fromIdx]);
    onChange(next);
  };

  const handleDragEnd = () => {
    dragIdRef.current = null;
    setDropTarget(null);
  };

  return (
    <div className="relative">
      {/* Top inserter */}
      <div className="py-1">
        <BlockInserter onInsert={(t) => insert(0, t)} />
      </div>

      {blocks.map((block, idx) => {
        const selected = block.id === selectedId;
        const meta     = BLOCK_REGISTRY.find((m) => m.type === block.type);
        const isDropAbove = dropTarget?.id === block.id && dropTarget.position === "above";
        const isDropBelow = dropTarget?.id === block.id && dropTarget.position === "below";

        return (
          <div
            key={block.id}
            draggable
            onDragStart={(e) => handleDragStart(e, block.id)}
            onDragOver={(e) => handleDragOver(e, block.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, block.id)}
            onDragEnd={handleDragEnd}
            className="relative"
          >
            {/* Drop indicator — above */}
            {isDropAbove && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-400 z-20 rounded-full pointer-events-none" />
            )}

            <div
              className={`group relative rounded-xl transition-all ${
                selected
                  ? "ring-2 ring-blue-400 ring-offset-2 bg-white dark:bg-zinc-900 shadow-sm"
                  : "hover:ring-1 hover:ring-gray-200 dark:hover:ring-zinc-600 bg-white dark:bg-zinc-900"
              }`}
              onClick={() => onSelect(block.id)}
            >
              {/* Drag handle */}
              <div
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 flex items-center justify-center w-5 h-8 cursor-grab active:cursor-grabbing transition-opacity select-none ${
                  selected ? "opacity-60" : "opacity-0 group-hover:opacity-40"
                } text-gray-400 dark:text-gray-500 text-base`}
                title="Seret untuk pindahkan"
                onMouseDown={(e) => e.stopPropagation()}
              >
                ⠿
              </div>

              {/* Block type label */}
              <div
                className={`absolute -top-5 left-0 flex items-center gap-1 text-[10px] font-medium transition-opacity ${
                  selected ? "opacity-100 text-blue-500" : "opacity-0 group-hover:opacity-100 text-gray-400"
                }`}
              >
                <span>{meta?.icon}</span>
                <span>{meta?.label}</span>
              </div>

              {/* Toolbar */}
              {selected && (
                <div className="absolute -top-7 right-0 flex items-center gap-0.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-600 rounded-lg shadow-sm px-1 py-0.5 z-10">
                  {/* Change type */}
                  <div className="relative group/type">
                    <button type="button" className="text-[11px] text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 px-1.5 py-0.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-700">
                      {meta?.icon} ▾
                    </button>
                    <div className="hidden group-hover/type:grid absolute top-6 right-0 bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-600 rounded-xl shadow-xl p-2 grid-cols-3 gap-1 w-48 z-20">
                      {BLOCK_REGISTRY.map((m) => (
                        <button key={m.type} type="button"
                          onClick={() => changeType(block.id, m.type)}
                          className={`flex flex-col items-center p-1.5 rounded-lg text-center hover:bg-gray-50 dark:hover:bg-zinc-700 ${m.type === block.type ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600" : "text-gray-600 dark:text-gray-300"}`}
                        >
                          <span className="text-base">{m.icon}</span>
                          <span className="text-[10px] font-medium">{m.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="w-px h-4 bg-gray-200 dark:bg-zinc-600 mx-0.5" />
                  <button type="button" onClick={() => duplicate(block.id)}
                    className="text-xs text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 px-1.5 py-0.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-700" title="Duplikat">⎘</button>
                  <div className="w-px h-4 bg-gray-200 dark:bg-zinc-600 mx-0.5" />
                  <button type="button" onClick={() => remove(block.id)}
                    className="text-xs text-red-400 hover:text-red-600 px-1.5 py-0.5 rounded hover:bg-red-50 dark:hover:bg-red-950/30">✕</button>
                </div>
              )}

              {/* Block content */}
              <div className="p-3">
                <BlockEditor block={block} selected={selected} onChange={update} />
              </div>
            </div>

            {/* Drop indicator — below */}
            {isDropBelow && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 z-20 rounded-full pointer-events-none" />
            )}

            {/* Inserter after each block */}
            <div className="py-1 opacity-0 hover:opacity-100 transition-opacity focus-within:opacity-100">
              <BlockInserter onInsert={(t) => insert(idx + 1, t)} />
            </div>
          </div>
        );
      })}

      {blocks.length === 0 && (
        <div
          className="text-center py-16 text-gray-300 dark:text-zinc-600 text-sm cursor-pointer hover:text-gray-400 dark:hover:text-zinc-500 transition-colors rounded-xl border-2 border-dashed border-gray-100 dark:border-zinc-700 hover:border-gray-200 dark:hover:border-zinc-600"
          onClick={() => insert(0, "paragraph")}
        >
          <p className="text-4xl mb-2">+</p>
          <p>Klik untuk menambahkan blok pertama</p>
        </div>
      )}
    </div>
  );
}
