"use client";
import { Block, HeadingAttrs } from "../types";

interface Props { block: Block; onChange: (b: Block) => void; selected: boolean }

export default function HeadingBlock({ block, onChange, selected }: Props) {
  const attrs = block.attrs as HeadingAttrs;
  const level = attrs.level ?? 2;
  const sizeMap: Record<number, string> = {
    1: "text-4xl font-bold", 2: "text-3xl font-bold",
    3: "text-2xl font-semibold", 4: "text-xl font-semibold",
    5: "text-lg font-medium", 6: "text-base font-medium",
  };
  const alignClass =
    attrs.align === "center" ? "text-center" :
    attrs.align === "right"  ? "text-right"  : "text-left";

  return (
    <div>
      <input
        type="text"
        value={block.content}
        onChange={(e) => onChange({ ...block, content: e.target.value })}
        placeholder={`Judul H${level}…`}
        className={`w-full outline-none bg-transparent text-gray-900 ${sizeMap[level]} ${alignClass} placeholder:text-gray-300`}
      />
      {selected && (
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <span className="text-[11px] text-gray-400 mr-1">Level:</span>
          {[1,2,3,4,5,6].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => onChange({ ...block, attrs: { ...attrs, level: l as HeadingAttrs["level"] } })}
              className={`text-[11px] w-6 h-6 rounded font-bold ${level === l ? "bg-blue-100 text-blue-700" : "text-gray-400 hover:text-gray-600"}`}
            >
              {l}
            </button>
          ))}
          <span className="text-[11px] text-gray-400 ml-2 mr-1">Align:</span>
          {(["left","center","right"] as const).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => onChange({ ...block, attrs: { ...attrs, align: a } })}
              className={`text-[11px] px-1.5 py-0.5 rounded capitalize ${attrs.align === a ? "bg-blue-100 text-blue-700" : "text-gray-400 hover:text-gray-600"}`}
            >
              {a}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
