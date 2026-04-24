"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { suggestedQuestions } from "@/data/mockConversations";

function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import InputBar from "./InputBar";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";

export interface LiveConversation {
  id: number;
  userMessage: string;
  aiResponse: string;
  sources: { title: string; url: string | null; category: string }[];
  timestamp: string;
}

export default function ChatContainer() {
  const [conversations, setConversations] = useState<LiveConversation[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const [newMessageId, setNewMessageId] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Pick 5 random questions once per mount — different every session/refresh
  const randomQuestions = useMemo(() => pickRandom(suggestedQuestions, 5), []);

  // Auth state
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Listen to "new-chat" event from LeftDrawer
  useEffect(() => {
    const handler = () => {
      setConversations([]);
      setConversationHistory([]);
      setPendingMessage(null);
      setNewMessageId(null);
    };
    window.addEventListener("new-chat", handler);
    return () => window.removeEventListener("new-chat", handler);
  }, []);

  // Listen to "load-chat" event — load a specific past conversation
  useEffect(() => {
    const handler = (e: Event) => {
      const conv = (e as CustomEvent<LiveConversation>).detail;
      setConversations([conv]);
      setConversationHistory([
        { role: "user" as const, content: conv.userMessage },
        { role: "assistant" as const, content: conv.aiResponse },
      ]);
      setPendingMessage(null);
      setNewMessageId(null);
    };
    window.addEventListener("load-chat", handler);
    return () => window.removeEventListener("load-chat", handler);
  }, []);

  // Load recent history for AI context ONLY — do not display old messages.
  // UI always starts fresh; past chats are accessible via the left drawer.
  useEffect(() => {
    if (!user) { setHistoryLoaded(true); return; }
    const supabase = createClient();
    supabase
      .from("conversations")
      .select("user_message, ai_response")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)
      .then(({ data }) => {
        if (data) {
          setConversationHistory(
            [...data].reverse().flatMap((c) => [
              { role: "user" as const, content: c.user_message },
              { role: "assistant" as const, content: c.ai_response },
            ]).slice(-12)
          );
        }
        setHistoryLoaded(true);
      });
  }, [user]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations, isTyping, pendingMessage]);

  const handleSend = useCallback(
    async (message: string) => {
      const tempId = Date.now();
      setPendingMessage(message);
      setIsTyping(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, conversationHistory }),
        });

        const data = await res.json() as {
          response?: string;
          sources?: { title: string; url: string | null; category: string }[];
          error?: string;
        };

        const newConv: LiveConversation = {
          id: tempId,
          userMessage: message,
          aiResponse: data.response ?? "Maaf, terjadi kesalahan. Coba lagi.",
          sources: data.sources ?? [],
          timestamp: new Date().toISOString(),
        };

        setPendingMessage(null);
        setConversations((prev) => [...prev, newConv]);
        setNewMessageId(tempId);
        setConversationHistory((prev) => [
          ...prev,
          { role: "user" as const, content: message },
          { role: "assistant" as const, content: newConv.aiResponse },
        ].slice(-12));
      } catch {
        const errorConv: LiveConversation = {
          id: tempId,
          userMessage: message,
          aiResponse: "Koneksi gagal. Pastikan internet Anda aktif dan coba lagi.",
          sources: [],
          timestamp: new Date().toISOString(),
        };
        setPendingMessage(null);
        setConversations((prev) => [...prev, errorConv]);
      } finally {
        setIsTyping(false);
      }
    },
    [conversationHistory]
  );

  if (!historyLoaded) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#2D7D46] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isEmpty = conversations.length === 0 && !pendingMessage && !isTyping;

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-4 chat-scroll">
        <div className="max-w-3xl mx-auto px-3 sm:px-6 space-y-5">

          {/* Welcome state */}
          {isEmpty && (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
              <h3 className="text-base font-semibold text-gray-800 mb-1">
                Selamat datang di Gorontalo AI
              </h3>
              <p className="text-xs text-gray-400 max-w-xs mb-5">
                Tanyakan apapun tentang Provinsi Gorontalo — wisata, budaya, kuliner, sejarah, dan lainnya.
              </p>

              {!user && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5 mb-5 text-xs text-amber-700">
                  <Link href="/sign-in" className="font-semibold hover:underline">Masuk</Link>
                  {" "}untuk menyimpan riwayat percakapan
                </div>
              )}

              {/* 5 random suggested questions */}
              <div className="w-full max-w-md space-y-2">
                {randomQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="w-full text-left text-sm text-gray-600 bg-white border border-gray-200 hover:border-[#2D7D46] hover:text-[#2D7D46] hover:bg-emerald-50 px-4 py-3 rounded-xl transition-all leading-snug"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Conversation list */}
          {conversations.map((conv) => (
            <MessageBubble
              key={conv.id}
              conversation={{
                id: conv.id,
                userMessage: conv.userMessage,
                aiResponse: conv.aiResponse,
                sources: conv.sources.map((s, i) => ({
                  id: `src-${i}`,
                  title: s.title,
                  url: s.url ?? "#",
                  category: s.category,
                  publishedAt: "",
                })),
                timestamp: conv.timestamp,
              }}
              isNew={conv.id === newMessageId}
            />
          ))}

          {/* Pending user message */}
          {pendingMessage && (
            <div className="flex justify-end px-2 sm:px-0 animate-fade-in">
              <div className="max-w-[80%] sm:max-w-[65%]">
                <div className="bg-[#2D7D46] text-white px-4 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed shadow-sm">
                  {pendingMessage}
                </div>
              </div>
            </div>
          )}

          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </div>

      <InputBar onSend={handleSend} isLoading={isTyping} />
    </div>
  );
}
