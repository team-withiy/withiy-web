import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { renderWithProviders } from "@/shared/lib/test";

import BackButton from ".";

// back 메서드를 모킹
const mockBack = vi.fn();

beforeEach(() => {
  // mockRouter에 back 메서드 추가
  mockRouter.back = mockBack.mockImplementation(() => {
    if (mockRouter.asPath === "/next-page") {
      mockRouter.replace("/current-page");
    } else if (mockRouter.asPath === "/current-page") {
      mockRouter.replace("/prev-page");
    }
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

test("className이 정상적으로 주입되어야 한다.", () => {
  render(<BackButton className="test-class">뒤로가기</BackButton>);
  const button = screen.getByTestId("back-button");
  expect(button).toHaveClass("test-class");
});

test("클릭 시 이전 페이지로 이동해야 한다.", async () => {
  mockRouter.setCurrentUrl({ pathname: "/prev-page" });
  await mockRouter.push("/current-page");
  await mockRouter.push("/next-page");
  renderWithProviders(<BackButton>뒤로가기</BackButton>);

  const button = screen.getByTestId("back-button");
  await userEvent.click(button);

  expect(mockRouter.asPath).toBe("/current-page");
});
