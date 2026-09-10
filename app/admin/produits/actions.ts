"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/admin-auth";
import type { Prisma } from "@prisma/client";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

function text(formData: FormData, name: string) {
  return String(formData.get(name) || "").trim();
}

function json<T>(formData: FormData, name: string, fallback: T): T {
  try {
    return JSON.parse(text(formData, name)) as T;
  } catch {
    return fallback;
  }
}

const imageTypes = new Map([["image/jpeg", ".jpg"], ["image/png", ".png"], ["image/webp", ".webp"], ["image/gif", ".gif"]]);

async function saveImage(file: File, folder: "article-images" | "color-images") {
  if (!file.size) return null;
  const extension = imageTypes.get(file.type);
  if (!extension || file.size > 8 * 1024 * 1024) throw new Error("Image invalide (JPG, PNG, WEBP ou GIF, 8 Mo maximum)");
  const directory = path.join(process.cwd(), "public", folder);
  await mkdir(directory, { recursive: true });
  const filename = `${randomUUID()}${extension}`;
  await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()));
  return `/${folder}/${filename}`;
}

function productData(formData: FormData) {
  const name = text(formData, "name");
  const slug = text(formData, "slug").toLowerCase();
  const typeId = text(formData, "typeId");
  const price = Number(formData.get("price"));
  const salePriceValue = text(formData, "salePrice");
  const salePrice = salePriceValue ? Number(salePriceValue) : null;
  const currency = text(formData, "currency").toUpperCase() || "XOF";
  if (!name || !slug || !typeId || !Number.isFinite(price) || price < 0 || (salePrice !== null && (!Number.isFinite(salePrice) || salePrice < 0 || salePrice >= price))) {
    throw new Error("Données produit invalides");
  }
  return { name, slug, typeId, price, salePrice, currency, description: text(formData, "description") || null, gender: text(formData, "gender") || null };
}

type ColorInput = { name: string; type: "HEX" | "IMAGE"; value: string };
type SizeInput = { label: string };
type StockInput = { color: number; size: number; value: number };

async function productOptions(formData: FormData) {
  const colors = json<ColorInput[]>(formData, "colors", []).filter((color) => color.name?.trim());
  const sizes = json<SizeInput[]>(formData, "sizes", []).filter((size) => size.label?.trim());
  const stocks = json<StockInput[]>(formData, "stocks", []);
  const existingImages = json<string[]>(formData, "existingImages", []);
  const uploadedImages = (formData.getAll("articleImages").filter((value): value is File => value instanceof File));
  const images = [...existingImages, ...(await Promise.all(uploadedImages.map((file) => saveImage(file, "article-images"))))].filter((image): image is string => Boolean(image));
  if (!colors.length || !sizes.length || !images.length) throw new Error("Ajoutez au moins une couleur, une taille et une image");
  if (colors.some((color) => !["HEX", "IMAGE"].includes(color.type) || (color.type === "HEX" && !/^#[0-9a-f]{6}$/i.test(color.value)))) throw new Error("Couleur HEX invalide");
  for (const [index, color] of colors.entries()) {
    if (color.type === "IMAGE") {
      const uploadedColor = formData.get(`colorImage_${index}`);
      const image = uploadedColor instanceof File ? await saveImage(uploadedColor, "color-images") : color.value;
      if (!image) throw new Error("Ajoutez une image pour chaque couleur image");
      color.value = image;
    }
  }
  return { colors, sizes, stocks, images };
}

async function saveProductOptions(transaction: Prisma.TransactionClient, productId: string, options: Awaited<ReturnType<typeof productOptions>>) {
  const colors = await Promise.all(options.colors.map((color) => transaction.productColor.create({ data: { productId, name: color.name.trim(), type: color.type, value: color.value.trim() } })));
  const sizes = await Promise.all(options.sizes.map((size) => transaction.productSize.create({ data: { productId, label: size.label.trim() } })));
  await transaction.media.createMany({ data: options.images.map((url, order) => ({ productId, url, order, isMain: order === 0 ? 1 : 0 })) });
  await transaction.productVariant.createMany({
    data: colors.flatMap((color, colorIndex) => sizes.map((size, sizeIndex) => {
      const stock = options.stocks.find((item) => item.color === colorIndex && item.size === sizeIndex)?.value ?? 0;
      return { productId, colorId: color.id, sizeId: size.id, color: color.name, sizeOrCut: size.label, thumbnail: color.type === "IMAGE" ? color.value : null, stock: Math.max(0, Number(stock) || 0) };
    })),
  });
}

export async function createProduct(formData: FormData) {
  if (!(await getCurrentAdmin())) redirect("/admin/login");
  const data = productData(formData);
  const options = await productOptions(formData);
  await db.$transaction(async (transaction) => {
    const product = await transaction.product.create({ data });
    await saveProductOptions(transaction, product.id, options);
  });
  revalidatePath("/admin/produits");
  revalidatePath("/");
}

export async function updateProduct(formData: FormData) {
  if (!(await getCurrentAdmin())) redirect("/admin/login");
  const id = text(formData, "id");
  if (!id) throw new Error("Produit introuvable");
  const options = await productOptions(formData);
  await db.$transaction(async (transaction) => {
    await transaction.product.update({ where: { id }, data: productData(formData) });
    await transaction.productVariant.deleteMany({ where: { productId: id } });
    await transaction.productColor.deleteMany({ where: { productId: id } });
    await transaction.productSize.deleteMany({ where: { productId: id } });
    await transaction.media.deleteMany({ where: { productId: id } });
    await saveProductOptions(transaction, id, options);
  });
  revalidatePath("/admin/produits");
  revalidatePath("/");
}

export async function deleteProduct(formData: FormData) {
  if (!(await getCurrentAdmin())) redirect("/admin/login");
  const id = text(formData, "id");
  if (!id) throw new Error("Produit introuvable");
  await db.product.delete({ where: { id } });
  revalidatePath("/admin/produits");
  revalidatePath("/");
}
