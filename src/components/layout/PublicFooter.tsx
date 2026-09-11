"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRIMARY_NAV, CHANNELS, ABOUT_LINKS, LEGAL_LINKS, type NavLink } from "./navigation";

const hiddenPrefixes = ["/admin", "/sign-in", "/sign-up", "/auth"];

function FooterColumn({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-900 dark:text-white">{title}</p>
      <ul className="space-y-2.5">
        {links.map(({ label, href }) => <li key={href}><Link href={href} className="text-sm text-gray-600 transition-colors hover:text-brand dark:text-gray-400 dark:hover:text-yellow-400">{label}</Link></li>)}
      </ul>
    </div>
  );
}

export default function PublicFooter() {
  const pathname = usePathname();
  if (hiddenPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) return null;

  return (
    <footer className="relative shrink-0 border-t border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-6 lg:gap-10">
          <div className="col-span-2">
            <p className="mb-2 text-base font-bold text-gray-900 dark:text-white">Gorontalo Unite</p>
            <p className="max-w-xs text-sm leading-relaxed text-gray-600 dark:text-gray-400">Independent local media covering the stories, people, culture, and life of Gorontalo.</p>
          </div>
          <FooterColumn title="Explore" links={PRIMARY_NAV} />
          <FooterColumn title="Kanal" links={CHANNELS} />
          <FooterColumn title="About" links={ABOUT_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>
        <div className="flex flex-col items-start justify-between gap-3 border-t border-gray-200 pt-6 text-xs text-gray-500 dark:border-zinc-800 dark:text-gray-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Gorontalo Unite. All rights reserved.</p>
          <p>Made with ♥ for Gorontalo</p>
        </div>
      </div>
    </footer>
  );
}
