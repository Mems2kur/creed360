import type { Metadata } from "next";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { FinalCta } from "@/components/sections";
import { Container, PageHero } from "@/components/ui";
import { getPublishedProperties } from "@/lib/db";
import { PROPERTY_TYPES } from "@/lib/types";

export const metadata: Metadata = { title: "Properties" };
export const dynamic = "force-dynamic";

type Search = { q?: string; type?: string; verified?: string; sort?: string };

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { q = "", type = "", verified = "", sort = "newest" } = await searchParams;

  // Filtering happens on the server; the form below is a plain GET form,
  // so the filters live in the URL and can be shared or bookmarked.
  let list = await getPublishedProperties();
  if (q) {
    const needle = q.toLowerCase();
    list = list.filter((p) => [p.title, p.location, p.state, p.description].join(" ").toLowerCase().includes(needle));
  }
  if (type) list = list.filter((p) => p.type === type);
  if (verified === "1") list = list.filter((p) => p.verification.status === "verified");
  if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list.sort((a, b) => b.price - a.price);

  return (
    <>
      <PageHero
        eyebrow="Verified properties"
        title="Find property with more confidence."
        intro="Explore selected property opportunities with relevant information available to help you make a more informed decision."
      />

      <section className="py-14">
        <Container>
          <form className="grid gap-3 rounded-2xl border border-navy/10 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto_auto]">
            <input name="q" defaultValue={q} placeholder="Search by location or keyword…" className="field" aria-label="Search" />
            <select name="type" defaultValue={type} className="field" aria-label="Property type">
              <option value="">All types</option>
              {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
            <select name="sort" defaultValue={sort} className="field" aria-label="Sort">
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
            <label className="flex items-center gap-2 px-2 text-sm font-medium text-navy">
              <input type="checkbox" name="verified" value="1" defaultChecked={verified === "1"} className="h-4 w-4 accent-navy" />
              Verified only
            </label>
            <button className="btn btn-navy">Search</button>
          </form>

          <p className="mt-8 text-sm text-muted">
            {list.length} {list.length === 1 ? "property" : "properties"}
            {(q || type || verified) && (
              <> · <Link href="/properties" className="font-semibold text-navy underline">Clear filters</Link></>
            )}
          </p>

          {list.length > 0 ? (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => <PropertyCard key={p.id} property={p} />)}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-navy/20 p-12 text-center">
              <p className="text-lg font-semibold text-navy">No properties match your search yet.</p>
              <p className="mt-2 text-muted">Tell us what you need and our advisory team will search for you.</p>
              <Link href="/book-verification?service=Property%20Search%20%26%20Advisory" className="btn btn-gold mt-6">Talk to an Advisor</Link>
            </div>
          )}
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
