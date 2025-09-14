import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import routerMock from "next-router-mock";
import { afterEach, expect, test } from "vitest";

import { renderWithProviders } from "@/shared/lib/test";

import TabBar from "./TabBar";
import { BookmarkTab } from "../lib/tab";

import styles from "./TabBar.module.scss";

afterEach(() => {
  cleanup();
});

test("정상적으로 렌더링이 되어야 한다.", () => {
  render(<TabBar />);
  expect(screen.getByTestId("bookmark-page-tab-bar")).toBeInTheDocument();
  expect(screen.getByTestId("bookmark-page-tab-bar-places-tab")).toBeInTheDocument();
  expect(screen.getByTestId("bookmark-page-tab-bar-courses-tab")).toBeInTheDocument();
});

test("탭을 클릭할 시 queryParamter가 변경되어야 한다.", async () => {
  renderWithProviders(<TabBar />);
  routerMock.setCurrentUrl("/my-page/bookmarks");

  await userEvent.click(screen.getByTestId("bookmark-page-tab-bar-courses-tab"));
  expect(routerMock.asPath).toBe(`/my-page/bookmarks?tab=${BookmarkTab.COURSES}`);

  await userEvent.click(screen.getByTestId("bookmark-page-tab-bar-places-tab"));
  expect(routerMock.asPath).toBe(`/my-page/bookmarks?tab=${BookmarkTab.PLACES}`);
});

test("탭을 클릭할 시 해당 탭이 활성화 되어야 한다.", async () => {
  renderWithProviders(<TabBar />);
  routerMock.setCurrentUrl("/my-page/bookmarks");
  expect(screen.getByTestId("bookmark-page-tab-bar-places-tab")).toHaveClass(styles.active);
  expect(screen.getByTestId("bookmark-page-tab-bar-courses-tab")).not.toHaveClass(styles.active);

  await userEvent.click(screen.getByTestId("bookmark-page-tab-bar-courses-tab"));
  expect(screen.getByTestId("bookmark-page-tab-bar-places-tab")).not.toHaveClass(styles.active);
  expect(screen.getByTestId("bookmark-page-tab-bar-courses-tab")).toHaveClass(styles.active);

  await userEvent.click(screen.getByTestId("bookmark-page-tab-bar-places-tab"));
  expect(screen.getByTestId("bookmark-page-tab-bar-places-tab")).toHaveClass(styles.active);
  expect(screen.getByTestId("bookmark-page-tab-bar-courses-tab")).not.toHaveClass(styles.active);
});
