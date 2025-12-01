"use client";

import BackButton from "@/shared/ui/BackButton";

import { IconArrowLeft24 } from "public/icons";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.wrapper} data-testid="header">
      <BackButton className={styles.backButton}>
        <IconArrowLeft24 />
      </BackButton>
      <h2 className={styles.title} data-testid="header-title">
        신고
      </h2>
      <div className={styles.empty} />
    </header>
  );
};

export default Header;
