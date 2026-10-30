// apps/admin-dashboard/src/lib/uploadToBucket.ts
import { authFetch } from "./api";

/**
 * Uploads a file to a Supabase Storage bucket via the backend.
 *
 * The backend is responsible for talking to Supabase Storage using
 * its service-role key. The browser never holds that key and never
 * calls Supabase Storage directly.
 *
 * @param bucket - Storage bucket name (whitelisted on the backend)
 * @param file   - The File selected by the user
 * @returns      - The public URL of the uploaded file
 */
export async function uploadToBucket(
  bucket: string,
  file: File,
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("bucket", bucket);

  const result = await authFetch("/api/media/upload", {
    method: "POST",
    body: formData,
  });

  if (!result?.url) {
    throw new Error("Upload failed: no URL returned from server");
  }

  return result.url as string;
}