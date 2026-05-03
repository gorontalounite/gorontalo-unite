import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userAgent = req.headers.get("user-agent") ?? undefined;

  const admin = createAdminClient();
  await admin.from("affiliate_clicks").insert({
    affiliate_item_id: id,
    user_agent: userAgent,
  });

  return NextResponse.json({ ok: true });
}
