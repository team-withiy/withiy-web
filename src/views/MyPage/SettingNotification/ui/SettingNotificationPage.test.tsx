import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { useToast } from "@/shared/ui/Toast";

import SettingNotificationPage from "./index";

vi.mock("../api/actions", () => ({
  updateNotificationSettingsAction: vi.fn(),
}));

vi.mock("@/entities/user/api/user.server", () => ({
  getNotificationSettingsApi: vi.fn().mockResolvedValue({
    data: {
      userId: 1,
      dateNotificationEnabled: true,
      eventNotificationEnabled: false,
    },
  }),
}));

vi.mock("@/shared/ui/Toast", () => ({
  useToast: vi.fn(() => ({
    addToast: vi.fn(),
    removeToast: vi.fn(),
    clearToasts: vi.fn(),
  })),
}));

vi.mock("@/shared/ui/Boundary/FetchBoundary", () => ({
  default: ({ children }: { children: (data: Array<{ data: unknown }>) => React.ReactNode }) => {
    const mockData = {
      userId: 1,
      dateNotificationEnabled: true,
      eventNotificationEnabled: false,
    };
    return <>{children([{ data: mockData }])}</>;
  },
}));

const mockAddToast = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useToast).mockReturnValue({
    addToast: mockAddToast,
    removeToast: vi.fn(),
    clearToasts: vi.fn(),
  });
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
    expect(screen.getByText("데이트 알림")).toBeInTheDocument();
    expect(screen.getByText("이벤트 알림")).toBeInTheDocument();
    expect(screen.getByTestId("date-notification-toggle")).toBeInTheDocument();
    expect(screen.getByTestId("event-notification-toggle")).toBeInTheDocument();
  });
});
test("토글 상태가 초기 데이터에 따라 올바르게 설정된다", async () => {
  render(<SettingNotificationPage />);

  await waitFor(() => {
    const dateToggle = screen.getByTestId("date-notification-toggle");
    const eventToggle = screen.getByTestId("event-notification-toggle");

    expect(dateToggle).toBeChecked();
    expect(eventToggle).not.toBeChecked();
  });
});
