"use client";

import { useTransition } from "react";

import useAlert from "@/shared/ui/Alert/useAlert";
import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import Button from "@/shared/ui/Button/Button";
import { useToast } from "@/shared/ui/Toast";

import { cancelRestoreAction, restoreAction } from "../api/actions";

const RestoreUserButton: React.FC = () => {
  const { showAlert, closeAlert } = useAlert();
  const { addToast } = useToast();

  const [isPending, startTransition] = useTransition();

  const onClickButton = () => {
    showAlert({
      uiType: "twoButton",
      title: "기존 계정을 찾았어요!",
      content: "이전에 닉네임과 함께한 기록이 있어요\n복구하면 소중한 순간들이 유지돼요!",
      confirmText: "복구할게요",
      cancelText: "새롭게 시작할게요",
      onCancel: () => {
        closeAlert();
        startTransition(async () => {
          const message = await cancelRestoreAction();
          addToast({ message, state: "danger" });
        });
      },
      onConfirm: () => {
        closeAlert();
        startTransition(async () => {
          const message = await restoreAction();
          addToast({ message, state: "danger" });
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
