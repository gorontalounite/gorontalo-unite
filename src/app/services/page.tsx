import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Product & Services — Gorontalo Unite",
  description:
    "Layanan profesional Gorontalo Unite: Web Developer, AI Automation, Digital Marketing, Social Media Management, Data Analytics, dan Branding Identity.",
};

const services = [
  {
    href: "/wd",
    code: "WD",
    title: "Web Developer",
    description: "Membangun website dan aplikasi web modern, cepat, dan responsif sesuai kebutuhan bisnis.",
    color: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
    border: "border-blue-100 dark:border-blue-900/50",
  },
  {
    href: "/ai",
    code: "AI",
    title: "AI Automation",
    description: "Otomasi proses bisnis menggunakan kecerdasan buatan untuk meningkatkan efisiensi operasional.",
    color: "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400",
    border: "border-purple-100 dark:border-purple-900/50",
  },
  {
    href: "/dm",
    code: "DM",
    title: "Digital Marketing",
    description: "Strategi pemasaran digital yang terukur: SEO, iklan berbayar, dan konten yang mengkonversi.",
    color: "bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400",
    border: "border-yellow-100 dark:border-yellow-900/50",
  },
  {
    href: "/sm",
    code: "SM",
    title: "Social Media Management",
    description: "Pengelolaan media sosial secara profesional: konten kreatif, jadwal posting, dan engagement.",
    color: "bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400",
    border: "border-pink-100 dark:border-pink-900/50",
  },
  {
    href: "/da",
    code: "DA",
    title: "Data Analytics",
    description: "Analisis data bisnis untuk pengambilan keputusan yang lebih cerdas dan berbasis bukti.",
    color: "bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400",
    border: "border-teal-100 dark:border-teal-900/50",
  },
  {
    href: "/bi",
    code: "BI",
    title: "Branding Identity",
    description: "Membangun identitas merek yang kuat, konsisten, dan berkesan melalui desain visual strategis.",
    color: "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400",
    border: "border-orange-100 dark:border-orange-900/50",
  },
];

export default function ServicesPage() {
  return (
    <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-10 pb-24 md:pb-12">

      {/* Header */}
      <div className="mb-8">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#F5C400] dark:text-yellow-400 mb-3">
          Gorontalo Unite
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Product & Services
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Solusi digital profesional untuk bisnis dan organisasi Anda.
        </p>
      </div>

      {/* Services Grid */}
      <div className="space-y-3">
        {services.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className={`flex items-start gap-4 p-5 rounded-2xl border bg-white dark:bg-zinc-900 ${s.border} hover:shadow-sm transition-all group`}
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${s.color} font-bold text-sm`}>
              {s.code}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#F5C400] dark:group-hover:text-yellow-400 transition-colors">
                {s.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                {s.description}
              </p>
            </div>
            <svg className="w-4 h-4 text-gray-300 dark:text-zinc-600 flex-shrink-0 mt-0.5 group-hover:text-[#F5C400] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 p-6 text-center">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Butuh konsultasi?</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Hubungi kami untuk diskusi lebih lanjut tentang kebutuhan Anda.
        </p>
        <a
          href="https://wa.me/628114350404"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#F5C400] text-black text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-yellow-400 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp Kami
        </a>
      </div>

    </div>
  );
}
