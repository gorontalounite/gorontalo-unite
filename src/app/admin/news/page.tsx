import { createAdminClient } from "@/lib/supabase/admin";
import NewsAdminList from "./NewsAdminList";

export const dynamic  = "force-dynamic";
export const metadata = { title: "Berita | Admin Gorontalo Unite" };

type SortField = "title" | "category" | "published_at" | "created_at";
type SortDir   = "asc" | "desc";

interface PageProps {
  searchParams: Promise<{
    q?:        string;
    category?: string;
    status?:   string;
    page?:     string;
    pageSize?: string;
    sort?:     string;
    dir?:      string;
  }>;
}

export default async function AdminNewsPage({ searchParams }: PageProps) {
  const sp       = await searchParams;
  const page     = Math.max(1, parseInt(sp.page     ?? "1"));
  const pageSize = Math.min(50, Math.max(10, parseInt(sp.pageSize ?? "25")));
  const q        = sp.q        ?? "";
  const category = sp.category ?? "";
  const status   = sp.status   ?? "all";
  const sortField: SortField = (["title","category","published_at","created_at"].includes(sp.sort ?? "")
    ? sp.sort : "created_at") as SortField;
  const sortDir: SortDir = sp.dir === "asc" ? "asc" : "desc";

  const admin = createAdminClient();

  // Build filtered, paginated query
  // eslint-disable-next-line prefer-const
  let qb = admin
    .from("articles")
    .select("id, title, slug, category, published, published_at, created_at", { count: "exact" })
    .neq("category", "Portfolio")
    .order(sortField, { ascending: sortDir === "asc", nullsFirst: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (q)                         qb = qb.or(`title.ilike.%${q}%,slug.ilike.%${q}%`);
  if (category && category !== "all") qb = qb.eq("category", category);
  if (status === "published")    qb = qb.eq("published", true);
  if (status === "draft")        qb = qb.eq("published", false);

  // Distinct categories for filter dropdown (separate lightweight query)
  const { data: catRows } = await admin
    .from("articles")
    .select("category")
    .neq("category", "Portfolio");
  const allCategories = [...new Set((catRows ?? []).map((r) => r.category as string))].sort();

  const { data: items, count } = await qb;

  return (
    <NewsAdminList
      initialItems={items ?? []}
      totalCount={count ?? 0}
      page={page}
      pageSize={pageSize}
      q={q}
      category={category}
      status={status}
      sortField={sortField}
      sortDir={sortDir}
      allCategories={allCategories}
    />
  );
}
