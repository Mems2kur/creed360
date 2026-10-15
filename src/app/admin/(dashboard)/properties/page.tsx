import Link from "next/link";
import { togglePublished } from "@/app/actions/admin";
import StatusPill from "@/components/admin/StatusPill";
import { PropertyImage } from "@/components/PropertyCard";
import { getProperties } from "@/lib/db";
import { naira, shortDate } from "@/lib/format";

export default async function AdminPropertiesPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { saved } = await searchParams;
  const properties = await getProperties();

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Properties</h1>
          <p className="text-muted">Upload listings, manage photos and record each property’s verification.</p>
        </div>
        <Link href="/admin/properties/new" className="btn btn-gold">+ Upload property</Link>
      </div>

      {saved && <p className="mt-6 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">“{saved}” was saved.</p>}

      {properties.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-navy/20 bg-white p-12 text-center">
          <p className="font-semibold text-navy">No properties yet</p>
          <p className="mt-1 text-sm text-muted">Upload your first listing to show it on the website.</p>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl bg-white shadow-sm">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-navy/10 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-5 py-3 font-semibold">Property</th>
                <th className="px-3 py-3 font-semibold">Price</th>
                <th className="px-3 py-3 font-semibold">Verification</th>
                <th className="px-3 py-3 font-semibold">Website</th>
                <th className="px-3 py-3 font-semibold">Updated</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {properties.map((p) => (
                <tr key={p.id} className="hover:bg-navy-50/40">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <PropertyImage property={p} className="h-12 w-16 shrink-0 rounded-lg" />
                      <div>
                        <p className="font-semibold text-ink">{p.title}{p.featured && <span className="ml-2 text-xs text-gold-dark">★ Featured</span>}</p>
                        <p className="text-xs text-muted">{p.type} · {p.location}, {p.state}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 font-medium">{naira(p.price)}</td>
                  <td className="px-3 py-3">
                    <StatusPill status={p.verification.status} />
                    <p className="mt-1 text-xs text-muted">{Object.values(p.verification.checks).filter(Boolean).length}/6 steps</p>
                  </td>
                  <td className="px-3 py-3">
                    <form action={togglePublished}>
                      <input type="hidden" name="id" value={p.id} />
                      <button className={p.published ? "text-xs font-semibold text-emerald-700" : "text-xs font-semibold text-muted"}>
                        {p.published ? "● Published" : "○ Hidden"}
                      </button>
                    </form>
                  </td>
                  <td className="px-3 py-3 text-xs text-muted">{shortDate(p.updatedAt)}</td>
                  <td className="px-5 py-3 text-right">
                    <Link href={`/admin/properties/${p.id}`} className="font-semibold text-navy hover:text-gold-dark">Edit</Link>
                    {p.published && (
                      <Link href={`/properties/${p.id}`} target="_blank" className="ml-4 text-muted hover:text-navy">View ↗</Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
