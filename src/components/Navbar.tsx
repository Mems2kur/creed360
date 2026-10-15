"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/site";
import { cx } from "@/lib/format";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Solid background once the user scrolls past the hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "bg-navy-900/95 shadow-lg backdrop-blur" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Creed 360 home" className="shrink-0">
          <Image src="/brand/logo-white.png" alt="Creed 360" width={150} height={43} priority />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cx(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive(link.href) ? "text-gold-light" : "text-white/80 hover:text-white",
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-px bg-gradient-gold" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link href="/book-verification" className="btn btn-gold btn-sm">
            Book a Verification
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-navy-900 px-4 pb-6 md:hidden">
          <ul className="flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cx(
                    "block rounded-lg px-3 py-3 font-medium",
                    isActive(link.href) ? "bg-white/10 text-gold-light" : "text-white/85",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/book-verification" className="btn btn-gold w-full">
            Book a Verification
          </Link>
        </div>
      )}
    </header>
  );
}
