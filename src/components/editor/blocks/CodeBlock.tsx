"use client";
import { Block, CodeAttrs } from "../types";
const LANGS = ["javascript","typescript","python","html","css","json","bash","sql","php","java","kotlin","swift","go","rust","plaintext"];
interface Props { block: Block; onChange: (b: Block) => void; selected: boolean }
export default function CodeBlock({ block, onChange, selected }: Props) {
  const attrs = block.attrs as CodeAttrs;
  return (
    <div className="rounded-xl bg-gray-900 overflow-hidden">
      {selected && (
        <div className="flex items-center gap-2 px-3 pt-2">
          <select
            value={attrs.language ?? "javascript"}
            onChange={(e) => onChange({ ...block, attrs: { ...attrs, language: e.target.value } })}
            className="text-xs bg-gray-800 text-gray-300 border border-gray-700 rounded px-2 py-0.5 outline-none"
          >
            {LANGS.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>
      )}
      <textarea
        value={block.content}
        onChange={(e) => onChange({ ...block, content: e.target.value })}
        placeholder="// Tulis kode di sini…"
        rows={5}
        className="w-full p-3 font-mono text-sm text-green-300 bg-transparent outline-none resize-y placeholder:text-gray-600"
        spellCheck={false}
      />
    </div>
  );
}
