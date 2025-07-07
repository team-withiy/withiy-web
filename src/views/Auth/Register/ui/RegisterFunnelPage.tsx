"use client";

import { Suspense, useState } from "react";

import type { TermAgreementDTO, TermDTO } from "@/entities/term/api/term.interface";

import type { ApiResponseDTO } from "@/shared/api/common.interface";

import ProfilePage from "./ProfilePage";
import TermPage, { LoadingTermPage } from "./TermPage";

type Tab = "terms" | "profile";

interface Props {
  termPromise: Promise<ApiResponseDTO<TermDTO[]>>;
}

const RegisterFunnelPage: React.FC<Props> = ({ termPromise }) => {
  const [tab, setTab] = useState<Tab>("terms");
  const [termAgreements, setTermAgreements] = useState<TermAgreementDTO>({});

  const onClickNextButtonInAgreeTerms = (data: TermAgreementDTO) => {
    setTab("profile");
    setTermAgreements(data);
  };

  const onClickPrevButtonInProfile = () => {
    setTab("terms");
  };

  return (
    <>
      {tab === "terms" && (
        <Suspense fallback={<LoadingTermPage />}>
          <TermPage
            termPromise={termPromise}
            defaultTermAgreements={termAgreements}
            onClickNext={onClickNextButtonInAgreeTerms}
          />
        </Suspense>
      )}
      {tab === "profile" && <ProfilePage termAgreements={termAgreements} onClickPrev={onClickPrevButtonInProfile} />}
    </>
  );
};

export default RegisterFunnelPage;
