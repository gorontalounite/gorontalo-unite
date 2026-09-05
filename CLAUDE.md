# Gorontalo Unite — Project Instructions

> **BACA DULU:** Dokumen ini adalah KONTEKS & REFERENSI, bukan roadmap atau
> daftar tugas. Jangan ambil inisiatif membangun, merekonstruksi,
> "menyempurnakan", migrasi arsitektur, atau menghapus apapun hanya karena
> disebut di sini. Setiap perubahan kode dikerjakan HANYA kalau user
> secara eksplisit minta di sesi itu. Kalau ada bagian yang kedengarannya
> "belum selesai" atau "perlu direkonstruksi" — itu catatan kondisi, bukan
> instruksi untuk langsung dikerjakan.

## 1. Context

**Apa ini:** Platform media hyperlokal Gorontalo (Next.js + Supabase).

**Kondisi saat ini (per 4 Sep 2026):**

- Repo: `github.com/gorontalounite/gorontalo-unite`. Domain live: `gorontalounite.com`.
  Vercel project: `gorontalounitemediahub-5403s-projects/gorontalo-unite`.
- **Production sudah berjalan (live, stabil) dan TIDAK sama persis dengan branch
  git manapun.** Ini fakta historis dari cara deploy sebelumnya (lewat Codex CLI,
  langsung dari working tree tanpa commit final ke GitHub) — bukan berarti ada
  yang rusak atau tertunda di production. Website jalan normal apa adanya.
- Branch yang paling dekat mencerminkan kode production: `codex/reado-clone`.
  Ada juga 2 branch eksperimental lain (`codex/iccn-clone`,
  `codex/production-audit-fixes`) yang TIDAK dipakai — jangan diacu sebagai basis.
- Ada satu file, `src/components/Landing/LandingPage.tsx`, yang isinya di git
  (branch `codex/reado-clone`) berbeda dari yang benar-benar tampil di
  `gorontalounite.com` (di git: data contoh/placeholder; di live: data asli).
  **Ini cuma catatan ketidaksinkronan repo, bukan pekerjaan yang menunggu.**
  File ini TIDAK BOLEH disentuh, ditulis ulang, atau "diperbaiki" kecuali user
  minta secara spesifik di sesi tersebut.

**Sebelum menyentuh kode apapun yang berhubungan tampilan atau route publik:**
cek dulu kondisi live di `gorontalounite.com` (screenshot/inspect), karena kode
di repo project ini terbukti pernah tidak mencerminkan production. Ini prinsip
kehati-hatian, bukan izin untuk mulai mengubah apa yang dilihat.

**Riwayat cleanup yang SUDAH dikerjakan** (patch terlampir,
`0001-remove-unused-chatbot-fix-proxy-lockdown.patch`, **belum di-push ke GitHub
sampai user konfirmasi** — proses push ini yang masih tertunda, bukan hal lain):
- Hapus `/chat`, `/ai`, `/api/chat` (chatbot Groq+Tavily, sudah tidak dipakai)
- Hapus dependency `groq-sdk`, `@tavily/core`, `@pinecone-database/pinecone`
- Hapus komponen `ChatContainer` (orphan)
- Bersihkan shortcut chatbot di PWA manifest
- Perbaiki `src/proxy.ts` — versi `codex/reado-clone` sempat mengunci semua
  route publik (`/admin`, `/berita`, dst → redirect ke `/`); dikonfirmasi tidak
  sesuai kondisi live, dikembalikan ke perilaku normal

Kalau folder Claude Code ini dimulai dari clone repo baru: apply patch tersebut
dulu di atas `codex/reado-clone` sebelum kerja apapun, supaya titik mulainya
konsisten dengan yang sudah direview.

---

## 2. Skills / Tools yang Dipakai

- **Git** — semua perubahan lewat commit + branch, tidak ada dirty-deploy langsung.
- **Vercel** (MCP/CLI) — cek status deployment, bandingkan commit yang running
  di production vs yang ada di git, sebelum asumsi apapun.
- **Supabase** (MCP/CLI) — migrations di `supabase/migrations/`; perubahan skema
  lewat migration file, bukan edit langsung di dashboard.
- **Browser/screenshot** — dipakai untuk verifikasi kondisi live sebelum
  perubahan tampilan, bukan untuk otomatis "menyempurnakan" apa yang dilihat.

---

## 3. Yang Boleh dan Tidak Boleh Disentuh

### Sudah dihapus (jangan dikembalikan tanpa alasan baru)
- `/chat`, `/ai`, `/api/chat`, dependency chatbot, komponen `Chat/*`, shortcut manifest.

### Tidak boleh disentuh tanpa instruksi eksplisit di sesi itu
- `src/components/Landing/LandingPage.tsx` dan tampilan homepage secara umum.
- Migrations yang sudah jalan di production — tambah migration baru kalau perlu
  ubah skema, jangan edit yang lama.
- `TiptapNewsEditor`, sistem admin (`/admin/*`), tabel `tourism_places`/`events`.
- `src/proxy.ts` versi yang sudah diperbaiki (jangan kembalikan ke versi lockdown).

### Ditandai tidak terpakai tapi belum dihapus — tanya dulu sebelum hapus data
- `/good-news`, sistem kategori & artikel lama, `knowledge_base`, `rag_uploads`,
  `/myrag`. Ini soal data, bukan cuma kode — beda kelas risiko, jangan otonom.

### Proses deploy
- Tidak ada deploy production dari working tree dirty. Commit → push → preview →
  review → merge → deploy.

---

## 4. Technical Stack & Constraints

| Layer | Teknologi |
|---|---|
| Framework | Next.js 16.2 (App Router), React 19, TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 |
| Backend/DB | Supabase (PostgreSQL + Auth + Storage + RLS) |
| Editor | Tiptap (`TiptapNewsEditor`) |
| Deployment | Vercel |
| Bundler | Turbopack |
| PWA | Service worker + manifest (`public/manifest.json`, `public/sw.js`) |

Constraints:
- Middleware Next.js 16 pakai nama file `proxy.ts` (bukan `middleware.ts`).
- RLS aktif di semua tabel utama — perubahan akses data lewat policy.
- Sebelum bikin branch baru, cek dulu apa branch serupa sudah ada
  (`git branch -r`) — repo ini punya beberapa branch eksperimen yang tidak dipakai.

---

## 5. Struktur Direktori (ringkas)

```
src/
  app/
    page.tsx                    # homepage — jangan diubah tanpa instruksi eksplisit
    [category]/                 # kategori dinamis
    berita/, good-news/         # portal berita lama — status "tidak dipakai" (§3)
    wisata/, event/              # City Guide & Event
    admin/                      # dashboard admin, termasuk admin/wisata, admin/event
    api/
      admin/, affiliate/, articles/, news/, rag/
      chat/                     # SUDAH DIHAPUS — jangan buat ulang tanpa alasan baru
    (auth)/, auth/
    affiliate/, portfolio/, media-kit/, shop/, services/
    bi/, da/, dm/, sm/, wd/     # halaman service singkat
  components/
    Landing/LandingPage.tsx     # jangan disentuh tanpa instruksi eksplisit (§1, §3)
    editor/TiptapNewsEditor.tsx
    city-guide/                 # TourismDirectory, CityGuideRichEditor, dll
    admin/, layout/, ui/
  lib/supabase/                 # client/server/admin/middleware helper
  proxy.ts                      # sudah diperbaiki, jangan dikembalikan ke versi lockdown
supabase/migrations/            # source of truth skema DB, urut kronologis
```

---

## 6. Spesifikasi Desain & Design System

Belum terdokumentasi lengkap — bukan berarti perlu langsung dibangun. Kalau
suatu saat user minta kerjakan sesuatu yang menyentuh tampilan, langkah yang
tepat adalah **inspeksi `gorontalounite.com` langsung** (screenshot, inspect
element) untuk ambil warna/font/struktur yang sebenarnya dipakai — jangan
mengacu ke draft di branch `codex/reado-clone` atau `codex/iccn-clone`, karena
keduanya bukan representasi akurat dari yang live.

Section homepage live yang terkonfirmasi dari isi teks (bukan style):
Hero → Top Stories → What's On → Travel → Culinary → Culture → People → Life →
Latest News. Nav: Wisata, Event, Inspire, Insight, Interest, Tentang.

---

## 7. Protokol Alur Kerja

1. **Inspeksi live site dulu** sebelum ubah apapun yang berhubungan tampilan
   atau route publik.
2. **Baca migration terakhir** sebelum ubah skema DB.
3. **Branch per task**, commit message jelas, push ke GitHub.
4. **Preview deploy dulu**, bandingkan dengan production, baru merge.
5. **Perubahan yang menghapus data/tabel** — konfirmasi eksplisit ke user dulu.
6. **Kalau nemu ketidaksesuaian lain** antara kode dan production — laporkan
   dulu, jangan pilih salah satu sebagai "yang benar" secara sepihak.
7. **Kalau tidak ada instruksi eksplisit untuk suatu file/fitur — jangan
   disentuh**, meskipun kelihatan "belum selesai" atau "bisa disempurnakan".
