import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";

import BottomNavigation from ".";

import styles from "./BottomNavigation.module.scss";

beforeEach(() => {
  cleanup();
});

test("BottomNavigation이 렌더링되어야 한다", () => {
  render(<BottomNavigation />);
  const bottomNav = screen.getByTestId("bottomNavigation");
  expect(bottomNav).toBeInTheDocument();
});

test("현재 활성화된 메뉴에 active 클래스가 적용되어야 한다", () => {
  vi.mock("next/navigation", () => ({
    useSelectedLayoutSegment: () => null,
  }));

  render(<BottomNavigation />);
  const homeLink = screen.getByTestId("홈").children[0];
  expect(homeLink).toHaveClass(styles.active);
});
