import type { Metadata } from "next";
import Link from "next/link";
import ReloadButton from "./ReloadButton";

export const metadata: Metadata = {
  title: "Offline | Gorontalo Unite",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-sm">
        <div className="text-6xl mb-6">📡</div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          Tidak ada koneksi internet
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
          Kamu sedang offline. Beberapa halaman yang sudah dikunjungi sebelumnya
          mungkin masih bisa diakses dari cache.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <ReloadButton />
          <Link
            href="/"
            className="border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
