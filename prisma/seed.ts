import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Empty seed. Can be updated later with new models (Type, ProductVariant, Media, Product, Category)
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
