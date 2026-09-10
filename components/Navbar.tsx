"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import CartIndicator from "./CartIndicator";

function SearchForm({ mobile = false }: { mobile?: boolean }) {
  return <form action="/produits" method="get" className={`relative w-full ${mobile ? "mb-4 sm:hidden" : "max-w-[600px]"}`}><input type="search" name="q" placeholder={mobile ? "Rechercher..." : "Rechercher des articles..."} className={`w-full ${mobile ? "h-11 rounded-xl pl-11" : "h-10 rounded-full pl-10"} pr-4 bg-slate-50 border border-transparent text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-slate-300 focus:bg-white`} /><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /></form>;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4"><div className="flex items-center gap-4"><button type="button" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"} className="rounded-full p-3 text-slate-600 hover:bg-slate-100 lg:hidden">{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button><Link href="/" className="shrink-0"><Image src="/logo2.png" width={34} height={34} alt="House of Style" /></Link></div><div className="hidden justify-center sm:flex"><SearchForm /></div><div className="flex items-center justify-end gap-2 sm:gap-4"><nav className="hidden items-center gap-8 text-sm font-medium uppercase tracking-wide text-slate-600 lg:flex"><Link href="/produits?genre=Homme" className="hover:text-slate-950">Homme</Link><Link href="/produits?genre=Femme" className="hover:text-slate-950">Femme</Link><Link href="/produits" className="hover:text-slate-950">Collection</Link></nav><Link href="/favoris" aria-label="Voir mes favoris" title="Mes favoris" className="shrink-0 rounded-full p-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900"><Heart className="h-5 w-5" /></Link><CartIndicator /></div></div></div><div className={`${isOpen ? "block" : "hidden"} fixed inset-x-0 top-16 z-40 space-y-4 border-t border-slate-100 bg-white px-4 py-6 shadow-inner lg:hidden`}><SearchForm mobile /><nav className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-wide text-slate-700"><Link href="/produits?genre=Homme" onClick={() => setIsOpen(false)} className="border-b border-slate-50 py-2">Homme</Link><Link href="/produits?genre=Femme" onClick={() => setIsOpen(false)} className="border-b border-slate-50 py-2">Femme</Link><Link href="/favoris" onClick={() => setIsOpen(false)} className="border-b border-slate-50 py-2">Mes favoris</Link><Link href="/produits" onClick={() => setIsOpen(false)} className="py-2">Collection</Link></nav></div></header>;
}
