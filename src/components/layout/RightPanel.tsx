"use client";

import Link from "next/link";
import { CHANNELS } from "./navigation";

interface RightPanelProps {
  open: boolean;
  onClose: () => void;
}

const cityGuideItems = [
  {
    href: "/city-guide",
    label: "City Guide",
    description: "Direktori tempat pilihan",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: "/event",
    label: "Event",
    description: "Agenda seru di Gorontalo",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const kabarBaikItems = [
  {
    href: "/category/inspire",
    label: "Inspire",
    desc: "Kisah inspiratif Gorontalo",
    icon: (
      <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    href: "/category/insight",
    label: "Insight",
    desc: "Wawasan & analisis",
    icon: (
      <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/category/interest",
    label: "Interest",
    desc: "Topik menarik pilihan",
    icon: (
      <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];


// Legal links shown below About Us (always visible)
const legalLinks = [
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
    href: "/pedoman-media-siber",
    label: "Pedoman Media Siber",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Menu</span>
          <div className="w-8" />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pb-6">

          {/* ── CITY GUIDE ── */}
          <div className="px-4 pt-5 pb-3">
            <p className="text-[11px] font-semibold tracking-widest text-gray-400 dark:text-zinc-500 uppercase mb-3">
              City Guide
            </p>
            <div className="grid grid-cols-2 gap-2">
              {cityGuideItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="group relative min-h-36 overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-amber-50 via-white to-gray-50 p-4 text-gray-700 transition hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-900/5 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 dark:text-gray-200"
                >
                  <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-amber-200/40 transition group-hover:scale-125 dark:bg-amber-400/10" />
                  <div className="relative flex h-full flex-col justify-between">
                    <span className="text-brand dark:text-yellow-400">{item.icon}</span>
                    <div>
                      <p className="text-sm font-semibold">{item.label}</p>
                      <p className="mt-1 text-[11px] leading-snug text-gray-400 dark:text-zinc-500">{item.description}</p>
                    </div>
                  </div>
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
                  <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-yellow-50 dark:bg-yellow-950/40 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100 group-hover:text-brand dark:group-hover:text-yellow-400 transition-colors">
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-zinc-500 truncate">{item.desc}</p>
                  </div>
                </Link>
              ))}

            </div>
          </div>

          <div className="mx-4 border-t border-gray-100 dark:border-zinc-800" />

          {/* ── KANAL EDITORIAL ── */}
          <div className="px-4 pt-4">
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-zinc-500">
              Kanal
            </p>
            <div className="flex flex-wrap gap-2 px-3">
              {CHANNELS.map((channel) => (
                <Link
                  key={channel.href}
                  href={channel.href}
                  onClick={onClose}
                  className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-brand hover:text-brand dark:border-zinc-700 dark:text-gray-300 dark:hover:border-yellow-400 dark:hover:text-yellow-400"
                >
                  {channel.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mx-4 mt-4 border-t border-gray-100 dark:border-zinc-800" />

          {/* ── ABOUT US (direct link) ── */}
          <div className="px-4 pt-4">
            <p className="text-[11px] font-semibold tracking-widest text-gray-400 dark:text-zinc-500 uppercase mb-2 px-3">
              About Us
            </p>
            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors group"
            >
              <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-yellow-50 dark:bg-yellow-950/40 flex items-center justify-center">
                <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100 group-hover:text-brand dark:group-hover:text-yellow-400 transition-colors">
                  Tentang Gorontalo Unite
                </p>
                <p className="text-xs text-gray-400 dark:text-zinc-500">Platform media hyperlokal Gorontalo</p>
              </div>
              <svg className="w-4 h-4 text-gray-300 dark:text-zinc-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* ── AKUN ── */}
          <div className="mx-4 mt-4 border-t border-gray-100 dark:border-zinc-800" />
          <div className="px-4 pt-4">
            <Link
              href="/profile"
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-900"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-yellow-50 dark:bg-yellow-950/40">
                <svg className="h-5 w-5 text-brand" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4 0-7 2-7 4.5V21h14v-2.5C19 16 16 14 12 14z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Akun</p>
                <p className="text-xs text-gray-400 dark:text-zinc-500">Masuk atau lihat profil</p>
              </div>
              <svg className="h-4 w-4 flex-shrink-0 text-gray-300 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* ── LEGAL LINKS (always visible) ── */}
          <div className="mx-4 mt-4 border-t border-gray-100 dark:border-zinc-800" />
          <div className="px-4 pt-3 pb-6 space-y-0.5">
            {legalLinks.map((item) => (
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
        </div>
      </div>
    </>
  );
}
