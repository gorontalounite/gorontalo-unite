import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "AI Automation — Gorontalo Unite",
  description: "Otomasi proses bisnis menggunakan kecerdasan buatan untuk meningkatkan efisiensi operasional.",
};

export default function AIPage() {
  return (
    <ServicePage
      code="AI"
      title="AI Automation"
      tagline="AI Automation"
      headline="Biarkan **AI mengerjakan** pekerjaan berulang Anda."
      subheadline="Kami merancang dan membangun sistem otomasi berbasis AI yang menghemat waktu, mengurangi kesalahan, dan membebaskan tim Anda untuk fokus pada hal yang benar-benar penting."
      accentColor="bg-purple-400"
      accentText="text-purple-400"
      features={[
        {
          title: "Chatbot & AI Assistant",
          description: "Asisten AI kustom yang mampu menjawab pertanyaan pelanggan, memandu pengguna, dan menangani layanan 24/7 tanpa intervensi manusia.",
        },
        {
          title: "Otomasi Alur Kerja",
          description: "Integrasi AI ke dalam proses bisnis — dari pemrosesan dokumen, pengklasifikasian data, hingga pengambilan keputusan otomatis berbasis aturan.",
        },
        {
          title: "RAG & Knowledge Base AI",
          description: "Sistem pencarian dan tanya-jawab berbasis dokumen internal perusahaan menggunakan Retrieval-Augmented Generation (RAG).",
        },
        {
          title: "Analisis & Prediksi",
          description: "Model prediktif untuk forecasting penjualan, deteksi anomali, segmentasi pelanggan, dan rekomendasi berbasis data historis.",
        },
      ]}
      useCases={[
        {
          label: "Layanan Pelanggan",
          description: "Chatbot yang menangani ratusan pertanyaan sekaligus tanpa menambah tim support.",
        },
        {
          label: "Operasional & Admin",
          description: "Otomasi pengisian form, pemrosesan faktur, dan pelaporan rutin yang memakan waktu.",
        },
        {
          label: "Penjualan & Marketing",
          description: "AI yang mempersonalisasi pesan, mengkualifikasi lead, dan merekomendasikan produk secara otomatis.",
        },
        {
          label: "Manajemen Pengetahuan",
          description: "Sistem internal yang memungkinkan tim menemukan informasi dari dokumen ribuan halaman dalam hitungan detik.",
        },
      ]}
    />
  );
}
