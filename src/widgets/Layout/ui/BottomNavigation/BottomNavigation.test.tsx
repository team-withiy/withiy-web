import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";

import BottomNavigation from "./index";

import styles from "./BottomNavigation.module.scss";

vi.mock("@/features/checkAuthorization/ui/RequireAuthorizationWrapper", () => ({
  default: ({ children }: { children: React.ReactNode; fallback?: React.ReactNode }) => {
    return <>{children}</>;
  },
}));

beforeEach(() => {
  cleanup();
});

test("모든 네비게이션 아이템을 렌더링한다", () => {
  render(<BottomNavigation currentHref="/" />);

  expect(screen.getByTestId("홈-link")).toBeInTheDocument();
  expect(screen.getByTestId("검색-link")).toBeInTheDocument();
  expect(screen.getByTestId("일정-link")).toBeInTheDocument();
  expect(screen.getByTestId("앨범-link")).toBeInTheDocument();
  expect(screen.getByTestId("마이페이지-link")).toBeInTheDocument();
});

test("홈 페이지에서 홈 아이템이 활성화된다", () => {
  render(<BottomNavigation currentHref="/" />);

  const homeLink = screen.getByTestId("홈-link");
  expect(homeLink).toHaveClass(styles.active);
});

test("검색 페이지에서 검색 아이템이 활성화된다", () => {
  render(<BottomNavigation currentHref="/search" />);

  const searchLink = screen.getByTestId("검색-link");
  expect(searchLink).toHaveClass(styles.active);
});

test("일정 페이지에서 일정 아이템이 활성화된다", () => {
  render(<BottomNavigation currentHref="/calendar" />);

  const calendarLink = screen.getByTestId("일정-link");
  expect(calendarLink).toHaveClass(styles.active);
});

test("앨범 페이지에서 앨범 아이템이 활성화된다", () => {
  render(<BottomNavigation currentHref="/albums" />);

  const albumsLink = screen.getByTestId("앨범-link");
  expect(albumsLink).toHaveClass(styles.active);
});

test("마이페이지에서 마이페이지 아이템이 활성화된다", () => {
  render(<BottomNavigation currentHref="/my-page" />);

  const myPageLink = screen.getByTestId("마이페이지-link");
  expect(myPageLink).toHaveClass(styles.active);
});

test("모든 링크가 올바른 href를 가진다", () => {
  render(<BottomNavigation currentHref="/" />);

  expect(screen.getByTestId("홈-link")).toHaveAttribute("href", "/");
  expect(screen.getByTestId("검색-link")).toHaveAttribute("href", "/search");
  expect(screen.getByTestId("일정-link")).toHaveAttribute("href", "/calendar");
  expect(screen.getByTestId("앨범-link")).toHaveAttribute("href", "/albums");
  expect(screen.getByTestId("마이페이지-link")).toHaveAttribute("href", "/my-page");
});

test("accessibility 속성이 올바르게 설정된다", () => {
  render(<BottomNavigation currentHref="/" />);

  const footer = screen.getByRole("contentinfo");
  expect(footer).toHaveAttribute("aria-label", "Bottom navigation");
  expect(footer).toHaveAttribute("data-testid", "bottomNavigation");

  const nav = screen.getByRole("navigation");
  expect(nav).toBeInTheDocument();
});
