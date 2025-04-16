import { expect, test } from "vitest";

import { getCategoriesApi } from "./category.server";

test("getCategoriesApi", async () => {
  const response = await getCategoriesApi();
  expect(response).toMatchSnapshot();
});
