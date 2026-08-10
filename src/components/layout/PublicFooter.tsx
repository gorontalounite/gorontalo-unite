"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const hiddenPrefixes = ["/admin", "/sign-in", "/sign-up", "/auth"];

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white">{title}</p>
      <ul className="space-y-2.5">
        {links.map(([label, href]) => <li key={href}><Link href={href} className="text-sm text-stone-300 transition-colors hover:text-[#f5c400]">{label}</Link></li>)}
      </ul>
    </div>
  );
}

export default function PublicFooter() {
  const pathname = usePathname();
  if (hiddenPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) return null;

  return (
    <footer className="relative shrink-0 border-t border-stone-900 bg-stone-950 text-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-5 lg:gap-10">
          <div className="col-span-2">
            <p className="mb-2 text-base font-bold text-[#f5c400]">Gorontalo Unite</p>
            <p className="max-w-xs text-sm leading-relaxed text-stone-300">Media lokal Gorontalo untuk berita, City Guide, event, dan cerita baik yang patut dibagikan.</p>
          </div>
          <FooterColumn title="Jelajahi" links={[["Berita", "/berita"], ["Wisata", "/wisata"], ["Event", "/event"], ["Kabar Baik", "/berita/inspire"]]} />
          <FooterColumn title="Tentang" links={[["Tentang kami", "/about"], ["Kontak", "/about#kontak"], ["Media Kit", "/media-kit"]]} />
          <FooterColumn title="Legal" links={[["Privacy Policy", "/privacy-policy"], ["Terms", "/terms"], ["Pedoman Media", "/pedoman-media-siber"]]} />
        </div>
        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/15 pt-6 text-xs text-stone-400 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Gorontalo Unite. All rights reserved.</p>
          <p>Made with ♥ for Gorontalo</p>
        </div>
      </div>
    </footer>
  );
}
