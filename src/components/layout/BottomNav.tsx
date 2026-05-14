"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/",
    label: "Home",
    icon: (active: boolean) => (
      <svg
        className={`w-6 h-6 ${active ? "text-[#2D7D46] dark:text-emerald-400" : "text-gray-500 dark:text-gray-400"}`}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.5}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/blog",
    label: "Blog",
    icon: (active: boolean) => (
      <svg
        className={`w-6 h-6 ${active ? "text-[#2D7D46] dark:text-emerald-400" : "text-gray-500 dark:text-gray-400"}`}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.5}
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  {
    href: "/product",
    label: "Product",
    icon: (active: boolean) => (
      <svg
        className={`w-6 h-6 ${active ? "text-[#2D7D46] dark:text-emerald-400" : "text-gray-500 dark:text-gray-400"}`}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.5}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    href: "/profile",
    label: "Profile",
    icon: (active: boolean) => (
      <svg
        className={`w-6 h-6 ${active ? "text-[#2D7D46] dark:text-emerald-400" : "text-gray-500 dark:text-gray-400"}`}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.5}
          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
              <span className={`text-[10px] font-medium ${active ? "text-[#2D7D46] dark:text-emerald-400" : "text-gray-500 dark:text-gray-400"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
