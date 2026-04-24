"use client";

import { useState } from "react";
import Link from "next/link";
import { Conversation } from "@/data/mockConversations";

interface MessageBubbleProps {
  conversation: Conversation;
  isNew?: boolean;
}

function parseMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^• (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal">$2</li>')
    .replace(/\n\n/g, "</p><p class='mt-2'>")
    .replace(/\n/g, "<br/>");
}

export default function MessageBubble({ conversation, isNew = false }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [sourcesOpen, setSourcesOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(conversation.aiResponse).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const hasSources = conversation.sources.length > 0;

  return (
    <div className={`space-y-2 ${isNew ? "animate-fade-in" : ""}`}>
      {/* User Message — right-aligned bubble */}
      <div className="flex justify-end px-2 sm:px-0">
        <div className="max-w-[80%] sm:max-w-[65%]">
          <div className="bg-[#2D7D46] text-white px-4 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed shadow-sm">
            {conversation.userMessage}
          </div>
          <p className="text-[11px] text-gray-400 mt-1 text-right pr-1">
            {new Date(conversation.timestamp).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      {/* AI Response — left-aligned bubble, no avatar */}
      <div className="flex justify-start px-2 sm:px-0">
        <div className="max-w-[88%] sm:max-w-[78%] space-y-1.5">
          {/* Label */}
          <p className="text-[11px] text-gray-400 font-medium pl-1">Gorontalo AI</p>

          {/* Bubble */}
          <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
            <div
              className="text-sm text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: `<p class='mt-0'>${parseMarkdown(conversation.aiResponse)}</p>`,
              }}
            />
          </div>

          {/* Action row */}
          <div className="flex items-center gap-3 pl-1 flex-wrap">
            {/* Feedback */}
            <button
              onClick={() => setFeedback(feedback === "up" ? null : "up")}
              className={`text-sm transition-all ${
                feedback === "up" ? "text-[#2D7D46] scale-110" : "text-gray-300 hover:text-gray-500"
              }`}
              title="Jawaban membantu"
            >
              <svg className="w-4 h-4" fill={feedback === "up" ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </button>
            <button
              onClick={() => setFeedback(feedback === "down" ? null : "down")}
              className={`text-sm transition-all ${
                feedback === "down" ? "text-red-400 scale-110" : "text-gray-300 hover:text-gray-500"
              }`}
              title="Jawaban kurang membantu"
            >
              <svg className="w-4 h-4" fill={feedback === "down" ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
              </svg>
            </button>

            {/* Copy */}
            <button
              onClick={handleCopy}
              className="text-xs text-gray-300 hover:text-gray-500 transition-colors flex items-center gap-1"
              title="Salin jawaban"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5 text-[#2D7D46]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#2D7D46]">Disalin</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Salin
                </>
              )}
            </button>

            {/* Sources toggle — only if sources exist */}
            {hasSources && (
              <button
                onClick={() => setSourcesOpen((v) => !v)}
                className="ml-auto flex items-center gap-1 text-xs text-gray-400 hover:text-[#2D7D46] transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                {sourcesOpen ? "Sembunyikan sumber" : `${conversation.sources.length} sumber`}
                <svg
                  className={`w-3 h-3 transition-transform ${sourcesOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>

          {/* Collapsible sources */}
          {hasSources && sourcesOpen && (
            <div className="pl-1 space-y-1.5 animate-fade-in">
              {conversation.sources.map((source, i) => (
                <Link
                  key={source.id ?? i}
                  href={source.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-xs text-gray-500 hover:text-[#2D7D46] bg-gray-50 hover:bg-emerald-50 border border-gray-100 hover:border-[#2D7D46]/20 px-3 py-2 rounded-xl transition-all group"
                >
                  <span className="flex-shrink-0 w-4 h-4 bg-gray-200 group-hover:bg-[#2D7D46]/10 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500 group-hover:text-[#2D7D46] mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-snug line-clamp-2">{source.title}</span>
                  <svg className="w-3 h-3 flex-shrink-0 ml-auto mt-0.5 opacity-40 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
