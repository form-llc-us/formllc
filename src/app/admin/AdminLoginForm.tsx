"use client";

import { useState, useTransition } from "react";

export default function AdminLoginForm() {
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (res.ok) {
        window.location.reload();
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "Login failed");
    });
  }

  return (
    <form onSubmit={submit} className="card p-8 w-full max-w-sm space-y-5">
      <div>
        <h1 className="text-xl font-extrabold text-ink-900">FormLLC admin</h1>
        <p className="mt-1.5 text-sm text-ink-600">
          Enter the admin token to manage blogs.
        </p>
      </div>
      <label className="block">
        <span className="block text-xs font-semibold uppercase tracking-wider text-ink-500 mb-1.5">
          Admin token
        </span>
        <input
          type="password"
          autoComplete="current-password"
          className="input"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
      </label>
      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 text-rose-800 px-3 py-2 text-sm">
          {error}
        </div>
      )}
      <button type="submit" disabled={isPending} className="btn-primary btn-md w-full">
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
