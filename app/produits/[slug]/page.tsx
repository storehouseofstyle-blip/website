import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailsClient from "./ProductDetailsClient";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await db.product.findUnique({
    where: { slug },
    include: {
      type: { include: { category: true } },
      media: { orderBy: { order: "asc" } },
      variants: true,
      colors: true,
      sizes: true,
    },
  });

  if (!product) {
    notFound();
  }

  // Trier les médias pour mettre l'image principale en premier si besoin, sinon l'ordre est déjà ok
  const sortedMedia = [...product.media].sort((a, b) => b.isMain - a.isMain);

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Fil d'ariane */}
        <nav className="text-xs sm:text-sm text-slate-400 mb-8 uppercase tracking-wider">
          <Link href="/" className="hover:text-slate-900">Accueil</Link> &bull;{" "}
          <Link href={`/produits?categorie=${product.type.category.slug}`} className="hover:text-slate-900">
            {product.type.category.name}
          </Link>{" "}
          &bull;{" "}
          <Link href={`/produits?type=${product.type.slug}`} className="hover:text-slate-900">
            {product.type.name}
          </Link>{" "}
          &bull; <span className="text-slate-900 font-semibold">{product.name}</span>
        </nav>

        {/* Section Principale : Grille 2 Colonnes gérée côté Client */}
        <ProductDetailsClient product={product} media={sortedMedia} variants={product.variants} colors={product.colors} sizes={product.sizes} />

      </main>

      <Footer />
    </div>
  );
}
