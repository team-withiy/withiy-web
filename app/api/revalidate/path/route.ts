import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  const type = request.nextUrl.searchParams.get("type");

  if (typeof path === "string" && typeof type === "string" && ["layout", "page"].includes(type))
    revalidatePath(path, type as "layout" | "page");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
