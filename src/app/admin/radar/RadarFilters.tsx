"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { RADAR_CATEGORIES } from "@/lib/news-radar";

const PERIODS: Array<[string, string]> = [
  ["24", "24 jam"],
  ["72", "3 hari"],
  ["168", "7 hari"],
  ["720", "30 hari"],
];

/**
 * Period, day and month, plus the category chips.
 *
 * Every control writes to the URL rather than to component state: the leads
 * are gathered on the server, so a filter that lived in the browser could only
 * hide rows it had already been sent.
 */
export default function RadarFilters({
  period, on, month, category,
}: {
  period: string;
  on: string;
  month: string;
  category: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const go = (next: Record<string, string>) => {
    const params = new URLSearchParams({ periode: period, tanggal: on, bulan: month, kategori: category, ...next });
    // A day and a month are two ways of asking the same question; choosing one
    // clears the other rather than quietly narrowing to their overlap.
    if (next.tanggal) { params.delete("bulan"); params.delete("periode"); }
    if (next.bulan)   { params.delete("tanggal"); params.delete("periode"); }
    if (next.periode) { params.delete("tanggal"); params.delete("bulan"); }
    for (const [key, value] of [...params.entries()]) if (!value) params.delete(key);
    startTransition(() => router.push(params.size ? `/admin/radar?${params}` : "/admin/radar"));
  };

  const active = "bg-gray-900 text-white";
  const idle = "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200";

  return (
    <div className={`mb-5 space-y-3 ${pending ? "opacity-60" : ""}`}>
      <div className="flex flex-wrap items-center gap-2">
        {PERIODS.map(([value, label]) => (
          <button
            key={value} type="button" onClick={() => go({ periode: value })}
            className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
              !on && !month && period === value ? active : idle
            }`}
          >
            {label}
          </button>
        ))}

        <span aria-hidden className="mx-1 h-5 w-px bg-gray-200" />

        <label className="flex items-center gap-1.5 text-xs text-gray-500">
          Tanggal
          <input
            type="date" value={on}
            onChange={(event) => go({ tanggal: event.target.value })}
            className="rounded-lg border border-gray-200 px-2 py-1 text-xs outline-none focus:border-[#F5C400]"
          />
        </label>

        <label className="flex items-center gap-1.5 text-xs text-gray-500">
          Bulan
          <input
            type="month" value={month}
            onChange={(event) => go({ bulan: event.target.value })}
            className="rounded-lg border border-gray-200 px-2 py-1 text-xs outline-none focus:border-[#F5C400]"
          />
        </label>

        {(on || month || category) && (
          <Link href="/admin/radar" className="text-xs text-gray-400 underline hover:text-gray-700">
            Bersihkan
          </Link>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        <button
          type="button" onClick={() => go({ kategori: "" })}
          className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${!category ? active : idle}`}
        >
          Semua
        </button>
        {RADAR_CATEGORIES.map((name) => (
          <button
            key={name} type="button" onClick={() => go({ kategori: name })}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${category === name ? active : idle}`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
