import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";

import GNB from ".";

import styles from "./GNB.module.scss";

beforeEach(() => {
  cleanup();
});

test("로고 이미지가 렌더링되어야 한다", () => {
  render(<GNB />);
  const logoImage = screen.getByTestId("logoImage");
  expect(logoImage).toBeInTheDocument();
});

test("검색 버튼이 렌더링되어야 한다", () => {
  render(<GNB />);
  const searchButton = screen.getByTestId("searchButton");
  expect(searchButton).toBeInTheDocument();
});

test("알림 버튼이 렌더링되어야 한다", () => {
  render(<GNB />);
  const notificationButton = screen.getByTestId("notificationButton");
  expect(notificationButton).toBeInTheDocument();
});

test("헤더로 마크업되어야 한다", () => {
  render(<GNB />);
  const header = screen.getByTestId("GNB");
  expect(header).toBeInTheDocument();
});

test("네비게이션이 있어야 한다", () => {
  render(<GNB />);
  const nav = screen.getByTestId("navigation");
  expect(nav).toBeInTheDocument();
});

test("헤더에 올바른 클래스가 적용되어야 한다", () => {
  render(<GNB />);
  const header = screen.getByTestId("GNB");
  expect(header).toHaveClass(styles.wrapper);
});
