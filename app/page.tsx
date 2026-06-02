
import Link from "next/link";

const forms = [
  {
    badge: "auth",
    icon: <svg className="w-4 h-4 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    shortName: "Login",
    title: "Formulario de Login",
    description: "Ingresar Email, Contraseña.",
    validators: 3,
    route: "/login",
  },
  {
    badge: "auth",
    icon: <svg className="w-4 h-4 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>,
    shortName: "Register",
    title: "Formulario de  Registro",
    description: "Registrese completando los campos requeridos.",
    validators: 5,
    route: "/register",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080810] text-white relative overflow-hidden">
      <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <p className="font-mono text-[11px] tracking-[0.2em] text-violet-500 uppercase mb-1">
             Mutation testing
          </p>
          <h1 className="text-5xl font-extrabold tracking-tight text-[#f0eeff] mb-1">
            Form<span className="text-violet-500">Guard</span>
          </h1>
          <p className="text-[#5a5870] text-sm font-light">
            Validación y pruebas de formularios        </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-w-2xl">
          {forms.map((form, i) => (
            <div
              key={i}
              className="group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5
                hover:-translate-y-1 hover:border-violet-500/35 hover:bg-violet-500/[0.06]
                transition-all duration-200"
            >
              <span className="absolute top-3 right-3 font-mono text-[9px] tracking-wider
                text-violet-300/40 border border-violet-500/15 px-2 py-0.5 rounded-full uppercase">
                {form.badge}
              </span>

              <div className="w-9 h-9 rounded-[10px] bg-violet-500/15 border border-violet-500/30
                flex items-center justify-center mb-4">
                {form.icon}
              </div>

              <p className="font-mono text-[10px] tracking-[0.15em] text-violet-500 uppercase mb-1">
                {String(i + 1).padStart(2, "0")} / {form.shortName}
              </p>
              <h2 className="text-[17px] font-bold text-[#e8e5ff] mb-1.5 leading-tight">
                {form.title}
              </h2>
              <p className="text-[12.5px] text-[#4e4d61] font-light leading-relaxed mb-4">
                {form.description}
              </p>

              <div className="w-full h-px bg-white/5 mb-3.5" />

              <Link href={form.route} className="flex items-center gap-1.5 border border-violet-500/30
                text-violet-400 font-mono text-[11px] tracking-wider px-3.5 py-1.5 rounded-lg uppercase
                hover:border-violet-500/60 hover:text-violet-300 transition-all w-fit">
                Open →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}