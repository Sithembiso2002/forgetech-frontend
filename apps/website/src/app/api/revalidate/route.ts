// apps/website/src/app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type RevalidateBody = {
  tag?: string;
  path?: string;
};

export async function POST(req: NextRequest) {
  // 1. Auth check — unchanged
  const secret = req.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Parse body safely
  const body = (await req.json().catch(() => ({}))) as RevalidateBody;

  // 3. Invalidate tag (Next.js 16: second argument is REQUIRED)
  if (body.tag) {
    revalidateTag(body.tag, "max");
  }

  // 4. Invalidate path (type argument is required for dynamic routes)
  if (body.path) {
    revalidatePath(body.path, "page");
  }

  return NextResponse.json({
    revalidated: true,
    tag: body.tag ?? null,
    path: body.path ?? null,
    now: Date.now(),
  });
}