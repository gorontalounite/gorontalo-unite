"use client";
import { useRef, useState } from "react";
import { Block, ImageAttrs } from "../types";

interface Props { block: Block; onChange: (b: Block) => void; selected: boolean }

export default function ImageBlock({ block, onChange, selected }: Props) {
  const attrs   = block.attrs as ImageAttrs;
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const set = (patch: Partial<ImageAttrs>) =>
    onChange({ ...block, attrs: { ...attrs, ...patch } });

  const handleUpload = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res  = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (res.ok) set({ url: json.url });
    setUploading(false);
  };

  const sizeClass =
    attrs.size === "small"  ? "max-w-sm mx-auto" :
    attrs.size === "medium" ? "max-w-lg mx-auto" :
    attrs.size === "large"  ? "max-w-2xl mx-auto" : "w-full";

  return (
    <div>
      {attrs.url ? (
        <div className={sizeClass}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={attrs.url}
            alt={attrs.alt ?? ""}
            className="w-full rounded-xl border border-gray-100 object-cover"
            style={{ maxHeight: 420 }}
          />
          {selected && (
            <input
              type="text"
              value={attrs.caption ?? ""}
              onChange={(e) => set({ caption: e.target.value })}
              placeholder="Caption gambar (opsional)…"
              className="mt-1.5 w-full text-sm text-center text-gray-500 outline-none bg-transparent placeholder:text-gray-300 border-b border-transparent focus:border-gray-200"
            />
          )}
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-[#2D7D46] transition-colors"
          onClick={() => fileRef.current?.click()}
        >
          <p className="text-3xl mb-2">🖼</p>
          <p className="text-sm text-gray-400">Klik untuk unggah gambar</p>
          <p className="text-xs text-gray-300 mt-1">atau tempel URL di bawah</p>
        </div>
      )}

      {selected && (
        <div className="mt-2 flex gap-2 flex-wrap">
          <input
            type="text"
            value={attrs.url ?? ""}
            onChange={(e) => set({ url: e.target.value })}
            placeholder="URL gambar…"
            className="flex-1 min-w-0 text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#2D7D46]"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 disabled:opacity-50 whitespace-nowrap"
          >
            {uploading ? "…" : "📂 Unggah"}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }}
          />
          {/* Size */}
          <div className="w-full flex items-center gap-1 mt-0.5">
            <span className="text-[11px] text-gray-400 mr-1">Ukuran:</span>
            {(["small","medium","large","full"] as const).map((s) => (
              <button key={s} type="button"
                onClick={() => set({ size: s })}
                className={`text-[11px] px-1.5 py-0.5 rounded capitalize ${attrs.size === s ? "bg-blue-100 text-blue-700" : "text-gray-400 hover:text-gray-600"}`}
              >{s}</button>
            ))}
            <span className="text-[11px] text-gray-400 ml-2 mr-1">Alt:</span>
            <input
              type="text"
              value={attrs.alt ?? ""}
              onChange={(e) => set({ alt: e.target.value })}
              placeholder="alt text…"
              className="flex-1 text-[11px] border border-gray-200 rounded-lg px-2 py-0.5 outline-none focus:border-[#2D7D46]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
