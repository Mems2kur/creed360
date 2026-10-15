"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, endSession, requireAdmin, startSession } from "@/lib/auth";
import {
  deleteProperty as dbDeleteProperty,
  deleteUpload,
  deleteVerification as dbDeleteVerification,
  getProperty,
  newId,
  saveProperty as dbSaveProperty,
  saveUpload,
  updateVerification as dbUpdateVerification,
} from "@/lib/db";
import {
  PAYMENT_OPTIONS,
  PROPERTY_TYPES,
  PROPERTY_VERIFICATION_STATUSES,
  REQUEST_STATUSES,
  VERIFICATION_STEPS,
  type Checklist,
  type PaymentOption,
  type PropertyType,
  type PropertyVerificationStatus,
  type RequestStatus,
} from "@/lib/types";

export type FormState = { ok: boolean; message: string };

const text = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

/** Reads the six step checkboxes (named check_property, check_location, …). */
const readChecklist = (fd: FormData) =>
  Object.fromEntries(VERIFICATION_STEPS.map((s) => [s.key, fd.get(`check_${s.key}`) === "on"])) as Checklist;

/** Refresh every page that shows property or request data. */
function refreshAll() {
  revalidatePath("/", "layout");
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function login(_prev: FormState, fd: FormData): Promise<FormState> {
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SECRET) {
    return { ok: false, message: "Admin is not configured. Set ADMIN_PASSWORD and ADMIN_SECRET in .env.local." };
  }
  if (!checkPassword(text(fd, "password"))) {
    return { ok: false, message: "Incorrect password." };
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

// ─── Properties ──────────────────────────────────────────────────────────────

export async function saveProperty(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();

  const id = text(fd, "id") || newId();
  const existing = await getProperty(id);

  const title = text(fd, "title");
  const type = text(fd, "type") as PropertyType;
  const price = Number(text(fd, "price").replace(/[^\d.]/g, ""));
  const status = text(fd, "verificationStatus") as PropertyVerificationStatus;

  if (!title) return { ok: false, message: "Title is required." };
  if (!PROPERTY_TYPES.includes(type)) return { ok: false, message: "Choose a property type." };
  if (!price || price <= 0) return { ok: false, message: "Enter a valid price." };
  if (!PROPERTY_VERIFICATION_STATUSES.includes(status)) return { ok: false, message: "Choose a verification status." };

  const checks = readChecklist(fd);
  // Guard: a listing can only show the VERIFIED badge once every step is ticked.
  if (status === "verified" && !Object.values(checks).every(Boolean)) {
    return { ok: false, message: "Tick all six verification steps before marking this property as Verified." };
  }

  try {
    // Images: keep the ones not marked for removal, then append new uploads.
    const removed = new Set(fd.getAll("removeImage").map(String).filter((url) => existing?.images.includes(url)));
    const kept = (existing?.images ?? []).filter((url) => !removed.has(url));
    const newFiles = fd.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
    const uploaded = await Promise.all(newFiles.map((f) => saveUpload(f)));
    await Promise.all([...removed].map(deleteUpload));

    const bedrooms = Number(text(fd, "bedrooms")) || undefined;
    const bathrooms = Number(text(fd, "bathrooms")) || undefined;

    await dbSaveProperty({
      id,
      title,
      type,
      location: text(fd, "location"),
      state: text(fd, "state") || "Lagos",
      price,
      size: text(fd, "size"),
      bedrooms,
      bathrooms,
      titleDocument: text(fd, "titleDocument"),
      description: text(fd, "description"),
      features: text(fd, "features").split("\n").map((f) => f.trim()).filter(Boolean),
      paymentOptions: fd.getAll("paymentOptions").map(String).filter((o): o is PaymentOption => PAYMENT_OPTIONS.includes(o as PaymentOption)),
      images: [...kept, ...uploaded],
      verification: {
        status,
        checks,
        notes: text(fd, "verificationNotes"),
        // Stamp the date the first time it becomes verified; clear it if un-verified.
        verifiedAt: status === "verified" ? existing?.verification.verifiedAt ?? new Date().toISOString() : undefined,
      },
      published: fd.get("published") === "on",
      featured: fd.get("featured") === "on",
    });
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "Could not save the property." };
  }

  refreshAll();
  redirect(`/admin/properties?saved=${encodeURIComponent(title)}`);
}

export async function deleteProperty(fd: FormData) {
  await requireAdmin();
  await dbDeleteProperty(text(fd, "id"));
  refreshAll();
  redirect("/admin/properties");
}

/** Quick publish / unpublish toggle from the properties table. */
export async function togglePublished(fd: FormData) {
  await requireAdmin();
  const property = await getProperty(text(fd, "id"));
  if (property) await dbSaveProperty({ ...property, published: !property.published });
  refreshAll();
}

// ─── Verification requests ───────────────────────────────────────────────────

export async function updateVerification(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const status = text(fd, "status") as RequestStatus;
  if (!REQUEST_STATUSES.includes(status)) return { ok: false, message: "Choose a valid status." };

  const updated = await dbUpdateVerification(text(fd, "id"), {
    status,
    checks: readChecklist(fd),
    findings: text(fd, "findings"),
  });
  if (!updated) return { ok: false, message: "Request not found." };

  refreshAll();
  return { ok: true, message: `Saved at ${new Date().toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" })}` };
}

export async function deleteVerification(fd: FormData) {
  await requireAdmin();
  await dbDeleteVerification(text(fd, "id"));
  refreshAll();
  redirect("/admin/verifications");
}
