import React, { memo, type MouseEventHandler } from "react";

import cx from "clsx";

import styles from "./Overlay.module.scss";

interface Props {
  onClose?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  hidden?: boolean;
}

const Overlay: React.FC<Props> = ({ onClose, className, hidden }) => {
  return (
    <button
      tabIndex={0}
      aria-label="overlay"
      className={cx(styles.wrapper, className, { [styles.hidden]: hidden })}
      onClick={onClose}
      data-testid="overlay"
    />
  );
};

export default memo(Overlay);
