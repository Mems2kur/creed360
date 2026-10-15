import "server-only";
import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Single-password admin login.
 * The cookie holds an HMAC of the password, so it can't be forged without
 * ADMIN_SECRET, and changing ADMIN_PASSWORD logs everyone out.
 */

export const SESSION_COOKIE = "creed_admin";

function sessionToken() {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SECRET;
  if (!password || !secret) {
    throw new Error("Set ADMIN_PASSWORD and ADMIN_SECRET in .env.local to use the admin dashboard.");
  }
  return crypto.createHmac("sha256", secret).update(password).digest("hex");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

export function checkPassword(password: string) {
  return safeEqual(password, process.env.ADMIN_PASSWORD ?? "");
}

export async function startSession() {
  (await cookies()).set(SESSION_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function isAdmin() {
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  return !!value && safeEqual(value, sessionToken());
}

/** Call at the top of every admin page AND every admin server action. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
