import type { Metadata } from "next";
import Link from "next/link";
import { PAGE_TITLE_CLASS } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan",
  robots: { index: false, follow: true },
};

const SHORTCUTS = [
  { href: "/",             label: "Beranda" },
  { href: "/city-guide",   label: "City Guide" },
  { href: "/event",        label: "Event" },
  { href: "/category/news", label: "Berita Terbaru" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
      <span className="font-heading text-[80px] font-bold leading-none text-[#F5C400] dark:text-yellow-400 sm:text-[110px]">
        404
      </span>
      <h1 className={`${PAGE_TITLE_CLASS} mt-4 text-gray-900 dark:text-white`}>
        Halaman tidak ditemukan
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        Halaman yang kamu cari mungkin sudah dipindahkan, dihapus, atau alamatnya salah ketik.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#F5C400] px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#c9a000]"
      >
        ← Kembali ke Beranda
      </Link>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        {SHORTCUTS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-xs font-medium text-gray-400 hover:text-brand dark:text-gray-500 dark:hover:text-yellow-400"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
