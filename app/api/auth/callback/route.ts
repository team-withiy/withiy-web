import { type NextRequest, NextResponse } from "next/server";

import { TokenDTO } from "@/shared/api/auth/auth.interface";
import { setServerTokens } from "@/shared/models/auth/token";

export async function POST(request: NextRequest) {
  const searchParams = new URLSearchParams(request.nextUrl.search);
  const [accessToken, refreshToken] = [searchParams.get("accessToken"), searchParams.get("refreshToken")];
  if (!accessToken || !refreshToken) return NextResponse.json({ accessToken: null, refreshToken: null });

  await setServerTokens({ accessToken, refreshToken });

  return NextResponse.json<TokenDTO>({ accessToken, refreshToken });
}
