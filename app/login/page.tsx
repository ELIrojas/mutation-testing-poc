"use client";

import { useState } from "react";
import { ArrowLeft, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = () => {
    const users = JSON.parse(localStorage.getItem("fg_users") || "[]");
    const match = users.find(
      (u: { email: string; password: string }) =>
        u.email === form.email && u.password === form.password
    );

    if (!match) return setError("Invalid email or password.");

    localStorage.setItem("fg_session", JSON.stringify(match));
    router.push("/principal");
  };

  return (
    <main className="min-h-screen bg-[#080810] text-white relative overflow-hidden flex items-center justify-center">
      <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-6 py-10">
        <Link href="/" className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-[#3a3850] uppercase hover:text-violet-400 transition-colors mb-8">
          <ArrowLeft className="w-3 h-3" /> Back
        </Link>

        <p className="font-mono text-[11px] tracking-[0.2em] text-violet-500 uppercase mb-1">01 / Login</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-[#f0eeff] mb-1">
          Login <span className="text-violet-500">Form</span>
        </h1>
        <p className="text-[#5a5870] text-sm font-light mb-8">Email and password validation.</p>

        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 flex flex-col gap-5">

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] tracking-[0.15em] text-violet-500 uppercase">Email</label>
            <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 focus-within:border-violet-500/50 transition-colors">
              <Mail className="w-4 h-4 text-[#4a4870] shrink-0" />
              <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@example.com"
                className="bg-transparent text-sm text-[#e8e5ff] placeholder:text-[#3a3850] outline-none w-full" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] tracking-[0.15em] text-violet-500 uppercase">Password</label>
            <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 focus-within:border-violet-500/50 transition-colors">
              <Lock className="w-4 h-4 text-[#4a4870] shrink-0" />
              <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="••••••••"
                className="bg-transparent text-sm text-[#e8e5ff] placeholder:text-[#3a3850] outline-none w-full" />
            </div>
          </div>

          {error && (
            <p className="font-mono text-[11px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">
              {error}
            </p>
          )}

          <div className="w-full h-px bg-white/5" />

          <button onClick={handleSubmit}
            className="flex items-center justify-center gap-2 w-full bg-violet-600/80 hover:bg-violet-600 text-white font-mono text-[11px] tracking-wider uppercase px-4 py-3 rounded-xl transition-all duration-200">
            <ArrowRight className="w-3.5 h-3.5" /> Sign in
          </button>

          <p className="text-center font-mono text-[11px] text-[#3a3850]">
            No account?{" "}
            <Link href="/register" className="text-violet-400 hover:text-violet-300 transition-colors">Register</Link>
          </p>
        </div>
      </div>
    </main>
  );
}