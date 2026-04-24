"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface RecentChat {
  id: string;
  title: string;
  created_at: string;
}

interface LeftDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function LeftDrawer({ open, onClose }: LeftDrawerProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [recentChats, setRecentChats] = useState<RecentChat[]>([]);
  const [loadingChats, setLoadingChats] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Load recent chats when user is logged in
  useEffect(() => {
    if (!user || !open) return;
    setLoadingChats(true);
    const supabase = createClient();
    supabase
      .from("conversations")
      .select("id, user_message, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)
      .then(({ data }) => {
        if (data) {
          setRecentChats(
            data.map((c) => ({
              id: c.id,
              title: c.user_message.length > 50
                ? c.user_message.slice(0, 50) + "…"
                : c.user_message,
              created_at: c.created_at,
            }))
          );
        }
        setLoadingChats(false);
      });
  }, [user, open]);

  const handleNewChat = () => {
    window.dispatchEvent(new Event("new-chat"));
    onClose();
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setRecentChats([]);
    onClose();
    router.push("/");
    router.refresh();
  };

  const avatarLetter = user?.user_metadata?.full_name?.[0]?.toUpperCase()
    ?? user?.email?.[0]?.toUpperCase()
    ?? "G";

  const displayName = user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "";
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-700">Menu</span>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Profile section */}
        {user ? (
          <div className="px-4 py-4 flex items-center gap-3">
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName} className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
            ) : (
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2D7D46] to-[#1a5c33] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-base font-bold">{avatarLetter}</span>
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{displayName}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
        ) : (
          <div className="px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Tamu</p>
                <p className="text-xs text-gray-400">Belum masuk</p>
              </div>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="mx-4 border-t border-gray-100" />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {/* New Chat */}
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#2D7D46] bg-emerald-50 hover:bg-emerald-100 transition-colors"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Chat Baru
          </button>

          {/* Recent Chats */}
          {user && (
            <div className="pt-2">
              <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide px-3 mb-1.5">
                Percakapan Terbaru
              </p>
              {loadingChats ? (
                <div className="flex justify-center py-4">
                  <div className="w-4 h-4 border-2 border-[#2D7D46] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : recentChats.length > 0 ? (
                <div className="space-y-0.5">
                  {recentChats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={onClose}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-start gap-2"
                    >
                      <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="leading-snug line-clamp-2">{chat.title}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 px-3 py-2">Belum ada percakapan</p>
              )}
            </div>
          )}
        </div>

        {/* Bottom: login/logout */}
        <div className="px-3 py-3 border-t border-gray-100">
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Keluar
            </button>
          ) : (
            <Link
              href="/sign-in"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white bg-[#2D7D46] hover:bg-[#236137] transition-colors"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Masuk / Daftar
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
