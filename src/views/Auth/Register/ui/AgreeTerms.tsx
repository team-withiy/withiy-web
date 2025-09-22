"use client";

import React, { useId, useState } from "react";

import { range } from "lodash-es";
import { SubmitHandler, useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";

import type { TermAgreementDTO, TermDTO } from "@/entities/term/api/term.interface";

import Accordion from "@/shared/ui/Accordion";
import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import Button from "@/shared/ui/Button/Button";
import Checkbox from "@/shared/ui/Checkbox";

import styles from "./AgreeTerms.module.scss";

const REQUIRED_TEXT_MAPPER = {
  true: "(필수)",
  false: "(선택)",
};

interface Props {
  terms: TermDTO[];
  defaultTermAgreements: TermAgreementDTO;
  onClickNext: (data: TermAgreementDTO) => void;
}

const AgreeTerms: React.FC<Props> = ({ terms, defaultTermAgreements, onClickNext }) => {
  const totalAgreeId = useId();

  const [openedTermId, setOpenedTermId] = useState<number | null>(null);

  const defaultValues = terms.reduce((acc, term) => {
    if (!(term.id in defaultTermAgreements)) {
      return { ...acc, [term.id]: false };
    }
    return { ...acc, [term.id]: defaultTermAgreements[term.id] };
  }, {});

  const { register, handleSubmit, watch, setValue } = useForm<TermAgreementDTO>({
    mode: "onTouched",
    defaultValues,
  });

  const watchAllFields = watch();
  const isAllChecked = Object.values(watchAllFields).every((value) => value === true);
  const isRequiredFieldAllChecked = Object.entries(watchAllFields).reduce((acc, [agreeId, value]) => {
    const term = terms.find((term) => term.id.toString() === agreeId);
    if (term?.required && !value) return false;
    return acc;
  }, true);

  const onChangeTotalAgree = () => {
    if (isAllChecked) terms.forEach((term) => setValue(term.id.toString(), false));
    else terms.forEach((term) => setValue(term.id.toString(), true));
  };

  const onSubmit: SubmitHandler<TermAgreementDTO> = (data) => {
    if (!isRequiredFieldAllChecked) return;
    onClickNext(data);
  };

  return (
    <form className={styles.wrapper} data-testid="agree-terms" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor={totalAgreeId} className={styles.totalAgree} data-testid="total-agree">
        <Checkbox
          id={totalAgreeId}
          size={24}
          className={styles.totalAgreeCheckbox}
          data-testid="total-agree-checkbox"
          checked={isAllChecked}
          onChange={onChangeTotalAgree}
        >
          전체 동의
        </Checkbox>
      </label>
      {terms.map((term) => (
        <Accordion
          key={term.id}
          isShow={term.id === openedTermId}
          onClickButton={() => setOpenedTermId((prev) => (prev === term.id ? null : term.id))}
          summary={
            <Checkbox
              size={24}
              data-testid={`term-${term.id}-checkbox`}
              className={styles.termCheckbox}
              {...register(term.id.toString())}
            >
              <p>
                <span className={styles.required}>{REQUIRED_TEXT_MAPPER[term.required ? "true" : "false"]}</span>
                {term.title}
              </p>
            </Checkbox>
          }
          details={
            <ul className={styles.details}>
              {term.content.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          }
        />
      ))}
      <BottomFloatingButtonWrapper>
        <Button
          size={52}
          variant="default"
          type="submit"
          full
          disabled={!isRequiredFieldAllChecked}
          data-testid="agree-terms-submit-button"
        >
          동의하고 계속하기
        </Button>
      </BottomFloatingButtonWrapper>
    </form>
  );
};

const LoadingAgreeTerms: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.totalAgree}>
        <Checkbox size={24} className={styles.totalAgreeCheckbox} data-testid="total-agree-checkbox" disabled>
          전체 동의
        </Checkbox>
      </div>
      {range(5).map((value) => (
        <Accordion isShow={false} onClickButton={() => {}} summary={<Skeleton width={200} />} key={value} />
      ))}
    </div>
  );
};

export default Object.assign(AgreeTerms, {
  Loading: LoadingAgreeTerms,
});
