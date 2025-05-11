import { expect, test } from "vitest";

import { getTermsApi } from "./term.server";

test("getTermsApi", async () => {
  const response = await getTermsApi();
  expect(response).toMatchSnapshot();
});
