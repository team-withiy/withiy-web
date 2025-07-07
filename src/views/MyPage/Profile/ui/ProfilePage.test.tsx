import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";

import type { UserDTO } from "@/entities/user/api/user.interface";

import { mockUserWithoutCouple } from "__mocks__/user.handler";

import ProfilePage from "./index";

vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    Suspense: ({ children }: { children: React.ReactNode }) => children,
  };
});

vi.mock("@/shared/ui/FetchBoundary", () => ({
  default: ({ children }: { children: (data: Array<{ data: UserDTO }>) => React.ReactNode }) => {
    return children([{ data: mockUserWithoutCouple }]);
  },
}));

vi.mock("./UpdateProfileForm", async () => ({
  ...(await vi.importActual("./UpdateProfileForm")),
  default: ({ me }: { me: UserDTO }) => (
    <div data-testid="update-profile-form">
      <p data-testid="nickname">닉네임: {me.nickname}</p>
    </div>
  ),
}));

afterEach(() => {
  cleanup();
});

test("페이지가 올바르게 렌더링된다", () => {
  render(<ProfilePage />);

  expect(screen.getByTestId("header")).toBeInTheDocument();
  expect(screen.getByTestId("back-button")).toBeInTheDocument();
  expect(screen.getByTestId("arrow-left-icon")).toBeInTheDocument();
  expect(screen.getByTestId("title")).toHaveTextContent("프로필 설정");
});

test("UpdateProfileForm이 모킹된 사용자 데이터와 함께 렌더링된다", () => {
  render(<ProfilePage />);

  const updateProfileForm = screen.getByTestId("update-profile-form");
  expect(updateProfileForm).toBeInTheDocument();

  expect(screen.getByTestId("nickname")).toBeInTheDocument();
});

test("FetchBoundary가 사용자 데이터를 올바르게 전달한다", () => {
  render(<ProfilePage />);

  expect(screen.getByTestId("update-profile-form")).toBeInTheDocument();
});
