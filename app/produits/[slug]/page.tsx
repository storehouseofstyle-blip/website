import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import Navbar from "@/components/Navbar";
import ImageGallery from "@/components/ImageGallery";
import ProductInfo from "@/components/ProductInfo";
import Accordion from "@/components/Accordion";
import Reviews from "@/components/Reviews";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // Requête directe dans SQLite via Prisma
  const product = await db.product.findUnique({
    where: { slug },
  });

  if (!product) {
    notFound(); // Renvoie une page 404 si le vêtement n'existe pas
  }

  // Conversion des chaînes SQLite en tableaux pour le front-end
  const productSizes = product.sizes.split(",");
  const productImages = product.images.split(",");

  // Récupérer des produits similaires pour la section "Vous pourriez aussi aimer"
  const suggestions = await db.product.findMany({
    where: { 
      category: product.category,
      NOT: { id: product.id }
    },
    take: 4,
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Fil d'ariane */}
        <nav className="text-xs sm:text-sm text-slate-400 mb-8 uppercase tracking-wider">
          Accueil &bull; {product.category} &bull; <span className="text-slate-900 font-semibold">{product.title}</span>
        </nav>

        {/* Section Principale : Grille 2 Colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 mb-20">
          <ImageGallery images={productImages} title={product.title} />
          
          <div className="flex flex-col justify-between">
            <div>
              <ProductInfo title={product.title} price={product.price} sizes={productSizes} category={product.category} />
              
              <div className="mt-8 border-t border-slate-100 pt-6">
                <Accordion title="Description & coupe" defaultOpen>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">{product.description}</p>
                </Accordion>
                <Accordion title="Livraison & Retours">
                  <p className="text-sm text-slate-600 leading-relaxed font-light">Livraison standard sous 3 à 5 jours ouvrés. Retours gratuits sous 14 jours.</p>
                </Accordion>
              </div>
            </div>
          </div>
        </div>

        {/* Section Avis & Témoignages */}
        <Reviews />

        {/* Section Produits Similaires */}
        <section className="mt-24 border-t border-slate-100 pt-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-12">Vous pourriez aussi aimer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {suggestions.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
