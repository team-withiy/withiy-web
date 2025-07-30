import type { ActiveCoupleDTO, RestorableCoupleDTO } from "@/entities/couple/api/@x/user";
import type { TermAgreementDTO } from "@/entities/term/api/@x/user";

export interface BaseUserDTO {
  nickname: string;
  thumbnail: string;
  /** 계정 복구 가능 여부 */
  restoreEnabled: boolean;
  /** 회원가입 여부 */
  isRegistered: boolean;
  /** 커플 연결 코드 */
  code: string;
}

export type UserWithActiveCoupleDTO = BaseUserDTO & {
  hasCouple: true;
  hasRestorableCouple: false;
  couple: ActiveCoupleDTO;
};

export type UserWithRestorableCoupleDTO = BaseUserDTO & {
  hasCouple: false;
  hasRestorableCouple: true;
  restorableCouple: RestorableCoupleDTO;
};

export type UserWithoutRestorableCoupleDTO = BaseUserDTO & {
  hasCouple: false;
  hasRestorableCouple: false;
};

export type UserDTO = UserWithActiveCoupleDTO | UserWithRestorableCoupleDTO | UserWithoutRestorableCoupleDTO;

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

export interface NotificationSettingRequestDTO {
  dateNotificationEnabled: boolean;
  eventNotificationEnabled: boolean;
}

export interface UserNotificationSettingResponseDTO extends NotificationSettingRequestDTO {
  userId: number;
}
