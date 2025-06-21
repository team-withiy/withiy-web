"use client";

import { FormEventHandler, startTransition, useActionState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { Controller, useForm } from "react-hook-form";

import { FormActionState, FormActionStatus } from "@/shared/api/common.interface";
import { dayjs, formatDate } from "@/shared/lib/date";
import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import Button from "@/shared/ui/Button/Button";
import DatePicker from "@/shared/ui/DatePicker";
import { useToast } from "@/shared/ui/Toast";

import { setFirstMetDateAction } from "../api/actions";

import styles from "./SetCoupleFirstMetDateForm.module.scss";

interface Props {
  firstMetDate: string | null;
}

// TODO: 테스트 코드
const SetCoupleFirstMetDateForm: React.FC<Props> = ({ firstMetDate }) => {
  const { addToast } = useToast();
  const { back } = useRouter();

  const [state, formAction] = useActionState<FormActionState, FormData>(setFirstMetDateAction, {
    status: FormActionStatus.Default,
  });

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      firstMetDate: firstMetDate ? dayjs(firstMetDate) : null,
    },
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    handleSubmit(() => {
      startTransition(() => {
        const values = getValues();
        const formData = new FormData();
        if (values.firstMetDate) formData.append("firstMetDate", formatDate(values.firstMetDate, "YYYY-MM-DD"));
        formAction(formData);
      });
    })(e);
  };

  useEffect(() => {
    if (state.status === FormActionStatus.Error) {
      addToast({ message: state.message, state: "danger" });
    }
    if (state.status === FormActionStatus.Success) {
      back();
    }
  }, [addToast, back, state]);

  return (
    <form onSubmit={onSubmit} data-testid="set-couple-first-met-date-form" className={styles.wrapper}>
      <Controller
        control={control}
        name="firstMetDate"
        render={({ field }) => (
          <DatePicker
            full
            label="처음 사랑하게 된 날"
            placeholder="YYYY.MM.DD"
            onDateChange={field.onChange}
            selectedDate={field.value}
          />
        )}
      />
      <BottomFloatingButtonWrapper>
        <Button type="submit" full size={52} variant="default" data-testid="set-couple-first-met-date-button">
          커플 정보 저장하기
        </Button>
      </BottomFloatingButtonWrapper>
    </form>
  );
};

export default SetCoupleFirstMetDateForm;
