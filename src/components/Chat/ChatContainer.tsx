"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { suggestedQuestions } from "@/data/mockConversations";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import InputBar from "./InputBar";
import ChatHeader from "./ChatHeader";
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

  // Auth state
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Load conversation history from Supabase (if logged in)
  useEffect(() => {
    if (!user) { setHistoryLoaded(true); return; }
    const supabase = createClient();
    supabase
      .from("conversations")
      .select("id, user_message, ai_response, sources, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data }) => {
        if (data) {
          const reversed = [...data].reverse().map((c, i) => ({
            id: i,
            userMessage: c.user_message,
            aiResponse: c.ai_response,
            sources: (c.sources as unknown as { title: string; url: string | null; category: string }[]) ?? [],
            timestamp: c.created_at,
          }));
          setConversations(reversed);
          setConversationHistory(
            reversed.flatMap((c) => [
              { role: "user" as const, content: c.userMessage },
              { role: "assistant" as const, content: c.aiResponse },
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

      // Show user message immediately, show typing indicator
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

        // Clear pending, add full conversation
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

  const handleClearHistory = () => {
    setConversations([]);
    setConversationHistory([]);
    setNewMessageId(null);
    setPendingMessage(null);
  };

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
      <ChatHeader onClearHistory={handleClearHistory} messageCount={conversations.length} />

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-4 chat-scroll">
        <div className="max-w-3xl mx-auto px-3 sm:px-6 space-y-5">

          {/* Welcome state */}
          {isEmpty && (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
              <div className="w-14 h-14 bg-gradient-to-br from-[#2D7D46] to-[#1a5c33] rounded-2xl flex items-center justify-center shadow-lg mb-4">
                <span className="text-white text-xl font-bold">GU</span>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Selamat datang di Gorontalo AI
              </h3>
              <p className="text-xs text-gray-500 max-w-xs mb-4">
                Didukung oleh Groq LLaMA 3.3 70B dan pencarian web real-time.
              </p>

              {/* Login prompt */}
              {!user && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5 mb-5 text-xs text-amber-700 flex items-center gap-2">
                  <span>
                    <Link href="/sign-in" className="font-semibold hover:underline">Masuk</Link> untuk menyimpan riwayat percakapan
                  </span>
                </div>
              )}

              {/* Suggested questions */}
              <div className="w-full max-w-md">
                <p className="text-[11px] text-gray-400 mb-2.5 font-medium uppercase tracking-wide">Pertanyaan populer</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {suggestedQuestions.map((q) => (
                    <button key={q} onClick={() => handleSend(q)}
                      className="text-left text-xs text-gray-600 bg-white border border-gray-200 hover:border-[#2D7D46] hover:text-[#2D7D46] hover:bg-emerald-50 px-3 py-2.5 rounded-xl transition-all leading-snug">
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Conversation list */}
          {conversations.map((conv) => (
            <MessageBubble key={conv.id} conversation={{
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
            }} isNew={conv.id === newMessageId} />
          ))}

          {/* Pending user message shown immediately while AI is typing */}
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
