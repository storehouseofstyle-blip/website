import { db } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FavoritesContent from "@/components/FavoritesContent";

export const revalidate = 0;

export default async function FavoritesPage() {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { media: { orderBy: { order: "asc" } } },
  });

  return <div className="flex min-h-screen flex-col bg-white text-slate-900"><Navbar /><main className="mx-auto w-full max-w-7xl flex-1 px-4 py-16 sm:px-6 lg:px-8"><header className="mb-10 border-b border-slate-200 pb-8"><p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-slate-500">Votre sélection</p><h1 className="text-4xl font-semibold tracking-tight">Mes favoris</h1></header><FavoritesContent products={products.map((product) => ({ id: product.id, slug: product.slug, name: product.name, price: product.price, salePrice: product.salePrice, currency: product.currency, image: product.media.find((media) => media.isMain === 1)?.url || product.media[0]?.url }))} /></main><Footer /></div>;
}
