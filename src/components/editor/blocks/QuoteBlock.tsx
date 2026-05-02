"use client";
import { Block, QuoteAttrs } from "../types";
interface Props { block: Block; onChange: (b: Block) => void; selected: boolean }
export default function QuoteBlock({ block, onChange, selected }: Props) {
  const attrs = block.attrs as QuoteAttrs;
  return (
    <blockquote className="border-l-4 border-[#2D7D46] pl-4 py-1">
      <textarea
        value={block.content}
        onChange={(e) => onChange({ ...block, content: e.target.value })}
        placeholder="Tulis kutipan di sini…"
        rows={2}
        className="w-full italic text-gray-600 text-base outline-none bg-transparent resize-none placeholder:text-gray-300"
      />
      {selected && (
        <input
          type="text"
          value={attrs.cite ?? ""}
          onChange={(e) => onChange({ ...block, attrs: { ...attrs, cite: e.target.value } })}
          placeholder="Sumber / penulis (opsional)…"
          className="mt-1 w-full text-sm text-gray-400 outline-none bg-transparent placeholder:text-gray-300 border-b border-transparent focus:border-gray-200"
        />
      )}
    </blockquote>
  );
}
