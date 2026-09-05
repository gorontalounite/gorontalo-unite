import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

async function authorizeUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (!profile || !["admin", "editor"].includes(profile.role)) return null;
  return { user, supabase };
}

const LIST_COLS =
  "id, title, slug, category, tags, published, published_at, created_at, excerpt, image_url, is_trending, is_sponsored, sponsor_name, sponsor_logo_url";

// GET – list (optionally filtered) OR single by ?id=
export async function GET(req: NextRequest) {
  const auth = await authorizeUser();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id       = searchParams.get("id");
  const category = searchParams.get("category");
  const admin    = auth.supabase;

  if (id) {
    const { data, error } = await admin.from("articles").select("*").eq("id", id).single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ data });
  }

  let query = admin.from("articles").select(LIST_COLS).order("created_at", { ascending: false });
  if (category) query = query.eq("category", category);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

// POST – create
export async function POST(req: NextRequest) {
  const auth = await authorizeUser();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body  = await req.json();
  const admin = auth.supabase;
  const { data, error } = await admin
    .from("articles")
    .insert({ ...body, author_id: auth.user.id })
    .select(LIST_COLS)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

// PATCH – update
export async function PATCH(req: NextRequest) {
  const auth = await authorizeUser();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, ...body } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const admin = auth.supabase;
  const { data, error } = await admin
    .from("articles")
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select(LIST_COLS)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

// DELETE
export async function DELETE(req: NextRequest) {
  const auth = await authorizeUser();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const admin = auth.supabase;
  const { error } = await admin.from("articles").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
