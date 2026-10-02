import type { Metadata } from "next";
import Link from "next/link";
import { PAGE_TITLE_CLASS } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

const SHORTCUTS = [
  { href: "/",             label: "Home" },
  { href: "/city-guide",   label: "City Guide" },
  { href: "/event",        label: "Event" },
  { href: "/category/regional", label: "Regional" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
      <span className="font-heading text-[80px] font-bold leading-none text-[#FFCC00] dark:text-[#FFCC00] sm:text-[110px]">
        404
      </span>
      <h1 className={`${PAGE_TITLE_CLASS} mt-4 text-gray-900 dark:text-white`}>
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        The page you are looking for may have moved, been removed, or the address has a typo.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#FFCC00] px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#FFCC00]"
      >
        ← Back to Home
      </Link>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        {SHORTCUTS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-xs font-medium text-gray-400 hover-brand dark:text-gray-500"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
