export interface CoupleDTO {
  /** 커플 고유 ID */
  id: number;
  /** 파트너 닉네임 */
  partnerNickname: string;
  /** 파트너 프로필 이미지 */
  partnerThumbnail: string;
  /** 처음 만난 날짜 */
  firstMetDate: Date;
  /** 연결된 날짜 */
  connectedDate: Date;
}

export interface CoupleConnectionRequestDTO {
  /** 상대방 유저 고유 코드 */
  partnerCode: string;
  /** 처음 만난 날짜 ( YYYY-MM-DD ) */
  firstMetDate?: string;
}
