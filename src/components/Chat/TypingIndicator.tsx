export default function TypingIndicator() {
  return (
    <div className="flex justify-start gap-3">
      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#2D7D46] to-[#1a5c33] rounded-full flex items-center justify-center shadow-md mt-1">
        <span className="text-white text-xs font-bold">GU</span>
      </div>
      <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
        <div className="flex items-center gap-1.5 h-4">
          <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
