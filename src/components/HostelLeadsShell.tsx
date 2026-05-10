"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const HOSTEL_NAMES: Record<string, string> = {
  muskan: "Muskan Girls Hostel",
  sanskriti: "Sanskriti Girls Hostel",
  sankalp: "Sankalp Boys Hostel",
};

export function HostelLeadsShell({ slug }: { slug: string }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    setChecked(true);
  }, [router]);

  if (!checked) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[var(--color-cream)]">
        <p className="text-xs tracking-[0.2em] uppercase text-[var(--color-mute)]">
          Loading…
        </p>
      </main>
    );
  }

  const hostelName = HOSTEL_NAMES[slug] ?? "Unknown hostel";

  return (
    <main className="min-h-screen bg-[var(--color-cream)] px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-16 pb-4 border-b border-[var(--color-line)]">
          <Link
            href="/admin/dashboard"
            className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-mute)] hover:text-[var(--color-ink)] transition-colors"
          >
            ← Lalpur · Admin
          </Link>
        </header>

        <div className="mb-12">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-mute)] mb-3">
            Leads
          </p>
          <h1 className="font-display text-5xl text-[var(--color-ink)] mb-2">
            {hostelName}
          </h1>
          <div className="h-px w-12 bg-[var(--color-saffron)] mb-6" />
        </div>

        <div className="bg-white/60 border border-[var(--color-line)] rounded-sm p-10 text-center">
          <p className="text-sm text-[var(--color-mute)] leading-relaxed max-w-md mx-auto">
            Lead list, status toggles, remarks and filters arrive in the next
            milestone (M7.2).
          </p>
        </div>
      </div>
    </main>
  );
}
