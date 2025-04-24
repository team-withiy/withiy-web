import type { ErrorDTO } from "@/shared/api/common.interface";

export const UNAUTHORIZED_STATUS = 401;

export const SERVER_AUTH_ERROR: ErrorDTO = {
  status: UNAUTHORIZED_STATUS,
  timestamp: new Date(),
  message: "Access Denied",
};

export const SOCIAL_TYPE = ["kakao", "google", "naver"] as const;

export const RESTORE_PAGE_ENDPOINT = "/users/restore";
export const REGISTER_PAGE_ENDPOINT = "/auth/register";
export const LOGIN_PAGE_ENDPOINT = "/auth";
export const HOME_PAGE_ENDPOINT = "/";
