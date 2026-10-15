import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-contours grid min-h-screen place-items-center bg-navy px-4 text-center text-white">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-4xl font-semibold">We couldn’t find that page.</h1>
        <Link href="/" className="btn btn-gold mt-8">Back to home</Link>
      </div>
    </main>
  );
}
