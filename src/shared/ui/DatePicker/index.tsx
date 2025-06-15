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
  selectedDate: SelectedDate;
  onDateChange: OnDateChange;
  placeholder?: string;
  className?: string;
}

const DatePicker: React.FC<Props> = ({ selectedDate, onDateChange, placeholder, className }) => {
  const [isShowDatePickerModal, setIsShowDatePickerModal] = useState(false);

  return (
    <>
      <button
        className={cx(styles.wrapper, className)}
        data-testid="date-picker"
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
    </>
  );
};

export default DatePicker;
