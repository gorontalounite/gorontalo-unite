# Gorontalo Unite — Hyperlocal Media & AI Platform

> Platform media hyperlokal berbasis AI untuk Gorontalo. Menggabungkan chatbot AI, portal berita, portofolio, affiliate, dan knowledge base dalam satu ekosistem terpadu dengan dashboard admin full-featured.

**Live:** [gorontalounite.id](https://gorontalounite.id) · **Repo:** `main` auto-deploy ke Vercel

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

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 16.2 (App Router) + React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (class-based dark mode) |
| Backend / DB | Supabase (PostgreSQL + Auth + Storage + RLS) |
| AI / Chat | Groq SDK (LLM inference) + Tavily (web search RAG) |
| Content | Markdown via `react-markdown` |
| Deployment | Vercel (auto-deploy dari `main`) |

---

## Struktur Project

```
gorontalo-unite/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Landing page (AI + media + portfolio)
│   │   ├── layout.tsx                # Root layout, ThemeProvider, Navbar
│   │   │
│   │   ├── (auth)/                   # Auth group (tanpa layout utama)
│   │   │   ├── sign-in/page.tsx
│   │   │   └── sign-up/page.tsx
│   │   │
│   │   ├── chat/page.tsx             # /chat — full chat interface
│   │   ├── good-news/page.tsx        # /good-news — portal berita
│   │   ├── news/[id]/page.tsx        # /news/:slug — detail artikel
│   │   ├── portfolio/page.tsx        # /portfolio — daftar portofolio
│   │   ├── portfolio/[slug]/page.tsx # /portfolio/:slug — detail karya
│   │   ├── affiliate/page.tsx        # /affiliate — produk UMKM/affiliate
│   │   ├── affiliate/[id]/page.tsx   # /affiliate/:id — detail produk
│   │   ├── about/page.tsx            # /about
│   │   ├── shop/page.tsx             # /shop
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── myrag/page.tsx            # /myrag — RAG upload tool
│   │   │
│   │   ├── admin/                    # Dashboard Admin (role-gated)
│   │   │   ├── layout.tsx            # Sidebar nav, auth + role check
│   │   │   ├── news/                 # Manajemen Berita
│   │   │   │   ├── page.tsx
│   │   │   │   ├── NewsAdminList.tsx # Advanced table (filter/sort/paginate)
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── edit/[id]/page.tsx
│   │   │   ├── portfolio/            # Manajemen Portofolio (CPT)
│   │   │   │   ├── page.tsx
│   │   │   │   ├── PortfolioAdminList.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── edit/[id]/page.tsx
│   │   │   ├── affiliate/            # Manajemen Produk Affiliate
│   │   │   │   ├── page.tsx
│   │   │   │   └── AffiliateAdminClient.tsx
│   │   │   ├── knowledge-base/       # Manajemen RAG Knowledge Base
│   │   │   │   ├── page.tsx
│   │   │   │   └── KnowledgeBaseClient.tsx
│   │   │   └── users/                # Manajemen Pengguna & Role
│   │   │       ├── page.tsx
│   │   │       └── UsersClient.tsx
│   │   │
│   │   └── api/                      # API Routes
│   │       ├── chat/route.ts         # POST /api/chat — Groq + RAG
│   │       ├── admin/articles/route.ts  # CRUD artikel (admin)
│   │       ├── admin/upload/route.ts    # POST upload gambar ke Supabase Storage
│   │       ├── articles/[slug]/view/route.ts  # POST increment view_count
│   │       ├── news/latest/route.ts  # GET 5 berita terbaru (public)
│   │       ├── rag/chunk/route.ts    # POST chunk teks ke knowledge_base
│   │       └── rag/upload/route.ts   # POST upload dokumen RAG
│   │
│   ├── components/
│   │   ├── Chat/
│   │   │   ├── ChatContainer.tsx     # Main chat UI
│   │   │   ├── ChatHeader.tsx
│   │   │   ├── InputBar.tsx
│   │   │   ├── MessageBubble.tsx     # Markdown render, copy, feedback
│   │   │   └── TypingIndicator.tsx
│   │   │
│   │   ├── Landing/
│   │   │   └── LandingPage.tsx       # Hero, AI CTA, berita, portofolio
│   │   │
│   │   ├── editor/                   # Gutenberg-style block editor
│   │   │   ├── types.ts              # Block, BlockType, BLOCK_REGISTRY
│   │   │   ├── PostEditor.tsx        # Full editor shell (TopBar + Canvas + Sidebar)
│   │   │   ├── BlockCanvas.tsx       # Daftar blok + drag-free reorder
│   │   │   ├── BlockInserter.tsx     # Popover pilih tipe blok
│   │   │   ├── EditorSidebar.tsx     # Meta, SEO, kategori, tag, gambar
│   │   │   └── blocks/
│   │   │       ├── ParagraphBlock.tsx  # Rich text (B/I/U/size/color/link/image)
│   │   │       ├── HeadingBlock.tsx
│   │   │       ├── ImageBlock.tsx
│   │   │       ├── GalleryBlock.tsx
│   │   │       ├── ListBlock.tsx
│   │   │       ├── QuoteBlock.tsx
│   │   │       ├── CodeBlock.tsx
│   │   │       └── EmbedBlock.tsx    # YouTube embed + URL link
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            # Top nav, dark mode toggle
│   │   │   ├── LeftDrawer.tsx        # Mobile sidebar
│   │   │   ├── RightPanel.tsx        # Panel kanan — 5 berita terbaru (live DB)
│   │   │   ├── ThemeProvider.tsx
│   │   │   └── ThemeToggle.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── BlockRenderer.tsx     # Render blok JSON ke HTML (frontend)
│   │   │   ├── MarkdownContent.tsx   # Legacy markdown renderer
│   │   │   ├── ShareButtons.tsx      # Twitter/FB/WA/copy/Web Share API
│   │   │   ├── RelatedPosts.tsx      # Grid 3 artikel terkait
│   │   │   └── ViewTracker.tsx       # Silent view counter (client)
│   │   │
│   │   └── SidebarNews.tsx           # Sidebar berita (desktop)
│   │
│   ├── lib/supabase/
│   │   ├── admin.ts                  # Service role client (bypass RLS)
│   │   ├── client.ts                 # Browser client
│   │   └── middleware.ts             # SSR session refresh
│   │
│   └── data/
│       └── mockConversations.ts      # Contoh percakapan AI (demo)
│
├── CLAUDE.md / AGENTS.md             # Instruksi untuk AI agent
├── README.md                         # Dokumen ini
└── package.json
```

---

## Fitur yang Sudah Berjalan

### 🤖 AI Chatbot (Gorontalo AI)
- Chat berbasis Groq LLM dengan konteks hyperlokal Gorontalo
- RAG (Retrieval-Augmented Generation) dari `knowledge_base` tabel
- Tavily web search untuk pertanyaan yang butuh data terkini
- Copy jawaban, feedback 👍/👎 per pesan
- Typing indicator, chat history di localStorage
- Responsif mobile-first

### 📰 Portal Berita
- Halaman `/good-news` — daftar artikel (filter, thumbnail)
- Halaman `/news/:slug` — detail artikel lengkap dengan:
  - Block content (JSON) atau Markdown fallback (legacy)
  - Trending 🔥 badge & view count
  - **Share buttons** (Twitter/X, Facebook, WhatsApp, Web Share API, salin link)
  - **Related posts** — 3 artikel dari kategori yang sama
  - **View tracker** — auto-increment `view_count` saat halaman dibuka
  - Open Graph metadata (judul, deskripsi, gambar)
- Kategori: Wisata, Budaya, Kuliner, Pendidikan, Ekonomi, Kesehatan, Good News, Umum

### 🌿 Portofolio (Custom Post Type)
- Halaman `/portfolio` — card grid
- Halaman `/portfolio/:slug` — detail dengan:
  - Project meta bar (klien, peran, durasi, tanggal, tech stack)
  - CTA: Live Demo + Repository
  - Trending badge & view count
  - Share buttons & related portfolio items
  - Block content + legacy Markdown + gallery + FAQ

### 🛍️ Affiliate
- Halaman `/affiliate` — grid produk UMKM lokal
- Detail produk dengan link ke marketplace

### 🧑‍💻 Admin Dashboard (`/admin/*`)
Role-gated — hanya `admin` dan `editor`

| Halaman | Fitur |
|---|---|
| `/admin/news` | Tabel artikel — global search, filter kategori/status, sort kolom, paginasi 10/25/50, delete konfirmasi |
| `/admin/news/new` | Block editor lengkap |
| `/admin/news/edit/:id` | Edit artikel dengan semua blok & metadata |
| `/admin/portfolio` | Card grid portofolio |
| `/admin/portfolio/new` | Block editor + CPT fields + section tabs |
| `/admin/portfolio/edit/:id` | Edit lengkap + 4 section tabs |
| `/admin/affiliate` | CRUD produk affiliate (modal form) |
| `/admin/knowledge-base` | CRUD entri RAG (tabel + modal) |
| `/admin/users` | Manajemen role pengguna (user/editor/admin) |

### ✏️ Block Editor (Gutenberg-style)
- **Tipe blok:** Paragraph, Heading (H1–H6), Image, Gallery, List (ul/ol), Quote, Code, Divider, Embed (YouTube + URL)
- **ParagraphBlock rich text:** Bold, Italic, Underline, Strikethrough, font-size, warna teks, align (L/C/R), bullet/numbering, insert link, insert image (upload + URL)
- **Sidebar panels:** Status & Visibilitas, Permalink (slug auto-fill + manual override), Kategori (preset + tambah custom), Tags (chip input), Gambar Unggulan, Ringkasan, Detail Proyek (CPT), Diskusi, SEO (meta title, meta desc, focus keyword, schema type)
- **Portfolio section tabs:** Overview, Problem Statement, Solution, Process, Result/Outcome — masing-masing punya BlockCanvas sendiri
- **Live preview** toggle
- Auto-save indikator

### 🎨 UI/UX
- Dark mode penuh (class-based `dark:` prefix)
- Admin dashboard: `force-light` class (selalu terang)
- Responsive — mobile, tablet, desktop
- RightPanel — menampilkan 5 berita terbaru dari DB (live)

---

## Database Schema

Tabel utama di Supabase:

### `articles`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid PK | |
| `title` | text | |
| `slug` | text unique | URL-friendly identifier |
| `category` | text | Wisata, Budaya, Portfolio, dll |
| `content` | text | Legacy Markdown content |
| `blocks` | jsonb | Block editor content (JSON array) |
| `excerpt` | text | Ringkasan |
| `image_url` | text | Hero image |
| `tags` | text[] | Array tag |
| `published` | boolean | |
| `published_at` | timestamptz | |
| `view_count` | integer | Auto-increment via RPC |
| `is_trending` | boolean | |
| `allow_comments` | boolean | |
| `seo_title` | text | |
| `seo_description` | text | |
| `focus_keyword` | text | |
| `schema_type` | text | Article / NewsArticle / BlogPosting / CreativeWork |
| `project_url` | text | CPT: URL live demo |
| `client_name` | text | CPT: nama klien |
| `project_date` | date | CPT: tanggal proyek |
| `role` | text | CPT: peran |
| `repo_url` | text | CPT: URL repo |
| `duration` | text | CPT: durasi proyek |
| `tech_stack` | text[] | CPT: stack teknologi |
| `section_problem` | jsonb | Portfolio: Problem Statement blocks |
| `section_solution` | jsonb | Portfolio: Solution blocks |
| `section_process` | jsonb | Portfolio: Process blocks |
| `section_result` | jsonb | Portfolio: Result/Outcome blocks |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

### `knowledge_base`
Entri RAG untuk AI chatbot: `id`, `title`, `content`, `category`, `tags`, `source_url`, `is_active`, `created_at`

### `affiliate_items`
Produk affiliate: `id`, `title`, `description`, `image_url`, `price`, `price_label`, `marketplace_url`, `marketplace_name`, `tags`, `published`, `created_at`

### `user_profiles`
Profile pengguna: `id` (FK → auth.users), `full_name`, `role` (user/editor/admin)

### SQL Functions
- `increment_view_count(article_slug text)` — atomic view count increment

---

## API Routes

| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/api/chat` | AI chat (Groq + RAG + Tavily) |
| `GET` | `/api/news/latest` | 5 berita terbaru (public) |
| `POST` | `/api/articles/[slug]/view` | Increment view_count |
| `GET/POST/PUT/DELETE` | `/api/admin/articles` | CRUD artikel (admin only) |
| `POST` | `/api/admin/upload` | Upload gambar ke Supabase Storage |
| `POST` | `/api/rag/chunk` | Chunk teks ke knowledge_base |
| `POST` | `/api/rag/upload` | Upload dokumen RAG |

---

## Setup Lokal

```bash
# 1. Clone & install
git clone https://github.com/gorontalounite/gorontalo-unite.git
cd gorontalo-unite
npm install

# 2. Copy env
cp .env.example .env.local
# Isi semua variabel (lihat bagian Environment Variables)

# 3. Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

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

---

## Roadmap & Backlog

Semua item di bawah adalah **belum dikerjakan** dan siap untuk sprint berikutnya.

---

### 🔴 PRIORITAS TINGGI

#### 1. Sistem Komentar
- Tabel `comments` di Supabase: `id`, `article_id`, `user_id`, `content`, `approved`, `created_at`
- Backend: API `/api/articles/[slug]/comments` (GET list + POST submit)
- Frontend: `CommentSection` component di `/news/:slug` dan `/portfolio/:slug`
- Admin: moderasi komentar (approve/reject) di `/admin/news/edit/:id`
- Toggle per-artikel via `allow_comments` (sudah ada di schema)

#### 2. Autentikasi Publik yang Lengkap
- Halaman `/sign-in` dan `/sign-up` sudah ada tapi perlu UX polish
- Email OTP / magic link (Supabase Auth)
- Redirect setelah login ke halaman asal (`?redirect=`)
- "Profil Saya" — halaman user bisa edit nama, foto profil
- Protected route untuk fitur yang butuh login (komentar, favorit)

#### 3. Schema.org Structured Data
- Inject `<script type="application/ld+json">` di `<head>` artikel
- Support tipe: `Article`, `NewsArticle`, `BlogPosting`, `CreativeWork`
- Field sudah ada di DB (`schema_type`, `focus_keyword`)
- Implementasi di `generateMetadata()` atau komponen `StructuredData`

#### 4. SEO On-Page Lanjutan
- Sitemap XML otomatis (`/sitemap.xml`) dari DB
- Robots.txt yang tepat
- Canonical URL di setiap halaman
- Breadcrumb schema markup
- Open Graph + Twitter Card yang konsisten di semua halaman

---

### 🟡 PRIORITAS MENENGAH

#### 5. Halaman `/good-news` yang Lebih Kaya
- Infinite scroll atau pagination
- Filter kategori yang interaktif (tab / chip)
- Search bar real-time
- Sort: terbaru / terpopuler (by `view_count`)
- Trending section (artikel dengan `is_trending = true`)
- Featured article (hero card besar di atas)

#### 6. Halaman `/portfolio` Upgrade
- Filter by stack (`stack:web-design`, `stack:programming`, dll)
- Animasi masuk card (fade in / slide up)
- Lightbox untuk galeri gambar
- Statistik portofolio (jumlah proyek, klien, dll) di hero section

#### 7. Notifikasi & Real-time
- Toast notification setelah simpan artikel di admin
- Real-time update counter view (Supabase Realtime)
- Email notifikasi ke admin saat ada komentar baru

#### 8. Halaman Affiliate Upgrade
- Filter by kategori / marketplace
- Search produk
- `affiliate/[id]` detail page yang lebih kaya
- Tracking klik ke marketplace (tabel `affiliate_clicks`)
- Integrasi manual komisi / statistik

#### 9. Analytics Dashboard Admin
- Halaman `/admin/analytics`
- Grafik view count per artikel (7/30 hari)
- Artikel terpopuler
- Statistik chat (jumlah pertanyaan per hari)
- Sumber traffic (referrer)

---

### 🟢 PRIORITAS RENDAH / NICE-TO-HAVE

#### 10. AI Chat Upgrade
- Streaming response (Server-Sent Events) — saat ini response tunggu full
- Suggest pertanyaan berdasarkan topik populer
- "Bagikan percakapan" — generate shareable URL
- Voice input (Web Speech API)
- Riwayat chat tersimpan di DB (per user, bukan hanya localStorage)
- Model fallback: jika Groq down, switch ke alternatif

#### 11. Editor Block Lanjutan
- Drag & drop reorder blok (saat ini hanya ↑/↓ button)
- Undo/redo (Ctrl+Z/Y)
- Autosave ke localStorage (draft lokal)
- Block `table` — tabel HTML sederhana
- Block `callout` — info/warning/success box
- Paste dari Google Docs / Word (cleanup HTML)
- Full-screen mode editor

#### 12. Multi-bahasa (i18n)
- Bahasa Indonesia (default, sudah ada)
- Bahasa Inggris (toggle)
- Potensi: Bahasa Gorontalo / Hulontalo

#### 13. PWA (Progressive Web App)
- `manifest.json` dengan ikon
- Service Worker untuk offline cache
- "Install App" prompt di mobile
- Push notification (berita terbaru)

#### 14. Halaman `/shop` yang Fungsional
- Saat ini hanya placeholder
- Integrasi dengan `affiliate_items` atau tabel produk terpisah
- Checkout via WhatsApp / link marketplace

#### 15. MyRAG Tool (`/myrag`)
- UI untuk upload dokumen ke knowledge base
- Preview chunks yang dihasilkan
- Hapus / edit entri dari UI
- Statistik: berapa banyak entri aktif

---

### 🔧 TECHNICAL DEBT

| Item | Detail |
|---|---|
| **Drag & drop editor** | Blok hanya bisa dipindah dengan tombol ↑/↓ |
| **Image optimization** | Beberapa `<img>` masih pakai tag biasa, bukan `next/image` |
| **Error boundaries** | Belum ada React Error Boundary untuk blok editor |
| **Rate limiting** | `/api/chat` belum ada rate limit (bisa di-abuse) |
| **API auth middleware** | `/api/admin/*` validasi role masih sederhana |
| **Test coverage** | Belum ada unit test / integration test |
| **Stale files** | `ArticlesClient.tsx`, `GoodNewsClient.tsx`, `PortfolioAdminClient.tsx` sudah tidak dipakai (redirect ke `/admin/news`) |
| **`.env.example`** | Belum ada file ini di repo |

---

*Dokumen ini diperbarui terakhir: Mei 2026*
