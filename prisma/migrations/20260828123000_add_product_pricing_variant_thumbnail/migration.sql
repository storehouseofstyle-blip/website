-- Add quick-view pricing fields without changing existing prices.
ALTER TABLE "produits" ADD COLUMN "prix_promotionnel" REAL;
ALTER TABLE "produits" ADD COLUMN "devise" TEXT NOT NULL DEFAULT 'XOF';
ALTER TABLE "variantes_produit" ADD COLUMN "miniature" TEXT;
