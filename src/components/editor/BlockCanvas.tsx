"use client";
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
    case "divider":   return <hr className="border-gray-200 my-1" />;
    default:          return null;
  }
}

export default function BlockCanvas({ blocks, selectedId, onChange, onSelect }: Props) {
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

  const move = (id: string, dir: -1 | 1) => {
    const idx = blocks.findIndex((b) => b.id === id);
    if (idx < 0) return;
    const next = [...blocks];
    const swap = idx + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    onChange(next);
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

  return (
    <div className="relative">
      {/* Top inserter */}
      <div className="py-1">
        <BlockInserter onInsert={(t) => insert(0, t)} />
      </div>

      {blocks.map((block, idx) => {
        const selected = block.id === selectedId;
        const meta     = BLOCK_REGISTRY.find((m) => m.type === block.type);

        return (
          <div key={block.id}>
            <div
              className={`group relative rounded-xl transition-all ${
                selected
                  ? "ring-2 ring-blue-400 ring-offset-2 bg-white shadow-sm"
                  : "hover:ring-1 hover:ring-gray-200 bg-white"
              }`}
              onClick={() => onSelect(block.id)}
            >
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
                <div className="absolute -top-7 right-0 flex items-center gap-0.5 bg-white border border-gray-200 rounded-lg shadow-sm px-1 py-0.5 z-10">
                  {/* Change type */}
                  <div className="relative group/type">
                    <button type="button" className="text-[11px] text-gray-500 hover:text-gray-800 px-1.5 py-0.5 rounded hover:bg-gray-100">
                      {meta?.icon} ▾
                    </button>
                    <div className="hidden group-hover/type:grid absolute top-6 right-0 bg-white border border-gray-100 rounded-xl shadow-xl p-2 grid-cols-3 gap-1 w-48 z-20">
                      {BLOCK_REGISTRY.map((m) => (
                        <button key={m.type} type="button"
                          onClick={() => changeType(block.id, m.type)}
                          className={`flex flex-col items-center p-1.5 rounded-lg text-center hover:bg-gray-50 ${m.type === block.type ? "bg-blue-50 text-blue-600" : "text-gray-600"}`}
                        >
                          <span className="text-base">{m.icon}</span>
                          <span className="text-[10px] font-medium">{m.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="w-px h-4 bg-gray-200 mx-0.5" />
                  <button type="button" onClick={() => move(block.id, -1)} disabled={idx === 0}
                    className="text-xs text-gray-400 hover:text-gray-700 px-1 py-0.5 rounded hover:bg-gray-100 disabled:opacity-30">↑</button>
                  <button type="button" onClick={() => move(block.id, 1)} disabled={idx === blocks.length - 1}
                    className="text-xs text-gray-400 hover:text-gray-700 px-1 py-0.5 rounded hover:bg-gray-100 disabled:opacity-30">↓</button>
                  <button type="button" onClick={() => duplicate(block.id)}
                    className="text-xs text-gray-400 hover:text-gray-700 px-1.5 py-0.5 rounded hover:bg-gray-100" title="Duplikat">⎘</button>
                  <div className="w-px h-4 bg-gray-200 mx-0.5" />
                  <button type="button" onClick={() => remove(block.id)}
                    className="text-xs text-red-400 hover:text-red-600 px-1.5 py-0.5 rounded hover:bg-red-50">✕</button>
                </div>
              )}

              {/* Block content */}
              <div className="p-3">
                <BlockEditor block={block} selected={selected} onChange={update} />
              </div>
            </div>

            {/* Inserter after each block */}
            <div className="py-1 opacity-0 hover:opacity-100 transition-opacity focus-within:opacity-100">
              <BlockInserter onInsert={(t) => insert(idx + 1, t)} />
            </div>
          </div>
        );
      })}

      {blocks.length === 0 && (
        <div
          className="text-center py-16 text-gray-300 text-sm cursor-pointer hover:text-gray-400 transition-colors rounded-xl border-2 border-dashed border-gray-100 hover:border-gray-200"
          onClick={() => insert(0, "paragraph")}
        >
          <p className="text-4xl mb-2">+</p>
          <p>Klik untuk menambahkan blok pertama</p>
        </div>
      )}
    </div>
  );
}
