# Gorontalo Unite — Hyperlocal Media & AI Platform

> Platform media hyperlokal berbasis AI untuk Gorontalo. Menggabungkan chatbot AI, portal berita, portofolio, sistem komentar, affiliate, dan knowledge base dalam satu ekosistem terpadu — dengan dashboard admin full-featured dan dukungan PWA.

**Live:** [gorontalounite.id](https://gorontalounite.id) · **Repo:** `main` auto-deploy ke Vercel

[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?logo=supabase)](https://supabase.com/)
[![PWA](https://img.shields.io/badge/PWA-ready-purple?logo=googlechrome)](https://gorontalounite.id)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

---

## Daftar Isi

- [Tech Stack](#tech-stack)
- [Struktur Project](#struktur-project)
- [Fitur yang Sudah Berjalan](#fitur-yang-sudah-berjalan)
- [Database Schema](#database-schema)
- [API Routes](#api-routes)
- [Setup Lokal](#setup-lokal)
- [Environment Variables](#environment-variables)
- [Roadmap & Backlog](#roadmap--backlog)
- [Kontribusi](#kontribusi)

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 16.2 (App Router) + React 19 |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 (class-based dark mode) |
| Backend / DB | Supabase (PostgreSQL + Auth + Storage + RLS) |
| AI / Chat | Groq SDK (LLM inference) + Tavily (web search RAG) |
| Content | Block editor (Gutenberg-style JSON) + Markdown fallback |
| PWA | Service Worker (Cache First / Network First) + Web App Manifest |
| Deployment | Vercel (auto-deploy dari `main`) |

---

## Struktur Project

```
gorontalo-unite/
├── public/
│   ├── icons/                        # PWA icons (16, 32, 192, 512, 180px)
│   ├── og-image.png                  # Open Graph image (1890×1890)
│   ├── favicon.png                   # Root favicon
│   ├── manifest.json                 # PWA manifest (shortcuts, icons, display_override)
│   └── sw.js                         # Service Worker (offline support, push notifications)
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Landing page (AI + media + portfolio)
│   │   ├── layout.tsx                # Root layout, ThemeProvider, Navbar, SW register
│   │   ├── sitemap.ts                # Dynamic sitemap.xml dari DB
│   │   ├── robots.ts                 # robots.txt (disallow /admin, /api, /auth)
│   │   │
│   │   ├── (auth)/                   # Auth group (tanpa Navbar utama)
│   │   │   ├── sign-in/page.tsx      # Login: password + magic link OTP tabs
│   │   │   └── sign-up/page.tsx      # Daftar: dark mode, strength meter, terms
│   │   │
│   │   ├── chat/page.tsx             # /chat — full chat interface
│   │   ├── good-news/
│   │   │   ├── page.tsx              # Server component, fetch DB, featured hero
│   │   │   └── GoodNewsList.tsx      # Client: search, filter, sort, pagination
│   │   ├── news/[id]/page.tsx        # Detail artikel: Schema.org, OG, komentar
│   │   ├── portfolio/page.tsx        # Daftar portofolio
│   │   ├── portfolio/[slug]/page.tsx # Detail karya: Schema.org, komentar
│   │   ├── affiliate/
│   │   │   ├── page.tsx              # Server: fetch, pass ke AffiliateListClient
│   │   │   ├── AffiliateListClient.tsx  # Client: search, filter, sort
│   │   │   └── [id]/
│   │   │       ├── page.tsx          # Detail: commission badge, related, dark mode
│   │   │       └── AffiliateCTAButton.tsx  # Client: click tracking → redirect
│   │   ├── profile/
│   │   │   ├── page.tsx              # Server: auth check, fetch user_profiles
│   │   │   └── ProfileClient.tsx     # Edit nama, role badge, sign out
│   │   ├── about/page.tsx
│   │   ├── shop/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── myrag/page.tsx            # RAG upload tool
│   │   ├── offline/page.tsx          # PWA offline fallback
│   │   │
│   │   ├── admin/                    # Dashboard Admin (role-gated)
│   │   │   ├── layout.tsx            # Sidebar nav, auth + role check
│   │   │   ├── news/                 # Manajemen Berita
│   │   │   │   ├── page.tsx
│   │   │   │   ├── NewsAdminList.tsx # Table: search/filter/sort/paginate
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── edit/[id]/page.tsx  # Editor + CommentModerator
│   │   │   ├── portfolio/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── PortfolioAdminList.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── edit/[id]/page.tsx
│   │   │   ├── affiliate/
│   │   │   ├── knowledge-base/
│   │   │   └── users/                # Manajemen role (user/editor/admin)
│   │   │
│   │   └── api/                      # API Routes
│   │       ├── chat/route.ts         # POST /api/chat — streaming SSE, model fallback
│   │       ├── affiliate/[id]/click/route.ts  # POST click tracking
│   │       ├── admin/articles/route.ts   # CRUD artikel (admin)
│   │       ├── admin/comments/route.ts   # Moderasi komentar (GET/PATCH/DELETE)
│   │       ├── admin/upload/route.ts     # Upload gambar ke Supabase Storage
│   │       ├── articles/[slug]/
│   │       │   ├── view/route.ts     # POST increment view_count
│   │       │   └── comments/route.ts # GET approved + POST komentar baru
│   │       ├── news/latest/route.ts  # GET 5 berita terbaru (public)
│   │       ├── rag/chunk/route.ts    # POST chunk teks ke knowledge_base
│   │       └── rag/upload/route.ts   # POST upload dokumen RAG
│   │
│   ├── components/
│   │   ├── Chat/
│   │   │   ├── ChatContainer.tsx
│   │   │   ├── ChatHeader.tsx
│   │   │   ├── InputBar.tsx
│   │   │   ├── MessageBubble.tsx     # Markdown render, copy, feedback
│   │   │   └── TypingIndicator.tsx
│   │   │
│   │   ├── Landing/
│   │   │   └── LandingPage.tsx
│   │   │
│   │   ├── editor/                   # Gutenberg-style block editor
│   │   │   ├── types.ts              # Block, BlockType, BLOCK_REGISTRY (incl. table, callout)
│   │   │   ├── PostEditor.tsx        # Full shell + undo/redo + autosave + fullscreen
│   │   │   ├── BlockCanvas.tsx       # Blok + drag&drop HTML5 + drop line indicator
│   │   │   ├── BlockInserter.tsx     # Popover pilih tipe blok
│   │   │   ├── EditorSidebar.tsx     # Meta, SEO, kategori, tag, gambar
│   │   │   └── blocks/
│   │   │       ├── ParagraphBlock.tsx  # Rich text + paste cleanup (Docs/Word)
│   │   │       ├── HeadingBlock.tsx
│   │   │       ├── ImageBlock.tsx
│   │   │       ├── GalleryBlock.tsx
│   │   │       ├── ListBlock.tsx
│   │   │       ├── QuoteBlock.tsx
│   │   │       ├── CodeBlock.tsx
│   │   │       ├── EmbedBlock.tsx    # YouTube + URL
│   │   │       ├── TableBlock.tsx    # NEW: editable table, +/- baris/kolom
│   │   │       └── CalloutBlock.tsx  # NEW: info/warning/success/error box
│   │   │
│   │   ├── admin/
│   │   │   └── CommentModerator.tsx  # Moderasi komentar per artikel
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            # Top nav: dark mode, profil, berita
│   │   │   ├── LeftDrawer.tsx
│   │   │   ├── RightPanel.tsx        # 5 berita terbaru (live DB)
│   │   │   ├── ThemeProvider.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── ServiceWorkerRegister.tsx  # PWA SW registration
│   │   │
│   │   └── ui/
│   │       ├── BlockRenderer.tsx     # Render blok JSON (incl. table, callout)
│   │       ├── MarkdownContent.tsx   # Legacy markdown renderer
│   │       ├── ShareButtons.tsx      # Twitter/FB/WA/copy/Web Share API
│   │       ├── RelatedPosts.tsx      # Grid 3 artikel terkait
│   │       ├── ViewTracker.tsx       # Silent view counter
│   │       └── CommentSection.tsx    # Komentar publik (load + submit)
│   │
│   ├── lib/supabase/
│   │   ├── admin.ts                  # Service role client (bypass RLS)
│   │   ├── client.ts                 # Browser client
│   │   └── middleware.ts             # SSR session refresh
│   │
│   └── data/
│       └── mockConversations.ts
│
├── .github/
│   ├── ISSUE_TEMPLATE/               # Bug, Feature, RAG, Dialek
│   └── PULL_REQUEST_TEMPLATE.md
│
├── docs/
│   ├── CONTRIBUTE_RAG.md
│   ├── CONTRIBUTE_DIALECT.md
│   ├── CONTRIBUTE_DEV.md
│   └── COMMUNITY.md
│
├── supabase/
│   └── migrations/                   # SQL migrations & seeds
│       ├── 20260503_affiliate_clicks.sql  # CREATE affiliate_clicks + ALTER affiliate_items
│       └── 20260503_affiliate_seed.sql    # INSERT 30 produk Shopee
│
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── .env.example
└── README.md
```

---

## Fitur yang Sudah Berjalan

### 🤖 AI Chatbot (Gorontalo AI)
- Chat berbasis Groq LLM dengan konteks hyperlokal Gorontalo
- RAG dari tabel `knowledge_base` (vector-style keyword search)
- Tavily web search untuk pertanyaan real-time
- Copy jawaban, feedback 👍/👎, typing indicator
- **Streaming response** — token dikirim real-time via `ReadableStream`, teks muncul bertahap dengan blinking cursor
- **Voice input** — tombol mic Web Speech API (`lang: id-ID`), red pulse saat aktif
- **Bagikan percakapan** — `navigator.share` / clipboard fallback + toast "Disalin"
- **Post-response suggestions** — 3 pertanyaan acak muncul setelah AI menjawab
- **Model fallback** — jika `llama-3.3-70b-versatile` gagal, retry otomatis dengan `mixtral-8x7b-32768`
- Riwayat chat tersimpan di DB per user (tabel `conversations`)

### 📰 Portal Berita (`/good-news`)
- **Featured hero** — artikel trending / artikel terbaru tampil sebagai hero card besar
- **Search real-time** — filter judul saat mengetik
- **Filter kategori** — chip interaktif (Wisata, Budaya, Kuliner, dll)
- **Sort** — Terbaru / Terpopuler (by `view_count`)
- **Pagination** — 12 artikel/halaman dengan ellipsis cerdas
- Thumbnail, kategori badge, tanggal, view count di setiap card

### 📄 Detail Artikel (`/news/:slug`)
- Block content (JSON) atau Markdown fallback (legacy)
- Schema.org JSON-LD (`NewsArticle` / `Article` / `BlogPosting`)
- Full Open Graph + Twitter Card metadata
- Canonical URL, sitemap entry
- Trending 🔥 badge + view count (auto-increment via RPC)
- **Share buttons** — Twitter/X, Facebook, WhatsApp, Web Share API, salin link
- **Related posts** — 3 artikel dari kategori yang sama
- **Sistem komentar** — load, submit, moderasi (lihat bawah)

### 🛍️ Affiliate (`/affiliate`)
- **30 produk Shopee** — kamera, gimbal, lighting, microphone, soundcard, drone, power bank
- Search real-time + filter 10 kategori + sort harga/terbaru
- Detail produk: commission badge, related products (3 sama kategori), dark mode penuh
- **Click tracking** — POST `/api/affiliate/[id]/click` sebelum redirect ke marketplace
- Admin: statistik klik per produk, grid/tabel toggle view

### 🌿 Portofolio (`/portfolio/:slug`)
- Project meta bar: klien, peran, durasi, tanggal, tech stack
- 5 section tabs: Overview, Problem, Solution, Process, Result
- CTA: Live Demo + Repository
- Schema.org `CreativeWork` JSON-LD
- Share buttons, related portfolio, komentar

### 💬 Sistem Komentar
- Komentar membutuhkan login (Supabase Auth)
- Submit dengan status `approved: false` (pending moderasi)
- Hanya komentar approved yang tampil publik (RLS policy)
- Avatar initials, timestamp relative (`timeAgo`)
- Batas 2000 karakter dengan counter
- Login prompt otomatis jika belum sign in
- **Admin moderasi** — panel di `/admin/news/edit/:id` untuk approve/reject/delete

### 🔐 Autentikasi Publik
- **Sign In**: tab Password + Magic Link OTP
- Magic link: kirim email OTP via Supabase Auth, tampilkan state "📧 Cek email kamu!"
- **Sign Up**: dark mode penuh, show/hide password, strength meter (4 bar), terms links
- Google OAuth (sign in + sign up)
- Redirect ke halaman asal setelah login (`?redirect=`)
- **Halaman `/profile`**: edit nama, role badge, shortcut ke admin, sign out

### 🔍 SEO & Structured Data
- `sitemap.xml` otomatis dari DB (berita weekly 0.8, portfolio monthly 0.7)
- `robots.txt` — disallow `/admin/`, `/api/`, `/auth/`
- Schema.org JSON-LD di setiap artikel (type dari DB: `NewsArticle`, `Article`, `BlogPosting`, `CreativeWork`)
- Open Graph + Twitter Card konsisten di semua halaman
- Canonical URL, `metadataBase`, template judul

### 📲 PWA (Progressive Web App)
- `manifest.json` lengkap: nama, warna tema, orientasi, shortcuts (/good-news, /chat)
- Icons: 512×512, 192×192, 180×180 (apple-touch), 32×32, 16×16 — semua dari logo resmi
- `display_override`: `window-controls-overlay` → `standalone` → `browser`
- **Service Worker** (`/sw.js`):
  - Cache First untuk aset statis (CSS/JS/gambar)
  - Network First + cache fallback untuk navigasi
  - Pre-cache: `/`, `/offline`, `/manifest.json`, semua icons
  - Skip `/admin`, `/api`, `/auth` (tidak di-cache)
  - Offline fallback → `/offline`
  - Push notification handler + vibrate
- Halaman `/offline` — UI graceful saat tidak ada koneksi

### 🧑‍💻 Admin Dashboard (`/admin/*`)
Role-gated — hanya `admin` dan `editor`

| Halaman | Fitur |
|---|---|
| `/admin/news` | Tabel: global search, filter kategori/status, sort kolom, paginasi 10/25/50 |
| `/admin/news/new` | Block editor lengkap |
| `/admin/news/edit/:id` | Edit artikel + **CommentModerator** panel (approve/reject/delete) |
| `/admin/portfolio` | Card grid portofolio |
| `/admin/portfolio/new` | Block editor + CPT fields + 5 section tabs |
| `/admin/portfolio/edit/:id` | Edit lengkap |
| `/admin/affiliate` | CRUD produk affiliate + **statistik klik per produk** (grid/tabel toggle) |
| `/admin/knowledge-base` | CRUD entri RAG (tabel + modal) |
| `/admin/users` | Manajemen role pengguna |

### ✏️ Block Editor (Gutenberg-style)
- **Blok:** Paragraph, Heading (H1–H6), Image, Gallery, List (ul/ol), Quote, Code, Divider, Embed, **Table**, **Callout**
- **ParagraphBlock rich text:** Bold, Italic, Underline, Strikethrough, font-size, warna, align, bullet/numbering, insert link, insert image
- **Paste cleanup** — paste dari Google Docs / Word: strip `class`, `style`, `<span>`, `<font>`, `&nbsp;`, comments; pertahankan `<b>/<i>/<u>/<a>/<ul>/<ol>/<li>`
- **Drag & drop** reorder blok — HTML5 Drag API, handle `⠿` di kiri, drop line indicator biru
- **Undo / Redo** — history stack 50 entries, Ctrl+Z / Ctrl+Y, tombol ↩/↪ di TopBar
- **Autosave ke localStorage** — debounce 2s, banner "Muat draft?" saat buka editor dengan draft tersimpan
- **Fullscreen mode** — tombol ⛶ di TopBar, `document.requestFullscreen()` + CSS overlay fallback
- **Block Table** — editable cells (contentEditable), +/- baris/kolom, toggle header row
- **Block Callout** — 4 varian: info (biru) / warning (amber) / success (hijau) / error (merah), icon selector
- **Sidebar:** Status & Visibilitas, Permalink (auto-fill + override), Kategori (preset + custom), Tags, Gambar Unggulan, SEO panel, Diskusi
- **Portfolio section tabs:** 5 section masing-masing punya BlockCanvas sendiri
- Live preview, auto-save indikator

### 🎨 UI/UX
- Dark mode penuh (class-based `dark:`)
- Admin dashboard `force-light` (selalu terang)
- Responsive — mobile, tablet, desktop
- RightPanel — 5 berita terbaru dari DB (live)

---

## Database Schema

### `articles`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid PK | |
| `title` | text | |
| `slug` | text unique | URL identifier |
| `category` | text | Wisata, Budaya, Kuliner, dll |
| `content` | text | Legacy Markdown |
| `blocks` | jsonb | Block editor content (JSON array) |
| `excerpt` | text | Ringkasan |
| `image_url` | text | Hero image |
| `tags` | text[] | |
| `published` | boolean | |
| `published_at` | timestamptz | |
| `view_count` | integer | Auto-increment via RPC |
| `is_trending` | boolean | |
| `allow_comments` | boolean | Toggle komentar per artikel |
| `seo_title` | text | |
| `seo_description` | text | |
| `focus_keyword` | text | |
| `schema_type` | text | `Article` / `NewsArticle` / `BlogPosting` / `CreativeWork` |
| `project_url` | text | CPT: live demo URL |
| `client_name` | text | CPT: nama klien |
| `project_date` | date | CPT: tanggal proyek |
| `role` | text | CPT: peran |
| `repo_url` | text | CPT: URL repo |
| `duration` | text | CPT: durasi |
| `tech_stack` | text[] | CPT: stack teknologi |
| `section_problem` | jsonb | Portfolio: Problem Statement |
| `section_solution` | jsonb | Portfolio: Solution |
| `section_process` | jsonb | Portfolio: Process |
| `section_result` | jsonb | Portfolio: Result/Outcome |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

### `comments`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid PK | |
| `article_id` | uuid FK → articles | |
| `user_id` | uuid FK → auth.users | |
| `user_name` | text | Dari `user_profiles.full_name` |
| `user_email` | text | |
| `content` | text | Max 2000 karakter |
| `approved` | boolean | Default `false`, moderasi admin |
| `created_at` | timestamptz | |

RLS: public SELECT hanya `approved = true`. INSERT hanya user terautentikasi.

### `knowledge_base`
Entri RAG: `id`, `title`, `content`, `category`, `tags`, `source_url`, `is_active`, `created_at`

### `affiliate_items`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid PK | |
| `title` | text | Nama produk |
| `description` | text | Deskripsi panjang |
| `image_url` | text | Gambar produk (CDN Shopee) |
| `price` | numeric | Harga numerik |
| `price_label` | text | Label harga tampil (e.g. "Rp 1.240.000") |
| `marketplace_url` | text | Affiliate link Shopee |
| `marketplace_name` | text | Default "Shopee" |
| `category` | text | Lighting / Gimbal / Kamera / dll |
| `tags` | text[] | Termasuk komisi (e.g. "10%") |
| `published` | boolean | |
| `created_at` | timestamptz | |

### `affiliate_clicks`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid PK | |
| `affiliate_item_id` | uuid FK → affiliate_items | |
| `clicked_at` | timestamptz | |
| `user_agent` | text | Browser UA |

### `user_profiles`
`id` (FK → auth.users), `full_name`, `role` (user / editor / admin)

### SQL Functions
- `increment_view_count(article_slug text)` — atomic view count increment

---

## API Routes

| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/api/chat` | AI chat — streaming SSE, RAG + Tavily, model fallback |
| `GET` | `/api/news/latest` | 5 berita terbaru (public) |
| `POST` | `/api/articles/[slug]/view` | Increment `view_count` |
| `GET` | `/api/articles/[slug]/comments` | List komentar approved (public) |
| `POST` | `/api/articles/[slug]/comments` | Submit komentar baru (auth required) |
| `GET` | `/api/admin/comments` | Semua komentar per artikel (admin) |
| `PATCH` | `/api/admin/comments` | Approve / reject komentar (admin) |
| `DELETE` | `/api/admin/comments` | Hapus komentar (admin) |
| `GET/POST/PUT/DELETE` | `/api/admin/articles` | CRUD artikel (admin) |
| `POST` | `/api/admin/upload` | Upload gambar ke Supabase Storage |
| `POST` | `/api/rag/chunk` | Chunk teks ke knowledge_base |
| `POST` | `/api/rag/upload` | Upload dokumen RAG |
| `POST` | `/api/affiliate/[id]/click` | Catat klik ke marketplace (affiliate_clicks) |

---

## Setup Lokal

```bash
# 1. Clone & install
git clone https://github.com/gorontalounite/gorontalo-unite.git
cd gorontalo-unite
npm install

# 2. Copy env
cp .env.example .env.local
# Edit .env.local — isi semua variabel

# 3. Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

> **Catatan:** Service Worker hanya aktif di production (`https://`). Di localhost dev mode, PWA features tidak akan terdaftar.

### Setup Database (Supabase)

Jalankan migration berikut di Supabase SQL Editor (Dashboard → SQL Editor):

```sql
-- 1. Buat tabel & kolom baru
-- Salin isi dari: supabase/migrations/20260503_affiliate_clicks.sql

-- 2. Seed 30 produk affiliate Shopee
-- Salin isi dari: supabase/migrations/20260503_affiliate_seed.sql
```

Atau gunakan Supabase CLI:
```bash
supabase db push
```

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# AI
GROQ_API_KEY=gsk_...
TAVILY_API_KEY=tvly-...

# App
NEXT_PUBLIC_SITE_URL=https://gorontalounite.id
```

Lihat `.env.example` untuk detail lengkap.

---

## Roadmap & Backlog

### ✅ Sudah Selesai (v0.1 – v0.6)

| Versi | Fitur |
|---|---|
| v0.1 | Landing page, AI chatbot (Groq + RAG + Tavily), portal berita, portofolio |
| v0.2 | Admin dashboard, block editor (Gutenberg-style), dark mode, CRUD artikel |
| v0.3 | Share buttons, related posts, view tracker, admin table upgrade, CPT portfolio |
| v0.4 | Rich text editor, slug auto-fill, custom category, SEO panel, portfolio sections |
| v0.5 | Sistem komentar + moderasi, auth polish (magic link, profile), Schema.org JSON-LD, SEO (sitemap/robots/canonical), `/good-news` upgrade, PWA penuh, sign-up dark mode |
| v0.6 | **Affiliate upgrade** (30 produk, search/filter/sort, click tracking, admin stats) · **AI streaming** (SSE, voice input, share, model fallback) · **Block editor lanjutan** (drag&drop, undo/redo, autosave, table block, callout block, paste cleanup, fullscreen) |

---

### 🔴 PRIORITAS TINGGI

#### 1. Halaman `/portfolio` Upgrade
- Filter by stack (`web-design`, `programming`, `data`, dll)
- Animasi masuk card (fade in / slide up)
- Lightbox untuk galeri gambar
- Statistik di hero section (jumlah proyek, klien, total stack)

#### 2. Analytics Dashboard Admin
- Halaman `/admin/analytics`
- Grafik view count per artikel (7 / 30 hari) dengan chart
- Artikel terpopuler & konten trending
- Statistik chat AI (jumlah pertanyaan per hari)
- Sumber traffic / referrer

#### 3. Notifikasi Real-time
- Toast notification setelah simpan artikel (admin)
- Email notifikasi ke admin saat ada komentar baru (Supabase Edge Function)
- Real-time counter view (Supabase Realtime subscription)

#### 4. Rate Limiting & API Security
- `/api/chat` — rate limit per IP (Vercel Edge Middleware atau Upstash Redis)
- `/api/articles/[slug]/comments` POST — anti-spam (min interval antar submit)
- CSRF protection untuk mutation endpoints

---

### 🟡 PRIORITAS MENENGAH

#### 5. Halaman `/shop` Fungsional
- Saat ini hanya placeholder
- Integrasi dengan `affiliate_items` atau tabel produk terpisah
- Checkout via WhatsApp / link marketplace
- Kategori produk lokal Gorontalo

---

### 🟢 PRIORITAS RENDAH / NICE-TO-HAVE

#### 9. MyRAG Tool (`/myrag`) — Lanjutan
- UI lengkap: upload dokumen, preview chunks yang dihasilkan
- Hapus / edit entri knowledge base dari UI
- Statistik: berapa entri aktif, kapan terakhir diupdate
- Support format: PDF, DOCX, TXT, URL

#### 10. Multi-bahasa (i18n)
- Bahasa Indonesia (default, sudah ada)
- Bahasa Inggris (toggle)
- **Bahasa Gorontalo / Hulontalo** — menggunakan kontribusi dialek dari komunitas

#### 11. Push Notification Upgrade
- Service Worker sudah ada handler-nya — tinggal wire ke Supabase/FCM
- Notifikasi: artikel baru terbit, komentar dibalas
- Opt-in UI di halaman profil pengguna

#### 12. PWA Install Prompt
- Custom "Install App" banner di mobile (saat ini hanya otomatis dari browser)
- Onboarding singkat saat pertama install

#### 13. Sistem Favorit / Bookmarks
- Pengguna bisa menyimpan artikel favorit
- Tabel `favorites` (`user_id`, `article_id`, `created_at`)
- Halaman `/profile` menampilkan daftar favorit
- Toggle ❤️ di setiap artikel

#### 14. Multi-Author Support
- Tabel `authors` terpisah dengan bio, foto, sosial media
- Satu artikel bisa punya author berbeda dari `admin`
- Halaman `/author/:slug` — daftar artikel per penulis

---

### 🔧 TECHNICAL DEBT

| Item | Detail |
|---|---|
| **Image optimization** | Beberapa `<img>` masih tag biasa, bukan `next/image`; affiliate CDN pakai `unoptimized` |
| **Error boundaries** | Belum ada React Error Boundary untuk blok editor |
| **API auth middleware** | `/api/admin/*` validasi role masih per-route, belum terpusat |
| **Test coverage** | Belum ada unit test / integration test |
| **Stale files** | `GoodNewsClient.tsx`, `PortfolioAdminClient.tsx` mungkin sudah tidak dipakai — perlu audit |
| **SW update flow** | Service worker update (skipWaiting) belum ada UI "versi baru tersedia, reload?" |
| **Comment pagination** | Komentar load semua sekaligus, belum ada pagination |
| **Affiliate seed** | 30 produk seed via SQL migration — perlu dijalankan manual di Supabase dashboard |
| **Streaming error handling** | Jika stream terputus di tengah, UI perlu fallback yang lebih graceful |
| **Table block a11y** | `contentEditable` pada `<td>` belum punya keyboard nav antar sel |

---

## Kontribusi

Gorontalo Unite terbuka untuk kontribusi dari siapa saja — terutama masyarakat Gorontalo!

- 🐛 **Laporkan bug** → [Issue: Bug Report](../../issues/new?template=bug_report.yml)
- 💡 **Usulkan fitur** → [Issue: Feature Request](../../issues/new?template=feature_request.yml)
- 📚 **Kontribusi data RAG** (tanpa coding) → [Issue: RAG Knowledge](../../issues/new?template=rag_knowledge.yml)
- 🗣️ **Kontribusi dialek Gorontalo** → [Issue: Dialek Data](../../issues/new?template=dialect_data.yml)
- 👨‍💻 **Ikut ngoding** → Baca [CONTRIBUTING.md](./CONTRIBUTING.md)

Lihat juga: [docs/COMMUNITY.md](./docs/COMMUNITY.md)

---

*Diperbarui: Mei 2026 · v0.6*
