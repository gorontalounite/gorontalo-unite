import { getSearchOverview, searchConsoleConfigured } from "@/lib/google/search-console";

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
      <p className="text-[19px] font-bold leading-none tracking-[-.02em] text-gray-900">{value}</p>
      <p className="mt-1.5 text-[11px] text-gray-500">{label}</p>
    </div>
  );
}

function Shell({ note, children }: { note?: string; children?: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-semibold text-gray-900">Google Penelusuran</h2>
        {note && <span className="shrink-0 text-[11px] text-gray-400">{note}</span>}
      </div>
      {children}
    </section>
  );
}

/**
 * Search performance, straight from Search Console.
 *
 * Renders nothing at all when the credentials are absent, so the dashboard
 * does not carry an empty frame on any environment that has not been given
 * them. Configured but silent is a different case and says so, because that
 * one means something needs fixing.
 */
export default async function SearchCard() {
  if (!searchConsoleConfigured()) return null;

  const data = await getSearchOverview();
  if (!data) {
    return (
      <Shell>
        <p className="mt-3 text-xs leading-relaxed text-gray-500">
          Belum ada data yang terbaca. Pastikan email service account sudah ditambahkan
          sebagai pengguna di properti Search Console, dan <code className="text-gray-600">GSC_SITE_URL</code> ditulis
          persis seperti nama propertinya.
        </p>
      </Shell>
    );
  }

  return (
    <Shell note={`${data.days} hari terakhir`}>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Metric label="Klik" value={number(data.clicks)} />
        <Metric label="Tayangan" value={number(data.impressions)} />
        <Metric label="CTR" value={percent(data.ctr)} />
        <Metric label="Posisi rata-rata" value={position(data.position)} />
      </div>

      {data.topQueries.length > 0 && (
        <div className="mt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[.1em] text-gray-400">Kueri teratas</p>
          <ul className="mt-2 space-y-1.5">
            {data.topQueries.map((row) => (
              <li key={row.term} className="flex items-baseline justify-between gap-3 text-xs">
                <span className="min-w-0 flex-1 truncate text-gray-700">{row.term}</span>
                <span className="shrink-0 tabular-nums text-gray-400">
                  {number(row.clicks)} klik · {number(row.impressions)} tayang
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.topPages.length > 0 && (
        <div className="mt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[.1em] text-gray-400">Halaman teratas</p>
          <ul className="mt-2 space-y-1.5">
            {data.topPages.map((row) => (
              <li key={row.url} className="flex items-baseline justify-between gap-3 text-xs">
                <span className="min-w-0 flex-1 truncate text-gray-700">{pathOf(row.url)}</span>
                <span className="shrink-0 tabular-nums text-gray-400">
                  {number(row.clicks)} klik · {number(row.impressions)} tayang
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Search Console is two to three days behind; without this the newest
          days read as a collapse in traffic rather than data not arrived. */}
      <p className="mt-4 border-t border-gray-100 pt-3 text-[11px] text-gray-400">
        Data Search Console tertinggal 2–3 hari.
      </p>
    </Shell>
  );
}
