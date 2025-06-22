import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, test } from "vitest";

import { DATE_PICKER_DAYS_OF_WEEK } from "@/shared/constants/date";
import { dayjs } from "@/shared/lib/date";

import DatePicker from ".";
import type { RequiredSelectedDate } from "./datepicker.interface";

import styles from "./DatePickerMonthContent.module.scss";

const STANDARD_DATE = dayjs("2023-01-15");

beforeEach(async () => {
  cleanup();
  render(<DatePicker selectedDate={STANDARD_DATE} onDateChange={() => {}} />);
  const datePicker = screen.getByTestId("date-picker");
  await userEvent.click(datePicker);
});

test("요일 헤더가 올바르게 렌더링되어야 한다", () => {
  const daysOfWeekContainer = screen.getByTestId("date-picker-days-of-week");
  expect(daysOfWeekContainer).toBeInTheDocument();

  DATE_PICKER_DAYS_OF_WEEK.forEach((dayOfWeek) => {
    const dayElement = screen.getByTestId(`date-picker-day-of-week-${dayOfWeek}`);
    expect(dayElement).toBeInTheDocument();
    expect(dayElement).toHaveTextContent(dayOfWeek);
  });
});

test("현재 월의 날짜들이 올바르게 렌더링되어야 한다", () => {
  const monthContent = screen.getByTestId("date-picker-month-content");
  expect(monthContent).toBeInTheDocument();

  for (let day = 0; day < 31; day++) {
    const dayElement = screen.getByTestId(`date-picker-current-month-day-${day}`);
    expect(dayElement).toBeInTheDocument();
  }
});

test("선택된 날짜가 하이라이트되어야 한다", () => {
  const selectedDayElement = screen.getByTestId("date-picker-current-month-day-14");
  expect(selectedDayElement).toHaveClass(styles.isSelected);
});

test("오늘 날짜가 하이라이트되어야 한다", async () => {
  cleanup();
  const today = dayjs();
  render(<DatePicker selectedDate={today} onDateChange={() => {}} />);

  const datePicker = screen.getByTestId("date-picker");
  await userEvent.click(datePicker);

  const todayDay = today.date() - 1;
  const todayElement = screen.getByTestId(`date-picker-current-month-day-${todayDay}`);
  expect(todayElement).toHaveClass(styles.isToday);
});

test("주말(토요일, 일요일)이 holiday 클래스를 가져야 한다", () => {
  const sundayElement = screen.getByTestId("date-picker-current-month-day-0");
  expect(sundayElement).toHaveClass(styles.isHoliday);

  const saturdayElement = screen.getByTestId("date-picker-current-month-day-6");
  expect(saturdayElement).toHaveClass(styles.isHoliday);
});

test("checkbox가 올바른 checked 상태를 가져야 한다", () => {
  const selectedDayElement = screen.getByTestId("date-picker-current-month-day-14");
  const checkbox = selectedDayElement.querySelector('input[type="checkbox"]');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toBeChecked();

  const unselectedDayElement = screen.getByTestId("date-picker-current-month-day-9");
  const unselectedCheckbox = unselectedDayElement.querySelector('input[type="checkbox"]');
  expect(unselectedCheckbox).toBeInTheDocument();
  expect(unselectedCheckbox).not.toBeChecked();
});

test("이전 달의 날짜들이 disabled 상태로 렌더링되어야 한다", async () => {
  cleanup();
  const februaryDate = dayjs("2023-02-15");
  render(<DatePicker selectedDate={februaryDate} onDateChange={() => {}} />);

  const datePicker = screen.getByTestId("date-picker");
  await userEvent.click(datePicker);

  for (let day = 0; day < 3; day++) {
    const beforeMonthElement = screen.getByTestId(`date-picker-before-month-day-${day}`);
    expect(beforeMonthElement).toBeInTheDocument();
    expect(beforeMonthElement).toHaveClass(styles.disabled);
  }
});

test("다음 달의 날짜들이 disabled 상태로 렌더링되어야 한다", () => {
  for (let day = 0; day < 3; day++) {
    const nextMonthElement = screen.getByTestId(`date-picker-next-month-day-${day}`);
    expect(nextMonthElement).toBeInTheDocument();
    expect(nextMonthElement).toHaveClass(styles.disabled);
  }
});

test("time 요소가 올바른 datetime 속성을 가져야 한다", () => {
  const dayElement = screen.getByTestId("date-picker-current-month-day-14");
  const timeElement = dayElement.querySelector("time");
  expect(timeElement).toBeInTheDocument();
  expect(timeElement).toHaveAttribute("datetime", "2023.01.15");
  expect(timeElement).toHaveTextContent("15");
});

test("filterEnableDates가 제공되지 않으면 모든 날짜가 선택 가능해야 한다", async () => {
  cleanup();
  render(<DatePicker selectedDate={STANDARD_DATE} onDateChange={() => {}} />);

  const datePicker = screen.getByTestId("date-picker");
  await userEvent.click(datePicker);

  for (let day = 0; day < 31; day++) {
    const dayElement = screen.getByTestId(`date-picker-current-month-day-${day}`);
    expect(dayElement).not.toHaveClass(styles.disabled);
  }
});

test("filterEnableDates가 제공되면 해당 조건에 따라 날짜가 비활성화되어야 한다", async () => {
  cleanup();

  const filterEnableDates = (date: RequiredSelectedDate) => {
    const dayjsDate = dayjs(date);
    return dayjsDate.date() >= 15;
  };

  render(<DatePicker selectedDate={STANDARD_DATE} onDateChange={() => {}} filterEnableDates={filterEnableDates} />);

  const datePicker = screen.getByTestId("date-picker");
  await userEvent.click(datePicker);

  for (let day = 0; day < 14; day++) {
    const dayElement = screen.getByTestId(`date-picker-current-month-day-${day}`);
    expect(dayElement).toHaveClass(styles.disabled);
  }

  for (let day = 14; day < 31; day++) {
    const dayElement = screen.getByTestId(`date-picker-current-month-day-${day}`);
    expect(dayElement).not.toHaveClass(styles.disabled);
  }
});

test("특정 날짜만 선택 가능하도록 필터링할 수 있어야 한다", async () => {
  cleanup();

  const filterEnableDates = (date: RequiredSelectedDate) => {
    const dayjsDate = dayjs(date);
    return dayjsDate.date() % 2 === 0;
  };

  render(<DatePicker selectedDate={STANDARD_DATE} onDateChange={() => {}} filterEnableDates={filterEnableDates} />);

  const datePicker = screen.getByTestId("date-picker");
  await userEvent.click(datePicker);

  for (let day = 0; day < 31; day++) {
    const dayElement = screen.getByTestId(`date-picker-current-month-day-${day}`);
    const actualDate = day + 1;

    if (actualDate % 2 === 1) {
      expect(dayElement).toHaveClass(styles.disabled);
    } else {
      expect(dayElement).not.toHaveClass(styles.disabled);
    }
  }
});

test("주말만 선택 가능하도록 필터링할 수 있어야 한다", async () => {
  cleanup();

  const filterEnableDates = (date: RequiredSelectedDate) => {
    const dayjsDate = dayjs(date);
    const dayOfWeek = dayjsDate.day();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  render(<DatePicker selectedDate={STANDARD_DATE} onDateChange={() => {}} filterEnableDates={filterEnableDates} />);

  const datePicker = screen.getByTestId("date-picker");
  await userEvent.click(datePicker);

  const weekendDays = [0, 6, 7, 13, 14, 20, 21, 27, 28];

  for (let day = 0; day < 31; day++) {
    const dayElement = screen.getByTestId(`date-picker-current-month-day-${day}`);

    if (weekendDays.includes(day)) {
      expect(dayElement).not.toHaveClass(styles.disabled);
    } else {
      expect(dayElement).toHaveClass(styles.disabled);
    }
  }
});
