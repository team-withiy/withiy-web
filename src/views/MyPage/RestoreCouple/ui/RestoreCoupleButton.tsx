"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { useSuspenseQuery } from "@tanstack/react-query";
import { josa } from "es-hangul";

import { userQueries } from "@/entities/user/api/user.queries";
import { hasUserRestorableCouple } from "@/entities/user/models/hasCouple";

import { isFetchHTTPError } from "@/shared/models/auth/fetchHTTPException";
import useAlert from "@/shared/ui/Alert/useAlert";
import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import Button from "@/shared/ui/Button/Button";
import SSRSafeSuspense from "@/shared/ui/Suspense/SSRSafeSuspense";
import { useToast } from "@/shared/ui/Toast";

import { cancelRestoreCoupleAction, restoreCoupleAction } from "../api/actions";

const RestoreUserButton: React.FC = () => {
  const router = useRouter();
  const { data, refetch } = useSuspenseQuery(userQueries.getMe);
  const { showAlert, closeAlert } = useAlert();
  const { addToast } = useToast();

  const partnerNickname = hasUserRestorableCouple(data.data) ? data.data.restorableCouple.partnerNickname : "";

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
          try {
            await cancelRestoreCoupleAction();
            await refetch();
            router.replace("/my-page/couples/unconnected");
          } catch (error) {
            const errorMessage = isFetchHTTPError(error) ? error.message : "새롭게 시작 중 오류가 발생했습니다.";
            addToast({ message: errorMessage, state: "danger" });
          }
        });
      },
      onConfirm: () => {
        closeAlert();
        startTransition(async () => {
          try {
            await restoreCoupleAction();
            await refetch();
            router.replace("/my-page/couples/unconnected/restore/complete");
          } catch (error) {
            const errorMessage = isFetchHTTPError(error) ? error.message : "복구 중 오류가 발생했습니다.";
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

const LoadingRestoreUserButton: React.FC = () => {
  return (
    <BottomFloatingButtonWrapper>
      <Button type="button" size={52} variant="default" full disabled>
        계정 복구하러 가기
      </Button>
    </BottomFloatingButtonWrapper>
  );
};

export default SSRSafeSuspense.with(RestoreUserButton, {
  fallback: <LoadingRestoreUserButton />,
});
