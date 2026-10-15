import { VERIFICATION_STEPS, type Checklist } from "@/lib/types";

/** The six "How We Verify" steps as checkboxes named check_<step>. */
export default function ChecklistFields({ checks }: { checks: Checklist }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {VERIFICATION_STEPS.map((s, i) => (
        <label key={s.key} className="flex cursor-pointer items-start gap-3 rounded-xl border border-navy/10 bg-white p-3 has-checked:border-gold has-checked:bg-sand">
          <input type="checkbox" name={`check_${s.key}`} defaultChecked={checks[s.key]} className="mt-1 h-4 w-4 accent-navy" />
          <span>
            <span className="block text-sm font-semibold text-navy">0{i + 1} — {s.label}</span>
            <span className="block text-xs text-muted">{s.hint}</span>
          </span>
        </label>
      ))}
    </div>
  );
}
