// ─── Shared data shapes for the whole app ────────────────────────────────────

/** The six steps from "How We Verify" in the website copy. */
export const VERIFICATION_STEPS = [
  { key: "property", label: "Property", hint: "Understand what is being offered." },
  { key: "location", label: "Location", hint: "Confirm where it actually is." },
  { key: "documentation", label: "Documentation", hint: "Review the information behind the ownership claim." },
  { key: "survey", label: "Survey", hint: "Understand the land accurately." },
  { key: "advisory", label: "Advisory", hint: "Understand what the findings mean." },
  { key: "decision", label: "Decision", hint: "Move forward with better information." },
] as const;

export type StepKey = (typeof VERIFICATION_STEPS)[number]["key"];
export type Checklist = Record<StepKey, boolean>;

export const emptyChecklist = (): Checklist => ({
  property: false,
  location: false,
  documentation: false,
  survey: false,
  advisory: false,
  decision: false,
});

// ─── Properties ──────────────────────────────────────────────────────────────

export const PROPERTY_TYPES = ["Land", "House", "Apartment", "Commercial"] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const PAYMENT_OPTIONS = ["Outright", "Payment plan", "Mortgage"] as const;
export type PaymentOption = (typeof PAYMENT_OPTIONS)[number];

export const PROPERTY_VERIFICATION_STATUSES = ["unverified", "in_review", "verified"] as const;
export type PropertyVerificationStatus = (typeof PROPERTY_VERIFICATION_STATUSES)[number];

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  location: string; // e.g. "Sangotedo, Eti-Osa"
  state: string; // e.g. "Lagos"
  price: number; // in Naira
  size: string; // e.g. "600 sqm"
  bedrooms?: number;
  bathrooms?: number;
  titleDocument: string; // e.g. "C of O", "Governor's Consent"
  description: string;
  features: string[];
  paymentOptions: PaymentOption[];
  images: string[]; // URLs served by /api/uploads/...
  verification: {
    status: PropertyVerificationStatus;
    checks: Checklist;
    notes: string; // public summary shown on the property page
    verifiedAt?: string;
  };
  published: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Verification / enquiry requests from clients ────────────────────────────

export const SERVICE_TYPES = [
  "Property Verification",
  "Property Search & Advisory",
  "Surveying & Geospatial Intelligence",
  "Purchase Support",
  "Development Support",
  "Palmora Roots",
] as const;
export type ServiceType = (typeof SERVICE_TYPES)[number];

export const REQUEST_STATUSES = ["new", "in_progress", "awaiting_client", "completed", "cancelled"] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export interface VerificationRequest {
  id: string;
  reference: string; // e.g. C360-VR-0007
  name: string;
  email: string;
  phone: string;
  service: ServiceType;
  propertyId?: string; // set when booked from a listed property
  propertyTitle?: string;
  propertyLocation: string;
  details: string;
  documents: { name: string; url: string }[];
  status: RequestStatus;
  checks: Checklist;
  findings: string; // internal notes / findings for the client
  createdAt: string;
  updatedAt: string;
}
