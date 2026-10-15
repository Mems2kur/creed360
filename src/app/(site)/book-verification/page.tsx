import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import { Container, PageHero } from "@/components/ui";
import { getProperty } from "@/lib/db";
import { DISCLAIMER, SITE, VERIFY_STEPS } from "@/lib/site";
import { SERVICE_TYPES } from "@/lib/types";

export const metadata: Metadata = { title: "Book a Verification" };
export const dynamic = "force-dynamic";

type Search = { service?: string; property?: string; package?: string };

export default async function BookVerificationPage({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams;

  // Links around the site pre-fill the form, e.g. ?service=Palmora%20Roots&package=Agro%201%20Acre
  const property = params.property ? await getProperty(params.property) : null;
  const defaultService = SERVICE_TYPES.find((s) => s === params.service) ?? "Property Verification";
  const defaultDetails = params.package ? `I'm interested in the Palmora Roots ${params.package} package.` : "";

  return (
    <>
      <PageHero
        eyebrow={SITE.promise}
        title="Before you buy, we help you verify."
        intro="Tell us about the property or project. An advisor will review your request and get back to you with next steps."
      />
      <section className="bg-sand py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <BookingForm
            defaultService={defaultService}
            defaultDetails={defaultDetails}
            property={property?.published ? { id: property.id, title: property.title, location: `${property.location}, ${property.state}` } : undefined}
          />

          <aside className="space-y-6">
            <div className="rounded-3xl bg-navy p-7 text-white">
              <h2 className="text-xl font-semibold">What happens next</h2>
              <ol className="mt-5 space-y-4">
                {VERIFY_STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-3">
                    <span className="font-display text-sm font-semibold text-gold-light">0{i + 1}</span>
                    <div>
                      <p className="font-semibold">{s.title}</p>
                      <p className="text-sm text-white/65">{s.lead}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-3xl border border-navy/10 bg-white p-7">
              <h2 className="text-lg font-semibold text-navy">Prefer to talk first?</h2>
              <p className="mt-2 text-sm text-muted">Speak with an advisor on WhatsApp or call us directly.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-navy btn-sm">Chat with an Advisor</a>
                <a href={SITE.phoneHref} className="btn btn-outline btn-sm text-navy">{SITE.phone}</a>
              </div>
            </div>
            <p className="text-xs text-muted">{DISCLAIMER}</p>
          </aside>
        </Container>
      </section>
    </>
  );
}
