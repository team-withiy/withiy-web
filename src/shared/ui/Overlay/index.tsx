import React, { memo, type MouseEventHandler } from "react";

import cx from "clsx";

import styles from "./Overlay.module.scss";

interface Props {
  onClose?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const Overlay: React.FC<Props> = ({ onClose, className }) => {
  return (
    <button
      tabIndex={0}
      aria-label="overlay"
      className={cx(styles.wrapper, className)}
      onClick={onClose}
      data-testid="overlay"
    />
  );
};

export default memo(Overlay);
