import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import HomePage from "@/views/home";

test("Page", () => {
  render(<HomePage />);
  expect(screen.getByRole("heading", { level: 1, name: "Home" })).toBeDefined();
  expect(screen.getByTestId("svg")).toBeDefined();
});
