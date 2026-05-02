import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import PostEditor from "@/components/editor/PostEditor";
import type { Block } from "@/components/editor/types";
import type { PostMeta } from "@/components/editor/EditorSidebar";

export const dynamic  = "force-dynamic";
export const metadata = { title: "Edit Portofolio | Admin Gorontalo Unite" };

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPortfolioPage({ params }: Props) {
  const { id } = await params;
  const admin  = createAdminClient();

  const { data: item } = await admin
    .from("articles")
    .select("*")
    .eq("id", id)
    .eq("category", "Portfolio")
    .single();

  if (!item) notFound();

  const initialBlocks: Block[] = Array.isArray(item.blocks) ? item.blocks : [];

  const initialMeta: Partial<PostMeta> = {
    title:           item.title ?? "",
    slug:            item.slug ?? "",
    excerpt:         item.excerpt ?? "",
    tags:            (item.tags as string[]) ?? [],
    image_url:       item.image_url ?? "",
    published:       item.published ?? false,
    published_at:    item.published_at ? item.published_at.slice(0, 16) : "",
    seo_title:       item.seo_title ?? "",
    seo_description: item.seo_description ?? "",
    // CPT fields
    project_url:  item.project_url ?? "",
    client_name:  item.client_name ?? "",
    project_date: item.project_date ?? "",
    role:          item.role ?? "",
    repo_url:      item.repo_url ?? "",
    duration:      item.duration ?? "",
    tech_stack:    (item.tech_stack as string[]) ?? [],
  };

  const initialSections = {
    problem:  Array.isArray(item.section_problem)  ? item.section_problem  : undefined,
    solution: Array.isArray(item.section_solution) ? item.section_solution : undefined,
    process:  Array.isArray(item.section_process)  ? item.section_process  : undefined,
    result:   Array.isArray(item.section_result)   ? item.section_result   : undefined,
  };

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 3.5rem)" }}>
      <PostEditor
        postType="portfolio"
        editId={id}
        initialMeta={initialMeta}
        initialBlocks={initialBlocks}
        initialSections={initialSections}
      />
    </div>
  );
}
