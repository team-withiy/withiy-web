import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";

import ProfilePage from "./ProfilePage";

vi.mock("@/shared/ui/Toast", () => ({
  useToast: () => ({
    addToast: vi.fn(),
  }),
}));

vi.mock("../../api/actions", () => ({
  registerAction: vi.fn().mockResolvedValue("회원가입이 완료되었습니다."),
}));

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe("ProfilePage 컴포넌트", () => {
  const mockTermAgreements = {
    "1": true,
    "2": true,
    "3": false,
  };
  const mockOnClickPrev = vi.fn();

  test("프로필 페이지가 올바르게 렌더링되어야 한다", () => {
    render(<ProfilePage termAgreements={mockTermAgreements} onClickPrev={mockOnClickPrev} />);

    expect(screen.getByText("프로필 설정")).toBeInTheDocument();
    expect(screen.getByLabelText("닉네임")).toBeInTheDocument();
    expect(screen.getByText("프로필 만들기")).toBeInTheDocument();
  });

  test("뒤로가기 버튼을 클릭하면 onClickPrev가 호출되어야 한다", async () => {
    const user = userEvent.setup();
    render(<ProfilePage termAgreements={mockTermAgreements} onClickPrev={mockOnClickPrev} />);

    const backButton = screen.getByLabelText("뒤로가기");
    await user.click(backButton);

    expect(mockOnClickPrev).toHaveBeenCalledTimes(1);
  });

  test("닉네임을 입력하지 않으면 버튼이 비활성화되어야 한다", () => {
    render(<ProfilePage termAgreements={mockTermAgreements} onClickPrev={mockOnClickPrev} />);

    const submitButton = screen.getByText("프로필 만들기");
    expect(submitButton).toBeDisabled();
  });

  test("유효하지 않은 닉네임을 입력하면 에러 메시지가 표시되어야 한다", async () => {
    const user = userEvent.setup();
    render(<ProfilePage termAgreements={mockTermAgreements} onClickPrev={mockOnClickPrev} />);

    const nicknameInput = screen.getByLabelText("닉네임");

    await user.type(nicknameInput, "테스트!@#");
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText("한글, 숫자, 영어만 사용할 수 있어요")).toBeInTheDocument();
    });
  });

  test("유효한 닉네임을 입력하면 성공 메시지가 표시되어야 한다", async () => {
    const user = userEvent.setup();
    render(<ProfilePage termAgreements={mockTermAgreements} onClickPrev={mockOnClickPrev} />);

    const nicknameInput = screen.getByLabelText("닉네임");
    await user.type(nicknameInput, "테스트유저");
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText("멋진 닉네임이에요!")).toBeInTheDocument();
    });
  });

  test("유효한 닉네임을 입력했을 때 폼을 제출할 수 있어야 한다", async () => {
    const { registerAction } = await import("../../api/actions");
    const user = userEvent.setup();

    render(<ProfilePage termAgreements={mockTermAgreements} onClickPrev={mockOnClickPrev} />);

    const nicknameInput = screen.getByLabelText("닉네임");
    await user.type(nicknameInput, "테스트유저");
    await user.tab();

    const submitButton = screen.getByText("프로필 만들기");
    expect(submitButton).not.toBeDisabled();

    await user.click(submitButton);

    await waitFor(() => {
      expect(registerAction).toHaveBeenCalledWith({
        termAgreements: mockTermAgreements,
        nickname: "테스트유저",
      });
    });
  });
});
