"use server";

import { createVerification, getProperty, saveUpload } from "@/lib/db";
import { emptyChecklist, SERVICE_TYPES, type ServiceType } from "@/lib/types";

export type BookingState = {
  ok: boolean;
  message: string;
  reference?: string;
  errors?: Record<string, string>;
  values?: Record<string, string>; // echoed back so the form keeps what the user typed
};

const text = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

/** Handles the public "Book a Verification" / "Talk to an Advisor" form. */
export async function submitBooking(_prev: BookingState, fd: FormData): Promise<BookingState> {
  // Honeypot: real people never see or fill this field; bots usually do.
  if (text(fd, "company")) return { ok: true, message: "Thank you." };

  const name = text(fd, "name");
  const email = text(fd, "email");
  const phone = text(fd, "phone");
  const service = text(fd, "service") as ServiceType;
  const propertyLocation = text(fd, "propertyLocation");
  const details = text(fd, "details");
  const propertyId = text(fd, "propertyId") || undefined;

  const values = { name, email, phone, service, propertyLocation, details };
  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Please enter a valid email address.";
  if (phone.replace(/\D/g, "").length < 10) errors.phone = "Please enter a valid phone number.";
  if (!SERVICE_TYPES.includes(service)) errors.service = "Please choose a service.";
  if (!propertyLocation) errors.propertyLocation = "Tell us where the property is (or the area you’re interested in).";
  if (Object.keys(errors).length) return { ok: false, message: "Please fix the highlighted fields.", errors, values };

  const files = fd.getAll("documents").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > 5) return { ok: false, message: "You can attach up to 5 documents.", values };

  try {
    const documents = await Promise.all(files.map(async (f) => ({ name: f.name, url: await saveUpload(f, { private: true }) })));
    const property = propertyId ? await getProperty(propertyId) : null;

    const record = await createVerification({
      name,
      email,
      phone,
      service,
      propertyId: property?.id,
      propertyTitle: property?.title,
      propertyLocation,
      details,
      documents,
      status: "new",
      checks: emptyChecklist(),
      findings: "",
    });

    return {
      ok: true,
      reference: record.reference,
      message: "Thank you — your request has been received. An advisor will contact you shortly.",
    };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "Something went wrong. Please try again.", values };
  }
}
