"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as React from "react";

type LookProduct = {
  id: string;
  slug: string;
  name: string;
  type: string;
  price: number;
  salePrice: number | null;
  currency: string;
  image: string;
};

export default function ShopTheLook({ products }: { products: LookProduct[] }) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (products.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % products.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [products.length]);

  const active = products[activeIndex];
  const related = React.useMemo(() => {
    if (products.length <= 1) return products;
    return [...products.slice(activeIndex + 1), ...products.slice(0, activeIndex)];
  }, [activeIndex, products]);

  if (!active) return null;

  const nextLook = () => setActiveIndex((index) => (index + 1) % products.length);

  return <>
    <div className="mt-20 flex items-end justify-between gap-4">
      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">Une silhouette complète</p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Shop the look</h2>
      </div>
      <button
        type="button"
        onClick={nextLook}
        className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-600 transition-transform duration-300 hover:-translate-y-0.5 hover:text-slate-950"
      >
        Faire défiler <ArrowRight size={14} />
      </button>
    </div>

    <section className="relative mt-8 grid gap-5 overflow-hidden lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)]">
      <Link
        href={`/produits/${active.slug}`}
        className="group relative min-h-[420px] overflow-hidden rounded-xl bg-white transition-transform duration-700 ease-out sm:min-h-[620px]"
      >
        <Image
          src={active.image}
          alt={active.name}
          fill
          sizes="(max-width: 1024px) 100vw, 65vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-24 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Look sélectionné</p>
          <h3 className="mt-2 text-2xl font-semibold">{active.name}</h3>
        </div>
      </Link>

      <div className="relative min-w-0 overflow-hidden lg:mt-12">
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#f7f7f5] to-transparent" />
        <div className="shop-the-look-track flex gap-4 overflow-hidden pr-2 transition-transform duration-700 ease-out">
          {related.map((product) => (
            <Link
              href={`/produits/${product.slug}`}
              key={product.id}
              className="group block w-[180px] shrink-0 snap-start sm:w-[210px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="210px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <h3 className="mt-3 truncate text-sm font-semibold">{product.name}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {product.salePrice ?? product.price} {product.currency}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>;
}
