import { cleanup, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import { renderWithProviders } from "@/shared/lib/test";

import RequireAuthorizationButton from "./RequireAuthorizationButton";

afterEach(() => {
  cleanup();
});

test("버튼이 정상적으로 렌더링되어야 함", () => {
  renderWithProviders(
    <RequireAuthorizationButton callbackUrl="/">
      <span>Test Content</span>
    </RequireAuthorizationButton>,
  );

  const button = screen.getByTestId("require-authorization-button");
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("Test Content");
});

test("className이 정상적으로 적용되어야 함", () => {
  renderWithProviders(
    <RequireAuthorizationButton callbackUrl="/" className="custom-class">
      Content
    </RequireAuthorizationButton>,
  );

  const button = screen.getByTestId("require-authorization-button");
  expect(button).toHaveClass("custom-class");
});
