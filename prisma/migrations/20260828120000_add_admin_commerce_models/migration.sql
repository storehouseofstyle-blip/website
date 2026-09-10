-- CreateTable
CREATE TABLE "utilisateurs_admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "mot_de_passe_hash" TEXT NOT NULL,
    "nom" TEXT,
    "cree_le" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "prenom" TEXT,
    "nom" TEXT,
    "telephone" TEXT,
    "cree_le" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "commandes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numero" TEXT NOT NULL,
    "client_id" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'pending',
    "total" REAL NOT NULL DEFAULT 0,
    "devise" TEXT NOT NULL DEFAULT 'EUR',
    "donnees_livraison" TEXT,
    "cree_le" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "commandes_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "lignes_commande" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "commande_id" TEXT NOT NULL,
    "produit_id" TEXT,
    "nom" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "prix_unitaire" REAL NOT NULL,
    CONSTRAINT "lignes_commande_commande_id_fkey" FOREIGN KEY ("commande_id") REFERENCES "commandes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "utilisateurs_admin_email_key" ON "utilisateurs_admin"("email");
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");
CREATE UNIQUE INDEX "commandes_numero_key" ON "commandes"("numero");
CREATE INDEX "commandes_statut_idx" ON "commandes"("statut");
CREATE INDEX "commandes_cree_le_idx" ON "commandes"("cree_le");
