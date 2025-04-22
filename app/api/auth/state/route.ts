import { NextResponse } from "next/server";

import { randomBytes } from "crypto";

import { OAUTH_STATE_COOKIE_NAME } from "@/entities/auth/constants/cookies";

import { setCookie } from "@/shared/lib/cookies";

export interface OAuthStateResponse {
  state: string;
}

// MEMO: oauth 로그인 이전 state 생성 후 cookies에 저장
export async function POST() {
  const state = randomBytes(32).toString("hex");
  await setCookie(OAUTH_STATE_COOKIE_NAME, state);
  return NextResponse.json<OAuthStateResponse>({ state });
}
