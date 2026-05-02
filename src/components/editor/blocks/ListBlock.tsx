"use client";
import { Block, ListAttrs } from "../types";

interface Props { block: Block; onChange: (b: Block) => void; selected: boolean }

export default function ListBlock({ block, onChange, selected }: Props) {
  const attrs   = block.attrs as ListAttrs;
  const items   = attrs.items ?? [""];
  const ordered = attrs.ordered ?? false;

  const setItems = (newItems: string[]) =>
    onChange({ ...block, attrs: { ...attrs, items: newItems } });

  return (
    <div>
      {selected && (
        <div className="flex gap-2 mb-2">
          <button type="button"
            onClick={() => onChange({ ...block, attrs: { ...attrs, ordered: false } })}
            className={`text-xs px-2 py-1 rounded-lg ${!ordered ? "bg-blue-100 text-blue-700" : "text-gray-400 hover:text-gray-600"}`}
          >• Bullet</button>
          <button type="button"
            onClick={() => onChange({ ...block, attrs: { ...attrs, ordered: true } })}
            className={`text-xs px-2 py-1 rounded-lg ${ordered ? "bg-blue-100 text-blue-700" : "text-gray-400 hover:text-gray-600"}`}
          >1. Numbered</button>
        </div>
      )}
      <div className="space-y-1">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-gray-400 text-sm w-5 text-right flex-shrink-0">
              {ordered ? `${i + 1}.` : "•"}
            </span>
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                setItems(next);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const next = [...items];
                  next.splice(i + 1, 0, "");
                  setItems(next);
                }
                if (e.key === "Backspace" && item === "" && items.length > 1) {
                  e.preventDefault();
                  setItems(items.filter((_, j) => j !== i));
                }
              }}
              placeholder={`Item ${i + 1}…`}
              className="flex-1 outline-none bg-transparent text-gray-800 text-base placeholder:text-gray-300"
            />
            {selected && items.length > 1 && (
              <button type="button"
                onClick={() => setItems(items.filter((_, j) => j !== i))}
                className="text-gray-300 hover:text-red-400 text-xs"
              >✕</button>
            )}
          </div>
        ))}
      </div>
      {selected && (
        <button type="button"
          onClick={() => setItems([...items, ""])}
          className="mt-1.5 text-xs text-[#2D7D46] hover:underline"
        >+ Tambah item</button>
      )}
    </div>
  );
}
