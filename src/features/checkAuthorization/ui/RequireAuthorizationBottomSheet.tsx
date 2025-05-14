"use client";

import Link from "next/link";

import BaseBottomSheet from "@/shared/ui/BaseBottomSheet";
import Button from "@/shared/ui/Button/Button";

import styles from "./RequireAuthorizationBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose: () => void;
}

const RequireAuthorizationBottomSheet: React.FC<Props> = ({ isShow, onClose }) => {
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
      <Link href="/auth" className={styles.link}>
        <Button size={52} variant="default" full type="button" data-testid="login-button">
          지금 할게요
        </Button>
      </Link>
      <Button type="button" size={52} variant="text" full onClick={onClose} data-testid="close-button">
        나중에 할게요
      </Button>
    </BaseBottomSheet>
  );
};

export default RequireAuthorizationBottomSheet;
