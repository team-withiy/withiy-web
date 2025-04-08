import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";

import Textarea from "./Textarea";

afterEach(() => {
  cleanup();
});

test("Textarea가 기본 속성으로 올바르게 렌더링된다.", () => {
  render(<Textarea />);
  const textarea = screen.getByRole("textbox");
  expect(textarea).toBeInTheDocument();
  expect(textarea).toHaveAttribute("rows", "5");
});

test("placeholder가 올바르게 적용된다.", () => {
  const placeholder = "test placeholder";
  render(<Textarea placeholder={placeholder} />);
  const textarea = screen.getByRole("textbox");
  expect(textarea).toHaveAttribute("placeholder", placeholder);
});

test("rows 속성이 올바르게 적용된다.", () => {
  render(<Textarea rows={10} />);
  const textarea = screen.getByRole("textbox");
  expect(textarea).toHaveAttribute("rows", "10");
});

test("disabled 속성이 올바르게 적용된다.", () => {
  render(<Textarea disabled />);
  const textarea = screen.getByRole("textbox");
  expect(textarea).toBeDisabled();
});

test("className 속성이 wrapper에 올바르게 적용된다.", () => {
  render(<Textarea className="test-class" />);
  const wrapper = screen.getByTestId("textarea-wrapper");
  expect(wrapper).toHaveClass("test-class");
});

test("textareaClassName 속성이 textarea에 올바르게 적용된다.", () => {
  render(<Textarea textareaClassName="textarea-test-class" />);
  const textarea = screen.getByTestId("textarea");
  expect(textarea).toHaveClass("textarea-test-class");
});

test("onChange 이벤트가 올바르게 동작한다.", async () => {
  const handleChange = vi.fn();
  render(<Textarea onChange={handleChange} />);

  const textarea = screen.getByTestId("textarea");
  await userEvent.type(textarea, "test input");

  expect(handleChange).toHaveBeenCalled();
});

test("maxLength가 설정된 경우 글자 수 카운터가 표시된다.", () => {
  const maxLength = 100;
  render(<Textarea maxLength={maxLength} value="" />);

  const maxLengthElement = screen.getByTestId("max-length");
  expect(maxLengthElement).toBeInTheDocument();

  const currentLength = screen.getByTestId("current-length");
  expect(currentLength).toHaveTextContent("0");
  expect(maxLengthElement.textContent).toContain(`0/${maxLength}`);
});

test("maxLength가 설정된 경우 현재 글자 수가 올바르게 표시된다.", () => {
  const maxLength = 100;
  const value = "test input";
  render(<Textarea maxLength={maxLength} value={value} />);

  const maxLengthElement = screen.getByTestId("max-length");
  const currentLength = screen.getByTestId("current-length");
  expect(currentLength).toHaveTextContent(value.length.toString());
  expect(maxLengthElement.textContent).toContain(`${value.length}/${maxLength}`);
});

test("maxLength가 설정되지 않은 경우 글자 수 카운터가 표시되지 않는다.", () => {
  render(<Textarea value="test input" />);

  const maxLengthElement = screen.queryByTestId("max-length");
  expect(maxLengthElement).toBeNull();
});

test("maxLength를 초과하는 입력이 차단된다.", async () => {
  const maxLength = 5;
  const handleChange = vi.fn();

  render(<Textarea maxLength={maxLength} onChange={handleChange} value="12345" />);

  const textarea = screen.getByTestId("textarea");
  fireEvent.change(textarea, { target: { value: "123456" } });

  expect(handleChange).not.toHaveBeenCalled();
});
