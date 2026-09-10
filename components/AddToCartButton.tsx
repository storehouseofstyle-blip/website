"use client";

import { Check, ShoppingBag } from "lucide-react";
import * as React from "react";

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

const CART_KEY = "house-of-style-cart";

export default function AddToCartButton({ item, disabled = false, visible = false }: { item: Omit<CartItem, "quantity">; disabled?: boolean; visible?: boolean }) {
  const [added, setAdded] = React.useState(false);

  function addToCart() {
    const current: CartItem[] = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    const existing = current.find((cartItem) => cartItem.id === item.id);
    const next = existing
      ? current.map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
      : [...current, { ...item, quantity: 1 }];
    localStorage.setItem(CART_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("cart-updated"));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return <button type="button" onClick={addToCart} disabled={disabled} className={`${visible ? "inline-flex" : "hidden"} h-11 shrink-0 items-center justify-center gap-2 border border-slate-900 px-4 text-sm font-medium transition hover:bg-slate-950 hover:text-white disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400`} aria-label={`Ajouter ${item.name} au panier`}>{added ? <><Check size={14} /> Ajouté</> : <><ShoppingBag size={14} /> Ajouter au panier</>}</button>;
}

export { CART_KEY };
