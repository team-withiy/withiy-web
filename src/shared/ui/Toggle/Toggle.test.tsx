import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test } from "vitest";

import Toggle from ".";

afterEach(() => {
  cleanup();
});

test("Toggle 컴포넌트가 올바르게 렌더링되어야 한다", () => {
  render(<Toggle />);

  const toggle = screen.getByTestId("toggle");
  const toggleInput = screen.getByTestId("toggle-input");
  const toggleSlider = screen.getByTestId("toggle-slider");

  expect(toggle).toBeInTheDocument();
  expect(toggleInput).toBeInTheDocument();
  expect(toggleSlider).toBeInTheDocument();
});

test("Toggle을 클릭하면 input의 checked 상태가 변경되어야 한다", async () => {
  const user = userEvent.setup();
  render(<Toggle />);

  const toggleInput = screen.getByTestId("toggle-input");
  expect(toggleInput).not.toBeChecked();

  await user.click(toggleInput);
  expect(toggleInput).toBeChecked();

  await user.click(toggleInput);
  expect(toggleInput).not.toBeChecked();
});

test("disabled 상태에서 Toggle을 클릭하면 input의 checked 상태가 변경되지 않아야 한다", async () => {
  const user = userEvent.setup();
  render(<Toggle disabled />);

  const toggleInput = screen.getByTestId("toggle-input");
  expect(toggleInput).not.toBeChecked();

  await user.click(toggleInput);
  expect(toggleInput).not.toBeChecked();
});
