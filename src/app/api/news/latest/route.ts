import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

// Public endpoint — no auth required
// Returns latest 5 published news articles (excluding Portfolio)
export async function GET() {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("articles")
    .select("id, title, slug, category, image_url, published_at, created_at")
    .eq("published", true)
    .neq("category", "Portfolio")
    .order("published_at", { ascending: false })
    .limit(5);

  if (error) return NextResponse.json({ data: [] });
  return NextResponse.json({ data: data ?? [] });
}
