import { createClient } from "@/lib/supabase/server";
import GoodNewsClient from "./GoodNewsClient";

export const metadata = {
  title: "Good News | Admin Gorontalo Unite",
};

export default async function GoodNewsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("id, title, slug, published, published_at, created_at")
    .eq("category", "Good News")
    .order("created_at", { ascending: false });

  return <GoodNewsClient initialArticles={data ?? []} />;
}
