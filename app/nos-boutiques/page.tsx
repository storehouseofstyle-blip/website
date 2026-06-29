import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function StoresPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Nos boutiques</h1>
        <p className="text-slate-600 mb-4">
          Retrouvez notre boutique principale à Paris :
        </p>
        <address className="not-italic text-slate-600">
          House of Style
          <br />12 Rue de la Mode
          <br />75001 Paris
        </address>

        <p className="text-slate-600 mt-6">Horaires d'ouverture : Mar–Sam 10:30–19:00 — Dim 11:00–17:00</p>
      </main>
      <Footer />
    </div>
  );
}
