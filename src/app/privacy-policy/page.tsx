import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Gorontalo Unite",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-8">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Kembali
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Kebijakan Privasi</h1>
      <p className="text-xs text-gray-400 mb-8">Terakhir diperbarui: April 2026</p>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-2">1. Informasi yang Kami Kumpulkan</h2>
          <p>Kami mengumpulkan informasi yang Anda berikan secara langsung, seperti nama, alamat email, dan konten percakapan dengan Gorontalo AI. Data ini digunakan semata-mata untuk meningkatkan layanan kami.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-2">2. Penggunaan Informasi</h2>
          <p>Informasi Anda digunakan untuk menyediakan dan meningkatkan layanan, menyimpan riwayat percakapan (jika Anda masuk), serta mengirimkan pembaruan layanan jika Anda menyetujuinya.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-2">3. Keamanan Data</h2>
          <p>Data Anda disimpan di infrastruktur Supabase dengan enkripsi standar industri. Kami tidak menjual atau membagikan data pribadi Anda kepada pihak ketiga tanpa persetujuan Anda.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-2">4. Hak Pengguna</h2>
          <p>Anda berhak mengakses, memperbarui, atau menghapus data pribadi Anda kapan saja. Hubungi kami melalui halaman Tentang Kami untuk permintaan penghapusan data.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-2">5. Kontak</h2>
          <p>Untuk pertanyaan terkait privasi, silakan hubungi tim kami melalui halaman <Link href="/about" className="text-[#2D7D46] hover:underline">Tentang Kami</Link>.</p>
        </section>
      </div>
    </div>
  );
}
