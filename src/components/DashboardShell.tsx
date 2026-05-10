"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type HostelCard = {
  slug: string;
  name: string;
  gender: "girls" | "boys";
};

const HOSTELS: HostelCard[] = [
  { slug: "muskan", name: "Muskan Girls Hostel", gender: "girls" },
  { slug: "sanskriti", name: "Sanskriti Girls Hostel", gender: "girls" },
  { slug: "sankalp", name: "Sankalp Boys Hostel", gender: "boys" },
];

export function DashboardShell() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    setEmail(localStorage.getItem("admin_email"));
    setChecked(true);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_email");
    router.replace("/admin/login");
  }

  if (!checked) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[var(--color-cream)]">
        <p className="text-xs tracking-[0.2em] uppercase text-[var(--color-mute)]">
          Loading…
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-cream)] px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-16 pb-4 border-b border-[var(--color-line)]">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-mute)]">
            Lalpur · Admin
          </p>
          <button
            onClick={handleLogout}
            className="text-xs tracking-[0.15em] uppercase text-[var(--color-ink)] border border-[var(--color-line)] hover:border-[var(--color-saffron)] hover:text-[var(--color-saffron-deep)] px-4 py-2 rounded-sm transition-colors"
          >
            Log out
          </button>
        </header>

        <div className="mb-12">
          <h1 className="font-display text-5xl text-[var(--color-ink)] mb-2">
            Your hostels.
          </h1>
          <div className="h-px w-12 bg-[var(--color-saffron)] mb-6" />
          <p className="text-sm text-[var(--color-mute)]">
            Signed in as <span className="text-[var(--color-ink)]">{email ?? "—"}</span>
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {HOSTELS.map((hostel) => (
            <Link
              key={hostel.slug}
              href={`/admin/hostels/${hostel.slug}`}
              className="group bg-white/60 border border-[var(--color-line)] hover:border-[var(--color-saffron)] hover:bg-white rounded-sm p-7 transition-all"
            >
              <p
                className={`text-[10px] tracking-[0.3em] uppercase mb-4 ${
                  hostel.gender === "girls"
                    ? "text-[var(--color-gender-girls)]"
                    : "text-[var(--color-gender-boys)]"
                }`}
              >
                {hostel.gender === "girls" ? "Girls" : "Boys"}
              </p>

              <h2 className="font-display text-2xl text-[var(--color-ink)] mb-8 leading-tight">
                {hostel.name}
              </h2>

              <p className="text-xs tracking-wide text-[var(--color-mute)] group-hover:text-[var(--color-saffron-deep)] transition-colors flex items-center gap-1">
                View leads
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </p>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-xs text-[var(--color-mute)] italic">
          Lead lists, filters and inline editing arrive in the next milestone (M7.2).
        </p>
      </div>
    </main>
  );
}
