"use client";

import { useTransition } from "react";

import useAlert from "@/shared/ui/Alert/useAlert";
import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import Button from "@/shared/ui/Button/Button";
import { useToast } from "@/shared/ui/Toast";

import { breakupCoupleAction } from "../api/actions";

const BreakupCoupleButton: React.FC = () => {
  const { showAlert, closeAlert } = useAlert();
  const { addToast } = useToast();

  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    showAlert({
      uiType: "twoButton",
      title: "커플 연결을 끊으실건가요?",
      content: "돌아갈 수 있는 마지막 기회에요",
      confirmText: "끊을게요",
      cancelText: "다시 생각해볼게요",
      onCancel: closeAlert,
      onConfirm: () => {
        closeAlert();
        startTransition(async () => {
          const errorMessage = await breakupCoupleAction();
          addToast({ message: errorMessage, state: "danger" });
        });
      },
    });
  };

  return (
    <BottomFloatingButtonWrapper>
      <Button size={52} variant="default" disabled={isPending} full type="button" onClick={onClick}>
        커플 연결 끊기
      </Button>
    </BottomFloatingButtonWrapper>
  );
};

export default BreakupCoupleButton;
