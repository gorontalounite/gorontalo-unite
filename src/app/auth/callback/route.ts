import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const providerError = searchParams.get("error");
  const requestedNext = searchParams.get("next") ?? "/";
  // Only internal paths may be used after sign-in. Absolute URLs and protocol
  // relative values would otherwise turn this callback into an open redirect.
  const next = requestedNext.startsWith("/") && !requestedNext.startsWith("//")
    ? requestedNext
    : "/";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gorontalounite.com";
  if (providerError || !code) {
    return NextResponse.redirect(new URL("/sign-in?error=oauth", siteUrl));
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return NextResponse.redirect(new URL("/sign-in?error=oauth", siteUrl));

    const { data: { user } } = await supabase.auth.getUser();
    if (next === "/" && user) {
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();
      if (profile?.role === "admin" || profile?.role === "editor") {
        return NextResponse.redirect(new URL("/admin", siteUrl));
      }
    }
  }

  // Always redirect to the live site root (or next param), never localhost
  const redirectUrl = new URL(next, siteUrl);
  return NextResponse.redirect(redirectUrl);
}
