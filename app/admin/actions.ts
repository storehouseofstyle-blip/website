"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { clearAdminSession, setAdminSession, verifyPassword } from "@/lib/admin-auth";

export async function loginAdmin(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const admin = await db.adminUser.findUnique({ where: { email } });

  if (!admin || !verifyPassword(password, admin.passwordHash)) {
    redirect("/admin/login?error=invalid");
  }

  await setAdminSession(admin.id);
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}
