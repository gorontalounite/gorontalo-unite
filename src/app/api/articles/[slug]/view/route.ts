import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  try {
    const admin = createAdminClient();
    // Use raw SQL increment via RPC to avoid race conditions
    await admin.rpc("increment_view_count", { article_slug: slug });
  } catch {
    // Silently ignore – view counting is non-critical
  }
  return NextResponse.json({ ok: true });
}
