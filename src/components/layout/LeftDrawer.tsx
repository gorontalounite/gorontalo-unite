"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useState } from "react";
import { PRIMARY_NAV, CHANNELS, ABOUT_LINKS, type NavLink } from "./navigation";

interface LeftDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function LeftDrawer({ open, onClose }: LeftDrawerProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    onClose();
    router.push("/");
    router.refresh();
  }

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || null;
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-[19rem] max-w-[86vw] flex-col border-r border-gray-100 bg-white transition-[transform,visibility] duration-200 dark:border-zinc-800 dark:bg-zinc-950 ${open ? "visible translate-x-0" : "invisible -translate-x-full"}`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-zinc-800">
          <Link href="/" onClick={onClose} className="flex items-center select-none">
            <Image src="/logo.png" alt="Gorontalo Unite" width={120} height={32} className="h-8 w-auto object-contain" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup menu"
            className="grid h-9 w-9 place-items-center rounded-xl text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-900"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <Group title="Jelajahi">
            {PRIMARY_NAV.map((item) => <DrawerLink key={item.href} item={item} onClose={onClose} />)}
          </Group>

          <Group title="Kanal">
            {CHANNELS.map((item) => <DrawerLink key={item.href} item={item} onClose={onClose} />)}
          </Group>

          <Group title="Tentang">
            {ABOUT_LINKS.map((item) => <DrawerLink key={item.href} item={item} onClose={onClose} />)}
          </Group>
        </nav>

        <div className="border-t border-gray-100 px-3 py-3 dark:border-zinc-800">
          {user ? (
            <>
              <Link
                href="/profile"
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-900"
              >
                {avatarUrl ? (
                  <Image src={avatarUrl} alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" unoptimized />
                ) : (
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-amber-100 text-sm font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                    {(displayName ?? "G").charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-gray-900 dark:text-white">{displayName}</span>
                  <span className="block truncate text-xs text-gray-500 dark:text-zinc-400">Lihat profil</span>
                </span>
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-zinc-900"
              >
                <svg className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Keluar
              </button>
            </>
          ) : (
            <Link
              href="/sign-in"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-amber-300 dark:text-zinc-950 dark:hover:bg-amber-200"
            >
              Masuk
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-[.14em] text-gray-400 dark:text-zinc-500">{title}</p>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function DrawerLink({ item, onClose }: { item: NavLink; onClose: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onClose}
      className="block rounded-xl px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-zinc-900"
    >
      {item.label}
    </Link>
  );
}
