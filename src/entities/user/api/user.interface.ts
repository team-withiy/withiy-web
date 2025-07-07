import type { CoupleDTO } from "@/entities/couple/api/@x/user";
import type { TermAgreementDTO } from "@/entities/term/api/@x/user";

export type UserWithCoupleDTO = {
  nickname: string;
  thumbnail: string;
  /** 계정 복구 가능 여부 */
  restoreEnabled: boolean;
  /** 회원가입 여부 */
  isRegistered: boolean;
  /** 커플 연결 코드 */
  code: string;
  hasCouple: true;
  couple: CoupleDTO;
};

export type UserWithoutCoupleDTO = {
  nickname: string;
  thumbnail: string;
  /** 계정 복구 가능 여부 */
  restoreEnabled: boolean;
  /** 회원가입 여부 */
  isRegistered: boolean;
  /** 커플 연결 코드 */
  code: string;
  hasCouple: false;
};

export type UserDTO = UserWithCoupleDTO | UserWithoutCoupleDTO;

export interface RestoreAccountDTO {
  restore: boolean;
}

export interface RegisterUserInDTO {
  termAgreements: TermAgreementDTO;
  nickname: string;
  thumbnail?: string;
}

export interface UserProfileResponseDTO {
  userCode: string;
  nickname: string;
  profileImageUrl: string;
  hasCouple: boolean;
}

export interface ProfileUpdateDTO {
  nickname: string;
  thumbnail?: string;
}

export interface ProfileResponseDTO extends Required<ProfileUpdateDTO> {}
