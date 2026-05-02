# Panduan Kontribusi untuk Developer

Dokumen ini adalah panduan teknis lengkap untuk developer yang ingin berkontribusi kode ke Gorontalo Unite.

---

## Quick Start

```bash
# Fork dulu di GitHub, lalu:
git clone https://github.com/USERNAME/gorontalo-unite.git
cd gorontalo-unite
npm install
cp .env.example .env.local   # isi nilai environment variables
npm run dev
```

---

## Cara Kerja Proyek

### Tech Stack
| Teknologi | Versi | Catatan |
|---|---|---|
| Next.js | 16.2 | App Router — baca `node_modules/next/dist/docs/` sebelum koding |
| React | 19 | Server Components by default |
| TypeScript | 5 | Strict mode |
| Tailwind CSS | v4 | Breaking change dari v3 — sintaks class berbeda |
| Supabase | JS v2 | Auth + DB + Storage |
| Groq SDK | v1 | LLM inference |

> ⚠️ **Penting:** Next.js 16 dan React 19 punya breaking changes dari versi sebelumnya. Jangan asumsikan pattern lama masih berlaku. Baca dokumentasinya dulu.

---

## Struktur Branch

```
main           ← produksi, auto-deploy ke Vercel
feat/nama      ← fitur baru
fix/nama       ← bug fix
docs/nama      ← perubahan dokumentasi
refactor/nama  ← refactor tanpa fitur baru
```

Tidak ada `develop` branch — semua merge langsung ke `main` setelah review.

---

## Alur Kerja Kontribusi

```
1. Fork → 2. Branch → 3. Kode → 4. Test → 5. PR → 6. Review → 7. Merge
```

### Langkah Detail:

1. **Fork** repository di GitHub
2. **Buat branch** dari `main`:
   ```bash
   git checkout -b feat/nama-fitur
   ```
3. **Kerjakan** perubahan
4. **Test** sebelum commit:
   ```bash
   npx tsc --noEmit          # TypeScript check — harus bersih
   npm run lint              # ESLint
   npm run build             # Build check (opsional tapi sangat dianjurkan)
   ```
5. **Commit** dengan format Conventional Commits:
   ```bash
   git commit -m "feat: tambahkan halaman detail affiliate"
   ```
6. **Push** ke fork kamu dan **buat PR**

---

## Panduan Koding

### Server vs Client Components

```tsx
// ✅ Default — Server Component (lebih efisien, lebih aman)
// Tidak perlu directive apapun
export default async function Page() {
  const data = await fetchFromDB(); // langsung async/await
  return <div>{data.title}</div>;
}

// ✅ Client Component — hanya jika perlu:
// - useState / useEffect
// - event listeners (onClick, onChange, dll)
// - browser API (localStorage, navigator, dll)
"use client";
export default function InteractiveWidget() { ... }
```

### Supabase — Kapan Pakai Client Mana

```ts
// SERVER: page, layout, API route — gunakan admin client
import { createAdminClient } from "@/lib/supabase/admin";
const admin = createAdminClient(); // service role, bypass RLS

// CLIENT: "use client" component — gunakan anon client
import { createClient } from "@/lib/supabase/client";
const supabase = createClient(); // anon key, ikut RLS
```

**Jangan pernah** menggunakan `createAdminClient()` di dalam `"use client"` component — service role key akan ter-expose ke browser.

### Menambah Route Baru

```ts
// src/app/[nama-route]/page.tsx
import type { Metadata } from "next";

// Selalu tambahkan metadata
export const metadata: Metadata = {
  title: "Judul Halaman | Gorontalo Unite",
};

// Params di App Router Next.js 16 adalah Promise
interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params; // selalu await params
  // ...
}
```

### API Routes

```ts
// src/app/api/[nama]/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // untuk endpoint yang berubah-ubah

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await req.json();
  
  // Selalu handle error
  try {
    // logic...
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

---

## Menambah Block Editor Baru

Ikuti langkah ini secara berurutan:

### 1. Daftarkan tipe di `types.ts`

```ts
// src/components/editor/types.ts
export type BlockType =
  | "paragraph" | "heading" | /* ... */
  | "nama-blok-baru"; // ← tambahkan di sini

// Tambahkan di BLOCK_REGISTRY:
{
  type: "nama-blok-baru",
  label: "Nama Blok",
  description: "Deskripsi singkat",
  icon: "🆕",
  defaultContent: "",
  defaultAttrs: { /* default attributes */ },
},
```

### 2. Buat komponen blok

```tsx
// src/components/editor/blocks/NamaBlokBaru.tsx
import type { Block } from "@/components/editor/types";

interface Props {
  block:    Block;
  onChange: (block: Block) => void;
  selected: boolean;
}

export default function NamaBlokBaru({ block, onChange, selected }: Props) {
  // implementasi editor
}
```

### 3. Daftarkan di `BlockCanvas.tsx`

```tsx
// Tambahkan di switch-case render blok
case "nama-blok-baru":
  return <NamaBlokBaru block={block} onChange={update} selected={isSelected} />;
```

### 4. Tambahkan renderer di `BlockRenderer.tsx`

```tsx
// src/components/ui/BlockRenderer.tsx
case "nama-blok-baru": {
  // render untuk frontend (read-only)
  return <div>{/* ... */}</div>;
}
```

---

## Variabel Environment

| Variabel | Diperlukan di | Keterangan |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Browser + Server | URL project Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser + Server | Anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Service role — **jangan expose ke browser** |
| `GROQ_API_KEY` | Server only | Untuk AI chat |
| `TAVILY_API_KEY` | Server only | Untuk web search |
| `NEXT_PUBLIC_SITE_URL` | Browser + Server | URL produksi (untuk canonical URL) |

---

## Database Migration

1. Buat perubahan di Supabase Dashboard → SQL Editor
2. Tes di project Supabase development (jangan langsung production)
3. Dokumentasikan di `CHANGELOG.md` dengan detail:
   - Tabel/kolom yang berubah
   - SQL yang dijalankan
   - Dampak pada kode existing

---

## Panduan Review PR

Saat review PR orang lain, fokus pada:

1. **Correctness** — apakah kode melakukan apa yang dimaksud?
2. **Security** — apakah ada data sensitif yang ter-expose? Input validation?
3. **Performance** — ada query N+1? Komponen yang tidak perlu re-render?
4. **TypeScript** — apakah tipe sudah benar dan ketat?
5. **Konsistensi** — apakah mengikuti pola yang sudah ada di codebase?

---

## File yang Tidak Boleh Diubah

| File | Alasan |
|---|---|
| `.env.local` | Tidak di-commit (ada di `.gitignore`) |
| `CLAUDE.md` / `AGENTS.md` | Instruksi khusus untuk AI agent |
| `src/lib/supabase/*.ts` | Core infrastructure — diskusikan dulu |

---

## Mendapat Akses Admin untuk Testing

Untuk testing fitur admin, kamu perlu akun dengan role `admin` atau `editor` di database.

Hubungi maintainer melalui GitHub Issues/Discussions untuk mendapatkan akses testing di environment development.

---

*Pertanyaan teknis? Buka [GitHub Discussions → Category: Dev](https://github.com/gorontalounite/gorontalo-unite/discussions)*
