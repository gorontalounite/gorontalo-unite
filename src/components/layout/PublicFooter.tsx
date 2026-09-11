"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  HEADER_NAV, CHANNELS, LEGAL_LINKS, SOCIAL_LINKS, UTILITY_LINKS, type NavLink,
} from "./navigation";

const hiddenPrefixes = ["/admin", "/sign-in", "/sign-up", "/auth"];

function FooterColumn({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div>
      <p className="mb-4 font-display text-[22px] leading-tight text-gray-900 dark:text-white">{title}</p>
      <ul className="space-y-3">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-[13px] font-semibold uppercase tracking-[.08em] text-gray-600 transition-colors hover:text-brand dark:text-gray-400 dark:hover:text-yellow-400"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PublicFooter() {
  const pathname = usePathname();
  if (hiddenPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) return null;

  return (
    <footer className="relative shrink-0 border-t border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Image src="/logo.png" alt="" width={120} height={32} className="h-9 w-auto object-contain" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Independent local media covering the stories, people, culture, and life of Gorontalo.
            </p>
          </div>

          <FooterColumn title="Quick Link" links={HEADER_NAV} />
          <FooterColumn title="Top Categories" links={CHANNELS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-6 dark:border-zinc-800">
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Follow Us</span>
            <span aria-hidden="true" className="h-4 w-px bg-gray-300 dark:bg-zinc-700" />
            <ul className="flex items-center gap-1">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid h-9 w-9 place-items-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 hover:text-brand dark:text-gray-300 dark:hover:bg-zinc-900 dark:hover:text-yellow-400"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px]">
                      <path d={social.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-gray-200 pt-6 text-xs text-gray-500 dark:border-zinc-800 dark:text-gray-500 sm:flex-row-reverse sm:items-center">
          <p>© {new Date().getFullYear()} Gorontalo Unite. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {UTILITY_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="font-semibold text-gray-700 transition-colors hover:text-brand dark:text-gray-300 dark:hover:text-yellow-400">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
