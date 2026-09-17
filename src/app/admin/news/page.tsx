import { createClient } from "@/lib/supabase/server";
import NewsAdminList, { type NewsRow } from "./NewsAdminList";
import { selectWithOptional } from "@/lib/supabase/optional-columns";
import { resolveWebCategoryLabel, buildCategoryDeskMap, WEB_CATEGORIES, type CategoryRow } from "@/app/berita/categories";

export const dynamic  = "force-dynamic";
export const metadata = { title: "Berita | Admin Gorontalo Unite" };

type SortField = "title" | "category" | "published_at" | "created_at" | "published" | "is_trending" | "editor_choice";
type SortDir   = "asc" | "desc";

const SORT_FIELDS: SortField[] = ["title", "category", "published_at", "created_at", "published", "is_trending", "editor_choice"];

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
  is_trending:  boolean | null;
  editor_choice: boolean | null;
  is_sponsored:  boolean | null;
  sponsor_name:  string | null;
  sponsor_logo_url: string | null;
  author_id:    string | null;
  published:    boolean;
  published_at: string | null;
  created_at:   string;
  deleted_at:   string | null;
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
  const sortField: SortField = (SORT_FIELDS as string[]).includes(sp.sort ?? "")
    ? (sp.sort as SortField) : "created_at";
  const sortDir: SortDir = sp.dir === "asc" ? "asc" : "desc";

  const admin = await createClient();

  const runArticles = (columns: string) => {
    let qb = admin.from("articles").select(columns).neq("category", "Portfolio").limit(1000);
    if (q)                      qb = qb.or(`title.ilike.%${q}%,slug.ilike.%${q}%`);
    if (status === "published") qb = qb.eq("published", true);
    if (status === "draft")     qb = qb.eq("published", false);
    // Staff read binned rows under RLS, so every view except the bin has to
    // exclude them explicitly.
    qb = status === "trash" ? qb.not("deleted_at", "is", null) : qb.is("deleted_at", null);
    // The column list is built at runtime, so supabase-js cannot infer the row.
    return qb as unknown as PromiseLike<{ data: ArticleRow[] | null; error: { code?: string; message?: string } | null }>;
  };

  const [articles, { data: categoryRows }, { data: profileRows }] = await Promise.all([
    selectWithOptional<ArticleRow>(
      runArticles,
      ["id", "title", "slug", "category", "categories", "tags", "excerpt", "image_url", "is_trending", "editor_choice", "is_sponsored", "sponsor_name", "sponsor_logo_url", "author_id", "published", "published_at", "created_at", "deleted_at"],
      [],
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

  const newest = (row: typeof filtered[number]) => new Date(row.created_at).getTime();
  // Ascending puts the "on" rows first — Live before Draft, Featured before the
  // rest. Sorting a boolean the usual way would make the first click surface
  // everything the editor was not looking for, since most rows are "off".
  const flag = (value: boolean | null) => (value ? 0 : 1);

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortField === "title")             cmp = a.title.localeCompare(b.title, "id");
    else if (sortField === "category")     cmp = a.canonicalCategory.localeCompare(b.canonicalCategory, "id");
    else if (sortField === "published_at") cmp = new Date(a.published_at ?? a.created_at).getTime() - new Date(b.published_at ?? b.created_at).getTime();
    else if (sortField === "published")    cmp = flag(a.published) - flag(b.published);
    else if (sortField === "is_trending")  cmp = flag(a.is_trending) - flag(b.is_trending);
    else if (sortField === "editor_choice") cmp = flag(a.editor_choice) - flag(b.editor_choice);
    else                                   cmp = newest(a) - newest(b);
    const ordered = sortDir === "asc" ? cmp : -cmp;
    // A boolean splits the list into two blocks and says nothing about the
    // order inside them, and the query has no ORDER BY to fall back on. Break
    // the tie by newest first so the page does not reshuffle between loads.
    return ordered !== 0 ? ordered : newest(b) - newest(a);
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
    is_trending: Boolean(row.is_trending),
    editor_choice: Boolean(row.editor_choice),
    is_sponsored: Boolean(row.is_sponsored),
    sponsor_name: row.sponsor_name,
    sponsor_logo_url: row.sponsor_logo_url,
    author_id: row.author_id,
    published: row.published,
    published_at: row.published_at,
    created_at: row.created_at,
    deleted_at: row.deleted_at ?? null,
  }));

  // Tab counts come from their own queries. The list above holds one status
  // at a time, so counting it would only ever describe the tab already open.
  const countOf = () => admin
    .from("articles")
    .select("id", { count: "exact", head: true })
    .neq("category", "Portfolio");
  const [{ count: liveTotal }, { count: livePublished }, { count: trashTotal }] = await Promise.all([
    countOf().is("deleted_at", null),
    countOf().is("deleted_at", null).eq("published", true),
    countOf().not("deleted_at", "is", null),
  ]);
  const allCount = liveTotal ?? 0;
  const publishedCount = livePublished ?? 0;
  const trashCount = trashTotal ?? 0;

  return (
    <NewsAdminList
      initialItems={items}
      totalCount={totalCount}
      allCount={allCount}
      publishedCount={publishedCount}
      draftCount={allCount - publishedCount}
      trashCount={trashCount}
      page={page}
      pageSize={pageSize}
      q={q}
      category={category}
      status={status}
      sortField={sortField}
      sortDir={sortDir}
      allCategories={CATEGORY_OPTIONS}
      authors={authors}
    />
  );
}
