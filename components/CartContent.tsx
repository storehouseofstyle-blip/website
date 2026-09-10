"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { CART_KEY } from "./AddToCartButton";

type CartItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  image?: string;
  color?: string;
  size?: string;
  quantity: number;
};

const emptyCart: CartItem[] = [];
let cachedCartRaw = "";
let cachedCart: CartItem[] = emptyCart;

function getCartSnapshot() {
  const raw = localStorage.getItem(CART_KEY) || "[]";
  if (raw !== cachedCartRaw) {
    cachedCartRaw = raw;
    cachedCart = JSON.parse(raw) as CartItem[];
  }
  return cachedCart;
}

export default function CartContent() {
  const items = React.useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("cart-updated", onStoreChange);
      window.addEventListener("storage", onStoreChange);
      return () => {
        window.removeEventListener("cart-updated", onStoreChange);
        window.removeEventListener("storage", onStoreChange);
      };
    },
    getCartSnapshot,
    () => emptyCart,
  );

  const update = (next: CartItem[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("cart-updated"));
  };
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!items.length) {
    return <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-600"><p className="font-medium">Aucun article dans le panier pour le moment.</p><Link href="/produits" className="mt-4 inline-block text-sm underline underline-offset-4">Découvrir la collection</Link></div>;
  }

  return <div className="space-y-6">
    <div className="divide-y divide-slate-200 border border-slate-200">
      {items.map((item) => <div key={item.id} className="flex gap-4 p-4 sm:p-6">
        <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-slate-100">{item.image && <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />}</div>
        <div className="min-w-0 flex-1">
          <Link href={`/produits/${item.slug}`} className="font-medium text-slate-900 hover:underline">{item.name}</Link>
          <p className="mt-1 text-sm font-medium text-slate-700">{item.price.toFixed(2)} {item.currency}</p>
          <dl className="mt-3 grid gap-1 text-sm text-slate-500">
            {item.color && <div className="flex gap-2"><dt className="font-medium text-slate-700">Couleur :</dt><dd>{item.color}</dd></div>}
            {item.size && <div className="flex gap-2"><dt className="font-medium text-slate-700">Taille :</dt><dd>{item.size}</dd></div>}
          </dl>
          <div className="mt-4 flex flex-wrap items-center gap-3"><button type="button" onClick={() => update(items.map((current) => current.id === item.id ? { ...current, quantity: Math.max(1, current.quantity - 1) } : current))} className="border px-2">−</button><span className="min-w-5 text-center text-sm">{item.quantity}</span><button type="button" onClick={() => update(items.map((current) => current.id === item.id ? { ...current, quantity: current.quantity + 1 } : current))} className="border px-2">+</button><button type="button" onClick={() => update(items.filter((current) => current.id !== item.id))} className="ml-2 text-xs text-red-600 underline">Supprimer</button></div>
        </div>
      </div>)}
    </div>
    <div className="flex justify-between border-t border-slate-900 pt-5 text-lg font-semibold"><span>Total</span><span>{total.toFixed(2)} {items[0].currency}</span></div>
  </div>;
}
