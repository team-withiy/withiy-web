"use client";

import { useTransition } from "react";

import { josa } from "es-hangul";

import useAlert from "@/shared/ui/Alert/useAlert";
import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import Button from "@/shared/ui/Button/Button";
import { useToast } from "@/shared/ui/Toast";

import { cancelRestoreCoupleAction, restoreCoupleAction } from "../api/actions";

interface Props {
  partnerNickname: string;
}

const RestoreUserButton: React.FC<Props> = ({ partnerNickname }) => {
  const { showAlert, closeAlert } = useAlert();
  const { addToast } = useToast();

  const [isPending, startTransition] = useTransition();

  const onClickButton = () => {
    showAlert({
      uiType: "twoButton",
      title: "기존 계정을 찾았어요!",
      content: `이전에 ${josa(partnerNickname, "와/과")} 함께한 기록이 있어요\n복구하면 소중한 순간들이 유지돼요!`,
      confirmText: "복구할게요",
      cancelText: "새롭게 시작할게요",
      onCancel: () => {
        closeAlert();
        startTransition(async () => {
          const errorMessage = await cancelRestoreCoupleAction();
          addToast({ message: errorMessage, state: "danger" });
        });
      },
      onConfirm: () => {
        closeAlert();
        startTransition(async () => {
          const errorMessage = await restoreCoupleAction();
          addToast({ message: errorMessage, state: "danger" });
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
