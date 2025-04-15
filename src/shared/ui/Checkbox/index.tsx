"use client";

import type { ComponentProps } from "react";

import cx from "clsx";

import { IconCheckbox20, IconCheckbox24 } from "public/icons";

import styles from "./Checkbox.module.scss";

type Size = 24 | 20;

interface Props extends Omit<ComponentProps<"input">, "size"> {
  size: Size;
}

const SIZE_MAPPER: Record<Size, string> = {
  24: styles.large,
  20: styles.medium,
};

const Checkbox: React.FC<Props> = ({ size, children, ...props }) => {
  return (
    <label className={cx(styles.wrapper, SIZE_MAPPER[size])} data-testid="checkbox-wrapper">
      <input type="checkbox" className={styles.checkbox} data-testid="checkbox-input" {...props} hidden />
      <div className={styles.box}>
        {size === 24 && <IconCheckbox24 className={styles.check} />}
        {size === 20 && <IconCheckbox20 className={styles.check} />}
      </div>
      {children}
    </label>
  );
};

export default Checkbox;
