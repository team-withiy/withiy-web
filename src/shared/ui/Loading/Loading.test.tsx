import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import Loading from ".";

test("isShow가 false인 경우 Loading 컴포넌트가 렌더링되지 않는다", () => {
  render(<Loading isShow={false} />);
  const loadingElement = screen.queryByTestId("loading");
  expect(loadingElement).not.toBeInTheDocument();
});

test("isShow가 true인 경우 Loading 컴포넌트가 렌더링된다", () => {
  render(<Loading isShow={true} />);
  const loadingElement = screen.getByTestId("loading");
  const loadingDotFirstElement = screen.getByTestId("loading-dot-first");
  const loadingDotSecondElement = screen.getByTestId("loading-dot-second");
  const loadingDotThirdElement = screen.getByTestId("loading-dot-third");
  expect(loadingElement).toBeInTheDocument();
  expect(loadingDotFirstElement).toBeInTheDocument();
  expect(loadingDotSecondElement).toBeInTheDocument();
  expect(loadingDotThirdElement).toBeInTheDocument();
});
