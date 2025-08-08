"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";

import { userQueries } from "@/entities/user/api/user.queries";

import { isFetchHTTPError } from "@/shared/models/auth/fetchHTTPException";
import useAlert from "@/shared/ui/Alert/useAlert";
import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import Button from "@/shared/ui/Button/Button";
import { useToast } from "@/shared/ui/Toast";

import { cancelRestoreAction, restoreAction } from "../api/actions";

const RestoreUserButton: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { showAlert, closeAlert } = useAlert();
  const { addToast } = useToast();

  const [isPending, startTransition] = useTransition();

  const onClickButton = () => {
    showAlert({
      uiType: "twoButton",
      title: "기존 계정을 찾았어요!",
      content: "복구하면 소중한 순간들이 유지돼요!",
      confirmText: "복구할게요",
      cancelText: "새롭게 시작할게요",
      onCancel: () => {
        closeAlert();
        startTransition(async () => {
          try {
            await cancelRestoreAction();
            await queryClient.invalidateQueries(userQueries.getMe);
            router.replace("/auth/register");
          } catch (error) {
            const errorMessage = isFetchHTTPError(error) ? error.message : "복구 취소 중 오류가 발생했어요.";
            addToast({ message: errorMessage, state: "danger" });
          }
        });
      },
      onConfirm: () => {
        closeAlert();
        startTransition(async () => {
          try {
            await restoreAction();
            await queryClient.invalidateQueries(userQueries.getMe);
            router.replace("/");
          } catch (error) {
            const errorMessage = isFetchHTTPError(error) ? error.message : "복구 중 오류가 발생했어요.";
            addToast({ message: errorMessage, state: "danger" });
          }
        });
      },
    });
  };

  return (
    <BottomFloatingButtonWrapper>
      <Button type="button" size={52} variant="default" full onClick={onClickButton} disabled={isPending}>
        계정 복구하러 가기
      </Button>
    </BottomFloatingButtonWrapper>
  );
};

export default RestoreUserButton;
