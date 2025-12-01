import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import Header from "./Header";

afterEach(() => {
  cleanup();
});

test("Header가 정상적으로 렌더링되어야 한다.", async () => {
  render(<Header title="장소 상세" placeId={1} />);
  expect(screen.getByTestId("header")).toBeInTheDocument();
  expect(screen.getByTestId("header-title")).toHaveTextContent("장소 상세");
  expect(screen.getByTestId("header-report-button")).toHaveTextContent("신고");
});
