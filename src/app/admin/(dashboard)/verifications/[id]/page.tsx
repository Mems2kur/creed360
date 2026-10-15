import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteVerification } from "@/app/actions/admin";
import ConfirmButton from "@/components/admin/ConfirmButton";
import StatusPill from "@/components/admin/StatusPill";
import VerificationForm from "@/components/admin/VerificationForm";
import { getVerification } from "@/lib/db";
import { shortDate } from "@/lib/format";

export default async function VerificationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const request = await getVerification((await params).id);
  if (!request) notFound();

  const whatsappNumber = request.phone.replace(/\D/g, "").replace(/^0/, "234");

  return (
    <>
      <Link href="/admin/verifications" className="text-sm text-muted hover:text-navy">← Verification requests</Link>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold text-navy">{request.reference}</h1>
        <StatusPill status={request.status} />
      </div>
      <p className="text-sm text-muted">{request.service} · received {shortDate(request.createdAt)}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        <aside className="space-y-6">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-navy">Client</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div><dt className="text-muted">Name</dt><dd className="font-medium">{request.name}</dd></div>
              <div><dt className="text-muted">Email</dt><dd><a href={`mailto:${request.email}`} className="font-medium text-navy underline">{request.email}</a></dd></div>
              <div><dt className="text-muted">Phone</dt><dd><a href={`tel:${request.phone}`} className="font-medium text-navy underline">{request.phone}</a></dd></div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello ${request.name}, this is Creed 360 regarding your request ${request.reference}.`)}`} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-sm">WhatsApp client</a>
              <a href={`mailto:${request.email}?subject=${encodeURIComponent(`Your Creed 360 request ${request.reference}`)}`} className="btn btn-outline btn-sm text-navy">Email</a>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-navy">Property</h2>
            {request.propertyId && (
              <p className="mt-3 text-sm">
                Listed property:{" "}
                <Link href={`/admin/properties/${request.propertyId}`} className="font-semibold text-navy underline">{request.propertyTitle}</Link>
              </p>
            )}
            <p className="mt-3 text-sm"><span className="text-muted">Location:</span> {request.propertyLocation}</p>
            {request.details && <p className="mt-3 whitespace-pre-line rounded-xl bg-sand p-4 text-sm">{request.details}</p>}

            <h3 className="mt-5 text-sm font-semibold text-navy">Documents from client</h3>
            {request.documents.length === 0 ? (
              <p className="mt-1 text-sm text-muted">None attached.</p>
            ) : (
              <ul className="mt-2 space-y-1">
                {request.documents.map((d) => (
                  <li key={d.url}>
                    <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-navy underline">📄 {d.name}</a>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <form action={deleteVerification}>
            <input type="hidden" name="id" value={request.id} />
            <ConfirmButton message={`Delete request ${request.reference} and its documents? This cannot be undone.`} className="text-sm font-semibold text-red-600 hover:text-red-800">
              Delete request
            </ConfirmButton>
          </form>
        </aside>

        <VerificationForm request={request} />
      </div>
    </>
  );
}
