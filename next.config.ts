import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ajoutez ce bloc expérimental indispensable pour Prisma 7 + Turbopack
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;
