import { SOCIAL_TYPE } from "@/shared/constants/auth";

export interface TokenDTO {
  accessToken: string;
  refreshToken: string;
}

export type SocialType = (typeof SOCIAL_TYPE)[number];

export interface RecentLoginedSocialTypeResponse {
  socialType: SocialType | null;
}

export interface AuthCallbackUrlResponse {
  callbackUrl: string;
}
