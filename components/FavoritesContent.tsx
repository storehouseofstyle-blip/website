"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export const FAVORITES_KEY = "house-of-style-favorites";
type Product = { id: string; slug: string; name: string; price: number; salePrice: number | null; currency: string; image?: string };

const emptyFavorites: string[] = [];
let cachedRaw = "";
let cachedFavorites = emptyFavorites;

function getFavoritesSnapshot() {
  const raw = localStorage.getItem(FAVORITES_KEY) || "[]";
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedFavorites = JSON.parse(raw) as string[];
  }
  return cachedFavorites;
}

export default function FavoritesContent({ products }: { products: Product[] }) {
  const favoriteIds = React.useSyncExternalStore(
    (onStoreChange) => { window.addEventListener("favorites-updated", onStoreChange); window.addEventListener("storage", onStoreChange); return () => { window.removeEventListener("favorites-updated", onStoreChange); window.removeEventListener("storage", onStoreChange); }; },
    getFavoritesSnapshot,
    () => emptyFavorites,
  );
  const favorites = products.filter((product) => favoriteIds.includes(product.id));
  const removeFavorite = (id: string) => { const next = favoriteIds.filter((favoriteId) => favoriteId !== id); localStorage.setItem(FAVORITES_KEY, JSON.stringify(next)); window.dispatchEvent(new Event("favorites-updated")); };

  if (!favorites.length) return <div className="border border-dashed border-slate-300 bg-slate-50 p-10 text-center"><p className="font-medium">Aucun article favori.</p><Link href="/produits" className="mt-4 inline-block text-sm underline underline-offset-4">Découvrir la collection</Link></div>;
  return <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{favorites.map((product) => <article key={product.id} className="group"><Link href={`/produits/${product.slug}`} className="relative block aspect-[3/4] overflow-hidden bg-slate-100">{product.image && <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />}</Link><div className="flex items-start justify-between gap-3 pt-4"><div><p className="font-medium">{product.name}</p><p className="mt-1 text-sm text-slate-500">{product.salePrice ?? product.price} {product.currency}</p></div><button type="button" onClick={() => removeFavorite(product.id)} aria-label={`Retirer ${product.name} des favoris`} className="text-xs text-slate-500 underline underline-offset-4 hover:text-red-600">Retirer</button></div></article>)}</div>;
}
