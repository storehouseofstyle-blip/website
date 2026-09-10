import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/admin-auth";
import ProductManager from "./ProductManager";

export default async function ProductsPage() {
  if (!(await getCurrentAdmin())) redirect("/admin/login");

  const [products, types] = await Promise.all([
    db.product.findMany({ orderBy: { createdAt: "desc" }, include: { type: { include: { category: true } }, variants: true, colors: true, sizes: true, media: { orderBy: { order: "asc" } } } }),
    db.type.findMany({ orderBy: { name: "asc" }, include: { category: true } }),
  ]);

  return (
    <main className="p-6 sm:p-10 lg:p-14">
      <ProductManager
        products={products.map((product) => ({
          id: product.id,
          name: product.name,
          slug: product.slug,
          typeId: product.typeId,
          type: product.type.name,
          category: product.type.category.name,
          description: product.description || "",
          gender: product.gender || "",
          price: product.price,
          salePrice: product.salePrice,
          currency: product.currency,
          stock: product.variants.reduce((total, variant) => total + variant.stock, 0),
          colors: product.colors.map((color) => ({ name: color.name, type: color.type as "HEX" | "IMAGE", value: color.value })),
          sizes: product.sizes.map((size) => ({ label: size.label })),
          stocks: product.variants.filter((variant) => variant.colorId && variant.sizeId).map((variant) => ({ color: product.colors.findIndex((color) => color.id === variant.colorId), size: product.sizes.findIndex((size) => size.id === variant.sizeId), value: variant.stock })),
          images: product.media.map((media) => media.url),
        }))}
        types={types.map((type) => ({ id: type.id, name: type.name, category: type.category.name }))}
      />
    </main>
  );
}
