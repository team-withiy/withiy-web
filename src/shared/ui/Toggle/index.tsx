"use client";

import { ComponentProps } from "react";

import styles from "./Toggle.module.scss";

interface Props extends Omit<ComponentProps<"input">, "hidden" | "type"> {}

const Toggle: React.FC<Props> = ({ className, ...props }) => {
  return (
    <label className={styles.wrapper} data-testid="toggle">
      <input type="checkbox" data-testid="toggle-input" hidden {...props} />
      <div className={styles.slider} data-testid="toggle-slider" />
    </label>
  );
};

export default Toggle;
