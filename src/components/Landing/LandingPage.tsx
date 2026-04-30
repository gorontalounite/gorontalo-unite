"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import ChatContainer, { type LiveConversation } from "@/components/Chat/ChatContainer";
import InputBar from "@/components/Chat/InputBar";

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  category: string;
}

interface LandingPageProps {
  portfolioItems: PortfolioItem[];
}

/* ─── Footer ──────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <p className="text-sm font-bold text-gray-900 mb-3">Gorontalo Unite</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Platform digital AI & berita lokal Gorontalo.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Platform</p>
            <ul className="space-y-2">
              {[["Beranda", "/"], ["Good News", "/good-news"], ["Portofolio", "/portfolio"], ["Affiliate", "/affiliate"]].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-xs text-gray-500 hover:text-[#2D7D46] transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Info</p>
            <ul className="space-y-2">
              {[["Tentang Kami", "/about"], ["Kontak", "/about#kontak"]].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-xs text-gray-500 hover:text-[#2D7D46] transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Legal</p>
            <ul className="space-y-2">
              {[["Privacy Policy", "/privacy-policy"], ["Terms & Conditions", "/terms"]].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-xs text-gray-500 hover:text-[#2D7D46] transition-colors">{label}</Link></li>
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

/* ─── Portfolio card ──────────────────────────────────────────── */
function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <Link href={`/portfolio/${item.slug}`} className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#2D7D46]/30 hover:shadow-md transition-all">
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {item.image_url ? (
          <Image src={item.image_url} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
            <span className="text-3xl">🌿</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug">{item.title}</p>
        {item.excerpt && <p className="text-xs text-gray-400 mt-1 line-clamp-2">{item.excerpt}</p>}
      </div>
    </Link>
  );
}

/* ─── Placeholder card (when no portfolio items yet) ─────────── */
function PlaceholderCard({ index }: { index: number }) {
  const emojis = ["🏖️", "🌋", "🦈", "🎨", "🍜", "🏛️", "🎭", "🌊", "🦜", "🌺", "🎪", "🏔️", "🌾", "🦅", "🌅", "🎵"];
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-dashed border-gray-200">
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <span className="text-3xl">{emojis[index % emojis.length]}</span>
      </div>
      <div className="p-3">
        <div className="h-3 bg-gray-100 rounded w-3/4 mb-1.5" />
        <div className="h-2 bg-gray-50 rounded w-1/2" />
      </div>
    </div>
  );
}

/* ─── Main landing page ───────────────────────────────────────── */
export default function LandingPage({ portfolioItems }: LandingPageProps) {
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
          <Suspense fallback={<div className="flex-1 flex items-center justify-center"><div className="w-5 h-5 border-2 border-[#2D7D46] border-t-transparent rounded-full animate-spin" /></div>}>
            <ChatContainer initialMessage={initialMessage} chatToLoad={chatToLoad} />
          </Suspense>
        </div>
      </div>
    );
  }

  /* ── Landing mode ── */
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">

      {/* ── Hero: square chat widget ── */}
      <section className="flex justify-center items-start px-4 pt-6 pb-8">
        <div className="w-full max-w-[600px] aspect-square bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
          {/* Top: tagline */}
          <div className="px-7 pt-7 pb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              Tanyakan apapun<br />
              <span className="text-[#2D7D46]">tentang Gorontalo</span>
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              AI kami siap menjawab pertanyaan seputar wisata, budaya, kuliner, sejarah & berita lokal.
            </p>
          </div>

          {/* Middle: visual decoration */}
          <div className="flex-1 flex items-center justify-center px-7">
            <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
              {[
                { emoji: "🏖️", label: "Wisata" },
                { emoji: "🍜", label: "Kuliner" },
                { emoji: "🎨", label: "Budaya" },
                { emoji: "🏛️", label: "Sejarah" },
                { emoji: "📰", label: "Berita" },
                { emoji: "💼", label: "Ekonomi" },
              ].map(({ emoji, label }) => (
                <button
                  key={label}
                  onClick={() => handleHeroSend(`Ceritakan tentang ${label.toLowerCase()} di Gorontalo`)}
                  className="bg-gray-50 hover:bg-emerald-50 hover:border-[#2D7D46]/30 border border-gray-100 rounded-2xl p-3 flex flex-col items-center gap-1 transition-all group"
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-xs text-gray-500 group-hover:text-[#2D7D46] font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom: InputBar */}
          <div className="px-5 pb-5">
            <InputBar onSend={handleHeroSend} />
          </div>
        </div>
      </section>

      {/* ── What is Gorontalo Unite ── */}
      <section className="max-w-4xl mx-auto px-4 py-10 border-t border-gray-100">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <p className="text-xs font-semibold text-[#2D7D46] uppercase tracking-widest mb-2">Tentang Kami</p>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Apa itu Gorontalo Unite?</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Gorontalo Unite adalah platform digital yang memadukan kekuatan AI dengan kekayaan lokal Gorontalo.
              Kami hadir untuk menghubungkan masyarakat, wisatawan, dan pelaku usaha dengan informasi terkini,
              berita lokal, dan layanan digital berbasis teknologi.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2D7D46] hover:text-[#236137] transition-colors"
            >
              Selengkapnya
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="flex-shrink-0 grid grid-cols-2 gap-3">
            {[
              { emoji: "🤖", title: "AI Chatbot", desc: "Jawab pertanyaan Gorontalo" },
              { emoji: "✨", title: "Good News", desc: "Berita positif lokal" },
              { emoji: "🛍️", title: "Affiliate", desc: "Produk & layanan lokal" },
              { emoji: "🌿", title: "Portofolio", desc: "Karya & proyek kami" },
            ].map((f) => (
              <div key={f.title} className="bg-white border border-gray-100 rounded-2xl p-4 w-36">
                <span className="text-2xl">{f.emoji}</span>
                <p className="text-xs font-semibold text-gray-800 mt-2">{f.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio grid ── */}
      <section className="max-w-6xl mx-auto px-4 py-10 border-t border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold text-[#2D7D46] uppercase tracking-widest mb-1">Portofolio</p>
            <h2 className="text-xl font-bold text-gray-900">Karya & Proyek Kami</h2>
          </div>
          <Link
            href="/portfolio"
            className="text-sm font-medium text-[#2D7D46] hover:text-[#236137] flex items-center gap-1 transition-colors"
          >
            Lihat semua
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {portfolioItems.length > 0
            ? portfolioItems.slice(0, 8).map((item) => <PortfolioCard key={item.id} item={item} />)
            : Array.from({ length: 8 }).map((_, i) => <PlaceholderCard key={i} index={i} />)
          }
        </div>

        {portfolioItems.length === 0 && (
          <p className="text-center text-xs text-gray-400 mt-4">
            Portofolio sedang disiapkan — pantau terus ya!
          </p>
        )}
      </section>

      <Footer />
    </div>
  );
}
