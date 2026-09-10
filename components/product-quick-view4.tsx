"use client";

import Image from "next/image";
import { Eye } from "lucide-react";
import * as React from "react";
import { Price, PriceValue } from "@/components/shadcnblocks/price";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type QuickViewImage = { src: string; alt: string };
type QuickViewColor = { id: string; label: string; value: string; type: "HEX" | "IMAGE"; stock: number };
type QuickViewSize = { id: string; label: string; stock: number };

export type ProductQuickViewData = {
  name: string;
  description?: string | null;
  link: string;
  images: QuickViewImage[];
  price: { regular: number; sale?: number | null; currency: string };
  colors: QuickViewColor[];
  sizes: QuickViewSize[];
};

export function ProductQuickView4({ product }: { product: ProductQuickViewData }) {
  const [selectedColor, setSelectedColor] = React.useState(product.colors[0]?.id || "");
  const [selectedSize, setSelectedSize] = React.useState(product.sizes[0]?.id || "");
  const activeColor = product.colors.find((color) => color.id === selectedColor);
  const activeSize = product.sizes.find((size) => size.id === selectedSize);

  return <Dialog>
    <DialogTrigger render={<Button variant="outline" size="sm" className="gap-2" />}><Eye size={15} /> Voir</DialogTrigger>
    <DialogContent style={{ "--dialog-height": "calc(100dvh - 2.5rem)", "--dialog-max-height": "38.75rem" } as React.CSSProperties} className="block h-dvh w-full max-w-240! rounded-none border-none p-0 md:h-[var(--dialog-height)] md:max-h-[var(--dialog-max-height)]">
      <div className="max-md:hide-scrollbar grid overflow-auto max-md:h-full md:grid-cols-2 md:overflow-hidden">
        <div><Carousel className="h-full md:[&>div]:h-full"><CarouselContent className="-ml-0 md:h-full">{product.images.map((image, index) => <CarouselItem key={`${image.src}-${index}`} className="w-full pl-0 md:h-[var(--dialog-height)] md:max-h-[var(--dialog-max-height)]"><div className="size-full overflow-hidden max-md:aspect-square"><Image src={image.src} alt={image.alt || product.name} fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 50vw" /></div></CarouselItem>)}</CarouselContent>{product.images.length > 1 && <><CarouselPrevious className="left-1.5" /><CarouselNext className="right-1.5" /></>}</Carousel></div>
        <div><div className="hide-scrollbar h-full space-y-8 px-8 py-8 md:h-[var(--dialog-height)] md:max-h-[var(--dialog-max-height)] md:overflow-auto md:px-15 md:py-14"><DialogTitle className="text-2xl leading-normal font-semibold">{product.name}</DialogTitle><Price onSale={product.price.sale != null} className="items-end text-xl font-semibold"><PriceValue price={product.price.sale ?? undefined} currency={product.price.currency} variant="sale" /><PriceValue price={product.price.regular} currency={product.price.currency} variant="regular" /></Price>{product.colors.length > 0 && <fieldset className="space-y-3"><legend className="text-sm leading-normal font-semibold">Couleur : <span className="font-normal text-muted-foreground">{activeColor?.label}</span></legend><div className="flex flex-wrap items-center gap-3">{product.colors.map((color) => <button key={color.id} type="button" title={color.label} disabled={color.stock === 0} onClick={() => setSelectedColor(color.id)} className={`relative size-10 shrink-0 cursor-pointer overflow-hidden rounded-md border p-0.5 ${selectedColor === color.id ? "ring-2" : ""} ${color.stock === 0 ? "opacity-50" : ""}`}>{color.type === "IMAGE" ? <Image src={color.value} alt={color.label} fill className="rounded-sm object-cover" sizes="36px" /> : <span className="block size-full rounded-sm" style={{ backgroundColor: color.value }} />}</button>)}</div></fieldset>}{product.sizes.length > 0 && <fieldset className="space-y-3"><legend className="text-sm leading-normal font-semibold">Taille : <span className="font-normal text-muted-foreground">{activeSize?.label}</span></legend><div className="flex w-full flex-wrap justify-start gap-2">{product.sizes.map((size) => <button key={size.id} type="button" disabled={size.stock === 0} onClick={() => setSelectedSize(size.id)} className={`relative flex h-10 min-w-10 shrink-0 items-center justify-center rounded-md border px-5 py-2.5 text-center text-sm uppercase ${selectedSize === size.id ? "bg-primary text-primary-foreground" : ""} ${size.stock === 0 ? "cursor-not-allowed bg-muted text-muted-foreground line-through" : ""}`}>{size.label}</button>)}</div></fieldset>}<Button variant="link" className="px-0" render={<a href={product.link} />} nativeButton={false}>Voir la fiche produit</Button></div></div>
      </div>
    </DialogContent>
  </Dialog>;
}
