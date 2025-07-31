import { NextRequest, NextResponse } from "next/server";

import { TokenDTO } from "@/shared/api/auth/auth.interface";
import { getServerTokens, setServerTokens } from "@/shared/models/auth/token";

export async function GET() {
  const { accessToken, refreshToken } = await getServerTokens();
  return NextResponse.json({ accessToken, refreshToken });
}

export async function POST(request: NextRequest) {
  const { accessToken, refreshToken } = await request.json<TokenDTO>();
  await setServerTokens({ accessToken, refreshToken });
  return NextResponse.json({});
}
