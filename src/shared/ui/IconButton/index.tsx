"use client";

import type { ComponentProps, ReactNode } from "react";

import cx from "clsx";

import styles from "./IconButton.module.scss";

type Variant = "outline" | "primary";

interface Props extends ComponentProps<"button"> {
  icon: ReactNode;
  variant: Variant;
}

const IconButton: React.FC<Props> = ({ icon, variant, type, className, children, ...props }) => {
  console.assert(!!type, "IconButton type is required");

  return (
    <button type={type} data-testid="icon-button" className={cx(styles.wrapper, styles[variant], className)} {...props}>
      {icon}
      {children}
    </button>
  );
};

export default IconButton;
