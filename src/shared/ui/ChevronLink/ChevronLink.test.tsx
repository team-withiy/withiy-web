import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import routerMock from "next-router-mock";
import { expect, test } from "vitest";

import { renderWithProviders } from "@/shared/lib/test";

import ChevronLink from ".";

test("각종 props가 잘 적용되어야 한다.", async () => {
  routerMock.setCurrentUrl({ pathname: "/test" });
  renderWithProviders(<ChevronLink href="/">프로필 설정</ChevronLink>);
  expect(screen.getByTestId("chevron-link")).toHaveAttribute("href", "/");
  expect(screen.getByText("프로필 설정")).toBeInTheDocument();
  await userEvent.click(screen.getByTestId("chevron-link"));
  expect(routerMock.pathname).toBe("/");
});
