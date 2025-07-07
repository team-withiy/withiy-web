import { cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";

import { FormActionStatus } from "@/shared/api/common.interface";
import { renderWithProviders } from "@/shared/lib/test";

import SetCoupleFirstMetDateForm from "./SetCoupleFirstMetDateForm";

vi.mock("../api/actions", () => ({
  setFirstMetDateAction: vi.fn(),
}));

const mockAddToast = vi.fn();

vi.mock("@/shared/ui/Toast", () => ({
  useToast: () => ({
    addToast: mockAddToast,
  }),
}));

const mockBack = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
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

test("firstMetDate가 null일 때 정상적으로 렌더링되어야 한다", () => {
  renderWithProviders(<SetCoupleFirstMetDateForm firstMetDate={null} />);

  expect(screen.getByTestId("set-couple-first-met-date-form")).toBeInTheDocument();
  expect(screen.getByText("처음 사랑하게 된 날")).toBeInTheDocument();
  expect(screen.getByTestId("set-couple-first-met-date-button")).toBeInTheDocument();
});

test("firstMetDate가 있을 때 초기값이 설정되어야 한다", () => {
  const testDate = "2024-01-01";
  renderWithProviders(<SetCoupleFirstMetDateForm firstMetDate={testDate} />);

  expect(screen.getByTestId("set-couple-first-met-date-form")).toBeInTheDocument();
});

test("DatePicker가 정상적으로 작동해야 한다", async () => {
  const user = userEvent.setup();
  renderWithProviders(<SetCoupleFirstMetDateForm firstMetDate={null} />);

  await user.click(screen.getByTestId("date-picker"));

  await waitFor(() => {
    expect(screen.getByTestId("date-picker-header")).toBeInTheDocument();
  });
});

test("폼 제출 시 올바른 FormData가 전달되어야 한다", async () => {
  const user = userEvent.setup();
  renderWithProviders(<SetCoupleFirstMetDateForm firstMetDate={null} />);

  const submitButton = screen.getByTestId("set-couple-first-met-date-button");
  await user.click(submitButton);

  await waitFor(() => {
    expect(mockFormAction).toHaveBeenCalledWith(expect.any(FormData));
  });
});

test("에러 상태일 때 토스트 메시지가 표시되어야 한다", async () => {
  const errorMessage = "처음 만난 날 저장에 실패했습니다.";

  const { useActionState } = await import("react");
  vi.mocked(useActionState).mockReturnValue([
    { status: FormActionStatus.Error, message: errorMessage },
    mockFormAction,
    true,
  ]);

  renderWithProviders(<SetCoupleFirstMetDateForm firstMetDate={null} />);

  await waitFor(() => {
    expect(mockAddToast).toHaveBeenCalledWith({
      message: errorMessage,
      state: "danger",
    });
  });
});

test("성공 상태일 때 뒤로가기가 실행되어야 한다", async () => {
  const { useActionState } = await import("react");
  vi.mocked(useActionState).mockReturnValue([{ status: FormActionStatus.Success }, mockFormAction, true]);

  renderWithProviders(<SetCoupleFirstMetDateForm firstMetDate={null} />);

  await waitFor(() => {
    expect(mockBack).toHaveBeenCalled();
  });
});

test("제출 버튼이 클릭 가능한 상태여야 한다", () => {
  renderWithProviders(<SetCoupleFirstMetDateForm firstMetDate={null} />);

  const submitButton = screen.getByTestId("set-couple-first-met-date-button");
  expect(submitButton).toBeEnabled();
  expect(submitButton).toHaveAttribute("type", "submit");
  expect(submitButton).toHaveTextContent("커플 정보 저장하기");
});

test("DatePicker에 full prop이 전달되어야 한다", () => {
  renderWithProviders(<SetCoupleFirstMetDateForm firstMetDate={null} />);

  const datePicker = screen.getByTestId("date-picker");
  expect(datePicker).toBeInTheDocument();
});

test("기존 날짜가 있을 때 올바른 형식으로 파싱되어야 한다", () => {
  const testDate = "2024-12-25";
  renderWithProviders(<SetCoupleFirstMetDateForm firstMetDate={testDate} />);

  expect(screen.getByTestId("set-couple-first-met-date-form")).toBeInTheDocument();
});
