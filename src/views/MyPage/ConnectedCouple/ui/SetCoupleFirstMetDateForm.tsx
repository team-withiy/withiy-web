"use client";

import { FormEventHandler, startTransition, useActionState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";

import { userQueries } from "@/entities/user/api/user.queries";
import { hasUserCouple } from "@/entities/user/models/hasCouple";

import { FormActionState, FormActionStatus } from "@/shared/api/common.interface";
import { dayjs, formatDate } from "@/shared/lib/date";
import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import Button from "@/shared/ui/Button/Button";
import DatePicker from "@/shared/ui/DatePicker";
import SSRSafeSuspense from "@/shared/ui/Suspense/SSRSafeSuspense";
import { useToast } from "@/shared/ui/Toast";

import { setFirstMetDateAction } from "../api/actions";

import styles from "./SetCoupleFirstMetDateForm.module.scss";

const SetCoupleFirstMetDateForm: React.FC = () => {
  const { data, refetch } = useSuspenseQuery(userQueries.getMe);
  const me = data.data;
  const firstMetDate = hasUserCouple(me) ? me.couple.firstMetDate : null;

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
      refetch().then(() => back());
    }
  }, [addToast, back, refetch, state]);

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
            filterEnableDates={(date) => dayjs(date).isBefore(dayjs().add(1, "day"), "date")}
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

const LoadingSetCoupleFirstMetDateForm: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Skeleton />
      <BottomFloatingButtonWrapper>
        <Button type="submit" full size={52} variant="default" disabled>
          커플 정보 저장하기
        </Button>
      </BottomFloatingButtonWrapper>
    </div>
  );
};

export default SSRSafeSuspense.with(SetCoupleFirstMetDateForm, {
  fallback: <LoadingSetCoupleFirstMetDateForm />,
});
