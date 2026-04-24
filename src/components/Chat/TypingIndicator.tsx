export default function TypingIndicator() {
  return (
    <div className="flex justify-start px-2 sm:px-0">
      <div className="space-y-1.5">
        <p className="text-[11px] text-gray-400 font-medium pl-1">Gorontalo AI</p>
        <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm inline-flex">
          <div className="flex items-center gap-1.5 h-4">
            <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    </div>
  );
}
