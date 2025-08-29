import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { mockConsole } from "vitest-console";

import UnderlineInput from "./UnderlineInput";

afterEach(() => {
  cleanup();
});

test("type을 명시하지 않으면 console.assert가 발생한다.", () => {
  const { restoreConsole } = mockConsole(["assert"]);
  render(<UnderlineInput />);
  expect(console.assert).toHaveBeenCalledWith(false, "Input type is required");
  restoreConsole();
});

test("type을 명시하면 console.assert가 발생하지 않는다.", () => {
  const { restoreConsole } = mockConsole(["assert"]);
  render(<UnderlineInput type="text" />);
  expect(console.assert).toHaveBeenCalledWith(true, "Input type is required");
  restoreConsole();
});

test("inputMode를 명시하지 않으면 console.assert가 발생한다.", () => {
  const { restoreConsole } = mockConsole(["assert"]);
  render(<UnderlineInput type="text" />);
  expect(console.assert).toHaveBeenCalledWith(false, "InputMode is required");
  restoreConsole();
});

test("inputMode를 명시하면 console.assert가 발생하지 않는다.", () => {
  const { restoreConsole } = mockConsole(["assert"]);
  render(<UnderlineInput type="text" inputMode="text" />);
  expect(console.assert).toHaveBeenCalledWith(true, "InputMode is required");
  restoreConsole();
});

test("errorMessage가 있으면 에러 메시지가 표시된다.", () => {
  render(<UnderlineInput type="text" size={52} errorMessage="에러 메시지" />);
  expect(screen.getByText("에러 메시지")).toBeInTheDocument();
  expect(screen.getByTestId("underline-input-error-message")).toBeInTheDocument();
});

test("errorMessage가 없으면 에러 메시지가 표시되지 않는다.", () => {
  render(<UnderlineInput type="text" size={52} />);
  expect(screen.queryByText(/에러 메시지/)).not.toBeInTheDocument();
  expect(screen.queryByTestId("underline-input-error-message")).not.toBeInTheDocument();
});

test("successMessage가 있으면 성공 메시지가 표시된다.", () => {
  render(<UnderlineInput type="text" size={52} successMessage="성공 메시지" />);
  expect(screen.getByText("성공 메시지")).toBeInTheDocument();
  expect(screen.getByTestId("underline-input-success-message")).toBeInTheDocument();
});

test("successMessage가 true이면 successMessage 요소가 표시되지만 텍스트는 없다.", () => {
  render(<UnderlineInput type="text" size={52} successMessage={true} />);
  expect(screen.getByTestId("underline-input-success-message")).toBeInTheDocument();
  expect(screen.getByTestId("underline-input-success-message")).toBeEmptyDOMElement();
});

test("successMessage가 없으면 성공 메시지가 표시되지 않는다.", () => {
  render(<UnderlineInput type="text" size={52} />);
  expect(screen.queryByTestId("underline-input-success-message")).not.toBeInTheDocument();
});

test("errorMessage와 successMessage가 모두 있으면 아무것도 표시되지 않는다.", () => {
  render(<UnderlineInput type="text" size={52} errorMessage="에러 메시지" successMessage="성공 메시지" />);
  expect(screen.queryByTestId("underline-input-error-message")).not.toBeInTheDocument();
  expect(screen.queryByTestId("underline-input-success-message")).not.toBeInTheDocument();
  expect(screen.queryByText("에러 메시지")).not.toBeInTheDocument();
  expect(screen.queryByText("성공 메시지")).not.toBeInTheDocument();
});

test("label이 있으면 레이블이 표시된다.", () => {
  render(<UnderlineInput type="text" size={52} label="테스트 레이블" />);
  expect(screen.getByText("테스트 레이블")).toBeInTheDocument();
});

test("label이 없으면 레이블이 표시되지 않는다.", () => {
  render(<UnderlineInput type="text" size={52} />);
  expect(screen.queryByText(/테스트 레이블/)).not.toBeInTheDocument();
});

test("data-testid 속성이 올바르게 적용된다.", () => {
  render(<UnderlineInput type="text" size={52} />);
  expect(screen.getByTestId("underline-input-wrapper")).toBeInTheDocument();
  expect(screen.getByTestId("underline-input")).toBeInTheDocument();
});

test("className 속성이 wrapper에 올바르게 적용된다.", () => {
  render(<UnderlineInput type="text" size={52} className="test-class" />);
  expect(screen.getByTestId("underline-input-wrapper")).toHaveClass("test-class");
});

test("inputClassName 속성이 input에 올바르게 적용된다.", () => {
  render(<UnderlineInput type="text" size={52} inputClassName="input-test-class" />);
  expect(screen.getByTestId("underline-input")).toHaveClass("input-test-class");
});

test("input의 기본 속성들이 올바르게 전달된다.", () => {
  render(
    <UnderlineInput
      type="email"
      size={52}
      placeholder="이메일을 입력하세요"
      disabled
      defaultValue="test@example.com"
    />,
  );

  const input = screen.getByTestId("underline-input");
  expect(input).toHaveAttribute("type", "email");
  expect(input).toHaveAttribute("placeholder", "이메일을 입력하세요");
  expect(input).toBeDisabled();
  expect(input).toHaveValue("test@example.com");
});

test("inputMode 속성이 올바르게 전달된다.", () => {
  render(<UnderlineInput type="text" size={52} inputMode="numeric" />);
  const input = screen.getByTestId("underline-input");
  expect(input).toHaveAttribute("inputMode", "numeric");
});
