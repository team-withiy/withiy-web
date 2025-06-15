"use client";

import cx from "clsx";
import { range } from "lodash-es";

import { DATE_PICKER_MONTH_FORMAT } from "@/shared/constants/date";
import { dayjs, formatDate } from "@/shared/lib/date";

import { useDatePickerContext } from "./DatePickerContext";

import styles from "./DatePickerYearContent.module.scss";

const DatePickerYearContent: React.FC = () => {
  const { focusedMonth, localSelectedDate, onClickMonthInYearViewMode } = useDatePickerContext();
  const focusedYear = focusedMonth.year();

  return (
    <ol className={styles.wrapper} data-testid="date-picker-year-content">
      {range(1, 13).map((month) => {
        const monthDate = dayjs(`${focusedYear}-${month}-01`);

        const isChecked =
          !!localSelectedDate &&
          formatDate(localSelectedDate, DATE_PICKER_MONTH_FORMAT) === formatDate(monthDate, DATE_PICKER_MONTH_FORMAT);

        return (
          <li
            key={`${focusedMonth}-${month}`}
            className={cx(styles.item, { [styles.checked]: isChecked })}
            data-testid={`date-picker-year-content-item-${month}`}
          >
            <label className={styles.label}>
              {month}월
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onClickMonthInYearViewMode(monthDate)}
                hidden
              />
            </label>
          </li>
        );
      })}
    </ol>
  );
};

export default DatePickerYearContent;
