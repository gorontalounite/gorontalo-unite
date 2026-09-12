/**
 * Selecting a column PostgREST does not know about fails the whole query, so a
 * screen that reads a freshly-added column would go blank on any environment
 * where the migration has not run yet.
 *
 * This retries once without the optional columns and reports which ones are
 * missing, so the UI can show those cells as read-only instead of erroring.
 *
 * Delete the `optional` argument at each call site once
 * `supabase/migrations/20260912090000_admin_grid_columns.sql` has been applied
 * everywhere.
 */
const UNDEFINED_COLUMN = "42703";

interface QueryResult<T> {
  data: T[] | null;
  error: { code?: string; message?: string } | null;
}

export async function selectWithOptional<T>(
  run: (columns: string) => PromiseLike<QueryResult<T>>,
  base: string[],
  optional: string[],
): Promise<{ rows: T[]; missing: string[]; error: string | null }> {
  const first = await run([...base, ...optional].join(", "));
  if (!first.error) return { rows: first.data ?? [], missing: [], error: null };
  if (first.error.code !== UNDEFINED_COLUMN) {
    return { rows: [], missing: [], error: first.error.message ?? "Query gagal." };
  }

  const second = await run(base.join(", "));
  return {
    rows: second.data ?? [],
    missing: optional,
    error: second.error?.message ?? null,
  };
}
