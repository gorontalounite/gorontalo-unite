"use client";
import { Block, ParagraphAttrs } from "../types";

interface Props {
  block: Block;
  onChange: (b: Block) => void;
  selected: boolean;
}

export default function ParagraphBlock({ block, onChange, selected }: Props) {
  const attrs = block.attrs as ParagraphAttrs;
  const alignClass =
    attrs.align === "center" ? "text-center" :
    attrs.align === "right"  ? "text-right"  : "text-left";

  return (
    <div className="relative">
      <textarea
        value={block.content}
        onChange={(e) => onChange({ ...block, content: e.target.value })}
        placeholder="Tulis paragraf di sini…"
        rows={3}
        className={`w-full resize-none outline-none text-gray-800 text-base leading-relaxed bg-transparent placeholder:text-gray-300 ${alignClass}`}
        style={{ minHeight: 60 }}
        onInput={(e) => {
          const el = e.currentTarget;
          el.style.height = "auto";
          el.style.height = el.scrollHeight + "px";
        }}
      />
      {selected && (
        <div className="flex items-center gap-2 mt-1">
          {(["left", "center", "right"] as const).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => onChange({ ...block, attrs: { ...attrs, align: a } })}
              className={`text-[11px] px-1.5 py-0.5 rounded ${attrs.align === a ? "bg-blue-100 text-blue-700" : "text-gray-400 hover:text-gray-600"}`}
            >
              {a === "left" ? "⬤⬤⬤" : a === "center" ? " ⬤⬤ " : " ⬤⬤⬤"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
