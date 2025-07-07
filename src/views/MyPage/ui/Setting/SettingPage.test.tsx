import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import routerMock from "next-router-mock";
import { afterEach, expect, test } from "vitest";

import { renderWithProviders } from "@/shared/lib/test";

import SettingPage from ".";

afterEach(() => {
  cleanup();
});

test("정상적으로 렌더링되어야 한다.", () => {
  render(<SettingPage />);

  expect(screen.getByTestId("profile-page")).toBeInTheDocument();
  expect(screen.getByTestId("title")).toHaveTextContent("설정");
  expect(screen.getByTestId("arrow-left-icon")).toBeInTheDocument();
  expect(screen.getByTestId("alarm-link")).toBeInTheDocument();
  expect(screen.getByTestId("terms-link")).toBeInTheDocument();
  expect(screen.getByTestId("withdrawal-link")).toBeInTheDocument();
});

test("알림 설정 링크가 올바른 경로로 연결되어야 한다.", async () => {
  routerMock.setCurrentUrl({ pathname: "/my-page/settings" });
  renderWithProviders(<SettingPage />);

  const alarmLink = screen.getByTestId("alarm-link");
  await userEvent.click(alarmLink);
  expect(routerMock.pathname).toBe("/my-page/settings/alarms");
});

test("이용약관 링크가 올바른 경로로 연결되어야 한다.", async () => {
  routerMock.setCurrentUrl({ pathname: "/my-page/settings" });
  renderWithProviders(<SettingPage />);

  const termsLink = screen.getByTestId("terms-link");
  await userEvent.click(termsLink);
  expect(routerMock.pathname).toBe("/my-page/settings/terms");
});

test("회원 탈퇴 링크가 올바른 경로로 연결되어야 한다.", async () => {
  routerMock.setCurrentUrl({ pathname: "/my-page/settings" });
  renderWithProviders(<SettingPage />);

  const withdrawalLink = screen.getByTestId("withdrawal-link");
  await userEvent.click(withdrawalLink);
  expect(routerMock.pathname).toBe("/my-page/settings/withdrawal");
});
