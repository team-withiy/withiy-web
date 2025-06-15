"use client";

import type { MouseEventHandler } from "react";

import { DATE_PICKER_MONTH_FORMAT, DATE_PICKER_YEAR_FORMAT } from "@/shared/constants/date";
import { formatDate } from "@/shared/lib/date";

import { useDatePickerContext } from "./DatePickerContext";
import { IconChevronLeft20, IconChevronRight20 } from "public/icons";

import type { DatePickerYearViewModeArrowDirection } from "./datepicker.interface";

import styles from "./DatePickerHeader.module.scss";

const DatePickerHeader: React.FC = () => {
  const { focusedMonth, viewMode, onClickArrowInMonthViewMode, onClickArrowInYearViewMode } = useDatePickerContext();

  const onClickArrow: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (viewMode === "year") {
      const direction = e.currentTarget.dataset.arrowDirection as DatePickerYearViewModeArrowDirection;
      onClickArrowInYearViewMode(direction);
    }

    if (viewMode === "month") {
      onClickArrowInMonthViewMode();
    }
  };

  return (
    <header className={styles.wrapper} data-testid="date-picker-header">
      <button
        type="button"
        data-testid="data-picker-left-arrow"
        data-arrow-direction="left"
        className={styles.arrowButton}
        onClick={onClickArrow}
      >
        <IconChevronLeft20 />
      </button>
      <time
        aria-label={`${formatDate(focusedMonth, DATE_PICKER_MONTH_FORMAT)}에 대한 ${viewMode}방식 조회`}
        dateTime={formatDate(focusedMonth, DATE_PICKER_MONTH_FORMAT)}
        className={styles.monthText}
        data-testid="date-picker-header-text"
      >
        {viewMode === "year" && formatDate(focusedMonth, DATE_PICKER_YEAR_FORMAT)}
        {viewMode === "month" && formatDate(focusedMonth, DATE_PICKER_MONTH_FORMAT)}
      </time>
      <button
        type="button"
        data-testid="data-picker-right-arrow"
        data-arrow-direction="right"
        className={styles.arrowButton}
        onClick={onClickArrow}
      >
        <IconChevronRight20 />
      </button>
    </header>
  );
};

export default DatePickerHeader;
