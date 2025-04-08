"use client";

import type { ComponentProps } from "react";

import cx from "clsx";

import styles from "./Input.module.scss";

type Size = 52;

interface Props extends Omit<ComponentProps<"input">, "size"> {
  size: Size;
  errorMessage?: string;
  inputClassName?: string;
}

const SIZE_MAPPER: Record<Size, string> = {
  52: styles.large,
};

const Input: React.FC<Props> = ({ type, inputMode, size, className, errorMessage, inputClassName, ...props }) => {
  console.assert(!!type, "Input type is required");
  console.assert(!!size, "InputMode is required");

  return (
    <label className={cx(styles.wrapper, className)} data-testid="input-wrapper">
      <input
        type={type}
        inputMode={inputMode}
        className={cx(styles.input, inputClassName, SIZE_MAPPER[size], { [styles.error]: !!errorMessage })}
        data-testid="input"
        {...props}
      />
      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </label>
  );
};

export default Input;
