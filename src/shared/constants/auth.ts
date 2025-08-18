import type { ErrorDTO } from "@/shared/api/common.interface";

export const UNAUTHORIZED_STATUS = 401;
export const UNAUTHORIZED_MESSAGE = "Unauthorized access. Please log in again.";
export const FORBIDDEN_STATUS = 403;
export const FORBIDDEN_MESSAGE = "You do not have permission to access this resource.";
export const NOT_FOUND_STATUS = 404;

export const RECENT_LOGINED_SOCIAL_TYPE_EXPIRES_MS = 365 * 24 * 60 * 60 * 1000;

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

export const DEFAULT_AUTH_CALLBACK_URL = HOME_PAGE_ENDPOINT;
