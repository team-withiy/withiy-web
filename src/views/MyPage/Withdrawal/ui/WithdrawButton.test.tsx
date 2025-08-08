import { cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";

import { renderWithProviders } from "@/shared/lib/test";

import WithdrawButton from "./WithdrawButton";

const mockReplace = vi.fn();
const mockLogout = vi.fn();
const mockShowAlert = vi.fn();
const mockCloseAlert = vi.fn();
const mockAddToast = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

vi.mock("@/entities/user/hooks/useLogout", () => ({
  default: () => ({
    logout: mockLogout,
  }),
}));

vi.mock("@/shared/ui/Alert/useAlert", () => ({
  default: () => ({
    showAlert: mockShowAlert,
    closeAlert: mockCloseAlert,
  }),
}));

vi.mock("@/shared/ui/Toast", () => ({
  useToast: () => ({
    addToast: mockAddToast,
  }),
}));

vi.mock("../api/actions", () => ({
  withdrawAction: vi.fn(),
}));

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe("WithdrawButton 컴포넌트", () => {
  test("위디 탈퇴하기 버튼이 올바르게 렌더링되어야 한다", async () => {
    renderWithProviders(<WithdrawButton />);

    await waitFor(() => {
      expect(screen.getByTestId("withdraw-button")).toBeInTheDocument();
    });
    const withdrawButton = screen.getByTestId("withdraw-button");
    expect(withdrawButton).toBeInTheDocument();
    expect(withdrawButton).not.toBeDisabled();
  });

  test("버튼을 클릭하면 확인 알림이 표시되어야 한다", async () => {
    const user = userEvent.setup();
    renderWithProviders(<WithdrawButton />);

    const withdrawButton = screen.getByTestId("withdraw-button");
    await user.click(withdrawButton);

    expect(mockShowAlert).toHaveBeenCalledWith({
      uiType: "twoButton",
      title: "정말 탈퇴하시겠어요?",
      content: "위디에서 기록한 추억들이 전부 사라져요",
      confirmText: "탈퇴할게요",
      cancelText: "다시 생각해볼게요",
      onCancel: mockCloseAlert,
      onConfirm: expect.any(Function),
    });
  });

  test("탈퇴가 성공하면 로그아웃 후 홈으로 이동해야 한다", async () => {
    const { withdrawAction } = await import("../api/actions");
    vi.mocked(withdrawAction).mockResolvedValue(undefined);
    mockLogout.mockResolvedValue(undefined);

    const user = userEvent.setup();
    renderWithProviders(<WithdrawButton />);

    const withdrawButton = screen.getByTestId("withdraw-button");
    await user.click(withdrawButton);

    const alertCall = mockShowAlert.mock.calls[0][0];
    await alertCall.onConfirm();

    await waitFor(() => {
      expect(mockCloseAlert).toHaveBeenCalled();
      expect(withdrawAction).toHaveBeenCalled();
      expect(mockLogout).toHaveBeenCalled();
      expect(mockReplace).toHaveBeenCalledWith("/");
    });
  });

  test("알림창에서 취소를 선택하면 알림이 닫혀야 한다", async () => {
    const user = userEvent.setup();
    renderWithProviders(<WithdrawButton />);

    const withdrawButton = screen.getByTestId("withdraw-button");
    await user.click(withdrawButton);

    const alertCall = mockShowAlert.mock.calls[0][0];
    alertCall.onCancel();

    expect(mockCloseAlert).toHaveBeenCalled();
  });

  test("탈퇴 처리 중에는 버튼이 비활성화되어야 한다", async () => {
    const { withdrawAction } = await import("../api/actions");

    let resolveWithdraw: () => void;
    const withdrawPromise = new Promise<undefined>((resolve) => {
      resolveWithdraw = () => resolve(undefined);
    });
    vi.mocked(withdrawAction).mockReturnValue(withdrawPromise);
    mockLogout.mockResolvedValue(undefined);

    const user = userEvent.setup();
    renderWithProviders(<WithdrawButton />);

    const withdrawButton = screen.getByTestId("withdraw-button");
    await user.click(withdrawButton);

    const alertCall = mockShowAlert.mock.calls[0][0];
    alertCall.onConfirm();

    await waitFor(() => {
      expect(withdrawButton).toBeDisabled();
    });

    resolveWithdraw!();

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
      expect(mockReplace).toHaveBeenCalledWith("/");
    });
  });
});
