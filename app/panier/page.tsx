import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartContent from '@/components/CartContent';

export default function CartPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Panier</h1>
        <CartContent />
      </main>
      <Footer />
    </div>
  );
}
