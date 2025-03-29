import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import HomePage from "@/views/home";

import { resolvePromiseComponent } from "@/shared/lib/test";

test("Page", async () => {
  const HomeResolved = await resolvePromiseComponent(HomePage, {});
  render(<HomeResolved />);

  // 비동기 작업이 완료될 때까지 대기
  const heading = await screen.findByRole("heading", { level: 1, name: "Home" });
  const svg = await screen.findByTestId("svg");

  expect(heading).toBeInTheDocument();
  expect(svg).toBeInTheDocument();
});
