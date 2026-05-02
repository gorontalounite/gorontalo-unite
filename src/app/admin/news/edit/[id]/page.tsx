import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import PostEditor from "@/components/editor/PostEditor";
import type { Block } from "@/components/editor/types";
import type { PostMeta } from "@/components/editor/EditorSidebar";

export const dynamic  = "force-dynamic";
export const metadata = { title: "Edit Berita | Admin Gorontalo Unite" };

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditNewsPage({ params }: Props) {
  const { id } = await params;
  const admin  = createAdminClient();

  const { data: article } = await admin
    .from("articles")
    .select("*")
    .eq("id", id)
    .neq("category", "Portfolio")
    .single();

  if (!article) notFound();

  const initialBlocks: Block[] = Array.isArray(article.blocks) ? article.blocks : [];

  const initialMeta: Partial<PostMeta> = {
    title:           article.title ?? "",
    slug:            article.slug ?? "",
    excerpt:         article.excerpt ?? "",
    category:        article.category ?? "",
    tags:            (article.tags as string[]) ?? [],
    image_url:       article.image_url ?? "",
    published:       article.published ?? false,
    published_at:    article.published_at ? article.published_at.slice(0, 16) : "",
    seo_title:       article.seo_title ?? "",
    seo_description: article.seo_description ?? "",
  };

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 3.5rem)" }}>
      <PostEditor
        postType="news"
        editId={id}
        initialMeta={initialMeta}
        initialBlocks={initialBlocks}
      />
    </div>
  );
}
