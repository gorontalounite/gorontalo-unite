"use client";

export default function ReloadButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="bg-[#FFCC00] text-black text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-[#FFCC00] transition-colors"
    >
      Coba lagi
    </button>
  );
}
