import Image from "next/image";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import {
  DifferentiatorSection, FaqSection, FinalCta, HowWeVerifySection, PalmoraTeaser,
  PillarsSection, ResultsSection, SmartSection, SurveyingSection, TeamSection, WhySection,
} from "@/components/sections";
import { Container, SectionHeading } from "@/components/ui";
import { getPublishedProperties } from "@/lib/db";
import { SERVICES, SITE } from "@/lib/site";

// Re-read the JSON data on every request so new admin uploads show immediately.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const published = await getPublishedProperties();
  // Featured first, then newest; show three on the home page
  const featured = [...published].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 3);

  return (
    <>
      {/* 01 — HERO */}
      <section className="bg-contours relative overflow-hidden bg-navy pt-36 pb-24 text-white lg:pt-44 lg:pb-32">
        <Container className="grid items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <p className="eyebrow">{SITE.tagline}</p>
            <h1 className="mt-4 text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
              Make <span className="text-gradient-gold">smarter</span> property decisions.
            </h1>
            <p className="mt-6 font-display text-sm font-medium tracking-wide text-gold-light">{SITE.positioning}</p>
            <p className="mt-5 max-w-xl text-lg text-white/75">
              We help you find, verify, and move forward with greater clarity — whether you’re buying outright, using a payment plan, or exploring mortgage options.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/book-verification" className="btn btn-gold">Book a Verification</Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-white">Talk to an Advisor</a>
            </div>
            <p className="mt-8 flex items-center gap-2 text-sm text-white/60">
              <span className="h-px w-8 bg-gold" /> {SITE.trust}
            </p>
          </div>
          <div className="relative mx-auto hidden w-full max-w-sm lg:block">
            <div className="absolute inset-0 rounded-full bg-gold/20 blur-3xl" />
            <Image src="/brand/seal.png" alt="Creed 360 Ltd seal" width={420} height={420} className="relative" priority />
          </div>
        </Container>
      </section>

      <PillarsSection />

      {/* 03 — WHAT WE DO (summary; full detail lives on /services) */}
      <section className="bg-sand py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="What we do"
              title="Solutions for every stage of your property journey."
              intro="Six services, one standard: help clients decide with better information."
            />
            <Link href="/services" className="btn btn-navy">All services</Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Link
                key={s.slug}
                href={s.slug === "structured-investments" ? "/palmora-roots" : `/services#${s.slug}`}
                className="group rounded-2xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="font-display text-sm font-semibold text-gold-dark">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-semibold text-navy">{s.title}</h3>
                <p className="mt-2 text-muted">{s.lead}</p>
                <span className="mt-5 inline-block text-sm font-semibold text-gold-dark group-hover:text-navy">{s.cta} →</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <DifferentiatorSection />

      {/* 05 — VERIFIED PROPERTIES */}
      <section className="py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Verified properties"
              title="Find property with more confidence."
              intro="Explore selected property opportunities with relevant information available to help you make a more informed decision."
            />
            <div className="flex gap-3">
              <Link href="/properties" className="btn btn-navy">Explore All Properties</Link>
              <Link href="/book-verification" className="btn btn-outline text-navy">Book a Verification</Link>
            </div>
          </div>
          {featured.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => <PropertyCard key={p.id} property={p} />)}
            </div>
          ) : (
            <p className="mt-12 rounded-2xl border border-dashed border-navy/20 p-10 text-center text-muted">
              New verified listings are on the way. In the meantime, <Link href="/book-verification" className="font-semibold text-navy underline">tell us what you’re looking for</Link>.
            </p>
          )}
        </Container>
      </section>

      <HowWeVerifySection />
      <SurveyingSection />
      <SmartSection />
      <PalmoraTeaser />
      <WhySection />
      <TeamSection />
      <ResultsSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
