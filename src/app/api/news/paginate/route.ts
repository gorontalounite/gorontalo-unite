import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

const PAGE_SIZE = 6;

// Public endpoint — no auth required
// GET /api/news/paginate?page=2          → returns page N (replace)
// GET /api/news/paginate?offset=6        → returns next batch from offset (load-more)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page   = parseInt(searchParams.get("page")   ?? "1", 10);
  const offset = parseInt(searchParams.get("offset") ?? "-1", 10);

  // offset takes priority (mobile load-more)
  const from = offset >= 0 ? offset : (page - 1) * PAGE_SIZE;
  const to   = from + PAGE_SIZE - 1;

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("articles")
    .select("id, title, slug, excerpt, image_url, category, published_at, created_at")
    .eq("published", true)
    .neq("category", "Portfolio")
    .neq("category", "Event")
    .order("published_at", { ascending: false, nullsFirst: false })
    .range(from, to);

  if (error) {
    console.error("[/api/news/paginate] query failed", { code: error.code });
    return NextResponse.json({ data: [], error: "NEWS_UNAVAILABLE" }, { status: 500 });
  }
  return NextResponse.json({ data: data ?? [] });
}
