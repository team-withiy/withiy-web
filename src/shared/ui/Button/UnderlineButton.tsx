"use client";

import type { ComponentProps } from "react";

import cx from "clsx";

import styles from "./UnderlineButton.module.scss";

type Size = 24 | 20 | 16;

interface Props extends ComponentProps<"button"> {
  size: Size;
}

const SIZE_MAPPER: Record<Size, string> = {
  24: styles.large,
  20: styles.medium,
  16: styles.small,
};

const UnderlineButton: React.FC<Props> = ({ size, type, className, ...props }) => {
  console.assert(!!type, "Button type is required");

  return (
    <button
      type={type}
      data-testid="underlineButton"
      className={cx(styles.wrapper, SIZE_MAPPER[size], className)}
      {...props}
    />
  );
};

export default UnderlineButton;
