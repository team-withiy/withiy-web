"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import useLogout from "@/entities/user/hooks/useLogout";

import { isFetchHTTPError } from "@/shared/models/auth/fetchHTTPException";
import useAlert from "@/shared/ui/Alert/useAlert";
import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import Button from "@/shared/ui/Button/Button";
import { useToast } from "@/shared/ui/Toast";

import { withdrawAction } from "../api/actions";

const WithdrawButton: React.FC = () => {
  const { replace } = useRouter();
  const { logout } = useLogout();
  const { showAlert, closeAlert } = useAlert();
  const { addToast } = useToast();

  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    showAlert({
      uiType: "twoButton",
      title: "정말 탈퇴하시겠어요?",
      content: "위디에서 기록한 추억들이 전부 사라져요",
      confirmText: "탈퇴할게요",
      cancelText: "다시 생각해볼게요",
      onCancel: closeAlert,
      onConfirm: () => {
        closeAlert();
        startTransition(async () => {
          try {
            await withdrawAction();
            await logout();
            replace("/");
          } catch (error) {
            const errorMessage = isFetchHTTPError(error) ? error.message : "알 수 없는 오류가 발생했습니다.";
            addToast({ message: errorMessage, state: "danger" });
          }
        });
      },
    });
  };

  return (
    <BottomFloatingButtonWrapper>
      <Button
        size={52}
        variant="default"
        disabled={isPending}
        full
        type="button"
        onClick={onClick}
        data-testid="withdraw-button"
      >
        위디 탈퇴하기
      </Button>
    </BottomFloatingButtonWrapper>
  );
};

export default WithdrawButton;
