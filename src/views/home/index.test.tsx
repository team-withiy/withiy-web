import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import HomePage from "@/views/home";

async function resolvedComponent(Component, props) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

test("Page", async () => {
  const HomeResolved = await resolvedComponent(HomePage, {});
  render(<HomeResolved />);

  // 비동기 작업이 완료될 때까지 대기
  const heading = await screen.findByRole("heading", { level: 1, name: "Home" });
  const svg = await screen.findByTestId("svg");

  expect(heading).toBeInTheDocument();
  expect(svg).toBeInTheDocument();
});
