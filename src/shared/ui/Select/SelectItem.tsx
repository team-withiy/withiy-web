"use client";

import type { MouseEventHandler, ReactNode } from "react";

import cx from "clsx";

import { IconCheckMedium } from "public/icons/check";

import styles from "./SelectItem.module.scss";

interface Props {
  isSelected?: boolean;
  children: ReactNode;
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const SelectItem: React.FC<Props> = ({ children, onClick, isSelected, className }) => {
  return (
    <li className={cx(styles.wrapper, className)}>
      <button type="button" className={styles.button} onClick={onClick}>
        {isSelected && <IconCheckMedium />}
        <span className={cx(styles.text, { [styles.selected]: isSelected })}>{children}</span>
      </button>
    </li>
  );
};

export default SelectItem;
