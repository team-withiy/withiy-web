import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import routerMock from "next-router-mock";
import { afterEach, expect, test, vi } from "vitest";

import { renderWithProviders } from "@/shared/lib/test";

import ConnectedCouplePage from ".";

vi.mock("@/shared/ui/FetchBoundary", () => ({
  __esModule: true,
  default: () => null,
}));

afterEach(() => {
  cleanup();
});

test("정상적으로 렌더링이 이루어져야 한다.", () => {
  render(<ConnectedCouplePage />);
  expect(screen.getByTestId("connected-couple-page")).toBeInTheDocument();
});

test("커플 연결 끊기 버튼을 누를 경우 해당 페이지로 이동해야한다.", async () => {
  routerMock.setCurrentUrl({ pathname: "/my-page/couples/connected" });
  renderWithProviders(<ConnectedCouplePage />);

  const breakupLink = screen.getByTestId("breakup-link");
  await userEvent.click(breakupLink);
  expect(routerMock).toMatchObject({
    pathname: "/my-page/couples/connected/breakup",
  });
});
