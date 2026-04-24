import { createBrowserClient } from "@supabase/ssr";

// Browser client — untyped so mutation payloads don't collide with
// the manually-defined Database generic. RLS on the server enforces security.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
