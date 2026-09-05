# Gorontalo Unite — Media Online Gorontalo

> Portal berita & media hyperlokal untuk Gorontalo — liputan berita, city guide (wisata & kuliner), event, dan cerita human interest, dikelola lewat dashboard editorial sendiri.

**Live:** [gorontalounite.com](https://gorontalounite.com) · **Deploy:** Vercel (auto-deploy dari `main`)

[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?logo=supabase)](https://supabase.com/)
[![PWA](https://img.shields.io/badge/PWA-ready-purple?logo=googlechrome)](https://gorontalounite.com)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

---

## Daftar Isi

- [Tentang](#tentang)
- [Tech Stack](#tech-stack)
- [Struktur Project](#struktur-project)
- [Fitur](#fitur)
- [Setup Lokal](#setup-lokal)
- [Environment Variables](#environment-variables)
- [Kontribusi](#kontribusi)

---

## Tentang

Gorontalo Unite adalah **media online** yang berfokus pada liputan berita dan konten hyperlokal Gorontalo — berita terkini, wisata & kuliner (city guide), event daerah, dan cerita people/human interest. Konten dikelola lewat dashboard admin internal dengan editor artikel sendiri.

Platform ini sebelumnya sempat mengeksplorasi arah "AI hyperlocal platform" (chatbot, affiliate marketplace, portfolio showcase) — arah tersebut sudah **tidak dilanjutkan**. Fokus saat ini murni sebagai media online.

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 16.2 (App Router) + React 19 |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 |
| Backend / DB | Supabase (PostgreSQL + Auth + Storage + RLS) |
| Editor | Tiptap (rich text) + block-based editor |
| PWA | Service Worker + Web App Manifest |
| Deployment | Vercel (auto-deploy dari `main`) |

---

## Struktur Project

```
gorontalo-unite/
├── public/                    # Assets statis, ikon PWA, manifest, service worker
├── src/
│   ├── app/
│   │   ├── page.tsx            # Homepage
│   │   ├── berita/              # Portal berita — listing, filter, halaman penulis
│   │   ├── [category]/          # Halaman kategori dinamis
│   │   ├── category/            # Indeks kategori
│   │   ├── news/[id]/           # Detail artikel
│   │   ├── city-guide/          # City Guide (indeks wisata + kuliner)
│   │   ├── wisata/              # Destinasi wisata
│   │   ├── event/                # Event daerah
│   │   ├── reels/                # Konten reels/video pendek
│   │   ├── good-news/            # (status: tidak dipakai, belum dihapus)
│   │   ├── author/, blog/, podcast/
│   │   ├── admin/                # Dashboard admin (konten, reels, wisata, event, users)
│   │   ├── api/                  # Route handlers (articles, news, admin, reels, dll)
│   │   ├── (auth)/, auth/        # Autentikasi
│   │   └── about/, services/, media-kit/, shop/  # Halaman pendukung
│   ├── components/
│   │   ├── Landing/               # Homepage sections
│   │   ├── editor/                 # Editor artikel (Tiptap + block editor)
│   │   ├── city-guide/              # Komponen wisata/kuliner
│   │   ├── admin/, layout/, ui/
│   ├── lib/supabase/               # Client/server/admin/middleware helper
│   └── proxy.ts                    # Next.js 16 middleware (nama file wajib `proxy.ts`)
└── supabase/migrations/            # Skema database (source of truth)
```

---

## Fitur

- **Berita** — listing, filter kategori, halaman penulis, komentar
- **Kategori dinamis** — puluhan kanal editorial (News, Travel, Culinary, Culture, People, Politik, Ekonomi, dll.)
- **City Guide** — direktori wisata & kuliner
- **Event** — agenda kegiatan daerah
- **Reels** — konten video pendek
- **Dashboard Admin** — kelola konten, reels, wisata, event, dan pengguna (role: user/editor/admin)
- **PWA** — bisa di-install, offline fallback

> Fitur lama yang sudah dilepas dari kode (bukan lagi bagian dari produk): chatbot AI, marketplace affiliate, portfolio showcase, knowledge base/RAG.

---

## Setup Lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Lihat `.env.example` untuk daftar lengkap. Minimal yang dibutuhkan untuk development:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

---

## Kontribusi

Lihat [CONTRIBUTING.md](CONTRIBUTING.md) dan [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
