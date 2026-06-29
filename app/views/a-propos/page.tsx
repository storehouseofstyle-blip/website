import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">À propos</h1>
        <p className="text-slate-600 mb-4">
          House of Style est une maison dédiée aux basiques contemporains et aux pièces intemporelles,
          alliant qualité des matières et design minimaliste. Nous sélectionnons nos fournisseurs
          avec soin pour garantir durabilité et confort.
        </p>

        <h2 id="realisation" className="text-xl font-semibold mt-8 mb-2">Réalisation</h2>
        <p className="text-slate-600">Site réalisé par <a href="#realisation" className="underline">Charbel Mahougnon</a>.</p>
      </main>
      <Footer />
    </div>
  );
}
