// apps/admin-dashboard/src/lib/api.ts
import { createClient } from "@/lib/supabase/client";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:10000";

export async function authFetch(
  endpoint: string,
  options?: RequestInit,
): Promise<any> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers: Record<string, string> = {
    ...(options?.headers as Record<string, string> | undefined),
  };

  // Only set Content-Type for non-FormData bodies.
  // FormData must let the browser set `multipart/form-data; boundary=...`.
  if (!(options?.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (session?.access_token) {
    headers["Authorization"] = `Bearer ${session.access_token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    // Try to extract a friendly error message from Nest's error shape
    const raw = await res.text().catch(() => "");
    let message = `Request failed: ${res.status}`;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        message =
          parsed.message ||
          (Array.isArray(parsed.message) ? parsed.message.join(", ") : null) ||
          parsed.error ||
          raw;
      } catch {
        message = raw;
      }
    }
    throw new Error(
      typeof message === "string" ? message : JSON.stringify(message),
    );
  }

  // Handle empty responses (204 No Content, or empty 200)
  if (res.status === 204) return null;

  const text = await res.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}