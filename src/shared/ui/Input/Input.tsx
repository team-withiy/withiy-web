"use client";

import type { ComponentProps } from "react";

import cx from "clsx";

import styles from "./Input.module.scss";

type Size = 52;

type LabelText = 16 | 14;

interface Props extends Omit<ComponentProps<"input">, "size"> {
  label?: string;
  labelText?: LabelText;
  size: Size;
  errorMessage?: string;
  successMessage?: string | boolean;
  inputClassName?: string;
}

const SIZE_MAPPER: Record<Size, string> = {
  52: styles.large,
};

const LABEL_SIZE_MAPPER: Record<LabelText, string> = {
  16: styles.large,
  14: styles.medium,
};

const Input: React.FC<Props> = ({
  label,
  type,
  inputMode,
  size,
  className,
  labelText = 14,
  errorMessage,
  successMessage,
  inputClassName,
  ...props
}) => {
  console.assert(!!type, "Input type is required");
  console.assert(!!size, "InputMode is required");

  return (
    <label
      className={cx(styles.wrapper, className, {
        [styles.error]: !!errorMessage,
        [styles.success]: !!successMessage,
      })}
      data-testid="input-wrapper"
    >
      {label && <span className={cx(styles.label, LABEL_SIZE_MAPPER[labelText])}>{label}</span>}
      <input
        type={type}
        inputMode={inputMode}
        className={cx(styles.input, inputClassName, SIZE_MAPPER[size])}
        data-testid="input"
        {...props}
      />
      {!successMessage && errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
      {successMessage && !errorMessage && <span className={styles.successMessage}>{successMessage}</span>}
    </label>
  );
};

export default Input;
