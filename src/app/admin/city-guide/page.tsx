import { createClient } from "@/lib/supabase/server";
import CityGuideManager, { type AdminRow, type SortDir, type SortField } from "./CityGuideManager";

export const dynamic = "force-dynamic";
export const metadata = { title: "City Guide | Admin Gorontalo Unite" };

/**
 * The City Guide is six sections, and Events is one of them — it just lives in
 * its own table. Both are listed here so the admin matches what a visitor sees
 * on /city-guide rather than splitting the guide across two screens.
 */
const SECTION_OF_CATEGORY: Record<string, string> = {
  "Atraksi & Wisata": "Explore",
  Kuliner: "Eat",
  Akomodasi: "Stay",
  Belanja: "Shop",
  "Layanan Publik & Transportasi": "Services",
};

export const SECTIONS = ["Explore", "Eat", "Stay", "Shop", "Services", "Events"];

const SORT_FIELDS: SortField[] = ["title", "section", "date"];

interface PageProps {
  searchParams: Promise<{
    q?: string;
    section?: string;
    status?: string;
    page?: string;
    pageSize?: string;
    sort?: string;
    dir?: string;
  }>;
}

export default async function CityGuideAdminPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1"));
  const pageSize = Math.min(50, Math.max(10, parseInt(sp.pageSize ?? "25")));
  const q = (sp.q ?? "").trim();
  const section = sp.section ?? "";
  const status = sp.status ?? "all";
  const sortField: SortField = (SORT_FIELDS as string[]).includes(sp.sort ?? "") ? (sp.sort as SortField) : "date";
  const sortDir: SortDir = sp.dir === "asc" ? "asc" : "desc";

  const supabase = await createClient();
  const [{ data: places }, { data: events }] = await Promise.all([
    supabase.from("tourism_places").select("*").order("updated_at", { ascending: false }),
    supabase.from("events").select("*").order("starts_at", { ascending: false }),
  ]);

  const rows: AdminRow[] = [
    ...(places ?? []).map((item) => ({
      id: String(item.id),
      kind: "place" as const,
      title: String(item.name ?? ""),
      slug: String(item.slug ?? ""),
      // An unmapped category shows itself rather than defaulting into Explore:
      // in an admin table a miscategorised row should be visible, not hidden.
      section: SECTION_OF_CATEGORY[String(item.category ?? "")] ?? String(item.category ?? "—"),
      imageUrl: (item.image_url as string | null) ?? null,
      published: Boolean(item.published),
      archived: Boolean(item.archived),
      date: String(item.updated_at ?? item.created_at ?? ""),
      href: `/city-guide/${item.slug}`,
      raw: item as Record<string, unknown>,
    })),
    ...(events ?? []).map((item) => ({
      id: String(item.id),
      kind: "event" as const,
      title: String(item.title ?? ""),
      slug: String(item.slug ?? ""),
      section: "Events",
      imageUrl: (item.image_url as string | null) ?? null,
      published: Boolean(item.published),
      archived: Boolean(item.archived),
      date: String(item.starts_at ?? item.created_at ?? ""),
      href: `/event/${item.slug}`,
      raw: item as Record<string, unknown>,
    })),
  ];

  const needle = q.toLowerCase();
  const filtered = rows.filter((row) => {
    if (needle && !`${row.title} ${row.slug}`.toLowerCase().includes(needle)) return false;
    if (section && row.section !== section) return false;
    if (status === "published" && !row.published) return false;
    if (status === "draft" && (row.published || row.archived)) return false;
    if (status === "archived" && !row.archived) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortField === "title") cmp = a.title.localeCompare(b.title, "id");
    else if (sortField === "section") cmp = a.section.localeCompare(b.section, "id");
    else cmp = new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime();
    return sortDir === "asc" ? cmp : -cmp;
  });

  const start = (page - 1) * pageSize;

  return (
    <CityGuideManager
      rows={sorted.slice(start, start + pageSize)}
      totalCount={sorted.length}
      allCount={rows.length}
      publishedCount={rows.filter((r) => r.published).length}
      draftCount={rows.filter((r) => !r.published && !r.archived).length}
      page={page}
      pageSize={pageSize}
      q={q}
      section={section}
      status={status}
      sortField={sortField}
      sortDir={sortDir}
      sections={SECTIONS}
    />
  );
}
