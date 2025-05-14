import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import Tooltip from ".";

afterEach(() => {
  cleanup();
});

test("툴팁이 정상적으로 렌더링된다.", () => {
  render(<Tooltip tooltipContent="툴팁 컨텐츠">CHILDREN</Tooltip>);

  const tooltip = screen.getByTestId("tooltip");
  const tooltipContent = screen.getByTestId("tooltip-content");
  expect(tooltip).toBeInTheDocument();
  expect(tooltipContent).toBeInTheDocument();
});

test("툴팁의 좌우 위치를 조정할 수 있다.", () => {
  const { rerender } = render(
    <Tooltip tooltipContent="툴팁 컨텐츠" leftPositionBasedOnTail={100}>
      CHILDREN
    </Tooltip>,
  );

  const tooltipContent = screen.getByTestId("tooltip-content");
  expect(tooltipContent).toHaveStyle({ left: "100px" });

  rerender(
    <Tooltip tooltipContent="툴팁 컨텐츠" leftPositionBasedOnTail="100%">
      CHILDREN
    </Tooltip>,
  );

  expect(tooltipContent).toHaveStyle({ left: "100%" });
});
