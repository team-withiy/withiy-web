import { type NextRequest, NextResponse } from "next/server";

import type { RecentLoginedSocialTypeResponse, SocialType } from "@/shared/api/auth/auth.interface";
import { RECENT_LOGINED_SOCIAL_TYPE_EXPIRES_MS, SOCIAL_TYPE } from "@/shared/constants/auth";
import { RECENT_LOGINED_SOCIAL_TYPE_KEY } from "@/shared/constants/storage";
import { getCookie, setCookie } from "@/shared/lib/cookies";

export async function GET() {
  const recentLoginedSocialType = await getCookie(RECENT_LOGINED_SOCIAL_TYPE_KEY);
  if (!recentLoginedSocialType || !SOCIAL_TYPE.includes(recentLoginedSocialType)) {
    return NextResponse.json<RecentLoginedSocialTypeResponse>({
      socialType: null,
    });
  } else {
    return NextResponse.json<RecentLoginedSocialTypeResponse>({ socialType: recentLoginedSocialType as SocialType });
  }
}

export async function POST(request: NextRequest) {
  const { socialType } = await request.json<RecentLoginedSocialTypeResponse>();
  await setCookie(RECENT_LOGINED_SOCIAL_TYPE_KEY, socialType as SocialType, {
    expires: new Date(Date.now() + RECENT_LOGINED_SOCIAL_TYPE_EXPIRES_MS),
  });
  return NextResponse.json<RecentLoginedSocialTypeResponse>({ socialType });
}
