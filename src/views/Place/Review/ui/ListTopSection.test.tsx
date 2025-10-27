import { cleanup, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { afterEach, expect, test } from "vitest";

import { PaginationReviewSortBy } from "@/entities/place/api/place.interface";

import { renderWithProviders } from "@/shared/lib/test";

import ListTopSection from "./ListTopSection";

afterEach(() => {
  cleanup();
  mockRouter.setCurrentUrl("/");
});

test("총 개수와 기본 정렬(최신순)을 표시한다", () => {
  renderWithProviders(<ListTopSection total={12} />);

  expect(screen.getByText("전체 12개")).toBeInTheDocument();

  expect(screen.getByRole("button", { name: /최신순/ })).toBeInTheDocument();
});

test("URL 쿼리 sortBy=score 이면 추천순을 표시한다", () => {
  mockRouter.setCurrentUrl(`/?sortBy=${PaginationReviewSortBy.SCORE}`);

  renderWithProviders(<ListTopSection total={3} />);

  expect(screen.getByText("전체 3개")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /추천순/ })).toBeInTheDocument();
});

test("정렬 버튼을 클릭하면 정렬 바텀시트를 연다", async () => {
  const user = userEvent.setup();
  renderWithProviders(<ListTopSection total={5} />);

  expect(screen.queryByText("추천순")).not.toBeInTheDocument();

  await user.click(screen.getByTestId("sort-by-bottom-sheet-button"));

  expect(screen.getByText("추천순")).toBeInTheDocument();
});
