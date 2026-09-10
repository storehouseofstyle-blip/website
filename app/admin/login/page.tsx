import { loginAdmin } from "@/app/admin/actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const hasError = params.error === "invalid";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f1f0eb] px-6 text-slate-950">
      <section className="w-full max-w-md border border-slate-900 bg-white p-8 shadow-[8px_8px_0_#0f172a] sm:p-10">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.25em]">House of Style / Office</p>
        <h1 className="mb-3 text-4xl font-semibold">Connexion</h1>
        <p className="mb-8 text-sm text-slate-500">Accédez à l’espace de gestion de la boutique.</p>

        {hasError && (
          <p className="mb-5 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            Identifiants incorrects.
          </p>
        )}

        <form action={loginAdmin} className="space-y-5">
          <label className="block text-sm font-medium">
            Adresse e-mail
            <input name="email" type="email" required autoComplete="email" className="mt-2 h-12 w-full border border-slate-300 px-3 outline-none focus:border-slate-950" />
          </label>
          <label className="block text-sm font-medium">
            Mot de passe
            <input name="password" type="password" required autoComplete="current-password" className="mt-2 h-12 w-full border border-slate-300 px-3 outline-none focus:border-slate-950" />
          </label>
          <button type="submit" className="h-12 w-full bg-slate-950 font-medium text-white transition hover:bg-slate-700">
            Ouvrir la session
          </button>
        </form>
      </section>
    </main>
  );
}
