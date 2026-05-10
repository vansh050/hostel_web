 export const API_URL =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

  export type ApiError = {
    status: number;
    message: string;
  };

  function getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("admin_token");
  }

  function clearAuthAndRedirect(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_email");
    window.location.href = "/admin/login";
  }

  export async function apiFetch<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers = new Headers(options.headers);
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
    if (options.body && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    let res: Response;
    try {
      res = await fetch(`${API_URL}${path}`, { ...options, headers });
    } catch {
      const err: ApiError = {
        status: 0,
        message: "Network error. Check your connection.",
      };
      throw err;
    }

    if (res.status === 401) {
      clearAuthAndRedirect();
      const err: ApiError = { status: 401, message: "Session expired." };
      throw err;
    }

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const message =
        data && typeof data === "object" && "error" in data
          ? String((data as { error: unknown }).error)
          : `Request failed (${res.status})`;
      const err: ApiError = { status: res.status, message };
      throw err;
    }

    return data as T;
  }
