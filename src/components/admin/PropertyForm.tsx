"use client";

import Image from "next/image";
import Link from "next/link";
import { startTransition, useActionState, useEffect, useState } from "react";
import { deleteProperty, saveProperty, type FormState } from "@/app/actions/admin";
import { emptyChecklist, PAYMENT_OPTIONS, PROPERTY_TYPES, type Property } from "@/lib/types";
import ChecklistFields from "./ChecklistFields";

const TITLE_DOCS = ["C of O", "Governor's Consent", "Deed of Assignment", "Registered Survey", "Excision", "Gazette", "Other"];

export default function PropertyForm({ property }: { property?: Property }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(saveProperty, { ok: false, message: "" });

  // Live previews of newly chosen photos (before they are uploaded)
  const [previews, setPreviews] = useState<string[]>([]);
  useEffect(() => () => previews.forEach(URL.revokeObjectURL), [previews]);

  const p = property;
  const checks = p?.verification.checks ?? emptyChecklist();

  // We submit through onSubmit (not <form action>) so React does NOT clear
  // this long form if the server sends back a validation error.
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => formAction(data));
  }

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-8">
        {p && <input type="hidden" name="id" value={p.id} />}

        <Card title="Listing details">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Title" className="sm:col-span-2">
              <input name="title" required defaultValue={p?.title} className="field" placeholder="e.g. 4-bedroom terrace duplex" />
            </Field>
            <Field label="Type">
              <select name="type" defaultValue={p?.type ?? "Land"} className="field">
                {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Price (₦)">
              <input name="price" required inputMode="numeric" defaultValue={p?.price} className="field" placeholder="25000000" />
            </Field>
            <Field label="Location / area">
              <input name="location" required defaultValue={p?.location} className="field" placeholder="Sangotedo, Eti-Osa" />
            </Field>
            <Field label="State">
              <input name="state" defaultValue={p?.state ?? "Lagos"} className="field" />
            </Field>
            <Field label="Size">
              <input name="size" required defaultValue={p?.size} className="field" placeholder="600 sqm" />
            </Field>
            <Field label="Title document">
              <input name="titleDocument" list="title-docs" defaultValue={p?.titleDocument} className="field" placeholder="C of O" />
              <datalist id="title-docs">{TITLE_DOCS.map((t) => <option key={t} value={t} />)}</datalist>
            </Field>
            <Field label="Bedrooms (houses only)">
              <input name="bedrooms" type="number" min={0} defaultValue={p?.bedrooms} className="field" />
            </Field>
            <Field label="Bathrooms (houses only)">
              <input name="bathrooms" type="number" min={0} defaultValue={p?.bathrooms} className="field" />
            </Field>
            <Field label="Description" className="sm:col-span-2">
              <textarea name="description" rows={5} defaultValue={p?.description} className="field" />
            </Field>
            <Field label="Features (one per line)" className="sm:col-span-2">
              <textarea name="features" rows={4} defaultValue={p?.features.join("\n")} className="field" placeholder={"Gated estate\nGood road network\nDry land"} />
            </Field>
            <fieldset className="sm:col-span-2">
              <legend className="label">Ways to buy</legend>
              <div className="flex flex-wrap gap-4">
                {PAYMENT_OPTIONS.map((o) => (
                  <label key={o} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="paymentOptions" value={o} defaultChecked={p?.paymentOptions.includes(o)} className="h-4 w-4 accent-navy" />
                    {o}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </Card>

        <Card title="Photos" subtitle="JPG, PNG or WEBP, up to 8MB each. The first photo is the cover.">
          {p && p.images.length > 0 && (
            <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {p.images.map((src) => (
                <label key={src} className="group relative block aspect-[4/3] overflow-hidden rounded-xl border border-navy/10 has-checked:opacity-40">
                  <Image src={src} alt="" fill unoptimized className="object-cover" />
                  <span className="absolute inset-x-2 bottom-2 flex items-center gap-1.5 rounded-lg bg-white/90 px-2 py-1 text-xs font-semibold text-red-700">
                    <input type="checkbox" name="removeImage" value={src} className="accent-red-600" /> Remove
                  </span>
                </label>
              ))}
            </div>
          )}
          <input
            name="images"
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.webp"
            onChange={(e) => setPreviews(Array.from(e.target.files ?? []).map((f) => URL.createObjectURL(f)))}
            className="field file:mr-3 file:rounded-full file:border-0 file:bg-navy-50 file:px-3 file:py-1 file:text-sm file:font-semibold file:text-navy"
          />
          {previews.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {previews.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element -- blob: preview URLs
                <img key={src} src={src} alt="" className="aspect-square rounded-lg object-cover" />
              ))}
            </div>
          )}
        </Card>

        <Card title="Verification" subtitle="Record the checks completed for this listing. The public VERIFIED badge only appears when the status is Verified.">
          <ChecklistFields checks={checks} />
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Verification status">
              <select name="verificationStatus" defaultValue={p?.verification.status ?? "unverified"} className="field">
                <option value="unverified">Unverified</option>
                <option value="in_review">In review</option>
                <option value="verified">Verified (all six steps complete)</option>
              </select>
            </Field>
            <Field label="Public verification summary" className="sm:col-span-2">
              <textarea
                name="verificationNotes"
                rows={3}
                defaultValue={p?.verification.notes}
                className="field"
                placeholder="e.g. Title confirmed at Lands Registry; boundary beacons inspected on site; no encumbrance found."
              />
            </Field>
          </div>
        </Card>

        <Card title="Visibility">
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" name="published" defaultChecked={p?.published ?? true} className="h-4 w-4 accent-navy" />
              Show on website
            </label>
            <label className="flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" name="featured" defaultChecked={p?.featured} className="h-4 w-4 accent-navy" />
              Feature on home page
            </label>
          </div>
        </Card>

        {state.message && !state.ok && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{state.message}</p>}

        <div className="flex flex-wrap items-center gap-3">
          <button disabled={pending} className="btn btn-navy">{pending ? "Saving…" : p ? "Save changes" : "Upload property"}</button>
          <Link href="/admin/properties" className="btn text-muted">Cancel</Link>
        </div>
      </form>

      {p && (
        <form
          action={deleteProperty}
          onSubmit={(e) => { if (!confirm(`Delete “${p.title}” and its photos? This cannot be undone.`)) e.preventDefault(); }}
          className="mt-10 border-t border-navy/10 pt-6"
        >
          <input type="hidden" name="id" value={p.id} />
          <button className="text-sm font-semibold text-red-600 hover:text-red-800">Delete this property</button>
        </form>
      )}
    </>
  );
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="font-semibold text-navy">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Field({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="label">{label}</span>
      {children}
    </label>
  );
}
