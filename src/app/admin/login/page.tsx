import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { isAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "Admin login", robots: { index: false } };

export default async function LoginPage() {
  if (await isAdmin().catch(() => false)) redirect("/admin");

  return (
    <main className="bg-contours grid min-h-screen place-items-center bg-navy px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl">
        <Image src="/brand/logo-navy.png" alt="Creed 360" width={160} height={46} className="mx-auto" />
        <h1 className="mt-6 text-center text-xl font-semibold text-navy">Admin dashboard</h1>
        <p className="mt-1 text-center text-sm text-muted">Sign in to manage properties and verifications.</p>
        <LoginForm />
      </div>
    </main>
  );
}
