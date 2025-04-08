"use client";

import type { ChangeEventHandler, ComponentProps } from "react";

import cx from "clsx";

import styles from "./Textarea.module.scss";

interface Props extends ComponentProps<"textarea"> {
  textareaClassName?: string;
}

const Textarea: React.FC<Props> = ({
  maxLength,
  className,
  value,
  textareaClassName,
  onChange,
  rows = 5,
  ...props
}) => {
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (maxLength && e.currentTarget.value?.length > maxLength) return;
    onChange?.(e);
  };

  return (
    <label className={cx(styles.wrapper, className)} data-testid="textarea-wrapper">
      <textarea
        data-testid="textarea"
        className={cx(styles.textarea, textareaClassName)}
        onChange={handleChange}
        rows={rows}
        maxLength={maxLength}
        {...props}
      />
      {!!maxLength && (
        <span className={styles.maxLength} data-testid="max-length">
          <span className={styles.currentLength} data-testid="current-length">
            {value?.toString()?.length}
          </span>
          /{maxLength}
        </span>
      )}
    </label>
  );
};

export default Textarea;
