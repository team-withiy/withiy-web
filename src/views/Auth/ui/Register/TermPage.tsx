"use client";

import React, { use } from "react";

import Header from "@/widgets/Layout/ui/Header";

import AgreeTerms, { LoadingAgreeTerms } from "@/features/agreeTerms/ui";

import type { TermAgreementDTO, TermDTO } from "@/entities/term/api/term.interface";

import type { ApiResponseDTO } from "@/shared/api/common.interface";

import styles from "./TermPage.module.scss";

interface Props {
  termPromise: Promise<ApiResponseDTO<TermDTO[]>>;
  defaultTermAgreements: TermAgreementDTO;
  onClickNext: (data: TermAgreementDTO) => void;
}

const TermPage: React.FC<Props> = ({ termPromise, defaultTermAgreements, onClickNext }) => {
  const terms = use(termPromise);

  return (
    <main className={styles.wrapper}>
      <Header className={styles.header}>
        <h1 className={styles.title}>이용약관 동의</h1>
      </Header>
      <AgreeTerms terms={terms.data} defaultTermAgreements={defaultTermAgreements} onClickNext={onClickNext} />
    </main>
  );
};

export default TermPage;

export const LoadingTermPage: React.FC = () => {
  return (
    <main className={styles.wrapper}>
      <Header className={styles.header}>
        <h1 className={styles.title}>이용약관 동의</h1>
      </Header>
      <LoadingAgreeTerms />
    </main>
  );
};
