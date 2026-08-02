const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ohyorhfnwqqwiopecedj.supabase.co';

export function supabaseImage(bucket: string, path: string): string {
  if (!path) return '';
  // If it's already a full URL (like Unsplash), return as-is
  if (path.startsWith('http')) return path;
  // Otherwise, build the Supabase storage URL
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}