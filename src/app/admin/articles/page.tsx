import { createClient } from "@/lib/supabase/server";
import ArticlesClient from "./ArticlesClient";

export default async function AdminArticlesPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("id, title, slug, category, published, published_at, created_at")
    .order("created_at", { ascending: false });

  return <ArticlesClient initialArticles={articles ?? []} />;
}
