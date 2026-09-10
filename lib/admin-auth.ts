import { cookies } from "next/headers";
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { db } from "@/lib/db";

const ADMIN_COOKIE = "house_style_admin";
const SESSION_TTL = 60 * 60 * 8;

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || "development-only-change-me";
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, expected] = storedHash.split(":");
  if (!salt || !expected) return false;

  const actual = scryptSync(password, salt, 64);
  const expectedBuffer = Buffer.from(expected, "hex");
  return actual.length === expectedBuffer.length && timingSafeEqual(actual, expectedBuffer);
}

function sign(value: string) {
  return createHmac("sha256", sessionSecret()).update(value).digest("hex");
}

export function createSessionValue(adminId: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL;
  const payload = `${adminId}.${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

function readSessionValue(value?: string) {
  if (!value) return null;
  const [adminId, expiresAt, signature] = value.split(".");
  if (!adminId || !expiresAt || !signature || Number(expiresAt) < Date.now() / 1000) return null;

  const payload = `${adminId}.${expiresAt}`;
  const expected = sign(payload);
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }
  return adminId;
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const adminId = readSessionValue(cookieStore.get(ADMIN_COOKIE)?.value);
  if (!adminId) return null;
  return db.adminUser.findUnique({ where: { id: adminId } });
}

export async function setAdminSession(adminId: string) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, createSessionValue(adminId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_TTL,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}
