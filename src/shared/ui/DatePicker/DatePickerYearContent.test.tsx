import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, test } from "vitest";

import { dayjs } from "@/shared/lib/date";

import DatePicker from ".";
import type { RequiredSelectedDate } from "./datepicker.interface";

import styles from "./DatePickerYearContent.module.scss";

const STANDARD_DATE = dayjs("2023-01-01");

beforeEach(async () => {
  cleanup();
  render(<DatePicker selectedDate={STANDARD_DATE} onDateChange={() => {}} />);
  const datePicker = screen.getByTestId("date-picker");
  await userEvent.click(datePicker);
  // MEMO: yearMode로 세팅하기 위함
  const leftArrow = screen.getByTestId("data-picker-left-arrow");
  await userEvent.click(leftArrow);
});

test("선택된 날짜가 포함된 월이 선택처리 되어있어야 한다.", () => {
  const monthItem = screen.getByTestId("date-picker-year-content-item-1");
  expect(monthItem).toHaveClass(styles.checked);
});

test("월을 선택할 경우, 해당 월이 선택된 채로 month mode로 변경되어야 한다.", async () => {
  const monthItem = screen.getByTestId("date-picker-year-content-item-3");
  await userEvent.click(monthItem.children[0]);
  const monthContent = screen.getByTestId("date-picker-header-text");
  expect(monthContent).toHaveTextContent("2023년 03월");
});

test("filterEnableDates가 제공되지 않으면 모든 월이 선택 가능해야 한다", async () => {
  cleanup();
  render(<DatePicker selectedDate={STANDARD_DATE} onDateChange={() => {}} />);

  const datePicker = screen.getByTestId("date-picker");
  await userEvent.click(datePicker);

  const leftArrow = screen.getByTestId("data-picker-left-arrow");
  await userEvent.click(leftArrow);

  for (let month = 1; month <= 12; month++) {
    const monthItem = screen.getByTestId(`date-picker-year-content-item-${month}`);
    expect(monthItem).not.toHaveClass(styles.disabled);
  }
});

test("filterEnableDates가 제공되면 해당 조건에 따라 월이 비활성화되어야 한다", async () => {
  cleanup();

  const filterEnableDates = (date: RequiredSelectedDate) => {
    const dayjsDate = dayjs(date);
    return dayjsDate.month() >= 5;
  };

  render(<DatePicker selectedDate={STANDARD_DATE} onDateChange={() => {}} filterEnableDates={filterEnableDates} />);

  const datePicker = screen.getByTestId("date-picker");
  await userEvent.click(datePicker);

  const leftArrow = screen.getByTestId("data-picker-left-arrow");
  await userEvent.click(leftArrow);

  for (let month = 1; month <= 5; month++) {
    const monthItem = screen.getByTestId(`date-picker-year-content-item-${month}`);
    expect(monthItem).toHaveClass(styles.disabled);
  }

  for (let month = 6; month <= 12; month++) {
    const monthItem = screen.getByTestId(`date-picker-year-content-item-${month}`);
    expect(monthItem).not.toHaveClass(styles.disabled);
  }
});

test("특정 날짜만 포함된 월만 선택 가능해야 한다", async () => {
  cleanup();

  const filterEnableDates = (date: RequiredSelectedDate) => {
    const dayjsDate = dayjs(date);
    return dayjsDate.date() >= 15;
  };

  render(<DatePicker selectedDate={STANDARD_DATE} onDateChange={() => {}} filterEnableDates={filterEnableDates} />);

  const datePicker = screen.getByTestId("date-picker");
  await userEvent.click(datePicker);

  const leftArrow = screen.getByTestId("data-picker-left-arrow");
  await userEvent.click(leftArrow);

  for (let month = 1; month <= 12; month++) {
    const monthItem = screen.getByTestId(`date-picker-year-content-item-${month}`);
    expect(monthItem).not.toHaveClass(styles.disabled);
  }
});

test("월의 모든 날짜가 필터 조건에 맞지 않으면 해당 월이 비활성화되어야 한다", async () => {
  cleanup();

  const filterEnableDates = (date: RequiredSelectedDate) => {
    const dayjsDate = dayjs(date);
    return dayjsDate.month() === 1 && dayjsDate.date() === 1;
  };

  render(<DatePicker selectedDate={STANDARD_DATE} onDateChange={() => {}} filterEnableDates={filterEnableDates} />);

  const datePicker = screen.getByTestId("date-picker");
  await userEvent.click(datePicker);

  const leftArrow = screen.getByTestId("data-picker-left-arrow");
  await userEvent.click(leftArrow);

  const februaryItem = screen.getByTestId("date-picker-year-content-item-2");
  expect(februaryItem).not.toHaveClass(styles.disabled);

  [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((month) => {
    const monthItem = screen.getByTestId(`date-picker-year-content-item-${month}`);
    expect(monthItem).toHaveClass(styles.disabled);
  });
});

test("주말만 선택 가능한 경우 모든 월이 활성화되어야 한다", async () => {
  cleanup();

  const filterEnableDates = (date: RequiredSelectedDate) => {
    const dayjsDate = dayjs(date);
    const dayOfWeek = dayjsDate.day();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  render(<DatePicker selectedDate={STANDARD_DATE} onDateChange={() => {}} filterEnableDates={filterEnableDates} />);

  const datePicker = screen.getByTestId("date-picker");
  await userEvent.click(datePicker);

  const leftArrow = screen.getByTestId("data-picker-left-arrow");
  await userEvent.click(leftArrow);

  for (let month = 1; month <= 12; month++) {
    const monthItem = screen.getByTestId(`date-picker-year-content-item-${month}`);
    expect(monthItem).not.toHaveClass(styles.disabled);
  }
});
