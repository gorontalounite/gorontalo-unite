"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import ChatContainer, { type LiveConversation } from "@/components/Chat/ChatContainer";
import InputBar from "@/components/Chat/InputBar";

/* ─── Types ───────────────────────────────────────────────────── */
interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  image_url: string | null;
  published_at: string | null;
  created_at: string;
}

interface WeatherData {
  temp: number;
  code: number;
}

interface PrayerData {
  Imsak: string;
  Fajr: string;
  Maghrib: string;
  Isha: string;
}

interface LandingPageProps {
  portfolioItems: PortfolioItem[];
  weather?: WeatherData | null;
  prayer?: PrayerData | null;
}

/* ─── Helpers ─────────────────────────────────────────────────── */
function weatherIcon(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 3) return "⛅";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  return "⛈️";
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

/* ─── Info chips inside the hero square ──────────────────────── */
function InfoChips({ weather, prayer }: { weather?: WeatherData | null; prayer?: PrayerData | null }) {
  const chips: { icon: string; label: string; value: string; href?: string }[] = [];

  if (weather) {
    chips.push({
      icon: weatherIcon(weather.code),
      label: "Cuaca",
      value: `${weather.temp}°C`,
    });
  }

  if (prayer) {
    chips.push({
      icon: "🌙",
      label: "Maghrib",
      value: prayer.Maghrib,
    });
    chips.push({
      icon: "🕌",
      label: "Imsak",
      value: prayer.Imsak,
    });
  }

  chips.push({
    icon: "✈️",
    label: "Penerbangan",
    value: "Cek jadwal",
    href: "https://www.citilink.co.id",
  });

  chips.push({
    icon: "📊",
    label: "Harga Pasar",
    value: "Komoditas",
    href: "https://hargapangan.id",
  });

  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto py-0.5">
      {chips.map((chip) => {
        const cls = `flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-full px-3 py-1.5 whitespace-nowrap flex-shrink-0${chip.href ? " hover:bg-emerald-50 hover:border-[#2D7D46]/20 transition-colors" : ""}`;
        const inner = (
          <>
            <span className="text-sm leading-none">{chip.icon}</span>
            <span className="text-[11px] text-gray-400">{chip.label}</span>
            <span className="text-[11px] font-semibold text-gray-700">{chip.value}</span>
          </>
        );
        return chip.href ? (
          <a key={chip.label} href={chip.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
        ) : (
          <div key={chip.label} className={cls}>{inner}</div>
        );
      })}
    </div>
  );
}

/* ─── Portfolio card (thumbnail only) ────────────────────────── */
function PortfolioCard({ item }: { item: PortfolioItem }) {
  const date = formatDate(item.published_at ?? item.created_at);
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#2D7D46]/30 hover:shadow-md transition-all"
    >
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
            <span className="text-3xl">🌿</span>
          </div>
        )}
      </div>
      <div className="p-3 space-y-0.5">
        <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug">{item.title}</p>
        {date && <p className="text-[10px] text-gray-400">{date}</p>}
      </div>
    </Link>
  );
}

/* ─── Footer ──────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <p className="text-sm font-bold text-gray-900 mb-3">Gorontalo Unite</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Platform digital AI &amp; berita lokal Gorontalo.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Platform</p>
            <ul className="space-y-2">
              {[
                ["Beranda", "/"],
                ["Good News", "/good-news"],
                ["Portofolio", "/portfolio"],
                ["Affiliate", "/affiliate"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-xs text-gray-500 hover:text-[#2D7D46] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Info</p>
            <ul className="space-y-2">
              {[
                ["Tentang Kami", "/about"],
                ["Kontak", "/about#kontak"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-xs text-gray-500 hover:text-[#2D7D46] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Legal</p>
            <ul className="space-y-2">
              {[
                ["Privacy Policy", "/privacy-policy"],
                ["Terms & Conditions", "/terms"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-xs text-gray-500 hover:text-[#2D7D46] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} Gorontalo Unite. All rights reserved.</p>
          <p className="text-xs text-gray-300">Made with ❤ for Gorontalo</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main landing page ───────────────────────────────────────── */
export default function LandingPage({ portfolioItems, weather, prayer }: LandingPageProps) {
  const [chatActive, setChatActive] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string | undefined>();
  const [chatToLoad, setChatToLoad] = useState<LiveConversation | null>(null);

  // Listen for load-chat from LeftDrawer — expand to full chat
  useEffect(() => {
    const handler = (e: Event) => {
      const conv = (e as CustomEvent<LiveConversation>).detail;
      setChatToLoad(conv);
      setChatActive(true);
    };
    window.addEventListener("load-chat", handler);
    return () => window.removeEventListener("load-chat", handler);
  }, []);

  const handleHeroSend = (msg: string) => {
    setInitialMessage(msg);
    setChatActive(true);
  };

  /* ── Full chat mode ── */
  if (chatActive) {
    return (
      <div className="flex flex-1 min-h-0 w-full">
        <div className="flex-1 flex flex-col min-h-0">
          <Suspense
            fallback={
              <div className="flex-1 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-[#2D7D46] border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <ChatContainer initialMessage={initialMessage} chatToLoad={chatToLoad} />
          </Suspense>
        </div>
      </div>
    );
  }

  /* ── Landing mode ── */
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">

      {/* ── Hero ── */}
      <section className="px-4 pt-8 pb-8">
        <div className="max-w-5xl mx-auto">

          {/* Heading — above the box */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
            Tanyakan Apapun<br className="hidden sm:block" />{" "}
            <span className="text-[#2D7D46]">tentang Gorontalo</span>
          </h1>

          {/* Info chips — below heading, above box */}
          <div className="mb-4">
            <InfoChips weather={weather} prayer={prayer} />
          </div>

          {/* 5:4 chat box */}
          <div className="w-full aspect-[5/4] bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">

            {/* Empty space — clean interior */}
            <div className="flex-1 flex items-center justify-center select-none pointer-events-none">
              <svg className="w-16 h-16 text-gray-100" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>

            {/* Bottom bar: InputBar */}
            <div className="px-6 pb-6 flex-shrink-0">
              <InputBar onSend={handleHeroSend} />
            </div>
          </div>

        </div>
      </section>

      {/* ── About Gorontalo Unite ── */}
      <section className="max-w-5xl mx-auto px-4 pb-10">
        <Link
          href="/about"
          className="group block bg-white rounded-2xl border border-gray-100 hover:border-[#2D7D46]/30 hover:shadow-md transition-all p-6 sm:p-8"
        >
          <p className="text-xs font-semibold text-[#2D7D46] uppercase tracking-widest mb-2">Tentang Kami</p>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Apa itu Gorontalo Unite?</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-4 max-w-xl">
            Platform digital yang memadukan AI dengan kekayaan lokal Gorontalo — menghubungkan masyarakat,
            wisatawan, dan pelaku usaha dengan informasi, berita, dan layanan digital terkini.
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#2D7D46] group-hover:gap-2 transition-all">
            Selengkapnya
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </section>

      {/* ── Portfolio grid ── */}
      <section className="max-w-5xl mx-auto px-4 pb-10 border-t border-gray-100 pt-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-semibold text-[#2D7D46] uppercase tracking-widest mb-1">Portofolio</p>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Karya &amp; Proyek Kami</h2>
          </div>
          <Link
            href="/portfolio"
            className="text-sm font-medium text-[#2D7D46] hover:text-[#236137] flex items-center gap-1 transition-colors flex-shrink-0"
          >
            Lihat semua
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {portfolioItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {portfolioItems.slice(0, 4).map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-dashed border-gray-200">
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <span className="text-3xl">🌿</span>
                </div>
                <div className="p-3">
                  <div className="h-3 bg-gray-100 rounded w-3/4 mb-1.5" />
                  <div className="h-2 bg-gray-50 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <Link
            href="/portfolio"
            className="text-sm font-medium border border-[#2D7D46] text-[#2D7D46] hover:bg-[#2D7D46] hover:text-white px-6 py-2.5 rounded-xl transition-colors"
          >
            Lihat Semua Portofolio
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
