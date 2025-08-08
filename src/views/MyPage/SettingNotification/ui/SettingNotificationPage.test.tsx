import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import SettingNotificationPage from ".";

vi.mock("./NotificationList", () => ({
  __esModule: true,
  default: () => <div data-testid="notification-list">Notification List</div>,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

test("페이지 기본 구조가 올바르게 렌더링된다", async () => {
  render(<SettingNotificationPage />);

  expect(screen.getByTestId("setting-notification-page")).toBeInTheDocument();

  expect(screen.getByTestId("header")).toBeInTheDocument();

  expect(screen.getByTestId("back-button")).toBeInTheDocument();
  expect(screen.getByTestId("arrow-left-icon")).toBeInTheDocument();

  expect(screen.getByTestId("title")).toBeInTheDocument();
  expect(screen.getByText("알림 설정")).toBeInTheDocument();
});

test("알림 설정 리스트가 올바르게 렌더링된다", async () => {
  render(<SettingNotificationPage />);

  await waitFor(() => {
    expect(screen.getByTestId("notification-list")).toBeInTheDocument();
  });
});
