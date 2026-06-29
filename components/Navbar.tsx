"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, Menu, X, Heart } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
      {/* Bandeau Promotionnel Supérieur 
      <div className="w-full bg-slate-900 text-white text-center py-2 text-xs font-medium tracking-wider uppercase px-4">
        Livraison offerte dès 75€ &bull; Retours gratuits
      </div>*/}

      {/* Barre de Navigation Principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-16 gap-4">
          <div className="flex items-center gap-4">
            {/* Menu Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image src="/logo2.png" width={34} height={34} alt="House of Style" className="block" />
            </Link>
          </div>

          <div className="hidden sm:flex justify-center">
            <div className="relative w-full max-w-[600px]">
              <input
                type="text"
                placeholder="Rechercher des produits..."
                className="w-full h-10 pl-10 pr-4 rounded-full bg-slate-50 border border-transparent text-sm focus:bg-white focus:border-slate-300 outline-none transition-all placeholder:text-slate-400 text-slate-800"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 sm:gap-4">
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide uppercase text-slate-600">
              <Link href="/collections/men" className="hover:text-slate-950 transition-colors">Homme</Link>
              <Link href="/collections/women" className="hover:text-slate-950 transition-colors">Femme</Link>
              <Link href="/brands" className="hover:text-slate-950 transition-colors">Marques</Link>
            </nav>

            {/* Favoris */}
            <button className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all shrink-0">
              <Heart className="w-5 h-5" />
            </button>

            {/* Panier Interactif */}
            <Link href="/panier" className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all flex items-center gap-1.5 shrink-0 relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-slate-950 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* MENU MOBILE DÉROULANT */}
      <div className={`${isOpen ? "block" : "hidden"} lg:hidden border-t border-slate-100 bg-white px-4 py-6 space-y-4 shadow-inner`}>
        {/* Recherche sur Mobile */}
        <div className="relative w-full sm:hidden mb-4">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full h-11 pl-11 pr-4 rounded-xl bg-slate-50 border border-transparent text-sm outline-none text-slate-800"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
        <nav className="flex flex-col gap-4 font-semibold uppercase tracking-wide text-slate-700 text-sm">
          <Link href="/collections/men" onClick={() => setIsOpen(false)} className="py-2 border-b border-slate-50">Homme</Link>
          <Link href="/collections/women" onClick={() => setIsOpen(false)} className="py-2 border-b border-slate-50">Femme</Link>
          <Link href="/brands" onClick={() => setIsOpen(false)} className="py-2">Marques</Link>
        </nav>
      </div>
    </header>
  );
}
