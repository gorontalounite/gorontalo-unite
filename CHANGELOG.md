# Changelog

Semua perubahan penting pada proyek ini dicatat di sini.  
Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

Lihat [README → Roadmap & Backlog](./README.md#roadmap--backlog) untuk daftar lengkap yang akan dikerjakan.

---

## [0.5.0] — 2026-05-03

### Added
- **ShareButtons** — Twitter/X, Facebook, WhatsApp, Web Share API (mobile), salin link
- **RelatedPosts** — grid 3 artikel dari kategori yang sama di bawah konten
- **ViewTracker** — client component yang auto-increment `view_count` saat halaman dibuka
- **API `POST /api/articles/[slug]/view`** — memanggil `increment_view_count` RPC
- Trending 🔥 badge di halaman detail berita dan portofolio
- View count display di detail artikel
- Open Graph `image` metadata di berita dan portofolio
- Admin spacing: `p-6` wrapper di Affiliate, KnowledgeBase, Users client

### Changed
- `/news/:slug` — tambah ViewTracker, ShareButtons, RelatedPosts, trending badge
- `/portfolio/:slug` — sama dengan atas + related items difilter by stack tag
- `NewsAdminList` — rewrite menjadi advanced filterable table (global search, filter kategori/status, sort kolom, paginasi 10/25/50, smart ellipsis)

---

## [0.4.0] — 2026-05-02

### Added
- **Block editor (Gutenberg-style)** — `PostEditor`, `BlockCanvas`, `BlockInserter`, `EditorSidebar`
- **8 tipe blok** — Paragraph (rich text), Heading, Image, Gallery, List, Quote, Code, Embed
- **ParagraphBlock rich text** — Bold, Italic, Underline, Strikethrough, font-size, warna, align, link, image, bullet/numbering
- **EditorSidebar** — Status/visibility, permalink (auto-fill + manual), kategori custom, tags, gambar unggulan, SEO (meta title, desc, focus keyword, schema type), detail proyek CPT, diskusi toggle
- **Portfolio section tabs** — Overview, Problem Statement, Solution, Process, Result/Outcome
- **Live preview** toggle di editor
- `/admin/news` — halaman manajemen berita tunggal (menggantikan Articles + Good News)
- `/admin/news/new` dan `/admin/news/edit/:id`
- `/admin/portfolio/new` dan `/admin/portfolio/edit/:id`
- **RightPanel** berita terbaru dari DB (live, sebelumnya mock data)
- API `GET /api/news/latest` — 5 berita terbaru publik

### Changed
- `/admin/articles` → redirect ke `/admin/news`
- `/admin/good-news` → redirect ke `/admin/news`
- Admin sidebar: Articles & Good News dihapus, diganti satu item "Berita"
- `BlockRenderer` — deteksi HTML content via regex, `dangerouslySetInnerHTML` untuk rich text paragraf

### Database Migrations
- Tambah kolom: `blocks` (jsonb), `seo_title`, `seo_description`, `project_url`, `client_name`, `project_date`, `role`, `repo_url`, `duration`, `tech_stack` (text[])
- Tambah kolom: `view_count` (int default 0), `is_trending` (bool), `allow_comments` (bool), `focus_keyword`, `schema_type` (default 'Article')
- Tambah kolom: `section_problem`, `section_solution`, `section_process`, `section_result` (jsonb)
- SQL function: `increment_view_count(article_slug text)`
- GIN index pada kolom `blocks`

---

## [0.3.0] — 2026-04 (estimasi)

### Added
- Dark mode penuh (class-based `dark:`, ThemeProvider, ThemeToggle)
- Landing page redesign — hero AI, latest news, portfolio grid
- Admin dashboard dengan role-based access (admin/editor)
- Portofolio CPT — `stack:*` tags, meta bar (klien, peran, durasi, tech stack)
- Halaman detail portofolio — gallery, FAQ, CTA button live demo + repo
- `MarkdownContent` component — render konten legacy Markdown
- Upload gambar ke Supabase Storage via `/api/admin/upload`

### Changed
- Supabase: semua query admin menggunakan service role key (bypass RLS)
- Auth: redirect ke `/admin/news` setelah login

---

## [0.2.0] — 2026-03 (estimasi)

### Added
- Supabase integration — database, auth, storage
- Tabel `articles`, `knowledge_base`, `affiliate_items`, `user_profiles`
- Admin CRUD untuk artikel, knowledge base, affiliate
- Manajemen user & role
- RAG pipeline: `/api/rag/chunk`, `/api/rag/upload`

---

## [0.1.0] — 2026-02 (estimasi)

### Added
- Initial project setup — Next.js 16, TypeScript, Tailwind CSS v4
- AI Chatbot (Groq + Tavily RAG)
- Portal berita `/good-news`
- Halaman chat `/chat`
- Mock conversations data
- Navbar, SidebarNews, responsive layout
