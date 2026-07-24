import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const requestedNext = searchParams.get("next") ?? "/";
  // Only internal paths may be used after sign-in. Absolute URLs and protocol
  // relative values would otherwise turn this callback into an open redirect.
  const next = requestedNext.startsWith("/") && !requestedNext.startsWith("//")
    ? requestedNext
    : "/";

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Always redirect to the live site root (or next param), never localhost
  const redirectUrl = new URL(next, process.env.NEXT_PUBLIC_SITE_URL ?? "https://gorontalounite.com");
  return NextResponse.redirect(redirectUrl);
}
