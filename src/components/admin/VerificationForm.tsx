"use client";

import { startTransition, useActionState } from "react";
import { updateVerification, type FormState } from "@/app/actions/admin";
import { humanize } from "@/lib/format";
import { REQUEST_STATUSES, type VerificationRequest } from "@/lib/types";
import ChecklistFields from "./ChecklistFields";

export default function VerificationForm({ request }: { request: VerificationRequest }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(updateVerification, { ok: false, message: "" });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => formAction(data));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">
      <input type="hidden" name="id" value={request.id} />

      <div>
        <h2 className="font-semibold text-navy">Verification steps</h2>
        <p className="mb-4 text-sm text-muted">Tick each step as the team completes it.</p>
        <ChecklistFields checks={request.checks} />
      </div>

      <label className="block">
        <span className="label">Findings & notes</span>
        <textarea
          name="findings"
          rows={7}
          defaultValue={request.findings}
          className="field"
          placeholder="What was checked, where, what was found, and the advice given to the client…"
        />
      </label>

      <div className="flex flex-wrap items-end gap-4">
        <label className="block w-full sm:w-56">
          <span className="label">Status</span>
          <select name="status" defaultValue={request.status} className="field">
            {REQUEST_STATUSES.map((s) => <option key={s} value={s}>{humanize(s)}</option>)}
          </select>
        </label>
        <button disabled={pending} className="btn btn-navy">{pending ? "Saving…" : "Save progress"}</button>
        {state.message && (
          <span className={state.ok ? "text-sm text-emerald-700" : "text-sm text-red-700"}>{state.message}</span>
        )}
      </div>
    </form>
  );
}
