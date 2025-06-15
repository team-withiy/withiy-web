"use client";

import { useDatePickerContext } from "./DatePickerContext";
import Button from "../Button/Button";

import styles from "./DatePickerFooter.module.scss";

const DatePickerFooter: React.FC = () => {
  const { onCancel, onConfirm, localSelectedDate } = useDatePickerContext();

  return (
    <footer className={styles.wrapper} data-testid="date-picker-footer">
      <Button size={36} variant="text" type="button" onClick={onCancel} data-testid="data-picker-cancel">
        취소
      </Button>
      <Button
        size={36}
        variant="default"
        type="button"
        onClick={onConfirm}
        disabled={!localSelectedDate}
        data-testid="data-picker-confirm"
      >
        확인
      </Button>
    </footer>
  );
};

export default DatePickerFooter;
