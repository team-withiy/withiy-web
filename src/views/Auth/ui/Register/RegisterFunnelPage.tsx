"use client";

import { Suspense, useState } from "react";

import type { TermAgreementDTO, TermDTO } from "@/entities/term/api/term.interface";
import type { RegisterUserInDTO } from "@/entities/user/api/user.interface";

import type { ApiResponseDTO } from "@/shared/api/common.interface";

import TermPage, { LoadingTermPage } from "./TermPage";

type Tab = "terms" | "profile";

interface Props {
  termPromise: Promise<ApiResponseDTO<TermDTO[]>>;
}

const RegisterFunnelPage: React.FC<Props> = ({ termPromise }) => {
  const [tab, setTab] = useState<Tab>("terms");
  const [form, setForm] = useState<RegisterUserInDTO>({ nickname: "", termAgreements: {} });

  const onClickNextButtonInAgreeTerms = (data: TermAgreementDTO) => {
    setTab("profile");
    setForm((prev) => ({ ...prev, termAgreements: data }));
  };

  return (
    <>
      {tab === "terms" && (
        <Suspense fallback={<LoadingTermPage />}>
          <TermPage
            termPromise={termPromise}
            defaultTermAgreements={form.termAgreements}
            onClickNext={onClickNextButtonInAgreeTerms}
          />
        </Suspense>
      )}
    </>
  );
};

export default RegisterFunnelPage;
