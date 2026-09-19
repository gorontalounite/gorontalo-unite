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
  "id, title, slug, category, tags, published, published_at, created_at, deleted_at, excerpt, image_url, is_trending, editor_choice, is_sponsored, sponsor_name, sponsor_logo_url";

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
  // Staff can read binned rows under RLS, so the bin is opt-in here.
  query = searchParams.get("status") === "trash"
    ? query.not("deleted_at", "is", null)
    : query.is("deleted_at", null);

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

  const { id, restore, ...body } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  // Restoring returns the article as a draft. It was unpublished on the way
  // into the bin and is left that way, so nothing goes back on the site
  // without someone deciding to publish it again.
  const patch = restore ? { deleted_at: null } : body;

  const admin = auth.supabase;
  const { data, error } = await admin
    .from("articles")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select(LIST_COLS)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

// DELETE – into the bin, or, with `permanent`, for good.
//
// A permanent delete is the only one that cannot be undone, and it takes the
// article's comments with it through `comments.article_id on delete cascade`.
export async function DELETE(req: NextRequest) {
  const auth = await authorizeUser();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, permanent } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const admin = auth.supabase;
  const now = new Date().toISOString();
  const { error } = permanent
    ? await admin.from("articles").delete().eq("id", id)
    // Unpublishing is not optional: `articles_binned_is_unpublished` enforces
    // it, and it is what keeps the row out of public queries that filter on
    // `published` and know nothing about the bin.
    : await admin.from("articles")
        .update({ deleted_at: now, published: false, updated_at: now })
        .eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
