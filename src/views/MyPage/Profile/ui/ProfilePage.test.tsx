import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";

import ProfilePage from "./index";

vi.mock("./UpdateProfileForm", async () => ({
  __esModule: true,
  default: () => (
    <div data-testid="update-profile-form">
      <input data-testid="nickname" />
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
