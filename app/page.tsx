import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownIcon,
  ArrowRight,
  ShoppingBag,
  RecycleIcon,
} from "lucide-react";
import { db } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import ShopTheLook from "@/components/ShopTheLook";

// Le catalogue est rafraîchi après les actions admin et reste servi rapidement entre deux visites.
export const revalidate = 60;
const renderMedia = (imageUrl?: string | null, altText?: string) => {
  const url = imageUrl || "/categorie/vetement.png";
  const isVideo = url.match(/\.(mp4|webm|ogg)$/i);

  if (isVideo) {
    return (
      <video
        src={url}
        autoPlay
        preload="metadata"
        loop
        muted
        playsInline
        poster="/categorie/vetement.png"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
    );
  }

  return (
    <Image
      src={url}
      alt={altText || "Collection"}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-700"
    />
  );
};

export default async function HomePage() {
  // Récupère les 4 derniers produits ajoutés dans SQLite pour la section Nouveautés
  // À remplacer à la ligne 13 de app/page.tsx
  // À remplacer vers la ligne 13 de app/page.tsx
  const newArrivals = await db.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 4,
    include: {
      type: {
        include: { category: true }, // Charge le type et sa catégorie parente
      },
      media: true, // Charge le tableau des images associées
    },
  });
  const dbCategories = await db.category.findMany({
    include: {
      types: {
        include: {
          _count: {
            select: { products: true },
          },
        },
      },
    },
  });

  const categories = dbCategories.map((cat) => {
    const productCount = cat.types.reduce(
      (acc, type) => acc + type._count.products,
      0,
    );

    const image = cat.imageUrl;

    return {
      name: cat.name,
      slug: cat.slug,
      image,
      count: `${productCount} articles`,
    };
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <Navbar />

      <main>
        {/* SECTION 1 : HERO BANNER (Style minimaliste et impactant) */}
        <section className="relative isolate flex h-[100svh] items-center overflow-hidden bg-white">
          <div className="absolute inset-0 z-10 flex items-center bg-white/60 backdrop-blur-[2px]">
            <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
              <div className="flex max-w-xl flex-col justify-center py-4 sm:py-6 sm:pr-8">
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-none uppercase">
                Le style en mouvement
              </h1>
              <p className="mb-8 max-w-lg text-base font-light leading-relaxed text-slate-700 sm:text-lg">
                Des silhouettes essentielles, des coupes affirmées et des pièces pensées pour accompagner chaque mouvement. Découvrez une collection sincère, entre caractère et simplicité.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#about"
                  className="bg-slate-900 text-white h-14 px-8 rounded-full font-medium inline-flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
                >
                  Découvrir la nouvelle collection
                  <ArrowDownIcon className="w-4 h-4" />
                </Link>
              </div>
              </div>
            </div>
          </div>
          {/* Grande image d'ambiance à droite en mode desktop */}
          <div className="pointer-events-none absolute inset-0 z-0 md:inset-y-0 md:left-65 md:right-0">
            <Image
              src="/man/man.jpg"
              alt="House of style new collection"
              fill
              className="object-cover object-[65%_center] md:hidden"
              priority
              sizes="100vw"
            />
            <Image
              src="/man/man-princ5.png"
              alt="House of style new collection"
              fill
              className="hidden object-contain object-center md:block"
              priority
              sizes="(min-width: 768px) 100vw"
            />
          </div>
        </section>

        <section className=" bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
                Sélection House of Style
              </p>
              <h2 className="max-w-xl text-3xl font-semibold uppercase leading-none tracking-tight text-slate-950 sm:text-4xl">
                Les marques qui définissent notre style
              </h2>
              <div className="mx-auto mt-12 grid w-full max-w-6xl grid-cols-2 items-center gap-px border border-slate-300 bg-white sm:grid-cols-7">
                {[
                  ["/marques/timberland.png", "Timberland", "h-7 w-auto"],
                  ["/marques/balenciaga.png", "Balenciaga", "h-7 w-auto"],
                  ["/marques/bottega.png", "Bottega Veneta", "h-7 w-auto"],
                  ["/marques/gucci.webp", "Gucci", "h-7 w-auto"],
                  ["/marques/prada.png", "Prada", "h-7 w-auto"],
                  ["/marques/zara.webp", "Zara", "h-7 w-auto"],
                  ["/marques/casio.png", "Casio", "h-7 w-auto"],
                  ["/marques/louisv.png", "Louis Vuitton", "h-7 w-auto"],
                  ["/marques/nb.png", "New Balance", "h-7 w-auto"],
                  ["/marques/nike.webp", "Nike", "h-7 w-auto"],
                  ["/marques/hermes.png", "Hermès", "h-5 w-auto"],
                  ["/marques/lacoste.png", "Lacoste", "h-7 w-auto"],
                  ["/marques/adidas.webp", "Adidas", "h-7 w-auto"],
                  ["/marques/rolex2.png", "Rolex", "h-7 w-auto"],
                ].map(([src, alt, className]) => (
                  <div key={src} className="flex aspect-[2.2/1] w-full items-center justify-center bg-[#f7f7f5] px-5 transition-colors hover:bg-white sm:px-7">
                    <Image src={src} alt={alt} width={140} height={48} className={`${className} h-auto max-h-10 w-auto object-contain`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1.5 : DESIGN AURA STORE (Sous le hero banner) */}
        <FadeIn delay={100}>
          <section
            id="about"
            className="relative bg-white h-[87vh] flex items-center justify-center mx-2 sm:mx-4 lg:mx-8 mt-12 scroll-mt-24 rounded-[2rem] border-[1.5px] border-slate-900"
          >
            {/* Texte Géant en arrière-plan (Playfair Display) contenu dans la bordure */}
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none select-none z-0">
              <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between px-4 sm:px-12 md:px-20 gap-8 md:gap-0">
                <div className="flex items-baseline gap-3 sm:gap-6">
                  <span
                    style={{ fontFamily: "var(--font-playfair)" }}
                    className="text-[18vw] sm:text-[14vw] md:text-[9vw] font-bold text-slate-900 leading-none tracking-tighter uppercase"
                  >
                    House Of
                  </span>
                </div>
                <span
                  style={{ fontFamily: "var(--font-playfair)" }}
                  className="text-[20vw] sm:text-[14vw] md:text-[9vw] font-bold text-slate-900 leading-none tracking-tighter uppercase"
                >
                  Style
                </span>
              </div>
            </div>

            {/* Mannequin Central qui dépasse du cadre (sans overflow-hidden sur le parent) */}
            <div className="absolute bottom-0 left-[50%] md:left-[55%] lg:left-[58%] -translate-x-1/2 z-10 w-[85%] sm:w-[65%] md:w-[45%] lg:w-[40%] max-w-2xl h-[100%] flex items-end justify-center pointer-events-none">
              <Image
                src="/man/man-princ3.png"
                alt="Mannequin"
                fill
                className="object-contain object-bottom scale-100 sm:scale-105"
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 40vw"
              />
            </div>

            {/* Bottom Left Content */}
            <div className="absolute bottom-4 left-4 sm:bottom-10 sm:left-10 z-20 flex flex-col max-w-[140px] sm:max-w-[280px]">
              <div className="mb-2 sm:mb-5">
                {/* Icône de recyclage style japonais comme sur la maquette */}
                <RecycleIcon className="text-slate-900 w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h2 className="font-sans font-bold text-xs sm:text-2xl leading-tight mb-1 sm:mb-3 text-slate-900">
                L&apos;élégance sans excès. L&apos;essentiel du style.
              </h2>
              <p className="hidden sm:block font-mono text-[11px] uppercase leading-relaxed text-slate-900 font-bold tracking-tight">
                Des silhouettes modernes,
                <br />
                des matières naturelles
                <br />
                et un design sincère.
                <br />
                Pour ceux qui exigent
                <br />
                la simplicité.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* SECTION 2 : LES CATÉGORIES (Design Bento Grid) */}
        <FadeIn delay={200}>
          <section
            id="categories"
            className="max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24"
          >
            {/* Header */}
            <div className="max-w-3xl mb-10 sm:mb-14">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase leading-none mb-4 text-slate-900 font-sans">
                Affirmez votre identité avec House Of Style
              </h2>
              <p className="text-slate-500 font-light text-sm sm:text-base leading-relaxed max-w-2xl">
                Découvrez nos collections capsules et nos pièces maîtresses pour
                un look audacieux et percutant. Gagnez du temps et affirmez
                votre style.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
              {/* Top Left: Wide Rectangle (Cat 0) - Align Left */}
              <Link
                href={
                  categories[0]
                    ? `/produits?categorie=${categories[0].slug}`
                    : "#"
                }
                className="md:col-span-7 relative h-[350px] sm:h-[450px] rounded-[2rem] overflow-hidden group block"
              >
                {renderMedia(categories[0]?.image, categories[0]?.name)}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 w-full h-full flex flex-col justify-end items-start p-8 sm:p-10">
                  <h3 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight mb-4">
                    {categories[0] ? categories[0].name : "Collection"}
                  </h3>
                  <div className="bg-white text-black rounded-full pl-6 pr-2 py-2 flex items-center gap-4 text-sm font-bold hover:bg-slate-200 transition-colors">
                    Découvrir
                    <span className="bg-black text-white rounded-full p-2 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Top Right: Square (Cat 1) - Align Bottom Center */}
              <Link
                href={
                  categories[1]
                    ? `/produits?categorie=${categories[1].slug}`
                    : "#"
                }
                className="md:col-span-5 relative h-[350px] sm:h-[450px] rounded-[2rem] overflow-hidden group block"
              >
                {renderMedia(categories[1]?.image, categories[1]?.name)}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 w-full h-full flex flex-col justify-end items-center text-center p-8 sm:p-10">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4">
                    {categories[1] ? categories[1].name : "Collection"}
                  </h3>
                  <div className="bg-white text-black rounded-full pl-6 pr-2 py-2 flex items-center gap-4 text-sm font-bold hover:bg-slate-200 transition-colors">
                    Découvrir
                    <span className="bg-black text-white rounded-full p-2 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Bottom Left: Square (Cat 2) - Align Bottom Center */}
              <Link
                href={
                  categories[2]
                    ? `/produits?categorie=${categories[2].slug}`
                    : "#"
                }
                className="md:col-span-5 relative h-[350px] sm:h-[450px] rounded-[2rem] overflow-hidden group block"
              >
                {renderMedia(categories[2]?.image, categories[2]?.name)}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 w-full h-full flex flex-col justify-end items-center text-center p-8 sm:p-10">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4">
                    {categories[2] ? categories[2].name : "Collection"}
                  </h3>
                  <div className="bg-white text-black rounded-full pl-6 pr-2 py-2 flex items-center gap-4 text-sm font-bold hover:bg-slate-200 transition-colors">
                    Découvrir
                    <span className="bg-black text-white rounded-full p-2 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Bottom Right: Wide Rectangle (Cat 3) - Align Right */}
              <Link
                href={
                  categories[3]
                    ? `/produits?categorie=${categories[3].slug}`
                    : "#"
                }
                className="md:col-span-7 relative h-[350px] sm:h-[450px] rounded-[2rem] overflow-hidden group block"
              >
                {renderMedia(categories[3]?.image, categories[3]?.name)}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 w-full h-full flex flex-col justify-end items-end text-right p-8 sm:p-10">
                  <h3 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight mb-4">
                    {categories[3] ? categories[3].name : "Collection"}
                  </h3>
                  <div className="bg-white text-black rounded-full pl-6 pr-2 py-2 flex items-center gap-4 text-sm font-bold hover:bg-slate-200 transition-colors">
                    Découvrir
                    <span className="bg-black text-white rounded-full p-2 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </FadeIn>

       

        {/* SECTION 3 : NOUVEAUTÉS */}
        <FadeIn delay={200}>
          <section id="collection" className="new-arrivals-section mb-20 bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {newArrivals.length === 0 ? (
                <div className="py-16 text-center"><ShoppingBag className="mx-auto mb-3 h-10 w-10 text-slate-300" /><p className="font-medium text-slate-500">Aucune nouveauté pour le moment.</p></div>
              ) : (
                <>
                  <div className="mb-8 flex items-end justify-between gap-4"><div><p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">À découvrir maintenant</p><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Nouveautés</h2></div><Link href="/produits" className="text-sm font-medium underline underline-offset-4">Tout voir</Link></div>
                  <div className="flex snap-x gap-4 overflow-x-auto pb-5">
                    {newArrivals.map((product) => { const image = product.media.find((media) => media.isMain === 1)?.url || product.media[0]?.url || "/images/placeholder.jpg"; return <Link href={`/produits/${product.slug}`} key={product.id} className="group w-[190px] shrink-0 snap-start sm:w-[220px]"><div className="relative aspect-[4/5] overflow-hidden bg-white"><Image src={image} alt={product.name} fill sizes="220px" className="object-cover transition-transform duration-500 group-hover:scale-105" /></div><p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-slate-400">{product.type.name}</p><h3 className="mt-1 truncate text-sm font-semibold text-slate-900">{product.name}</h3><p className="mt-2 text-sm font-medium">{product.salePrice ?? product.price} {product.currency}</p></Link>; })}
                  </div>
                  <ShopTheLook products={newArrivals.map((product) => ({ id: product.id, slug: product.slug, name: product.name, type: product.type.name, price: product.price, salePrice: product.salePrice, currency: product.currency, image: product.media.find((media) => media.isMain === 1)?.url || product.media[0]?.url || "/images/placeholder.jpg" }))} />
                </>
              )}
            </div>
          </section>
        </FadeIn>
      </main>

      <Footer />
    </div>
  );
}
