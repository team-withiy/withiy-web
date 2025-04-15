import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { mockConsole } from "vitest-console";

import Input from ".";

import styles from "./Input.module.scss";

afterEach(() => {
  cleanup();
});

test("type을 명시하지 않으면 console.assert가 발생한다.", () => {
  const { restoreConsole } = mockConsole(["assert"]);
  render(<Input size={52} />);
  expect(console.assert).toHaveBeenCalledWith(false, "Input type is required");
  restoreConsole();
});

test("type을 명시하면 console.assert가 발생하지 않는다.", () => {
  const { restoreConsole } = mockConsole(["assert"]);
  render(<Input type="text" size={52} />);
  expect(console.assert).toHaveBeenCalledWith(true, "Input type is required");
  restoreConsole();
});

test("errorMessage가 있으면 에러 메시지가 표시된다.", () => {
  render(<Input type="text" size={52} errorMessage="에러 메시지" />);
  expect(screen.getByText("에러 메시지")).toBeInTheDocument();
});

test("errorMessage가 없으면 에러 메시지가 표시되지 않는다.", () => {
  render(<Input type="text" size={52} />);
  expect(screen.queryByText(/에러 메시지/)).not.toBeInTheDocument();
});

test("data-testid 속성이 올바르게 적용된다.", () => {
  render(<Input type="text" size={52} />);
  expect(screen.getByTestId("input-wrapper")).toBeInTheDocument();
  expect(screen.getByTestId("input")).toBeInTheDocument();
});

test("className 속성이 wrapper에 올바르게 적용된다.", () => {
  render(<Input type="text" size={52} className="test-class" />);
  expect(screen.getByTestId("input-wrapper")).toHaveClass("test-class");
});

test("inputClassName 속성이 input에 올바르게 적용된다.", () => {
  render(<Input type="text" size={52} inputClassName="input-test-class" />);
  expect(screen.getByTestId("input")).toHaveClass("input-test-class");
});

test("errorMessage가 있으면 input-wrapper에 error 클래스가 추가된다.", () => {
  render(<Input type="text" size={52} errorMessage="에러 메시지" />);
  expect(screen.getByTestId("input-wrapper")).toHaveClass(styles.error);
});
