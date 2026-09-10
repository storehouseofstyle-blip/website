"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUp, ChevronsUpDown, Eye, Package, Pencil, Plus, Trash2 } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteProduct } from "./actions";
import ProductEditor from "./ProductEditor";

type Product = {
  id: string; name: string; slug: string; typeId: string; type: string; category: string;
  description: string; gender: string; price: number; salePrice: number | null; currency: string;
  stock: number; colors: { name: string; type: "HEX" | "IMAGE"; value: string }[];
  sizes: { label: string }[]; stocks: { color: number; size: number; value: number }[]; images: string[];
};

function SortButton({ title, active, direction, onClick }: { title: string; active: boolean; direction?: "asc" | "desc"; onClick: () => void }) {
  return <Button variant="ghost" size="sm" onClick={onClick} className="flex h-8 gap-2 px-0 text-xs font-medium text-white hover:bg-white/10 hover:text-white sm:text-sm">{title}{active && direction === "desc" ? <ArrowDown className="h-3 w-3" /> : active && direction === "asc" ? <ArrowUp className="h-3 w-3" /> : <ChevronsUpDown className="h-3 w-3 opacity-70" />}</Button>;
}

export default function ProductManager({ products, types }: { products: Product[]; types: { id: string; name: string; category: string }[] }) {
  const [sorting, setSorting] = React.useState<{ key: keyof Product; direction: "asc" | "desc" } | null>(null);
  const [editing, setEditing] = React.useState<Product | null>(null);
  const [creating, setCreating] = React.useState(false);
  const sortBy = (key: keyof Product) => setSorting((current) => current?.key === key ? { key, direction: current.direction === "asc" ? "desc" : "asc" } : { key, direction: "asc" });
  const rows = [...products].sort((left, right) => {
    if (!sorting) return 0;
    const result = String(left[sorting.key]).localeCompare(String(right[sorting.key]), "fr", { numeric: true });
    return sorting.direction === "asc" ? result : -result;
  });
  const header = (key: keyof Product, title: string) => <SortButton title={title} active={sorting?.key === key} direction={sorting?.direction} onClick={() => sortBy(key)} />;

  return <>
    {(creating || editing) && <div className="mb-10 w-full"><ProductEditor product={editing || undefined} types={types} onClose={() => { setCreating(false); setEditing(null); }} /></div>}
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 font-mono text-xs uppercase tracking-[0.22em] text-slate-500">Catalogue</p><h1 className="flex items-center gap-3 text-4xl font-semibold tracking-tight"><Package size={30} strokeWidth={1.5} /> Articles</h1></div><button onClick={() => { setCreating(true); setEditing(null); }} className="flex h-11 items-center gap-2 bg-slate-950 px-4 text-sm font-medium text-white hover:bg-slate-700"><Plus size={16} /> Nouvel article</button></div>
    <ScrollArea className="w-full max-w-full whitespace-nowrap border border-slate-300 bg-white"><div className="min-w-[900px]"><Table className="table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b"><TableHeader><TableRow className="hover:bg-transparent"><TableHead className="h-12 w-20 border-y border-[#0f2747] bg-[#0f2747] px-4 text-left text-white"><Package size={16} aria-label="Aperçu" /></TableHead><TableHead className="h-12 border-y border-[#0f2747] bg-[#0f2747] px-4 text-left text-white">{header("slug", "Référence")}</TableHead><TableHead className="h-12 border-y border-[#0f2747] bg-[#0f2747] px-4 text-left text-white">{header("name", "Article")}</TableHead><TableHead className="h-12 border-y border-[#0f2747] bg-[#0f2747] px-4 text-left text-white">{header("type", "Type")}</TableHead><TableHead className="h-12 border-y border-[#0f2747] bg-[#0f2747] px-4 text-left text-white">{header("stock", "Stock")}</TableHead><TableHead className="h-12 border-y border-[#0f2747] bg-[#0f2747] px-4 text-left text-white">{header("price", "Prix")}</TableHead><TableHead className="h-12 border-y border-[#0f2747] bg-[#0f2747] px-4 text-left text-white last:border-r" /></TableRow></TableHeader><TableBody>{rows.length ? rows.map((product) => <TableRow key={product.id} className="hover:bg-muted/50"><TableCell className="px-4 py-3 text-sm"><div className="relative flex size-11 items-center justify-center overflow-hidden border border-slate-200 bg-slate-50 text-slate-400">{product.images[0] ? <Image src={product.images[0]} alt="" fill sizes="44px" className="object-cover" /> : <Package size={18} />}</div></TableCell><TableCell className="px-4 py-4 text-sm"><span className="font-mono text-xs uppercase text-muted-foreground">{product.slug}</span></TableCell><TableCell className="px-4 py-4 text-sm"><span className="font-medium">{product.name}</span></TableCell><TableCell className="px-4 py-4 text-sm"><span className="text-sm text-muted-foreground">{product.category} / {product.type}</span></TableCell><TableCell className="px-4 py-4 text-sm"><Badge variant="secondary" className="text-xs">{product.stock} unité(s)</Badge></TableCell><TableCell className="px-4 py-4 text-sm"><span className="font-medium tabular-nums">{product.salePrice !== null ? `${product.salePrice.toFixed(2)} ${product.currency} ` : ""}{product.salePrice !== null && <del className="text-muted-foreground">{product.price.toFixed(2)} {product.currency}</del>}{product.salePrice === null && `${product.price.toFixed(2)} ${product.currency}`}</span></TableCell><TableCell className="px-4 py-4 text-sm"><div className="flex justify-end gap-2"><Link href={`/produits/${product.slug}`} title="Voir la fiche produit" aria-label={`Voir la fiche de ${product.name}`} className="p-2 text-slate-500 hover:text-slate-950"><Eye size={15} /></Link><button title="Modifier" aria-label={`Modifier ${product.name}`} onClick={() => { setEditing(product); setCreating(false); }} className="p-2 text-slate-500 hover:text-slate-950"><Pencil size={15} /></button><form action={deleteProduct}><input type="hidden" name="id" value={product.id} /><button title="Supprimer" aria-label={`Supprimer ${product.name}`} type="submit" className="p-2 text-red-500 hover:text-red-700"><Trash2 size={15} /></button></form></div></TableCell></TableRow>) : <TableRow><TableCell colSpan={7} className="h-28 text-center text-sm text-muted-foreground">Aucun article.</TableCell></TableRow>}</TableBody></Table></div><ScrollBar orientation="horizontal" /></ScrollArea>
    <p className="mt-2 text-center text-xs text-muted-foreground sm:hidden">Faites défiler horizontalement pour voir toutes les colonnes.</p>
  </>;
}
