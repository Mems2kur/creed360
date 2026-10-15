import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PropertyImage } from "@/components/PropertyCard";
import { CheckIcon, Container, VerifiedBadge } from "@/components/ui";
import { getProperty } from "@/lib/db";
import { naira, shortDate, cx } from "@/lib/format";
import { DISCLAIMER, SITE } from "@/lib/site";
import { VERIFICATION_STEPS } from "@/lib/types";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const property = await getProperty((await params).id);
  return { title: property?.title ?? "Property" };
}

export default async function PropertyPage({ params }: Params) {
  const property = await getProperty((await params).id);
  if (!property || !property.published) notFound();

  const { verification } = property;
  const isVerified = verification.status === "verified";

  return (
    <>
      <section className="bg-navy pt-28 pb-10 text-white">
        <Container>
          <Link href="/properties" className="text-sm text-white/60 hover:text-white">← All properties</Link>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {isVerified && <VerifiedBadge />}
                <span className="rounded-full border border-white/25 px-2.5 py-1 text-[11px] font-semibold">{property.type}</span>
              </div>
              <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{property.title}</h1>
              <p className="mt-2 text-white/70">{property.location}, {property.state}</p>
            </div>
            <p className="font-display text-3xl font-semibold text-gold-light">{naira(property.price)}</p>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            {/* Gallery: first image large, the rest as a grid */}
            <PropertyImage property={property} className="aspect-[16/10] rounded-2xl" />
            {property.images.length > 1 && (
              <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {property.images.slice(1).map((src) => (
                  <a key={src} href={src} target="_blank" rel="noopener noreferrer" className="relative aspect-square overflow-hidden rounded-xl">
                    <Image src={src} alt="" fill unoptimized className="object-cover transition hover:scale-105" />
                  </a>
                ))}
              </div>
            )}

            <dl className="mt-8 grid grid-cols-2 gap-4 rounded-2xl bg-sand p-6 sm:grid-cols-4">
              {[
                ["Size", property.size],
                ["Title", property.titleDocument],
                ...(property.bedrooms ? [["Bedrooms", String(property.bedrooms)]] : []),
                ...(property.bathrooms ? [["Bathrooms", String(property.bathrooms)]] : []),
              ]
                .filter(([, value]) => value) // skip fields left blank in the admin
                .map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</dt>
                  <dd className="mt-1 font-semibold text-navy">{value}</dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-10 text-2xl font-semibold text-navy">About this property</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-muted">{property.description}</p>

            {property.features.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl font-semibold text-navy">Features</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {property.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-ink"><CheckIcon className="text-gold-dark" /> {f}</li>
                  ))}
                </ul>
              </>
            )}

            {property.paymentOptions.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl font-semibold text-navy">Ways to buy</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {property.paymentOptions.map((o) => (
                    <span key={o} className="rounded-full bg-navy-50 px-4 py-2 text-sm font-semibold text-navy">{o}</span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar: verification record + calls to action */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-navy/10 p-6 shadow-sm">
              <p className="eyebrow">Verification record</p>
              <h2 className="mt-2 text-xl font-semibold text-navy">
                {isVerified ? "Verified by Creed 360" : verification.status === "in_review" ? "Verification in progress" : "Not yet verified"}
              </h2>
              {verification.verifiedAt && isVerified && <p className="text-sm text-muted">Completed {shortDate(verification.verifiedAt)}</p>}
              <ul className="mt-5 space-y-3">
                {VERIFICATION_STEPS.map((s) => {
                  const done = verification.checks[s.key];
                  return (
                    <li key={s.key} className="flex items-start gap-3">
                      <span className={cx("mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full", done ? "bg-gradient-gold text-navy-900" : "border border-navy/20 text-transparent")}>
                        <CheckIcon className="h-3.5 w-3.5" />
                      </span>
                      <div>
                        <p className={cx("text-sm font-semibold", done ? "text-navy" : "text-muted")}>{s.label}</p>
                        <p className="text-xs text-muted">{s.hint}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {verification.notes && <p className="mt-5 rounded-xl bg-sand p-4 text-sm text-ink">{verification.notes}</p>}
              <p className="mt-5 text-xs text-muted">{DISCLAIMER}</p>
            </div>

            <div className="rounded-2xl bg-navy p-6 text-white">
              <h2 className="text-xl font-semibold">Interested in this property?</h2>
              <p className="mt-2 text-sm text-white/70">{SITE.promise} Book an independent verification or speak with an advisor first.</p>
              <div className="mt-5 grid gap-3">
                <Link href={`/book-verification?property=${property.id}`} className="btn btn-gold">Book a Verification</Link>
                <a href={`${SITE.whatsapp}?text=${encodeURIComponent(`Hello Creed 360, I'm interested in "${property.title}" (${property.location}).`)}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-white">
                  Chat with an Advisor
                </a>
              </div>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
