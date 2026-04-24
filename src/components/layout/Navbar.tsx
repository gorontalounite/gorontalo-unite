"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/chat", label: "Chat" },
  { href: "/good-news", label: "Good News" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About Us" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      setUser(user);
      if (user) {
        const { data } = await supabase
          .from("user_profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        setIsAdmin(data?.role === "admin" || data?.role === "editor");
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) setIsAdmin(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-[#2D7D46] to-[#1a5c33] rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">GU</span>
            </div>
            <span className="font-bold text-gray-900 text-sm hidden sm:inline">
              Gorontalo <span className="text-[#2D7D46]">Unite</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-[#2D7D46]/10 text-[#2D7D46]"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin/articles"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith("/admin")
                    ? "bg-amber-100 text-amber-700"
                    : "text-amber-600 hover:bg-amber-50"
                }`}
              >
                Admin
              </Link>
            )}
          </div>

          {/* Right: Auth */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 transition-colors"
                >
                  <div className="w-5 h-5 bg-[#2D7D46] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {(user.email ?? "U")[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:inline max-w-24 truncate text-xs">
                    {user.email}
                  </span>
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50">
                    {isAdmin && (
                      <Link
                        href="/admin/articles"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-xs text-amber-700 hover:bg-amber-50 font-medium"
                      >
                        🛠 Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => { setUserMenuOpen(false); handleLogout(); }}
                      className="w-full text-left px-4 py-2 text-xs text-red-500 hover:bg-red-50"
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/sign-in"
                className="text-sm font-medium text-white bg-[#2D7D46] px-3 py-1.5 rounded-xl hover:bg-[#236137] transition-colors"
              >
                Masuk
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-[#2D7D46]/10 text-[#2D7D46]"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin/articles" onClick={() => setMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-amber-600 hover:bg-amber-50">
              🛠 Admin Dashboard
            </Link>
          )}
          {user && (
            <button onClick={handleLogout}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50">
              Keluar
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
