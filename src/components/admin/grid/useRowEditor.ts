"use client";

import { useState } from "react";

interface Options<T> {
  /** Which API route a given row belongs to — City Guide has two. */
  endpointFor: (row: T) => string;
  /** Lets a caller widen the request body, e.g. an endpoint that revalidates whole records. */
  bodyFor?: (row: T, patch: Partial<T>) => Record<string, unknown>;
}

/**
 * Optimistic inline editing for a grid: the cell changes immediately, and the
 * row snaps back with an error message if the PATCH is refused.
 */
export function useRowEditor<T extends { id: string }>(initial: T[], { endpointFor, bodyFor }: Options<T>) {
  const [rows, setRows] = useState(initial);
  const [seed, setSeed] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [savingIds, setSavingIds] = useState<Set<string>>(() => new Set());

  // The server component re-renders on filter, sort and page changes; adopt the
  // fresh rows during render rather than in an effect.
  if (seed !== initial) {
    setSeed(initial);
    setRows(initial);
  }

  function mark(id: string, saving: boolean) {
    setSavingIds((current) => {
      const next = new Set(current);
      if (saving) next.add(id); else next.delete(id);
      return next;
    });
  }

  async function update(row: T, patch: Partial<T>) {
    setRows((current) => current.map((item) => (item.id === row.id ? { ...item, ...patch } : item)));
    mark(row.id, true);
    try {
      const response = await fetch(endpointFor(row), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: row.id, ...(bodyFor ? bodyFor(row, patch) : patch) }),
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error ?? `Perubahan ditolak server (${response.status}).`);
      }
      setError(null);
    } catch (cause) {
      setRows((current) => current.map((item) => (item.id === row.id ? row : item)));
      setError(cause instanceof Error ? cause.message : "Perubahan gagal disimpan.");
    } finally {
      mark(row.id, false);
    }
  }

  return { rows, setRows, update, savingIds, error, setError };
}
