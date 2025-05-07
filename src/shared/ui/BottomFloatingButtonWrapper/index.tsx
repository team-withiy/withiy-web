"use client";

import { PropsWithChildren } from "react";

import cx from "clsx";

import styles from "./BottomFloatingButtonWrapper.module.scss";

interface Props {
  className?: string;
}

const BottomFloatingButtonWrapper: React.FC<PropsWithChildren<Props>> = ({ children, className }) => {
  return (
    <footer className={cx(styles.wrapper, className)} data-testid="bottom-floating-button-wrapper">
      {children}
    </footer>
  );
};

export default BottomFloatingButtonWrapper;
