import { NextResponse, type NextRequest } from "next/server";

// This preview intentionally exposes only the Reado-style editorial shell.
// Existing operational routes remain in source control but are not available
// from the public frontend during the refactor.
const removedFrontendPrefixes = [
  "/admin", "/auth", "/sign-in", "/sign-up", "/profile",
  "/berita", "/news", "/wisata", "/event", "/good-news",
  "/affiliate", "/portfolio", "/chat", "/ai", "/services",
  "/shop", "/media-kit", "/myrag", "/bi", "/da", "/dm", "/sm", "/wd",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (removedFrontendPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
