import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Protect /admin and /myrag routes (admin/editor only)
  const isProtected =
    request.nextUrl.pathname.startsWith("/admin") ||
    request.nextUrl.pathname.startsWith("/myrag");

  if (isProtected) {
    if (!user) {
      const redirectPath = request.nextUrl.pathname;
      return NextResponse.redirect(new URL(`/sign-in?redirect=${redirectPath}`, request.url));
    }
    // Use SECURITY DEFINER function — bypasses RLS, reliable in edge context
    const { data: roleData } = await supabase.rpc("get_my_role");
    const role = roleData as string | null;

    if (!role || !["admin", "editor"].includes(role)) {
      return NextResponse.redirect(new URL("/?error=unauthorized", request.url));
    }
  }

  return supabaseResponse;
}
