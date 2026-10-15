"use client";

import Link from "next/link";
import { startTransition, useActionState } from "react";
import { submitBooking, type BookingState } from "@/app/actions/public";
import { SERVICE_TYPES } from "@/lib/types";

const initial: BookingState = { ok: false, message: "" };

export default function BookingForm({
  defaultService,
  defaultDetails,
  property,
}: {
  defaultService: string;
  defaultDetails: string;
  property?: { id: string; title: string; location: string };
}) {
  // useActionState gives us: the latest result from the server action,
  // the function to put on <form action>, and a pending flag for the button.
  const [state, formAction, pending] = useActionState(submitBooking, initial);

  if (state.ok && state.reference) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-gold text-2xl text-navy-900">✓</div>
        <h2 className="mt-5 text-2xl font-semibold text-navy">Request received</h2>
        <p className="mt-2 text-muted">{state.message}</p>
        <p className="mt-6 text-sm text-muted">Your reference number</p>
        <p className="font-display text-2xl font-semibold tracking-wider text-navy">{state.reference}</p>
        <Link href="/" className="btn btn-navy mt-8">Back to home</Link>
      </div>
    );
  }

  // Submitting via onSubmit keeps the user's typing (and chosen files) on screen
  // if the server returns a validation error — <form action> would reset the form.
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => formAction(data));
  }

  const v = state.values ?? {};
  const err = (k: string) => state.errors?.[k] && <p className="mt-1 text-sm text-red-600">{state.errors[k]}</p>;

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-3xl bg-white p-6 shadow-sm sm:p-10">
      {property && (
        <div className="rounded-xl bg-navy-50 p-4 text-sm">
          <p className="text-muted">Booking verification for</p>
          <p className="font-semibold text-navy">{property.title}</p>
          <input type="hidden" name="propertyId" value={property.id} />
        </div>
      )}

      {/* Honeypot field, hidden from people */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">Full name</label>
          <input id="name" name="name" defaultValue={v.name} required className="field" autoComplete="name" />
          {err("name")}
        </div>
        <div>
          <label htmlFor="phone" className="label">Phone / WhatsApp</label>
          <input id="phone" name="phone" defaultValue={v.phone} required className="field" autoComplete="tel" placeholder="+234…" />
          {err("phone")}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="label">Email</label>
        <input id="email" name="email" type="email" defaultValue={v.email} required className="field" autoComplete="email" />
        {err("email")}
      </div>

      <div>
        <label htmlFor="service" className="label">What do you need help with?</label>
        <select id="service" name="service" defaultValue={v.service ?? defaultService} className="field">
          {SERVICE_TYPES.map((s) => <option key={s}>{s}</option>)}
        </select>
        {err("service")}
      </div>

      <div>
        <label htmlFor="propertyLocation" className="label">Property location</label>
        <input
          id="propertyLocation"
          name="propertyLocation"
          required
          className="field"
          defaultValue={v.propertyLocation ?? property?.location}
          placeholder="e.g. Sangotedo, Eti-Osa, Lagos"
        />
        {err("propertyLocation")}
      </div>

      <div>
        <label htmlFor="details" className="label">Tell us more <span className="font-normal text-muted">(optional)</span></label>
        <textarea
          id="details"
          name="details"
          rows={5}
          className="field"
          defaultValue={v.details ?? defaultDetails}
          placeholder="Who is selling, the title document you were shown, your budget, your timeline…"
        />
      </div>

      <div>
        <label htmlFor="documents" className="label">Documents <span className="font-normal text-muted">(optional — survey plan, C of O, receipts; up to 5 files, PDF/JPG/PNG)</span></label>
        <input id="documents" name="documents" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.webp" className="field file:mr-3 file:rounded-full file:border-0 file:bg-navy-50 file:px-3 file:py-1 file:text-sm file:font-semibold file:text-navy" />
      </div>

      {state.message && !state.ok && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{state.message}</p>}

      <button type="submit" disabled={pending} className="btn btn-gold w-full sm:w-auto">
        {pending ? "Sending…" : "Submit request"}
      </button>
      <p className="text-xs text-muted">We’ll only use your details to respond to this request.</p>
    </form>
  );
}
