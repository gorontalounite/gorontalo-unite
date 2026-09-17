import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { gatherRegional } from "@/lib/news-radar";

const relative = (iso: string | null) => {
  if (!iso) return "";
  const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 60) return `${Math.max(1, minutes)}m`;
  const hours = Math.round(minutes / 60);
  return hours < 24 ? `${hours} jam` : `${Math.round(hours / 24)} hari`;
};

/** Newest few leads, with the count of everything still waiting behind them. */
const PREVIEW = 4;

export default async function RadarCard() {
  const supabase = await createClient();

  const [leads, { data: marked }] = await Promise.all([
    gatherRegional({ maxAgeHours: 48, limit: 60 }),
    supabase.from("news_leads").select("fingerprint").limit(500),
  ]);

  const seen = new Set((marked ?? []).map((row) => String(row.fingerprint)));
  const fresh = leads.filter((lead) => !seen.has(lead.fingerprint));

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-900">
          Radar Berita
          {fresh.length > 0 && (
            <span className="ml-2 rounded-full bg-gray-100 px-1.5 py-0.5 text-[11px] font-medium text-gray-500">
              {fresh.length}
            </span>
          )}
        </h2>
        <Link href="/admin/radar" className="text-xs text-gray-400 transition-colors hover:text-gray-700">
          Lihat semua →
        </Link>
      </div>

      {fresh.length === 0 ? (
        <p className="px-4 py-8 text-center text-xs text-gray-400">
          Tidak ada lead baru. Semuanya sudah ditandai.
        </p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {fresh.slice(0, PREVIEW).map((lead) => (
            <li key={lead.fingerprint} className="px-4 py-2.5">
              <a
                href={lead.url}
                target="_blank"
                rel="noopener noreferrer"
                className="line-clamp-2 text-[13px] font-medium leading-snug text-gray-800 hover:underline"
              >
                {lead.title}
              </a>
              <p className="mt-1 truncate text-[11px] text-gray-400">
                {lead.outlets[0]}
                {lead.publishedAt ? ` · ${relative(lead.publishedAt)}` : ""}
                {lead.outlets.length > 1 ? ` · ${lead.outlets.length} media` : ""}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
