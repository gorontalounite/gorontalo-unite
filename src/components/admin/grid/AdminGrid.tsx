"use client";

import { useRef, type ReactNode } from "react";

export interface GridColumn<T> {
  key: string;
  header: string;
  /** Fixed pixel width. The table is `table-fixed`, so every column needs one. */
  width: number;
  /** Sticks to the left edge while the rest of the table scrolls under it. */
  frozen?: boolean;
  /** Sort key handed back to `onSort`; omit to make the header inert. */
  sort?: string;
  align?: "left" | "center";
  /** `index` is the row's position on the current page, from 0. */
  render: (row: T, index: number) => ReactNode;
}

interface Props<T> {
  rows: T[];
  columns: GridColumn<T>[];
  rowKey: (row: T) => string;
  selected: Set<string>;
  onToggleRow: (id: string) => void;
  onToggleAll: () => void;
  sortField?: string;
  sortDir?: "asc" | "desc";
  onSort?: (field: string) => void;
  /** Enables drag handles. Only pass this where the table owns a real order column. */
  onReorder?: (draggedId: string, targetId: string) => void;
  savingIds?: Set<string>;
  empty: ReactNode;
}

/** Drag handle + checkbox live in one fixed gutter that is always frozen. */
const GUTTER_WIDTH = 68;

function SortMark({ active, dir }: { active: boolean; dir: "asc" | "desc" }) {
  if (!active) return <span className="ml-1 text-[9px] text-gray-300">⇅</span>;
  return <span className="ml-1 text-[9px] text-gray-600">{dir === "asc" ? "▲" : "▼"}</span>;
}

export default function AdminGrid<T>({
  rows, columns, rowKey, selected, onToggleRow, onToggleAll,
  sortField, sortDir = "desc", onSort, onReorder, savingIds, empty,
}: Props<T>) {
  const dragId = useRef<string | null>(null);

  // Left offsets for the sticky columns, measured from the gutter outwards.
  const offsets = new Map<string, number>();
  let cursor = GUTTER_WIDTH;
  for (const column of columns) {
    if (!column.frozen) break;
    offsets.set(column.key, cursor);
    cursor += column.width;
  }
  const totalWidth = columns.reduce((sum, column) => sum + column.width, GUTTER_WIDTH);

  const allSelected = rows.length > 0 && rows.every((row) => selected.has(rowKey(row)));

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        {rows.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">{empty}</div>
        ) : (
          <table className="table-fixed border-collapse text-sm" style={{ width: totalWidth }}>
            <colgroup>
              <col style={{ width: GUTTER_WIDTH }} />
              {columns.map((column) => <col key={column.key} style={{ width: column.width }} />)}
            </colgroup>

            <thead>
              <tr className="border-b border-gray-200">
                <th className="sticky left-0 z-20 bg-white px-3 py-3 text-left align-middle">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={onToggleAll}
                    aria-label="Pilih semua baris"
                    className="ml-6 h-3.5 w-3.5 accent-[#F5C400]"
                  />
                </th>
                {columns.map((column) => {
                  const active = Boolean(column.sort) && column.sort === sortField;
                  return (
                    <th
                      key={column.key}
                      className={`border-l border-gray-100 bg-white px-3 py-3 text-left align-middle text-[12px] font-normal text-gray-500 ${
                        column.frozen ? "sticky z-20" : ""
                      }`}
                      style={column.frozen ? { left: offsets.get(column.key) } : undefined}
                    >
                      {column.sort && onSort ? (
                        <button
                          type="button"
                          onClick={() => onSort(column.sort as string)}
                          className="flex max-w-full items-center truncate hover:text-gray-800"
                        >
                          <span className="truncate">{column.header}</span>
                          <SortMark active={active} dir={sortDir} />
                        </button>
                      ) : (
                        <span className="block truncate">{column.header}</span>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, rowIndex) => {
                const id = rowKey(row);
                const isSelected = selected.has(id);
                const isSaving = savingIds?.has(id) ?? false;
                const rowBackground = isSelected ? "bg-[#fffbea]" : "bg-white";
                return (
                  <tr
                    key={id}
                    draggable={Boolean(onReorder)}
                    onDragStart={() => { dragId.current = id; }}
                    onDragOver={onReorder ? (event) => event.preventDefault() : undefined}
                    onDrop={onReorder ? () => {
                      if (dragId.current && dragId.current !== id) onReorder(dragId.current, id);
                      dragId.current = null;
                    } : undefined}
                    className={`group border-b border-gray-100 ${isSaving ? "opacity-60" : ""}`}
                  >
                    <td className={`sticky left-0 z-10 px-3 py-2 align-middle ${rowBackground}`}>
                      <div className="flex items-center gap-1.5">
                        <span
                          aria-hidden="true"
                          className={`select-none text-[13px] leading-none text-gray-300 ${
                            onReorder ? "cursor-grab active:cursor-grabbing group-hover:text-gray-400" : "opacity-0"
                          }`}
                          title={onReorder ? "Seret untuk mengubah urutan" : undefined}
                        >
                          ⠿
                        </span>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggleRow(id)}
                          aria-label="Pilih baris"
                          className="h-3.5 w-3.5 accent-[#F5C400]"
                        />
                      </div>
                    </td>
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`border-l border-gray-100 px-3 py-2 align-middle ${rowBackground} ${
                          column.frozen ? "sticky z-10" : ""
                        } ${column.align === "center" ? "text-center" : ""}`}
                        style={column.frozen ? { left: offsets.get(column.key) } : undefined}
                      >
                        {column.render(row, rowIndex)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
