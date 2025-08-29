"use client";

import type { ComponentProps } from "react";

import cx from "clsx";

import styles from "./UnderlineInput.module.scss";

interface Props extends ComponentProps<"input"> {
  label?: string;
  errorMessage?: string;
  successMessage?: string | boolean;
  inputClassName?: string;
}

const UnderlineInput: React.FC<Props> = ({
  label,
  type,
  inputMode,
  className,
  errorMessage,
  successMessage,
  inputClassName,
  ...props
}) => {
  console.assert(!!type, "Input type is required");
  console.assert(!!inputMode, "InputMode is required");

  return (
    <label
      className={cx(styles.wrapper, className, {
        [styles.error]: !!errorMessage,
        [styles.success]: !!successMessage,
      })}
      data-testid="underline-input-wrapper"
    >
      {label && <span className={cx(styles.label)}>{label}</span>}
      <input
        type={type}
        inputMode={inputMode}
        className={cx(styles.input, inputClassName)}
        data-testid="underline-input"
        {...props}
      />
      {!successMessage && errorMessage && (
        <span data-testid="underline-input-error-message" className={styles.errorMessage}>
          {errorMessage}
        </span>
      )}
      {successMessage && !errorMessage && (
        <span data-testid="underline-input-success-message" className={styles.successMessage}>
          {successMessage}
        </span>
      )}
    </label>
  );
};

export default UnderlineInput;
