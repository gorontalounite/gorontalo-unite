# Panduan Kontribusi Data Pengetahuan (RAG)

> **Kamu tidak perlu bisa coding untuk berkontribusi!**
> Cukup punya pengetahuan tentang Gorontalo dan kemauan untuk berbagi.

---

## Apa itu RAG dan Mengapa Penting?

**RAG** (Retrieval-Augmented Generation) adalah cara AI kami "belajar" tentang Gorontalo.

Tanpa RAG, AI hanya punya pengetahuan umum dari internet — yang sering kali:
- Tidak akurat untuk detail lokal Gorontalo
- Kurang info tentang tempat/budaya/kuliner spesifik
- Tidak tahu perkembangan terbaru daerah

**Dengan RAG**, setiap fakta yang kamu kontribusikan akan langsung bisa digunakan AI untuk menjawab pertanyaan tentang Gorontalo dengan lebih akurat dan detail.

---

## Cara Berkontribusi (Tanpa Coding)

### Opsi 1: GitHub Issue (Direkomendasikan)
1. Buka tab **Issues** di repository ini
2. Klik **New Issue**
3. Pilih template **"🧠 Kontribusi Data Pengetahuan (RAG)"**
4. Isi form — tidak perlu akun khusus, cukup akun GitHub gratis

### Opsi 2: Pull Request (Untuk yang Familiar dengan GitHub)
1. Fork repository ini
2. Buat file baru di `data/knowledge/[kategori]/nama-topik.md`
3. Isi dengan format yang dijelaskan di bawah
4. Submit Pull Request

---

## Format Data

### Format Sederhana (untuk Issue)
Cukup tuliskan dalam bahasa Indonesia yang baik dan benar:

```
Judul: Pantai Bolihutuo, Boalemo

Pantai Bolihutuo terletak di Desa Bolihutuo, Kecamatan Botumoito,
Kabupaten Boalemo, Provinsi Gorontalo. Jaraknya sekitar 120 km dari
Kota Gorontalo dan dapat ditempuh dalam 2–2,5 jam menggunakan kendaraan
bermotor melalui jalan Trans-Sulawesi.

Pantai ini terkenal dengan pasir putih dan air laut yang jernih berwarna
biru tosca. Aktivitas yang bisa dilakukan termasuk snorkeling, berenang,
dan menikmati sunset. Terdapat beberapa warung makan yang menyajikan
ikan segar hasil tangkapan nelayan setempat.

Tiket masuk: Rp 10.000 per orang (perkiraan, bisa berubah)
Fasilitas: parkir, toilet umum, warung makan
Waktu terbaik: April–Oktober (musim kemarau)
Kontak/Pengelola: Dinas Pariwisata Boalemo

Sumber: kunjungan langsung / boalemo.go.id / visitgorontalo.id
```

### Format File Markdown (untuk PR)
```markdown
---
title: "Pantai Bolihutuo"
category: "wisata"
tags: ["pantai", "boalemo", "bahari", "snorkeling"]
source: "https://boalemo.go.id/wisata"
verified: true
last_updated: "2026-05"
contributor: "username_github"
---

# Pantai Bolihutuo

[Isi pengetahuan di sini...]
```

---

## Kategori yang Dibutuhkan

Berikut kategori dengan kebutuhan paling mendesak (urutan prioritas):

### 🔴 Sangat Dibutuhkan
| Kategori | Yang Kurang |
|---|---|
| **Tempat Wisata** | Deskripsi lengkap, jam buka, harga tiket, akses jalan |
| **Kuliner Khas** | Nama makanan, bahan, cara makan, di mana beli |
| **Adat & Budaya** | Upacara, pakaian adat, alat musik, prosesi |
| **Bahasa Gorontalo** | Kosakata, kalimat umum, arti nama-nama lokal |

### 🟡 Dibutuhkan
| Kategori | Yang Kurang |
|---|---|
| **Sejarah** | Kerajaan Gorontalo, tokoh bersejarah, peristiwa penting |
| **Layanan Publik** | Alamat & nomor SKPD, rumah sakit, sekolah favorit |
| **Tokoh Lokal** | Biografi singkat tokoh Gorontalo (akademisi, seniman, atlet) |
| **UMKM Lokal** | Produk unggulan Gorontalo, pengrajin, oleh-oleh khas |

### 🟢 Bonus
| Kategori | Yang Kurang |
|---|---|
| **Flora & Fauna** | Hewan/tumbuhan endemik Gorontalo |
| **Geografi** | Kecamatan, desa, koordinat penting |
| **Olahraga & Komunitas** | Klub, event lokal, komunitas aktif |

---

## Panduan Kualitas Data

### ✅ Data yang Bagus
- **Faktual** — berdasarkan kenyataan, bisa diverifikasi
- **Spesifik** — menyebutkan nama, lokasi, angka yang konkret
- **Lokal** — informasi yang tidak mudah ditemukan di Wikipedia umum
- **Terkini** — informasi yang masih relevan (hindari data lama >5 tahun kecuali sejarah)
- **Lengkap** — minimal 3 paragraf atau 150 kata

### ❌ Data yang Dihindari
- Opini subjektif ("pantai ini yang paling indah di dunia")
- Iklan atau promosi berbayar
- Data yang tidak bisa diverifikasi sama sekali
- Copy-paste penuh dari Wikipedia tanpa adaptasi
- Data yang sudah jelas diketahui semua orang (tidak informatif)

---

## Contoh Data yang Sudah Bagus

### Contoh: Kuliner
```
Binte Biluhuta (Milu Siram)

Binte Biluhuta atau dalam bahasa Indonesia disebut "milu siram" adalah
sup jagung khas Gorontalo yang terbuat dari jagung muda, ikan cakalang
atau ikan tuna, udang, kelapa parut, kemangi, dan bumbu rempah lokal.

Cita rasa sup ini adalah perpaduan gurih, sedikit asam dari belimbing
wuluh, dan segar dari kemangi. Hidangan ini disajikan panas dan biasanya
dinikmati dengan nasi putih atau sagu.

Asal-usul: Binte Biluhuta berasal dari tradisi masyarakat Gorontalo
yang memanfaatkan hasil bumi (jagung) dan laut (ikan) secara bersamaan.
Jagung merupakan makanan pokok alternatif di Gorontalo selain nasi.

Di mana mencicipi: hampir semua rumah makan khas Gorontalo di Kota
Gorontalo menyajikan menu ini. Kawasan Pasar Sentral dan Jalan Ahmad
Yani banyak terdapat kedai yang spesialis milu siram.

Harga rata-rata: Rp 25.000 – Rp 50.000 per porsi (2025)
```

---

## Frequently Asked Questions

**Q: Apakah kontribusiku akan langsung muncul di AI?**
A: Tidak langsung. Tim kami akan mereview setiap kontribusi sebelum dimasukkan ke sistem. Proses review biasanya 3–7 hari.

**Q: Bolehkah berkontribusi dalam bahasa Gorontalo?**
A: Sangat boleh! Justru kami sangat membutuhkan konten dalam bahasa Gorontalo/Hulontalo.

**Q: Apakah ada reward/bayaran untuk kontributor?**
A: Saat ini belum ada kompensasi finansial. Namun, nama kontributor akan dicantumkan di halaman credits website (segera hadir) sebagai bentuk apresiasi.

**Q: Bagaimana jika infoku ternyata salah?**
A: Tidak masalah! Tim kami akan melakukan fact-checking sebelum data digunakan. Kalau ada kekeliruan, kami akan menghubungi kamu melalui GitHub untuk klarifikasi.

**Q: Berapa banyak kontribusi yang boleh saya kirim?**
A: Tidak ada batasan! Semakin banyak, semakin baik untuk AI Gorontalo Unite.

---

*Pertanyaan lain? Buka [GitHub Discussions](https://github.com/gorontalounite/gorontalo-unite/discussions)*
