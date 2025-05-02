export interface UserDTO {
  nickname: string;
  thumbnail: string;
  /** 계정 복구 가능 여부 */
  restoreEnabled: boolean;
  /** 회원가입 여부 */
  isRegistered: boolean;
  /** 커플 연결 코드 */
  code: string;
}
