import Link from "next/link";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { gatherRegional, RADAR_CATEGORIES, type Lead, type RadarCategory } from "@/lib/news-radar";
import RadarFilters from "./RadarFilters";
import RadarList, { type LeadStatus, type MarkedLead } from "./RadarList";

export const dynamic = "force-dynamic";
export const metadata = { title: "Radar Berita | Admin Gorontalo Unite" };

interface Props {
  searchParams: Promise<{ periode?: string; tanggal?: string; bulan?: string; kategori?: string }>;
}

function Skeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="h-[420px] animate-pulse rounded-2xl border border-gray-200 bg-white" />
      <div className="h-[420px] animate-pulse rounded-2xl border border-gray-200 bg-white" />
    </div>
  );
}

async function Radar({ period, on, month, category }: {
  period: number; on: string | null; month: string | null; category: RadarCategory | null;
}) {
  const supabase = await createClient();

  const [leads, { data: markedRows }] = await Promise.all([
    gatherRegional({ maxAgeHours: period, on, month, category, limit: 120 }),
    supabase
      .from("news_leads")
      .select("fingerprint, url, title, source, published_at, status")
      .order("updated_at", { ascending: false })
      .limit(200),
  ]);

  const marks = new Map((markedRows ?? []).map((row) => [String(row.fingerprint), row.status as LeadStatus]));

  // A marked lead leaves the radar even while the feeds keep carrying it —
  // that is the whole point of the marks.
  const fresh: Lead[] = leads.filter((lead) => !marks.has(lead.fingerprint));

  const marked: MarkedLead[] = (markedRows ?? []).map((row) => ({
    fingerprint: String(row.fingerprint),
    title: String(row.title),
    url: String(row.url),
    source: (row.source as string | null) ?? "—",
    publishedAt: (row.published_at as string | null) ?? null,
    image: null,
    category: "Lainnya" as RadarCategory,
    outlets: [(row.source as string | null) ?? "—"],
    status: row.status as LeadStatus,
  }));

  return <RadarList leads={fresh} marked={marked} category={category} />;
}

export default async function RadarPage({ searchParams }: Props) {
  const sp = await searchParams;

  const period = Number(sp.periode) || 72;
  const on = /^\d{4}-\d{2}-\d{2}$/.test(sp.tanggal ?? "") ? sp.tanggal! : null;
  const month = /^\d{4}-\d{2}$/.test(sp.bulan ?? "") ? sp.bulan! : null;
  const category = (RADAR_CATEGORIES as readonly string[]).includes(sp.kategori ?? "")
    ? (sp.kategori as RadarCategory) : null;

  return (
    <div className="mx-auto max-w-[1280px] p-4 sm:p-6">
      <header className="mb-5">
        <Link href="/admin" className="text-xs text-gray-400 transition-colors hover:text-gray-700">
          ← Dashboard
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-[-.02em] text-gray-900">Radar Berita</h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Yang diterbitkan media dan institusi di Gorontalo. Judul, gambar dan tautan saja —
          buka aslinya, lalu tulis liputan Anda sendiri.
        </p>
      </header>

      <RadarFilters period={String(period)} on={on ?? ""} month={month ?? ""} category={category ?? ""} />

      {/* Keyed so changing a filter shows the skeleton again rather than the
          previous result sitting there looking current. */}
      <Suspense key={`${period}-${on}-${month}-${category}`} fallback={<Skeleton />}>
        <Radar period={period} on={on} month={month} category={category} />
      </Suspense>

      <p className="mt-6 max-w-3xl text-[11px] leading-relaxed text-gray-400">
        Sumber: Google News untuk tujuh kabupaten/kota, ditambah RSS langsung dari Pemkot Gorontalo,
        Gorontalo Post, Mimoza TV, Kronologi, Banthayo, Hargo, Kabar Gorontalo, Suara Gorontalo, dan
        Gorontalo Terkini. Dari seluruh situs Pemda lain — provinsi, lima kabupaten, hingga subdomain
        OPD — tidak satu pun menyediakan RSS. Gambar hanya tersedia dari feed yang menyertakannya;
        sisanya ditandai nama sumber. Feed dibaca ulang tiap 15 menit, dan hanya memuat beberapa hari
        terakhir — filter bulan lama akan kosong.
      </p>
    </div>
  );
}
