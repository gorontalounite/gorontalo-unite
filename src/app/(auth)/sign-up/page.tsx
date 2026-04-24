"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { setError("Password minimal 6 karakter"); return; }
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#2D7D46]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Pendaftaran berhasil!</h2>
          <p className="text-sm text-gray-500 mb-6">
            Cek email <strong>{email}</strong> untuk konfirmasi akun Anda.
          </p>
          <Link href="/sign-in" className="inline-block bg-[#2D7D46] text-white text-sm px-6 py-2.5 rounded-xl hover:bg-[#236137] transition-colors">
            Masuk sekarang
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-[#2D7D46] to-[#1a5c33] rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold">GU</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Buat akun gratis</h1>
          <p className="text-sm text-gray-500 mt-1">Bergabung dengan komunitas Gorontalo Unite</p>
        </div>

        <form onSubmit={handleSignUp} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Nama Anda"
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#2D7D46] focus:ring-2 focus:ring-[#2D7D46]/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="nama@email.com"
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#2D7D46] focus:ring-2 focus:ring-[#2D7D46]/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Minimal 6 karakter"
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#2D7D46] focus:ring-2 focus:ring-[#2D7D46]/20 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2D7D46] text-white text-sm font-medium py-2.5 rounded-xl hover:bg-[#236137] transition-colors disabled:opacity-50"
          >
            {loading ? "Mendaftar..." : "Daftar Sekarang"}
          </button>

          <p className="text-center text-xs text-gray-500">
            Sudah punya akun?{" "}
            <Link href="/sign-in" className="text-[#2D7D46] font-medium hover:underline">
              Masuk
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
