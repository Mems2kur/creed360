import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/sections";
import { CheckIcon, Container, SectionHeading } from "@/components/ui";
import { naira } from "@/lib/format";
import { DISCLAIMER, PALMORA, RESULTS, SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Palmora Roots" };

const investor = RESULTS.find((r) => r.role.includes("Palmora"));

export default function PalmoraPage() {
  return (
    <>
      {/* Hero — deep palm green to set Palmora apart from the navy core brand */}
      <section className="relative overflow-hidden bg-[#13261b] pt-36 pb-24 text-white">
        <div className="bg-contours absolute inset-0 opacity-70" />
        <Container className="relative">
          <p className="eyebrow">{PALMORA.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] sm:text-7xl">{PALMORA.heading}</h1>
          <p className="mt-5 text-xl text-gold-light">{PALMORA.sub}</p>
          <p className="mt-6 max-w-2xl text-lg text-white/75">{PALMORA.body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#packages" className="btn btn-gold">View Packages</a>
            <Link href="/book-verification?service=Palmora%20Roots" className="btn btn-outline text-white">Register Interest</Link>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">It is built around a simple idea</p>
            <h2 className="mt-3 text-4xl font-semibold text-navy sm:text-5xl">
              {PALMORA.idea.split(". ").map((line, i, arr) => (
                <span key={line} className="block">
                  {i === 1 ? <span className="text-gradient-gold">{line}.</span> : `${line}${i < arr.length - 1 ? "." : ""}`}
                </span>
              ))}
            </h2>
          </div>
          <div className="space-y-5 text-lg text-muted">
            <p>{PALMORA.supporting}</p>
            <ul className="space-y-3 text-base">
              {[
                "Productive oil palm estate in Kobape, Ogun State",
                "Land, agriculture and lifestyle in one destination",
                "Underpinned by Creed 360’s verification, surveying and advisory standards",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-ink"><CheckIcon className="mt-0.5 shrink-0 text-gold-dark" /> {t}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section id="packages" className="scroll-mt-20 bg-sand py-24">
        <Container>
          <SectionHeading eyebrow="Packages" title="Choose your stake in the land." center />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PALMORA.packages.map((p, i) => (
              <article
                key={p.name}
                className={`relative flex flex-col rounded-3xl p-8 ${i === 1 ? "bg-[#13261b] text-white shadow-2xl md:-translate-y-4" : "bg-white shadow-sm"}`}
              >
                {i === 1 && <span className="absolute right-6 top-6 rounded-full bg-gradient-gold px-3 py-1 text-[11px] font-bold text-navy-900">POPULAR</span>}
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-gold-dark">{p.name}</h3>
                <p className="mt-6 font-display text-4xl font-semibold">{naira(p.price)}</p>
                <p className={i === 1 ? "mt-1 text-white/60" : "mt-1 text-muted"}>Initial deposit: {naira(p.deposit)}</p>
                <p className="mt-6 flex items-center gap-2 font-semibold">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gold/20 text-lg">🌴</span>
                  {p.trees} Palm Trees
                </p>
                <Link
                  href={`/book-verification?service=Palmora%20Roots&package=${encodeURIComponent(p.name)}`}
                  className={`btn mt-8 ${i === 1 ? "btn-gold" : "btn-navy"}`}
                >
                  Reserve {p.name}
                </Link>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-muted">{DISCLAIMER}</p>
        </Container>
      </section>

      {investor && (
        <section className="py-24">
          <Container className="max-w-4xl text-center">
            <blockquote className="font-display text-2xl leading-snug text-navy sm:text-3xl">“{investor.quote}”</blockquote>
            <p className="mt-6 text-sm"><span className="font-semibold">{investor.name}</span> <span className="text-muted">— {investor.role}</span></p>
          </Container>
        </section>
      )}

      <FaqSection />

      <section className="bg-[#13261b] py-24 text-center text-white">
        <Container>
          <p className="font-display text-4xl font-semibold sm:text-5xl">{PALMORA.legacy}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/book-verification?service=Palmora%20Roots" className="btn btn-gold">Register Interest</Link>
            <a href={`${SITE.whatsapp}?text=${encodeURIComponent("Hello Creed 360, I'd like to know more about Palmora Roots.")}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-white">Chat with an Advisor</a>
          </div>
        </Container>
      </section>
    </>
  );
}
