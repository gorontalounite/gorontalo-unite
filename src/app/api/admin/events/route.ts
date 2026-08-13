import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

async function staff() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single();
  return profile && ["admin", "editor"].includes(profile.role) ? { supabase, user } : null;
}

export async function POST(req: NextRequest) {
  const auth = await staff();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data, error } = await auth.supabase.from("events").insert({ ...(await req.json()), author_id: auth.user.id }).select().single();
  return error ? NextResponse.json({ error: error.message }, { status: 400 }) : NextResponse.json({ data });
}

export async function PATCH(req: NextRequest) {
  const auth = await staff();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...changes } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const { data, error } = await auth.supabase.from("events").update(changes).eq("id", id).select().single();
  return error ? NextResponse.json({ error: error.message }, { status: 400 }) : NextResponse.json({ data });
}

export async function DELETE(req: NextRequest) {
  const auth = await staff();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  const { error } = await auth.supabase.from("events").delete().eq("id", id);
  return error ? NextResponse.json({ error: error.message }, { status: 400 }) : NextResponse.json({ success: true });
}
