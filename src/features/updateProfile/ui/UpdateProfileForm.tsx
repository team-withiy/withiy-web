"use client";

import { startTransition } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import type { UserDTO } from "@/entities/user/api/user.interface";
import ThumbnailInput, { LoadingThumbnailInput } from "@/entities/user/ui/ThumbnailInput";

import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import Button from "@/shared/ui/Button/Button";
import Input from "@/shared/ui/Input";
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

interface Props {
  me: UserDTO;
}

const UpdateProfileForm: React.FC<Props> = ({ me }) => {
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

  const onSubmit: SubmitHandler<ProfileSchema> = async (data) => {
    startTransition(async () => {
      const errorMessage = await updateProfileAction(data);
      if (errorMessage) {
        addToast({ message: errorMessage, state: "danger" });
      } else replace("/my-page");
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
          disabled={isSubmitting || !isValid}
          data-testid="submit-button"
        >
          프로필 저장하기
        </Button>
      </BottomFloatingButtonWrapper>
    </form>
  );
};

export default UpdateProfileForm;

export const LoadingUpdateProfileForm = () => {
  return (
    <div className={styles.wrapper} data-testid="loading-update-profile-form">
      <LoadingThumbnailInput className={styles.thumbnailInput} />
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
