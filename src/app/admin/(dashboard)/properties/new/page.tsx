import Link from "next/link";
import PropertyForm from "@/components/admin/PropertyForm";

export default function NewPropertyPage() {
  return (
    <>
      <Link href="/admin/properties" className="text-sm text-muted hover:text-navy">← Properties</Link>
      <h1 className="mt-2 mb-8 text-2xl font-semibold text-navy">Upload a property</h1>
      <PropertyForm />
    </>
  );
}
