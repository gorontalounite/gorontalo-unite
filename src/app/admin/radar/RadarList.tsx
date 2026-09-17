"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Lead } from "@/lib/news-radar";

export type LeadStatus = "digarap" | "ditulis" | "lewati";

export interface MarkedLead extends Lead {
  status: LeadStatus;
}

const relative = (iso: string | null) => {
  if (!iso) return "—";
  const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 60) return `${Math.max(1, minutes)} menit lalu`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  return `${Math.round(hours / 24)} hari lalu`;
};

const STATUS_STYLE: Record<LeadStatus, string> = {
  digarap: "bg-amber-50 text-amber-700",
  ditulis: "bg-green-50 text-green-700",
  lewati:  "bg-gray-100 text-gray-500",
};

const STATUS_LABEL: Record<LeadStatus, string> = {
  digarap: "Digarap",
  ditulis: "Sudah ditulis",
  lewati:  "Dilewati",
};

export default function RadarList({ leads, marked }: { leads: Lead[]; marked: MarkedLead[] }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"baru" | "ditandai">("baru");

  async function mark(lead: Lead, status: LeadStatus) {
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
      startTransition(() => router.refresh());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Gagal menandai.");
    } finally {
      setBusy(null);
    }
  }

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

  const rows = tab === "baru" ? leads : marked;

  return (
    <div>
      {error && (
        <p className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {error}
          <button type="button" onClick={() => setError(null)} className="text-red-400 hover:text-red-600">✕</button>
        </p>
      )}

      <div className="mb-4 flex gap-1">
        {([["baru", `Belum ditandai (${leads.length})`], ["ditandai", `Ditandai (${marked.length})`]] as const).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              tab === key ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-gray-200 px-6 py-16 text-center text-sm text-gray-400">
          {tab === "baru" ? "Semua lead sudah ditandai." : "Belum ada yang ditandai."}
        </p>
      ) : (
        <ul className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          {rows.map((lead) => {
            const status = (lead as MarkedLead).status;
            const working = busy === lead.fingerprint;
            return (
              <li key={lead.fingerprint} className={`flex flex-wrap items-start gap-3 px-4 py-3 sm:px-5 ${working ? "opacity-50" : ""}`}>
                <div className="min-w-0 flex-1">
                  <a
                    href={lead.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-900 hover:underline"
                  >
                    {lead.title}
                  </a>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-gray-400">
                    <span className="font-medium text-gray-500">{lead.outlets.join(" · ")}</span>
                    <span aria-hidden>•</span>
                    <span>{relative(lead.publishedAt)}</span>
                    {lead.outlets.length > 1 && (
                      <span className="rounded-full bg-sky-50 px-1.5 py-0.5 font-medium text-sky-700">
                        {lead.outlets.length} media
                      </span>
                    )}
                    {status && (
                      <span className={`rounded-full px-1.5 py-0.5 font-medium ${STATUS_STYLE[status]}`}>
                        {STATUS_LABEL[status]}
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  {tab === "baru" ? (
                    <>
                      <button
                        type="button"
                        disabled={working}
                        // Marked first, then navigated. As a Link the request
                        // would race the navigation and could be cut off, so
                        // the lead would reappear tomorrow as if untouched.
                        onClick={async () => { await mark(lead, "digarap"); router.push("/admin/news?baru=1"); }}
                        className="rounded-lg bg-[#F5C400] px-2.5 py-1.5 text-xs font-semibold text-black hover:bg-[#d9ae00] disabled:opacity-50"
                      >
                        Garap
                      </button>
                      <button
                        type="button"
                        disabled={working}
                        onClick={() => mark(lead, "ditulis")}
                        className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
                      >
                        Sudah ditulis
                      </button>
                      <button
                        type="button"
                        disabled={working}
                        onClick={() => mark(lead, "lewati")}
                        className="rounded-lg px-2.5 py-1.5 text-xs text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Lewati
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      disabled={working}
                      onClick={() => unmark(lead.fingerprint)}
                      className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
                    >
                      Batalkan tanda
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
