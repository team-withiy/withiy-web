import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";

import { getCategoriesApi } from "../../api/category.server";

import CategoryItem from ".";

beforeEach(() => {
  cleanup();
});

test("카테고리 아이템이 올바르게 렌더링되어야 한다", async () => {
  const categories = await getCategoriesApi();
  const category = categories.data[0];

  render(<CategoryItem category={category} />);

  const categoryLink = screen.getByTestId("category-item");
  const categoryIcon = screen.getByTestId("category-icon");
  const categoryName = screen.getByTestId("category-name");

  expect(categoryLink).toHaveAttribute("href", `/categories/${category.id}`);

  expect(categoryIcon).toHaveAttribute("src");
  expect(categoryIcon).toHaveAttribute("alt", category.name);

  expect(categoryName).toHaveTextContent(category.name);
});

test("추가 클래스명이 적용되어야 한다", async () => {
  const categories = await getCategoriesApi();
  const category = categories.data[0];

  const customClassName = "test-class";
  render(<CategoryItem category={category} className={customClassName} />);

  const categoryLink = screen.getByTestId("category-item");
  expect(categoryLink).toHaveClass(customClassName);
});
