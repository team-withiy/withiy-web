import { jwtDecode } from "jwt-decode";

import type { TokenDTO } from "@/shared/api/auth/auth.interface";

export const getTokenExpirationDate = (token: string): Date => {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    return new Date(decoded.exp * 1000);
  } catch {
    return new Date(0);
  }
};

type IsValidToken = {
  [K in keyof TokenDTO as `is${Capitalize<string & K>}Valid`]: boolean;
};

export const isValidToken = ({ accessToken, refreshToken }: TokenDTO): IsValidToken => {
  const currentTime = new Date();
  return {
    isAccessTokenValid: getTokenExpirationDate(accessToken) > currentTime,
    isRefreshTokenValid: getTokenExpirationDate(refreshToken) > currentTime,
  };
};
