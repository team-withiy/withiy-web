"use client";

import { FormEventHandler, startTransition, useActionState, useEffect } from "react";

import { Controller, useForm } from "react-hook-form";

import { FormActionState, FormActionStatus } from "@/shared/api/common.interface";
import { dayjs, formatDate } from "@/shared/lib/date";
import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import Button from "@/shared/ui/Button/Button";
import DatePicker from "@/shared/ui/DatePicker";
import { useToast } from "@/shared/ui/Toast";

import { connectCoupleAction } from "../api/actions";

interface Props {
  partnerCode: string;
}

const ConnectCoupleForm: React.FC<Props> = ({ partnerCode }) => {
  const { addToast } = useToast();

  const [state, formAction] = useActionState<FormActionState, FormData>(connectCoupleAction, {
    status: FormActionStatus.Default,
  });

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      firstMetDate: null,
      partnerCode,
    },
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    handleSubmit(() => {
      startTransition(() => {
        const values = getValues();
        const formData = new FormData();
        formData.append("partnerCode", values.partnerCode);
        if (values.firstMetDate) formData.append("firstMetDate", formatDate(values.firstMetDate, "YYYY-MM-DD"));
        formAction(formData);
      });
    })(e);
  };

  useEffect(() => {
    if (state.status === FormActionStatus.Error) {
      addToast({ message: state.message, state: "danger" });
    }
  }, [addToast, state]);

  return (
    <form onSubmit={onSubmit} data-testid="connect-couple-form">
      <Controller
        control={control}
        name="firstMetDate"
        render={({ field }) => (
          <DatePicker
            label="처음 사랑하게 된 날"
            placeholder="YYYY.MM.DD"
            filterEnableDates={(date) => dayjs(date).isBefore(dayjs().add(1, "day"), "date")}
            onDateChange={field.onChange}
            selectedDate={field.value}
          />
        )}
      />
      <BottomFloatingButtonWrapper>
        <Button type="submit" full size={52} variant="default" data-testid="connect-couple-button">
          커플 정보 저장하기
        </Button>
      </BottomFloatingButtonWrapper>
    </form>
  );
};

export default ConnectCoupleForm;
