import { expect, test } from "vitest";

import { getMeApi } from "./user.server";

test("getMeApi", async () => {
  const response = await getMeApi();
  expect(response).toMatchSnapshot();
});
