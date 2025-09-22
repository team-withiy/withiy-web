"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { userQueries } from "@/entities/user/api/user.queries";
import ThumbnailInput from "@/entities/user/ui/ThumbnailInput";

import { isFetchHTTPError } from "@/shared/models/auth/fetchHTTPException";
import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import Button from "@/shared/ui/Button/Button";
import Input from "@/shared/ui/Input/Input";
import SSRSafeSuspense from "@/shared/ui/Suspense/SSRSafeSuspense";
import { useToast } from "@/shared/ui/Toast";

import { updateProfileAction } from "../api/actions";

import styles from "./UpdateProfileForm.module.scss";

const profileSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: "닉네임을 입력해주세요" })
    .max(15, { message: "15자 이내로 입력해주세요" })
    .regex(/^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]*$/, {
      message: "한글, 숫자, 영어만 사용할 수 있어요",
    }),
  thumbnail: z.instanceof(File).optional(),
});

type ProfileSchema = z.infer<typeof profileSchema>;

const UpdateProfileForm: React.FC = () => {
  const { data, refetch } = useSuspenseQuery(userQueries.getMe);
  const me = data.data;
  const [isPending, startTransition] = useTransition();
  const { addToast } = useToast();
  const { replace } = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields, isSubmitting, isValid },
  } = useForm<ProfileSchema>({
    mode: "onTouched",
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nickname: me.nickname,
      thumbnail: undefined,
    },
  });

  const onSubmit: SubmitHandler<ProfileSchema> = (data) => {
    startTransition(async () => {
      try {
        await updateProfileAction(data);
        await refetch();
        replace("/my-page");
      } catch (error) {
        const errorMessage = isFetchHTTPError(error) ? error.message : "프로필 업데이트에 실패했어요.";
        addToast({ message: errorMessage, state: "danger" });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper} data-testid="update-profile-form">
      <Controller
        control={control}
        name="thumbnail"
        render={({ field }) => (
          <ThumbnailInput
            defaultValue={me.thumbnail}
            file={field.value}
            className={styles.thumbnailInput}
            onDrop={(acceptedFiles) => field.onChange(acceptedFiles[0])}
            data-testid="thumbnail-input"
          />
        )}
      />
      <Input
        label="닉네임"
        type="text"
        inputMode="text"
        labelSize={16}
        size={52}
        className={styles.input}
        placeholder="위디에서 사용할 닉네임을 입력해주세요"
        errorMessage={errors.nickname?.message}
        successMessage={!errors.nickname?.message && !!dirtyFields.nickname && "멋진 닉네임이에요!"}
        data-testid="nickname-input"
        {...register("nickname")}
      />
      <BottomFloatingButtonWrapper data-testid="bottom-wrapper">
        <Button
          size={52}
          variant="default"
          full
          type="submit"
          disabled={isPending || isSubmitting || !isValid}
          data-testid="submit-button"
        >
          프로필 저장하기
        </Button>
      </BottomFloatingButtonWrapper>
    </form>
  );
};

const LoadingUpdateProfileForm = () => {
  return (
    <div className={styles.wrapper} data-testid="loading-update-profile-form">
      <ThumbnailInput.Loading className={styles.thumbnailInput} />
      <Input
        label="닉네임"
        type="text"
        inputMode="text"
        labelSize={16}
        size={52}
        className={styles.input}
        placeholder="위디에서 사용할 닉네임을 입력해주세요"
        disabled
      />
    </div>
  );
};

export default SSRSafeSuspense.with(UpdateProfileForm, {
  fallback: <LoadingUpdateProfileForm />,
});
