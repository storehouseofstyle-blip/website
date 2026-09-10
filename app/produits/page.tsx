import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import type { Prisma } from "@prisma/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";

export const revalidate = 0;

export default async function ProduitsPage({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string; categorie?: string; type?: string; coupe?: string; q?: string }>;
}) {
  const { genre, categorie, type, coupe, q } = await searchParams;

  // Build the where clause dynamically based on URL params
  const whereClause: Prisma.ProductWhereInput = {};
  if (genre) whereClause.gender = genre;
  if (categorie || type) {
    whereClause.type = {
      ...(categorie ? { category: { slug: categorie } } : {}),
      ...(type ? { slug: type } : {}),
    };
  }
  if (coupe) whereClause.variants = { some: { sizeOrCut: { contains: coupe } } };
  if (q) whereClause.OR = [
    { name: { contains: q } },
    { slug: { contains: q } },
    { description: { contains: q } },
    { type: { name: { contains: q } } },
  ];

  const products = await db.product.findMany({
    where: whereClause,
    include: {
      type: { include: { category: true } },
      media: true,
      colors: true,
      sizes: true,
      variants: true,
    },
    orderBy: { createdAt: "desc" },
  });
  const categories = await db.category.findMany({ orderBy: { name: "asc" } });
  const collectionUrl = (params: { categorie?: string; genre?: string; type?: string; coupe?: string; q?: string }) => {
    const query = new URLSearchParams();
    if (params.categorie) query.set("categorie", params.categorie);
    if (params.genre) query.set("genre", params.genre);
    if (params.type) query.set("type", params.type);
    if (params.coupe) query.set("coupe", params.coupe);
    if (params.q) query.set("q", params.q);
    const value = query.toString();
    return value ? `/produits?${value}` : "/produits";
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Notre Collection</h1>
          <nav aria-label="Catégories de la collection" className="mt-8 flex gap-2 overflow-x-auto border-y border-slate-200 py-3">
            <Link href={collectionUrl({ genre, type, coupe })} className={`shrink-0 px-3 py-2 text-sm font-medium ${!categorie ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100"}`}>Toutes</Link>
            {categories.map((category) => <Link key={category.id} href={collectionUrl({ categorie: category.slug, genre, coupe })} className={`shrink-0 px-3 py-2 text-sm font-medium ${categorie === category.slug ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100"}`}>{category.name}</Link>)}
          </nav>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
            <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Filtrer par genre</span>
            {[{ label: "Tous", value: undefined }, { label: "Homme", value: "Homme" }, { label: "Femme", value: "Femme" }, { label: "Unisexe", value: "Unisexe" }].map((item) => <Link key={item.label} href={collectionUrl({ categorie, genre: item.value, type, coupe })} className={`rounded-full border px-4 py-2 ${genre === item.value || (!genre && !item.value) ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 text-slate-600 hover:border-slate-950"}`}>{item.label}</Link>)}
          </div>
          {(genre || categorie || type || coupe) && <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-500">
            {genre && <span className="bg-slate-100 px-3 py-1 rounded-full">Sexe : {genre}</span>}
            {categorie && <span className="bg-slate-100 px-3 py-1 rounded-full">Catégorie : {categorie}</span>}
            {type && <span className="bg-slate-100 px-3 py-1 rounded-full">Type : {type}</span>}
            {coupe && <span className="bg-slate-100 px-3 py-1 rounded-full">Coupe : {coupe}</span>}
          </div>}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-500 font-medium">Aucun produit ne correspond à vos critères.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => {
              const firstImage = product.media.find((m) => m.isMain === 1)?.url || product.media[0]?.url || "/images/placeholder.jpg";

              return (
                <div key={product.id} className="group flex flex-col bg-white">
                  <Link href={`/produits/${product.slug}`} className="relative mb-4 aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate-50">
                    <Image
                      src={firstImage}
                      alt={product.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-w-7xl) 25vw"
                    />
                  </Link>
                  <div className="flex flex-col flex-1">
                    <span className="text-xs text-slate-400 font-light uppercase tracking-wider mb-1">
                      {product.type.name}
                    </span>
                    <Link href={`/produits/${product.slug}`} className="font-semibold text-base text-slate-800 tracking-tight group-hover:text-slate-600 transition-colors">{product.name}</Link>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-3"><div className="font-bold text-slate-950">{product.salePrice !== null && <span className="mr-2 text-red-600">{product.salePrice} {product.currency}</span>}<del className={product.salePrice !== null ? "text-slate-400" : "no-underline"}>{product.price} {product.currency}</del></div><AddToCartButton item={{ id: product.id, name: product.name, slug: product.slug, price: product.salePrice ?? product.price, currency: product.currency, image: firstImage }} /></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
