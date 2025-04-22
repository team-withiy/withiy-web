import { expect, test } from "vitest";

import { setOAuthStateRouteHandler } from "./auth.router-handler";

test("setOAuthStateRouteHandler", async () => {
  const response = await setOAuthStateRouteHandler();
  expect(response).toMatchSnapshot();
});
