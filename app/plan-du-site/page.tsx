import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Plan du site</h1>
        <ul className="text-slate-600 list-disc list-inside">
          <li><a href="/a-propos" className="underline">À propos</a></li>
          <li><a href="/nos-boutiques" className="underline">Nos boutiques</a></li>
          <li><a href="/recrutement" className="underline">Recrutement</a></li>
          <li><a href="/contact" className="underline">Contact</a></li>
        </ul>
      </main>
      <Footer />
    </div>
  );
}
