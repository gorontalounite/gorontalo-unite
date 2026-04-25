"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface RecentChat {
  id: string;
  user_message: string;
  ai_response: string;
  sources: { title: string; url: string | null; category: string }[];
  created_at: string;
}

interface LeftDrawerProps {
  open: boolean;
  onClose: () => void;
}

type DrawerView = "main" | "profile";

export default function LeftDrawer({ open, onClose }: LeftDrawerProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [recentChats, setRecentChats] = useState<RecentChat[]>([]);
  const [loadingChats, setLoadingChats] = useState(false);
  const [view, setView] = useState<DrawerView>("main");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Profile edit states
  const [editName, setEditName] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [prompt, setPrompt] = useState("");
  const [expandedField, setExpandedField] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        setEditName(user.user_metadata?.full_name ?? "");
        setInstructions(localStorage.getItem("gu_instructions") ?? "");
        setPrompt(localStorage.getItem("gu_prompt") ?? "");
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Load recent chats when drawer opens
  useEffect(() => {
    if (!user || !open) return;
    setLoadingChats(true);
    const supabase = createClient();
    supabase
      .from("conversations")
      .select("id, user_message, ai_response, sources, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(15)
      .then(({ data }) => {
        if (data) setRecentChats(data as RecentChat[]);
        setLoadingChats(false);
      });
  }, [user, open]);

  // Reset view on close
  useEffect(() => {
    if (!open) setTimeout(() => setView("main"), 300);
  }, [open]);

  const handleNewChat = () => {
    window.dispatchEvent(new Event("new-chat"));
    router.push("/");
    onClose();
  };

  const handleLoadChat = (chat: RecentChat) => {
    window.dispatchEvent(
      new CustomEvent("load-chat", {
        detail: {
          id: Date.now(),
          userMessage: chat.user_message,
          aiResponse: chat.ai_response,
          sources: (chat.sources as { title: string; url: string | null; category: string }[]) ?? [],
          timestamp: chat.created_at,
        },
      })
    );
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

  const handleDeleteChat = async (id: string) => {
    setDeletingId(id);
    const supabase = createClient();
    await supabase.from("conversations").delete().eq("id", id);
    setRecentChats((prev) => prev.filter((c) => c.id !== id));
    setPendingDeleteId(null);
    setDeletingId(null);
  };

  const handleSaveName = async () => {
    if (!editName.trim()) return;
    setSavingName(true);
    const supabase = createClient();
    await supabase.auth.updateUser({ data: { full_name: editName.trim() } });
    setSavingName(false);
    setExpandedField(null);
  };

  const handleSaveInstructions = () => {
    localStorage.setItem("gu_instructions", instructions);
    setExpandedField(null);
  };

  const handleSavePrompt = () => {
    localStorage.setItem("gu_prompt", prompt);
    setExpandedField(null);
  };

  const avatarLetter = user?.user_metadata?.full_name?.[0]?.toUpperCase()
    ?? user?.email?.[0]?.toUpperCase()
    ?? "G";
  const displayName = user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "Tamu";
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;

  // ─── PROFILE VIEW ────────────────────────────────────────────────────────────
  const ProfileView = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-100">
        <button
          onClick={() => setView("main")}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-gray-700">Profil & Pengaturan</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Avatar section */}
        <div className="flex flex-col items-center py-6 px-4 bg-gray-50 border-b border-gray-100">
          <div className="relative mb-3">
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName} className="w-20 h-20 rounded-full object-cover" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2D7D46] to-[#1a5c33] flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{avatarLetter}</span>
              </div>
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-xs text-[#2D7D46] font-medium hover:underline"
          >
            Ubah foto profil
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
          <p className="text-sm font-semibold text-gray-800 mt-2">{displayName}</p>
          <p className="text-xs text-gray-400">{user?.email}</p>
        </div>

        {/* Settings list */}
        <div className="px-3 py-3 space-y-0.5">

          {/* Nama */}
          <div className="rounded-xl overflow-hidden border border-gray-100">
            <button
              onClick={() => setExpandedField(expandedField === "name" ? null : "name")}
              className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium">Nama</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 max-w-[100px] truncate">{user?.user_metadata?.full_name ?? "—"}</span>
                <svg className={`w-3.5 h-3.5 text-gray-300 transition-transform ${expandedField === "name" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            {expandedField === "name" && (
              <div className="px-4 pb-3 bg-gray-50 border-t border-gray-100">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full mt-2 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#2D7D46] focus:ring-1 focus:ring-[#2D7D46]/20"
                  placeholder="Nama lengkap"
                />
                <button
                  onClick={handleSaveName}
                  disabled={savingName}
                  className="mt-2 text-xs bg-[#2D7D46] text-white px-4 py-1.5 rounded-lg hover:bg-[#236137] transition-colors disabled:opacity-50"
                >
                  {savingName ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="rounded-xl overflow-hidden border border-gray-100">
            <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-700">
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">Alamat Email</span>
              </div>
              <span className="text-xs text-gray-400 max-w-[120px] truncate">{user?.email ?? "—"}</span>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide px-1 mb-1.5">AI Preferences</p>
          </div>

          {/* Instruksi */}
          <div className="rounded-xl overflow-hidden border border-gray-100">
            <button
              onClick={() => setExpandedField(expandedField === "instructions" ? null : "instructions")}
              className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <div className="text-left">
                  <p className="font-medium">Instruksi</p>
                  <p className="text-[11px] text-gray-400">Atur gaya jawaban AI</p>
                </div>
              </div>
              <svg className={`w-3.5 h-3.5 text-gray-300 transition-transform ${expandedField === "instructions" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedField === "instructions" && (
              <div className="px-4 pb-3 bg-gray-50 border-t border-gray-100">
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={4}
                  className="w-full mt-2 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#2D7D46] focus:ring-1 focus:ring-[#2D7D46]/20 resize-none"
                  placeholder="Contoh: Jawab selalu dalam format poin-poin. Gunakan bahasa yang santai."
                />
                <button
                  onClick={handleSaveInstructions}
                  className="mt-2 text-xs bg-[#2D7D46] text-white px-4 py-1.5 rounded-lg hover:bg-[#236137] transition-colors"
                >
                  Simpan
                </button>
              </div>
            )}
          </div>

          {/* Prompt */}
          <div className="rounded-xl overflow-hidden border border-gray-100">
            <button
              onClick={() => setExpandedField(expandedField === "prompt" ? null : "prompt")}
              className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <div className="text-left">
                  <p className="font-medium">Prompt</p>
                  <p className="text-[11px] text-gray-400">Awalan otomatis tiap pertanyaan</p>
                </div>
              </div>
              <svg className={`w-3.5 h-3.5 text-gray-300 transition-transform ${expandedField === "prompt" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedField === "prompt" && (
              <div className="px-4 pb-3 bg-gray-50 border-t border-gray-100">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                  className="w-full mt-2 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#2D7D46] focus:ring-1 focus:ring-[#2D7D46]/20 resize-none"
                  placeholder="Contoh: Tolong jelaskan secara detail tentang..."
                />
                <button
                  onClick={handleSavePrompt}
                  className="mt-2 text-xs bg-[#2D7D46] text-white px-4 py-1.5 rounded-lg hover:bg-[#236137] transition-colors"
                >
                  Simpan
                </button>
              </div>
            )}
          </div>

          <div className="pt-2">
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide px-1 mb-1.5">Lainnya</p>
          </div>

          {/* Help Center */}
          <Link
            href="/about"
            onClick={onClose}
            className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-100 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Help Center</span>
            </div>
            <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );

  // ─── MAIN VIEW ───────────────────────────────────────────────────────────────
  const MainView = () => (
    <div className="flex flex-col h-full">
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
        <button
          onClick={() => setView("profile")}
          className="flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors text-left w-full"
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt={displayName} className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
          ) : (
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2D7D46] to-[#1a5c33] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-base font-bold">{avatarLetter}</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{displayName}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
          <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      ) : (
        <div className="px-4 py-4 flex items-center gap-3">
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
      )}

      <div className="mx-4 border-t border-gray-100" />

      {/* Scrollable area */}
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
                  <div key={chat.id} className="group relative">
                    {pendingDeleteId === chat.id ? (
                      /* Inline delete confirmation */
                      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-50 border border-red-100">
                        <svg className="w-3.5 h-3.5 flex-shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="flex-1 text-xs text-red-600 font-medium">Hapus chat ini?</span>
                        <button
                          onClick={() => handleDeleteChat(chat.id)}
                          disabled={deletingId === chat.id}
                          className="text-[10px] font-semibold text-white bg-red-500 hover:bg-red-600 px-2 py-0.5 rounded-md transition-colors disabled:opacity-50"
                        >
                          {deletingId === chat.id ? "..." : "Ya"}
                        </button>
                        <button
                          onClick={() => setPendingDeleteId(null)}
                          className="text-[10px] font-semibold text-gray-500 hover:text-gray-700 px-2 py-0.5 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          Batal
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-start gap-1">
                        <button
                          onClick={() => handleLoadChat(chat)}
                          className="flex-1 text-left px-3 py-2.5 rounded-xl text-xs text-gray-600 hover:bg-gray-100 hover:text-[#2D7D46] transition-colors flex items-start gap-2"
                        >
                          <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span className="leading-snug line-clamp-2">
                            {chat.user_message.length > 50
                              ? chat.user_message.slice(0, 50) + "…"
                              : chat.user_message}
                          </span>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setPendingDeleteId(chat.id); }}
                          className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg text-gray-200 hover:text-red-400 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 mt-1.5"
                          title="Hapus chat"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 px-3 py-2">Belum ada percakapan</p>
            )}
          </div>
        )}
      </div>

      {/* Bottom */}
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
  );

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {view === "profile" ? <ProfileView /> : <MainView />}
      </div>
    </>
  );
}
