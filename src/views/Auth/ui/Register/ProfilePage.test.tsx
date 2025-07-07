import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";

import ProfilePage from "./ProfilePage";

const mockAddToast = vi.fn();
const mockReplace = vi.fn();

vi.mock("@/shared/ui/Toast", () => ({
  useToast: () => ({
    addToast: mockAddToast,
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

vi.mock("../../api/actions", () => ({
  registerAction: vi.fn(),
}));

vi.mock("@/entities/user/ui/ThumbnailInput", () => ({
  default: ({
    defaultValue,
    onDrop,
    className,
    "data-testid": testId,
  }: {
    defaultValue: string;
    onDrop: (files: File[]) => void;
    className: string;
    "data-testid"?: string;
  }) => (
    <div data-testid={testId} className={className}>
      <p data-testid={`${testId}-current-thumbnail`}>현재 썸네일: {defaultValue}</p>
      <input
        type="file"
        data-testid={`${testId}-file-input`}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onDrop([file]);
        }}
      />
    </div>
  ),
}));

vi.mock("next/image");

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

const mockTermAgreements = {
  "1": true,
  "2": true,
  "3": false,
};
const mockOnClickPrev = vi.fn();

test("프로필 페이지가 올바르게 렌더링되어야 한다", () => {
  render(<ProfilePage termAgreements={mockTermAgreements} onClickPrev={mockOnClickPrev} />);

  expect(screen.getByText("프로필 설정")).toBeInTheDocument();
  expect(screen.getByTestId("nickname-input")).toBeInTheDocument();
  expect(screen.getByTestId("thumbnail-input")).toBeInTheDocument();
  expect(screen.getByTestId("profile-submit-button")).toBeInTheDocument();
  expect(screen.getByTestId("profile-form")).toBeInTheDocument();
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

  const submitButton = screen.getByTestId("profile-submit-button");
  expect(submitButton).toBeDisabled();
});

test("유효하지 않은 닉네임을 입력하면 에러 메시지가 표시되어야 한다", async () => {
  const user = userEvent.setup();
  render(<ProfilePage termAgreements={mockTermAgreements} onClickPrev={mockOnClickPrev} />);

  const nicknameInput = screen.getByTestId("nickname-input");

  await user.type(nicknameInput, "테스트!@#");
  await user.tab();

  await waitFor(() => {
    expect(screen.getByText("한글, 숫자, 영어만 사용할 수 있어요")).toBeInTheDocument();
  });
});

test("너무 긴 닉네임을 입력하면 에러 메시지가 표시되어야 한다", async () => {
  const user = userEvent.setup();
  render(<ProfilePage termAgreements={mockTermAgreements} onClickPrev={mockOnClickPrev} />);

  const nicknameInput = screen.getByTestId("nickname-input");
  await user.type(nicknameInput, "열여섯글자가넘는매우긴닉네임입니다");
  await user.tab();

  await waitFor(() => {
    expect(screen.getByText("15자 이내로 입력해주세요")).toBeInTheDocument();
  });
});

test("유효한 닉네임을 입력하면 성공 메시지가 표시되어야 한다", async () => {
  const user = userEvent.setup();
  render(<ProfilePage termAgreements={mockTermAgreements} onClickPrev={mockOnClickPrev} />);

  const nicknameInput = screen.getByTestId("nickname-input");
  await user.type(nicknameInput, "테스트유저");
  await user.tab();

  await waitFor(() => {
    expect(screen.getByText("멋진 닉네임이에요!")).toBeInTheDocument();
  });
});

test("유효한 닉네임을 입력했을 때 폼을 제출할 수 있어야 한다", async () => {
  const { registerAction } = await import("../../api/actions");
  vi.mocked(registerAction).mockResolvedValue(undefined);

  const user = userEvent.setup();
  render(<ProfilePage termAgreements={mockTermAgreements} onClickPrev={mockOnClickPrev} />);

  const nicknameInput = screen.getByTestId("nickname-input");
  await user.type(nicknameInput, "테스트유저");
  await user.tab();

  const submitButton = screen.getByTestId("profile-submit-button");
  expect(submitButton).not.toBeDisabled();

  await user.click(submitButton);

  await waitFor(() => {
    expect(registerAction).toHaveBeenCalledWith({
      termAgreements: mockTermAgreements,
      nickname: "테스트유저",
    });
    expect(mockReplace).toHaveBeenCalledWith("/couples/invite");
  });
});

test("registerAction이 에러를 반환하면 토스트 메시지가 표시되어야 한다", async () => {
  const { registerAction } = await import("../../api/actions");
  const errorMessage = "닉네임이 이미 사용 중입니다";
  vi.mocked(registerAction).mockResolvedValue(errorMessage);

  const user = userEvent.setup();
  render(<ProfilePage termAgreements={mockTermAgreements} onClickPrev={mockOnClickPrev} />);

  const nicknameInput = screen.getByTestId("nickname-input");
  await user.type(nicknameInput, "테스트유저");

  const submitButton = screen.getByTestId("profile-submit-button");
  await user.click(submitButton);

  await waitFor(() => {
    expect(mockAddToast).toHaveBeenCalledWith({
      message: errorMessage,
      state: "danger",
    });
    expect(mockReplace).not.toHaveBeenCalled();
  });
});

test("썸네일 이미지와 함께 폼을 제출할 수 있어야 한다", async () => {
  const { registerAction } = await import("../../api/actions");
  vi.mocked(registerAction).mockResolvedValue(undefined);

  const user = userEvent.setup();
  render(<ProfilePage termAgreements={mockTermAgreements} onClickPrev={mockOnClickPrev} />);

  const nicknameInput = screen.getByTestId("nickname-input");
  await user.type(nicknameInput, "테스트유저");

  const file = new File(["test"], "test.jpg", { type: "image/jpeg" });
  const thumbnailInput = screen.getByTestId("thumbnail-input");

  const fileInput = thumbnailInput.querySelector('input[type="file"]') as HTMLInputElement;
  if (fileInput) {
    await user.upload(fileInput, file);
  }

  const submitButton = screen.getByTestId("profile-submit-button");
  await user.click(submitButton);

  await waitFor(() => {
    expect(registerAction).toHaveBeenCalledWith({
      termAgreements: mockTermAgreements,
      nickname: "테스트유저",
      thumbnail: file,
    });
  });
});
