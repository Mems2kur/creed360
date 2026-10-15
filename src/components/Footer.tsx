import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white/75">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Image src="/brand/logo-white.png" alt="Creed 360" width={170} height={49} />
          <p className="mt-4 font-display text-lg text-white">{SITE.trust}</p>
          <p className="mt-1 text-sm text-gold-light">{SITE.tagline}</p>
        </div>

        <div>
          <h3 className="eyebrow">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">{l.label}</Link>
              </li>
            ))}
            <li><Link href="/book-verification" className="hover:text-white">Book a Verification</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">{SITE.name}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>{SITE.rc}</li>
            <li>{SITE.address}</li>
            <li><a href={SITE.phoneHref} className="hover:text-white">{SITE.phone}</a></li>
            <li><a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></li>
            <li><a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gold-light hover:text-white">Chat with an Advisor on WhatsApp →</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-white/50 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {SITE.name} · {SITE.rc}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
