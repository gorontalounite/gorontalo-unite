"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Lead, RadarCategory } from "@/lib/news-radar";

export type LeadStatus = "digarap" | "ditulis" | "lewati";
export interface MarkedLead extends Lead { status: LeadStatus }

const relative = (iso: string | null) => {
  if (!iso) return "—";
  const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 60) return `${Math.max(1, minutes)} menit lalu`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.round(hours / 24);
  return days < 30 ? `${days} hari lalu` : new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short" });
};

const CATEGORY_TONE: Record<string, string> = {
  Wisata: "bg-sky-50 text-sky-700",
  Kuliner: "bg-amber-50 text-amber-800",
  Budaya: "bg-purple-50 text-purple-700",
  Olahraga: "bg-emerald-50 text-emerald-700",
  Pendidikan: "bg-indigo-50 text-indigo-700",
  Kesehatan: "bg-rose-50 text-rose-700",
  Ekonomi: "bg-teal-50 text-teal-700",
  Pemerintahan: "bg-slate-100 text-slate-600",
  Hukum: "bg-orange-50 text-orange-700",
  Peristiwa: "bg-red-50 text-red-700",
  Lainnya: "bg-gray-100 text-gray-500",
};

const STATUS_LABEL: Record<LeadStatus, string> = {
  digarap: "Digarap", ditulis: "Sudah ditulis", lewati: "Dilewati",
};

/** What the actions do to a lead. Passed down so the rows stay module-level. */
interface Acts {
  busy: string | null;
  onMark: (lead: Lead, status: LeadStatus) => void;
  onGarap: (lead: Lead) => void;
}

/** A source initial standing in for a picture, rather than a grey rectangle. */
function Fallback({ source, big }: { source: string; big?: boolean }) {
  return (
    <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-2 text-center ${big ? "text-2xl" : "text-[10px]"} font-bold uppercase leading-tight text-gray-400`}>
      {source.slice(0, big ? 16 : 6)}
    </div>
  );
}

function Tag({ lead }: { lead: Lead }) {
  return (
    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${CATEGORY_TONE[lead.category] ?? CATEGORY_TONE.Lainnya}`}>
      {lead.category}
    </span>
  );
}

function Actions({ lead, acts, compact }: { lead: Lead; acts: Acts; compact?: boolean }) {
  const working = acts.busy === lead.fingerprint;
  return (
    <div className={`flex shrink-0 items-center gap-1 ${compact ? "mt-1.5" : "mt-2"}`}>
      <button
        type="button" disabled={working} onClick={() => acts.onGarap(lead)}
        className="rounded-lg bg-[#F5C400] px-2.5 py-1 text-[11px] font-semibold text-black hover:bg-[#d9ae00] disabled:opacity-50"
      >
        Garap
      </button>
      <button
        type="button" disabled={working} onClick={() => acts.onMark(lead, "ditulis")}
        className="rounded-lg border border-gray-200 px-2 py-1 text-[11px] text-gray-600 hover:bg-gray-50 disabled:opacity-50"
      >
        Sudah
      </button>
      <button
        type="button" disabled={working} onClick={() => acts.onMark(lead, "lewati")}
        className="rounded-lg px-2 py-1 text-[11px] text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
      >
        Lewati
      </button>
    </div>
  );
}

function Thumb({ lead, className }: { lead: Lead; className: string }) {
  return (
    <div className={`shrink-0 overflow-hidden rounded-lg bg-gray-100 ${className}`}>
      {lead.image
        /* eslint-disable-next-line @next/next/no-img-element -- arbitrary outlet CDNs, unoptimised on purpose */
        ? <img src={lead.image} alt="" className="h-full w-full object-cover" loading="lazy" />
        : <Fallback source={lead.source} />}
    </div>
  );
}

function Row({ item, acts, tight }: { item: Lead; acts: Acts; tight?: boolean }) {
  return (
    <li className={`flex gap-3 px-4 py-3 ${acts.busy === item.fingerprint ? "opacity-50" : ""}`}>
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-1.5 text-[11px] text-gray-400">
          <span className="font-medium text-gray-600">{item.source}</span>
          <span aria-hidden>•</span>
          <span>{relative(item.publishedAt)}</span>
          {!tight && <Tag lead={item} />}
        </p>
        <a href={item.url} target="_blank" rel="noopener noreferrer"
           className={`mt-1 block font-medium leading-snug text-gray-900 hover:underline ${tight ? "line-clamp-3 text-[13px]" : "text-sm"}`}>
          {item.title}
        </a>
        <Actions lead={item} acts={acts} compact />
      </div>
      <Thumb lead={item} className={tight ? "h-14 w-14" : "h-16 w-24"} />
    </li>
  );
}

function Tabs({ tab, setTab, fresh, marked }: {
  tab: "baru" | "ditandai";
  setTab: (value: "baru" | "ditandai") => void;
  fresh: number;
  marked: number;
}) {
  return (
    <div className="mb-4 flex gap-1">
      {([["baru", `Lead (${fresh})`], ["ditandai", `Ditandai (${marked})`]] as const).map(([key, label]) => (
        <button
          key={key} type="button" onClick={() => setTab(key)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            tab === key ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

const Empty = ({ children }: { children: React.ReactNode }) => (
  <p className="rounded-2xl border border-dashed border-gray-200 px-6 py-16 text-center text-sm text-gray-400">{children}</p>
);

export default function RadarList({ leads, marked, category }: {
  leads: Lead[];
  marked: MarkedLead[];
  category: RadarCategory | null;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"baru" | "ditandai">("baru");

  async function save(lead: Lead, status: LeadStatus) {
    setBusy(lead.fingerprint);
    try {
      const response = await fetch("/api/admin/news-radar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, status }),
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error ?? `Gagal menandai (${response.status}).`);
      }
      setError(null);
      return true;
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Gagal menandai.");
      return false;
    } finally {
      setBusy(null);
    }
  }

  const acts: Acts = {
    busy,
    onMark: (lead, status) => { void save(lead, status).then((ok) => { if (ok) startTransition(() => router.refresh()); }); },
    // Marked before navigating. Fired as a link the request would race the
    // navigation and could be cut off, and the lead would come back tomorrow
    // as if it had never been touched.
    onGarap: (lead) => { void save(lead, "digarap").then((ok) => { if (ok) router.push("/admin/news?baru=1"); }); },
  };

  async function unmark(fingerprint: string) {
    setBusy(fingerprint);
    try {
      await fetch("/api/admin/news-radar", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fingerprint }),
      });
      startTransition(() => router.refresh());
    } finally {
      setBusy(null);
    }
  }

  const banner = error && (
    <p className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">
      {error}
      <button type="button" onClick={() => setError(null)} className="text-red-400 hover:text-red-600">✕</button>
    </p>
  );

  if (tab === "ditandai") {
    return (
      <>
        {banner}
        <Tabs tab={tab} setTab={setTab} fresh={leads.length} marked={marked.length} />
        {marked.length === 0 ? <Empty>Belum ada yang ditandai.</Empty> : (
          <ul className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {marked.map((item) => (
              <li key={item.fingerprint} className="flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-900 hover:underline">
                    {item.title}
                  </a>
                  <p className="mt-1 flex items-center gap-2 text-[11px] text-gray-400">
                    <span>{item.source}</span>
                    <span className="rounded-full bg-gray-100 px-1.5 py-0.5 font-medium text-gray-500">{STATUS_LABEL[item.status]}</span>
                  </p>
                </div>
                <button
                  type="button" disabled={busy === item.fingerprint} onClick={() => unmark(item.fingerprint)}
                  className="shrink-0 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
                >
                  Batalkan
                </button>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }

  const [lead, ...rest] = leads;
  const secondary = rest.slice(0, 4);
  const sidebar = rest.slice(4, 16);
  const remainder = rest.slice(16);

  return (
    <>
      {banner}
      <Tabs tab={tab} setTab={setTab} fresh={leads.length} marked={marked.length} />

      {!lead ? (
        <Empty>
          {category ? `Tidak ada lead kategori ${category} pada periode ini.` : "Tidak ada lead pada periode ini."}
        </Empty>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            {/* Lead story: one picture large enough to judge the story by. */}
            <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <a href={lead.url} target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                  {lead.image
                    /* eslint-disable-next-line @next/next/no-img-element -- arbitrary outlet CDNs, unoptimised on purpose */
                    ? <img src={lead.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                    : <Fallback source={lead.source} big />}
                </div>
              </a>
              <div className="p-4">
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-400">
                  <span className="font-medium text-gray-600">{lead.outlets.join(" · ")}</span>
                  <span aria-hidden>•</span>
                  <span>{relative(lead.publishedAt)}</span>
                  <Tag lead={lead} />
                  {lead.outlets.length > 1 && (
                    <span className="rounded-full bg-sky-50 px-1.5 py-0.5 font-medium text-sky-700">{lead.outlets.length} media</span>
                  )}
                </div>
                <a href={lead.url} target="_blank" rel="noopener noreferrer"
                   className="mt-2 block text-[19px] font-bold leading-snug tracking-[-.01em] text-gray-900 hover:underline">
                  {lead.title}
                </a>
                <Actions lead={lead} acts={acts} />
              </div>
            </article>

            {secondary.length > 0 && (
              <ul className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                {secondary.map((item) => <Row key={item.fingerprint} item={item} acts={acts} />)}
              </ul>
            )}
          </div>

          <aside className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <h2 className="border-b border-gray-100 px-4 py-3 text-sm font-semibold text-gray-900">Lainnya</h2>
            <ul className="divide-y divide-gray-100">
              {sidebar.map((item) => <Row key={item.fingerprint} item={item} acts={acts} tight />)}
            </ul>
          </aside>

          {remainder.length > 0 && (
            <div className="lg:col-span-2">
              <ul className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                {remainder.map((item) => <Row key={item.fingerprint} item={item} acts={acts} />)}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}
