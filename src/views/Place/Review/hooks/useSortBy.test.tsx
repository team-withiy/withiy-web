import { cleanup, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { afterEach, expect, test } from "vitest";

import { PaginationReviewSortBy } from "@/entities/place/api/place.interface";

import { renderWithProviders } from "@/shared/lib/test";

import useSortBy from "./useSortBy";

const TestComponent: React.FC = () => {
  const { sortBy } = useSortBy();
  return <div data-testid="sort-by-value">{sortBy}</div>;
};

afterEach(() => {
  cleanup();
});

test("쿼리 파라미터가 없을 때 기본값은 latest", () => {
  mockRouter.setCurrentUrl("/places/1/reviews");
  renderWithProviders(<TestComponent />);
  expect(screen.getByTestId("sort-by-value")).toHaveTextContent(PaginationReviewSortBy.LATEST);
});

test("sortBy=latest 일 때 latest 반환", () => {
  mockRouter.setCurrentUrl("/places/1/reviews?sortBy=latest");
  renderWithProviders(<TestComponent />);
  expect(screen.getByTestId("sort-by-value")).toHaveTextContent(PaginationReviewSortBy.LATEST);
});

test("sortBy=score 일 때 score 반환", () => {
  mockRouter.setCurrentUrl("/places/1/reviews?sortBy=score");
  renderWithProviders(<TestComponent />);
  expect(screen.getByTestId("sort-by-value")).toHaveTextContent(PaginationReviewSortBy.SCORE);
});

test("알 수 없는 값일 때 latest로 폴백", () => {
  mockRouter.setCurrentUrl("/places/1/reviews?sortBy=unknown");
  renderWithProviders(<TestComponent />);
  expect(screen.getByTestId("sort-by-value")).toHaveTextContent(PaginationReviewSortBy.LATEST);
});
