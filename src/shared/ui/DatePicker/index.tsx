"use client";

import { useState } from "react";

import cx from "clsx";

import { DATE_FORMAT } from "@/shared/constants/date";
import { formatDate } from "@/shared/lib/date";

import { type OnDateChange, type SelectedDate } from "./datepicker.interface";
import DatePickerContextProvider from "./DatePickerContext";
import DatePickerModal from "./DatePickerModal";
import { IconCalendar24 } from "public/icons";

import styles from "./DatePicker.module.scss";

interface Props {
  label?: string;
  full?: boolean;
  selectedDate: SelectedDate;
  onDateChange: OnDateChange;
  placeholder?: string;
  className?: string;
}

const DatePicker: React.FC<Props> = ({ label, full, selectedDate, onDateChange, placeholder, className }) => {
  const [isShowDatePickerModal, setIsShowDatePickerModal] = useState(false);

  return (
    <label className={cx(styles.wrapper, { [styles.full]: full }, className)}>
      {label && <span className={styles.label}>{label}</span>}
      <button
        className={styles.datePickerButton}
        data-testid="date-picker"
        type="button"
        onClick={() => setIsShowDatePickerModal(true)}
      >
        <IconCalendar24 />
        <span
          className={cx(styles.selectedDate, { [styles.placeholder]: !selectedDate })}
          data-testid="date-picker-selected-date"
        >
          {selectedDate ? formatDate(selectedDate, DATE_FORMAT) : placeholder}
        </span>
      </button>
      <DatePickerContextProvider
        selectedDate={selectedDate}
        onDateChange={onDateChange}
        onClose={() => setIsShowDatePickerModal(false)}
      >
        <DatePickerModal isShow={isShowDatePickerModal} />
      </DatePickerContextProvider>
    </label>
  );
};

export default DatePicker;
