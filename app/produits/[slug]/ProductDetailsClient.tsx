"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useState } from "react";
import AddToCartButton from "@/components/AddToCartButton";

type Media = { url: string };
type Color = { id: string; name: string; type: string; value: string };
type Size = { id: string; label: string };
type Variant = { id: string; colorId: string | null; sizeId: string | null; color: string | null; sizeOrCut: string; stock: number };
type Product = { id: string; slug: string; name: string; description: string | null; price: number; salePrice: number | null; currency: string };

const FAVORITES_KEY = "house-of-style-favorites";

export default function ProductDetailsClient({ product, media, variants, colors, sizes }: { product: Product; media: Media[]; variants: Variant[]; colors: Color[]; sizes: Size[] }) {
  const [activeImage, setActiveImage] = useState(media[0]?.url || "/images/placeholder.jpg");
  const [selectedColor, setSelectedColor] = useState(colors[0]?.id || "");
  const [selectedSize, setSelectedSize] = useState(sizes[0]?.id || "");
  const [favorite, setFavorite] = useState(false);
  const selectedVariant = variants.find((variant) => variant.colorId === selectedColor && variant.sizeId === selectedSize);
  const isOutOfStock = !selectedVariant || selectedVariant.stock === 0;
  const selectedColorName = colors.find((color) => color.id === selectedColor)?.name || selectedVariant?.color || "";
  const selectedSizeLabel = sizes.find((size) => size.id === selectedSize)?.label || selectedVariant?.sizeOrCut || "";

  function toggleFavorite() {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]") as string[];
    const next = favorite ? favorites.filter((id) => id !== product.id) : [...new Set([...favorites, product.id])];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    setFavorite(!favorite);
  }

  return <div className="grid grid-cols-1 border-y border-slate-200 lg:grid-cols-[minmax(220px,0.8fr)_minmax(360px,1.4fr)_minmax(260px,0.9fr)]">
    <section className="border-b border-slate-200 p-6 lg:border-b-0 lg:border-r lg:p-10"><p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">Détails de l’article</p><h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{product.name}</h1><p className="mt-6 text-sm leading-7 text-slate-600">{product.description || "Aucune description disponible pour cet article."}</p><div className="mt-8 flex flex-wrap items-baseline gap-3 text-xl font-semibold">{product.salePrice !== null && <span className="text-red-600">{product.salePrice.toFixed(2)} {product.currency}</span>}<span className={product.salePrice !== null ? "text-slate-400 line-through" : "text-slate-700"}>{product.price.toFixed(2)} {product.currency}</span></div></section>
    <section className="order-first flex min-h-[480px] items-center justify-center border-b border-slate-200 bg-white p-4 lg:order-none lg:border-b-0 lg:border-r"><div className="relative aspect-[3/4] h-full max-h-[680px] w-full"><Image src={activeImage} alt={product.name} fill priority className="object-contain object-center" sizes="(max-width: 1024px) 100vw, 45vw" /></div></section>
    <section className="p-6 lg:p-8"><div className="mb-8"><p className="mb-4 text-sm font-semibold uppercase tracking-wider">Couleur : <span className="font-normal normal-case text-slate-500">{selectedColorName}</span></p><div className="flex flex-wrap gap-3">{colors.map((color) => <button key={color.id} type="button" title={color.name} disabled={!variants.some((variant) => variant.colorId === color.id && variant.stock > 0)} onClick={() => setSelectedColor(color.id)} className={`relative size-11 overflow-hidden rounded-md border-2 p-0.5 ${selectedColor === color.id ? "border-slate-900 ring-2 ring-slate-200" : "border-slate-200"} disabled:cursor-not-allowed disabled:opacity-40`}>{color.type === "IMAGE" ? <Image src={color.value} alt={color.name} fill sizes="40px" className="object-cover" /> : <span className="block size-full rounded-sm" style={{ backgroundColor: color.value }} />}</button>)}</div></div><div className="mb-8"><p className="mb-4 text-sm font-semibold uppercase tracking-wider">Taille : <span className="font-normal normal-case text-slate-500">{selectedSizeLabel}</span></p><div className="flex flex-wrap gap-2">{sizes.map((size) => <button key={size.id} type="button" disabled={!variants.some((variant) => variant.sizeId === size.id && variant.stock > 0)} onClick={() => setSelectedSize(size.id)} className={`min-w-12 rounded-md border px-4 py-3 text-sm ${selectedSize === size.id ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200"} disabled:cursor-not-allowed disabled:text-slate-300 disabled:line-through`}>{size.label}</button>)}</div></div><div className="flex flex-wrap gap-3"><AddToCartButton visible disabled={isOutOfStock} item={{ id: `${product.id}:${selectedVariant?.id || "none"}`, name: product.name, slug: product.slug, price: product.salePrice ?? product.price, currency: product.currency, image: activeImage, color: selectedColorName, size: selectedSizeLabel }} /><button type="button" onClick={toggleFavorite} aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"} title={favorite ? "Retirer des favoris" : "Ajouter aux favoris"} className={`flex h-11 w-11 items-center justify-center border ${favorite ? "border-red-500 text-red-500" : "border-slate-900 text-slate-700"}`}><Heart size={18} fill={favorite ? "currentColor" : "none"} /></button></div>{media.length > 1 && <div className="mt-10 flex gap-3 overflow-x-auto border-t border-slate-200 pt-6">{media.map((image, index) => <button key={`${image.url}-${index}`} type="button" onClick={() => setActiveImage(image.url)} className={`relative h-24 w-20 shrink-0 overflow-hidden border-2 ${activeImage === image.url ? "border-slate-900" : "border-transparent opacity-60"}`}><Image src={image.url} alt={`${product.name} ${index + 1}`} fill sizes="80px" className="object-cover" /></button>)}</div>}</section>
  </div>;
}
