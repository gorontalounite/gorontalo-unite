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
    .replace(/^• (.+)$/gm, '<li class="ml-4">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal">$2</li>')
    .replace(/\n\n/g, "</p><p class='mt-2'>")
    .replace(/\n/g, "<br/>");
}

export default function MessageBubble({ conversation, isNew = false }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(conversation.aiResponse).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const categoryColors: Record<string, string> = {
    Wisata: "bg-emerald-100 text-emerald-700",
    Budaya: "bg-purple-100 text-purple-700",
    Kuliner: "bg-orange-100 text-orange-700",
    Pendidikan: "bg-blue-100 text-blue-700",
    Kesehatan: "bg-red-100 text-red-700",
    Ekonomi: "bg-yellow-100 text-yellow-700",
    Infrastruktur: "bg-gray-100 text-gray-700",
    Sejarah: "bg-amber-100 text-amber-700",
  };

  return (
    <div className={`space-y-3 ${isNew ? "animate-fade-in" : ""}`}>
      {/* User Message */}
      <div className="flex justify-end">
        <div className="max-w-[75%] sm:max-w-[60%]">
          <div className="bg-[#2D7D46] text-white px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm">
            <p className="text-sm leading-relaxed">{conversation.userMessage}</p>
          </div>
          <p className="text-xs text-gray-400 mt-1 text-right">
            {new Date(conversation.timestamp).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      {/* AI Response */}
      <div className="flex justify-start gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#2D7D46] to-[#1a5c33] rounded-full flex items-center justify-center shadow-md mt-1">
          <span className="text-white text-xs font-bold">GU</span>
        </div>

        <div className="max-w-[85%] sm:max-w-[75%] space-y-2">
          {/* Response bubble */}
          <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
            <div
              className="text-sm text-gray-800 leading-relaxed prose-sm"
              dangerouslySetInnerHTML={{
                __html: `<p class='mt-0'>${parseMarkdown(conversation.aiResponse)}</p>`,
              }}
            />
          </div>

          {/* Sources */}
          {conversation.sources.length > 0 && (
            <div className="px-1">
              <p className="text-xs text-gray-400 mb-1.5 font-medium">Sumber terkait:</p>
              <div className="flex flex-wrap gap-1.5">
                {conversation.sources.map((source) => (
                  <Link
                    key={source.id}
                    href={source.url}
                    className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium transition-opacity hover:opacity-80 ${
                      categoryColors[source.category] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span className="w-1 h-1 rounded-full bg-current opacity-60" />
                    {source.title.length > 40
                      ? source.title.slice(0, 40) + "…"
                      : source.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 px-1">
            <button
              onClick={() => setFeedback("up")}
              className={`text-sm transition-all ${
                feedback === "up"
                  ? "text-[#2D7D46] scale-110"
                  : "text-gray-300 hover:text-gray-500"
              }`}
              title="Jawaban membantu"
            >
              👍
            </button>
            <button
              onClick={() => setFeedback("down")}
              className={`text-sm transition-all ${
                feedback === "down"
                  ? "text-red-400 scale-110"
                  : "text-gray-300 hover:text-gray-500"
              }`}
              title="Jawaban kurang membantu"
            >
              👎
            </button>
            <button
              onClick={handleCopy}
              className="text-xs text-gray-300 hover:text-gray-500 transition-colors flex items-center gap-1"
              title="Salin jawaban"
            >
              {copied ? (
                <>
                  <svg className="w-3 h-3 text-[#2D7D46]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#2D7D46]">Disalin</span>
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Salin
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
