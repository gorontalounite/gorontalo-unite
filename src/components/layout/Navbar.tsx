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

          {/* Left: Chat icon */}
          <button
            onClick={() => setLeftOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Buka menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>

          {/* Center: Text logo */}
          <Link href="/" className="flex items-center gap-0.5 select-none">
            <span className="text-base font-bold tracking-tight text-gray-900">Gorontalo</span>
            <span className="text-base font-bold tracking-tight text-[#2D7D46]">&nbsp;Unite</span>
          </Link>

          {/* Right: Book/Read icon */}
          <button
            onClick={() => setRightOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Buka panel berita"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </button>
        </div>
      </nav>

      <LeftDrawer open={leftOpen} onClose={() => setLeftOpen(false)} />
      <RightPanel open={rightOpen} onClose={() => setRightOpen(false)} />
    </>
  );
}
