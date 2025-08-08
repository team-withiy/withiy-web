"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useCopyToClipboard } from "react-use";

import { userQueries } from "@/entities/user/api/user.queries";

import BottomFloatingButtonWrapper from "@/shared/ui/BottomFloatingButtonWrapper";
import Button from "@/shared/ui/Button/Button";
import SSRSafeSuspense from "@/shared/ui/Suspense/SSRSafeSuspense";
import { useToast } from "@/shared/ui/Toast";

import { generateCoupleLink } from "../model/coupleLink";

const CopyCoupleLinkButton: React.FC = () => {
  const { addToast } = useToast();
  const { data } = useSuspenseQuery(userQueries.getMe);
  const [state, copyToClipboard] = useCopyToClipboard();

  const onClick = () => {
    const coupleLink = generateCoupleLink(data.data.code);
    copyToClipboard(coupleLink);

    if (state.error) addToast({ message: "앗, 복사에 실패했어요. 다시 한 번만 눌러주세요!", state: "danger" });
    else addToast({ message: "우리만의 연결 링크를 복사했어요.", state: "success" });
  };

  return (
    <BottomFloatingButtonWrapper>
      <Button size={52} variant="default" full type="button" onClick={onClick} data-testid="copy-couple-link-button">
        커플 링크 복사하기
      </Button>
    </BottomFloatingButtonWrapper>
  );
};

export const LoadingCopyCoupleLinkButton: React.FC = () => {
  return (
    <BottomFloatingButtonWrapper>
      <Button type="button" size={52} variant="default" full disabled data-testid="loading-copy-couple-link-button">
        커플 링크 복사하기
      </Button>
    </BottomFloatingButtonWrapper>
  );
};

export default SSRSafeSuspense.with(CopyCoupleLinkButton, {
  fallback: <LoadingCopyCoupleLinkButton />,
});
