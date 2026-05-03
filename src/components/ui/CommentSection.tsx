"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Comment {
  id:         string;
  user_name:  string;
  content:    string;
  created_at: string;
}

interface Props {
  slug:          string;
  allowComments: boolean;
  /** Pass current authed user (server-fetched) so we avoid a client round-trip */
  user: { id: string; name: string } | null;
}

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60)    return "baru saja";
  if (diff < 3600)  return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default function CommentSection({ slug, allowComments, user }: Props) {
  const [comments,  setComments]  = useState<Comment[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [content,   setContent]   = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch(`/api/articles/${encodeURIComponent(slug)}/comments`);
      const json = await res.json() as { comments: Comment[] };
      setComments(json.comments ?? []);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { load(); }, [load]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res  = await fetch(`/api/articles/${encodeURIComponent(slug)}/comments`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ content }),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error ?? "Gagal mengirim komentar"); return; }
      setContent("");
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-12 pt-8 border-t border-gray-100 dark:border-zinc-800">
      <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6">
        Komentar{comments.length > 0 ? ` (${comments.length})` : ""}
      </h2>

      {/* Comment list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 shrink-0" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-3 bg-gray-100 dark:bg-zinc-800 rounded w-24" />
                <div className="h-3 bg-gray-100 dark:bg-zinc-800 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
          Belum ada komentar. Jadilah yang pertama!
        </p>
      ) : (
        <div className="space-y-4 mb-8">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 uppercase">
                {c.user_name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{c.user_name}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{timeAgo(c.created_at)}</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                  {c.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comment form */}
      {!allowComments ? (
        <p className="text-xs text-gray-400 dark:text-gray-500 italic">
          Komentar dinonaktifkan untuk artikel ini.
        </p>
      ) : submitted ? (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
          ✓ Komentar terkirim — menunggu moderasi sebelum tampil.
        </div>
      ) : !user ? (
        <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 px-4 py-4 text-sm text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-3">
            Masuk untuk meninggalkan komentar.
          </p>
          <Link
            href={`/sign-in?redirect=${encodeURIComponent(`/news/${slug}`)}`}
            className="inline-flex items-center gap-1.5 bg-[#2D7D46] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#236137] transition-colors"
          >
            Masuk / Daftar
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0 mt-1 uppercase">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tulis komentar kamu..."
                rows={3}
                maxLength={2000}
                className="w-full text-sm border border-gray-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:border-[#2D7D46] dark:focus:border-emerald-500 resize-none transition-colors"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">{content.length}/2000</span>
                {error && <span className="text-xs text-red-500">{error}</span>}
                <button
                  type="submit"
                  disabled={submitting || !content.trim()}
                  className="text-xs bg-[#2D7D46] text-white font-medium px-4 py-1.5 rounded-lg hover:bg-[#236137] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? "Mengirim…" : "Kirim Komentar"}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </section>
  );
}
