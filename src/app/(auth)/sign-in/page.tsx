"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function SignInForm() {
  const searchParams = useSearchParams();
  const requestedNext = searchParams.get("redirect") ?? "/";
  const next = requestedNext.startsWith("/") && !requestedNext.startsWith("//") ? requestedNext : "/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(searchParams.get("error") ? "Login dengan Google belum berhasil. Silakan coba lagi." : null);

  const handleGoogle = async () => {
    setLoading(true);
    setError(null);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gorontalounite.com";
    const callbackUrl = new URL("/auth/callback", siteUrl);
    callbackUrl.searchParams.set("next", next);
    const { error: oauthError } = await createClient().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callbackUrl.toString() },
    });
    if (oauthError) {
      setError(oauthError.message);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {error && <p role="alert" className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">{error}</p>}
      <button type="button" onClick={handleGoogle} disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-800">
        {loading ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700" aria-label="Memuat" /> : <GoogleIcon />}
        {loading ? "Mengarahkan ke Google…" : "Sign in with Google"}
      </button>
      <p className="text-center text-xs leading-relaxed text-gray-500 dark:text-gray-400">
        Belum memiliki akun? Akun akan dibuat otomatis saat pertama kali masuk dengan Google.
      </p>
      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
        <Link href="/sign-up" className="font-medium text-brand hover:underline dark:text-yellow-400">Daftar dengan Google</Link>
      </p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <header className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#F5C400] to-[#111111]"><span className="text-sm font-bold text-white">GU</span></div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Masuk ke Gorontalo Unite</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Akses fitur AI, komentar, dan riwayat dengan akun Google Anda.</p>
        </header>
        <Suspense fallback={<div className="rounded-2xl border border-gray-100 bg-white p-6 text-center text-sm text-gray-400 dark:border-zinc-800 dark:bg-zinc-900">Memuat…</div>}><SignInForm /></Suspense>
        <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500"><Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">← Kembali ke beranda</Link></p>
      </div>
    </div>
  );
}
