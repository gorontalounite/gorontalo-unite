"use client";

import Link from "next/link";
import { useState } from "react";

const links = [["Home", "/"], ["Blog", "/blog"], ["Podcast", "/podcast"], ["About", "/about"]] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-[#dedede] bg-[#f7f7f5]/95 text-[#2f2f2f] backdrop-blur"><nav className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12"><Link href="/" className="font-serif text-2xl leading-none tracking-[-.04em] sm:text-3xl">Gorontalo Unite</Link><div className="hidden items-center gap-7 md:flex">{links.map(([label, href]) => <Link key={label} href={href} className="text-xs font-semibold transition hover:text-[#8a6b3f]">{label}</Link>)}<span className="text-sm text-[#777]">⌕</span><button type="button" className="rounded-full bg-[#2f2f2f] px-5 py-2.5 text-xs font-bold text-white">Subscribe</button></div><button type="button" onClick={() => setOpen((value) => !value)} className="grid size-9 place-items-center rounded-full border border-[#2f2f2f] text-lg md:hidden" aria-label="Toggle menu">{open ? "×" : "≡"}</button></nav>{open ? <div className="border-t border-[#dedede] bg-[#f7f7f5] px-5 pb-5 md:hidden">{links.map(([label, href]) => <Link onClick={() => setOpen(false)} key={label} href={href} className="block border-b border-[#dedede] py-4 text-sm font-semibold">{label}</Link>)}<button type="button" className="mt-5 w-full rounded-full bg-[#2f2f2f] px-5 py-3 text-xs font-bold text-white">Subscribe</button></div> : null}</header>;
}
