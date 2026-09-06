import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

async function staff() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single();
  return profile && ["admin", "editor"].includes(profile.role) ? { supabase, user } : null;
}

function slugify(value: string) {
  return value.toLowerCase().trim().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// GET – full category tree (public: needed to render the picker for staff, harmless as read-only taxonomy)
export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("categories").select("id, name, slug, parent_id, desk_key").order("name");
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data: data ?? [] });
}

// POST – create a new category or sub-category
export async function POST(req: NextRequest) {
  const auth = await staff();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, parent_id } = await req.json();
  const trimmed = String(name ?? "").trim();
  if (!trimmed) return NextResponse.json({ error: "Nama kategori wajib diisi" }, { status: 400 });

  const slug = slugify(trimmed);
  const { data, error } = await auth.supabase
    .from("categories")
    .insert({ name: trimmed, slug, parent_id: parent_id || null })
    .select("id, name, slug, parent_id, desk_key")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}
