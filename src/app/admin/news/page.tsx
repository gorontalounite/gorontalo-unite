import { createClient } from "@/lib/supabase/server";
import NewsAdminList, { type NewsRow } from "./NewsAdminList";
import { selectWithOptional } from "@/lib/supabase/optional-columns";
import { resolveWebCategoryLabel, buildCategoryDeskMap, WEB_CATEGORIES, type CategoryRow } from "@/app/berita/categories";

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

interface ArticleRow {
  id:           string;
  title:        string;
  slug:         string;
  category:     string | null;
  categories:   string[] | null;
  tags:         string[] | null;
  excerpt:      string | null;
  image_url:    string | null;
  /** Optional until the admin-grid migration has run. */
  video_url?:   string | null;
  is_trending:  boolean | null;
  author_id:    string | null;
  published:    boolean;
  published_at: string | null;
  created_at:   string;
}

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

  const runArticles = (columns: string) => {
    let qb = admin.from("articles").select(columns).neq("category", "Portfolio").limit(1000);
    if (q)                      qb = qb.or(`title.ilike.%${q}%,slug.ilike.%${q}%`);
    if (status === "published") qb = qb.eq("published", true);
    if (status === "draft")     qb = qb.eq("published", false);
    // The column list is built at runtime, so supabase-js cannot infer the row.
    return qb as unknown as PromiseLike<{ data: ArticleRow[] | null; error: { code?: string; message?: string } | null }>;
  };

  const [articles, { data: categoryRows }, { data: profileRows }] = await Promise.all([
    selectWithOptional<ArticleRow>(
      runArticles,
      ["id", "title", "slug", "category", "categories", "tags", "excerpt", "image_url", "is_trending", "author_id", "published", "published_at", "created_at"],
      ["video_url"],
    ),
    admin.from("categories").select("id, name, parent_id, desk_key"),
    // Staff can read every profile under RLS; the Author cell picks from them.
    admin.from("user_profiles").select("id, full_name, role"),
  ]);
  const rows = articles.rows;
  const deskMap = buildCategoryDeskMap((categoryRows ?? []) as CategoryRow[]);
  const withCanonicalCategory = rows.map((row) => ({
    ...row,
    canonicalCategory: resolveWebCategoryLabel({
      category:   row.category ?? "",
      categories: row.categories,
      tags:       row.tags,
      title:      row.title,
      excerpt:    row.excerpt,
    }, deskMap),
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

  const authors = (profileRows ?? [])
    .map((row) => ({ id: String(row.id), name: (row.full_name as string | null) ?? "Tanpa nama" }))
    .sort((a, b) => a.name.localeCompare(b.name, "id"));

  const totalCount = sorted.length;
  const start      = (page - 1) * pageSize;
  const items: NewsRow[] = sorted.slice(start, start + pageSize).map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category ?? "",
    canonicalCategory: row.canonicalCategory,
    excerpt: row.excerpt,
    image_url: row.image_url,
    video_url: row.video_url ?? null,
    is_trending: Boolean(row.is_trending),
    author_id: row.author_id,
    published: row.published,
    published_at: row.published_at,
    created_at: row.created_at,
  }));

  return (
    <NewsAdminList
      initialItems={items}
      totalCount={totalCount}
      allCount={withCanonicalCategory.length}
      publishedCount={withCanonicalCategory.filter((row) => row.published).length}
      draftCount={withCanonicalCategory.filter((row) => !row.published).length}
      page={page}
      pageSize={pageSize}
      q={q}
      category={category}
      status={status}
      sortField={sortField}
      sortDir={sortDir}
      allCategories={CATEGORY_OPTIONS}
      authors={authors}
      videoColumnReady={!articles.missing.includes("video_url")}
    />
  );
}
