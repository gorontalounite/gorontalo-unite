"use client";

interface ChatHeaderProps {
  onClearHistory: () => void;
  messageCount: number;
}

export default function ChatHeader({ onClearHistory, messageCount }: ChatHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-100 px-4 py-3 sm:px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Left: Identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#2D7D46] to-[#1a5c33] rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
            <span className="text-white text-sm font-bold">GU</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Gorontalo AI</h2>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400">Siap membantu</span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {messageCount > 0 && (
            <span className="hidden sm:inline-flex text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
              {messageCount} percakapan
            </span>
          )}
          {messageCount > 0 && (
            <button
              onClick={onClearHistory}
              className="text-xs text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-red-50"
              title="Hapus riwayat percakapan"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="hidden sm:inline">Hapus riwayat</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
