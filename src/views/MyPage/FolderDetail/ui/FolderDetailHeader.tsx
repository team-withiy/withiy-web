"use client";

import BackButton from "@/shared/ui/BackButton";

import { IconArrowLeft24, IconEllipsisVertical20 } from "public/icons";

import styles from "./FolderDetailHeader.module.scss";

const FolderDetailHeader: React.FC = () => {
  return (
    <header className={styles.wrapper}>
      <BackButton className={styles.backButton}>
        <IconArrowLeft24 />
      </BackButton>
      <button type="button" className={styles.menuButton} aria-label="메뉴 열기">
        <IconEllipsisVertical20 />
      </button>
    </header>
  );
};

export default FolderDetailHeader;
