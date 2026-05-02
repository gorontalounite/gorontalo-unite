# Kebijakan Keamanan

## Melaporkan Kerentanan

**Jangan melaporkan celah keamanan melalui GitHub Issues publik.**

Jika kamu menemukan kerentanan keamanan, silakan laporkan secara privat melalui salah satu cara berikut:

1. **GitHub Security Advisory** — buka tab "Security" → "Report a vulnerability" di halaman repo ini
2. **Email** — kirim ke alamat yang tercantum di profil maintainer dengan subjek `[SECURITY] Gorontalo Unite`

### Yang harus disertakan dalam laporan:
- Deskripsi kerentanan
- Langkah-langkah untuk mereproduksi
- Potensi dampak
- Saran perbaikan (opsional)

---

## Waktu Respons

| Tahap | Target Waktu |
|---|---|
| Konfirmasi penerimaan laporan | 48 jam |
| Penilaian awal (severity) | 5 hari kerja |
| Patch untuk isu kritis | 14 hari |
| Patch untuk isu sedang | 30 hari |

---

## Kebijakan Disclosure

Kami menganut **Responsible Disclosure**. Setelah patch dirilis:
- Kami akan membuat advisory publik
- Reporter akan dikreditkan (jika bersedia)
- Kami tidak akan mengambil tindakan hukum terhadap peneliti yang melaporkan dengan itikad baik

---

## Versi yang Didukung

Hanya versi terbaru di branch `main` yang menerima patch keamanan.

---

## Scope (Yang Relevan untuk Dilaporkan)

- Injeksi SQL atau bypass RLS di Supabase
- Eksposur API key / service role key
- XSS / CSRF di halaman publik
- Akses tidak sah ke dashboard admin
- Manipulasi data pengguna lain
