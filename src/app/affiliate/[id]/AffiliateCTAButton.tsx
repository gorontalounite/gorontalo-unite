"use client";

interface Props {
  productId: string;
  marketplaceUrl: string;
  marketplaceName: string;
}

export default function AffiliateCTAButton({ productId, marketplaceUrl, marketplaceName }: Props) {
  const handleClick = () => {
    // Fire-and-forget click tracking
    fetch(`/api/affiliate/${productId}/click`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).catch(() => {
      // Silently ignore tracking errors
    });

    window.open(marketplaceUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-center gap-2 bg-[#2D7D46] text-white font-semibold px-6 py-4 rounded-2xl hover:bg-[#236137] active:scale-[0.98] transition-all text-sm"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      Beli Sekarang di {marketplaceName}
    </button>
  );
}
