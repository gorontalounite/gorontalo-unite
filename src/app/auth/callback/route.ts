import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Always redirect to the live site root (or next param), never localhost
  const redirectUrl = new URL(next, process.env.NEXT_PUBLIC_APP_URL ?? request.url);
  return NextResponse.redirect(redirectUrl);
}
