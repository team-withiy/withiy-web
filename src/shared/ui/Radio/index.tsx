"use client";

import { ComponentProps } from "react";

import cx from "clsx";

import styles from "./Radio.module.scss";

type Size = 24 | 20;

interface Props extends Omit<ComponentProps<"input">, "size"> {
  size: Size;
}

const SIZE_MAPPER: Record<Size, string> = {
  24: styles.large,
  20: styles.medium,
};

const Radio: React.FC<Props> = ({ size, className, children, ...props }) => {
  return (
    <label className={cx(styles.wrapper, SIZE_MAPPER[size], className)} data-testid="radio-wrapper">
      <div className={styles.box} data-testid="radio-box">
        <input type="radio" hidden {...props} data-testid="radio" />
      </div>
      {children}
    </label>
  );
};

export default Radio;
