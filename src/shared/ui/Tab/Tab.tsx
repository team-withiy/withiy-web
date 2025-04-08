"use client";

import { ComponentProps } from "react";

import cx from "clsx";

import styles from "./Tab.module.scss";

interface Props extends Omit<ComponentProps<"input">, "type"> {}

const Tab: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <label className={cx(styles.wrapper, className)} aria-label="tab" data-testid="tab">
      {children}
      <input type="checkbox" data-testid="input" {...props} />
    </label>
  );
};

export default Tab;
