import { db } from "@/lib/db";
import { hashPassword } from "@/lib/admin-auth";

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
const name = process.env.ADMIN_NAME?.trim() || "Administrateur";

if (!email || !password || password.length < 12) {
  throw new Error("Définissez ADMIN_EMAIL et ADMIN_PASSWORD (12 caractères minimum). ");
}

const adminPassword = password;
const adminEmail = email;

async function main() {
  const admin = await db.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash: hashPassword(adminPassword), name },
    create: { email: adminEmail, passwordHash: hashPassword(adminPassword), name },
  });
  console.log(`Compte admin prêt: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
