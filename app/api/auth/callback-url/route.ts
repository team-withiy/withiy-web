import { NextRequest, NextResponse } from "next/server";

import type { AuthCallbackUrlResponse } from "@/shared/api/auth/auth.interface";
import { DEFAULT_AUTH_CALLBACK_URL } from "@/shared/constants/auth";
import { AUTH_CALLBACK_URL_KEY } from "@/shared/constants/storage";
import { getCookie, setCookie } from "@/shared/lib/cookies";

export async function GET() {
  const callbackUrl = (await getCookie(AUTH_CALLBACK_URL_KEY)) || DEFAULT_AUTH_CALLBACK_URL;
  return NextResponse.json({ callbackUrl });
}

export async function POST(request: NextRequest) {
  const { callbackUrl } = await request.json<AuthCallbackUrlResponse>();
  await setCookie(AUTH_CALLBACK_URL_KEY, callbackUrl);
  return NextResponse.json({ callbackUrl });
}

export async function DELETE() {
  const response = NextResponse.json({});
  response.cookies.delete(AUTH_CALLBACK_URL_KEY);

  return response;
}
