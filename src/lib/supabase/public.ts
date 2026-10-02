import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Anonymous, cookie-free client for public reads (published articles, reels,
 * categories). Unlike lib/supabase/server it never touches next/headers, so a
 * page that reads only through it can be statically rendered and cached (ISR).
 * Row-level security applies exactly as for a signed-out visitor.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
