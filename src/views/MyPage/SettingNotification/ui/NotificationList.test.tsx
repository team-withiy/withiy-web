import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { isFetchHTTPError } from "@/shared/models/auth/fetchHTTPException";
import { useToast } from "@/shared/ui/Toast";

import NotificationList, { LoadingNotificationList } from "./NotificationList";
import { updateNotificationSettingsAction } from "../api/actions";

vi.mock("../api/actions", () => ({
  updateNotificationSettingsAction: vi.fn(),
}));

vi.mock("@/shared/ui/Toast", () => ({
  useToast: vi.fn(() => ({
    addToast: vi.fn(),
    removeToast: vi.fn(),
    clearToasts: vi.fn(),
  })),
}));

vi.mock("@/shared/models/auth/fetchHTTPException", () => ({
  isFetchHTTPError: vi.fn(),
}));

describe("NotificationList", () => {
  const mockAddToast = vi.fn();
  const mockUpdateNotificationSettingsAction = vi.mocked(updateNotificationSettingsAction);
  const mockIsFetchHTTPError = vi.mocked(isFetchHTTPError);

  const mockNotificationSettings = {
    userId: 1,
    dateNotificationEnabled: true,
    eventNotificationEnabled: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useToast).mockReturnValue({
      addToast: mockAddToast,
      removeToast: vi.fn(),
      clearToasts: vi.fn(),
    });
    mockIsFetchHTTPError.mockReturnValue(false);
  });

  afterEach(() => {
    cleanup();
  });

  test("초기 알림 설정이 올바르게 렌더링된다", () => {
    render(<NotificationList notificationSettings={mockNotificationSettings} />);

    expect(screen.getByTestId("notification-list")).toBeInTheDocument();
    expect(screen.getByText("데이트 알림")).toBeInTheDocument();
    expect(screen.getByText("이벤트 알림")).toBeInTheDocument();

    const dateToggle = screen.getByTestId("date-notification-toggle");
    const eventToggle = screen.getByTestId("event-notification-toggle");

    expect(dateToggle).toBeChecked();
    expect(eventToggle).not.toBeChecked();
  });

  test("데이트 알림 토글을 클릭하면 optimistic update가 동작한다", async () => {
    const user = userEvent.setup();
    const mockApiResponse = {
      status: 200,
      message: "success",
      data: null,
      timestamp: new Date(),
    };
    mockUpdateNotificationSettingsAction.mockResolvedValue(mockApiResponse);

    render(<NotificationList notificationSettings={mockNotificationSettings} />);

    const dateToggle = screen.getByTestId("date-notification-toggle");

    expect(dateToggle).toBeChecked();

    await user.click(dateToggle);

    await waitFor(() => {
      expect(mockUpdateNotificationSettingsAction).toHaveBeenCalledWith({
        dateNotificationEnabled: false,
        eventNotificationEnabled: false,
      });
    });
  });

  test("이벤트 알림 토글을 클릭하면 optimistic update가 동작한다", async () => {
    const user = userEvent.setup();
    const mockApiResponse = {
      status: 200,
      message: "success",
      data: null,
      timestamp: new Date(),
    };
    mockUpdateNotificationSettingsAction.mockResolvedValue(mockApiResponse);

    render(<NotificationList notificationSettings={mockNotificationSettings} />);

    const eventToggle = screen.getByTestId("event-notification-toggle");

    expect(eventToggle).not.toBeChecked();

    await user.click(eventToggle);

    await waitFor(() => {
      expect(mockUpdateNotificationSettingsAction).toHaveBeenCalledWith({
        dateNotificationEnabled: true,
        eventNotificationEnabled: true,
      });
    });
  });

  test("서버 액션 실패 시 에러 토스트가 표시된다", async () => {
    const user = userEvent.setup();
    mockUpdateNotificationSettingsAction.mockRejectedValue(new Error("Server error"));

    render(<NotificationList notificationSettings={mockNotificationSettings} />);

    const dateToggle = screen.getByTestId("date-notification-toggle");

    await user.click(dateToggle);

    await waitFor(() => {
      expect(mockAddToast).toHaveBeenCalledWith({
        message: "알림 설정 업데이트에 실패했습니다.",
        state: "danger",
      });
    });
  });

  test("HTTP 에러 발생 시 에러 메시지가 토스트로 표시된다", async () => {
    const user = userEvent.setup();
    const httpError = {
      message: "네트워크 오류가 발생했습니다.",
      status: 500,
    };

    mockUpdateNotificationSettingsAction.mockRejectedValue(httpError);
    mockIsFetchHTTPError.mockReturnValue(true);

    render(<NotificationList notificationSettings={mockNotificationSettings} />);

    const eventToggle = screen.getByTestId("event-notification-toggle");

    await user.click(eventToggle);

    await waitFor(() => {
      expect(mockAddToast).toHaveBeenCalledWith({
        message: httpError.message,
        state: "danger",
      });
    });
  });
});

describe("LoadingNotificationList", () => {
  afterEach(() => {
    cleanup();
  });

  test("로딩 상태에서 토글이 비활성화된다", () => {
    render(<LoadingNotificationList />);

    expect(screen.getByTestId("loading-notification-list")).toBeInTheDocument();
    expect(screen.getByText("데이트 알림")).toBeInTheDocument();
    expect(screen.getByText("이벤트 알림")).toBeInTheDocument();

    const dateToggle = screen.getByTestId("date-notification-toggle-loading");
    const eventToggle = screen.getByTestId("event-notification-toggle-loading");

    expect(dateToggle).toBeDisabled();
    expect(eventToggle).toBeDisabled();
    expect(dateToggle).not.toBeChecked();
    expect(eventToggle).not.toBeChecked();
  });

  test("로딩 상태에서 토글이 읽기 전용으로 설정된다", () => {
    render(<LoadingNotificationList />);

    const dateToggle = screen.getByTestId("date-notification-toggle-loading");
    const eventToggle = screen.getByTestId("event-notification-toggle-loading");

    expect(dateToggle).toHaveAttribute("readOnly");
    expect(eventToggle).toHaveAttribute("readOnly");
  });
});
