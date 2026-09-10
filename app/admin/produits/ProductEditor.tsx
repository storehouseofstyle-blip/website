"use client";

import { Plus, Trash2 } from "lucide-react";
import * as React from "react";
import { createProduct, updateProduct } from "./actions";

type Color = { name: string; type: "HEX" | "IMAGE"; value: string };
type Size = { label: string };
type Stock = { color: number; size: number; value: number };

type ProductEditorProps = {
  product?: {
    id: string;
    name: string;
    slug: string;
    typeId: string;
    description: string;
    gender: string;
    price: number;
    salePrice: number | null;
    currency: string;
    colors: Color[];
    sizes: Size[];
    stocks: Stock[];
    images: string[];
  };
  types: { id: string; name: string; category: string }[];
  onClose: () => void;
};

const blankColor = (): Color => ({ name: "", type: "HEX", value: "#000000" });

export default function ProductEditor({ product, types, onClose }: ProductEditorProps) {
  const [colors, setColors] = React.useState<Color[]>(product?.colors.length ? product.colors : [blankColor()]);
  const [sizes, setSizes] = React.useState<Size[]>(product?.sizes.length ? product.sizes : [{ label: "Unique" }]);
  const [stocks, setStocks] = React.useState<Stock[]>(product?.stocks || []);
  const [images] = React.useState<string[]>(product?.images || []);
  const stockValue = (color: number, size: number) => stocks.find((stock) => stock.color === color && stock.size === size)?.value ?? 0;
  const setStock = (color: number, size: number, value: number) => setStocks((current) => [...current.filter((stock) => !(stock.color === color && stock.size === size)), { color, size, value }]);

  return <div className="border border-slate-900 bg-white p-6 shadow-[6px_6px_0_#0f172a]">
    <div className="mb-6 flex items-center justify-between"><h2 className="text-xl font-semibold">{product ? "Modifier l’article" : "Nouvel article"}</h2><button type="button" onClick={onClose} className="text-sm underline underline-offset-4">Fermer</button></div>
    <form action={product ? updateProduct : createProduct} onSubmit={onClose} className="space-y-8">
      {product && <input type="hidden" name="id" value={product.id} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">Nom<input name="name" required defaultValue={product?.name} className="mt-2 h-11 w-full border border-slate-300 px-3" /></label>
        <label className="text-sm font-medium">Slug<input name="slug" required defaultValue={product?.slug} className="mt-2 h-11 w-full border border-slate-300 px-3" /></label>
        <label className="text-sm font-medium">Type<select name="typeId" required defaultValue={product?.typeId || types[0]?.id} className="mt-2 h-11 w-full border border-slate-300 bg-white px-3"><option value="">Choisir un type</option>{types.map((type) => <option key={type.id} value={type.id}>{type.category} / {type.name}</option>)}</select></label>
        <label className="text-sm font-medium">Genre<select name="gender" defaultValue={product?.gender} className="mt-2 h-11 w-full border border-slate-300 bg-white px-3"><option value="">Non précisé</option><option>Homme</option><option>Femme</option><option>Unisexe</option></select></label>
        <label className="text-sm font-medium">Prix normal<input name="price" required min="0" step="0.01" type="number" defaultValue={product?.price} className="mt-2 h-11 w-full border border-slate-300 px-3" /></label>
        <label className="text-sm font-medium">Prix promotionnel<input name="salePrice" min="0" step="0.01" type="number" defaultValue={product?.salePrice ?? ""} className="mt-2 h-11 w-full border border-slate-300 px-3" /></label>
        <label className="text-sm font-medium">Devise<input name="currency" required maxLength={3} defaultValue={product?.currency || "XOF"} className="mt-2 h-11 w-full border border-slate-300 px-3 uppercase" /></label>
        <label className="text-sm font-medium sm:col-span-2">Description<textarea name="description" defaultValue={product?.description} className="mt-2 min-h-24 w-full border border-slate-300 p-3" /></label>
      </div>

      <fieldset><legend className="mb-3 text-sm font-semibold">Couleurs</legend><div className="space-y-3">{colors.map((color, index) => <div key={index} className="grid gap-2 sm:grid-cols-[1fr_130px_1fr_auto]"><input aria-label={`Nom couleur ${index + 1}`} placeholder="Nom, ex. Noir" required value={color.name} onChange={(event) => setColors(colors.map((item, itemIndex) => itemIndex === index ? { ...item, name: event.target.value } : item))} className="h-10 border border-slate-300 px-3" /><select aria-label="Type de couleur" value={color.type} onChange={(event) => setColors(colors.map((item, itemIndex) => itemIndex === index ? { ...item, type: event.target.value as Color["type"], value: event.target.value === "HEX" ? "#000000" : "" } : item))} className="h-10 border border-slate-300 bg-white px-2"><option value="HEX">Couleur HEX</option><option value="IMAGE">Image</option></select>{color.type === "HEX" ? <div className="flex h-10 items-center gap-2 border border-slate-300 px-2"><input aria-label={`Sélection HEX ${index + 1}`} type="color" value={color.value || "#000000"} onChange={(event) => setColors(colors.map((item, itemIndex) => itemIndex === index ? { ...item, value: event.target.value } : item))} className="h-7 w-10 cursor-pointer border-0 bg-transparent p-0" /><span className="font-mono text-xs uppercase">{color.value}</span></div> : <input aria-label={`Image couleur ${index + 1}`} name={`colorImage_${index}`} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="h-10 w-full border border-slate-300 px-2 py-2 text-xs" />}{colors.length > 1 && <button type="button" title="Supprimer la couleur" onClick={() => setColors(colors.filter((_, itemIndex) => itemIndex !== index))} className="p-2 text-red-500"><Trash2 size={16} /></button>}</div>)}</div><button type="button" onClick={() => setColors([...colors, blankColor()])} className="mt-3 flex items-center gap-2 text-sm underline underline-offset-4"><Plus size={15} /> Ajouter une couleur</button><input type="hidden" name="colors" value={JSON.stringify(colors)} /></fieldset>

      <fieldset><legend className="mb-3 text-sm font-semibold">Images de l’article</legend><p className="mb-3 text-xs text-slate-500">Sélectionnez une ou plusieurs images depuis votre ordinateur. La première sera l’image principale.</p>{images.length > 0 && <div className="mb-3 flex flex-wrap gap-2">{images.map((image) => <span key={image} className="border border-slate-200 px-2 py-1 font-mono text-xs">{image.split("/").pop()}</span>)}</div>}<input name="articleImages" type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif" required={!images.length} className="h-11 w-full border border-slate-300 px-3 py-2 text-sm" /><input type="hidden" name="existingImages" value={JSON.stringify(images)} /></fieldset>

      <fieldset><legend className="mb-3 text-sm font-semibold">Stock par couleur et taille</legend><div className="overflow-x-auto border border-slate-200"><table className="w-full min-w-[500px] text-sm"><thead><tr className="bg-slate-50 text-left"><th className="p-3">Couleur / Taille</th>{sizes.map((size, index) => <th key={index} className="p-3"><input required value={size.label} onChange={(event) => setSizes(sizes.map((item, itemIndex) => itemIndex === index ? { label: event.target.value } : item))} className="h-9 w-24 border border-slate-300 px-2" /></th>)}<th /></tr></thead><tbody>{colors.map((color, colorIndex) => <tr key={colorIndex} className="border-t border-slate-200"><th className="p-3 text-left font-medium">{color.name || `Couleur ${colorIndex + 1}`}</th>{sizes.map((_, sizeIndex) => <td key={sizeIndex} className="p-3"><input aria-label={`Stock ${color.name} ${sizes[sizeIndex].label}`} min="0" type="number" value={stockValue(colorIndex, sizeIndex)} onChange={(event) => setStock(colorIndex, sizeIndex, Number(event.target.value))} className="h-9 w-24 border border-slate-300 px-2" /></td>)}<td /></tr>)}</tbody></table></div><button type="button" onClick={() => setSizes([...sizes, { label: "" }])} className="mt-3 flex items-center gap-2 text-sm underline underline-offset-4"><Plus size={15} /> Ajouter une taille</button><input type="hidden" name="sizes" value={JSON.stringify(sizes)} /><input type="hidden" name="stocks" value={JSON.stringify(stocks)} /></fieldset>
      <button type="submit" className="h-11 bg-slate-950 px-5 text-sm font-medium text-white hover:bg-slate-700">{product ? "Enregistrer les modifications" : "Créer l’article"}</button>
    </form>
  </div>;
}
