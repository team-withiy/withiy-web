"use client";

import BaseBottomSheet from "@/shared/ui/BaseBottomSheet";
import Button from "@/shared/ui/Button/Button";

import { useSetCallbackUrlMutation } from "../api/checkAuthorization.mutations";

import styles from "./RequireAuthorizationBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose: () => void;
  callbackUrl: string;
}

const RequireAuthorizationBottomSheet: React.FC<Props> = ({ isShow, onClose, callbackUrl }) => {
  const { mutate } = useSetCallbackUrlMutation();

  const onClick = () => {
    mutate(callbackUrl);
  };

  return (
    <BaseBottomSheet
      isShow={isShow}
      onClose={onClose}
      className={styles.wrapper}
      data-testid="require-authorization-bottom-sheet"
      data-is-show={isShow}
    >
      <h2 className={styles.title}>이 순간을 함께 기록해볼까요?</h2>
      <p className={styles.description}>로그인하고 우리의 추억을 저장해보세요!</p>
      <Button
        size={52}
        variant="default"
        full
        onClick={onClick}
        type="button"
        data-testid="login-button"
        className={styles.confirmButton}
      >
        지금 할게요
      </Button>
      <Button type="button" size={52} variant="text" full onClick={onClose} data-testid="close-button">
        나중에 할게요
      </Button>
    </BaseBottomSheet>
  );
};

export default RequireAuthorizationBottomSheet;
