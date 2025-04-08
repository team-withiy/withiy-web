import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";

import Tab from "./Tab";

afterEach(() => {
  cleanup();
});

test("렌더링이 정상적으로 되어야 함", () => {
  render(<Tab>탭 라벨</Tab>);

  const tabElement = screen.getByTestId("tab");
  const inputElement = screen.getByTestId("input");

  expect(tabElement).toBeInTheDocument();
  expect(inputElement).toBeInTheDocument();
  expect(tabElement).toHaveTextContent("탭 라벨");
});

test("클릭 시 체크박스 상태가 변경되어야 함", async () => {
  render(<Tab>탭 라벨</Tab>);

  const tabElement = screen.getByTestId("tab");
  const inputElement = screen.getByTestId("input") as HTMLInputElement;

  expect(inputElement.checked).toBe(false);

  await userEvent.click(tabElement);
  expect(inputElement.checked).toBe(true);

  await userEvent.click(tabElement);
  expect(inputElement.checked).toBe(false);
});

test("className prop이 제대로 적용되어야 함", () => {
  render(<Tab className="custom-class">탭 라벨</Tab>);

  const tabElement = screen.getByTestId("tab");

  expect(tabElement).toHaveClass("custom-class");
});

test("onChange 이벤트 핸들러가 호출되어야 함", async () => {
  const handleChange = vi.fn();

  render(<Tab onChange={handleChange}>탭 라벨</Tab>);

  const tabElement = screen.getByTestId("tab");

  await userEvent.click(tabElement);
  expect(handleChange).toHaveBeenCalledTimes(1);
});

test("disabled 상태일 때 클릭이 작동하지 않아야 함", async () => {
  render(<Tab disabled>탭 라벨</Tab>);

  const inputElement = screen.getByTestId("input") as HTMLInputElement;
  const tabElement = screen.getByTestId("tab");

  expect(inputElement.disabled).toBe(true);

  await userEvent.click(tabElement);
  expect(inputElement.checked).toBe(false);
});
