import Link from "next/link";

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceUseCase {
  label: string;
  description: string;
}

export interface ServicePageProps {
  code: string;
  title: string;
  tagline: string;
  headline: string;
  subheadline: string;
  features: ServiceFeature[];
  useCases: ServiceUseCase[];
  accentColor: string; // tailwind bg class for badge
  accentText: string;  // tailwind text class for accent elements
}

export default function ServicePage({
  code,
  title,
  tagline,
  headline,
  subheadline,
  features,
  useCases,
  accentColor,
  accentText,
}: ServicePageProps) {
  return (
    <div className="w-full">

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="text-white px-4 sm:px-6 pt-14 pb-20" style={{ backgroundColor: '#18181b' }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-xs font-bold ${accentColor} text-black`}>
              {code}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              {tagline}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold leading-tight tracking-tight mb-6">
            {headline.split("**").map((part, i) =>
              i % 2 === 1
                ? <span key={i} className={accentText}>{part}</span>
                : <span key={i}>{part}</span>
            )}
          </h1>

          <p className="text-base sm:text-lg leading-relaxed max-w-xl mb-10" style={{ color: '#a1a1aa' }}>
            {subheadline}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/628114350404"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-black text-sm font-bold px-6 py-3 rounded-xl transition-colors"
              style={{ backgroundColor: '#F5C400' }}
            >
              Konsultasi Gratis
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border border-zinc-700 text-zinc-300 text-sm font-medium px-6 py-3 rounded-xl hover:border-zinc-500 hover:text-white transition-colors"
            >
              Lihat Layanan Lain
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────── */}
      <section className="bg-white dark:bg-zinc-900 px-4 sm:px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-10">
            Apa yang kami lakukan
          </p>
          <div className="space-y-0 divide-y divide-gray-100 dark:divide-zinc-800">
            {features.map((f, i) => (
              <div key={i} className="flex gap-6 py-8">
                <span className="text-xs font-bold text-zinc-400 dark:text-zinc-600 w-8 flex-shrink-0 pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases ──────────────────────────────────────── */}
      <section className="bg-gray-50 dark:bg-zinc-950 px-4 sm:px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-10">
            Cocok untuk
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {useCases.map((u, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
                  {u.label}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {u.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="text-white px-4 sm:px-6 py-16" style={{ backgroundColor: '#18181b' }}>
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-xl font-bold mb-1">Siap memulai?</p>
            <p className="text-sm" style={{ color: '#a1a1aa' }}>
              Diskusikan kebutuhan {title} Anda bersama tim kami.
            </p>
          </div>
          <a
            href="https://wa.me/628114350404"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-black text-sm font-bold px-6 py-3 rounded-xl transition-colors flex-shrink-0"
            style={{ backgroundColor: '#F5C400' }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Kami
          </a>
        </div>
      </section>

    </div>
  );
}
