import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Service client</h1>
        <p className="text-slate-600 mb-4">Notre équipe support répond aux demandes liées aux commandes, retours et tailles.</p>
        <p className="text-slate-600">Pour un suivi rapide, préparez votre numéro de commande avant de nous contacter.</p>
      </main>
      <Footer />
    </div>
  );
}
