import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Nettoyage de la base pour éviter les doublons au lancement (Ordre strict pour les clés étrangères)
  await prisma.review.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // 2. Création de la catégorie Men (via prisma.category)
  const catMen = await prisma.category.create({
    data: {
      name: "Men Fashion",
      slug: "men-fashion",
    },
  });

  // 3. Création du produit phare (via prisma.product)
  const hoodie = await prisma.product.create({
    data: {
      title: "Loose Fit Hoodie",
      slug: "loose-fit-hoodie",
      price: 24.99,
      description: "Loose-fit sweatshirt hoodie in medium weight cotton-blend fabric with a generous, but not oversized silhouette. Jersey-lined drawstring hood, dropped shoulders, long sleeves, and a kangaroo pocket.",
      sizes: "S,M,L,XL,XXL",
      categoryId: catMen.id,
    },
  });

  // 4. Injection des chemins d'images (via prisma.productImage)
  await prisma.productImage.createMany({
    data: [
      { url: "/images/hoodie-main.jpg", productId: hoodie.id },
      { url: "/images/hoodie-thumb-1.jpg", productId: hoodie.id },
      { url: "/images/hoodie-thumb-2.jpg", productId: hoodie.id },
    ],
  });

  // 5. Injection des avis clients (via prisma.review)
  await prisma.review.createMany({
    data: [
      {
        author: "Alexandre M.",
        rating: 5,
        comment: "Incroyable ! Coupe parfaite, le tissu est super confortable et épais. Je recommande à 100%.",
        productId: hoodie.id,
      },
      {
        author: "Sarah K.",
        rating: 4,
        comment: "Acheté pour mon copain, la taille S taille un tout petit peu grand mais le style loose est top.",
        productId: hoodie.id,
      },
    ],
  });

  console.log("🌱 Base de données SQLite initialisée avec succès !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
