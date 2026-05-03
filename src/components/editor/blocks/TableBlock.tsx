"use client";

import { useRef, useCallback } from "react";
import { Block, TableAttrs } from "../types";

interface Props {
  block: Block;
  onChange: (b: Block) => void;
  selected: boolean;
}

function parseContent(content: string, rows: number, cols: number): string[][] {
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) return parsed as string[][];
  } catch {
    // fall through
  }
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => ""));
}

export default function TableBlock({ block, onChange, selected }: Props) {
  const attrs = block.attrs as TableAttrs;
  const rows = attrs.rows ?? 3;
  const cols = attrs.cols ?? 3;
  const hasHeader = attrs.hasHeader ?? true;

  const data = parseContent(block.content, rows, cols);

  const updateData = useCallback(
    (newData: string[][]) => {
      onChange({ ...block, content: JSON.stringify(newData) });
    },
    [block, onChange]
  );

  const updateAttrs = useCallback(
    (newAttrs: Partial<TableAttrs>) => {
      onChange({ ...block, attrs: { ...block.attrs, ...newAttrs } });
    },
    [block, onChange]
  );

  const cellInput = (rowIdx: number, colIdx: number, isHeader: boolean) => {
    const val = data[rowIdx]?.[colIdx] ?? "";
    const Tag = isHeader ? "th" : "td";
    return (
      <Tag
        key={colIdx}
        contentEditable="true"
        suppressContentEditableWarning
        onBlur={(e) => {
          const newData = data.map((r) => [...r]);
          if (!newData[rowIdx]) newData[rowIdx] = Array(cols).fill("");
          newData[rowIdx][colIdx] = e.currentTarget.textContent ?? "";
          updateData(newData);
        }}
        className={`border border-gray-300 dark:border-zinc-600 px-2 py-1 text-sm outline-none focus:bg-blue-50 dark:focus:bg-blue-900/20 min-w-[80px] ${
          isHeader
            ? "bg-gray-100 dark:bg-zinc-700 font-semibold text-gray-800 dark:text-gray-200"
            : "bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300"
        }`}
        dangerouslySetInnerHTML={{ __html: val }}
      />
    );
  };

  const addRow = () => {
    const newData = [...data, Array(cols).fill("")];
    onChange({ ...block, content: JSON.stringify(newData), attrs: { ...block.attrs, rows: rows + 1 } });
  };

  const addCol = () => {
    const newData = data.map((r) => [...r, ""]);
    onChange({ ...block, content: JSON.stringify(newData), attrs: { ...block.attrs, cols: cols + 1 } });
  };

  const removeRow = () => {
    if (rows <= 1) return;
    const newData = data.slice(0, -1);
    onChange({ ...block, content: JSON.stringify(newData), attrs: { ...block.attrs, rows: rows - 1 } });
  };

  const removeCol = () => {
    if (cols <= 1) return;
    const newData = data.map((r) => r.slice(0, -1));
    onChange({ ...block, content: JSON.stringify(newData), attrs: { ...block.attrs, cols: cols - 1 } });
  };

  return (
    <div className="space-y-2">
      {selected && (
        <div className="flex flex-wrap gap-1 p-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-600 rounded-xl text-xs">
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); addRow(); }}
            className="px-2 py-1 rounded-lg border border-gray-200 dark:border-zinc-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
          >+ Baris</button>
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); addCol(); }}
            className="px-2 py-1 rounded-lg border border-gray-200 dark:border-zinc-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
          >+ Kolom</button>
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); removeRow(); }}
            disabled={rows <= 1}
            className="px-2 py-1 rounded-lg border border-gray-200 dark:border-zinc-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 disabled:opacity-40"
          >- Baris</button>
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); removeCol(); }}
            disabled={cols <= 1}
            className="px-2 py-1 rounded-lg border border-gray-200 dark:border-zinc-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 disabled:opacity-40"
          >- Kolom</button>
          <div className="w-px h-5 bg-gray-200 dark:bg-zinc-600 self-center mx-0.5" />
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); updateAttrs({ hasHeader: !hasHeader }); }}
            className={`px-2 py-1 rounded-lg border transition-colors ${
              hasHeader
                ? "border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                : "border-gray-200 dark:border-zinc-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
            }`}
          >Header</button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="border-collapse w-full text-sm">
          <tbody>
            {data.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((_, colIdx) =>
                  cellInput(rowIdx, colIdx, hasHeader && rowIdx === 0)
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
