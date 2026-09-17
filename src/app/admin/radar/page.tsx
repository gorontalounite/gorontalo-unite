import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { gatherRegional, type Lead } from "@/lib/news-radar";
import RadarList, { type LeadStatus, type MarkedLead } from "./RadarList";

export const dynamic = "force-dynamic";
export const metadata = { title: "Radar Berita | Admin Gorontalo Unite" };

export default async function RadarPage() {
  const supabase = await createClient();

  const [leads, { data: markedRows }] = await Promise.all([
    gatherRegional({ maxAgeHours: 72, limit: 80 }),
    supabase
      .from("news_leads")
      .select("fingerprint, url, title, source, published_at, status")
      .order("updated_at", { ascending: false })
      .limit(120),
  ]);

  const marks = new Map<string, LeadStatus>(
    (markedRows ?? []).map((row) => [String(row.fingerprint), row.status as LeadStatus]),
  );

  // A marked lead leaves the radar even while the feeds keep carrying it —
  // that is the whole point of the marks.
  const fresh: Lead[] = leads.filter((lead) => !marks.has(lead.fingerprint));

  const marked: MarkedLead[] = (markedRows ?? []).map((row) => ({
    fingerprint: String(row.fingerprint),
    title: String(row.title),
    url: String(row.url),
    source: (row.source as string | null) ?? "",
    publishedAt: (row.published_at as string | null) ?? null,
    outlets: [(row.source as string | null) ?? "—"],
    status: row.status as LeadStatus,
  }));

  return (
    <div className="mx-auto max-w-[1000px] p-4 sm:p-6">
      <header className="mb-5">
        <Link href="/admin" className="text-xs text-gray-400 transition-colors hover:text-gray-700">
          ← Dashboard
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-[-.02em] text-gray-900">Radar Berita</h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Yang diterbitkan media dan institusi di Gorontalo dalam 3 hari terakhir. Judul dan
          tautan saja — buka aslinya, lalu tulis liputan Anda sendiri.
        </p>
      </header>

      <RadarList leads={fresh} marked={marked} />

      <p className="mt-5 text-[11px] leading-relaxed text-gray-400">
        Sumber: Google News per kabupaten/kota, ditambah RSS langsung dari Pemkot Gorontalo,
        Gorontalo Post, Mimoza TV, dan Kronologi. Feed dibaca ulang tiap 15 menit.
      </p>
    </div>
  );
}
