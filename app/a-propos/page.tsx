import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">À propos</h1>
        <p className="text-slate-600 leading-relaxed mb-6">
          House of Style propose une expérience mode minimaliste, élégante et contemporaine. Nous imaginons des basiques de haute qualité pour une garde-robe durable, raffinée et facile à vivre.
        </p>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Notre mission</h2>
            <p className="text-slate-600 leading-relaxed">
              Concevoir des pièces essentielles qui durent, alliant simplicité, confort et finitions soignées. Nous croyons à une mode de sens et à une consommation responsable.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">Notre engagement</h2>
            <p className="text-slate-600 leading-relaxed">
              Chaque collection est pensée pour s’intégrer harmonieusement à votre quotidien, en respectant une esthétique épurée et des matériaux choisis avec soin.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
