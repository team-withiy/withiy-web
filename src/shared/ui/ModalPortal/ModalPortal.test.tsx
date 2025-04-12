import { userEvent } from "@storybook/test";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import ModalPortal from "./ModalPortal";

beforeEach(() => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal");
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  cleanup();
});

test("모달이 isShow=true일 때 렌더링되어야 한다.", () => {
  render(
    <ModalPortal isShow>
      <div data-testid="modal-content">Modal Content</div>
    </ModalPortal>,
  );

  const modalContent = screen.getByTestId("modal-content");
  expect(modalContent).toBeInTheDocument();
  expect(modalContent).toHaveTextContent("Modal Content");
});

test("모달이 isShow=false일 때 렌더링되지 않아야 한다.", () => {
  render(
    <ModalPortal isShow={false}>
      <div data-testid="modal-content">Modal Content</div>
    </ModalPortal>,
  );

  expect(screen.queryByTestId("modal-content")).not.toBeInTheDocument();
});

test("onClose 함수가 오버레이 클릭 시 호출되어야 한다.", async () => {
  const handleClose = vi.fn();

  render(
    <ModalPortal isShow onClose={handleClose}>
      <div data-testid="modal-content">Modal Content</div>
    </ModalPortal>,
  );

  const overlay = screen.getByTestId("overlay");
  await userEvent.click(overlay);
  expect(handleClose).toHaveBeenCalledTimes(1);
});

test("blockCloseWhenClickOverlay=true일 때 오버레이 클릭 시 onClose가 호출되지 않아야 한다.", async () => {
  const handleClose = vi.fn();

  render(
    <ModalPortal isShow onClose={handleClose} blockCloseWhenClickOverlay>
      <div data-testid="modal-content">Modal Content</div>
    </ModalPortal>,
  );

  const overlay = screen.getByTestId("overlay");
  await userEvent.click(overlay);
  expect(handleClose).not.toHaveBeenCalledTimes(1);
});
