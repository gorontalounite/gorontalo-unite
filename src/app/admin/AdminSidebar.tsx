"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/admin",                  icon: "⊞",  label: "Dashboard",     exact: true },
  { href: "/admin/news",             icon: "📰", label: "News" },
  { href: "/admin/reels",            icon: "▶",  label: "Reels" },
  { href: "/admin/wisata",           icon: "🧭", label: "City Guide" },
  { href: "/admin/event",            icon: "📅", label: "Event" },
  { href: "/admin/users",            icon: "👥", label: "Pengguna" },
];

interface Props {
  fullName: string | null;
  role: string;
}

export default function AdminSidebar({ fullName, role }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <button type="button" aria-label="Buka navigasi admin" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)} className="fixed left-4 top-24 z-30 rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm lg:hidden">☰</button>
      {mobileOpen && <button type="button" aria-label="Tutup navigasi admin" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/30 lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-gray-100 bg-white shadow-xl transition-transform duration-200 ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:z-auto lg:h-auto lg:translate-x-0 lg:shadow-none ${collapsed ? "lg:w-16" : "lg:w-56"}`}>
      {/* Brand */}
      <div className="relative border-b border-gray-100 px-4 py-4">
        <button type="button" onClick={() => setMobileOpen(false)} className="absolute right-3 top-3 rounded p-1 text-gray-400 hover:bg-gray-100 lg:hidden" aria-label="Tutup navigasi">✕</button>
        <p className={`mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 ${collapsed ? "lg:hidden" : ""}`}>
          Admin Panel
        </p>
        <div className={`flex items-center gap-2.5 ${collapsed ? "lg:justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">
              {(fullName?.[0] ?? "A").toUpperCase()}
            </span>
          </div>
          <div className={`min-w-0 ${collapsed ? "lg:hidden" : ""}`}>
            <p className="text-sm font-semibold text-gray-900 truncate">{fullName ?? "Admin"}</p>
            <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded-md font-semibold uppercase tracking-wide ${
              role === "admin" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
            }`}>
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
        {navItems.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors ${collapsed ? "lg:justify-center" : ""} ${
                active
                  ? "bg-amber-50 text-amber-700 font-semibold"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className="text-base w-5 text-center leading-none flex-shrink-0">{item.icon}</span>
              <span className={collapsed ? "lg:hidden" : ""}>{item.label}</span>
              {active && <span className={`ml-auto h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400 ${collapsed ? "lg:hidden" : ""}`} />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-100 p-2">
        <button type="button" onClick={() => setCollapsed((value) => !value)} className="mb-1 hidden w-full items-center justify-center rounded-xl px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-700 lg:flex" aria-label={collapsed ? "Bentangkan navigasi" : "Ciutkan navigasi"} title={collapsed ? "Bentangkan navigasi" : "Ciutkan navigasi"}>{collapsed ? "→" : "← Ciutkan"}</button>
        <Link
          href="/"
          className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-700 ${collapsed ? "lg:justify-center" : ""}`}
          title={collapsed ? "Kembali ke Situs" : undefined}
        >
          <span className="text-base w-5 text-center leading-none">←</span>
          <span className={collapsed ? "lg:hidden" : ""}>Kembali ke Situs</span>
        </Link>
      </div>
      </aside>
    </>
  );
}
