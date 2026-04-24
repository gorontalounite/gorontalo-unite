"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push(redirectTo);
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSignIn} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg border border-red-100">
          {error}
        </div>
      )}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
          placeholder="nama@email.com"
          className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#2D7D46] focus:ring-2 focus:ring-[#2D7D46]/20 transition-all" />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
          placeholder="••••••••"
          className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#2D7D46] focus:ring-2 focus:ring-[#2D7D46]/20 transition-all" />
      </div>
      <button type="submit" disabled={loading}
        className="w-full bg-[#2D7D46] text-white text-sm font-medium py-2.5 rounded-xl hover:bg-[#236137] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        {loading ? "Masuk..." : "Masuk"}
      </button>
      <p className="text-center text-xs text-gray-500">
        Belum punya akun?{" "}
        <Link href="/sign-up" className="text-[#2D7D46] font-medium hover:underline">Daftar sekarang</Link>
      </p>
    </form>
  );
}

export default function SignInPage() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-[#2D7D46] to-[#1a5c33] rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold">GU</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Masuk ke Gorontalo Unite</h1>
          <p className="text-sm text-gray-500 mt-1">Akses fitur AI dan riwayat percakapan</p>
        </div>
        <Suspense fallback={<div className="bg-white rounded-2xl border border-gray-100 p-6 text-center text-sm text-gray-400">Memuat...</div>}>
          <SignInForm />
        </Suspense>
        <p className="text-center text-xs text-gray-400 mt-4">
          <Link href="/" className="hover:text-gray-600">← Kembali ke beranda</Link>
        </p>
      </div>
    </div>
  );
}
