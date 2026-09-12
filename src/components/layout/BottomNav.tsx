"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/",
    label: "Home",
    icon: (active: boolean) => (
      <svg
        className={`w-6 h-6 ${active ? "text-brand dark:text-yellow-400" : "text-gray-500 dark:text-gray-400"}`}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.5}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/city-guide",
    label: "City Guide",
    icon: (active: boolean) => (
      <svg
        className={`w-6 h-6 ${active ? "text-brand dark:text-yellow-400" : "text-gray-500 dark:text-gray-400"}`}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.5}
          d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      </svg>
    ),
  },
  {
    href: "/reels",
    label: "Reels",
    icon: (active: boolean) => (
      <svg
        className={`w-6 h-6 ${active ? "text-brand dark:text-yellow-400" : "text-gray-500 dark:text-gray-400"}`}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.5}
          d="M15.75 5.25 18 3m0 0 2.25 2.25M18 3v5.25M8.25 5.25 6 3M6 3 3.75 5.25M6 3v5.25M9.75 9.75v4.5l4-2.25-4-2.25ZM5.25 21h13.5A2.25 2.25 0 0 0 21 18.75v-7.5A2.25 2.25 0 0 0 18.75 9H5.25A2.25 2.25 0 0 0 3 11.25v7.5A2.25 2.25 0 0 0 5.25 21Z" />
      </svg>
    ),
  },
  {
    // Took the slot the chatbot-era profile shortcut used to hold. The profile
    // page itself is still at /profile, reached from the header menu.
    href: "/event",
    label: "Event",
    icon: (active: boolean) => (
      <svg
        className={`w-6 h-6 ${active ? "text-brand dark:text-yellow-400" : "text-gray-500 dark:text-gray-400"}`}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.5}
          d="M8 3v3M16 3v3M4 9h16M5 6h14a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1z" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-t border-gray-100 dark:border-zinc-800 md:hidden">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2 pb-safe">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 flex-1 py-2"
            >
              {item.icon(active)}
              <span className={`text-[10px] font-medium ${active ? "text-brand dark:text-yellow-400" : "text-gray-500 dark:text-gray-400"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
