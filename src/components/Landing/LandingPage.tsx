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

interface LandingPageProps {
  portfolioItems: PortfolioItem[];
}

/* ─── Helpers ─────────────────────────────────────────────────── */
function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

/* ─── Feature card component ──────────────────────────────────── */
interface FeatureProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
}

function FeatureCard({ icon, title, description, href }: FeatureProps) {
  const content = (
    <div className="p-6 sm:p-7">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      {href && (
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2D7D46] mt-4 group-hover:gap-2 transition-all">
          Jelajahi
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group block bg-white rounded-2xl border border-gray-200 hover:border-[#2D7D46]/30 hover:shadow-lg transition-all">
        {content}
      </Link>
    );
  }

  return <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7">{content}</div>;
}

/* ─── Portfolio card (thumbnail + info) ────────────────────────── */
function PortfolioCard({ item }: { item: PortfolioItem }) {
  const date = formatDate(item.published_at ?? item.created_at);
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#2D7D46]/30 hover:shadow-lg transition-all"
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
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
            <span className="text-3xl">🌿</span>
          </div>
        )}
      </div>
      <div className="p-4 space-y-1">
        <p className="text-sm font-semibold text-gray-900 line-clamp-2">{item.title}</p>
        {date && <p className="text-xs text-gray-500">{date}</p>}
      </div>
    </Link>
  );
}

/* ─── CTA Button ──────────────────────────────────────────────── */
function CTAButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#2D7D46] text-white font-semibold rounded-xl hover:bg-[#1f5a33] transition-colors shadow-sm"
    >
      {children}
    </Link>
  );
}

/* ─── Secondary Button ────────────────────────────────────────── */
function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 px-7 py-3 border border-gray-300 text-gray-900 font-semibold rounded-xl hover:border-[#2D7D46] hover:text-[#2D7D46] transition-colors"
    >
      {children}
    </Link>
  );
}

/* ─── Footer ──────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 mb-12">
          <div className="md:col-span-2">
            <p className="text-lg font-bold text-gray-900 mb-2">Gorontalo Unite</p>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              Platform digital yang memadukan AI dengan kekayaan lokal Gorontalo — menghubungkan masyarakat, wisatawan, dan pelaku usaha.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4">Platform</p>
            <ul className="space-y-3">
              {[
                ["Beranda", "/"],
                ["Good News", "/good-news"],
                ["Portofolio", "/portfolio"],
                ["Affiliate", "/affiliate"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-600 hover:text-[#2D7D46] transition-colors font-medium">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4">Info</p>
            <ul className="space-y-3">
              {[
                ["Tentang Kami", "/about"],
                ["Kontak", "/about#kontak"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-600 hover:text-[#2D7D46] transition-colors font-medium">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4">Legal</p>
            <ul className="space-y-3">
              {[
                ["Privacy Policy", "/privacy-policy"],
                ["Terms & Conditions", "/terms"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-600 hover:text-[#2D7D46] transition-colors font-medium">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Gorontalo Unite. All rights reserved.</p>
          <p className="text-sm text-gray-500">Made with ❤ for Gorontalo</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main landing page ───────────────────────────────────────── */
export default function LandingPage({ portfolioItems }: LandingPageProps) {
  const [chatActive, setChatActive] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string | undefined>();
  const [chatToLoad, setChatToLoad] = useState<LiveConversation | null>(null);

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

  return (
    <div className="flex-1 overflow-y-auto bg-white">

      {/* ── Hero Section ── */}
      <section className="px-4 sm:px-6 pt-16 sm:pt-24 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-block mb-6">
              <span className="text-sm font-semibold text-[#2D7D46] uppercase tracking-widest">AI-Powered Platform</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Tanyakan Apapun <span className="text-[#2D7D46]">tentang Gorontalo</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl">
              Platform digital yang memadukan kecerdasan buatan dengan kekayaan lokal Gorontalo. Dapatkan informasi, berita, dan layanan digital dalam satu tempat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleHeroSend("")}
                className="px-8 py-4 bg-[#2D7D46] text-white font-semibold rounded-xl hover:bg-[#1f5a33] transition-colors shadow-md hover:shadow-lg"
              >
                Mulai Chat Sekarang
              </button>
              <SecondaryButton href="/about">Pelajari Lebih Lanjut</SecondaryButton>
            </div>
          </div>

          {/* Chat Preview */}
          <div className="mt-16 lg:mt-20">
            <div className="aspect-[16/9] sm:aspect-[20/12] max-h-[500px] bg-gray-900 rounded-3xl border border-gray-800 shadow-2xl flex flex-col overflow-hidden">
              <div className="flex-1 flex items-center justify-center select-none pointer-events-none">
                <div className="text-center">
                  <svg className="w-20 h-20 text-gray-700 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                  </svg>
                  <p className="text-gray-500 text-sm">Chat interface akan muncul di sini</p>
                </div>
              </div>
              <div className="px-6 pb-6 flex-shrink-0">
                <InputBar onSend={handleHeroSend} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="px-4 sm:px-6 py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-sm font-semibold text-[#2D7D46] uppercase tracking-widest">Fitur Utama</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-3 mb-4">
              Semua yang Anda Butuhkan dalam Satu Platform
            </h2>
            <p className="text-lg text-gray-600">Jelajahi berbagai fitur yang dirancang untuk menghubungkan Anda dengan Gorontalo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon="🤖"
              title="AI Chatbot"
              description="Tanyakan apa saja tentang Gorontalo dan dapatkan jawaban berdasarkan AI dengan informasi real-time dari internet."
              href="/chat"
            />
            <FeatureCard
              icon="📰"
              title="Good News"
              description="Baca berita positif lokal dari Gorontalo. Inspirasi dan cerita sukses dari komunitas kami."
              href="/good-news"
            />
            <FeatureCard
              icon="🌿"
              title="Portfolio"
              description="Temukan proyek-proyek digital dan karya inovatif yang menunjukkan potensi Gorontalo."
              href="/portfolio"
            />
          </div>
        </div>
      </section>

      {/* ── Portfolio Section ── */}
      <section className="px-4 sm:px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <span className="text-sm font-semibold text-[#2D7D46] uppercase tracking-widest">Showcase</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-3">Karya &amp; Proyek Kami</h2>
            </div>
            <Link
              href="/portfolio"
              className="mt-6 sm:mt-0 text-sm font-semibold text-[#2D7D46] hover:text-[#1f5a33] flex items-center gap-1.5 transition-colors"
            >
              Lihat semua proyek
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {portfolioItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {portfolioItems.slice(0, 4).map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-200">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <span className="text-3xl">🌿</span>
                  </div>
                  <div className="p-4">
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-2 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <SecondaryButton href="/portfolio">Lihat Semua Portofolio</SecondaryButton>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="px-4 sm:px-6 py-20 bg-gradient-to-br from-[#2D7D46] to-[#1f5a33]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Siap Mengeksplorasi Gorontalo?
          </h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pengguna yang telah menemukan informasi, berita, dan peluang di Gorontalo Unite.
          </p>
          <button
            onClick={() => handleHeroSend("")}
            className="px-8 py-4 bg-white text-[#2D7D46] font-semibold rounded-xl hover:bg-green-50 transition-colors shadow-lg"
          >
            Mulai Sekarang
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
