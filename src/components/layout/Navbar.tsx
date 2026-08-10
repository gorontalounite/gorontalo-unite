"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const publicLinks = [
  ["Beranda", "/"],
  ["Berita", "/berita"],
  ["City Guide", "/wisata"],
  ["Event", "/event"],
  ["Untold Story", "/berita"],
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isApplication = ["/admin", "/sign-in", "/sign-up", "/auth"].some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  if (isApplication) return null;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-8 md:pt-7">
      <nav className="pointer-events-auto mx-auto flex max-w-[1500px] items-center justify-between rounded-2xl border border-white/25 bg-black/35 px-4 py-3 text-white shadow-2xl shadow-black/20 backdrop-blur-xl md:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Gorontalo Unite">
          <Image src="/logo-gu.png" alt="" width={38} height={38} className="size-8 object-contain md:size-9" priority />
          <span className="text-xs font-bold uppercase tracking-[.18em] sm:text-sm">Gorontalo Unite</span>
        </Link>
        <div className="hidden items-center gap-6 lg:flex">
          {publicLinks.map(([label, href]) => <Link key={label} href={href} className="text-[11px] font-medium uppercase tracking-[.15em] text-white/70 transition hover:text-[#f4c300]">{label}</Link>)}
        </div>
        <div className="flex items-center gap-2">
          <Link href="/sign-in" className="hidden rounded-full border border-white/30 px-4 py-2 text-[10px] font-bold uppercase tracking-[.16em] transition hover:bg-white hover:text-black sm:block">Masuk</Link>
          <button onClick={() => setOpen((value) => !value)} className="flex size-9 items-center justify-center rounded-full border border-white/30 text-white lg:hidden" aria-label="Buka navigasi" aria-expanded={open}>
            <span className="text-lg leading-none">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </nav>
      {open ? <div className="pointer-events-auto mx-auto mt-2 max-w-[1500px] rounded-2xl border border-white/20 bg-black/90 p-4 backdrop-blur-xl lg:hidden"><div className="grid gap-1">{publicLinks.map(([label, href]) => <Link onClick={() => setOpen(false)} key={label} href={href} className="rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[.12em] text-white transition hover:bg-white/10">{label}</Link>)}<Link onClick={() => setOpen(false)} href="/sign-in" className="rounded-xl bg-[#f4c300] px-4 py-3 text-sm font-semibold uppercase tracking-[.12em] text-black">Masuk</Link></div></div> : null}
    </header>
  );
}
