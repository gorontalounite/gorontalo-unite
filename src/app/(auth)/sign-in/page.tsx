"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/* ── Google SVG ─────────────────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

/* ── Main form ──────────────────────────────────────────────── */
function SignInForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const redirectTo   = searchParams.get("redirect") ?? "/";

  const [tab,           setTab]           = useState<"password" | "magic">("password");
  const [email,         setEmail]         = useState("");
  const [password,      setPassword]      = useState("");
  const [loading,       setLoading]       = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error,         setError]         = useState<string | null>(null);
  const [magicSent,     setMagicSent]     = useState(false);

  const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=${encodeURIComponent(redirectTo)}`;

  const handleGoogle = async () => {
    setGoogleLoading(true); setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callbackUrl },
    });
    if (error) { setError(error.message); setGoogleLoading(false); }
  };

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); }
    else { router.push(redirectTo); router.refresh(); }
  };

  const handleMagic = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: callbackUrl },
    });
    if (error) { setError(error.message); setLoading(false); }
    else { setMagicSent(true); setLoading(false); }
  };

  if (magicSent) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-6 text-center space-y-4">
        <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto">
          <span className="text-2xl">📧</span>
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white mb-1">Cek email kamu!</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Kami mengirim magic link ke <strong>{email}</strong>.
            Klik link di email untuk masuk otomatis.
          </p>
        </div>
        <button onClick={() => setMagicSent(false)} className="text-xs text-[#2D7D46] dark:text-emerald-400 hover:underline">
          ← Kirim ulang atau ganti email
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-6 space-y-4">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm px-3 py-2 rounded-lg border border-red-100 dark:border-red-800">
          {error}
        </div>
      )}

      {/* Google */}
      <button type="button" onClick={handleGoogle} disabled={googleLoading || loading}
        className="w-full flex items-center justify-center gap-3 border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50">
        {googleLoading ? <Spinner /> : <GoogleIcon />}
        Masuk dengan Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100 dark:border-zinc-800" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-3 bg-white dark:bg-zinc-900 text-gray-400">atau dengan email</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl border border-gray-100 dark:border-zinc-800 p-1 gap-1">
        {(["password", "magic"] as const).map((t) => (
          <button key={t} type="button" onClick={() => { setTab(t); setError(null); }}
            className={`flex-1 text-xs font-medium py-1.5 rounded-lg transition-colors ${
              tab === t
                ? "bg-[#2D7D46] text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}>
            {t === "password" ? "🔑 Password" : "✉️ Magic Link"}
          </button>
        ))}
      </div>

      {tab === "password" ? (
        <form onSubmit={handlePassword} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              placeholder="nama@email.com"
              className="w-full text-sm border border-gray-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:border-[#2D7D46] dark:focus:border-emerald-500 focus:ring-2 focus:ring-[#2D7D46]/20 transition-all" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Password</label>
              <button type="button" onClick={() => setTab("magic")}
                className="text-[10px] text-[#2D7D46] dark:text-emerald-400 hover:underline">
                Lupa password?
              </button>
            </div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              placeholder="••••••••"
              className="w-full text-sm border border-gray-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:border-[#2D7D46] dark:focus:border-emerald-500 focus:ring-2 focus:ring-[#2D7D46]/20 transition-all" />
          </div>
          <button type="submit" disabled={loading || googleLoading}
            className="w-full bg-[#2D7D46] text-white text-sm font-medium py-2.5 rounded-xl hover:bg-[#236137] transition-colors disabled:opacity-50">
            {loading ? "Masuk…" : "Masuk"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleMagic} className="space-y-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Masukkan email — kami kirim link masuk otomatis. Tidak perlu ingat password!
          </p>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              placeholder="nama@email.com"
              className="w-full text-sm border border-gray-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:border-[#2D7D46] dark:focus:border-emerald-500 focus:ring-2 focus:ring-[#2D7D46]/20 transition-all" />
          </div>
          <button type="submit" disabled={loading || googleLoading}
            className="w-full bg-[#2D7D46] text-white text-sm font-medium py-2.5 rounded-xl hover:bg-[#236137] transition-colors disabled:opacity-50">
            {loading ? "Mengirim…" : "Kirim Magic Link"}
          </button>
        </form>
      )}

      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
        Belum punya akun?{" "}
        <Link href="/sign-up" className="text-[#2D7D46] dark:text-emerald-400 font-medium hover:underline">
          Daftar sekarang
        </Link>
      </p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-[#2D7D46] to-[#1a5c33] rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-sm">GU</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Masuk ke Gorontalo Unite</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Akses fitur AI, komentar, dan riwayat</p>
        </div>
        <Suspense fallback={
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 p-6 text-center text-sm text-gray-400">
            Memuat…
          </div>
        }>
          <SignInForm />
        </Suspense>
        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
          <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">← Kembali ke beranda</Link>
        </p>
      </div>
    </div>
  );
}
