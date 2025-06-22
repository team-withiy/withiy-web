"use client";

import cx from "clsx";
import { range, rangeRight } from "lodash-es";

import { DATE_FORMAT, DATE_PICKER_DAYS_OF_WEEK } from "@/shared/constants/date";
import { dayjs, Dayjs, formatDate } from "@/shared/lib/date";

import { useDatePickerContext } from "./DatePickerContext";

import type { SelectedDate } from "./datepicker.interface";

import styles from "./DatePickerMonthContent.module.scss";

const checkIsDateToday = (date: Dayjs) => {
  return date.format(DATE_FORMAT) === dayjs().format(DATE_FORMAT);
};

const checkIsHoliday = (date: Dayjs) => {
  return date.day() === 0 || date.day() === 6;
};

const checkIsSelected = (date: Dayjs, localSelectedDate: SelectedDate) => {
  return !!localSelectedDate && formatDate(date, DATE_FORMAT) === formatDate(localSelectedDate, DATE_FORMAT);
};

const DatePickerMonthContent: React.FC = () => {
  const { focusedMonth, localSelectedDate, onSelectDate, checkDateAvailableInMonthViewMode } = useDatePickerContext();
  const firstWeekDayOfWeek = focusedMonth.startOf("month").day();
  const beforeMonthDate = focusedMonth.subtract(1, "month");
  const lastWeekDayOfWeek = focusedMonth.endOf("month").day();

  return (
    <section className={styles.wrapper} data-testid="date-picker-month-content">
      <ol className={styles.daysOfWeek} data-testid="date-picker-days-of-week">
        {DATE_PICKER_DAYS_OF_WEEK.map((dayOfWeek) => (
          <li key={dayOfWeek} className={styles.dayOfWeek} data-testid={`date-picker-day-of-week-${dayOfWeek}`}>
            {dayOfWeek}
          </li>
        ))}
      </ol>
      <ol className={styles.days}>
        {/* 이전 달의 날짜가 보이는 경우 */}
        {rangeRight(firstWeekDayOfWeek).map((day) => {
          const date = beforeMonthDate.endOf("month").subtract(day, "day");

          return (
            <li
              className={cx(styles.day, styles.disabled, {
                [styles.isToday]: checkIsDateToday(date),
                [styles.isHoliday]: checkIsHoliday(date),
                [styles.isSelected]: checkIsSelected(date, localSelectedDate),
              })}
              key={formatDate(date, DATE_FORMAT)}
              data-testid={`date-picker-before-month-day-${day}`}
            >
              <time dateTime={formatDate(date, DATE_FORMAT)}>{formatDate(date, "D")}</time>
            </li>
          );
        })}
        {/* 현재 달의 날짜 */}
        {range(focusedMonth.endOf("month").date()).map((day) => {
          const date = focusedMonth.startOf("month").add(day, "day");
          const isAvailable = checkDateAvailableInMonthViewMode(date);

          return (
            <li
              className={cx(styles.day, {
                [styles.isToday]: checkIsDateToday(date),
                [styles.isHoliday]: checkIsHoliday(date),
                [styles.isSelected]: checkIsSelected(date, localSelectedDate),
                [styles.disabled]: !isAvailable,
              })}
              key={formatDate(date, DATE_FORMAT)}
              data-testid={`date-picker-current-month-day-${day}`}
            >
              <label className={styles.label}>
                <time dateTime={formatDate(date, DATE_FORMAT)}>{formatDate(date, "D")}</time>
                <input
                  type="checkbox"
                  checked={checkIsSelected(date, localSelectedDate)}
                  onChange={() => onSelectDate(date)}
                  disabled={!isAvailable}
                  hidden
                />
              </label>
            </li>
          );
        })}
        {/* 다음 달의 날짜가 보이는 경우 */}
        {range(6 - lastWeekDayOfWeek).map((day) => {
          const date = focusedMonth.endOf("month").add(day + 1, "day");

          return (
            <li
              className={cx(styles.day, styles.disabled, {
                [styles.isToday]: checkIsDateToday(date),
                [styles.isHoliday]: checkIsHoliday(date),
                [styles.isSelected]: checkIsSelected(date, localSelectedDate),
              })}
              key={formatDate(date, DATE_FORMAT)}
              data-testid={`date-picker-next-month-day-${day}`}
            >
              <time dateTime={formatDate(date, DATE_FORMAT)}>{formatDate(date, "D")}</time>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default DatePickerMonthContent;
