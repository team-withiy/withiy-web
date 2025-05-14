"use client";

import type { CSSProperties, ReactNode } from "react";

import cx from "clsx";

import styles from "./Tooltip.module.scss";

interface Props {
  children: ReactNode;
  tooltipContent?: ReactNode;
  leftPositionBasedOnTail?: CSSProperties["left"];
  className?: string;
  tooltipClassName?: string;
  isHidden?: boolean;
}

const Tooltip: React.FC<Props> = ({
  children,
  leftPositionBasedOnTail = 0,
  tooltipContent,
  className,
  tooltipClassName,
  isHidden = false,
}) => {
  return (
    <div className={cx(styles.wrapper, className)} data-testid="tooltip">
      {children}
      {!isHidden && (
        <div
          className={cx(styles.tooltip, tooltipClassName)}
          role="tooltip"
          style={{ left: leftPositionBasedOnTail }}
          data-testid="tooltip-content"
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
