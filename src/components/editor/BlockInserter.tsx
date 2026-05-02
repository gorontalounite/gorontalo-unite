"use client";
import { useState } from "react";
import { BLOCK_REGISTRY, BlockType } from "./types";

interface Props {
  onInsert: (type: BlockType) => void;
}

export default function BlockInserter({ onInsert }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex justify-center">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-7 h-7 rounded-full bg-white border-2 border-gray-200 text-gray-400 text-lg flex items-center justify-center hover:border-[#2D7D46] hover:text-[#2D7D46] transition-all shadow-sm"
        title="Tambah blok"
      >
        +
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 w-72">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
              Pilih tipe blok
            </p>
            <div className="grid grid-cols-3 gap-1">
              {BLOCK_REGISTRY.map((b) => (
                <button
                  key={b.type}
                  type="button"
                  onClick={() => { onInsert(b.type); setOpen(false); }}
                  className="flex flex-col items-center gap-1 p-2.5 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors text-center"
                >
                  <span className="text-xl">{b.icon}</span>
                  <span className="text-[11px] font-medium leading-tight">{b.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
