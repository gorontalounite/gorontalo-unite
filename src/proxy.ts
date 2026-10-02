import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  // Search used to be served from the homepage as /?q= (and /?section=).
  // The homepage is now cached, so those links move to the dynamic /search.
  const { pathname, searchParams } = request.nextUrl;
  if (pathname === "/" && (searchParams.has("q") || searchParams.has("section"))) {
    const target = request.nextUrl.clone();
    target.pathname = "/search";
    return NextResponse.redirect(target, 308);
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
