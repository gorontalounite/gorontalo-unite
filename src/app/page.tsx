import LandingPage from "@/components/Landing/LandingPage";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/* ─── Weather (Open-Meteo, free, no key) ──────────────────────── */
async function fetchWeather() {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=0.5435&longitude=123.0568&current=temperature_2m,weather_code&timezone=Asia%2FMakassar",
      { next: { revalidate: 1800 } }
    );
    if (!res.ok) return null;
    const d = await res.json();
    return { temp: Math.round(d.current.temperature_2m as number), code: d.current.weather_code as number };
  } catch { return null; }
}

/* ─── Prayer times (Aladhan, free) ───────────────────────────── */
async function fetchPrayerTimes() {
  try {
    const res = await fetch(
      "https://api.aladhan.com/v1/timingsByCity?city=Gorontalo&country=Indonesia&method=20",
      { next: { revalidate: 43200 } }
    );
    if (!res.ok) return null;
    const d = await res.json();
    const t = d.data?.timings as Record<string, string> | undefined;
    if (!t) return null;
    return { Imsak: t.Imsak, Fajr: t.Fajr, Maghrib: t.Maghrib, Isha: t.Isha };
  } catch { return null; }
}

export default async function HomePage() {
  const [weather, prayer, portfolioResult] = await Promise.all([
    fetchWeather(),
    fetchPrayerTimes(),
    createAdminClient()
      .from("articles")
      .select("id, title, slug, image_url, published_at, created_at")
      .eq("category", "Portfolio")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(4),
  ]);

  return (
    <LandingPage
      portfolioItems={portfolioResult.data ?? []}
      weather={weather}
      prayer={prayer}
    />
  );
}
