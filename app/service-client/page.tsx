import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ServiceClientPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Service client</h1>
        <p className="text-slate-600 leading-relaxed mb-6">
          Notre équipe est là pour vous accompagner avant, pendant et après votre commande. Retrouvez ici toutes les informations utiles pour une expérience fluide.
        </p>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Livraison & retours</h2>
            <p className="text-slate-600 leading-relaxed">
              Livraison rapide en France métropolitaine. Retour facile sous 14 jours si le produit ne correspond pas à vos attentes.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">Suivi de commande</h2>
            <p className="text-slate-600 leading-relaxed">
              Vous pouvez suivre votre commande en ligne et contacter notre service client à tout moment pour une assistance personnalisée.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">Questions fréquentes</h2>
            <p className="text-slate-600 leading-relaxed">
              Consultez nos conditions générales et notre politique de confidentialité pour en savoir plus sur nos services, la protection des données et les options disponibles.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
