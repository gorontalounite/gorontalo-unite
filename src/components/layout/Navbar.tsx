"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [["Home", "/"], ["Blog", "/berita"], ["City Guide", "/wisata"], ["Event", "/event"], ["About", "/about"]] as const;
export default function Navbar() {
  const pathname = usePathname(); const [open, setOpen] = useState(false);
  if (["/admin", "/sign-in", "/sign-up", "/auth"].some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) return null;
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-[#dedede] bg-[#f5f5f3]/95 backdrop-blur"><nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10"><div className="hidden gap-5 lg:flex">{links.slice(0, 2).map(([label, href]) => <Link key={label} href={href} className="text-xs font-semibold text-[#2f2f2f]">{label}</Link>)}</div><Link href="/" className="font-serif text-2xl font-bold tracking-tight">Gorontalo <span className="text-[#f0bf75]">Unite</span></Link><div className="hidden items-center gap-4 lg:flex"><Link href="/berita" className="text-xs text-[#868686]">Search</Link><Link href="/about#newsletter" className="rounded-full bg-[#2f2f2f] px-4 py-2 text-xs font-bold text-white">Subscribe</Link></div><button onClick={() => setOpen(!open)} className="grid size-8 place-items-center rounded-full border border-[#dedede] lg:hidden" aria-label="Menu">{open ? "×" : "≡"}</button></nav>{open ? <div className="border-t border-[#dedede] bg-[#f5f5f3] px-5 py-4 lg:hidden">{links.map(([label, href]) => <Link onClick={() => setOpen(false)} key={label} href={href} className="block border-b border-[#dedede] py-3 text-sm font-semibold">{label}</Link>)}</div> : null}</header>;
}
