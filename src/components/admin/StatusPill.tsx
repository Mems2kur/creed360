import { cx, humanize } from "@/lib/format";

const COLORS: Record<string, string> = {
  // property verification
  unverified: "bg-slate-100 text-slate-600",
  in_review: "bg-amber-100 text-amber-800",
  verified: "bg-emerald-100 text-emerald-800",
  // request status
  new: "bg-blue-100 text-blue-800",
  in_progress: "bg-amber-100 text-amber-800",
  awaiting_client: "bg-violet-100 text-violet-800",
  completed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-slate-100 text-slate-500",
};

export default function StatusPill({ status }: { status: string }) {
  return (
    <span className={cx("inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold", COLORS[status] ?? "bg-slate-100")}>
      {humanize(status)}
    </span>
  );
}
