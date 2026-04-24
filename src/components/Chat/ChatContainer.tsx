"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { mockConversations, suggestedQuestions, Conversation } from "@/data/mockConversations";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import InputBar from "./InputBar";
import ChatHeader from "./ChatHeader";

const STORAGE_KEY = "gorontalo-chat-history";

export default function ChatContainer() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [newMessageId, setNewMessageId] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Conversation[];
        setConversations(parsed);
      }
    } catch {
      // ignore parse errors
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever conversations change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch {
      // ignore storage errors
    }
  }, [conversations, isLoaded]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations, isTyping]);

  const findResponse = useCallback((query: string): Conversation | null => {
    const q = query.toLowerCase();
    return (
      mockConversations.find((c) =>
        c.userMessage.toLowerCase().includes(q.split(" ")[0]) ||
        q.includes(c.userMessage.toLowerCase().split(" ")[0])
      ) ?? null
    );
  }, []);

  const handleSend = useCallback(
    (message: string) => {
      const tempId = Date.now();
      const userOnly: Conversation = {
        id: tempId,
        userMessage: message,
        aiResponse: "",
        sources: [],
        timestamp: new Date().toISOString(),
      };

      setIsTyping(true);

      setTimeout(() => {
        const match = findResponse(message);
        const response: Conversation = match
          ? {
              ...match,
              id: tempId,
              userMessage: message,
              timestamp: new Date().toISOString(),
            }
          : {
              id: tempId,
              userMessage: message,
              aiResponse:
                "Terima kasih atas pertanyaan Anda tentang Gorontalo! Saat ini saya sedang belajar lebih banyak tentang topik ini. Coba tanyakan tentang wisata, kuliner, budaya, sejarah, atau ekonomi Gorontalo — saya siap membantu! 🌟",
              sources: [],
              timestamp: new Date().toISOString(),
            };

        setConversations((prev) => [...prev, response]);
        setNewMessageId(tempId);
        setIsTyping(false);
      }, 1200 + Math.random() * 800);

      // Show user message immediately (without AI response yet — typing indicator covers this)
      void userOnly;
    },
    [findResponse]
  );

  const handleSuggestedQuestion = (question: string) => {
    handleSend(question);
  };

  const handleClearHistory = () => {
    setConversations([]);
    setNewMessageId(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ChatHeader onClearHistory={handleClearHistory} messageCount={conversations.length} />

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 space-y-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome state */}
          {conversations.length === 0 && !isTyping && (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2D7D46] to-[#1a5c33] rounded-2xl flex items-center justify-center shadow-lg mb-4">
                <span className="text-white text-2xl font-bold">GU</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Selamat datang di Gorontalo AI
              </h3>
              <p className="text-sm text-gray-500 max-w-md mb-8">
                Tanyakan apapun tentang Gorontalo — wisata, kuliner, budaya, sejarah, layanan publik, dan banyak lagi.
              </p>

              {/* Suggested questions */}
              <div className="w-full max-w-lg">
                <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide">
                  Pertanyaan populer
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSuggestedQuestion(q)}
                      className="text-left text-sm text-gray-600 bg-white border border-gray-200 hover:border-[#2D7D46] hover:text-[#2D7D46] hover:bg-emerald-50 px-3 py-2.5 rounded-xl transition-all text-sm leading-snug"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Conversation history */}
          {conversations.map((conv) => (
            <MessageBubble
              key={conv.id}
              conversation={conv}
              isNew={conv.id === newMessageId}
            />
          ))}

          {/* Typing indicator */}
          {isTyping && <TypingIndicator />}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar */}
      <InputBar onSend={handleSend} isLoading={isTyping} />
    </div>
  );
}
