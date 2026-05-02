import { createAdminClient } from "@/lib/supabase/admin";
import GoodNewsClient from "./GoodNewsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Good News | Admin Gorontalo Unite",
};

export default async function GoodNewsPage() {
  const admin = createAdminClient();
  const { data } = await admin
    .from("articles")
    .select("id, title, slug, category, published, published_at, created_at")
    .eq("category", "Good News")
    .order("created_at", { ascending: false });

  return <GoodNewsClient initialArticles={data ?? []} />;
}
