import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Conditions générales</h1>
        <p className="text-slate-600 mb-4">Les conditions générales définissent les modalités de vente et d'utilisation du site.</p>
        <p className="text-slate-600">Pour toute question juridique, contactez notre service client.</p>
      </main>
      <Footer />
    </div>
  );
}
