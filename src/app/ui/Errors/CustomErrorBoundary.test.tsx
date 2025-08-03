import { cleanup, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import { FORBIDDEN_MESSAGE, UNAUTHORIZED_MESSAGE } from "@/shared/constants/auth";
import { renderWithProviders } from "@/shared/lib/test";

import CustomErrorBoundary from "./CustomErrorBoundary";

function ThrowError({ shouldThrow, errorMessage }: { shouldThrow: boolean; errorMessage?: string }) {
  if (shouldThrow) {
    throw new Error(errorMessage || "Test error");
  }
  return <div data-testid="test">Test</div>;
}

afterEach(() => {
  cleanup();
});

test("children을 정상적으로 렌더링한다", () => {
  renderWithProviders(
    <CustomErrorBoundary>
      <ThrowError shouldThrow={false} />
    </CustomErrorBoundary>,
  );

  expect(screen.getByTestId("test")).toBeInTheDocument();
});

test("ServerError가 정상적으로 렌더링된다", () => {
  renderWithProviders(
    <CustomErrorBoundary>
      <ThrowError shouldThrow />
    </CustomErrorBoundary>,
  );

  expect(screen.getByTestId("server-error")).toBeInTheDocument();
});

test("UnauthorizedError가 정상적으로 렌더링된다", () => {
  renderWithProviders(
    <CustomErrorBoundary>
      <ThrowError shouldThrow errorMessage={UNAUTHORIZED_MESSAGE} />
    </CustomErrorBoundary>,
  );

  expect(screen.getByTestId("unauthorized-error")).toBeInTheDocument();
});

test("ForbiddenError가 정상적으로 렌더링된다", () => {
  renderWithProviders(
    <CustomErrorBoundary>
      <ThrowError shouldThrow errorMessage={FORBIDDEN_MESSAGE} />
    </CustomErrorBoundary>,
  );

  expect(screen.getByTestId("forbidden-error")).toBeInTheDocument();
});

test("NetworkError가 정상적으로 렌더링된다", () => {
  Object.defineProperty(window.navigator, "onLine", { value: false });

  renderWithProviders(
    <CustomErrorBoundary>
      <ThrowError shouldThrow />
    </CustomErrorBoundary>,
  );

  expect(screen.getByTestId("network-error")).toBeInTheDocument();
});
