"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import RightPanel from "./RightPanel";
import ThemeToggle from "./ThemeToggle";
import NavSearch from "./NavSearch";
import { HEADER_NAV } from "./navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-30 border-b border-gray-100 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-8">
          {/* Brand */}
          <Link href="/" className="flex shrink-0 select-none items-center gap-2.5">
            <Image src="/logo.png" alt="" width={120} height={32} className="h-8 w-auto object-contain" priority />
            <span className="font-display text-lg leading-none tracking-[.01em] text-gray-900 dark:text-white">
              Gorontalo Unite
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Navigasi utama" className="hidden items-center gap-1 md:flex">
            {HEADER_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          </div>

          {/* Search + theme + menu */}
          <div className="flex items-center gap-1">
            <NavSearch />
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800"
              aria-label="Buka menu"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <RightPanel open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
