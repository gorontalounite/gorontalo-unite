import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Digital Marketing — Gorontalo Unite",
  description: "Strategi pemasaran digital yang terukur: SEO, iklan berbayar, dan konten yang mengkonversi.",
};

export default function DMPage() {
  return (
    <ServicePage
      code="DM"
      title="Digital Marketing"
      tagline="Digital Marketing"
      headline="Pertumbuhan bisnis yang **terukur dan konsisten**."
      subheadline="Strategi pemasaran digital yang dirancang berdasarkan data — bukan asumsi. Kami membantu bisnis Anda ditemukan, dipercaya, dan dipilih."
      accentColor="bg-[#F5C400]"
      accentText="text-[#F5C400]"
      features={[
        {
          title: "Search Engine Optimization (SEO)",
          description: "Optimasi teknis dan konten agar website Anda muncul di halaman pertama Google untuk kata kunci yang paling relevan dengan bisnis Anda.",
        },
        {
          title: "Iklan Berbayar (Google & Meta Ads)",
          description: "Kampanye iklan yang dikelola secara aktif — targeting presisi, A/B testing kreatif, dan optimasi budget untuk ROI maksimal.",
        },
        {
          title: "Content Marketing",
          description: "Produksi konten strategis — artikel, infografis, video pendek — yang membangun otoritas merek dan menarik traffic organik berkelanjutan.",
        },
        {
          title: "Email & Marketing Automation",
          description: "Alur email otomatis untuk nurturing lead, onboarding pelanggan baru, dan retensi — dipersonalisasi berdasarkan perilaku pengguna.",
        },
      ]}
      useCases={[
        {
          label: "Bisnis Lokal",
          description: "Toko, restoran, atau jasa lokal yang ingin mendominasi pencarian Google di area mereka.",
        },
        {
          label: "E-Commerce",
          description: "Toko online yang ingin meningkatkan traffic organik dan konversi dari iklan berbayar.",
        },
        {
          label: "B2B & Jasa Profesional",
          description: "Perusahaan yang ingin menghasilkan leads berkualitas melalui konten dan kampanye yang ditarget.",
        },
        {
          label: "Brand Baru",
          description: "Merek yang baru diluncurkan dan butuh visibilitas cepat di pasar digital.",
        },
      ]}
    />
  );
}
