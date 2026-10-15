import Link from "next/link";
import { notFound } from "next/navigation";
import PropertyForm from "@/components/admin/PropertyForm";
import { getProperty } from "@/lib/db";

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const property = await getProperty((await params).id);
  if (!property) notFound();

  return (
    <>
      <Link href="/admin/properties" className="text-sm text-muted hover:text-navy">← Properties</Link>
      <h1 className="mt-2 mb-8 text-2xl font-semibold text-navy">Edit: {property.title}</h1>
      {/* key forces a fresh form if you navigate between two properties */}
      <PropertyForm key={property.id} property={property} />
    </>
  );
}
