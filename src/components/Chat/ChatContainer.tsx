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

interface ChatContainerProps {
  /** Message to auto-send once history loads (from landing page hero) */
  initialMessage?: string;
  /** Pre-load a past chat (from drawer, when page was in landing mode) */
  chatToLoad?: LiveConversation | null;
}

export default function ChatContainer({ initialMessage, chatToLoad }: ChatContainerProps) {
  const [conversations, setConversations] = useState<LiveConversation[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const [newMessageId, setNewMessageId] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  // Streaming state
  const [streamingText, setStreamingText] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState(false);
  // Post-response suggested questions (3 random after each AI reply)
  const [postSuggestions, setPostSuggestions] = useState<string[]>([]);
  // Share / copy toast
  const [shareToast, setShareToast] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const autoSentRef = useRef(false);

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
      setPostSuggestions([]);
      setStreamingText("");
      setIsStreaming(false);
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
      setPostSuggestions([]);
      setStreamingText("");
      setIsStreaming(false);
    };
    window.addEventListener("load-chat", handler);
    return () => window.removeEventListener("load-chat", handler);
  }, []);

  // Load recent history for AI context ONLY — do not display old messages.
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

  // Auto-send initialMessage once history is loaded (from landing hero)
  useEffect(() => {
    if (!initialMessage || !historyLoaded || autoSentRef.current) return;
    autoSentRef.current = true;
    handleSend(initialMessage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyLoaded]);

  // Pre-load chatToLoad (from drawer while landing page was active)
  useEffect(() => {
    if (!chatToLoad) return;
    setConversations([chatToLoad]);
    setConversationHistory([
      { role: "user" as const, content: chatToLoad.userMessage },
      { role: "assistant" as const, content: chatToLoad.aiResponse },
    ]);
    setPendingMessage(null);
    setNewMessageId(null);
  }, [chatToLoad]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations, isTyping, pendingMessage, streamingText]);

  const handleSend = useCallback(
    async (message: string) => {
      const tempId = Date.now();
      setPendingMessage(message);
      setIsTyping(true);
      setIsStreaming(false);
      setStreamingText("");
      setPostSuggestions([]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, conversationHistory }),
        });

        if (!res.ok || !res.body) {
          throw new Error(`HTTP ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        let accumulated = "";
        let finalSources: { title: string; url: string | null; category: string }[] = [];

        setIsTyping(false);
        setIsStreaming(true);

        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // Process all complete newline-delimited JSON lines
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? ""; // keep last incomplete line

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;

            try {
              const parsed = JSON.parse(trimmed) as
                | { type: "chunk"; text: string }
                | { type: "sources"; sources: { title: string; url: string | null; category: string }[] }
                | { type: "done" };

              if (parsed.type === "chunk") {
                accumulated += parsed.text;
                setStreamingText(accumulated);
              } else if (parsed.type === "sources") {
                finalSources = parsed.sources;
              } else if (parsed.type === "done") {
                // Will be handled after loop
              }
            } catch {
              // Malformed JSON line — skip
            }
          }
        }

        // Process any remaining buffer content
        if (buffer.trim()) {
          try {
            const parsed = JSON.parse(buffer.trim()) as
              | { type: "chunk"; text: string }
              | { type: "sources"; sources: { title: string; url: string | null; category: string }[] }
              | { type: "done" };
            if (parsed.type === "chunk") {
              accumulated += parsed.text;
            } else if (parsed.type === "sources") {
              finalSources = parsed.sources;
            }
          } catch {
            // Ignore
          }
        }

        const newConv: LiveConversation = {
          id: tempId,
          userMessage: message,
          aiResponse: accumulated || "Maaf, terjadi kesalahan. Coba lagi.",
          sources: finalSources,
          timestamp: new Date().toISOString(),
        };

        setIsStreaming(false);
        setStreamingText("");
        setPendingMessage(null);
        setConversations((prev) => [...prev, newConv]);
        setNewMessageId(tempId);
        setConversationHistory((prev) =>
          [
            ...prev,
            { role: "user" as const, content: message },
            { role: "assistant" as const, content: newConv.aiResponse },
          ].slice(-12)
        );

        // Pick 3 new random suggested questions after each response
        setPostSuggestions(pickRandom(suggestedQuestions, 3));
      } catch {
        setIsStreaming(false);
        setStreamingText("");
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

  // Share conversation handler
  const handleShare = useCallback(async () => {
    if (conversations.length === 0) return;

    const summary = conversations
      .map((c) => `Q: ${c.userMessage}\nA: ${c.aiResponse}`)
      .join("\n\n");

    if (navigator.share) {
      try {
        await navigator.share({ title: "Percakapan Gorontalo AI", text: summary });
        return;
      } catch {
        // User cancelled or not supported — fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(summary);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2000);
    } catch {
      // Clipboard also failed — silently ignore
    }
  }, [conversations]);

  if (!historyLoaded) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#2D7D46] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isEmpty = conversations.length === 0 && !pendingMessage && !isTyping && !isStreaming;

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-4 chat-scroll">
        <div className="max-w-3xl mx-auto px-3 sm:px-6 space-y-5">

          {/* Welcome state */}
          {isEmpty && (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-1">
                Selamat datang di Gorontalo AI
              </h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs mb-5">
                Tanyakan apapun tentang Provinsi Gorontalo — wisata, budaya, kuliner, sejarah, dan lainnya.
              </p>

              {!user && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-xl px-4 py-2.5 mb-5 text-xs text-amber-700 dark:text-amber-400">
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
                    className="w-full text-left text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 hover:border-[#2D7D46] dark:hover:border-emerald-500 hover:text-[#2D7D46] dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-4 py-3 rounded-xl transition-all leading-snug"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat header with Share button */}
          {conversations.length > 0 && (
            <div className="flex justify-end pb-1 relative">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-[#2D7D46] dark:hover:text-emerald-400 border border-gray-200 dark:border-zinc-700 hover:border-[#2D7D46] dark:hover:border-emerald-500 px-3 py-1.5 rounded-lg transition-all bg-white dark:bg-zinc-900"
                aria-label="Bagikan percakapan"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Bagikan
              </button>
              {shareToast && (
                <span className="absolute right-0 top-full mt-1 text-xs bg-emerald-600 text-white px-2.5 py-1 rounded-lg shadow-sm animate-fade-in">
                  Disalin
                </span>
              )}
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

          {isTyping && !isStreaming && <TypingIndicator />}

          {/* Streaming bubble */}
          {isStreaming && (
            <div className="flex justify-start px-2 sm:px-0 animate-fade-in">
              <div className="max-w-[85%] sm:max-w-[75%]">
                <div className="bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 text-gray-800 dark:text-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm text-sm leading-relaxed shadow-sm whitespace-pre-wrap">
                  {streamingText || (
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]" />
                    </span>
                  )}
                  {streamingText && (
                    <span className="inline-block w-0.5 h-4 bg-emerald-500 ml-0.5 animate-pulse align-middle" />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Post-response suggested questions */}
          {postSuggestions.length > 0 && !isStreaming && !isTyping && !pendingMessage && (
            <div className="space-y-2 pt-1 animate-fade-in">
              <p className="text-xs text-gray-400 dark:text-gray-500 px-1">Pertanyaan lanjutan:</p>
              {postSuggestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="w-full text-left text-xs text-gray-600 dark:text-gray-300 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 hover:border-[#2D7D46] dark:hover:border-emerald-500 hover:text-[#2D7D46] dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-3 py-2.5 rounded-xl transition-all leading-snug"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      <InputBar onSend={handleSend} isLoading={isTyping || isStreaming} />
    </div>
  );
}
