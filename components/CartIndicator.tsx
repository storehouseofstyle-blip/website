"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import * as React from "react";
import { CART_KEY } from "./AddToCartButton";

export default function CartIndicator() {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const update = () => {
      const items = JSON.parse(localStorage.getItem(CART_KEY) || "[]") as { quantity: number }[];
      setCount(items.reduce((total, item) => total + item.quantity, 0));
    };
    update();
    window.addEventListener("cart-updated", update);
    window.addEventListener("storage", update);
    return () => { window.removeEventListener("cart-updated", update); window.removeEventListener("storage", update); };
  }, []);

  return <Link href="/panier" className="relative flex shrink-0 items-center gap-1.5 rounded-full p-2.5 text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900"><ShoppingBag className="h-5 w-5" /><span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950 text-[10px] font-bold text-white">{count}</span></Link>;
}
