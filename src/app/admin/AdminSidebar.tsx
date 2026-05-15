"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin",                  icon: "⊞",  label: "Dashboard",     exact: true },
  { href: "/admin/news",             icon: "📰", label: "Konten" },
  { href: "/admin/portfolio",        icon: "🌿", label: "Portofolio" },
  { href: "/admin/affiliate",        icon: "🛍️", label: "Affiliate" },
  { href: "/admin/knowledge-base",   icon: "🧠", label: "RAG / KB" },
  { href: "/admin/users",            icon: "👥", label: "Pengguna" },
];

interface Props {
  fullName: string | null;
  role: string;
}

export default function AdminSidebar({ fullName, role }: Props) {
  const pathname = usePathname();

  return (
    <aside className="w-56 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col">
      {/* Brand */}
      <div className="px-4 py-4 border-b border-gray-100">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
          Admin Panel
        </p>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">
              {(fullName?.[0] ?? "A").toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
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
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 text-sm rounded-xl transition-colors ${
                active
                  ? "bg-amber-50 text-amber-700 font-semibold"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className="text-base w-5 text-center leading-none flex-shrink-0">{item.icon}</span>
              {item.label}
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-gray-100">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
        >
          <span className="text-base w-5 text-center leading-none">←</span>
          Kembali ke Situs
        </Link>
      </div>
    </aside>
  );
}
