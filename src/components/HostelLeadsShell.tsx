"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAdminLeads, type Lead } from "@/hooks/useAdminLeads";

const HOSTEL_NAMES: Record<string, string> = {
  muskan: "Muskan Girls Hostel",
  sanskriti: "Sanskriti Girls Hostel",
  sankalp: "Sankalp Boys Hostel",
};

type SaveState = "idle" | "saving" | "saved" | "error";

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

  const { leads, loading, error, updateLead } = useAdminLeads(slug);

  const [timeWindow, setTimeWindow] = useState<30 | 60 | 90 | "all">(30);
  const [search, setSearch] = useState("");
  const [unactionedOnly, setUnactionedOnly] = useState(false);

  const filteredLeads = useMemo(() => {
    const now = Date.now();
    const q = search.trim().toLowerCase();
    return leads.filter((lead) => {
      if (timeWindow !== "all") {
        const ageDays =
          (now - new Date(lead.created_at).getTime()) / (1000 * 60 * 60 * 24);
        if (ageDays > timeWindow) return false;
      }
      if (unactionedOnly && lead.actioned) return false;
      if (q && !lead.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [leads, timeWindow, search, unactionedOnly]);

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
  const totalCount = leads.length;
  const filteredCount = filteredLeads.length;
  const filteredUnactionedCount = filteredLeads.filter((l) => !l.actioned).length;
  const filtersActive =
    timeWindow !== 30 || search.trim() !== "" || unactionedOnly;

  function clearFilters() {
    setTimeWindow(30);
    setSearch("");
    setUnactionedOnly(false);
  }

  return (
    <main className="min-h-screen bg-[var(--color-cream-deep)] px-6 lg:px-12 py-10">
      <div className="w-full">
        <header className="flex items-center justify-between mb-16 pb-4 border-b border-[var(--color-line)]">
          <Link
            href="/admin/dashboard"
            className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-mute)] hover:text-[var(--color-ink)] transition-colors"
          >
            ← Lalpur · Admin
          </Link>
        </header>

        <div className="mb-10">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-mute)] mb-3">
            Leads
          </p>
          <h1 className="font-display text-5xl text-[var(--color-ink)] mb-2">
            {hostelName}
          </h1>
          <div className="h-px w-12 bg-[var(--color-saffron)] mb-6" />
          {!loading && !error && totalCount > 0 && (
            <p className="text-sm text-[var(--color-mute)]">
              {filtersActive ? (
                <>
                  <span className="text-[var(--color-ink)]">{filteredCount}</span>{" "}
                  of {totalCount} leads
                </>
              ) : (
                <>
                  <span className="text-[var(--color-ink)]">{totalCount}</span> total
                </>
              )}
              {" · "}
              <span className="text-[var(--color-ink)]">{filteredUnactionedCount}</span> unactioned
            </p>
          )}
        </div>

        {!loading && !error && totalCount > 0 && (
          <FilterBar
            timeWindow={timeWindow}
            setTimeWindow={setTimeWindow}
            search={search}
            setSearch={setSearch}
            unactionedOnly={unactionedOnly}
            setUnactionedOnly={setUnactionedOnly}
          />
        )}

        <LeadsBody
          loading={loading}
          error={error}
          leads={filteredLeads}
          totalCount={totalCount}
          filtersActive={filtersActive}
          clearFilters={clearFilters}
          onUpdate={updateLead}
        />
      </div>
    </main>
  );
}

function LeadsBody({
  loading,
  error,
  leads,
  totalCount,
  filtersActive,
  clearFilters,
  onUpdate,
}: {
  loading: boolean;
  error: string | null;
  leads: Lead[];
  totalCount: number;
  filtersActive: boolean;
  clearFilters: () => void;
  onUpdate: (id: number, changes: { actioned?: boolean; remarks?: string | null }) => Promise<void>;
}) {
  if (loading) {
    return (
      <p className="text-xs tracking-[0.2em] uppercase text-[var(--color-mute)]">
        Loading leads…
      </p>
    );
  }

  if (error) {
    return (
      <div role="alert" className="bg-red-50 border border-red-200 rounded-sm p-5">
        <p className="text-sm text-red-800 mb-2">Couldn&rsquo;t load leads.</p>
        <p className="text-xs text-red-700">{error}</p>
      </div>
    );
  }

  if (leads.length === 0) {
    if (filtersActive && totalCount > 0) {
      return (
        <div className="bg-white border border-[var(--color-line)] rounded-sm p-10 text-center">
          <p className="text-sm text-[var(--color-mute)] italic mb-4">
            No leads match these filters.
          </p>
          <button
            onClick={clearFilters}
            className="text-xs tracking-[0.15em] uppercase text-[var(--color-ink)] border border-[var(--color-line)] hover:border-[var(--color-saffron)] hover:text-[var(--color-saffron-deep)] px-4 py-2 rounded-sm transition-colors"
          >
            Clear filters
          </button>
        </div>
      );
    }
    return (
      <div className="bg-white border border-[var(--color-line)] rounded-sm p-10 text-center">
        <p className="text-sm text-[var(--color-mute)] italic">
          No leads yet for this hostel.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[var(--color-line)] rounded-sm overflow-x-auto shadow-[0_1px_3px_rgba(28,25,23,0.04)]">
      <table className="w-full text-base">
        <thead>
          <tr className="border-b border-[var(--color-line)]">
            <Th className="w-12 text-right">#</Th>
            <Th>Name</Th>
            <Th>Contact</Th>
            <Th>Action</Th>
            <Th>Created</Th>
            <Th className="w-40">Status</Th>
            <Th className="min-w-[16rem]">Remarks</Th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, idx) => (
            <LeadRow
              key={lead.id}
              index={idx}
              lead={lead}
              onUpdate={onUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`text-left text-xs tracking-[0.2em] uppercase text-[var(--color-mute)] font-normal px-6 py-5 ${className}`}
    >
      {children}
    </th>
  );
}

function LeadRow({
  index,
  lead,
  onUpdate,
}: {
  index: number;
  lead: Lead;
  onUpdate: (
    id: number,
    changes: { actioned?: boolean; remarks?: string | null }
  ) => Promise<void>;
}) {
  const [remarksDraft, setRemarksDraft] = useState(lead.remarks ?? "");
  const [saveState, setSaveState] = useState<SaveState>("idle");

  useEffect(() => {
    setRemarksDraft(lead.remarks ?? "");
  }, [lead.remarks]);

  async function persist(changes: { actioned?: boolean; remarks?: string | null }) {
    setSaveState("saving");
    try {
      await onUpdate(lead.id, changes);
      setSaveState("saved");
      setTimeout(() => {
        setSaveState((s) => (s === "saved" ? "idle" : s));
      }, 1500);
    } catch {
      setSaveState("error");
    }
  }

  async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    await persist({ actioned: e.target.value === "actioned" });
  }

  async function handleRemarksBlur() {
    const original = lead.remarks ?? "";
    if (remarksDraft === original) return;
    await persist({ remarks: remarksDraft.trim() === "" ? null : remarksDraft });
  }

  return (
    <tr className="border-b border-[var(--color-line)] last:border-b-0 hover:bg-[var(--color-line-soft)] transition-colors">
      <td className="px-6 py-5 text-right text-sm text-[var(--color-mute)] tabular-nums align-top">
        {index + 1}
      </td>
      <td className="px-6 py-5 align-top">
        <span className="font-display text-xl text-[var(--color-ink)]">
          {lead.name}
        </span>
      </td>
      <td className="px-6 py-5 align-top text-[var(--color-ink)] tabular-nums">
        {lead.phone}
      </td>
      <td className="px-6 py-5 align-top capitalize text-[var(--color-mute)]">
        {lead.action}
      </td>
      <td className="px-6 py-5 align-top text-sm text-[var(--color-mute)] whitespace-nowrap">
        {formatRelativeTime(lead.created_at)}
      </td>
      <td className="px-6 py-5 align-top">
        <select
          value={lead.actioned ? "actioned" : "pending"}
          onChange={handleStatusChange}
          disabled={saveState === "saving"}
          className={`w-full text-sm tracking-[0.1em] uppercase px-3 py-2.5 rounded-sm border bg-white focus:outline-none focus:border-[var(--color-saffron)] disabled:opacity-50 transition-colors ${
            lead.actioned
              ? "border-[var(--color-forest)]/40 text-[var(--color-forest-deep)]"
              : "border-[var(--color-saffron)]/40 text-[var(--color-saffron-deep)]"
          }`}
        >
          <option value="pending">Pending</option>
          <option value="actioned">Actioned</option>
        </select>
      </td>
      <td className="px-6 py-5 align-top">
        <div className="flex items-start gap-2">
          <input
            type="text"
            value={remarksDraft}
            onChange={(e) => setRemarksDraft(e.target.value)}
            onBlur={handleRemarksBlur}
            placeholder="Add a note…"
            disabled={saveState === "saving"}
            className="flex-1 text-base px-3 py-2.5 rounded-sm border border-transparent hover:border-[var(--color-line)] focus:outline-none focus:border-[var(--color-saffron)] focus:bg-white bg-transparent disabled:opacity-50 transition-colors"
            maxLength={1000}
          />
          <SaveIndicator state={saveState} />
        </div>
      </td>
    </tr>
  );
}

function SaveIndicator({ state }: { state: SaveState }) {
  if (state === "idle") {
    return <span className="w-4" aria-hidden />;
  }
  if (state === "saving") {
    return (
      <span
        className="w-4 h-4 mt-2 rounded-full border border-[var(--color-mute)] border-t-[var(--color-saffron)] animate-spin"
        aria-label="Saving"
      />
    );
  }
  if (state === "saved") {
    return (
      <span
        className="text-[var(--color-forest-deep)] mt-1 text-sm"
        aria-label="Saved"
      >
        ✓
      </span>
    );
  }
  return (
    <span
      className="text-red-700 mt-1 text-sm"
      aria-label="Save failed"
      title="Failed to save"
    >
      !
    </span>
  );
}

type TimeWindow = 30 | 60 | 90 | "all";

function FilterBar({
  timeWindow,
  setTimeWindow,
  search,
  setSearch,
  unactionedOnly,
  setUnactionedOnly,
}: {
  timeWindow: TimeWindow;
  setTimeWindow: (v: TimeWindow) => void;
  search: string;
  setSearch: (v: string) => void;
  unactionedOnly: boolean;
  setUnactionedOnly: (v: boolean) => void;
}) {
  const windows: { label: string; value: TimeWindow }[] = [
    { label: "30d", value: 30 },
    { label: "60d", value: 60 },
    { label: "90d", value: 90 },
    { label: "All", value: "all" },
  ];

  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 bg-white border border-[var(--color-line)] rounded-sm p-4">
      <div className="flex items-center gap-3">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)] hidden md:inline">
          Window
        </span>
        <div className="inline-flex rounded-sm border border-[var(--color-line)] overflow-hidden">
          {windows.map((w) => {
            const active = w.value === timeWindow;
            return (
              <button
                key={String(w.value)}
                onClick={() => setTimeWindow(w.value)}
                className={`px-4 py-2 text-xs tracking-[0.1em] uppercase transition-colors border-r border-[var(--color-line)] last:border-r-0 ${
                  active
                    ? "bg-[var(--color-saffron)] text-white"
                    : "bg-white text-[var(--color-mute)] hover:text-[var(--color-ink)]"
                }`}
              >
                {w.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 flex items-center gap-3">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)] hidden md:inline">
          Search
        </span>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name…"
          className="flex-1 text-sm px-3 py-2 rounded-sm border border-[var(--color-line)] focus:outline-none focus:border-[var(--color-saffron)] transition-colors"
        />
      </div>

      <label className="inline-flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={unactionedOnly}
          onChange={(e) => setUnactionedOnly(e.target.checked)}
          className="accent-[var(--color-saffron)] w-4 h-4"
        />
        <span className="text-xs tracking-[0.1em] uppercase text-[var(--color-ink)]">
          Unactioned only
        </span>
      </label>
    </div>
  );
}

function formatRelativeTime(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 30) return `${diffDay}d ago`;
  const diffMo = Math.floor(diffDay / 30);
  if (diffMo < 12) return `${diffMo}mo ago`;
  return `${Math.floor(diffMo / 12)}y ago`;
}
