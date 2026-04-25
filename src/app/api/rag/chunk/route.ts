import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

/** Shared auth guard: returns user+adminClient or a 401/403 response */
async function requireEditor() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };

  const adminClient = createAdminClient();
  const { data: profileRaw } = await adminClient
    .from("user_profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const profile = profileRaw as any as { role: string } | null;
  if (!profile || !["admin", "editor"].includes(profile.role)) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { adminClient };
}

/** PATCH /api/rag/chunk — edit title/content/category/is_active of a chunk */
export async function PATCH(req: NextRequest) {
  const auth = await requireEditor();
  if (auth.error) return auth.error;
  const { adminClient } = auth;

  const body = await req.json() as { id: string; title?: string; content?: string; category?: string; is_active?: boolean };
  if (!body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { id, ...fields } = body;
  const { error } = await adminClient
    .from("knowledge_base")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

/** DELETE /api/rag/chunk — delete a single chunk by id */
export async function DELETE(req: NextRequest) {
  const auth = await requireEditor();
  if (auth.error) return auth.error;
  const { adminClient } = auth;

  const { id } = await req.json() as { id: string };
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await adminClient.from("knowledge_base").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
