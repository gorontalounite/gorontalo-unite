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
      <nav className="bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLeftOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800 transition-colors"
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

          {/* Right: Get Started + Theme + Book */}
          <div className="flex items-center gap-1">
            <Link
              href="/auth/login"
              className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Login"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </Link>
            <ThemeToggle />
            <button
              onClick={() => setRightOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800 transition-colors"
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
