"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LeftDrawer from "./LeftDrawer";
import RightPanel from "./RightPanel";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <>
      <div className="hidden bg-black px-4 py-2 text-center text-[10px] font-bold tracking-[0.15em] text-[#f5c400] sm:block">
        GORONTALO UNITE — MEDIA, CITY GUIDE, DAN CERITA BAIK DARI GORONTALO
      </div>
      <nav className="sticky top-0 z-30 border-b border-black/10 bg-[#f8f6f0]/95 backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLeftOpen(true)}
              className="flex h-9 w-9 items-center justify-center text-gray-700 transition-colors hover:bg-black hover:text-[#f5c400] dark:text-gray-300 dark:hover:bg-white dark:hover:text-black"
              aria-label="Buka menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/" className="flex items-center select-none">
              <Image src="/logo.png" alt="Gorontalo Unite" width={120} height={32} className="h-8 w-auto object-contain" priority />
            </Link>
          </div>

          <div className="hidden items-center gap-7 text-sm font-semibold text-[#202020] lg:flex dark:text-white">
            <Link href="/berita" className="transition hover:text-[#8f6900] dark:hover:text-[#f5c400]">Berita</Link>
            <Link href="/wisata" className="transition hover:text-[#8f6900] dark:hover:text-[#f5c400]">City Guide</Link>
            <Link href="/event" className="transition hover:text-[#8f6900] dark:hover:text-[#f5c400]">Event</Link>
            <Link href="/berita/inspire" className="transition hover:text-[#8f6900] dark:hover:text-[#f5c400]">Kabar Baik</Link>
          </div>

          {/* Right: Login + Theme + navigation drawer */}
          <div className="flex items-center gap-1">
            <Link href="/chat" className="hidden bg-[#f5c400] px-3 py-2 text-xs font-bold text-black transition hover:bg-black hover:text-white sm:inline-flex">
              Tanya AI
            </Link>
            <Link
              href="/sign-in"
              className="flex h-9 w-9 items-center justify-center text-gray-600 transition-colors hover:bg-black hover:text-[#f5c400] dark:text-gray-400 dark:hover:bg-white dark:hover:text-black"
              aria-label="Login"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </Link>
            <ThemeToggle />
            <button
              onClick={() => setRightOpen(true)}
              className="flex h-9 w-9 items-center justify-center text-gray-600 transition-colors hover:bg-black hover:text-[#f5c400] dark:text-gray-400 dark:hover:bg-white dark:hover:text-black"
              aria-label="Buka panel kategori"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <LeftDrawer open={leftOpen} onClose={() => setLeftOpen(false)} />
      <RightPanel open={rightOpen} onClose={() => setRightOpen(false)} />
    </>
  );
}
