import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import BaseBottomSheet from ".";

beforeEach(() => {
  const bottomSheetRoot = document.createElement("div");
  bottomSheetRoot.setAttribute("id", "bottom-sheet");
  document.body.appendChild(bottomSheetRoot);
});

afterEach(() => {
  cleanup();
});

test("BaseBottomSheet은 isShow=true일 때 내용이 렌더링되어야 한다.", () => {
  render(
    <BaseBottomSheet isShow>
      <div data-testid="bottom-sheet-content">Bottom Sheet Content</div>
    </BaseBottomSheet>,
  );

  const bottomSheetContent = screen.getByTestId("bottom-sheet-content");
  expect(bottomSheetContent).toBeInTheDocument();
  expect(bottomSheetContent).toHaveTextContent("Bottom Sheet Content");
});

test("BaseBottomSheet은 isShow=false일 때 내용이 렌더링되지 않아야 한다.", () => {
  render(
    <BaseBottomSheet isShow={false}>
      <div data-testid="bottom-sheet-content">Bottom Sheet Content</div>
    </BaseBottomSheet>,
  );

  expect(screen.queryByTestId("bottom-sheet-content")).not.toBeInTheDocument();
});

test("BaseBottomSheet의 onClose 함수는 오버레이 클릭 시 호출되어야 한다.", async () => {
  const handleClose = vi.fn();

  render(
    <BaseBottomSheet isShow onClose={handleClose}>
      <div data-testid="bottom-sheet-content">Bottom Sheet Content</div>
    </BaseBottomSheet>,
  );

  const overlay = screen.getByTestId("overlay");
  await userEvent.click(overlay);
  expect(handleClose).toHaveBeenCalledTimes(1);
});

test("BaseBottomSheet의 blockCloseWhenClickOverlay=true일 때 오버레이 클릭 시 onClose가 호출되지 않아야 한다.", async () => {
  const handleClose = vi.fn();

  render(
    <BaseBottomSheet isShow onClose={handleClose} blockCloseWhenClickOverlay>
      <div data-testid="bottom-sheet-content">Bottom Sheet Content</div>
    </BaseBottomSheet>,
  );

  const overlay = screen.getByTestId("overlay");
  await userEvent.click(overlay);
  expect(handleClose).not.toHaveBeenCalledTimes(1);
});

test("BaseBottomSheet은 className prop이 적용되어야 한다.", () => {
  render(
    <BaseBottomSheet isShow className="custom-class">
      <div data-testid="bottom-sheet-content">Bottom Sheet Content</div>
    </BaseBottomSheet>,
  );

  const bottomSheet = screen.getByTestId("bottom-sheet");
  expect(bottomSheet).toHaveClass("custom-class");
});
