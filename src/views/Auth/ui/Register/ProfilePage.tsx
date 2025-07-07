"use client";

import { startTransition } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import Header from "@/widgets/Layout/ui/Header";

import type { TermAgreementDTO } from "@/entities/term/api/term.interface";
import ThumbnailInput from "@/entities/user/ui/ThumbnailInput";

import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import Button from "@/shared/ui/Button/Button";
import Input from "@/shared/ui/Input";
import { useToast } from "@/shared/ui/Toast";

import { registerAction } from "../../api/actions";
import { IconArrowLeft24 } from "public/icons";

import styles from "./ProfilePage.module.scss";

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
  termAgreements: TermAgreementDTO;
  onClickPrev: () => void;
}

const ProfilePage: React.FC<Props> = ({ termAgreements, onClickPrev }) => {
  const { addToast } = useToast();
  const { replace } = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitting, isValid },
  } = useForm<ProfileSchema>({
    mode: "onTouched",
    resolver: zodResolver(profileSchema),
  });

  const onSubmit: SubmitHandler<ProfileSchema> = (data) => {
    startTransition(async () => {
      const errorMessage = await registerAction({ termAgreements, ...data });
      if (errorMessage) {
        addToast({ message: errorMessage, state: "danger" });
      } else replace("/couples/invite");
    });
  };

  return (
    <main className={styles.wrapper}>
      <Header className={styles.header}>
        <button type="button" className={styles.backButton} onClick={onClickPrev} aria-label="뒤로가기">
          <IconArrowLeft24 />
        </button>
        <h1 className={styles.title} data-testid="profile-title">
          프로필 설정
        </h1>
      </Header>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} data-testid="profile-form">
        <Controller
          control={control}
          name="thumbnail"
          render={({ field }) => (
            <ThumbnailInput
              file={field.value}
              className={styles.thumbnailInput}
              onDrop={(acceptedFiles) => field.onChange(acceptedFiles[0])}
              data-testid="thumbnail-input"
            />
          )}
        />
        <Input
          className={styles.input}
          data-testid="nickname-input"
          label="닉네임"
          type="text"
          inputMode="text"
          labelSize={16}
          size={52}
          placeholder="위디에서 사용할 닉네임을 입력해주세요"
          errorMessage={errors.nickname?.message}
          successMessage={!errors.nickname?.message && !!dirtyFields.nickname && "멋진 닉네임이에요!"}
          {...register("nickname")}
        />
        <BottomFloatingButtonWrapper>
          <Button
            size={52}
            variant="default"
            full
            type="submit"
            disabled={isSubmitting || !isValid}
            data-testid="profile-submit-button"
          >
            프로필 만들기
          </Button>
        </BottomFloatingButtonWrapper>
      </form>
    </main>
  );
};

export default ProfilePage;
