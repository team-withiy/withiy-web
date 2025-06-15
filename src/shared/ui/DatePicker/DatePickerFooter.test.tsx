import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, test, vi } from "vitest";

import { dayjs } from "@/shared/lib/date";

import DatePicker from ".";

const STANDARD_DATE = dayjs("2023-01-15");

beforeEach(() => {
  cleanup();
});

test("선택된 날짜가 있을 때 확인 버튼이 활성화되어야 한다", async () => {
  render(<DatePicker selectedDate={STANDARD_DATE} onDateChange={() => {}} />);
  const datePicker = screen.getByTestId("date-picker");
  await userEvent.click(datePicker);

  const confirmButton = screen.getByTestId("data-picker-confirm");
  expect(confirmButton).not.toBeDisabled();
});

test("선택된 날짜가 없을 때 확인 버튼이 비활성화되어야 한다", async () => {
  render(<DatePicker selectedDate={null} onDateChange={() => {}} />);
  const datePicker = screen.getByTestId("date-picker");
  await userEvent.click(datePicker);

  const confirmButton = screen.getByTestId("data-picker-confirm");
  expect(confirmButton).toBeDisabled();
});

test("취소 버튼을 클릭하면 DatePicker가 닫혀야 한다", async () => {
  render(<DatePicker selectedDate={STANDARD_DATE} onDateChange={() => {}} />);
  const datePicker = screen.getByTestId("date-picker");
  await userEvent.click(datePicker);

  const footer = screen.getByTestId("date-picker-footer");
  expect(footer).toBeInTheDocument();

  const cancelButton = screen.getByTestId("data-picker-cancel");
  await userEvent.click(cancelButton);

  await waitFor(() => expect(screen.queryByTestId("date-picker-footer")).not.toBeInTheDocument());
});

test("확인 버튼을 클릭하면 onDateChange가 호출되고 DatePicker가 닫혀야 한다", async () => {
  const mockOnDateChange = vi.fn();
  render(<DatePicker selectedDate={STANDARD_DATE} onDateChange={mockOnDateChange} />);
  const datePicker = screen.getByTestId("date-picker");
  await userEvent.click(datePicker);

  const dayElement = screen.getByTestId("date-picker-current-month-day-9");
  const label = dayElement.querySelector("label");
  await userEvent.click(label!);

  const confirmButton = screen.getByTestId("data-picker-confirm");
  await userEvent.click(confirmButton);

  expect(mockOnDateChange).toHaveBeenCalled();

  await waitFor(() => expect(screen.queryByTestId("date-picker-footer")).not.toBeInTheDocument());
});
