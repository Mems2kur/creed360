import type { Metadata } from "next";
import AdminNav from "@/components/admin/AdminNav";
import { logout } from "@/app/actions/admin";
import { requireAdmin } from "@/lib/auth";
import { getVerifications } from "@/lib/db";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };
export const dynamic = "force-dynamic";

// Everything inside (dashboard) is protected: no session → redirect to /admin/login.
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const newRequests = (await getVerifications()).filter((v) => v.status === "new").length;

  return (
    <div className="min-h-screen bg-[#f5f6f9]">
      <AdminNav newRequests={newRequests} />
      <div className="lg:pl-64">
        <div className="flex justify-end gap-4 border-b border-navy/10 bg-white px-4 py-2 text-sm lg:hidden">
          <a href="/" target="_blank" className="text-muted">View website ↗</a>
          <form action={logout}><button className="text-muted">Sign out</button></form>
        </div>
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
