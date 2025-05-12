import { jwtDecode } from "jwt-decode";

import type { TokenDTO } from "@/shared/api/auth/auth.interface";

type IsValidToken = {
  [K in keyof TokenDTO as `is${Capitalize<string & K>}Valid`]: boolean;
};

export const isValidToken = ({ accessToken, refreshToken }: TokenDTO): IsValidToken => {
  const currentTime = Math.floor(Date.now() / 1000);

  const result: IsValidToken = {
    isAccessTokenValid: false,
    isRefreshTokenValid: false,
  };

  try {
    const accessTokenPayload = jwtDecode<{ exp: number }>(accessToken);
    result.isAccessTokenValid = accessTokenPayload.exp > currentTime;
  } catch {
    result.isAccessTokenValid = false;
  }

  try {
    const refreshTokenPayload = jwtDecode<{ exp: number }>(refreshToken);
    result.isRefreshTokenValid = refreshTokenPayload.exp > currentTime;
  } catch {
    result.isRefreshTokenValid = false;
  }

  return result;
};
