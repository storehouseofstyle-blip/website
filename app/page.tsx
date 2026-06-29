import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import { db } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Force le rendu dynamique pour toujours afficher les derniers stocks SQLite
export const revalidate = 0;

export default async function HomePage() {
  // Récupère les 4 derniers produits ajoutés dans SQLite pour la section Nouveautés
  // À remplacer à la ligne 13 de app/page.tsx
// À remplacer vers la ligne 13 de app/page.tsx
const newArrivals = await db.product.findMany({
  orderBy: { createdAt: "desc" },
  take: 4,
  include: {
    category: true, // Charge le nom de la catégorie
    images: true,   // Charge le tableau des images associées
  },
});



  // Catégories phares de la boutique prêt-à-porter
  const categories = [
    { name: "Homme", image: "/images/cat-men.jpg", count: "124 articles" },
    { name: "Femme", image: "/images/cat-women.jpg", count: "258 articles" },
    { name: "Accessoires", image: "/images/cat-acc.jpg", count: "89 articles" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <Navbar />

      <main>
        {/* SECTION 1 : HERO BANNER (Style minimaliste et impactant) */}
        <section className="relative bg-white h-[80vh] flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-10">
            <div className="flex flex-col max-w-xl">
              <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-3">
                Nouvelle saison 2026
              </span>
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-none uppercase">
                House of Style
              </h1>
              <p className="text-base sm:text-lg text-slate-500 font-light mb-8 leading-relaxed">
                Découvrez une esthétique intemporelle. Des silhouettes épurées, des matières premium et un confort absolu pour redéfinir votre quotidien.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#collection"
                  className="bg-slate-900 text-white h-14 px-8 rounded-full font-medium inline-flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
                >
                  Voir la collection
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#categories"
                  className="border border-slate-200 text-slate-900 h-14 px-8 rounded-full font-medium inline-flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  Parcourir les catégories
                </Link>
              </div>
            </div>
          </div>
          {/* Grande image d'ambiance à droite en mode desktop */}
          <div className="hidden md:block absolute right-0 top-0 w-1/2 h-full">
            <Image
              src="/man/man-princ2.png"
              alt="House of style new collection"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
        </section>

        {/* SECTION 2 : LES CATÉGORIES (Vues en grilles épurées) */}
        <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Par catégorie</h2>
              <p className="text-slate-400 font-light mt-1">Explorez nos collections capsules</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="group relative h-[450px] rounded-2xl overflow-hidden bg-slate-100 cursor-pointer"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                  <span className="text-xs text-slate-300 font-light tracking-wide mb-1">{cat.count}</span>
                  <h3 className="text-2xl font-bold tracking-tight mb-4">{cat.name}</h3>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Découvrir <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3 : LES NOUVEAUTÉS (Alimenté dynamiquement par SQLite) */}
        <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-20">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Nouveautés</h2>
            <p className="text-slate-400 font-light mt-2">
              Nos dernières pièces ajoutées au catalogue de prêt-à-porter.
            </p>
          </div>

          {newArrivals.length === 0 ? (
            // Message si la base SQLite est vide pour le moment
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">Aucun vêtement en vitrine pour l'instant.</p>
              <p className="text-xs text-slate-400 mt-1">Créez des produits dans votre base de données SQLite pour les afficher ici.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {newArrivals.map((product) => {
                // On récupère la première image stockée dans la chaîne séparée par des virgules
const firstImage = product.images[0]?.url || "/images/placeholder.jpg";

                return (
                  <Link
                    href={`/produits/${product.slug}`}
                    key={product.id}
                    className="group flex flex-col bg-white"
                  >
                    {/* Zone Image */}
                    <div className="relative aspect-[3/4] w-full bg-slate-50 rounded-2xl overflow-hidden mb-4">
                      <Image
                        src={firstImage}
                        alt={product.title}
                        fill
                        className="object-cover object-center group-hover:scale-102 transition-transform duration-300"
                        sizes="(max-w-7xl) 25vw"
                      />
                    </div>

                    {/* Zone Détails (Format semblable à la maquette "You might also like") */}
                    <div className="flex flex-col flex-1">
                      <span className="text-xs text-slate-400 font-light uppercase tracking-wider mb-1">
  {product.category.name} {/* On va chercher la propriété .name de l'objet category */}
</span>

                      <h3 className="font-semibold text-base text-slate-800 tracking-tight group-hover:text-slate-600 transition-colors">
                        {product.title}
                      </h3>
                      
                      {/* Avis fictifs pour habiller le design comme sur l'image */}
                      <div className="flex items-center gap-1 mt-1 mb-2">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs text-slate-400 font-light">(48)</span>
                      </div>

                      <div className="mt-auto font-bold text-slate-950">
                        {product.price.toFixed(2)} €
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
