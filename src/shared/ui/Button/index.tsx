"use client";

import { ComponentProps } from "react";

import styles from "./Button.module.scss";

interface Props extends ComponentProps<"button"> {}

const Button: React.FC<Props> = ({ ...props }) => {
  return (
    <button type="button" data-testid="this-is-button" className={styles.wrapper} {...props}>
      BUTTON
    </button>
  );
};

export default Button;
