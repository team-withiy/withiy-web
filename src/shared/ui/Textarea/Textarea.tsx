"use client";

import type { ChangeEventHandler, ComponentProps } from "react";

import cx from "clsx";

import styles from "./Textarea.module.scss";

type LabelText = 16 | 14;

interface Props extends ComponentProps<"textarea"> {
  label?: string;
  textareaClassName?: string;
  labelText?: LabelText;
}

const LABEL_SIZE_MAPPER: Record<LabelText, string> = {
  16: styles.large,
  14: styles.medium,
};

const Textarea: React.FC<Props> = ({
  label,
  labelText = 14,
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
      {label && <span className={(styles.label, LABEL_SIZE_MAPPER[labelText])}>{label}</span>}
      <div className={styles.textareaWrapper}>
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
      </div>
    </label>
  );
};

export default Textarea;
