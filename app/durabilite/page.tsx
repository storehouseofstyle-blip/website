import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Durabilité</h1>
        <p className="text-slate-600 mb-4">
          Notre engagement : réduire l'empreinte environnementale en sélectionnant des matières responsables
          et en travaillant avec des ateliers respectueux des normes sociales.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Actions</h2>
        <ul className="list-disc list-inside text-slate-600">
          <li>Filières textiles tracées</li>
          <li>Collections limitées pour éviter le gaspillage</li>
          <li>Emballages recyclables</li>
        </ul>
      </main>
      <Footer />
    </div>
  );
}
