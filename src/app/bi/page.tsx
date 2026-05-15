import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Branding Identity — Gorontalo Unite",
  description: "Membangun identitas merek yang kuat, konsisten, dan berkesan melalui desain visual strategis.",
};

export default function BIPage() {
  return (
    <ServicePage
      code="BI"
      title="Branding Identity"
      tagline="Branding Identity"
      headline="Merek yang **diingat** bahkan setelah layar dimatikan."
      subheadline="Identitas merek bukan sekadar logo. Kami membangun sistem visual yang kohesif — dari filosofi merek hingga setiap elemen yang menyentuh audiens Anda."
      accentColor="bg-orange-400"
      accentText="text-orange-400"
      features={[
        {
          title: "Brand Strategy & Positioning",
          description: "Mendefinisikan karakter merek Anda — nilai, kepribadian, nada komunikasi, dan posisi di pasar — sebagai fondasi seluruh identitas visual.",
        },
        {
          title: "Logo & Sistem Visual",
          description: "Desain logo primer dan alternatif, palet warna, tipografi, dan elemen grafis yang membentuk sistem identitas yang fleksibel dan konsisten.",
        },
        {
          title: "Brand Guidelines",
          description: "Panduan penggunaan merek yang lengkap — bagaimana logo digunakan, warna diterapkan, dan tone komunikasi dijaga di seluruh media.",
        },
        {
          title: "Materi Komunikasi",
          description: "Aplikasi identitas ke materi nyata: kartu nama, kop surat, presentasi, template media sosial, signage, dan packaging.",
        },
      ]}
      useCases={[
        {
          label: "Brand Baru",
          description: "Bisnis yang baru berdiri dan butuh identitas profesional dari nol yang siap bersaing.",
        },
        {
          label: "Rebranding",
          description: "Merek yang sudah ada namun ingin memperbarui citra untuk pasar atau segmen yang baru.",
        },
        {
          label: "Produk & FMCG",
          description: "Merek produk konsumen yang butuh identitas visual kuat di rak toko dan platform digital.",
        },
        {
          label: "Startup & Tech",
          description: "Perusahaan teknologi yang ingin tampil kredibel, modern, dan mudah diingat sejak hari pertama.",
        },
      ]}
    />
  );
}
