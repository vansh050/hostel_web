"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 401) {
        setError("Wrong password. Try again.");
        return;
      }
      if (res.status === 429) {
        setError("Too many attempts. Wait a minute and try again.");
        return;
      }
      if (!res.ok) {
        setError("Something went wrong. Please try again.");
        return;
      }

      const data = (await res.json()) as { access_token: string };
      localStorage.setItem("admin_token", data.access_token);
      localStorage.setItem("admin_email", email);
      router.push("/admin/dashboard");
    } catch {
      setError("Can't reach the server. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="block text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)] mb-2"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          disabled={loading}
          className="w-full px-3 py-2.5 bg-white border border-[var(--color-line)] rounded-sm text-sm text-[var(--color-ink)] placeholder:text-[var(--color-mute)] focus:outline-none focus:border-[var(--color-saffron)] disabled:opacity-50 transition-colors"
          placeholder="you@lalpur.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)] mb-2"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError(null);
          }}
          disabled={loading}
          className="w-full px-3 py-2.5 bg-white border border-[var(--color-line)] rounded-sm text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-saffron)] disabled:opacity-50 transition-colors"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="text-xs text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-sm"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !email || !password}
        className="w-full bg-[var(--color-saffron)] hover:bg-[var(--color-saffron-deep)] disabled:bg-[var(--color-saffron)]/40 disabled:cursor-not-allowed text-white text-sm tracking-wide py-3 rounded-sm transition-colors"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
