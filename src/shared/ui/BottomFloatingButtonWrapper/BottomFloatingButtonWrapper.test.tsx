import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import BottomFloatingButtonWrapper from ".";

afterEach(() => {
  cleanup();
});

test("렌더링이 정상적으로 이루어져야 한다", () => {
  render(
    <BottomFloatingButtonWrapper>
      <div data-testid="test">test</div>
    </BottomFloatingButtonWrapper>,
  );

  expect(screen.getByTestId("bottom-floating-button-wrapper")).toBeInTheDocument();
  expect(screen.getByTestId("test")).toBeInTheDocument();
});

test("className이 정상적으로 적용되어야 한다", () => {
  render(
    <BottomFloatingButtonWrapper className="custom-class">
      <div data-testid="test">test</div>
    </BottomFloatingButtonWrapper>,
  );

  expect(screen.getByTestId("bottom-floating-button-wrapper")).toBeInTheDocument();
  expect(screen.getByTestId("bottom-floating-button-wrapper")).toHaveClass("custom-class");
});
