import type { Metadata } from "next";
import Link from "next/link";
import { DifferentiatorSection, FaqSection, FinalCta, HowWeVerifySection, SmartSection, SurveyingSection } from "@/components/sections";
import { CheckIcon, Container, PageHero } from "@/components/ui";
import { SERVICES, SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Solutions for every stage of your property journey."
        intro="Six services, one standard: help clients decide with better information."
      >
        <p className="mt-6 font-display text-sm font-medium tracking-wide text-gold-light">{SITE.positioning}</p>
      </PageHero>

      <section className="py-20">
        <Container className="space-y-6">
          {SERVICES.map((s, i) => (
            <article
              id={s.slug}
              key={s.slug}
              className="grid scroll-mt-28 gap-6 rounded-3xl border border-navy/10 p-8 sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-12"
            >
              <span className="font-display text-5xl font-bold text-gradient-gold">0{i + 1}</span>
              <div>
                <h2 className="text-2xl font-semibold text-navy sm:text-3xl">{s.title}</h2>
                <p className="mt-2 font-display font-medium text-gold-dark">{s.lead}</p>
                <p className="mt-3 max-w-2xl text-muted">{s.body}</p>
                {s.bullets && (
                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2"><CheckIcon className="text-gold-dark" /> {b}</li>
                    ))}
                  </ul>
                )}
              </div>
              <Link href={s.href} className="btn btn-navy justify-self-start">{s.cta}</Link>
            </article>
          ))}
        </Container>
      </section>

      <DifferentiatorSection />
      <HowWeVerifySection />
      <SurveyingSection />
      <SmartSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
