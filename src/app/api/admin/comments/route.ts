import { NextResponse }      from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient }      from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data: p } = await admin.from("user_profiles").select("role").eq("id", user.id).single();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!["admin", "editor"].includes((p as any)?.role)) return null;
  return user;
}

/* GET — list comments for an article_id (admin) */
export async function GET(req: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const articleId = searchParams.get("article_id");
  if (!articleId) return NextResponse.json({ error: "article_id required" }, { status: 400 });

  const admin = createAdminClient();
  const { data } = await admin
    .from("comments")
    .select("id, user_name, user_email, content, approved, created_at")
    .eq("article_id", articleId)
    .order("created_at", { ascending: false });

  return NextResponse.json({ comments: data ?? [] });
}

/* PATCH — approve or reject a comment */
export async function PATCH(req: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, approved } = await req.json() as { id: string; approved: boolean };
  const admin = createAdminClient();
  const { error } = await admin.from("comments").update({ approved }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

/* DELETE — remove a comment */
export async function DELETE(req: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json() as { id: string };
  const admin = createAdminClient();
  const { error } = await admin.from("comments").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
