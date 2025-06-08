import { expect, test } from "vitest";

import { getMeApi, getUserProfileByCodeApi } from "./user.server";

test("getMeApi", async () => {
  const response = await getMeApi();
  expect(response).toMatchSnapshot();
});

test("getUserProfileByCodeApi", async () => {
  const userCode = "test-user-code";
  const response = await getUserProfileByCodeApi(userCode);
  expect(response).toMatchSnapshot();
});
