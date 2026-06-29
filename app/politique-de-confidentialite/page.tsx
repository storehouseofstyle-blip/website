import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Politique de confidentialité</h1>
        <p className="text-slate-600 mb-4">Nous respectons votre vie privée et n'utilisons vos données que pour le traitement des commandes et l'amélioration du service.</p>
        <p className="text-slate-600">Pour toute demande relative aux données personnelles, écrivez à <a href="mailto:privacy@houseofstyle.example" className="underline">privacy@houseofstyle.example</a>.</p>
      </main>
      <Footer />
    </div>
  );
}
