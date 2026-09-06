import { createClient } from "@/lib/supabase/server";
import NewsAdminList from "./NewsAdminList";
import { resolveWebCategoryLabel, WEB_CATEGORIES } from "@/app/berita/categories";

export const dynamic  = "force-dynamic";
export const metadata = { title: "Berita | Admin Gorontalo Unite" };

type SortField = "title" | "category" | "published_at" | "created_at";
type SortDir   = "asc" | "desc";

// Same order shown on the public homepage/nav, so the admin filter speaks
// the same vocabulary as what visitors actually see.
const CATEGORY_FILTER_ORDER = ["culture", "travel", "culinary", "life", "people", "news", "whats-on"];
const CATEGORY_OPTIONS = CATEGORY_FILTER_ORDER
  .map((key) => WEB_CATEGORIES.find((item) => item.key === key)?.label)
  .filter((label): label is string => Boolean(label));

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

  const admin = await createClient();

  let qb = admin
    .from("articles")
    .select("id, title, slug, category, categories, tags, excerpt, published, published_at, created_at")
    .neq("category", "Portfolio")
    .limit(1000);
  if (q)                      qb = qb.or(`title.ilike.%${q}%,slug.ilike.%${q}%`);
  if (status === "published") qb = qb.eq("published", true);
  if (status === "draft")     qb = qb.eq("published", false);

  const { data: rows } = await qb;
  const withCanonicalCategory = (rows ?? []).map((row) => ({
    ...row,
    canonicalCategory: resolveWebCategoryLabel({
      category:   row.category as string,
      categories: row.categories as string[] | null,
      tags:       row.tags as string[] | null,
      title:      row.title as string,
      excerpt:    row.excerpt as string | null,
    }),
  }));

  const filtered = category
    ? withCanonicalCategory.filter((row) => row.canonicalCategory === category)
    : withCanonicalCategory;

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortField === "title")             cmp = a.title.localeCompare(b.title, "id");
    else if (sortField === "category")     cmp = a.canonicalCategory.localeCompare(b.canonicalCategory, "id");
    else if (sortField === "published_at") cmp = new Date(a.published_at ?? a.created_at).getTime() - new Date(b.published_at ?? b.created_at).getTime();
    else                                   cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    return sortDir === "asc" ? cmp : -cmp;
  });

  const totalCount = sorted.length;
  const start      = (page - 1) * pageSize;
  const items = sorted.slice(start, start + pageSize).map((row) => ({
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    category: row.canonicalCategory,
    published: row.published as boolean,
    published_at: row.published_at as string | null,
    created_at: row.created_at as string,
  }));

  return (
    <NewsAdminList
      initialItems={items}
      totalCount={totalCount}
      page={page}
      pageSize={pageSize}
      q={q}
      category={category}
      status={status}
      sortField={sortField}
      sortDir={sortDir}
      allCategories={CATEGORY_OPTIONS}
    />
  );
}
