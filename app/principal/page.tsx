
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession, clearSession, getUsers, UserRecord } from '../../utils/session'

export default function PrincipalPage() {
  const router = useRouter()
  const [session, setSession] = useState<UserRecord | null>(null)
  const [users, setUsers] = useState<UserRecord[]>([])

  useEffect(() => {
    const s = getSession()
    if (!s) {
      router.push('/')
      return
    }
    setSession(s)
    setUsers(getUsers())
  }, [router])

  const handleLogout = () => {
    clearSession()
    router.push('/')
  }

  if (!session) return null

  return (
    <main className="min-h-screen bg-[#080810] text-white relative overflow-hidden">
      <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-violet-500 uppercase mb-1">
              Dashboard
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#f0eeff]">
              Welcome, <span className="text-violet-500">{session.firstName}</span>
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border border-white/[0.08] text-[#3a3850] font-mono text-[11px] tracking-wider uppercase px-4 py-2 rounded-xl hover:border-red-500/30 hover:text-red-400 transition-all"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>Logout
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
            <p className="font-mono text-[10px] tracking-[0.15em] text-violet-500 uppercase mb-1">
              Usuario Logeado
            </p>
            <p className="text-lg font-bold text-[#e8e5ff]">
              {session.firstName} {session.lastName}
            </p>
            <p className="font-mono text-[11px] text-[#4a4870]">{session.email}</p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
            <p className="font-mono text-[10px] tracking-[0.15em] text-violet-500 uppercase mb-1">
              Total usuarios
            </p>
            <p className="text-4xl font-extrabold text-[#e8e5ff]">{users.length}</p>
            <p className="font-mono text-[11px] text-[#4a4870]">registered accounts</p>
          </div>
        </div>

        <p className="font-mono text-[10px] tracking-[0.15em] text-violet-500 uppercase mb-4">
          Usuarios Registrados
        </p>
        <div className="flex flex-col gap-3">
          {users.map((u) => (
            <div
              key={u.id}
              className={`bg-white/[0.03] border rounded-2xl p-4 flex items-center gap-4 transition-colors
                ${u.id === session.id ? 'border-violet-500/30 bg-violet-500/[0.04]' : 'border-white/[0.08]'}`}
            >
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center shrink-0 font-mono text-[12px] text-violet-400 font-bold">
                {u.firstName[0]}{u.lastName?.[0] ?? ''}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-[#e8e5ff]">
                    {u.firstName} {u.lastName}
                  </p>
                  {u.id === session.id && (
                    <span className="font-mono text-[9px] tracking-wider text-violet-300/60 border border-violet-500/20 px-2 py-0.5 rounded-full uppercase">
                      you
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-0.5">
                  <p className="flex items-center gap-1 font-mono text-[11px] text-[#4a4870]">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> {u.email}
                  </p>
                  <p className="flex items-center gap-1 font-mono text-[11px] text-[#3a3850]">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                    {new Date(u.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <svg className="w-4 h-4 text-[#2a2840] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}