"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useCreatePlaceReportMutation } from "@/features/createPlaceReport/api/createPlaceReport.mutations";

import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import Button from "@/shared/ui/Button/Button";
import Textarea from "@/shared/ui/Textarea";

import styles from "./ReportForm.module.scss";

interface Props {
  placeId: number;
}

type ReportFormData = {
  problemType: "PHOTO" | "PLACE" | null;
  contents: string;
};

const ReportForm: React.FC<Props> = ({ placeId }) => {
  const { mutate } = useCreatePlaceReportMutation();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isValid },
  } = useForm<ReportFormData>({
    defaultValues: {
      problemType: null,
      contents: "",
    },
    mode: "onChange",
  });

  const problemType = watch("problemType");

  const onSubmit: SubmitHandler<ReportFormData> = (data) => {
    if (!data.problemType) {
      return;
    }

    const reportData =
      data.problemType === "PHOTO"
        ? { target: "PHOTO" as const, reason: "PHOTO_INAPPROPRIATE" as const, contents: data.contents }
        : { target: "PLACE" as const, reason: "PLACE_INACCURATE" as const, contents: data.contents };

    mutate({ ...reportData, targetId: placeId });
  };

  return (
    <>
      <form id="report-form" className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.questionSection}>
          <span className={styles.label}>어떤 문제가 있나요?</span>
          <div className={styles.optionsWrapper}>
            <Controller
              name="problemType"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <Button
                    type="button"
                    variant="filledGray"
                    size={36}
                    className={`${styles.optionButton} ${problemType === "PHOTO" && styles.selected}`}
                    onClick={() => field.onChange("PHOTO")}
                  >
                    현재 사진에 문제가 있어요
                  </Button>
                  <Button
                    type="button"
                    variant="filledGray"
                    size={36}
                    className={`${styles.optionButton} ${problemType === "PLACE" && styles.selected}`}
                    onClick={() => field.onChange("PLACE")}
                  >
                    장소 내용이 정확하지 않아요
                  </Button>
                </>
              )}
            />
          </div>
        </div>
        <Textarea
          className={styles.textArea}
          label="어떤 점이 실제와 달랐나요?"
          labelSize={16}
          placeholder="직접 다녀온 내용과 다른 부분이 있다면 편하게 알려주세요."
          maxLength={200}
          rows={5}
          {...register("contents")}
          value={watch("contents")}
        />
      </form>
      <BottomFloatingButtonWrapper hasTwoButtons>
        <Button type="submit" form="report-form" size={52} variant="default" full disabled={!isValid || !problemType}>
          신고하기
        </Button>
      </BottomFloatingButtonWrapper>
    </>
  );
};

export default ReportForm;
