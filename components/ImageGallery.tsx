import Image from 'next/image';

export default function ImageGallery({ images }: { images?: { url: string; alt?: string }[] }) {
  const first = images && images.length > 0 ? images[0] : { url: '/man/man-princ3.png', alt: 'Image produit' };

  return (
    <div className="w-full">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate-50">
        <Image src={first.url} alt={first.alt || 'product image'} fill className="object-contain" />
      </div>
    </div>
  );
}
