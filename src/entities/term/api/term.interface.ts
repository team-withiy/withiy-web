export interface TermDTO {
  id: number;
  title: string;
  content: string[];
  required: boolean;
}

export type TermAgreementDTO = Record<string, boolean>;
