"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { ArrowLeft, User, Mail, Phone, ArrowRight, Trash2, MessageSquare } from "lucide-react";
import Link from "next/link";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface UserRecord {
  id: number
  firstName: string
  lastName: string
  email: string
  createdAt: string
}

export default function ContactPage() {
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [session, setSession] = useState<UserRecord | null>(null)
    const [users, setUsers] = useState<UserRecord[]>([])
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
      const s = localStorage.getItem('fg_session')
      if (!s) {
        router.push('/')
        return
      }
      setSession(JSON.parse(s))
      setUsers(JSON.parse(localStorage.getItem('fg_users') || '[]'))
    }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.firstName || !form.email) return;
    setContacts([{ id: Date.now(), ...form }, ...contacts]);
    setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  };

  const handleDelete = (id: number) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <main className="min-h-screen bg-[#080810] text-white relative overflow-hidden">

      <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">

        {/* Back */}
        <Link
          href="/principal"
          className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider
            text-[#3a3850] uppercase hover:text-violet-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </Link>

        {/* Header */}
        <p className="font-mono text-[11px] tracking-[0.2em] text-violet-500 uppercase mb-1">
          03 / Contact
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-[#f0eeff] mb-1">
          Contact <span className="text-violet-500">Form</span>
        </h1>
        <p className="text-[#5a5870] text-sm font-light mb-8">
          Agrega contactos y los verás en tiempo real.
        </p>

        {/* Layout: form + list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Form */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 flex flex-col gap-5 h-fit">

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] tracking-[0.15em] text-violet-500 uppercase">
                  First name
                </label>
                <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08]
                  rounded-xl px-4 py-3 focus-within:border-violet-500/50 transition-colors">
                  <User className="w-4 h-4 text-[#4a4870] shrink-0" />
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    type="text"
                    placeholder="John"
                    className="bg-transparent text-sm text-[#e8e5ff] placeholder:text-[#3a3850] outline-none w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] tracking-[0.15em] text-violet-500 uppercase">
                  Last name
                </label>
                <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08]
                  rounded-xl px-4 py-3 focus-within:border-violet-500/50 transition-colors">
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Doe"
                    className="bg-transparent text-sm text-[#e8e5ff] placeholder:text-[#3a3850] outline-none w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] tracking-[0.15em] text-violet-500 uppercase">
                Email
              </label>
              <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08]
                rounded-xl px-4 py-3 focus-within:border-violet-500/50 transition-colors">
                <Mail className="w-4 h-4 text-[#4a4870] shrink-0" />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="you@example.com"
                  className="bg-transparent text-sm text-[#e8e5ff] placeholder:text-[#3a3850] outline-none w-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] tracking-[0.15em] text-violet-500 uppercase">
                Phone
              </label>
              <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08]
                rounded-xl px-4 py-3 focus-within:border-violet-500/50 transition-colors">
                <Phone className="w-4 h-4 text-[#4a4870] shrink-0" />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="bg-transparent text-sm text-[#e8e5ff] placeholder:text-[#3a3850] outline-none w-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] tracking-[0.15em] text-violet-500 uppercase">
                Message
              </label>
              <div className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.08]
                rounded-xl px-4 py-3 focus-within:border-violet-500/50 transition-colors">
                <MessageSquare className="w-4 h-4 text-[#4a4870] shrink-0 mt-0.5" />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write a message..."
                  rows={3}
                  className="bg-transparent text-sm text-[#e8e5ff] placeholder:text-[#3a3850] outline-none w-full resize-none"
                />
              </div>
            </div>

            <div className="w-full h-px bg-white/5" />

            <button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 w-full bg-violet-600/80
                hover:bg-violet-600 text-white font-mono text-[11px] tracking-wider
                uppercase px-4 py-3 rounded-xl transition-all duration-200"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              Save contact
            </button>
          </div>

          {/* Contact list */}
          <div className="flex flex-col gap-3">

            <div className="flex items-center justify-between mb-1">
              <p className="font-mono text-[10px] tracking-[0.15em] text-violet-500 uppercase">
                Contacts
              </p>
              {contacts.length > 0 && (
                <span className="font-mono text-[10px] text-[#3a3850]">
                  {contacts.length} total
                </span>
              )}
            </div>

            {contacts.length === 0 ? (
              <div className="bg-white/[0.03] border border-white/[0.08] border-dashed rounded-2xl p-10
                flex flex-col items-center justify-center gap-2 text-center">
                <User className="w-6 h-6 text-[#2a2840]" />
                <p className="font-mono text-[11px] text-[#2a2840] uppercase tracking-wider">
                  No contacts yet
                </p>
              </div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4
                    flex items-start gap-4 hover:border-violet-500/20 transition-colors"
                >
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/30
                    flex items-center justify-center shrink-0 font-mono text-[11px] text-violet-400 font-bold">
                    {contact.firstName[0]}{contact.lastName?.[0] ?? ""}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#e8e5ff] truncate">
                      {contact.firstName} {contact.lastName}
                    </p>
                    <p className="font-mono text-[11px] text-[#4a4870] truncate">{contact.email}</p>
                    {contact.phone && (
                      <p className="font-mono text-[11px] text-[#3a3850]">{contact.phone}</p>
                    )}
                    {contact.message && (
                      <p className="text-[12px] text-[#4e4d61] mt-1 line-clamp-1">{contact.message}</p>
                    )}
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="shrink-0 p-1.5 rounded-lg border border-transparent
                      hover:border-red-500/30 hover:bg-red-500/10 text-[#3a3850]
                      hover:text-red-400 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}