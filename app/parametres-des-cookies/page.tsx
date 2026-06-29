import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CookieSettingsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Paramètres des cookies</h1>
        <p className="text-slate-600 mb-4">Gérez vos préférences de cookies pour ce site.</p>
        <p className="text-slate-600">(Interface de gestion simple — implémentation serveur nécessaire pour stockage réel)</p>
      </main>
      <Footer />
    </div>
  );
}
