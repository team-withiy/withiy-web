import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import Header from ".";

afterEach(() => {
  cleanup();
});

test("className이 정상적으로 적용되어야 함", () => {
  render(<Header className="test-class" />);
  const header = screen.getByTestId("header");
  expect(header).toHaveClass("test-class");
});

test("children이 정상적으로 렌더링되어야 함", () => {
  render(<Header>Test Header</Header>);
  const header = screen.getByTestId("header");
  expect(header).toHaveTextContent("Test Header");
});
