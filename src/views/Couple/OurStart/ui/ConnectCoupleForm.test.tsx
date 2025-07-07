import { cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";

import { FormActionStatus } from "@/shared/api/common.interface";
import { renderWithProviders } from "@/shared/lib/test";

import ConnectCoupleForm from "./ConnectCoupleForm";

vi.mock("../api/actions", () => ({
  connectCoupleAction: vi.fn(),
}));

const mockAddToast = vi.fn();
vi.mock("@/shared/ui/Toast", () => ({
  useToast: () => ({
    addToast: mockAddToast,
  }),
}));

const mockFormAction = vi.fn();

vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useActionState: vi.fn(() => [{ status: FormActionStatus.Default }, mockFormAction]),
  };
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("ConnectCoupleForm", () => {
  const defaultProps = {
    partnerCode: "test-partner-code",
  };

  test("DatePicker가 정상적으로 작동해야 한다", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ConnectCoupleForm {...defaultProps} />);

    await user.click(screen.getByTestId("date-picker"));

    await waitFor(() => {
      expect(screen.getByTestId("date-picker-header")).toBeInTheDocument();
    });
  });

  test("폼 제출 시 올바른 FormData가 전달되어야 한다", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ConnectCoupleForm {...defaultProps} />);

    const submitButton = screen.getByTestId("connect-couple-button");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockFormAction).toHaveBeenCalledWith(expect.any(FormData));
    });

    const formData = mockFormAction.mock.calls[0][0] as FormData;
    expect(formData.get("partnerCode")).toBe("test-partner-code");
  });

  test("에러 상태일 때 토스트 메시지가 표시되어야 한다", async () => {
    const errorMessage = "커플 연결에 실패했습니다.";

    const { useActionState } = await import("react");
    vi.mocked(useActionState).mockReturnValue([
      { status: FormActionStatus.Error, message: errorMessage },
      mockFormAction,
      true,
    ]);

    renderWithProviders(<ConnectCoupleForm {...defaultProps} />);

    await waitFor(() => {
      expect(mockAddToast).toHaveBeenCalledWith({
        message: errorMessage,
        state: "danger",
      });
    });
  });

  test("partnerCode prop이 올바르게 전달되어야 한다", () => {
    const testPartnerCode = "unique-partner-code";
    renderWithProviders(<ConnectCoupleForm partnerCode={testPartnerCode} />);

    expect(screen.getByTestId("connect-couple-form")).toBeInTheDocument();
  });

  test("제출 버튼이 클릭 가능한 상태여야 한다", () => {
    renderWithProviders(<ConnectCoupleForm {...defaultProps} />);

    const submitButton = screen.getByTestId("connect-couple-button");
    expect(submitButton).toBeEnabled();
    expect(submitButton).toHaveAttribute("type", "submit");
  });
});
