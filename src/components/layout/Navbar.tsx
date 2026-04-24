"use client";

import { useState } from "react";
import Link from "next/link";
import LeftDrawer from "./LeftDrawer";
import RightPanel from "./RightPanel";

export default function Navbar() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <>
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">

          {/* Left: Hamburger */}
          <button
            onClick={() => setLeftOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Buka menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Center: Text logo */}
          <Link href="/" className="flex items-center gap-0.5 select-none">
            <span className="text-base font-bold tracking-tight text-gray-900">Gorontalo</span>
            <span className="text-base font-bold tracking-tight text-[#2D7D46]">&nbsp;Unite</span>
          </Link>

          {/* Right: Menu icon */}
          <button
            onClick={() => setRightOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Buka panel"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      <LeftDrawer open={leftOpen} onClose={() => setLeftOpen(false)} />
      <RightPanel open={rightOpen} onClose={() => setRightOpen(false)} />
    </>
  );
}
