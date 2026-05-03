"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

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

const inputCls =
  "w-full text-sm border border-gray-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 " +
  "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 " +
  "outline-none focus:border-[#2D7D46] dark:focus:border-emerald-500 focus:ring-2 focus:ring-[#2D7D46]/20 transition-all";

export default function SignUpPage() {
  const router = useRouter();
  const [fullName,      setFullName]      = useState("");
  const [email,         setEmail]         = useState("");
  const [password,      setPassword]      = useState("");
  const [showPassword,  setShowPassword]  = useState(false);
  const [loading,       setLoading]       = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error,         setError]         = useState<string | null>(null);
  const [success,       setSuccess]       = useState(false);

  const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL}/auth/callback`;

  const handleGoogle = async () => {
    setGoogleLoading(true); setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callbackUrl },
    });
    if (error) { setError(error.message); setGoogleLoading(false); }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { setError("Password minimal 6 karakter"); return; }
    setLoading(true); setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data:            { full_name: fullName },
        emailRedirectTo: callbackUrl,
      },
    });
    if (error) { setError(error.message); setLoading(false); }
    else { setSuccess(true); }
  };

  /* ── Success state ──────────────────────────────────────── */
  if (success) {
    return (
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#2D7D46] dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Pendaftaran berhasil!</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Cek email <strong className="text-gray-700 dark:text-gray-300">{email}</strong> untuk konfirmasi akun kamu.
          </p>
          <Link
            href="/sign-in"
            className="inline-block bg-[#2D7D46] text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-[#236137] transition-colors"
          >
            Masuk sekarang →
          </Link>
        </div>
      </div>
    );
  }

  /* ── Form ───────────────────────────────────────────────── */
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-[#2D7D46] to-[#1a5c33] rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
            <span className="text-white font-bold text-sm">GU</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Buat akun gratis</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Bergabung dengan komunitas Gorontalo Unite</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-6 space-y-4">

          {/* Error */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm px-3 py-2 rounded-lg border border-red-100 dark:border-red-800">
              {error}
            </div>
          )}

          {/* Google OAuth */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {googleLoading ? (
              <svg className="w-4 h-4 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : <GoogleIcon />}
            Daftar dengan Google
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white dark:bg-zinc-900 text-gray-400 dark:text-zinc-500">
                atau daftar dengan email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Full name */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Nama kamu"
                autoComplete="name"
                className={inputCls}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="nama@email.com"
                autoComplete="email"
                className={inputCls}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Minimal 6 karakter"
                  autoComplete="new-password"
                  className={`${inputCls} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs"
                  tabIndex={-1}
                >
                  {showPassword ? "Sembunyikan" : "Tampilkan"}
                </button>
              </div>
              {/* Password strength hint */}
              {password.length > 0 && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  {[4, 6, 8, 12].map((threshold) => (
                    <div
                      key={threshold}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        password.length >= threshold
                          ? password.length >= 12 ? "bg-emerald-500"
                            : password.length >= 8 ? "bg-amber-400"
                            : "bg-red-400"
                          : "bg-gray-100 dark:bg-zinc-700"
                      }`}
                    />
                  ))}
                  <span className="text-[10px] text-gray-400 dark:text-zinc-500 shrink-0">
                    {password.length < 6 ? "Lemah" : password.length < 8 ? "Cukup" : password.length < 12 ? "Kuat" : "Sangat kuat"}
                  </span>
                </div>
              )}
            </div>

            {/* Terms */}
            <p className="text-[11px] text-gray-400 dark:text-zinc-500 leading-relaxed">
              Dengan mendaftar, kamu menyetujui{" "}
              <Link href="/terms" className="text-[#2D7D46] dark:text-emerald-400 hover:underline">Syarat & Ketentuan</Link>
              {" "}dan{" "}
              <Link href="/privacy-policy" className="text-[#2D7D46] dark:text-emerald-400 hover:underline">Kebijakan Privasi</Link>
              {" "}kami.
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full bg-[#2D7D46] text-white text-sm font-medium py-2.5 rounded-xl hover:bg-[#236137] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Mendaftar…" : "Daftar Sekarang"}
            </button>
          </form>

          {/* Sign-in link */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            Sudah punya akun?{" "}
            <Link href="/sign-in" className="text-[#2D7D46] dark:text-emerald-400 font-medium hover:underline">
              Masuk
            </Link>
          </p>
        </div>

        {/* Back */}
        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
          <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">← Kembali ke beranda</Link>
        </p>
      </div>
    </div>
  );
}
