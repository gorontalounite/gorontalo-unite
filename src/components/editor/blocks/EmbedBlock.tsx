"use client";
import { Block, EmbedAttrs } from "../types";

interface Props { block: Block; onChange: (b: Block) => void; selected: boolean }

function getYouTubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([A-Za-z0-9_-]{11})/);
  return m?.[1] ?? null;
}

export default function EmbedBlock({ block, onChange, selected }: Props) {
  const attrs  = block.attrs as EmbedAttrs;
  const url    = attrs.url ?? "";
  const ytId   = getYouTubeId(url);

  return (
    <div>
      {selected && (
        <input
          type="text"
          value={url}
          onChange={(e) => onChange({ ...block, attrs: { ...attrs, url: e.target.value } })}
          placeholder="Tempel URL YouTube, Vimeo, atau embed lainnya…"
          className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2D7D46] mb-2"
        />
      )}
      {ytId ? (
        <div className="aspect-video rounded-xl overflow-hidden bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${ytId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      ) : url ? (
        <div className="border border-gray-200 rounded-xl p-4 text-sm text-gray-500">
          🔗 <a href={url} target="_blank" rel="noreferrer" className="text-[#2D7D46] underline">{url}</a>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-400 text-sm">
          ▷ Tempel URL untuk embed video atau konten
        </div>
      )}
      {selected && (
        <input
          type="text"
          value={attrs.caption ?? ""}
          onChange={(e) => onChange({ ...block, attrs: { ...attrs, caption: e.target.value } })}
          placeholder="Caption (opsional)…"
          className="mt-1.5 w-full text-sm text-center text-gray-400 outline-none bg-transparent placeholder:text-gray-300 border-b border-transparent focus:border-gray-200"
        />
      )}
    </div>
  );
}
