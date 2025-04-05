"use client";

import type { ComponentProps } from "react";

import cx from "clsx";

import styles from "./Button.module.scss";

type Variant = "default" | "filledGray" | "outline" | "text";
type Size = 52 | 44 | 36;

interface Props extends ComponentProps<"button"> {
  variant: Variant;
  full?: boolean;
  size: Size;
}

const SIZE_MAPPER: Record<Size, string> = {
  52: styles.large,
  44: styles.medium,
  36: styles.small,
};

const Button: React.FC<Props> = ({ variant, size, type, full, className, ...props }) => {
  console.assert(!!type, "Button type is required");

  return (
    <button
      type={type}
      data-testid="button"
      className={cx(styles.wrapper, styles[variant], SIZE_MAPPER[size], { [styles.full]: full }, className)}
      {...props}
    />
  );
};

export default Button;
