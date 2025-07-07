"use client";

import { Suspense, useState } from "react";

import type { TermAgreementDTO, TermDTO } from "@/entities/term/api/term.interface";
import type { UserDTO } from "@/entities/user/api/user.interface";

import type { ApiResponseDTO } from "@/shared/api/common.interface";

import ProfilePage from "./ProfilePage";
import TermPage, { LoadingTermPage } from "./TermPage";

type Tab = "terms" | "profile";

interface Props {
  termPromise: Promise<ApiResponseDTO<TermDTO[]>>;
  mePromise: Promise<ApiResponseDTO<UserDTO>>;
}

const RegisterFunnelPage: React.FC<Props> = ({ termPromise, mePromise }) => {
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
      {tab === "profile" && (
        <ProfilePage termAgreements={termAgreements} onClickPrev={onClickPrevButtonInProfile} mePromise={mePromise} />
      )}
    </>
  );
};

export default RegisterFunnelPage;
