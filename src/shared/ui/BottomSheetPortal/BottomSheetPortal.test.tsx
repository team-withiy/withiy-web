import { userEvent } from "@storybook/test";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import BottomSheetPortal from "./BottomSheetPortal";

beforeEach(() => {
  const bottomSheetRoot = document.createElement("div");
  bottomSheetRoot.setAttribute("id", "bottom-sheet");
  document.body.appendChild(bottomSheetRoot);
});

afterEach(() => {
  cleanup();
});

test("바텀시트가 isShow=true일 때 렌더링되어야 한다.", () => {
  render(
    <BottomSheetPortal isShow>
      <div data-testid="bottom-sheet-content">BottomSheetContent</div>
    </BottomSheetPortal>,
  );

  const modalContent = screen.getByTestId("bottom-sheet-content");
  expect(modalContent).toBeInTheDocument();
  expect(modalContent).toHaveTextContent("BottomSheetContent");
});

test("바텀시트가 isShow=false일 때 렌더링되지 않아야 한다.", () => {
  render(
    <BottomSheetPortal isShow={false}>
      <div data-testid="bottom-sheet-content">BottomSheetContent</div>
    </BottomSheetPortal>,
  );

  expect(screen.queryByTestId("bottom-sheet-content")).not.toBeInTheDocument();
});

test("onClose 함수가 오버레이 클릭 시 호출되어야 한다.", async () => {
  const handleClose = vi.fn();

  render(
    <BottomSheetPortal isShow onClose={handleClose}>
      <div data-testid="bottom-sheet-content">BottomSheetContent</div>
    </BottomSheetPortal>,
  );

  const overlay = screen.getByTestId("overlay");
  await userEvent.click(overlay);
  expect(handleClose).toHaveBeenCalledTimes(1);
});

test("blockCloseWhenClickOverlay=true일 때 오버레이 클릭 시 onClose가 호출되지 않아야 한다.", async () => {
  const handleClose = vi.fn();

  render(
    <BottomSheetPortal isShow onClose={handleClose} blockCloseWhenClickOverlay>
      <div data-testid="bottom-sheet-content">BottomSheetContent</div>
    </BottomSheetPortal>,
  );

  const overlay = screen.getByTestId("overlay");
  await userEvent.click(overlay);
  expect(handleClose).not.toHaveBeenCalledTimes(1);
});
