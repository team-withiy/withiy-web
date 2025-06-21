import { cleanup, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import { renderWithProviders } from "@/shared/lib/test";

import RequireCoupleAuthorizationButton from "./RequireCoupleAuthorizationButton";

afterEach(() => {
  cleanup();
});

test("버튼이 정상적으로 렌더링되어야 함", () => {
  renderWithProviders(
    <RequireCoupleAuthorizationButton callbackUrl="/">
      <span>Test Content</span>
    </RequireCoupleAuthorizationButton>,
  );

  const button = screen.getByTestId("require-couple-authorization-button");
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("Test Content");
});

test("className이 정상적으로 적용되어야 함", () => {
  renderWithProviders(
    <RequireCoupleAuthorizationButton callbackUrl="/" className="custom-class">
      Content
    </RequireCoupleAuthorizationButton>,
  );

  const button = screen.getByTestId("require-couple-authorization-button");
  expect(button).toHaveClass("custom-class");
});
