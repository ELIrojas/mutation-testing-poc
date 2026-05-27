export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="max-w-7xl mx-auto px-6 py-10">
        
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-3">
            FormGuard
          </h1>

          <p className="text-zinc-400 text-lg">
            Mutation Testing Playground
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-2">
              Login Form
            </h2>

            <p className="text-zinc-400 mb-6">
              Email and password validation.
            </p>

            <button className="bg-white text-black px-4 py-2 rounded-xl font-medium">
              Open
            </button>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-2">
              Register Form
            </h2>

            <p className="text-zinc-400 mb-6">
              User registration validations.
            </p>

            <button className="bg-white text-black px-4 py-2 rounded-xl font-medium">
              Open
            </button>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-2">
              Contact Form
            </h2>

            <p className="text-zinc-400 mb-6">
              Contact form validations.
            </p>

            <button className="bg-white text-black px-4 py-2 rounded-xl font-medium">
              Open
            </button>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-2">
              Checkout Form
            </h2>

            <p className="text-zinc-400 mb-6">
              Payment and card validations.
            </p>

            <button className="bg-white text-black px-4 py-2 rounded-xl font-medium">
              Open
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}