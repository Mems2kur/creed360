export const naira = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);

export const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });

export const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");

/** "in_progress" → "In progress" */
export const humanize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, " ");
