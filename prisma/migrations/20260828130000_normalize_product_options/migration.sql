-- Normalize product colors and sizes while keeping legacy variant fields for public pages.
CREATE TABLE "couleurs_article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "produit_id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'HEX',
    "valeur" TEXT NOT NULL,
    CONSTRAINT "couleurs_article_produit_id_fkey" FOREIGN KEY ("produit_id") REFERENCES "produits" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "couleurs_article_produit_id_nom_key" ON "couleurs_article"("produit_id", "nom");

CREATE TABLE "tailles_article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "produit_id" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    CONSTRAINT "tailles_article_produit_id_fkey" FOREIGN KEY ("produit_id") REFERENCES "produits" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "tailles_article_produit_id_libelle_key" ON "tailles_article"("produit_id", "libelle");

ALTER TABLE "variantes_produit" ADD COLUMN "couleur_id" TEXT;
ALTER TABLE "variantes_produit" ADD COLUMN "taille_id" TEXT;
CREATE INDEX "variantes_produit_produit_id_couleur_id_taille_id_idx" ON "variantes_produit"("produit_id", "couleur_id", "taille_id");
