import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, test } from "vitest";

import { dayjs } from "@/shared/lib/date";

import DatePicker from ".";

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
