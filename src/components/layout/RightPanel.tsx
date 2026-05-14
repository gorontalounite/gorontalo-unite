"use client";

import Link from "next/link";
import { useState } from "react";

interface RightPanelProps {
  open: boolean;
  onClose: () => void;
}

const jelajahiItems = [
  {
    href: "/wisata",
    label: "Wisata",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: "/bisnis",
    label: "Bisnis",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    href: "/daerah",
    label: "Daerah",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    href: "/event",
    label: "Event",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const wisataSubKategori = [
  "Culinary", "Culture", "Eco", "Adventure",
  "Religius", "Ethnic", "Recreation", "City", "Agro", "Maritim",
];

const kabarBaikItems = [
  {
    href: "/inspire",
    label: "Inspire",
    desc: "Kisah inspiratif Gorontalo",
    icon: (
      <svg className="w-5 h-5 text-[#2D7D46]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    href: "/insight",
    label: "Insight",
    desc: "Wawasan & analisis",
    icon: (
      <svg className="w-5 h-5 text-[#2D7D46]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/interest",
    label: "Interest",
    desc: "Topik menarik pilihan",
    icon: (
      <svg className="w-5 h-5 text-[#2D7D46]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

const lainnyaItems = [
  { href: "/lifestyle", label: "Lifestyle" },
  { href: "/event", label: "Event" },
  { href: "/properti", label: "Properti" },
  { href: "/community", label: "Community" },
  { href: "/ekonomi-bisnis", label: "Ekonomi & Bisnis" },
  { href: "/technology", label: "Technology" },
  { href: "/sport", label: "Sport" },
  { href: "/automotive", label: "Automotive" },
  { href: "/food", label: "Food" },
  { href: "/travel", label: "Travel" },
  { href: "/affiliate", label: "Affiliate" },
];

const aboutUsItems = [
  {
    href: "/partnership",
    label: "Partnership",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: "/about",
    label: "Informasi Perusahaan",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: "/client",
    label: "Client & Portofolio",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    href: "/kontak",
    label: "Kontak",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    href: "/karir",
    label: "Karir",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/pedoman-media-siber",
    label: "Pedoman Media Siber",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    href: "/privacy-policy",
    label: "Privacy Policy",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    href: "/terms",
    label: "Term & Conditions",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

export default function RightPanel({ open, onClose }: RightPanelProps) {
  const [lainnyaOpen, setLainnyaOpen] = useState(false);
  const [aboutUsOpen, setAboutUsOpen] = useState(false);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-zinc-950 z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-zinc-800">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Web Category</span>
          <div className="w-8" />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pb-6">

          {/* ── JELAJAHI GORONTALO ── */}
          <div className="px-4 pt-5 pb-3">
            <p className="text-[11px] font-semibold tracking-widest text-gray-400 dark:text-zinc-500 uppercase mb-3">
              Jelajahi Gorontalo
            </p>
            <div className="grid grid-cols-2 gap-2">
              {jelajahiItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl bg-gray-50 dark:bg-zinc-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-[#2D7D46] dark:hover:text-emerald-400 text-gray-600 dark:text-gray-400 transition-colors"
                >
                  {item.icon}
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mx-4 border-t border-gray-100 dark:border-zinc-800" />

          {/* ── KABAR BAIK ── */}
          <div className="px-4 pt-4 pb-3">
            <p className="text-[11px] font-semibold tracking-widest text-gray-400 dark:text-zinc-500 uppercase mb-2">
              Kabar Baik
            </p>
            <div className="space-y-0.5">
              {kabarBaikItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors group"
                >
                  <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100 group-hover:text-[#2D7D46] dark:group-hover:text-emerald-400 transition-colors">
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-zinc-500 truncate">{item.desc}</p>
                  </div>
                </Link>
              ))}

              {/* Lainnya collapse */}
              <div>
                <button
                  onClick={() => setLainnyaOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Lainnya</span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${lainnyaOpen ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {lainnyaOpen && (
                  <div className="pl-4 mt-0.5 space-y-0.5">
                    {lainnyaItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className="block px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-[#2D7D46] dark:hover:text-emerald-400 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mx-4 border-t border-gray-100 dark:border-zinc-800" />

          {/* ── ABOUT US (collapse) ── */}
          <div className="px-4 pt-4">
            <button
              onClick={() => setAboutUsOpen((v) => !v)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
            >
              <span className="text-[11px] font-semibold tracking-widest text-gray-400 dark:text-zinc-500 uppercase">
                About Us — Gorontalo Unite
              </span>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${aboutUsOpen ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {aboutUsOpen && (
              <div className="mt-0.5 space-y-0.5">
                {aboutUsItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    <span className="text-gray-400 dark:text-zinc-500">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
