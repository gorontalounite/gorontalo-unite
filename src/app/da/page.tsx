import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Data Analytics — Gorontalo Unite",
  description: "Analisis data bisnis untuk pengambilan keputusan yang lebih cerdas dan berbasis bukti.",
};

export default function DAPage() {
  return (
    <ServicePage
      code="DA"
      title="Data Analytics"
      tagline="Data Analytics"
      headline="Keputusan bisnis yang **didorong data**, bukan intuisi."
      subheadline="Kami mengubah data mentah bisnis Anda menjadi wawasan yang bisa ditindaklanjuti — melalui visualisasi, laporan, dan model analitik yang relevan."
      accentColor="bg-teal-400"
      accentText="text-teal-400"
      features={[
        {
          title: "Business Intelligence Dashboard",
          description: "Dashboard interaktif real-time yang menyajikan metrik kunci bisnis Anda — penjualan, operasional, keuangan — dalam satu tampilan yang mudah dipahami.",
        },
        {
          title: "Analisis Data & Pelaporan",
          description: "Eksplorasi mendalam atas data historis bisnis untuk menemukan pola, tren, dan peluang yang tidak terlihat dari laporan biasa.",
        },
        {
          title: "Predictive Analytics",
          description: "Model prediktif untuk forecasting permintaan, prediksi churn pelanggan, dan estimasi pendapatan berbasis data historis dan variabel eksternal.",
        },
        {
          title: "Integrasi & Pipeline Data",
          description: "Penggabungan data dari berbagai sumber — CRM, POS, spreadsheet, API — ke dalam satu sistem yang terstruktur dan siap dianalisis.",
        },
      ]}
      useCases={[
        {
          label: "Retail & E-Commerce",
          description: "Memahami perilaku pembelian, produk terlaris, dan waktu penjualan puncak secara akurat.",
        },
        {
          label: "Keuangan & Perbankan",
          description: "Analisis risiko, deteksi anomali transaksi, dan pelaporan regulasi berbasis data.",
        },
        {
          label: "Operasional & Logistik",
          description: "Optimasi rantai pasok, monitoring KPI operasional, dan identifikasi bottleneck.",
        },
        {
          label: "Pemerintah & Riset",
          description: "Pengolahan data survei, statistik wilayah, dan visualisasi laporan kebijakan publik.",
        },
      ]}
    />
  );
}
