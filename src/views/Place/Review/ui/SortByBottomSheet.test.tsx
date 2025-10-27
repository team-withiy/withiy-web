import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { afterEach, expect, test, vi } from "vitest";

import { PaginationReviewSortBy } from "@/entities/place/api/place.interface";

import SortByBottomSheet from "./SortByBottomSheet";

afterEach(() => {
  cleanup();
  mockRouter.setCurrentUrl("/");
});

test("isShow=true이면 정렬 옵션 두 개가 보인다", () => {
  render(<SortByBottomSheet isShow onClose={() => {}} />);

  expect(screen.getByText("최신순")).toBeInTheDocument();
  expect(screen.getByText("추천순")).toBeInTheDocument();
});

test("현재 정렬이 score일 때에도 두 옵션이 표시된다", () => {
  mockRouter.setCurrentUrl(`/?sortBy=${PaginationReviewSortBy.SCORE}`);
  render(<SortByBottomSheet isShow onClose={() => {}} />);

  expect(screen.getByText("최신순")).toBeInTheDocument();
  expect(screen.getByText("추천순")).toBeInTheDocument();
});

test("옵션을 클릭하면 URL 쿼리가 변경되고 onClose가 호출된다", async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();
  mockRouter.setCurrentUrl("/places/1/reviews");

  render(<SortByBottomSheet isShow onClose={onClose} />);

  await user.click(screen.getByRole("button", { name: "추천순" }));

  expect(onClose).toHaveBeenCalled();

  expect(mockRouter).toMatchObject({
    query: { sortBy: PaginationReviewSortBy.SCORE },
  });
});
