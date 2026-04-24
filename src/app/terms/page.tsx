import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan | Gorontalo Unite",
};

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-8">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Kembali
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Syarat & Ketentuan</h1>
      <p className="text-xs text-gray-400 mb-8">Terakhir diperbarui: April 2026</p>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-2">1. Penerimaan Syarat</h2>
          <p>Dengan menggunakan platform Gorontalo Unite, Anda menyetujui syarat dan ketentuan ini. Jika tidak setuju, mohon untuk tidak menggunakan layanan kami.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-2">2. Penggunaan Layanan</h2>
          <p>Layanan Gorontalo AI disediakan untuk keperluan informasi tentang Provinsi Gorontalo. Pengguna dilarang menggunakan platform ini untuk menyebarkan informasi palsu, melanggar hak pihak lain, atau aktivitas ilegal.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-2">3. Akurasi Informasi</h2>
          <p>Gorontalo AI menggunakan pencarian web real-time untuk memberikan informasi terkini. Meski demikian, kami tidak menjamin akurasi 100% dari setiap jawaban. Verifikasi informasi penting ke sumber resmi terkait.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-2">4. Akun Pengguna</h2>
          <p>Anda bertanggung jawab atas keamanan akun dan kata sandi Anda. Segera laporkan kepada kami jika terdapat akses tidak sah ke akun Anda.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-2">5. Perubahan Syarat</h2>
          <p>Kami berhak mengubah syarat ini sewaktu-waktu. Perubahan akan diberitahukan melalui platform. Penggunaan berkelanjutan dianggap sebagai penerimaan syarat baru.</p>
        </section>
      </div>
    </div>
  );
}
