import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Recrutement</h1>
        <p className="text-slate-600 mb-4">
          Nous sommes régulièrement à la recherche de talents pour rejoindre l'équipe House of Style.
          Envoyez votre CV et lettre de motivation à <a href="mailto:jobs@houseofstyle.example" className="underline">jobs@houseofstyle.example</a>.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Postes ouverts</h2>
        <p className="text-slate-600">Consultez les offres ou contactez-nous directement pour des opportunités.</p>
      </main>
      <Footer />
    </div>
  );
}
