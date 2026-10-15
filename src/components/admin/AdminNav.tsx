"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/admin";
import { cx } from "@/lib/format";

const LINKS = [
  { href: "/admin", label: "Overview", icon: "M3 12l9-8 9 8M5 10v10h14V10" },
  { href: "/admin/properties", label: "Properties", icon: "M4 21V8l8-5 8 5v13M9 21v-6h6v6" },
  { href: "/admin/verifications", label: "Verifications", icon: "M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" },
];

export default function AdminNav({ newRequests }: { newRequests: number }) {
  const pathname = usePathname();
  const active = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  return (
    <aside className="flex flex-col bg-navy-900 text-white lg:fixed lg:inset-y-0 lg:w-64">
      <div className="flex items-center justify-between px-5 py-5 lg:block">
        <Link href="/admin"><Image src="/brand/logo-white.png" alt="Creed 360" width={140} height={40} /></Link>
        <p className="hidden text-xs uppercase tracking-[0.2em] text-gold-light lg:mt-2 lg:block">Admin</p>
      </div>

      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:pb-0">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={cx(
              "flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
              active(l.href) ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/5 hover:text-white",
            )}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d={l.icon} /></svg>
            {l.label}
            {l.href === "/admin/verifications" && newRequests > 0 && (
              <span className="ml-auto rounded-full bg-gradient-gold px-2 text-xs font-bold text-navy-900">{newRequests}</span>
            )}
          </Link>
        ))}
      </nav>

      <div className="hidden space-y-1 border-t border-white/10 p-3 lg:block">
        <Link href="/" target="_blank" className="block rounded-xl px-3 py-2 text-sm text-white/65 hover:text-white">View website ↗</Link>
        <form action={logout}>
          <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-white/65 hover:text-white">Sign out</button>
        </form>
      </div>
    </aside>
  );
}
