import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pedoman Pemberitaan Media Siber — Gorontalo Unite",
  description:
    "Gorontalo Unite beroperasi sesuai Pedoman Pemberitaan Media Siber yang ditetapkan oleh Dewan Pers pada 3 September 2012.",
};

export default function PedomanMediaSiberPage() {
  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-10 pb-24 md:pb-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#2D7D46] dark:hover:text-emerald-400 transition-colors">Beranda</Link>
        <span>/</span>
        <Link href="/about" className="hover:text-[#2D7D46] dark:hover:text-emerald-400 transition-colors">Tentang Kami</Link>
        <span>/</span>
        <span className="text-gray-600 dark:text-gray-300">Pedoman Media Siber</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#2D7D46] dark:text-emerald-400 mb-3">Dewan Pers</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-3">
          Pedoman Pemberitaan Media Siber
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Ditetapkan oleh Dewan Pers pada <strong className="text-gray-700 dark:text-gray-300">3 September 2012</strong>.
          Gorontalo Unite berkomitmen untuk menjalankan kegiatan jurnalistik sesuai pedoman ini.
        </p>
      </div>

      {/* Intro */}
      <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 p-6 mb-8 text-sm text-gray-600 dark:text-gray-400 leading-relaxed space-y-3">
        <p>
          Kemerdekaan berpendapat, kemerdekaan berekspresi, dan kemerdekaan pers adalah hak asasi manusia yang dilindungi Pancasila, Undang-Undang Dasar 1945, dan Deklarasi Universal Hak Asasi Manusia PBB. Tanggung jawab pers kepada publik memerlukan landasan moral dan etika profesi sebagai pedoman operasional dalam menjaga kepercayaan publik dan menegakkan integritas serta profesionalisme.
        </p>
        <p>
          Perkembangan teknologi informasi melahirkan media siber yang memiliki karakter khusus sehingga memerlukan pedoman agar pengelolaannya dapat dilaksanakan secara profesional, memenuhi fungsi, hak, dan kewajibannya sesuai Undang-Undang Nomor 40 Tahun 1999 tentang Pers dan Kode Etik Jurnalistik.
        </p>
      </div>

      {/* Body */}
      <div className="space-y-8">

        <Section number="1" title="Ruang Lingkup">
          <ol className="list-[lower-alpha] pl-5 space-y-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Media Siber</strong> adalah segala bentuk media yang menggunakan wahana internet dan melaksanakan kegiatan jurnalistik, serta memenuhi persyaratan sebagai perusahaan pers sebagaimana dimaksud Undang-Undang Nomor 40 Tahun 1999 tentang Pers.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Isi Buatan Pengguna (User Generated Content)</strong> adalah segala isi yang dibuat dan atau disebarkan oleh pengguna media siber, antara lain, artikel, gambar, komentar, suara, video dan berbagai bentuk unggahan yang melekat pada media siber, seperti blog, forum, komentar pembaca atau pemirsa, dan bentuk lain.
            </li>
          </ol>
        </Section>

        <Section number="2" title="Verifikasi dan Keberimbangan Berita">
          <ol className="list-[lower-alpha] pl-5 space-y-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            <li>Pada prinsipnya setiap berita harus melalui verifikasi.</li>
            <li>Berita yang dapat merugikan pihak lain memerlukan verifikasi pada berita yang sama untuk memenuhi prinsip akurasi dan keberimbangan.</li>
            <li>
              Ketentuan dalam butir (a) di atas dikecualikan, dengan syarat:
              <ol className="list-decimal pl-5 mt-2 space-y-2">
                <li>Berita benar-benar mengandung kepentingan publik yang bersifat mendesak;</li>
                <li>Sumber berita yang pertama adalah sumber yang jelas identitasnya, kredibel dan kompeten;</li>
                <li>Subyek berita yang harus dikonfirmasi tidak diketahui keberadaannya dan atau tidak dapat dihubungi;</li>
                <li>Media memberikan penjelasan kepada pembaca bahwa berita tersebut masih memerlukan verifikasi lebih lanjut yang diupayakan dalam waktu secepatnya. Penjelasan dimuat pada bagian akhir dari berita yang sama, diulang pada setiap tenggang waktu tertentu, dan dihapus setelah verifikasi selesai.</li>
              </ol>
            </li>
            <li>Berita yang sudah diverifikasi lebih lanjut tersebut harus ditambahkan dan atau diralat dalam berita pemutakhiran (<em>update</em>) dengan tautan pada berita yang belum terverifikasi itu.</li>
          </ol>
        </Section>

        <Section number="3" title="Isi Buatan Pengguna (User Generated Content)">
          <ol className="list-[lower-alpha] pl-5 space-y-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            <li>Media siber wajib mencantumkan syarat dan ketentuan mengenai Isi Buatan Pengguna yang tidak bertentangan dengan Undang-Undang Nomor 40 Tahun 1999 tentang Pers dan Kode Etik Jurnalistik, yang ditempatkan secara terang dan mudah ditemukan.</li>
            <li>Media siber mewajibkan setiap pengguna untuk melakukan registrasi keanggotaan dan melakukan proses log-in terlebih dahulu untuk dapat mempublikasikan semua bentuk Isi Buatan Pengguna. Ketentuan teknis diserahkan kepada masing-masing media siber.</li>
            <li>
              Dalam registrasi tersebut, media siber mewajibkan pengguna memberi persetujuan tertulis bahwa Isi Buatan Pengguna yang dipublikasikan:
              <ol className="list-decimal pl-5 mt-2 space-y-2">
                <li>Tidak memuat isi bohong, fitnah, sadis dan cabul;</li>
                <li>Tidak memuat isi yang mengandung prasangka dan kebencian terkait dengan suku, agama, ras, dan antargolongan (SARA), serta menganjurkan tindakan kekerasan;</li>
                <li>Tidak memuat isi diskriminatif atas dasar perbedaan jenis kelamin dan bahasa, serta tidak merendahkan martabat orang lemah, miskin, sakit, cacat jiwa, atau cacat jasmani.</li>
              </ol>
            </li>
            <li>Media siber memiliki kewenangan untuk mengedit atau menghapus Isi Buatan Pengguna yang melanggar ketentuan dalam butir (c) di atas.</li>
            <li>Media siber wajib menyediakan mekanisme pengaduan Isi Buatan Pengguna yang dinilai melanggar ketentuan pada butir (c) di atas. Mekanisme tersebut harus mudah ditemukan dan digunakan oleh pengguna.</li>
            <li>Media siber yang telah memenuhi ketentuan pada butir (a), (b), (c), dan (d) di atas tidak dibebani tanggung jawab atas masalah yang ditimbulkan akibat pemuatan isi yang melanggar ketentuan pada butir (c) di atas.</li>
          </ol>
        </Section>

        <Section number="4" title="Ralat, Koreksi, dan Hak Jawab">
          <ol className="list-[lower-alpha] pl-5 space-y-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            <li>Ralat, koreksi, dan atau hak jawab wajib segera diselesaikan paling lama 2 x 24 jam setelah pengaduan diterima.</li>
            <li>Ralat, koreksi dan atau hak jawab wajib ditautkan pada berita yang diralat, dikoreksi atau yang menjadi dasar hak jawab.</li>
            <li>Ralat, koreksi, dan atau hak jawab wajib ditayangkan secara prominan, tidak tersembunyi, dan mudah ditemukan oleh pengguna.</li>
          </ol>
        </Section>

        <Section number="5" title="Pencabutan Berita">
          <ol className="list-[lower-alpha] pl-5 space-y-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            <li>Berita yang sudah dipublikasikan tidak dapat dicabut karena alasan penyensoran dari pihak luar redaksi, kecuali terkait masalah SARA, kesusilaan, masa depan anak, pengalaman trauma korban kejahatan, ancaman keselamatan seseorang, dan atau berdasarkan pertimbangan khusus lain yang ditetapkan Dewan Pers.</li>
            <li>Media siber lain wajib mengikuti pencabutan kutipan berita dari media asal yang telah dicabut.</li>
            <li>Pencabutan berita wajib disertai dengan alasan pencabutan dan diinformasikan secara jelas kepada publik.</li>
          </ol>
        </Section>

        <Section number="6" title="Iklan">
          <ol className="list-[lower-alpha] pl-5 space-y-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            <li>Media siber wajib membedakan dengan jelas antara produk berita dan iklan.</li>
            <li>Setiap berita/artikel/isi yang merupakan iklan dan atau isi berbayar wajib mencantumkan keterangan &ldquo;advertorial&rdquo;, &ldquo;iklan&rdquo;, &ldquo;ads&rdquo;, &ldquo;sponsored&rdquo;, atau keterangan lain yang menjelaskan bahwa berita/artikel/isi tersebut adalah iklan.</li>
          </ol>
        </Section>

        <Section number="7" title="Hak Cipta">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Media siber wajib menghormati hak cipta sebagaimana diatur dalam peraturan perundang-undangan yang berlaku.
          </p>
        </Section>

        <Section number="8" title="Pencantuman Pedoman">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Media siber wajib mencantumkan Pedoman Pemberitaan Media Siber ini di medianya secara mudah diakses oleh publik.
          </p>
        </Section>

        <Section number="9" title="Sengketa">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Penilaian akhir atas sengketa mengenai pelaksanaan Pedoman Pemberitaan Media Siber ini diselesaikan oleh Dewan Pers.
          </p>
        </Section>

      </div>

      {/* Footer / signature */}
      <div className="mt-10 pt-8 border-t border-gray-100 dark:border-zinc-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">Jakarta, 3 September 2012</p>
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1">Dewan Pers</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Ketua: <strong className="text-gray-700 dark:text-gray-300">Bagir Manan</strong></p>
      </div>

      {/* Nav links */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/privacy-policy" className="text-xs text-gray-400 dark:text-gray-500 hover:text-[#2D7D46] dark:hover:text-emerald-400 transition-colors">Kebijakan Privasi</Link>
        <span className="text-gray-300 dark:text-zinc-700">·</span>
        <Link href="/terms" className="text-xs text-gray-400 dark:text-gray-500 hover:text-[#2D7D46] dark:hover:text-emerald-400 transition-colors">Syarat & Ketentuan</Link>
        <span className="text-gray-300 dark:text-zinc-700">·</span>
        <Link href="/about" className="text-xs text-gray-400 dark:text-gray-500 hover:text-[#2D7D46] dark:hover:text-emerald-400 transition-colors">Tentang Kami</Link>
      </div>

    </div>
  );
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-zinc-800">
        <span className="w-7 h-7 rounded-lg bg-[#2D7D46]/10 dark:bg-emerald-900/30 text-[#2D7D46] dark:text-emerald-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
          {number}
        </span>
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h2>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}
