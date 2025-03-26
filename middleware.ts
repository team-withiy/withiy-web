import { NextResponse } from "next/server";

// TODO: apply authorization check
export async function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!mockServiceWorker.js).*)"],
};
