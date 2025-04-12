"use client";

import { type ReactNode, useCallback, useRef } from "react";

import cx from "clsx";
import { useClickAway } from "react-use";

import { IconChevronDown } from "public/icons/chevron";

import styles from "./Select.module.scss";

type Size = 52;

type LabelSize = 16 | 14;

interface Props {
  isShow: boolean;
  children: ReactNode;
  label?: string;
  labelSize?: LabelSize;
  size: Size;
  disabled?: boolean;
  items: ReactNode[];
  buttonClassName?: string;
  wrapperClassName?: string;
  menuClassName?: string;
  errorMessage?: string;
  isPlaceholder: boolean;
  onOpen: () => void;
  onClose: () => void;
  onBlur?: () => void;
}

const SIZE_MAPPER: Record<Size, string> = {
  52: styles.large,
};

const LABEL_SIZE_MAPPER: Record<LabelSize, string> = {
  16: styles.large,
  14: styles.medium,
};

const Select: React.FC<Props> = ({
  isShow,
  menuClassName,
  wrapperClassName,
  buttonClassName,
  children,
  label,
  labelSize = 14,
  disabled,
  size,
  isPlaceholder,
  errorMessage,
  items,
  onOpen,
  onClose: onCloseProps,
  onBlur,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const onClose = useCallback(() => {
    onCloseProps();
    onBlur?.();
  }, [onBlur, onCloseProps]);

  useClickAway(
    ref,
    useCallback(() => {
      if (isShow) onClose();
    }, [isShow, onClose]),
  );

  return (
    <div
      className={cx(styles.wrapper, wrapperClassName, { [styles.error]: !!errorMessage })}
      ref={ref}
      data-testid="select-wrapper"
    >
      {label && (
        <label className={cx(styles.label, LABEL_SIZE_MAPPER[labelSize])} data-testid="label">
          {label}
        </label>
      )}
      <button
        type="button"
        data-testid="select-button"
        className={cx(styles.button, buttonClassName, SIZE_MAPPER[size], { [styles.isShow]: isShow })}
        disabled={disabled}
        onClick={isShow ? onClose : onOpen}
      >
        <span className={cx(styles.buttonText, { [styles.placeholder]: isPlaceholder })} data-testid="button-text">
          {children}
        </span>
        <IconChevronDown className={styles.chevron} />
      </button>
      {items.length > 0 && (
        <menu className={cx(styles.menu, menuClassName, { [styles.isShow]: isShow })} data-testid="menu">
          {items}
        </menu>
      )}
      {errorMessage && (
        <span className={styles.errorMessage} data-testid="errorMessage">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default Select;
