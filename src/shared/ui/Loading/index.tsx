"use client";

import cx from "clsx";

import styles from "./Loading.module.scss";

interface Props {
  isShow: boolean;
}

const Loading: React.FC<Props> = ({ isShow }) => {
  if (!isShow) return null;

  return (
    <div className={styles.wrapper} aria-label="로딩 중..." data-testid="loading">
      <span className={cx(styles.dot, styles.first)} data-testid="loading-dot-first" />
      <span className={cx(styles.dot, styles.second)} data-testid="loading-dot-second" />
      <span className={cx(styles.dot, styles.third)} data-testid="loading-dot-third" />
    </div>
  );
};

export default Loading;
