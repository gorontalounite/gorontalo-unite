import { createClient } from "@/lib/supabase/server";
import ReelsAdminClient, { type AdminReel } from "./ReelsAdminClient";

export const dynamic = "force-dynamic";
export const metadata = { title: "Reels | Admin Gorontalo Unite" };

export default async function AdminReelsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reels")
    .select("id, account_username, description, publish_time, permalink, post_type, category, sponsored, thumbnail_url, status, display_order, featured, views, reach, likes, shares, follows, comments, saves, created_at, updated_at")
    .order("display_order")
    .order("publish_time", { ascending: false });

  return (
    <ReelsAdminClient
      initialItems={(data ?? []) as AdminReel[]}
      initialError={error?.message ?? null}
    />
  );
}
