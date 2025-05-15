import { NextRequest, NextResponse } from "next/server";

import { postServer } from "@/shared/api/apiServer";
import { TokenDTO } from "@/shared/api/auth/auth.interface";
import { ApiResponseDTO } from "@/shared/api/common.interface";
import { COOKIE_OPTIONS } from "@/shared/constants/cookies";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/shared/constants/storage";
import { PromiseHolder } from "@/shared/lib/promiseHolder";
import { getServerTokens } from "@/shared/models/auth/token";
import { getTokenExpirationDate, isValidToken } from "@/shared/models/auth/validateToken";

const promiseHolder = new PromiseHolder();

export async function middleware(request: NextRequest) {
  const { accessToken, refreshToken } = await getServerTokens();
  if (!accessToken || !refreshToken) return NextResponse.next();

  try {
    const { isAccessTokenValid, isRefreshTokenValid } = isValidToken({
      accessToken,
      refreshToken,
    });

    if (isAccessTokenValid) {
      return NextResponse.next();
    }

    if (!isAccessTokenValid && isRefreshTokenValid) {
      if (promiseHolder.isLocked) {
        await promiseHolder.promise;
        return NextResponse.next();
      }

      promiseHolder.hold();

      const { data } = await postServer("/auth/refresh", {
        body: { refreshToken },
      }).then((res) => res.json<ApiResponseDTO<TokenDTO>>());

      const response = NextResponse.redirect(request.nextUrl);
      response.cookies.set(ACCESS_TOKEN_KEY, data.accessToken, {
        ...COOKIE_OPTIONS,
        expires: getTokenExpirationDate(data.accessToken),
      });
      response.cookies.set(REFRESH_TOKEN_KEY, data.refreshToken, {
        ...COOKIE_OPTIONS,
        expires: getTokenExpirationDate(data.refreshToken),
      });

      promiseHolder.successRelease();
      return response;
    } else if (!isAccessTokenValid && !isRefreshTokenValid) {
      throw new Error("액세스 토큰과 리프레시 토큰 모두 유효하지 않음");
    }

    return NextResponse.next();
  } catch {
    if (promiseHolder.isLocked) {
      promiseHolder.failRelease();
    }
    const response = NextResponse.redirect(new URL("/auth", request.url));
    response.cookies.delete(ACCESS_TOKEN_KEY);
    response.cookies.delete(REFRESH_TOKEN_KEY);
    return response;
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)", "/(.*)"],
};
