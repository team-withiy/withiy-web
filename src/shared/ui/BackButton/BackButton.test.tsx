import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { renderWithProviders } from "@/shared/lib/test";

import BackButton from ".";

const mockBack = vi.fn();
const mockPush = vi.fn();

const mockLocation = {
  origin: "http://localhost:3000",
  href: "http://localhost:3000/current-page",
};

Object.defineProperty(window, "location", {
  value: mockLocation,
  writable: true,
});

beforeEach(() => {
  mockRouter.back = mockBack;
  mockRouter.push = mockPush;

  Object.defineProperty(document, "referrer", {
    value: "http://localhost:3000/prev-page",
    writable: true,
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  mockPush.mockClear();
  mockBack.mockClear();
});

test("className이 정상적으로 주입되어야 한다.", () => {
  render(<BackButton className="test-class">뒤로가기</BackButton>);
  const button = screen.getByTestId("back-button");
  expect(button).toHaveClass("test-class");
});

test("같은 도메인에서 온 경우 router.back()을 호출해야 한다.", async () => {
  Object.defineProperty(document, "referrer", {
    value: "http://localhost:3000/prev-page",
    writable: true,
  });

  renderWithProviders(<BackButton>뒤로가기</BackButton>);

  const button = screen.getByTestId("back-button");
  await userEvent.click(button);

  expect(mockBack).toHaveBeenCalledTimes(1);
  expect(mockPush).not.toHaveBeenCalled();
});

test("외부 도메인에서 온 경우 fallbackUrl로 이동해야 한다.", async () => {
  Object.defineProperty(document, "referrer", {
    value: "https://external-site.com/some-page",
    writable: true,
  });

  renderWithProviders(<BackButton>뒤로가기</BackButton>);

  const button = screen.getByTestId("back-button");
  await userEvent.click(button);

  expect(mockBack).not.toHaveBeenCalled();
  expect(mockPush).toHaveBeenCalledWith("/");
});

test("referrer가 없는 경우 fallbackUrl로 이동해야 한다.", async () => {
  Object.defineProperty(document, "referrer", {
    value: "",
    writable: true,
  });

  renderWithProviders(<BackButton>뒤로가기</BackButton>);

  const button = screen.getByTestId("back-button");
  await userEvent.click(button);

  expect(mockBack).not.toHaveBeenCalled();
  expect(mockPush).toHaveBeenCalledWith("/");
});

test("커스텀 fallbackUrl을 사용해야 한다.", async () => {
  Object.defineProperty(document, "referrer", {
    value: "",
    writable: true,
  });

  renderWithProviders(<BackButton fallbackUrl="/main">뒤로가기</BackButton>);

  const button = screen.getByTestId("back-button");
  await userEvent.click(button);

  expect(mockBack).not.toHaveBeenCalled();
  expect(mockPush).toHaveBeenCalledWith("/main");
});
