export interface UserDTO {
  nickname: string;
  thumbnail: string;
  /** 계정 복구 가능 여부 */
  restoreEnabled: boolean;
  isRegistered: boolean;
}
