import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";

import Radio from ".";

import styles from "./Radio.module.scss";

afterEach(() => {
  cleanup();
});

test("Radio 컴포넌트가 올바르게 렌더링되어야 한다", () => {
  render(<Radio size={24} />);

  const radioWrapper = screen.getByTestId("radio-wrapper");
  const radioBox = screen.getByTestId("radio-box");
  const radio = screen.getByTestId("radio");

  expect(radioWrapper).toBeInTheDocument();
  expect(radioBox).toBeInTheDocument();
  expect(radio).toBeInTheDocument();
});

test("size가 24일 때 large 클래스가 적용되어야 한다", () => {
  render(<Radio size={24} />);

  const radioWrapper = screen.getByTestId("radio-wrapper");
  expect(radioWrapper).toHaveClass(styles.large);
});

test("size가 20일 때 medium 클래스가 적용되어야 한다", () => {
  render(<Radio size={20} />);

  const radioWrapper = screen.getByTestId("radio-wrapper");
  expect(radioWrapper).toHaveClass(styles.medium);
});

test("children이 올바르게 렌더링되어야 한다", () => {
  render(<Radio size={24}>테스트 레이블</Radio>);

  expect(screen.getByText("테스트 레이블")).toBeInTheDocument();
});

test("추가 클래스명이 적용되어야 한다", () => {
  render(<Radio size={24} className="custom-class" />);

  const radioWrapper = screen.getByTestId("radio-wrapper");
  expect(radioWrapper).toHaveClass("custom-class");
});

test("체크 속성이 올바르게 동작해야 한다", () => {
  render(<Radio size={24} checked readOnly />);

  const radio = screen.getByTestId("radio");
  expect(radio).toBeChecked();
});

test("disabled 속성이 올바르게 동작해야 한다", () => {
  render(<Radio size={24} disabled />);

  const radio = screen.getByTestId("radio");
  expect(radio).toBeDisabled();
});

test("onChange 이벤트가 올바르게 동작해야 한다", async () => {
  const handleChange = vi.fn();
  render(<Radio size={24} onChange={handleChange} />);

  const radio = screen.getByTestId("radio");
  await userEvent.click(radio);

  expect(handleChange).toHaveBeenCalledTimes(1);
});

test("name과 value 속성이 올바르게 적용되어야 한다", () => {
  render(<Radio size={24} name="test-radio" value="test-value" />);

  const radio = screen.getByTestId("radio");
  expect(radio).toHaveAttribute("name", "test-radio");
  expect(radio).toHaveAttribute("value", "test-value");
});
