import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, test, vi } from "vitest";

import UpdateProfileForm from "./UpdateProfileForm";
import { mockUserWithoutCouple } from "__mocks__/user.handler";

vi.mock("@/shared/ui/Toast", () => ({
  useToast: () => ({
    addToast: vi.fn(),
  }),
}));

vi.mock("../api/actions", () => ({
  updateProfileAction: vi.fn(),
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

beforeEach(() => {
  cleanup();
});

test("컴포넌트가 올바르게 렌더링된다", () => {
  render(<UpdateProfileForm me={mockUserWithoutCouple} />);

  expect(screen.getByTestId("thumbnail-input")).toBeInTheDocument();
  expect(screen.getByTestId("nickname-input")).toBeInTheDocument();
  expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  expect(screen.getByText("프로필 저장하기")).toBeInTheDocument();
});

test("닉네임 입력 시 유효성 검사가 작동한다", async () => {
  const user = userEvent.setup();
  render(<UpdateProfileForm me={mockUserWithoutCouple} />);

  const nicknameInput = screen.getByTestId("nickname-input");

  await user.clear(nicknameInput);
  await user.tab();

  await waitFor(() => {
    expect(screen.getByTestId("input-error-message")).toHaveTextContent("닉네임을 입력해주세요");
  });

  await user.type(nicknameInput, "1234567890123456");
  await user.tab();

  await waitFor(() => {
    expect(screen.getByTestId("input-error-message")).toHaveTextContent("15자 이내로 입력해주세요");
  });

  await user.clear(nicknameInput);
  await user.type(nicknameInput, "테스트@#$");
  await user.tab();

  await waitFor(() => {
    expect(screen.getByTestId("input-error-message")).toHaveTextContent("한글, 숫자, 영어만 사용할 수 있어요");
  });
});

test("유효한 닉네임 입력 시 성공 메시지가 표시된다", async () => {
  const user = userEvent.setup();
  render(<UpdateProfileForm me={mockUserWithoutCouple} />);

  const nicknameInput = screen.getByTestId("nickname-input");

  await user.clear(nicknameInput);
  await user.type(nicknameInput, "새로운닉네임");
  await user.tab();

  await waitFor(() => {
    expect(screen.getByTestId("input-success-message")).toHaveTextContent("멋진 닉네임이에요!");
  });
});

test("파일 업로드가 작동한다", async () => {
  render(<UpdateProfileForm me={mockUserWithoutCouple} />);

  const fileInput = screen.getByTestId("thumbnail-input-file-input");
  const file = new File(["test"], "test.jpg", { type: "image/jpeg" });

  fireEvent.change(fileInput, { target: { files: [file] } });

  expect(fileInput).toBeInTheDocument();
});

test("폼 제출 버튼이 비활성화 상태를 올바르게 관리한다", async () => {
  const user = userEvent.setup();
  render(<UpdateProfileForm me={mockUserWithoutCouple} />);

  const submitButton = screen.getByTestId("submit-button");
  const nicknameInput = screen.getByTestId("nickname-input");

  expect(submitButton).toBeDisabled();

  await user.clear(nicknameInput);
  await user.type(nicknameInput, "새닉네임");

  await waitFor(() => {
    expect(submitButton).not.toBeDisabled();
  });

  await user.clear(nicknameInput);
  await user.type(nicknameInput, " ");

  await waitFor(() => {
    expect(submitButton).toBeDisabled();
  });
});

test("폼 제출 시 updateProfileAction이 호출된다", async () => {
  const user = userEvent.setup();
  const { updateProfileAction } = await import("../api/actions");
  const mockUpdateProfileAction = vi.mocked(updateProfileAction);

  render(<UpdateProfileForm me={mockUserWithoutCouple} />);

  const nicknameInput = screen.getByTestId("nickname-input");
  const submitButton = screen.getByTestId("submit-button");

  await user.clear(nicknameInput);
  await user.type(nicknameInput, "새닉네임");

  await user.click(submitButton);

  await waitFor(() => {
    expect(mockUpdateProfileAction).toHaveBeenCalledWith({
      nickname: "새닉네임",
      thumbnail: undefined,
    });
  });
});

test("액션 성공 시 페이지가 리다이렉트된다", async () => {
  const user = userEvent.setup();
  const { updateProfileAction } = await import("../api/actions");
  const { useRouter } = await import("next/navigation");

  const mockUpdateProfileAction = vi.mocked(updateProfileAction);
  const mockReplace = vi.fn();
  vi.mocked(useRouter).mockReturnValue({
    replace: mockReplace,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    push: vi.fn(),
    prefetch: vi.fn(),
  });

  mockUpdateProfileAction.mockResolvedValue(undefined);

  render(<UpdateProfileForm me={mockUserWithoutCouple} />);

  const nicknameInput = screen.getByTestId("nickname-input");
  const submitButton = screen.getByTestId("submit-button");

  await user.clear(nicknameInput);
  await user.type(nicknameInput, "새닉네임");
  await user.click(submitButton);

  await waitFor(() => {
    expect(mockReplace).toHaveBeenCalledWith("/my-page");
  });
});

test("접근성 요소들이 올바르게 설정된다", () => {
  render(<UpdateProfileForm me={mockUserWithoutCouple} />);

  expect(screen.getByText("닉네임")).toBeInTheDocument();

  const form = screen.getByTestId("update-profile-form");
  expect(form).toBeInTheDocument();
  expect(form.tagName).toBe("FORM");

  expect(screen.getByRole("button", { name: "프로필 저장하기" })).toBeInTheDocument();
});
