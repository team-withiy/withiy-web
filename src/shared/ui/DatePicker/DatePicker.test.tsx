import { cleanup, render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import { beforeEach, describe, expect, test } from "vitest";

import { DATE_FORMAT } from "@/shared/constants/date";

import DatePicker from ".";

beforeEach(() => {
  cleanup();
});

describe("선택된 날짜가 있다면, 값이 화면에 보여야한다.", () => {
  test("selectedDate가 Date 객체인 경우", () => {
    const selectedDate = new Date("2023-10-01");
    render(<DatePicker selectedDate={selectedDate} onDateChange={() => {}} />);
    const displayedDate = screen.getByTestId("date-picker-selected-date");
    expect(displayedDate).toHaveTextContent(dayjs(selectedDate).format(DATE_FORMAT));
  });

  test("selectedDate가 dayjs 객체인 경우", () => {
    const selectedDate = dayjs("2023-10-01");
    render(<DatePicker selectedDate={selectedDate} onDateChange={() => {}} />);
    const displayedDate = screen.getByTestId("date-picker-selected-date");
    expect(displayedDate).toHaveTextContent(dayjs(selectedDate).format(DATE_FORMAT));
  });
});

test("선택된 날짜가 없다면, 기본값이 화면에 보여야한다.", () => {
  render(<DatePicker selectedDate={null} placeholder="PLACEHOLDER" onDateChange={() => {}} />);
  const selectedDate = screen.getByTestId("date-picker-selected-date");
  expect(selectedDate).toHaveTextContent("PLACEHOLDER");
});
