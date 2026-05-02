# Kontribusi ke Gorontalo Unite

Terima kasih sudah tertarik berkontribusi! Dokumen ini menjelaskan cara kerja proyek, konvensi kode, dan alur kerja pengembangan.

---

## Alur Kerja Pengembangan

```
feature branch  →  pull request  →  review  →  merge ke main  →  auto-deploy Vercel
```

1. **Fork** repo atau buat branch baru dari `main`
2. Nama branch: `feat/nama-fitur` atau `fix/nama-bug`
3. Commit menggunakan format [Conventional Commits](https://www.conventionalcommits.org/)
4. Buka PR ke `main` — describe perubahan dengan jelas
5. Pastikan `npx tsc --noEmit` dan `npm run lint` lolos sebelum PR

---

## Setup Lokal

Lihat [README.md → Setup Lokal](./README.md#setup-lokal) untuk instruksi lengkap.

---

## Konvensi Kode

### TypeScript
- Selalu gunakan tipe yang eksplisit, hindari `any` sebisa mungkin
- Interface untuk props komponen, type untuk unions/aliases
- Gunakan `as const` untuk lookup objects

### Komponen
- Server Component by default — gunakan `"use client"` hanya jika perlu interaktivitas atau browser API
- Props interface di atas komponen, bukan inline
- Komponen besar pecah menjadi sub-komponen di file yang sama atau folder tersendiri

### Supabase
- Query dari server (page/layout) → gunakan `createAdminClient()` (service role, bypass RLS)
- Query dari client component → gunakan `createClient()` (anon key, ikut RLS)
- Selalu handle error (`if (error) ...`) dan kembalikan 500 yang informatif dari API routes

### Tailwind
- Dark mode: gunakan prefix `dark:` (class-based, diatur oleh `ThemeProvider`)
- Admin dashboard: semua elemen admin dibungkus `force-light` class — tidak perlu dark mode di sini
- Urutan class: layout → spacing → typography → color → border → shadow → hover/focus → responsive

### Naming
- File komponen: `PascalCase.tsx`
- File utils/helpers: `camelCase.ts`
- API routes: `route.ts` (konvensi Next.js)
- Variabel/fungsi: `camelCase`

---

## Struktur Commit

```
feat: menambahkan fitur komentar di artikel
fix: perbaiki slug tidak ter-update saat judul berubah
chore: update dependency Supabase ke v2.104
docs: update README dengan struktur terbaru
refactor: pisahkan BlockCanvas menjadi sub-komponen
```

---

## Menambah Tipe Blok Baru di Editor

1. Tambahkan tipe di `src/components/editor/types.ts` → `BlockType` union dan `BLOCK_REGISTRY`
2. Buat komponen di `src/components/editor/blocks/NamaBlock.tsx`
3. Daftarkan di `BlockCanvas.tsx` → switch-case render
4. Tambahkan renderer di `src/components/ui/BlockRenderer.tsx` → switch-case frontend

---

## Database Migration

Semua perubahan schema harus dilakukan via Supabase Dashboard → SQL Editor, lalu didokumentasikan di [CHANGELOG.md](./CHANGELOG.md).

Jangan pernah mengubah schema produksi secara langsung tanpa backup.

---

## Pertanyaan?

Buka [GitHub Issue](https://github.com/gorontalounite/gorontalo-unite/issues) atau hubungi maintainer.
