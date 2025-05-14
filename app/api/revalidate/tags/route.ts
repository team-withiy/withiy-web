import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const tags = request.nextUrl.searchParams.get("tags");

  if (typeof tags === "string") revalidateTag(tags);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
