import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Social Media Management — Gorontalo Unite",
  description: "Pengelolaan media sosial secara profesional: konten kreatif, jadwal posting, dan engagement.",
};

export default function SMPage() {
  return (
    <ServicePage
      code="SM"
      title="Social Media Management"
      tagline="Social Media Management"
      headline="Konten yang **diingat**, komunitas yang **tumbuh**."
      subheadline="Kami mengelola media sosial Anda secara menyeluruh — dari strategi, produksi konten, hingga interaksi dengan audiens — sehingga Anda bisa fokus menjalankan bisnis."
      accentColor="bg-pink-400"
      accentText="text-pink-400"
      features={[
        {
          title: "Strategi & Perencanaan Konten",
          description: "Kalender konten bulanan yang diselaraskan dengan tujuan bisnis, momen trending, dan karakter audiens di setiap platform.",
        },
        {
          title: "Produksi Konten Kreatif",
          description: "Desain visual, copywriting, dan produksi video pendek yang konsisten dengan identitas merek Anda di Instagram, TikTok, Facebook, dan YouTube.",
        },
        {
          title: "Community Management",
          description: "Respons komentar, pesan, dan mention secara aktif. Membangun hubungan nyata dengan audiens yang mendorong loyalitas.",
        },
        {
          title: "Pelaporan & Analitik",
          description: "Laporan performa bulanan — reach, engagement, pertumbuhan followers, dan rekomendasi optimasi berbasis data nyata.",
        },
      ]}
      useCases={[
        {
          label: "Brand & Produk",
          description: "Merek yang ingin membangun kehadiran konsisten dan audiens yang loyal di media sosial.",
        },
        {
          label: "Bisnis Kuliner & Retail",
          description: "Restoran, kafe, atau toko yang ingin konten menarik untuk menarik pelanggan baru setiap hari.",
        },
        {
          label: "Jasa & Profesional",
          description: "Konsultan, klinik, atau agensi yang ingin membangun kepercayaan melalui konten edukatif.",
        },
        {
          label: "Event & Komunitas",
          description: "Penyelenggara acara atau komunitas yang butuh buzz dan mobilisasi audiens secara digital.",
        },
      ]}
    />
  );
}
