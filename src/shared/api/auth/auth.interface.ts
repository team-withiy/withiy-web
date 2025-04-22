export interface TokenDTO {
  accessToken: string;
  refreshToken: string;
}

export type SocialType = "kakao" | "google" | "naver";
