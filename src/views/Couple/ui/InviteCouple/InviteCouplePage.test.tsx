import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { afterEach, expect, test, vi } from "vitest";

import { renderWithProviders } from "@/shared/lib/test";

import InviteCouplePage from ".";

vi.mock("@/features/handleAuthorizationRoute/ui", () => ({
  AuthorizationRouteHandler: vi.fn().mockReturnValue(null),
}));

afterEach(() => {
  cleanup();
});

test("InviteCouplePage 컴포넌트가 렌더링되어야 한다.", () => {
  const { container } = render(<InviteCouplePage />);
  expect(container).toBeInTheDocument();
});

test("SkipButton 클릭 시 홈으로 돌아가야 함", async () => {
  mockRouter.setCurrentUrl({
    pathname: "/auth/couples/invite",
  });

  renderWithProviders(<InviteCouplePage />);
  const skipButton = screen.getByTestId("skip-button");
  await userEvent.click(skipButton);
  expect(mockRouter.pathname).toBe("/");
});
