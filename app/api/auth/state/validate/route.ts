import { type NextRequest, NextResponse } from "next/server";

import { OAUTH_STATE_COOKIE_NAME } from "@/entities/auth/constants/cookies";

import { getCookie } from "@/shared/lib/cookies";

export interface OAuthStateValidateParams {
  state: string;
}

export interface OAuthStateValidateResponse {
  isValid: boolean;
}

// MEMO: oauth 로그인 이후 state validation을 위한 API
export async function GET(request: NextRequest) {
  const state = request.nextUrl.searchParams.get("state");
  const prevState = await getCookie(OAUTH_STATE_COOKIE_NAME);

  if (!state || state !== prevState) {
    return (
      NextResponse.json<OAuthStateValidateResponse>({ isValid: false }),
      {
        status: 400,
      }
    );
  } else return NextResponse.json<OAuthStateValidateResponse>({ isValid: true }, { status: 200 });
}
