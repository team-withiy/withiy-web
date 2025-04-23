export interface TermDTO {
  id: number;
  title: string;
  content: string[];
  required: boolean;
}

export interface TermAgreementDTO {
  term: TermDTO;
  agreed: boolean;
}
