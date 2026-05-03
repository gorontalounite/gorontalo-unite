"use client";

export default function ReloadButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="bg-[#2D7D46] text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-[#236137] transition-colors"
    >
      Coba lagi
    </button>
  );
}
