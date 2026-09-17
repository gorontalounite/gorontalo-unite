import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * Records what the newsroom decided about a radar item.
 *
 * Only decisions are stored. The feed itself is re-read and discarded, so
 * nothing here accumulates other outlets' headlines beyond the ones an editor
 * has actually acted on.
 */

const STATUSES = new Set(["digarap", "ditulis", "lewati"]);

async function staff() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase
    .from("user_profiles").select("role").eq("id", user.id).single();
  if (!profile || !["admin", "editor"].includes(profile.role)) return null;
  return { supabase, user };
}

export async function POST(request: NextRequest) {
  const auth = await staff();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { fingerprint, url, title, source, publishedAt, status } = await request.json();
  if (!fingerprint || !url || !title) {
    return NextResponse.json({ error: "Lead tidak lengkap" }, { status: 400 });
  }
  if (!STATUSES.has(status)) {
    return NextResponse.json({ error: "Status tidak dikenal" }, { status: 400 });
  }

  const { error } = await auth.supabase.from("news_leads").upsert({
    fingerprint,
    url,
    title,
    source: source ?? null,
    published_at: publishedAt ?? null,
    status,
    marked_by: auth.user.id,
    updated_at: new Date().toISOString(),
  }, { onConflict: "fingerprint" });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}

/** Undo: the lead returns to the radar as if it had never been marked. */
export async function DELETE(request: NextRequest) {
  const auth = await staff();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { fingerprint } = await request.json();
  if (!fingerprint) return NextResponse.json({ error: "Missing fingerprint" }, { status: 400 });

  const { error } = await auth.supabase.from("news_leads").delete().eq("fingerprint", fingerprint);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
