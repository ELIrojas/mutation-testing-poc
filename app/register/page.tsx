"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { validateRegister, getPasswordStrength } from "../../utils/validators";
import { saveUsers } from "@/utils/session";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", confirm: "", terms: false,
  });


  const strengthLabel = ["", "Débil", "Regular", "Buena", "Fuerte"];
  const strengthColor = ["", "bg-red-500/60", "bg-yellow-500/60", "bg-blue-500/60", "bg-violet-500/60"];
  const strength = getPasswordStrength(form.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setError("");
  };


const handleSubmit = () => {
    const validationError = validateRegister(form); 
    if (validationError) {
      setError(validationError); 
      return;
    }

    const existing = JSON.parse(localStorage.getItem("fg_users") || "[]");
    if (existing.find((u: { email: string }) => u.email === form.email)) {
      return setError("Email already registered.");
    }

    const newUser = {
      id: Date.now(),
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      createdAt: new Date().toISOString(),
    };

  saveUsers([...existing, newUser]);
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-[#080810] text-white relative overflow-hidden flex items-center justify-center">
      <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-6 py-10">
        <Link href="/" className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-[#3a3850] uppercase hover:text-violet-400 transition-colors mb-8">
         <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg> Back
        </Link>

        <p className="font-mono text-[11px] tracking-[0.2em] text-violet-500 uppercase mb-1">02 / Register</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-[#f0eeff] mb-1">
          Register <span className="text-violet-500">Form</span>
        </h1>
        <p className="text-[#5a5870] text-sm font-light mb-8">Llene los campos requeridos.</p>

        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 flex flex-col gap-5">

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] tracking-[0.15em] text-violet-500 uppercase">First name</label>
              <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 focus-within:border-violet-500/50 transition-colors">
                <svg className="w-4 h-4 text-[#4a4870] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                <input name="firstName" value={form.firstName} onChange={handleChange} type="text" placeholder="John"
                  className="bg-transparent text-sm text-[#e8e5ff] placeholder:text-[#3a3850] outline-none w-full" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] tracking-[0.15em] text-violet-500 uppercase">Last name</label>
              <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 focus-within:border-violet-500/50 transition-colors">
                <input name="lastName" value={form.lastName} onChange={handleChange} type="text" placeholder="Doe"
                  className="bg-transparent text-sm text-[#e8e5ff] placeholder:text-[#3a3850] outline-none w-full" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] tracking-[0.15em] text-violet-500 uppercase">Email</label>
            <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 focus-within:border-violet-500/50 transition-colors">
              <svg className="w-4 h-4 text-[#4a4870] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@example.com"
                className="bg-transparent text-sm text-[#e8e5ff] placeholder:text-[#3a3850] outline-none w-full" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] tracking-[0.15em] text-violet-500 uppercase">Password</label>
            <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 focus-within:border-violet-500/50 transition-colors">
             <svg className="w-4 h-4 text-[#4a4870] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input name="password" value={form.password} onChange={handleChange} type={showPassword ? "text" : "password"} placeholder="••••••••"
                className="bg-transparent text-sm text-[#e8e5ff] placeholder:text-[#3a3850] outline-none w-full" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword
                  ? <svg className="w-4 h-4 text-[#4a4870] hover:text-violet-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
                  : <svg className="w-4 h-4 text-[#4a4870] hover:text-violet-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>}
              </button>
            </div>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-0.5 flex-1 rounded-full transition-colors ${i <= strength ? strengthColor[strength] : "bg-white/10"}`} />
              ))}
            </div>
            {form.password && <p className="font-mono text-[10px] text-[#3a3850]">Strength: {strengthLabel[strength]}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] tracking-[0.15em] text-violet-500 uppercase">Confirm password</label>
            <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 focus-within:border-violet-500/50 transition-colors">
              <svg className="w-4 h-4 text-[#4a4870] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input name="confirm" value={form.confirm} onChange={handleChange} type={showConfirm ? "text" : "password"} placeholder="••••••••"
                className="bg-transparent text-sm text-[#e8e5ff] placeholder:text-[#3a3850] outline-none w-full" />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm
                  ? <svg className="w-4 h-4 text-[#4a4870] hover:text-violet-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  : <svg className="w-4 h-4 text-[#4a4870] hover:text-violet-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input type="checkbox" id="terms" name="terms" checked={form.terms} onChange={handleChange}
              className="mt-0.5 accent-violet-500 cursor-pointer" />
            <label htmlFor="terms" className="text-[12px] text-[#4e4d61] font-light leading-relaxed cursor-pointer">
              I agree to the <span className="text-violet-400">Terms of Service</span> and <span className="text-violet-400">Privacy Policy</span>
            </label>
          </div>

          {error && (
            <p className="font-mono text-[11px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">
              {error}
            </p>
          )}

          <div className="w-full h-px bg-white/5" />

          <button onClick={handleSubmit}
            className="flex items-center justify-center gap-2 w-full bg-violet-600/80 hover:bg-violet-600 text-white font-mono text-[11px] tracking-wider uppercase px-4 py-3 rounded-xl transition-all duration-200">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg> Create account
          </button>

          <p className="text-center font-mono text-[11px] text-[#3a3850]">
            Already have an account?{" "}
            <Link href="/login" className="text-violet-400 hover:text-violet-300 transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}