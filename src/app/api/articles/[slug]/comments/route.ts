import { NextResponse }         from "next/server";
import { createAdminClient }    from "@/lib/supabase/admin";
import { createClient }         from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/* ── GET — public list of approved comments ─────────────────── */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const admin    = createAdminClient();

  // Resolve article id from slug
  const { data: article } = await admin
    .from("articles")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!article) return NextResponse.json({ comments: [] });

  const { data } = await admin
    .from("comments")
    .select("id, user_name, content, created_at")
    .eq("article_id", article.id)
    .eq("approved", true)
    .order("created_at", { ascending: true });

  return NextResponse.json({ comments: data ?? [] });
}

/* ── POST — submit a new comment (auth required) ────────────── */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  // Verify auth
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }

  const body = await req.json() as { content?: string };
  const content = (body.content ?? "").trim();
  if (!content || content.length < 3) {
    return NextResponse.json({ error: "Komentar terlalu pendek" }, { status: 400 });
  }
  if (content.length > 2000) {
    return NextResponse.json({ error: "Komentar terlalu panjang (maks 2000 karakter)" }, { status: 400 });
  }

  const admin = createAdminClient();

  // Get article id
  const { data: article } = await admin
    .from("articles")
    .select("id, allow_comments")
    .eq("slug", slug)
    .single();

  if (!article) return NextResponse.json({ error: "Artikel tidak ditemukan" }, { status: 404 });
  if (!article.allow_comments) {
    return NextResponse.json({ error: "Komentar dinonaktifkan untuk artikel ini" }, { status: 403 });
  }

  // Basic flood guard: one comment per user per 20 seconds, across all articles.
  const { data: recent } = await admin
    .from("comments")
    .select("created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (recent && Date.now() - new Date(recent.created_at as string).getTime() < 20_000) {
    return NextResponse.json({ error: "Tunggu sebentar sebelum mengirim komentar lagi" }, { status: 429 });
  }

  // Get user profile for display name
  const { data: profile } = await admin
    .from("user_profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const userName = (profile?.full_name as string | null) || user.email?.split("@")[0] || "Pengguna";

  const { data: comment, error } = await admin
    .from("comments")
    .insert({
      article_id: article.id,
      user_id:    user.id,
      user_name:  userName,
      user_email: user.email,
      content,
      approved:   false, // awaiting moderation
    })
    .select("id, user_name, content, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ comment, pending: true }, { status: 201 });
}
