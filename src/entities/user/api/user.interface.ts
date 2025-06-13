import type { TermAgreementDTO } from "@/entities/term/api/@x/user";

export interface UserDTO {
  nickname: string;
  thumbnail: string;
  /** 계정 복구 가능 여부 */
  restoreEnabled: boolean;
  /** 회원가입 여부 */
  isRegistered: boolean;
  /** 커플 연결 코드 */
  code: string;
  hasCouple: boolean;
}

export interface RestoreAccountDTO {
  restore: boolean;
}

export interface RegisterUserInDTO {
  termAgreements: TermAgreementDTO;
  nickname: string;
}

export interface UserProfileResponseDTO {
  userCode: string;
  nickname: string;
  profileImageUrl: string;
  hasCouple: boolean;
}
