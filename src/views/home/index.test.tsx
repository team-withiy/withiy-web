import { render } from "@testing-library/react";
import { test } from "vitest";

import HomePage from "@/views/home";

import { resolvePromiseComponent } from "@/shared/lib/test";

test("Page", async () => {
  const HomeResolved = await resolvePromiseComponent(HomePage, {});
  render(<HomeResolved />);
});
