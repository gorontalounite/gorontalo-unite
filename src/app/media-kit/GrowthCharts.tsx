"use client";

// ── Helpers ───────────────────────────────────────────────────
function fmtNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString("id-ID");
}

// ── Pure SVG area chart — no SSR, no hydration mismatch ───────
function AreaChart({
  data,
  color,
  height = 100,
  labels,
  formatY,
}: {
  data: number[];
  color: string;
  height?: number;
  labels?: string[];
  formatY?: (v: number) => string;
}) {
  const W = 320;
  const padL = 38, padR = 8, padT = 6, padB = labels ? 18 : 6;
  const cW = W - padL - padR;
  const cH = height - padT - padB;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => {
    const x = padL + (data.length === 1 ? 0 : (i / (data.length - 1))) * cW;
    const y = padT + cH - ((v - min) / range) * cH;
    return { x, y };
  });

  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`).join(" ");
  const area = `${line} L ${pts[pts.length - 1].x},${padT + cH} L ${padL},${padT + cH} Z`;
  const gradId = `grad-${color.replace(/[^a-zA-Z0-9]/g, "")}-${data.length}`;
  const yTicks = [min, min + range * 0.5, max];

  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Y-axis grid + labels */}
      {yTicks.map((v, i) => {
        const y = padT + cH - ((v - min) / range) * cH;
        return (
          <g key={i}>
            <line
              x1={padL} y1={y} x2={W - padR} y2={y}
              stroke={color} strokeOpacity="0.08" strokeWidth="1"
            />
            <text
              x={padL - 4} y={y + 3.5} textAnchor="end"
              fontSize="8.5" fill={color} fillOpacity="0.55"
            >
              {formatY ? formatY(v) : fmtNum(v)}
            </text>
          </g>
        );
      })}

      {/* Area fill */}
      <path d={area} fill={`url(#${gradId})`} />
      {/* Line */}
      <path d={line} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* End dot */}
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="3" fill={color} />

      {/* X-axis labels */}
      {labels && labels.map((lbl, i) => {
        const x = padL + (labels.length === 1 ? 0 : (i / (labels.length - 1))) * cW;
        return (
          <text key={i} x={x} y={height - 3} textAnchor="middle" fontSize="8.5" fill={color} fillOpacity="0.45">
            {lbl}
          </text>
        );
      })}
    </svg>
  );
}

// ── Props ──────────────────────────────────────────────────────
interface GrowthChartsProps {
  followerDaily: number[];
  reachWeekly: number[];
  viewsWeekly: number[];
  engageWeekly: number[];
  netGrowth: number;
  reachGrowthPct: number;
  monthlyViews: number;
  er: string;
  period: string;
  followerLabels?: string[];
  trendLabels?: string[];
}

// ── Main export ────────────────────────────────────────────────
export default function GrowthCharts({
  followerDaily,
  reachWeekly,
  viewsWeekly,
  engageWeekly,
  netGrowth,
  reachGrowthPct,
  monthlyViews,
  er,
  period,
  followerLabels,
  trendLabels,
}: GrowthChartsProps) {
  const weekLabels = trendLabels ?? ["Mg 1", "Mg 2", "Mg 3", "Mg 4"];
  const dayLabels = followerLabels ?? followerDaily.map((_, i) => (i % 7 === 0 ? `${i + 1}` : ""));

  return (
    <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-5">
        Growth Charts — {period}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Follower growth */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <p className="text-xs font-semibold text-gray-700 dark:text-zinc-300">Follower Growth</p>
            <span className="text-xs text-green-500 font-semibold">+{netGrowth}</span>
          </div>
          <AreaChart
            data={followerDaily}
            color="#F5C400"
            height={100}
            labels={dayLabels}
            formatY={(v) => `${Math.round(v / 1000)}K`}
          />
        </div>

        {/* Reach growth */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <p className="text-xs font-semibold text-gray-700 dark:text-zinc-300">Reach Growth</p>
            <span className="text-xs text-green-500 font-semibold">+{reachGrowthPct}%</span>
          </div>
          <AreaChart
            data={reachWeekly}
            color="#60a5fa"
            height={100}
            labels={weekLabels}
            formatY={fmtNum}
          />
        </div>

        {/* Views growth */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <p className="text-xs font-semibold text-gray-700 dark:text-zinc-300">Views Growth</p>
            <span className="text-xs text-zinc-400">{fmtNum(monthlyViews)}/bln</span>
          </div>
          <AreaChart
            data={viewsWeekly}
            color="#a78bfa"
            height={100}
            labels={weekLabels}
            formatY={fmtNum}
          />
        </div>

        {/* Engagement growth */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <p className="text-xs font-semibold text-gray-700 dark:text-zinc-300">Engagement Growth</p>
            <span className="text-xs text-zinc-400">{er}% ER</span>
          </div>
          <AreaChart
            data={engageWeekly}
            color="#4ade80"
            height={100}
            labels={weekLabels}
            formatY={(v) => `${Math.round(v / 1000)}K`}
          />
        </div>
      </div>
      <p className="text-[10px] text-zinc-400 dark:text-zinc-600 mt-4">
        * Grafik follower berbasis data harian. Grafik reach, views &amp; engagement berbasis data per-minggu.
      </p>
    </div>
  );
}
