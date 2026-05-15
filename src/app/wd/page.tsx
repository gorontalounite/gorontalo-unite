import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Web Developer — Gorontalo Unite",
  description: "Membangun website dan aplikasi web modern, cepat, dan responsif untuk bisnis Anda.",
};

export default function WDPage() {
  return (
    <ServicePage
      code="WD"
      title="Web Developer"
      tagline="Web Developer"
      headline="Website yang **bekerja keras** untuk bisnis Anda."
      subheadline="Kami membangun website dan aplikasi web yang cepat, aman, dan scalable — dari landing page hingga sistem full-stack yang terintegrasi."
      accentColor="bg-blue-400"
      accentText="text-blue-400"
      features={[
        {
          title: "Landing Page & Company Profile",
          description: "Desain dan pengembangan halaman web yang mengkonversi pengunjung menjadi pelanggan. Dioptimalkan untuk performa, SEO, dan pengalaman pengguna.",
        },
        {
          title: "Web Application",
          description: "Aplikasi web custom sesuai alur kerja bisnis Anda — sistem manajemen, dashboard, portal klien, atau platform internal.",
        },
        {
          title: "E-Commerce & Toko Online",
          description: "Platform belanja online yang lengkap dengan manajemen produk, pembayaran, dan laporan penjualan terintegrasi.",
        },
        {
          title: "Maintenance & Optimasi",
          description: "Pemeliharaan rutin, update keamanan, peningkatan performa, dan dukungan teknis berkelanjutan untuk website Anda.",
        },
      ]}
      useCases={[
        {
          label: "UMKM & Startup",
          description: "Bisnis baru yang butuh kehadiran digital profesional dengan anggaran efisien.",
        },
        {
          label: "Perusahaan & Institusi",
          description: "Organisasi yang ingin memodernisasi sistem web atau membangun platform internal.",
        },
        {
          label: "Toko & Retail",
          description: "Pedagang yang ingin memperluas jangkauan dengan toko online yang mudah dikelola.",
        },
        {
          label: "Pemerintah & NGO",
          description: "Lembaga yang membutuhkan portal informasi publik yang mudah diakses dan dikelola.",
        },
      ]}
    />
  );
}
