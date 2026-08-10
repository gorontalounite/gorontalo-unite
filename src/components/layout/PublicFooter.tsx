"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PublicFooter() {
  const pathname = usePathname();
  if (["/admin", "/sign-in", "/sign-up", "/auth"].some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) return null;

  return <footer className="bg-black px-5 pb-8 pt-20 text-white md:px-10 md:pt-28 lg:px-16"><div className="mx-auto max-w-[1500px]"><p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#f4c300]">Gorontalo Unite Mediahub</p><h2 className="mt-5 max-w-6xl font-display text-[13vw] font-semibold uppercase leading-[.78] tracking-[-.07em] md:text-[9vw]">Untuk Gorontalo,<br /><span className="text-[#f4c300]">Kami Berbagi.</span></h2><div className="mt-20 grid gap-10 border-t border-white/20 py-8 md:grid-cols-[1.6fr_repeat(3,1fr)]"><p className="max-w-sm text-sm leading-relaxed text-white/60">Media lokal, City Guide, event, dan cerita baik yang bergerak bersama Gorontalo.</p><FooterColumn title="Jelajahi" links={[["Berita", "/berita"], ["City Guide", "/wisata"], ["Event", "/event"]]} /><FooterColumn title="Informasi" links={[["Tentang", "/about"], ["Kontak", "/about#kontak"], ["Pedoman Media", "/pedoman-media-siber"]]} /><FooterColumn title="Ikuti" links={[["Instagram", "https://instagram.com/gorontalo.unite"], ["Privacy Policy", "/privacy-policy"], ["Masuk", "/sign-in"]]} /></div><div className="flex flex-col gap-2 border-t border-white/20 pt-5 text-[10px] uppercase tracking-[.15em] text-white/45 md:flex-row md:justify-between"><p>© {new Date().getFullYear()} Gorontalo Unite</p><p>Gorontalo, Indonesia</p></div></div></footer>;
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return <div><p className="mb-4 text-[10px] font-bold uppercase tracking-[.2em] text-[#f4c300]">{title}</p><div className="grid gap-2">{links.map(([label, href]) => <Link key={label} href={href} className="text-sm text-white/70 transition hover:text-white">{label}</Link>)}</div></div>;
}
