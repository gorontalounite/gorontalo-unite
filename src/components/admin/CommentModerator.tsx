"use client";

import { useState, useEffect, useCallback } from "react";

interface Comment {
  id:         string;
  user_name:  string;
  user_email: string | null;
  content:    string;
  approved:   boolean;
  created_at: string;
}

export default function CommentModerator({ articleId }: { articleId: string }) {
  const [comments, setComments]  = useState<Comment[]>([]);
  const [loading,  setLoading]   = useState(true);
  const [busy,     setBusy]      = useState<string | null>(null); // id being actioned

  const load = useCallback(async () => {
    setLoading(true);
    const res  = await fetch(`/api/admin/comments?article_id=${articleId}`);
    const json = await res.json() as { comments: Comment[] };
    setComments(json.comments ?? []);
    setLoading(false);
  }, [articleId]);

  useEffect(() => { load(); }, [load]);

  const approve = async (id: string, approved: boolean) => {
    setBusy(id);
    await fetch("/api/admin/comments", {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ id, approved }),
    });
    setComments((prev) => prev.map((c) => c.id === id ? { ...c, approved } : c));
    setBusy(null);
  };

  const remove = async (id: string) => {
    setBusy(id);
    await fetch("/api/admin/comments", {
      method:  "DELETE",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ id }),
    });
    setComments((prev) => prev.filter((c) => c.id !== id));
    setBusy(null);
  };

  const pending   = comments.filter((c) => !c.approved);
  const approved  = comments.filter((c) =>  c.approved);

  if (loading) {
    return <div className="text-xs text-gray-400 py-4">Memuat komentar…</div>;
  }

  if (comments.length === 0) {
    return (
      <div className="text-sm text-gray-400 py-4 text-center">
        Belum ada komentar untuk artikel ini.
      </div>
    );
  }

  const Row = ({ c }: { c: Comment }) => (
    <div key={c.id} className={`rounded-xl border p-3 text-sm space-y-1.5 ${
      c.approved
        ? "border-emerald-100 bg-emerald-50/50"
        : "border-amber-100 bg-amber-50/50"
    }`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-semibold text-gray-900 truncate">{c.user_name}</span>
          {c.user_email && (
            <span className="text-xs text-gray-400 truncate hidden sm:inline">{c.user_email}</span>
          )}
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ${
            c.approved
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}>
            {c.approved ? "Approved" : "Pending"}
          </span>
        </div>
        <span className="text-xs text-gray-400 shrink-0">
          {new Date(c.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      </div>

      <p className="text-gray-700 leading-relaxed text-xs whitespace-pre-wrap">{c.content}</p>

      <div className="flex items-center gap-2 pt-1">
        {!c.approved && (
          <button
            disabled={busy === c.id}
            onClick={() => approve(c.id, true)}
            className="text-xs bg-emerald-500 text-white px-2.5 py-1 rounded-lg hover:bg-emerald-600 disabled:opacity-50"
          >
            ✓ Setujui
          </button>
        )}
        {c.approved && (
          <button
            disabled={busy === c.id}
            onClick={() => approve(c.id, false)}
            className="text-xs border border-amber-200 text-amber-700 px-2.5 py-1 rounded-lg hover:bg-amber-50 disabled:opacity-50"
          >
            Batalkan Persetujuan
          </button>
        )}
        <button
          disabled={busy === c.id}
          onClick={() => remove(c.id)}
          className="text-xs text-red-400 hover:underline disabled:opacity-50"
        >
          Hapus
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="flex gap-3 text-xs">
        <span className="bg-amber-100 text-amber-700 font-medium px-2 py-0.5 rounded-full">
          {pending.length} menunggu
        </span>
        <span className="bg-emerald-100 text-emerald-700 font-medium px-2 py-0.5 rounded-full">
          {approved.length} disetujui
        </span>
      </div>

      {/* Pending first */}
      {pending.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
            Menunggu Moderasi
          </p>
          {pending.map((c) => <Row key={c.id} c={c} />)}
        </div>
      )}

      {approved.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mt-4">
            Sudah Disetujui
          </p>
          {approved.map((c) => <Row key={c.id} c={c} />)}
        </div>
      )}
    </div>
  );
}
