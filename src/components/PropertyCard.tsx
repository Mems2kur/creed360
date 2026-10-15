import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/types";
import { naira } from "@/lib/format";
import { VerifiedBadge } from "./ui";

/** Photo or, when a listing has no photos yet, a branded placeholder. */
export function PropertyImage({ property, className = "" }: { property: Property; className?: string }) {
  const src = property.images[0];
  return (
    <div className={`relative overflow-hidden bg-navy ${className}`}>
      {src ? (
        // Uploaded images are served by our own route handler, so we skip Next's optimiser.
        <Image src={src} alt={property.title} fill unoptimized className="object-cover" sizes="(min-width:1024px) 33vw, 100vw" />
      ) : (
        <div className="bg-contours absolute inset-0 grid place-items-center">
          <Image src="/brand/mark.png" alt="" width={64} height={64} className="opacity-80" />
        </div>
      )}
    </div>
  );
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <PropertyImage property={property} className="aspect-[4/3]" />
        <div className="absolute left-3 top-3 flex gap-2">
          {property.verification.status === "verified" && <VerifiedBadge />}
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-navy">{property.type}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-muted">{property.location}, {property.state}</p>
        <h3 className="mt-1 text-lg font-semibold text-navy">{property.title}</h3>
        <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <div><dt className="sr-only">Size</dt><dd>{property.size}</dd></div>
          {property.bedrooms ? <div><dt className="sr-only">Bedrooms</dt><dd>{property.bedrooms} bed</dd></div> : null}
          {property.titleDocument && <div><dt className="sr-only">Title</dt><dd>{property.titleDocument}</dd></div>}
        </dl>
        <div className="mt-auto flex items-end justify-between pt-5">
          <p className="font-display text-xl font-semibold text-navy">{naira(property.price)}</p>
          <Link href={`/properties/${property.id}`} className="text-sm font-semibold text-gold-dark hover:text-navy">
            View Property →
          </Link>
        </div>
      </div>
    </article>
  );
}
