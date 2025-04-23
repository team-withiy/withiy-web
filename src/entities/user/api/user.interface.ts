import type { TermAgreementDTO } from "@/entities/term/api/@x/user";

export interface UserDTO {
  nickname: string;
  thumbnail: string;
  termAgreement: TermAgreementDTO;
}
