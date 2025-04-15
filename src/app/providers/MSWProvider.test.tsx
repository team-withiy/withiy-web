import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import MSWProvider from "./MSWProvider";

vi.mock("@/app/mocks", () => ({
  initMSW: vi.fn(() => Promise.resolve()),
}));

beforeEach(() => {
  vi.resetAllMocks();
  cleanup();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

test("NEXT_PUBLIC_MSW가 enabled가 아닌 경우, children을 바로 렌더링한다.", () => {
  vi.stubEnv("NEXT_PUBLIC_MSW", "disabled");

  render(
    <MSWProvider>
      <div data-testid="child">Test Child</div>
    </MSWProvider>,
  );

  expect(screen.getByTestId("child")).toBeInTheDocument();
});

test("NEXT_PUBLIC_MSW가 enabled인 경우, children을 처음에 렌더링하지 않는다.", () => {
  vi.stubEnv("NEXT_PUBLIC_MSW", "enabled");

  render(
    <MSWProvider>
      <div data-testid="child">Test Child</div>
    </MSWProvider>,
  );

  expect(screen.queryByTestId("child")).not.toBeInTheDocument();
});

test("MSW가 초기화된 후 children을 렌더링한다.", async () => {
  vi.stubEnv("NEXT_PUBLIC_MSW", "enabled");

  render(
    <MSWProvider>
      <div data-testid="child">Test Child</div>
    </MSWProvider>,
  );

  await waitFor(() => {
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});

test("NEXT_PUBLIC_MSW가 enabled인 경우, initMSW를 호출한다.", async () => {
  vi.stubEnv("NEXT_PUBLIC_MSW", "enabled");

  const { initMSW } = await import("@/app/mocks");

  render(
    <MSWProvider>
      <div>Test Child</div>
    </MSWProvider>,
  );

  await waitFor(() => {
    expect(initMSW).toHaveBeenCalledTimes(1);
  });
});

test("NEXT_PUBLIC_MSW가 enabled가 아닌 경우, initMSW를 호출하지 않는다.", async () => {
  vi.stubEnv("NEXT_PUBLIC_MSW", "disabled");

  const { initMSW } = await import("@/app/mocks");

  render(
    <MSWProvider>
      <div>Test Child</div>
    </MSWProvider>,
  );

  expect(initMSW).not.toHaveBeenCalled();
});
