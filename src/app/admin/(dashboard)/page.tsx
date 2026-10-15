import Link from "next/link";
import StatusPill from "@/components/admin/StatusPill";
import { getProperties, getVerifications } from "@/lib/db";
import { shortDate } from "@/lib/format";

export default async function AdminOverview() {
  const [properties, requests] = await Promise.all([getProperties(), getVerifications()]);

  const stats = [
    { label: "Listed properties", value: properties.length, href: "/admin/properties" },
    { label: "Verified listings", value: properties.filter((p) => p.verification.status === "verified").length, href: "/admin/properties" },
    { label: "New requests", value: requests.filter((r) => r.status === "new").length, href: "/admin/verifications?status=new" },
    { label: "In progress", value: requests.filter((r) => r.status === "in_progress").length, href: "/admin/verifications?status=in_progress" },
  ];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Overview</h1>
          <p className="text-muted">Properties and verification work at a glance.</p>
        </div>
        <Link href="/admin/properties/new" className="btn btn-gold">+ Upload property</Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
            <p className="text-sm text-muted">{s.label}</p>
            <p className="mt-2 font-display text-3xl font-semibold text-navy">{s.value}</p>
          </Link>
        ))}
      </div>

      <section className="mt-10 rounded-2xl bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-navy/10 px-5 py-4">
          <h2 className="font-semibold text-navy">Latest verification requests</h2>
          <Link href="/admin/verifications" className="text-sm font-semibold text-gold-dark">View all →</Link>
        </div>
        {requests.length === 0 ? (
          <p className="p-6 text-sm text-muted">No requests yet. They appear here when clients submit the “Book a Verification” form.</p>
        ) : (
          <ul className="divide-y divide-navy/5">
            {requests.slice(0, 6).map((r) => (
              <li key={r.id}>
                <Link href={`/admin/verifications/${r.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3 hover:bg-navy-50/50">
                  <span className="font-mono text-xs text-muted">{r.reference}</span>
                  <span className="font-medium text-ink">{r.name}</span>
                  <span className="text-sm text-muted">{r.service}</span>
                  <span className="ml-auto flex items-center gap-3">
                    <span className="text-xs text-muted">{shortDate(r.createdAt)}</span>
                    <StatusPill status={r.status} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8 rounded-2xl bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-navy/10 px-5 py-4">
          <h2 className="font-semibold text-navy">Listings awaiting verification</h2>
          <Link href="/admin/properties" className="text-sm font-semibold text-gold-dark">All properties →</Link>
        </div>
        {(() => {
          const pending = properties.filter((p) => p.verification.status !== "verified");
          if (!pending.length) return <p className="p-6 text-sm text-muted">Every listing is verified. 🎉</p>;
          return (
            <ul className="divide-y divide-navy/5">
              {pending.slice(0, 6).map((p) => {
                const done = Object.values(p.verification.checks).filter(Boolean).length;
                return (
                  <li key={p.id}>
                    <Link href={`/admin/properties/${p.id}`} className="flex items-center gap-4 px-5 py-3 hover:bg-navy-50/50">
                      <span className="font-medium text-ink">{p.title}</span>
                      <span className="ml-auto text-xs text-muted">{done}/6 steps</span>
                      <StatusPill status={p.verification.status} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          );
        })()}
      </section>
    </>
  );
}
