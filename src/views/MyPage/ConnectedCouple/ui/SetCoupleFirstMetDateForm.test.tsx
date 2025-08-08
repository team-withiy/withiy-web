import { cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

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

describe("firstMetDate가 null일 때", () => {
  beforeEach(() => {
    vi.mock("@/entities/user/api/user.queries", () => ({
      userQueries: {
        getMe: {
          queryKey: ["getMe"],
          queryFn: vi.fn(() => ({
            data: { data: { couple: { firstMetDate: null, hasCouple: true } } },
            refetch: vi.fn(() => Promise.resolve({ data: { couple: { firstMetDate: null } } })),
          })),
        },
      },
    }));
  });

  test("firstMetDate가 null일 때 정상적으로 렌더링되어야 한다", async () => {
    renderWithProviders(<SetCoupleFirstMetDateForm />);

    await waitFor(() => {
      expect(screen.getByTestId("set-couple-first-met-date-form")).toBeInTheDocument();
      expect(screen.getByText("처음 사랑하게 된 날")).toBeInTheDocument();
      expect(screen.getByTestId("set-couple-first-met-date-button")).toBeInTheDocument();
    });
  });

  test("DatePicker가 정상적으로 작동해야 한다", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SetCoupleFirstMetDateForm />);
    await waitFor(() => expect(screen.getByTestId("date-picker")).toBeInTheDocument());
    await user.click(screen.getByTestId("date-picker"));

    await waitFor(() => {
      expect(screen.getByTestId("date-picker-header")).toBeInTheDocument();
    });
  });

  test("폼 제출 시 올바른 FormData가 전달되어야 한다", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SetCoupleFirstMetDateForm />);

    await waitFor(() => expect(screen.getByTestId("set-couple-first-met-date-button")).toBeInTheDocument());
    await user.click(screen.getByTestId("set-couple-first-met-date-button"));

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

    renderWithProviders(<SetCoupleFirstMetDateForm />);

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

    renderWithProviders(<SetCoupleFirstMetDateForm />);

    await waitFor(() => {
      expect(mockBack).toHaveBeenCalled();
    });
  });

  test("제출 버튼이 클릭 가능한 상태여야 한다", async () => {
    renderWithProviders(<SetCoupleFirstMetDateForm />);

    await waitFor(() => expect(screen.getByTestId("set-couple-first-met-date-button")).toBeInTheDocument());
    expect(screen.getByTestId("set-couple-first-met-date-button")).toBeEnabled();
    expect(screen.getByTestId("set-couple-first-met-date-button")).toHaveAttribute("type", "submit");
    expect(screen.getByTestId("set-couple-first-met-date-button")).toHaveTextContent("커플 정보 저장하기");
  });
});

describe("firstMetDate가 있을 때", () => {
  beforeEach(() => {
    vi.mock("@/entities/user/api/user.queries", () => ({
      userQueries: {
        getMe: {
          queryKey: ["getMe"],
          queryFn: vi.fn(() => ({
            data: { data: { couple: { firstMetDate: "2024-01-01", hasCouple: true } } },
            refetch: vi.fn(() => Promise.resolve({ data: { couple: { firstMetDate: null } } })),
          })),
        },
      },
    }));
  });

  test("firstMetDate가 있을 때 렌더링이 정상적으로 되어야한다.", async () => {
    renderWithProviders(<SetCoupleFirstMetDateForm />);

    await waitFor(() => expect(screen.getByTestId("set-couple-first-met-date-form")).toBeInTheDocument());
  });
});
