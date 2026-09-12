import { createClient } from "@/lib/supabase/server";
import { selectWithOptional } from "@/lib/supabase/optional-columns";
import ReelsAdminClient, { type AdminReel } from "./ReelsAdminClient";

export const dynamic = "force-dynamic";
export const metadata = { title: "Reels | Admin Gorontalo Unite" };

type SortField = "order" | "title" | "category" | "publish_time";
type SortDir = "asc" | "desc";

const SORT_FIELDS: SortField[] = ["order", "title", "category", "publish_time"];

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    status?: string;
    page?: string;
    pageSize?: string;
    sort?: string;
    dir?: string;
  }>;
}

export default async function AdminReelsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1"));
  const pageSize = Math.min(50, Math.max(10, parseInt(sp.pageSize ?? "25")));
  const q = (sp.q ?? "").trim();
  const category = sp.category ?? "";
  const status = sp.status ?? "all";
  const sortField: SortField = (SORT_FIELDS as string[]).includes(sp.sort ?? "") ? (sp.sort as SortField) : "order";
  const sortDir: SortDir = sp.dir === "asc" ? "asc" : sp.dir === "desc" ? "desc" : sortField === "order" ? "asc" : "desc";

  const supabase = await createClient();
  const runReels = (columns: string) => supabase
    .from("reels")
    .select(columns)
    .order("display_order")
    .order("publish_time", { ascending: false }) as unknown as PromiseLike<{
      data: AdminReel[] | null;
      error: { code?: string; message?: string } | null;
    }>;

  const { rows, missing, error } = await selectWithOptional<AdminReel>(
    runReels,
    ["id", "account_username", "description", "publish_time", "permalink", "post_type", "category", "sponsored", "thumbnail_url", "status", "display_order", "featured", "views", "reach", "likes", "shares", "follows", "comments", "saves", "created_at", "updated_at"],
    ["title"],
  );
  const titleColumnReady = !missing.includes("title");

  // Reels are captured from Instagram, where the caption is the only text.
  // Until a title is written, the caption's first line stands in for one.
  const all = rows.map((reel) => ({
    ...reel,
    title: reel.title ?? (reel.description.split("\n")[0].trim().slice(0, 90) || null),
  }));
  const needle = q.toLowerCase();
  const filtered = all.filter((reel) => {
    if (needle && !`${reel.title ?? ""} ${reel.account_username} ${reel.description}`.toLowerCase().includes(needle)) return false;
    if (category && reel.category !== category) return false;
    if (status !== "all" && reel.status !== status) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortField === "title") cmp = (a.title ?? "").localeCompare(b.title ?? "", "id");
    else if (sortField === "category") cmp = a.category.localeCompare(b.category, "id");
    else if (sortField === "publish_time") cmp = new Date(a.publish_time).getTime() - new Date(b.publish_time).getTime();
    else cmp = a.display_order - b.display_order || new Date(b.publish_time).getTime() - new Date(a.publish_time).getTime();
    return sortDir === "asc" ? cmp : -cmp;
  });

  const start = (page - 1) * pageSize;

  return (
    <ReelsAdminClient
      initialItems={sorted.slice(start, start + pageSize)}
      initialError={error}
      titleColumnReady={titleColumnReady}
      totalCount={sorted.length}
      allCount={all.length}
      publishedCount={all.filter((reel) => reel.status === "published").length}
      draftCount={all.filter((reel) => reel.status === "draft").length}
      categories={[...new Set(all.map((reel) => reel.category))].sort()}
      page={page}
      pageSize={pageSize}
      q={q}
      category={category}
      status={status}
      sortField={sortField}
      sortDir={sortDir}
    />
  );
}
