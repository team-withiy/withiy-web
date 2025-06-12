"use client";

import { PropsWithChildren } from "react";

import cx from "clsx";

import styles from "./BottomFloatingButtonWrapper.module.scss";

interface Props {
  className?: string;
  hasTwoButtons?: boolean;
}

const BottomFloatingButtonWrapper: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
  hasTwoButtons = false,
}) => {
  return (
    <footer
      className={cx(styles.wrapper, className, { [styles.hasTwoButtons]: hasTwoButtons })}
      data-testid="bottom-floating-button-wrapper"
    >
      {children}
    </footer>
  );
};

export default BottomFloatingButtonWrapper;
