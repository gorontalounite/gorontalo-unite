import { createAdminClient } from "@/lib/supabase/admin";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gorontalounite.com";

// Google News reads only stories from the last two days, at most 1,000.
const WINDOW_MS = 2 * 24 * 60 * 60 * 1000;

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export const revalidate = 900;

export async function GET() {
  let rows: { slug: string; title: string; published_at: string }[] = [];

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { data } = await createAdminClient()
      .from("articles")
      .select("slug, title, published_at")
      .eq("published", true)
      .neq("category", "Portfolio")
      .gte("published_at", new Date(Date.now() - WINDOW_MS).toISOString())
      .order("published_at", { ascending: false })
      .limit(1000);
    rows = (data ?? []) as typeof rows;
  }

  const urls = rows.map((row) => `  <url>
    <loc>${BASE}/${escapeXml(row.slug)}</loc>
    <news:news>
      <news:publication>
        <news:name>Gorontalo Unite</news:name>
        <news:language>id</news:language>
      </news:publication>
      <news:publication_date>${new Date(row.published_at).toISOString()}</news:publication_date>
      <news:title>${escapeXml(row.title)}</news:title>
    </news:news>
  </url>`).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>
`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
