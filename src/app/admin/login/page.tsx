import Link from "next/link";
import { AdminLoginForm } from "@/components/AdminLoginForm";

export const metadata = {
  title: "Admin Login · Lalpur Hostels",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--color-cream)] px-4 py-16">
      <div className="w-full max-w-sm">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-mute)] text-center mb-12">
          Lalpur Hostels
        </p>

        <h1 className="font-display text-4xl text-[var(--color-ink)] text-center mb-3">
          Admin Portal
        </h1>

        <div className="flex justify-center mb-6">
          <span className="block h-px w-12 bg-[var(--color-saffron)]" />
        </div>

        <p className="text-sm text-[var(--color-mute)] text-center mb-10 leading-relaxed">
          Sign in to manage your hostel leads.
        </p>

        <AdminLoginForm />

        <p className="mt-10 text-center">
          <Link
            href="/"
            className="text-xs tracking-wide text-[var(--color-mute)] hover:text-[var(--color-ink)] transition-colors"
          >
            ← Back to the website
          </Link>
        </p>
      </div>
    </main>
  );
}
