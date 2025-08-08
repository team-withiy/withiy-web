import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";

import { renderWithProviders } from "@/shared/lib/test";

import LogoutButton from "./LogoutButton";

const showAlertMock = vi.fn();
const closeAlertMock = vi.fn();

vi.mock("@/shared/ui/Alert/useAlert", () => ({
  __esModule: true,
  default: () => ({
    showAlert: showAlertMock,
    closeAlert: closeAlertMock,
  }),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

test("로그아웃 버튼이 정상적으로 렌더링되어야 한다.", () => {
  renderWithProviders(<LogoutButton />);

  const logoutButton = screen.getByTestId("logout-button");
  expect(logoutButton).toBeInTheDocument();
  expect(logoutButton).toHaveTextContent("로그아웃");
});

test("로그아웃 버튼 클릭 시 alert가 표시되어야 한다.", async () => {
  renderWithProviders(<LogoutButton />);

  const logoutButton = screen.getByTestId("logout-button");
  await userEvent.click(logoutButton);

  expect(showAlertMock).toHaveBeenCalledWith({
    uiType: "twoButton",
    title: "정말 로그아웃할까요?",
    content: "위디는 언제든 기다리고 있을게요!",
    confirmText: "로그아웃할게요",
    cancelText: "다시 생각해볼게요",
    onConfirm: expect.any(Function),
    onCancel: expect.any(Function),
  });
});
