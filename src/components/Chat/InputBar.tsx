"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";

interface InputBarProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

// Web Speech API types (not in standard TS lib)
interface ISpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onstart: ((this: ISpeechRecognition, ev: Event) => void) | null;
  onend: ((this: ISpeechRecognition, ev: Event) => void) | null;
  onerror: ((this: ISpeechRecognition, ev: Event) => void) | null;
  onresult: ((this: ISpeechRecognition, ev: ISpeechRecognitionEvent) => void) | null;
}
interface ISpeechRecognitionEvent extends Event {
  results: { [index: number]: { [index: number]: { transcript: string } } };
}
declare global {
  interface Window {
    SpeechRecognition?: new () => ISpeechRecognition;
    webkitSpeechRecognition?: new () => ISpeechRecognition;
  }
}

export default function InputBar({ onSend, isLoading = false }: InputBarProps) {
  const [value, setValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState<boolean | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  // Detect speech support on mount (client-only)
  useEffect(() => {
    const supported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    setSpeechSupported(supported);
  }, []);

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

  const toggleVoice = () => {
    if (speechSupported === false) {
      setSpeechError("Tidak didukung di browser ini");
      setTimeout(() => setSpeechError(null), 3000);
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognitionCtor =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      setSpeechError("Tidak didukung di browser ini");
      setTimeout(() => setSpeechError(null), 3000);
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "id-ID";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setSpeechError(null);
    };

    recognition.onresult = (event: ISpeechRecognitionEvent) => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      if (transcript) {
        setValue((prev) => (prev ? prev + " " + transcript : transcript));
        // Adjust textarea height after populating
        requestAnimationFrame(() => {
          const el = textareaRef.current;
          if (el) {
            el.style.height = "auto";
            el.style.height = Math.min(el.scrollHeight, 120) + "px";
          }
        });
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      setSpeechError("Mikrofon tidak dapat diakses");
      setTimeout(() => setSpeechError(null), 3000);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div className="border-t border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Speech error tooltip */}
        {speechError && (
          <div className="mb-2 text-center">
            <span className="inline-block text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 px-3 py-1 rounded-lg">
              {speechError}
            </span>
          </div>
        )}

        <div className="flex items-end gap-2 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl px-4 py-2 focus-within:border-[#2D7D46] dark:focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-[#2D7D46]/20 dark:focus-within:ring-emerald-500/20 transition-all">
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
            className="flex-1 bg-transparent text-[16px] sm:text-sm text-gray-800 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-600 resize-none outline-none leading-relaxed py-1 min-h-[28px] max-h-[120px] disabled:opacity-50"
          />

          {/* Mic button */}
          {speechSupported !== false && (
            <button
              type="button"
              onClick={toggleVoice}
              disabled={isLoading}
              title={isListening ? "Hentikan rekaman" : "Input suara (Bahasa Indonesia)"}
              aria-label={isListening ? "Hentikan rekaman suara" : "Mulai rekaman suara"}
              className={`flex-shrink-0 mb-1 w-8 h-8 rounded-xl flex items-center justify-center transition-all disabled:cursor-not-allowed active:scale-95 ${
                isListening
                  ? "bg-red-500 animate-pulse text-white"
                  : "bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700 disabled:opacity-30"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 10v2a7 7 0 0 1-14 0v-2"
                />
                <line
                  x1="12"
                  y1="19"
                  x2="12"
                  y2="23"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                <line
                  x1="8"
                  y1="23"
                  x2="16"
                  y2="23"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!value.trim() || isLoading}
            className="flex-shrink-0 mb-1 w-8 h-8 bg-[#2D7D46] dark:bg-emerald-500 text-white rounded-xl flex items-center justify-center transition-all hover:bg-[#236137] dark:hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
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

        <p className="text-center text-[11px] text-gray-300 dark:text-gray-600 mt-2">
          Gorontalo AI bisa saja salah memberikan jawaban
        </p>
      </div>
    </div>
  );
}
