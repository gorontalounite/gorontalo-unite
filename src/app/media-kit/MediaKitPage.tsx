"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TOP_POSTS_DATA, TOP_POSTS_MONTHS } from "./topPostsData";

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



// ── Monthly insight data (Jan 2024 – Apr 2026) ────────────────
interface MonthInsight {
  label: string;
  views: number;
  reach: number;
  interactions: number;
  follows: number;
  posts?: number;
}

const MONTHLY_DATA: Record<string, MonthInsight> = {
  // ── 2024 (akumulasi lifetime per post dari CSV export) ────────
  "2024-01": { label:"Januari 2024",    views:0,         reach:93050,   interactions:33511, follows:18,   posts:28 },
  "2024-02": { label:"Februari 2024",   views:0,         reach:2193,    interactions:93083, follows:10,   posts:15 },
  "2024-03": { label:"Maret 2024",      views:0,         reach:51518,   interactions:36565, follows:210,  posts:36 },
  "2024-04": { label:"April 2024",      views:0,         reach:34456,   interactions:47804, follows:155,  posts:42 },
  "2024-05": { label:"Mei 2024",        views:0,         reach:50433,   interactions:8320,  follows:163,  posts:13 },
  "2024-06": { label:"Juni 2024",       views:0,         reach:273235,  interactions:19195, follows:516,  posts:25 },
  "2024-07": { label:"Juli 2024",       views:1674968,   reach:845266,  interactions:51990, follows:900,  posts:25 },
  "2024-08": { label:"Agustus 2024",    views:206100,    reach:108910,  interactions:7335,  follows:23,   posts:11 },
  "2024-09": { label:"September 2024",  views:786934,    reach:417437,  interactions:21962, follows:81,   posts:29 },
  "2024-10": { label:"Oktober 2024",    views:207285,    reach:114506,  interactions:7335,  follows:22,   posts:13 },
  "2024-11": { label:"November 2024",   views:611955,    reach:341769,  interactions:16791, follows:76,   posts:17 },
  "2024-12": { label:"Desember 2024",   views:1105708,   reach:615374,  interactions:41214, follows:392,  posts:42 },
  // ── Jan–Apr 2025 (akumulasi lifetime per post dari CSV export) ─
  "2025-01": { label:"Januari 2025",    views:414086,    reach:243025,  interactions:13489, follows:184,  posts:39 },
  "2025-02": { label:"Februari 2025",   views:358599,    reach:198741,  interactions:11932, follows:232,  posts:18 },
  "2025-03": { label:"Maret 2025",      views:765595,    reach:431126,  interactions:20679, follows:212,  posts:42 },
  "2025-04": { label:"April 2025",      views:326095,    reach:176269,  interactions:8985,  follows:204,  posts:12 },
  // ── Mei–Jul 2025 (views & interaksi dari post CSV, reach & follows dari insight akun harian) ──
  "2025-05": { label:"Mei 2025",        views:233035,    reach:211448,  interactions:8963,  follows:1417, posts:15 },
  "2025-06": { label:"Juni 2025",       views:328290,    reach:240548,  interactions:5777,  follows:1681, posts:22 },
  "2025-07": { label:"Juli 2025",       views:427752,    reach:264424,  interactions:11739, follows:1996, posts:21 },
  // ── Agu 2025–Apr 2026 (insight akun bulanan dari CSV harian) ──
  "2025-08": { label:"Agustus 2025",    views:131464,    reach:160980,  interactions:2589,  follows:1104, posts:13 },
  "2025-09": { label:"September 2025",  views:685218,    reach:186085,  interactions:4760,  follows:688,  posts:23 },
  "2025-10": { label:"Oktober 2025",    views:984412,    reach:388971,  interactions:11137, follows:729,  posts:20 },
  "2025-11": { label:"November 2025",   views:561637,    reach:146122,  interactions:5821,  follows:531,  posts:21 },
  "2025-12": { label:"Desember 2025",   views:955134,    reach:294756,  interactions:14124, follows:738,  posts:32 },
  "2026-01": { label:"Januari 2026",    views:445426,    reach:152331,  interactions:6835,  follows:583,  posts:15 },
  "2026-02": { label:"Februari 2026",   views:1149503,   reach:249933,  interactions:7045,  follows:539,  posts:24 },
  "2026-03": { label:"Maret 2026",      views:1746287,   reach:408057,  interactions:40572, follows:947           },
  "2026-04": { label:"April 2026",      views:441341,    reach:98587,   interactions:7567,  follows:484           },
};

const YEAR_MONTHS: Record<string, string[]> = {
  "2024": ["01","02","03","04","05","06","07","08","09","10","11","12"],
  "2025": ["01","02","03","04","05","06","07","08","09","10","11","12"],
  "2026": ["01","02","03","04"],
};
const MONTH_SHORT = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];

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
  const [showAllCities, setShowAllCities] = useState(false);
  const [topMonth, setTopMonth]           = useState(TOP_POSTS_MONTHS[TOP_POSTS_MONTHS.length - 1]);
  const [topSort, setTopSort]             = useState<"byViews" | "byReach">("byViews");
  const [selYear, setSelYear]             = useState("2026");
  const [selMonth, setSelMonth]           = useState("04");

  useEffect(() => {}, []);

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

          {/* ── Year tabs ── */}
          <div className="flex gap-2 mb-3">
            {(["2024","2025","2026"] as const).map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => {
                  setSelYear(y);
                  setSelMonth(YEAR_MONTHS[y][YEAR_MONTHS[y].length - 1]);
                }}
                style={selYear === y
                  ? { backgroundColor:"rgba(245,196,0,0.12)", borderColor:"#F5C400", color:"#F5C400" }
                  : {}}
                className={`text-sm font-bold px-5 py-2 rounded-xl border transition-all cursor-pointer ${
                  selYear !== y
                    ? "border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-zinc-400 hover:border-gray-300 dark:hover:border-zinc-600"
                    : "border-transparent"
                }`}
              >{y}</button>
            ))}
          </div>

          {/* ── Month chips ── */}
          <div className="flex gap-2 flex-wrap mb-8">
            {YEAR_MONTHS[selYear].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setSelMonth(m)}
                style={selMonth === m
                  ? { backgroundColor:"rgba(245,196,0,0.12)", borderColor:"#F5C400", color:"#F5C400" }
                  : {}}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  selMonth !== m
                    ? "border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-zinc-400 hover:border-gray-300 dark:hover:border-zinc-600"
                    : "border-transparent"
                }`}
              >{MONTH_SHORT[parseInt(m) - 1]}</button>
            ))}
          </div>

          {/* ── Monthly metric cards ── */}
          {(() => {
            const md = MONTHLY_DATA[`${selYear}-${selMonth}`];
            if (!md) return null;
            const erM = md.reach > 0 ? ((md.interactions / md.reach) * 100).toFixed(1) : null;
            const cards = [
              ...(md.views > 0 ? [{ label:"Total Views",        value:fmtNum(md.views),                         sub:"Semua format konten",     green:false }] : []),
              { label:"Akun Terjangkau",   value:fmtNum(md.reach),                         sub:"Unique accounts reached", green:false },
              { label:"Total Interaksi",   value:fmtNum(md.interactions),                  sub:"Likes · Shares · Saves",  green:false },
              ...(erM ? [{ label:"Engagement Rate", value:`${erM}%`,                       sub:"Interaksi ÷ Jangkauan",   green:false }] : []),
              { label:"Followers Baru",    value:`+${md.follows.toLocaleString("id-ID")}`, sub:"Follows diperoleh",       green:true  },
              ...(md.posts != null ? [{ label:"Konten Diterbitkan", value:String(md.posts), sub:"Post dipublish",         green:false }] : []),
            ];
            return (
              <>
                <p className="text-xs font-semibold text-gray-500 dark:text-zinc-400 mb-4">{md.label}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  {cards.map((card) => (
                    <div key={card.label} className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 p-4">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                      <p className={`text-xs mt-0.5 leading-snug ${card.green ? "text-green-500 font-semibold" : "text-gray-400 dark:text-zinc-500"}`}>
                        {card.sub}
                      </p>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-600 mt-2">{card.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-zinc-400 mt-2">
                  ★ Jan 2024–Apr 2025: akumulasi lifetime per konten. Mei 2025–Apr 2026: insight akun bulanan.
                </p>
              </>
            );
          })()}
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
              { icon: "🎯", title: "7.7% Engagement",          desc: "Jauh di atas rata-rata industri 3–6%. Audience aktif dan responsif terhadap konten." },
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
                href="/about#kontak"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-medium px-6 py-3.5 rounded-xl border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
              >
                Hubungi Tim Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
