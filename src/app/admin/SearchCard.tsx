import { getSearchOverview } from "@/lib/google/search-console";

const number = (value: number) => value.toLocaleString("id-ID");
const percent = (value: number) => `${(value * 100).toFixed(1).replace(".", ",")}%`;
const position = (value: number) => value.toFixed(1).replace(".", ",");

/** Strips the origin so a list of paths does not repeat the domain five times. */
const pathOf = (url: string) => {
  try { return new URL(url).pathname || "/"; } catch { return url; }
};

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-gray-50 px-3 py-2.5">
      <p className="text-[20px] font-bold leading-none tracking-[-.02em] text-gray-900">{value}</p>
      <p className="mt-1.5 text-[11px] text-gray-500">{label}</p>
    </div>
  );
}

function Ranked({ title, rows }: { title: string; rows: Array<{ label: string; clicks: number; impressions: number }> }) {
  if (rows.length === 0) return null;
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-semibold uppercase tracking-[.12em] text-gray-400">{title}</p>
      <ul className="mt-2 space-y-1.5">
        {rows.map((row) => (
          <li key={row.label} className="flex items-baseline justify-between gap-3 text-xs">
            <span className="min-w-0 flex-1 truncate text-gray-700">{row.label}</span>
            <span className="shrink-0 tabular-nums text-[11px] text-gray-400">
              {number(row.clicks)} · {number(row.impressions)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Search performance, straight from Search Console.
 *
 * Laid out wide rather than tall: it leads the dashboard, and the counts sit
 * beside it. Returns null when the call gives nothing, so the row collapses
 * to the counts rather than holding an empty frame.
 */
export default async function SearchCard() {
  const data = await getSearchOverview();

  if (!data) {
    return (
      <section className="rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-gray-900">Google Penelusuran</h2>
        <p className="mt-2 max-w-md text-xs leading-relaxed text-gray-500">
          Belum ada data yang terbaca. Pastikan email service account sudah ditambahkan sebagai
          pengguna di properti Search Console, dan <code className="text-gray-600">GSC_SITE_URL</code> ditulis
          persis seperti nama propertinya.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-semibold text-gray-900">Google Penelusuran</h2>
        <span className="shrink-0 text-[11px] text-gray-400">{data.days} hari terakhir</span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Metric label="Klik" value={number(data.clicks)} />
        <Metric label="Tayangan" value={number(data.impressions)} />
        <Metric label="CTR" value={percent(data.ctr)} />
        <Metric label="Posisi rata-rata" value={position(data.position)} />
      </div>

      <div className="mt-4 grid min-h-0 flex-1 gap-5 sm:grid-cols-2">
        <Ranked
          title="Kueri teratas"
          rows={data.topQueries.slice(0, 4).map((row) => ({ label: row.term, clicks: row.clicks, impressions: row.impressions }))}
        />
        <Ranked
          title="Halaman teratas"
          rows={data.topPages.slice(0, 4).map((row) => ({ label: pathOf(row.url), clicks: row.clicks, impressions: row.impressions }))}
        />
      </div>

      {/* Search Console is two to three days behind; without this the newest
          days read as a collapse in traffic rather than data not arrived. */}
      <p className="mt-4 border-t border-gray-100 pt-2.5 text-[11px] text-gray-400">
        Angka: klik · tayangan. Data Search Console tertinggal 2–3 hari.
      </p>
    </section>
  );
}
