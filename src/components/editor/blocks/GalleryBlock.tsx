"use client";
import { useRef, useState } from "react";
import { Block, GalleryAttrs } from "../types";

interface Props { block: Block; onChange: (b: Block) => void; selected: boolean }

export default function GalleryBlock({ block, onChange, selected }: Props) {
  const attrs   = block.attrs as GalleryAttrs;
  const images  = attrs.images ?? [];
  const cols    = attrs.columns ?? 2;
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const set = (patch: Partial<GalleryAttrs>) =>
    onChange({ ...block, attrs: { ...attrs, ...patch } });

  const handleUpload = async (files: FileList) => {
    setUploading(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      const res  = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (res.ok) urls.push(json.url);
    }
    set({ images: [...images, ...urls.map((url) => ({ url }))] });
    setUploading(false);
  };

  const removeImage = (idx: number) =>
    set({ images: images.filter((_, i) => i !== idx) });

  const gridClass =
    cols === 3 ? "grid-cols-3" :
    cols === 4 ? "grid-cols-4" : "grid-cols-2";

  return (
    <div>
      {images.length > 0 ? (
        <div className={`grid ${gridClass} gap-2`}>
          {images.map((img, i) => (
            <div key={i} className="relative group aspect-video rounded-xl overflow-hidden border border-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.caption ?? ""} className="w-full h-full object-cover" />
              {selected && (
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/50 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >✕</button>
              )}
            </div>
          ))}
          {selected && (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="aspect-video border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:border-[#2D7D46] hover:text-[#2D7D46] transition-colors"
            >
              {uploading ? "…" : "+"}
            </button>
          )}
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-[#2D7D46] transition-colors"
          onClick={() => fileRef.current?.click()}
        >
          <p className="text-3xl mb-2">⊞</p>
          <p className="text-sm text-gray-400">Klik untuk unggah beberapa gambar</p>
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => { if (e.target.files?.length) handleUpload(e.target.files); }}
      />

      {selected && (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[11px] text-gray-400">Kolom:</span>
          {[2,3,4].map((c) => (
            <button key={c} type="button"
              onClick={() => set({ columns: c as GalleryAttrs["columns"] })}
              className={`text-[11px] w-6 h-6 rounded font-medium ${cols === c ? "bg-blue-100 text-blue-700" : "text-gray-400 hover:text-gray-600"}`}
            >{c}</button>
          ))}
        </div>
      )}
    </div>
  );
}
