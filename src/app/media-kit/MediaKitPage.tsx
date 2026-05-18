"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import GrowthCharts from "./GrowthCharts";
import { TOP_POSTS_DATA, TOP_POSTS_MONTHS } from "./topPostsData";

// ── Period selector ───────────────────────────────────────────
const PERIODS = ["7 hari", "30 hari", "3 bulan", "6 bulan", "1 tahun"] as const;
type Period = typeof PERIODS[number];

interface PData {
  label: string;
  reach: number; views: number; interactions: number;
  likes: number; comments: number; saves: number; shares: number; reposts: number;
  followsGained: number; followsLost: number; netGrowth: number;
  reachGrowthPct: number; reachSub: string;
  followerTrend: number[]; followerTrendLabels: string[];
  reachTrend: number[]; viewsTrend: number[]; engageTrend: number[];
  trendLabels: string[];
}

// ── Static account data ───────────────────────────────────────
const ACCOUNT = {
  handle: "@gorontalo.unite",
  niche: "Berita & Informasi Lokal · Gorontalo",
  location: "Gorontalo, Indonesia",
  period: "April 2026",
};

// ── Current account metrics (April 2026) ─────────────────────
const METRICS = {
  followers:    63841,
  monthlyViews: 441341,
  monthlyReach: 98587,
};

// ── Per-period insight data ───────────────────────────────────
const PERIOD_DATA: Record<Period, PData> = {
  "7 hari": {
    label: "25 Apr – 1 Mei 2026",
    reach: 18671, views: 86302, interactions: 1868,
    likes: 1218, comments: 19, saves: 49, shares: 97, reposts: 7,
    followsGained: 103, followsLost: 94, netGrowth: 9,
    reachGrowthPct: -23.8, reachSub: "-23.8% vs 7 hari lalu",
    followerTrend:       [63829, 63830, 63833, 63833, 63834, 63841, 63843],
    followerTrendLabels: ["25/4","26/4","27/4","28/4","29/4","30/4","1/5"],
    reachTrend:  [4180,  2444, 1655,  872, 3067, 2096, 4357],
    viewsTrend:  [22273,15646, 6621, 4024,10822, 7060,19856],
    engageTrend: [440,   428,  143,   76,  213,  135,  433],
    trendLabels: ["25/4","26/4","27/4","28/4","29/4","30/4","1/5"],
  },
  "30 hari": {
    label: "April 2026",
    reach: 98587, views: 441341, interactions: 7567,
    likes: 4920, comments: 78, saves: 195, shares: 390, reposts: 29,
    followsGained: 484, followsLost: 443, netGrowth: 41,
    reachGrowthPct: -75.8, reachSub: "pasca viral bulan Maret",
    followerTrend: [
      63800,63802,63803,63804,63806,63808,63809,
      63810,63811,63812,63813,63815,63817,63819,
      63820,63820,63822,63823,63823,63824,63824,
      63825,63826,63829,63829,63830,63833,63833,63834,63841,
    ],
    followerTrendLabels: [],
    reachTrend:  [32466, 20749, 13604, 31768],
    viewsTrend:  [136918, 83020, 75759,145644],
    engageTrend: [2110, 1446, 1066, 2945],
    trendLabels: ["Mg 1","Mg 2","Mg 3","Mg 4"],
  },
  "3 bulan": {
    label: "Feb – Apr 2026",
    reach: 721644, views: 2941341, interactions: 66600,
    likes: 43350, comments: 666, saves: 1732, shares: 3463, reposts: 266,
    followsGained: 1970, followsLost: 1806, netGrowth: 164,
    reachGrowthPct: 29.3, reachSub: "+29.3% vs 3 bln lalu",
    followerTrend:       [63722, 63800, 63841],
    followerTrendLabels: ["Feb","Mar","Apr"],
    reachTrend:  [215000, 408057,  98587],
    viewsTrend:  [1150000,1350000, 441341],
    engageTrend: [33033,  26000,   7567],
    trendLabels: ["Feb","Mar","Apr"],
  },
  "6 bulan": {
    label: "Nov 2025 – Apr 2026",
    reach: 1279644, views: 4741341, interactions: 94600,
    likes: 61580, comments: 946, saves: 2459, shares: 4919, reposts: 378,
    followsGained: 3218, followsLost: 2900, netGrowth: 318,
    reachGrowthPct: 0.5, reachSub: "+0.5% vs 6 bln lalu",
    followerTrend:       [63568, 63630, 63677, 63722, 63800, 63841],
    followerTrendLabels: ["Nov","Des","Jan","Feb","Mar","Apr"],
    reachTrend:  [118000, 275000, 165000, 215000, 408057,  98587],
    viewsTrend:  [550000, 880000, 370000,1150000,1350000, 441341],
    engageTrend: [5000,   15000,   8000,  33033,  26000,   7567],
    trendLabels: ["Nov","Des","Jan","Feb","Mar","Apr"],
  },
  "1 tahun": {
    label: "Mei 2025 – Apr 2026",
    reach: 2552644, views: 6173341, interactions: 112200,
    likes: 73074, comments: 1122, saves: 2917, shares: 5835, reposts: 449,
    followsGained: 11700, followsLost: 10264, netGrowth: 1436,
    reachGrowthPct: 0, reachSub: "Mei 2025 – Apr 2026",
    followerTrend:       [62622,62839,63079,63358,63433,63523,63568,63630,63677,63722,63800,63841],
    followerTrendLabels: ["Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des","Jan","Feb","Mar","Apr"],
    reachTrend:  [164000,205000,204000,117000,158000,425000,118000,275000,165000,215000,408057,98587],
    viewsTrend:  [10000,12000,9000,122000,520000,790000,550000,880000,370000,1150000,1350000,441341],
    engageTrend: [500,1000,800,300,3000,12000,5000,15000,8000,33033,26000,7567],
    trendLabels: ["Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des","Jan","Feb","Mar","Apr"],
  },
};

// ── Content type data ─────────────────────────────────────────
const CONTENT_TYPES = [
  { label: "Reels",     viewsPct: 45.7, interactionsPct: 77.3, color: "#F5C400" },
  { label: "Stories",   viewsPct: 38.6, interactionsPct: 4.5,  color: "#4ade80" },
  { label: "Feed Post", viewsPct: 15.6, interactionsPct: 18.2, color: "#60a5fa" },
];


// ── Audience data ─────────────────────────────────────────────
const AGE_RANGES = [
  { range: "25–34", pct: 53.4 },
  { range: "35–44", pct: 20.7 },
  { range: "18–24", pct: 18.1 },
  { range: "45–54", pct: 5.6  },
  { range: "55–64", pct: 1.4  },
  { range: "65+",   pct: 0.8  },
];

const TOP_CITIES = [
  { city: "Gorontalo",           pct: 27.1 },
  { city: "Limboto, Gorontalo",  pct: 6.7  },
  { city: "Telaga, Gorontalo",   pct: 4.8  },
  { city: "Kwandang, Gorontalo", pct: 3.0  },
  { city: "Bone, Gorontalo",     pct: 2.6  },
  { city: "Jakarta",             pct: 2.6  },
  { city: "Manado",              pct: 2.1  },
  { city: "Marisa, Gorontalo",   pct: 1.8  },
  { city: "Suwawa, Gorontalo",   pct: 1.8  },
  { city: "Makassar",            pct: 1.6  },
];

const GENDER = { men: 47.9, women: 52.1 };

const ACTIVE_GRID = {
  days:  ["Sen","Sel","Rab","Kam","Jum","Sab","Min"],
  slots: ["06–10","10–14","14–18","18–21","21–24","00–06"],
  data: [
    [1,1,2,3,2,0],
    [1,1,2,3,2,0],
    [1,2,2,3,2,0],
    [1,1,3,3,2,0],
    [1,2,3,3,2,0],
    [2,2,2,2,1,0],
    [2,3,2,2,1,0],
  ],
};

const AUDIENCE_INTERESTS = [
  "Kuliner",
  "Wisata Gorontalo",
  "Budaya & Tradisi",
  "Olahraga",
  "Bisnis & UMKM",
  "Pendidikan",
  "Teknologi",
  "Hiburan",
];



// ── Helpers ───────────────────────────────────────────────────
function fmtNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString("id-ID");
}

// ── Sub-components ────────────────────────────────────────────
function Bar({ pct, color, height = 8 }: { pct: number; color: string; height?: number }) {
  return (
    <div className="rounded-full overflow-hidden bg-gray-200 dark:bg-zinc-800" style={{ height }}>
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
export default function MediaKitPage() {
  const [period, setPeriod]               = useState<Period>("30 hari");
  const [isClient, setIsClient]           = useState(false);
  const [showAllCities, setShowAllCities] = useState(false);
  const [topMonth, setTopMonth]           = useState(TOP_POSTS_MONTHS[0]);
  const [topSort, setTopSort]             = useState<"byViews" | "byReach">("byViews");

  const d    = PERIOD_DATA[period];
  const er   = ((d.interactions / d.reach) * 100).toFixed(1);
  const erApril = ((PERIOD_DATA["30 hari"].interactions / PERIOD_DATA["30 hari"].reach) * 100).toFixed(1);

  useEffect(() => { setIsClient(true); }, []);

  const visibleCities = showAllCities ? TOP_CITIES : TOP_CITIES.slice(0, 5);

  return (
    <div className="w-full">

      {/* ━━ 1. HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ backgroundColor: "#09090b" }} className="text-white px-4 sm:px-6 pt-14 pb-20">
        <div className="max-w-2xl mx-auto">

          <div className="flex items-center gap-2 mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Media Kit · {ACCOUNT.period}
            </span>
          </div>

          <div className="flex items-start gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-black">
              <Image
                src="/logo-gu.png"
                alt="Gorontalo Unite"
                width={64}
                height={64}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{ACCOUNT.handle}</h1>
              <p className="text-sm text-zinc-400 mt-0.5">{ACCOUNT.niche}</p>
              <p className="text-xs text-zinc-500 mt-0.5">📍 {ACCOUNT.location}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-10">
            {[
              { label: "Followers",         value: fmtNum(METRICS.followers)    },
              { label: "Avg Monthly Reach", value: fmtNum(METRICS.monthlyReach) },
              { label: "Monthly Views",     value: fmtNum(METRICS.monthlyViews) },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-4 text-center" style={{ backgroundColor: "#18181b" }}>
                <p className="text-xl sm:text-2xl font-bold" style={{ color: "#F5C400" }}>{s.value}</p>
                <p className="text-[10px] text-zinc-500 mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="https://wa.me/628114350404?text=Halo%20Gorontalo%20Unite%2C%20saya%20tertarik%20booking%20endorse"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-xl hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#F5C400", color: "#000" }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Booking Endorse
            </a>
            <button onClick={() => window.print()}
              className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-xl border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Media Kit
            </button>
          </div>
        </div>
      </section>

      {/* ━━ 2. ACCOUNT PERFORMANCE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white dark:bg-zinc-900 px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto">

          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1">Account Performance</p>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Insight Akun</h2>
          </div>

          {/* Period filter — inline style for active state agar pasti klikable */}
          <div className="flex gap-2 mb-8" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 4 }}>
            {PERIODS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                style={period === p
                  ? { backgroundColor: "rgba(245,196,0,0.12)", borderColor: "#F5C400", color: "#F5C400", whiteSpace: "nowrap" }
                  : { whiteSpace: "nowrap" }
                }
                className={`flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                  period === p
                    ? "border-transparent"
                    : "border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-zinc-400 hover:border-gray-300 dark:hover:border-zinc-600 bg-transparent"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* ── Metric grid ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {[
              { label: "Accounts Reached",  value: fmtNum(d.reach),        sub: d.reachSub,                              green: d.reachGrowthPct > 0 },
              { label: "Total Views",       value: fmtNum(d.views),        sub: "Reels 45.7% · Stories 38.6%",           green: false },
              { label: "Total Interactions",value: fmtNum(d.interactions), sub: "Likes · Saves · Shares",                green: false },
              { label: "Engagement Rate",   value: `${er}%`,               sub: "Interactions ÷ Reach",                  green: false },
              { label: "Followers Growth",  value: `${d.netGrowth >= 0 ? "+" : ""}${d.netGrowth.toLocaleString("id-ID")}`,
                sub: `${d.followsGained.toLocaleString("id-ID")} masuk · ${d.followsLost.toLocaleString("id-ID")} keluar`,
                green: d.netGrowth >= 0 },
              { label: "Total Followers",   value: fmtNum(METRICS.followers), sub: d.label,                              green: false },
            ].map((m) => (
              <div key={m.label} className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 p-4">
                <p className="text-xl font-bold text-gray-900 dark:text-white">{m.value}</p>
                <p className={`text-xs mt-0.5 leading-snug ${m.green ? "text-green-500 font-semibold" : "text-gray-400 dark:text-zinc-500"}`}>
                  {m.sub}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-600 mt-2">{m.label}</p>
              </div>
            ))}
          </div>

          {/* ── Interaction bars ── */}
          <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 p-5 mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-5">Breakdown Interaksi</p>
            <div className="space-y-3.5">
              {[
                { label: "Likes",    count: d.likes,    color: "#f87171" },
                { label: "Shares",   count: d.shares,   color: "#60a5fa" },
                { label: "Saves",    count: d.saves,    color: "#4ade80" },
                { label: "Comments", count: d.comments, color: "#c084fc" },
                { label: "Reposts",  count: d.reposts,  color: "#fb923c" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 dark:text-zinc-400 w-16 flex-shrink-0">{item.label}</span>
                  <div className="flex-1">
                    <Bar pct={parseFloat((item.count / Math.max(d.likes, 1) * 100).toFixed(1))} color={item.color} height={8} />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 dark:text-zinc-300 w-14 text-right tabular-nums">
                    {item.count.toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Growth charts ── */}
          {isClient ? (
            <GrowthCharts
              followerDaily={d.followerTrend}
              reachWeekly={d.reachTrend}
              viewsWeekly={d.viewsTrend}
              engageWeekly={d.engageTrend}
              netGrowth={d.netGrowth}
              reachGrowthPct={d.reachGrowthPct}
              monthlyViews={d.views}
              er={er}
              period={d.label}
              followerLabels={d.followerTrendLabels.length > 0 ? d.followerTrendLabels : undefined}
              trendLabels={d.trendLabels}
            />
          ) : (
            <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 p-5">
              <div className="h-4 w-48 rounded bg-gray-200 dark:bg-zinc-800 animate-pulse mb-5" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[0,1,2,3].map((i) => (
                  <div key={i}>
                    <div className="h-3 w-28 rounded bg-gray-200 dark:bg-zinc-800 animate-pulse mb-2" />
                    <div className="h-[100px] w-full rounded-lg bg-gray-200 dark:bg-zinc-800 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ━━ 3. CONTENT PERFORMANCE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-gray-50 dark:bg-zinc-950 px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1">Content Performance</p>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-8">Performa Konten</h2>

          {/* Content type breakdown */}
          <div className="space-y-3 mb-8">
            {CONTENT_TYPES.map((ct) => (
              <div key={ct.label} className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{ct.label}</p>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: ct.color + "22", color: ct.color }}>
                    {ct.viewsPct}% views
                  </span>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[10px] text-zinc-400 mb-1.5">
                      <span>Share of Views</span><span className="font-semibold">{ct.viewsPct}%</span>
                    </div>
                    <Bar pct={ct.viewsPct} color={ct.color} height={7} />
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-zinc-400 mb-1.5">
                      <span>Share of Interactions</span><span className="font-semibold">{ct.interactionsPct}%</span>
                    </div>
                    <div className="rounded-full overflow-hidden bg-gray-100 dark:bg-zinc-800" style={{ height: 7 }}>
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${ct.interactionsPct}%`, backgroundColor: ct.color, opacity: 0.5 }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Top posts — bento linktree style ── */}
          <div className="mb-6">
            {/* Header + filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Top 10 Konten</p>
              <div className="flex items-center gap-2 flex-wrap">
                {/* Sort toggle */}
                <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-700 text-xs font-semibold">
                  {(["byViews", "byReach"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setTopSort(s)}
                      style={topSort === s ? { backgroundColor: "#F5C400", color: "#000" } : {}}
                      className={`px-3 py-1.5 transition-colors ${topSort !== s ? "text-zinc-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800" : ""}`}
                    >
                      {s === "byViews" ? "Views" : "Reach"}
                    </button>
                  ))}
                </div>
                {/* Month picker */}
                <select
                  value={topMonth}
                  onChange={(e) => setTopMonth(e.target.value)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 cursor-pointer"
                >
                  {TOP_POSTS_MONTHS.map((m) => (
                    <option key={m} value={m}>{TOP_POSTS_DATA[m]?.label ?? m}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Post list */}
            <div className="space-y-2.5">
              {(TOP_POSTS_DATA[topMonth]?.[topSort] ?? []).map((post, i) => (
                <a
                  key={i}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3.5 hover:border-gray-300 dark:hover:border-zinc-600 transition-all group"
                >
                  {/* Rank badge */}
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold"
                    style={{ backgroundColor: i === 0 ? "#F5C400" : "#F5C40018", color: i === 0 ? "#000" : "#ca8a04" }}
                  >
                    #{i + 1}
                  </div>

                  {/* Title & meta */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-1 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                      {post.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                        style={
                          post.type === "Reel"     ? { backgroundColor: "#F5C40020", color: "#ca8a04" } :
                          post.type === "Carousel" ? { backgroundColor: "#60a5fa20", color: "#2563eb" } :
                                                     { backgroundColor: "#4ade8020", color: "#16a34a" }
                        }
                      >
                        {post.type}
                      </span>
                      <span className="text-[10px] text-zinc-400">{post.date}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-bold text-gray-800 dark:text-gray-200 tabular-nums">
                        {post.views >= 1000 ? `${(post.views/1000).toFixed(1)}K` : post.views}
                      </p>
                      <p className="text-[10px] text-zinc-400">views</p>
                    </div>
                    {post.reach > 0 && (
                      <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200 tabular-nums">
                          {post.reach >= 1000 ? `${(post.reach/1000).toFixed(1)}K` : post.reach}
                        </p>
                        <p className="text-[10px] text-zinc-400">reach</p>
                      </div>
                    )}
                    <div className="text-right">
                      <p className="text-xs font-bold text-gray-800 dark:text-gray-200 tabular-nums">
                        {post.likes >= 1000 ? `${(post.likes/1000).toFixed(1)}K` : post.likes}
                      </p>
                      <p className="text-[10px] text-zinc-400">likes</p>
                    </div>
                    <svg className="w-3.5 h-3.5 text-zinc-400 group-hover:text-yellow-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── Rata-rata performa per konten ── */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
              Rata-Rata Performa per Konten
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { type: "Reels",     icon: "🎬", avgViews: "10K–40K", avgReach: "3K–8K",  hot: true  },
                { type: "Story",     icon: "⭕", avgViews: "15K",     avgReach: "4K–9K",  hot: false },
                { type: "Feed Post", icon: "🖼️", avgViews: "—",       avgReach: "3K–5K",  hot: false },
              ].map((row) => (
                <div
                  key={row.type}
                  className="rounded-2xl border p-4 text-center"
                  style={{
                    borderColor: row.hot ? "#F5C40050" : undefined,
                    backgroundColor: row.hot ? "#fefce820" : undefined,
                  }}
                  {...(!row.hot && { className: "rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 text-center" })}
                >
                  <p className="text-2xl mb-2">{row.icon}</p>
                  <p className={`text-xs font-bold mb-3 ${row.hot ? "text-yellow-600 dark:text-yellow-400" : "text-gray-700 dark:text-gray-300"}`}>
                    {row.type}
                    {row.hot && <span className="ml-1 text-[9px] font-bold uppercase text-yellow-500">Top</span>}
                  </p>
                  <div className="space-y-1.5">
                    <div>
                      <p className="text-[10px] text-zinc-400">Views</p>
                      <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{row.avgViews}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-400">Reach</p>
                      <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{row.avgReach}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━ 4. AUDIENCE INSIGHT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white dark:bg-zinc-900 px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1">Audience Insight</p>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-8">Demografi &amp; Perilaku</h2>

          {/* Gender */}
          <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 p-5 mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Gender</p>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs text-pink-500 font-semibold w-12 flex-shrink-0">Wanita</span>
              <div className="flex-1 h-3 rounded-full overflow-hidden flex">
                <div className="h-full bg-pink-400 transition-all duration-700" style={{ width: `${GENDER.women}%` }} />
                <div className="h-full bg-blue-400 transition-all duration-700" style={{ width: `${GENDER.men}%` }} />
              </div>
              <span className="text-xs text-blue-400 font-semibold w-12 text-right flex-shrink-0">Pria</span>
            </div>
            <div className="flex justify-between px-12">
              <span className="text-base font-bold text-pink-500">{GENDER.women}%</span>
              <span className="text-base font-bold text-blue-400">{GENDER.men}%</span>
            </div>
          </div>

          {/* Age */}
          <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 p-5 mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Rentang Usia</p>
            <div className="space-y-3">
              {AGE_RANGES.map((a) => (
                <div key={a.range} className="flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-600 dark:text-zinc-400 w-12 flex-shrink-0">{a.range}</span>
                  <div className="flex-1">
                    <Bar pct={a.pct} color={a.pct >= 40 ? "#F5C400" : a.pct >= 15 ? "#fb923c" : "#94a3b8"} height={8} />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 dark:text-zinc-300 w-10 text-right tabular-nums">{a.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top cities — collapsible */}
          <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 p-5 mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Top Kota</p>
            <div className="space-y-3">
              {visibleCities.map((c, i) => (
                <div key={c.city} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-zinc-400 w-4 flex-shrink-0 tabular-nums">{i + 1}</span>
                  <span className="text-xs text-gray-600 dark:text-zinc-400 flex-1 min-w-0 truncate">{c.city}</span>
                  <div className="w-20 flex-shrink-0">
                    <Bar pct={parseFloat((c.pct / TOP_CITIES[0].pct * 100).toFixed(0))} color="#F5C400" height={7} />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 dark:text-zinc-300 w-9 text-right flex-shrink-0 tabular-nums">{c.pct}%</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowAllCities((v) => !v)}
              className="mt-4 text-xs font-semibold flex items-center gap-1 transition-opacity hover:opacity-70"
              style={{ color: "#F5C400" }}
            >
              {showAllCities ? "Sembunyikan" : `Lihat ${TOP_CITIES.length - 5} kota lainnya`}
              <svg
                className="w-3 h-3 transition-transform"
                style={{ transform: showAllCities ? "rotate(180deg)" : "rotate(0deg)" }}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Active time heatmap */}
          <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 p-5 mb-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Waktu Aktif Audience</p>
                <p className="text-[10px] text-zinc-400 mt-0.5">Jam WIB paling aktif untuk posting</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-zinc-400 flex-shrink-0">
                <span className="w-3 h-3 rounded-sm bg-gray-200 dark:bg-zinc-700 inline-block" />
                <span>Sepi</span>
                <span className="w-3 h-3 rounded-sm bg-yellow-400 inline-block ml-1" />
                <span>Ramai</span>
              </div>
            </div>

            <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
              <div style={{ minWidth: 300 }}>
                {/* Header row: slot labels */}
                <div className="flex items-center gap-1.5 mb-1.5" style={{ paddingLeft: 28 }}>
                  {ACTIVE_GRID.slots.map((s) => (
                    <div key={s} style={{ flex: 1, textAlign: "center", fontSize: 9 }} className="text-zinc-400 leading-tight">
                      {s}
                    </div>
                  ))}
                </div>
                {/* Data rows */}
                {ACTIVE_GRID.days.map((day, di) => (
                  <div key={day} className="flex items-center gap-1.5 mb-1.5">
                    <span style={{ width: 24, fontSize: 10, flexShrink: 0 }} className="text-zinc-400 text-right">{day}</span>
                    {ACTIVE_GRID.data[di].map((level, ti) => {
                      const colors = [
                        "bg-gray-100 dark:bg-zinc-800",
                        "bg-yellow-100 dark:bg-yellow-900/40",
                        "bg-yellow-300 dark:bg-yellow-600/60",
                        "bg-yellow-500",
                      ];
                      return (
                        <div key={ti} style={{ flex: 1, aspectRatio: "1", borderRadius: 4 }}
                          className={colors[level]} />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Audience interests */}
          <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Audience Interest</p>
            <div className="flex flex-wrap gap-2">
              {AUDIENCE_INTERESTS.map((interest, i) => (
                <span key={i}
                  className={`inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full border ${
                    i < 3
                      ? "border-yellow-300/40 dark:border-yellow-500/30"
                      : "border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-400"
                  }`}
                  style={i < 3 ? { backgroundColor: "#F5C40015", color: "#ca8a04" } : undefined}>
                  {i < 3 && <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-1.5 flex-shrink-0" />}
                  {interest}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-zinc-400 mt-3">
              ★ Top 3 minat dominan audience berdasarkan pola konten yang dikonsumsi.
            </p>
          </div>
        </div>
      </section>

      {/* ━━ 5. TRUST SECTION ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-gray-50 dark:bg-zinc-950 px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1">Why Us</p>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-8">Kenapa Pilih @gorontalo.unite?</h2>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { icon: "📍", title: "Hyperlocal Reach",    desc: "27.1% audience dari Kota Gorontalo. Menjangkau komunitas lokal yang paling relevan untuk brand Anda." },
              { icon: "🎯", title: `${erApril}% Engagement`, desc: "Jauh di atas rata-rata industri 3–6%. Audience aktif dan responsif terhadap konten." },
              { icon: "📈", title: "6.2M Views/Tahun",    desc: "Total views organik dalam 12 bulan terakhir (Mei 2025 – Apr 2026). Jangkauan terbukti konsisten." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
                <p className="text-2xl mb-3">{item.icon}</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">{item.title}</p>
                <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ━━ 7. FINAL CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ backgroundColor: "#09090b" }} className="text-white px-4 sm:px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center max-w-sm mx-auto">
            <h2 className="text-2xl font-bold mb-3">Siap Mulai Campaign?</h2>
            <p className="text-sm text-zinc-400 mb-8">
              Diskusikan kebutuhan endorse Anda bersama kami. Kami bantu pilih paket paling efektif.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://wa.me/628114350404?text=Halo%2C%20saya%20ingin%20endorse%20di%20%40gorontalo.unite"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#F5C400", color: "#000" }}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Sekarang
              </a>
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-medium px-6 py-3.5 rounded-xl border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
              >
                Lihat Services Lain
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
