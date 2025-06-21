"use client";

import BaseBottomSheet from "@/shared/ui/BaseBottomSheet";
import Button from "@/shared/ui/Button/Button";

import { useSetCallbackUrlMutation } from "../api/checkAuthorization.mutations";

import styles from "./RequireCoupleAuthorizationBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose: () => void;
  callbackUrl: string;
}

const RequireCoupleAuthorizationBottomSheet: React.FC<Props> = ({ isShow, onClose, callbackUrl }) => {
  const { mutate } = useSetCallbackUrlMutation("/couples/invite");

  const onClick = () => {
    mutate(callbackUrl);
  };

  return (
    <BaseBottomSheet
      isShow={isShow}
      onClose={onClose}
      className={styles.wrapper}
      data-testid="require-couple-authorization-bottom-sheet"
      data-is-show={isShow}
    >
      <h2 className={styles.title}>커플 연동 후 사용할 수 있어요</h2>
      <p className={styles.description}>둘만의 이야기를 기록해보세요! 💖</p>
      <Button
        size={52}
        variant="default"
        full
        onClick={onClick}
        type="button"
        data-testid="connect-couple-button"
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

export default RequireCoupleAuthorizationBottomSheet;
