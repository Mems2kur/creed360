import Link from "next/link";
import StatusPill from "@/components/admin/StatusPill";
import { getVerifications } from "@/lib/db";
import { cx, humanize, shortDate } from "@/lib/format";
import { REQUEST_STATUSES } from "@/lib/types";

export default async function VerificationsPage({ searchParams }: { searchParams: Promise<{ status?: string; q?: string }> }) {
  const { status = "", q = "" } = await searchParams;
  const all = await getVerifications();

  let list = status ? all.filter((r) => r.status === status) : all;
  if (q) {
    const needle = q.toLowerCase();
    list = list.filter((r) => [r.reference, r.name, r.email, r.phone, r.propertyLocation].join(" ").toLowerCase().includes(needle));
  }

  const tabs = [{ value: "", label: "All", count: all.length }, ...REQUEST_STATUSES.map((s) => ({ value: s, label: humanize(s), count: all.filter((r) => r.status === s).length }))];

  return (
    <>
      <h1 className="text-2xl font-semibold text-navy">Verification requests</h1>
      <p className="text-muted">Requests from the website’s “Book a Verification” form. Open one to work through the six steps.</p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {tabs.map((t) => (
          <Link
            key={t.value}
            href={t.value ? `?status=${t.value}` : "?"}
            className={cx("rounded-full px-3 py-1.5 text-sm font-medium", status === t.value ? "bg-navy text-white" : "bg-white text-muted hover:text-navy")}
          >
            {t.label} <span className="opacity-60">{t.count}</span>
          </Link>
        ))}
        <form className="ml-auto w-full sm:w-64">
          {status && <input type="hidden" name="status" value={status} />}
          <input name="q" defaultValue={q} placeholder="Search name, ref, phone…" className="field py-2 text-sm" />
        </form>
      </div>

      {list.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-navy/20 bg-white p-12 text-center text-sm text-muted">No requests here.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-navy/10 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-5 py-3 font-semibold">Reference</th>
                <th className="px-3 py-3 font-semibold">Client</th>
                <th className="px-3 py-3 font-semibold">Service / property</th>
                <th className="px-3 py-3 font-semibold">Progress</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {list.map((r) => (
                <tr key={r.id} className="hover:bg-navy-50/40">
                  <td className="px-5 py-3">
                    <Link href={`/admin/verifications/${r.id}`} className="font-mono text-xs font-semibold text-navy hover:text-gold-dark">{r.reference}</Link>
                  </td>
                  <td className="px-3 py-3">
                    <Link href={`/admin/verifications/${r.id}`} className="font-semibold text-ink">{r.name}</Link>
                    <p className="text-xs text-muted">{r.phone}</p>
                  </td>
                  <td className="px-3 py-3">
                    <p>{r.service}</p>
                    <p className="text-xs text-muted">{r.propertyTitle ?? r.propertyLocation}</p>
                  </td>
                  <td className="px-3 py-3 text-xs text-muted">{Object.values(r.checks).filter(Boolean).length}/6 steps</td>
                  <td className="px-3 py-3"><StatusPill status={r.status} /></td>
                  <td className="px-5 py-3 text-xs text-muted">{shortDate(r.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
