import { useCallback, useEffect, useState } from "react";
import { apiFetch, type ApiError } from "@/lib/api";

export type Lead = {
  id: number;
  hostel: string;
  name: string;
  phone: string;
  action: "call" | "whatsapp";
  actioned: boolean;
  remarks: string | null;
  created_at: string;
  source: string;
};

type LeadsResponse = {
  leads: Lead[];
  count: number;
  source: string;
};

type LeadPatch = {
  actioned?: boolean;
  remarks?: string | null;
};

type PatchResponse = {
  id: number;
  actioned: boolean;
  remarks: string | null;
};

const HOSTEL_NAME_BY_SLUG: Record<string, string> = {
  muskan: "Muskan Girls Hostel",
  sanskriti: "Sanskriti Girls Hostel",
  sankalp: "Sankalp Boys Hostel",
};

export function useAdminLeads(slug: string) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    apiFetch<LeadsResponse>("/admin/leads", { signal: controller.signal })
      .then((data) => {
        const hostelName = HOSTEL_NAME_BY_SLUG[slug];
        const filtered = data.leads.filter((l) => l.hostel === hostelName);
        setLeads(filtered);
        setLoading(false);
      })
      .catch((err: ApiError | Error) => {
        if (controller.signal.aborted) return;
        const message = "message" in err ? err.message : "Failed to load leads";
        setError(message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [slug]);

  const updateLead = useCallback(
    async (id: number, changes: LeadPatch): Promise<void> => {
      const previous = leads.find((l) => l.id === id);
      if (!previous) throw new Error("Lead not found in local state");

      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, ...changes } : l))
      );

      try {
        const updated = await apiFetch<PatchResponse>(`/admin/leads/${id}`, {
          method: "PATCH",
          body: JSON.stringify(changes),
        });
        setLeads((prev) =>
          prev.map((l) =>
            l.id === id
              ? { ...l, actioned: updated.actioned, remarks: updated.remarks }
              : l
          )
        );
      } catch (err) {
        setLeads((prev) => prev.map((l) => (l.id === id ? previous : l)));
        throw err;
      }
    },
    [leads]
  );

  return { leads, loading, error, updateLead };
}
