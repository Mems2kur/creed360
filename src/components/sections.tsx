import Image from "next/image";
import Link from "next/link";
import {
  DISCLAIMER, FAQS, FIELD_CAPTIONS, PALMORA, PILLARS, RESULTS, SITE, SMART_POINTS,
  TEAM, VERIFY_STEPS, WHY_POINTS,
} from "@/lib/site";
import { naira } from "@/lib/format";
import { CheckIcon, Container, SectionHeading } from "./ui";

// 02 — Find. Verify. Understand. Decide.
export function PillarsSection() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Find. Verify. Understand. Decide."
          title="Better information. Better property decisions."
          intro="Property decisions involve more than finding a property you like. You need to understand what you are buying, where it is, what supports the ownership claim, and whether it fits your objective."
        />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <li key={p.title} className="bg-white p-7">
              <span className="font-display text-sm font-semibold text-gold-dark">0{i + 1}</span>
              <h3 className="mt-6 text-2xl font-semibold uppercase tracking-wide text-navy">{p.title}</h3>
              <p className="mt-3 text-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

// 04 — Differentiator
export function DifferentiatorSection() {
  return (
    <section className="bg-contours bg-navy py-24 text-white">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Why it matters</p>
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">
            Don’t just buy property. <span className="text-gradient-gold">Know what you’re buying.</span>
          </h2>
        </div>
        <div className="space-y-5 text-lg text-white/75">
          <p>Property fraud, inaccurate information, boundary disputes and poor due diligence can turn a promising opportunity into a costly mistake.</p>
          <p>Creed 360 combines property search & advisory, verification, registered surveying and geospatial intelligence to help clients make better-informed decisions.</p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/15 pt-5 font-display text-xl font-semibold text-white">
            {["Find", "Verify", "Understand", "Decide"].map((w, i) => (
              <span key={w} className="flex items-center gap-3">
                {i > 0 && <span className="text-gold">→</span>}
                {w}
              </span>
            ))}
          </p>
          <p className="text-gold-light">Because clarity should come before commitment.</p>
        </div>
      </Container>
    </section>
  );
}

// 06 — How We Verify
export function HowWeVerifySection() {
  return (
    <section className="bg-sand py-24">
      <Container>
        <SectionHeading
          eyebrow="How we verify"
          title="Before you buy, we help you verify."
          intro="A structured process behind every verified opportunity and every advisory engagement."
        />
        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {VERIFY_STEPS.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl bg-white p-7 shadow-sm">
              <span className="absolute right-6 top-5 font-display text-5xl font-bold text-navy/5">0{i + 1}</span>
              <p className="eyebrow">0{i + 1} — {s.title}</p>
              <h3 className="mt-3 text-lg font-semibold text-navy">{s.lead}</h3>
              <p className="mt-2 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-3xl border-l-2 border-gold pl-4 text-sm text-muted">
          <strong className="text-ink">Disclaimer:</strong> {DISCLAIMER}
        </p>
      </Container>
    </section>
  );
}

// 07 — Surveying & Geospatial Intelligence + 08 — In the Field
export function SurveyingSection() {
  return (
    <section className="py-24">
      <Container className="grid gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Surveying & geospatial intelligence" title="See property differently." />
          <p className="mt-5 text-lg text-muted">Property is more than what you see on a document.</p>
          <p className="mt-3 text-lg text-muted">
            Through professional surveying and geospatial intelligence, we help clients understand boundaries, dimensions, location and spatial information with greater accuracy.
          </p>
          <p className="mt-6 font-display text-lg font-semibold text-navy">Location. Data. Measurement. Insight.</p>
          <Link href="/services#surveying" className="btn btn-navy mt-8">Explore Our Technical Services</Link>
        </div>
        <div className="rounded-3xl bg-navy p-8 text-white sm:p-10">
          <p className="eyebrow">In the field</p>
          <h3 className="mt-3 text-3xl font-semibold">Clarity starts on site.</h3>
          <p className="mt-4 text-white/70">Good property decisions require more than paperwork.</p>
          <p className="mt-3 text-white/70">
            Our fieldwork brings technical information into the real world — helping us examine locations, boundaries and physical site conditions as part of the decision-making process.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {FIELD_CAPTIONS.map((c) => (
              <li key={c} className="rounded-full border border-gold/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-light">{c}</li>
            ))}
          </ul>
          <p className="mt-8 font-display text-xl font-semibold text-gradient-gold">From the field to the final decision.</p>
        </div>
      </Container>
    </section>
  );
}

// 09 — Smart in Practice
export function SmartSection() {
  return (
    <section className="bg-navy-50 py-24">
      <Container>
        <SectionHeading
          eyebrow="Smart in practice"
          title={<>Data + Location + Insight <span className="text-gold-dark">→</span> Better decisions.</>}
          intro="We combine property information, technical expertise and spatial intelligence to give clients a clearer understanding of what they are considering."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SMART_POINTS.map((p) => (
            <div key={p.title} className="rounded-2xl border border-navy/10 bg-white p-7">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gold-dark">{p.title}</h3>
              <p className="mt-3 text-lg text-ink">{p.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 font-display text-xl font-semibold text-navy">Smart property decisions start with the right information.</p>
      </Container>
    </section>
  );
}

// 10 — Palmora Roots teaser (home page)
export function PalmoraTeaser() {
  return (
    <section className="relative overflow-hidden bg-[#13261b] py-24 text-white">
      <div className="bg-contours absolute inset-0 opacity-60" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">{PALMORA.eyebrow}</p>
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">{PALMORA.heading}</h2>
          <p className="mt-3 text-lg text-gold-light">{PALMORA.sub}</p>
          <p className="mt-5 text-white/75">{PALMORA.body}</p>
          <Link href="/palmora-roots" className="btn btn-gold mt-8">Explore Palmora Roots</Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {PALMORA.packages.map((p) => (
            <li key={p.name} className="flex flex-col justify-between gap-1 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur lg:flex-row lg:items-center">
              <div>
                <p className="font-display font-semibold uppercase tracking-wide">{p.name}</p>
                <p className="text-sm text-white/60">{p.trees} palm trees</p>
              </div>
              <p className="font-display text-xl font-semibold text-gold-light">{naira(p.price)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

// 11 — Why Creed 360
export function WhySection() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Why Creed 360"
          title="Why clients choose Creed 360."
          intro="We combine property knowledge, technical expertise and a verification-first approach to help clients make informed decisions."
        />
        <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_POINTS.map((p) => (
            <li key={p.title} className="flex gap-4">
              <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-gold text-navy-900"><CheckIcon /></span>
              <div>
                <h3 className="font-semibold uppercase tracking-wide text-navy">{p.title}</h3>
                <p className="mt-1 text-muted">{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-14 rounded-xl border border-navy/10 bg-sand px-5 py-4 text-center text-sm font-medium text-navy">{SITE.credentials}</p>
      </Container>
    </section>
  );
}

// 12 — Team
export function TeamSection() {
  return (
    <section className="bg-sand py-24">
      <Container>
        <SectionHeading eyebrow="Team" title="Led by experience." />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <article className="flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-sm sm:flex-row">
            <div className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-navy">
              <Image src="/brand/mark.png" alt="" width={56} height={56} />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-navy">{TEAM.lead.name}</h3>
              <p className="text-gold-dark">{TEAM.lead.title}</p>
              <p className="mt-4 text-muted">{TEAM.lead.profile}</p>
              <p className="mt-4 text-sm">
                <a href={SITE.phoneHref} className="font-semibold text-navy">{SITE.phone}</a>
                <span className="mx-2 text-muted">·</span>
                <a href={`mailto:${SITE.email}`} className="font-semibold text-navy">{SITE.email}</a>
              </p>
            </div>
          </article>
          <article className="rounded-3xl bg-navy p-8 text-white">
            <h3 className="text-2xl font-semibold">{TEAM.technical.title}</h3>
            <p className="mt-2 text-gold-light">{TEAM.technical.lead}</p>
            <p className="mt-4 text-white/70">{TEAM.technical.body}</p>
          </article>
        </div>
      </Container>
    </section>
  );
}

// 13 — Real Results
export function ResultsSection() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Real results"
          title="Real work. Real decisions."
          intro="See how technical information, verification and professional guidance can make a difference."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {RESULTS.map((r) => (
            <figure key={r.name} className="flex flex-col rounded-2xl border border-navy/10 p-7">
              <p className="text-sm text-muted">{r.summary}</p>
              {r.outcome && <p className="mt-3 text-sm font-semibold text-navy">Outcome: {r.outcome}</p>}
              <blockquote className="mt-5 flex-1 border-l-2 border-gold pl-4 font-display text-lg leading-snug text-navy">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-semibold text-ink">{r.name}</span>
                <span className="text-muted"> — {r.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

// 14 — FAQ (native <details>, so it works without JavaScript)
export function FaqSection() {
  return (
    <section className="bg-navy-50 py-24">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading eyebrow="FAQ" title="Questions before you decide?" />
        <div className="divide-y divide-navy/10 rounded-2xl bg-white px-6 shadow-sm">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-navy">
                {f.q}
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy-50 text-gold-dark transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

// 15 — Final CTA
export function FinalCta() {
  return (
    <section className="bg-contours bg-navy py-24 text-white">
      <Container className="text-center">
        <p className="eyebrow">{SITE.promise}</p>
        <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-semibold sm:text-5xl">Ready to make a smarter property decision?</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">
          Whether you&apos;re looking for property, verifying an opportunity, surveying land, developing a site or exploring a structured investment, we&apos;re here to help.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/book-verification" className="btn btn-gold">Book a Verification</Link>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-white">Chat with an Advisor</a>
        </div>
        <p className="mt-8 text-sm text-white/60">
          <a href={SITE.phoneHref} className="hover:text-white">{SITE.phone}</a> · <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
        </p>
      </Container>
    </section>
  );
}
