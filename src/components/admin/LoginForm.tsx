"use client";

import { useActionState } from "react";
import { login, type FormState } from "@/app/actions/admin";

export default function LoginForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(login, { ok: false, message: "" });
  return (
    <form action={action} className="mt-6 space-y-4">
      <div>
        <label htmlFor="password" className="label">Password</label>
        <input id="password" name="password" type="password" required autoFocus className="field" autoComplete="current-password" />
      </div>
      {state.message && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{state.message}</p>}
      <button disabled={pending} className="btn btn-navy w-full">{pending ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
