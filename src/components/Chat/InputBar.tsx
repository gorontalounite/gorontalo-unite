"use client";

import { useState, useRef, KeyboardEvent } from "react";

interface InputBarProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

export default function InputBar({ onSend, isLoading = false }: InputBarProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  return (
    <div className="border-t border-gray-100 bg-white px-4 py-3 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2 focus-within:border-[#2D7D46] focus-within:ring-2 focus-within:ring-[#2D7D46]/20 transition-all">
          {/* Text input */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder="Tanyakan apapun..."
            rows={1}
            disabled={isLoading}
            className="flex-1 bg-transparent text-[16px] sm:text-sm text-gray-800 placeholder-gray-300 resize-none outline-none leading-relaxed py-1 min-h-[28px] max-h-[120px] disabled:opacity-50"
          />

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!value.trim() || isLoading}
            className="flex-shrink-0 mb-1 w-8 h-8 bg-[#2D7D46] text-white rounded-xl flex items-center justify-center transition-all hover:bg-[#236137] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
            aria-label="Kirim pesan"
          >
            {isLoading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>

        <p className="text-center text-[11px] text-gray-300 mt-2">
          Gorontalo AI bisa saja salah memberikan jawaban
        </p>
      </div>
    </div>
  );
}
