import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Affiliate | Gorontalo Unite",
};

export default function AffiliatePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-8">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Kembali
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-3">Affiliate Program</h1>
      <p className="text-gray-500 text-sm leading-relaxed mb-6">
        Program afiliasi Gorontalo Unite memungkinkan Anda mendapatkan komisi dengan merekomendasikan
        produk dan layanan lokal Gorontalo kepada orang lain.
      </p>
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
        <p className="text-sm text-emerald-700 font-medium mb-2">Segera Hadir</p>
        <p className="text-xs text-emerald-600">
          Program afiliasi kami sedang dalam pengembangan. Daftar sekarang untuk mendapat notifikasi pertama.
        </p>
        <Link
          href="/sign-up"
          className="inline-block mt-4 bg-[#2D7D46] text-white text-sm px-6 py-2.5 rounded-xl hover:bg-[#236137] transition-colors"
        >
          Daftar Sekarang
        </Link>
      </div>
    </div>
  );
}
