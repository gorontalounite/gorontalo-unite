# Gorontalo Unite — Mediahub Hyperlocal

Chat UI News Platform untuk Gorontalo, didukung AI hyperlocal.

## Setup

```bash
npm install && npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Deployment

Auto-deploy ke Vercel dari branch `main`.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (backend — akan diintegrasikan)

## Struktur Project

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage (Chat UI)
│   ├── chat/               # /chat — advanced chat
│   ├── good-news/          # /good-news — berita positif
│   ├── shop/               # /shop — produk UMKM lokal
│   ├── about/              # /about — tentang kami
│   └── news/[id]/          # /news/:id — detail artikel
├── components/
│   ├── Chat/               # ChatContainer, MessageBubble, InputBar, dll
│   ├── layout/             # Navbar
│   └── SidebarNews.tsx     # Featured news sidebar
└── data/
    └── mockConversations.ts # Mock data (12 percakapan Gorontalo)
```

## Fitur

- 🤖 **Gorontalo AI Chatbot** — tanya apapun tentang Gorontalo
- 💬 **Chat history** — tersimpan di localStorage
- 👍👎 **Feedback** — per jawaban AI
- 📋 **Copy to clipboard** — salin jawaban
- ⌨️ **Typing indicator** — animasi saat AI "berpikir"
- 📰 **SidebarNews** — berita terkini di desktop
- 📱 **Responsive** — mobile-first (375px+)

## Roadmap

- [ ] Supabase integration
- [ ] Real news data pipeline
- [ ] User authentication
- [ ] Feedback analytics
- [ ] Voice input
- [ ] Dark mode toggle
- [ ] Share conversation via link
