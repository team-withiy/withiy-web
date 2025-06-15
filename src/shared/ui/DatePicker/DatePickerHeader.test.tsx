import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test } from "vitest";

import { dayjs } from "@/shared/lib/date";

import DatePicker from ".";

const STANDARD_DATE = dayjs("2023-01-01");

beforeEach(async () => {
  cleanup();
  render(<DatePicker selectedDate={STANDARD_DATE} onDateChange={() => {}} />);
  const datePicker = screen.getByTestId("date-picker");
  await userEvent.click(datePicker);
});

describe("year mode에서", () => {
  beforeEach(async () => {
    // MEMO: yearMode로 세팅하기 위함
    const leftArrow = screen.getByTestId("data-picker-left-arrow");
    await userEvent.click(leftArrow);
  });

  test("좌측 버튼을 누를 경우, 1년 전으로 이동한다.", async () => {
    const leftArrow = screen.getByTestId("data-picker-left-arrow");
    await userEvent.click(leftArrow);
    expect(screen.getByTestId("date-picker-header-text")).toHaveTextContent("2022년");
  });

  test("텍스트는 YYYY년 형식으로 표시되어야 한다.", () => {
    expect(screen.getByTestId("date-picker-header-text")).toHaveTextContent("2023년");
  });

  test("우측 버튼을 누를 경우, 1년 후로 이동한다.", async () => {
    const rightArrow = screen.getByTestId("data-picker-right-arrow");
    await userEvent.click(rightArrow);
    expect(screen.getByTestId("date-picker-header-text")).toHaveTextContent("2024년");
  });
});

describe("month mode에서", () => {
  test("좌측 버튼을 누를 경우, viewMode가 year로 변경되어야한다.", async () => {
    const leftArrow = screen.getByTestId("data-picker-left-arrow");
    await userEvent.click(leftArrow);
    expect(screen.getByTestId("date-picker-header-text")).toHaveTextContent("2023년");
  });

  test("텍스트는 YYYY년 MM월 형식으로 표시되어야 한다.", () => {
    expect(screen.getByTestId("date-picker-header-text")).toHaveTextContent("2023년 01월");
  });

  test("우측 버튼을 누를 경우, viewMode가 year로 변경되어야한다.", () => {
    const rightArrow = screen.getByTestId("data-picker-right-arrow");
    userEvent.click(rightArrow);
    expect(screen.getByTestId("date-picker-header-text")).toHaveTextContent("2023년");
  });
});
