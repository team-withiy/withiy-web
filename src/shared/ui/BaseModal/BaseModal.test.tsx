import { userEvent } from "@storybook/test";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import BaseModal from "./index";

beforeEach(() => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal");
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  cleanup();
});

test("BaseModal은 isShow=true일 때 내용이 렌더링되어야 한다.", () => {
  render(
    <BaseModal isShow>
      <div data-testid="modal-content">Modal Content</div>
    </BaseModal>,
  );

  const modalContent = screen.getByTestId("modal-content");
  expect(modalContent).toBeInTheDocument();
  expect(modalContent).toHaveTextContent("Modal Content");
});

test("BaseModal은 isShow=false일 때 내용이 렌더링되지 않아야 한다.", () => {
  render(
    <BaseModal isShow={false}>
      <div data-testid="modal-content">Modal Content</div>
    </BaseModal>,
  );

  expect(screen.queryByTestId("modal-content")).not.toBeInTheDocument();
});

test("BaseModal의 onClose 함수는 오버레이 클릭 시 호출되어야 한다.", async () => {
  const handleClose = vi.fn();

  render(
    <BaseModal isShow onClose={handleClose}>
      <div data-testid="modal-content">Modal Content</div>
    </BaseModal>,
  );

  const overlay = screen.getByTestId("overlay");
  await userEvent.click(overlay);
  expect(handleClose).toHaveBeenCalledTimes(1);
});

test("BaseModal의 blockCloseWhenClickOverlay=true일 때 오버레이 클릭 시 onClose가 호출되지 않아야 한다.", async () => {
  const handleClose = vi.fn();

  render(
    <BaseModal isShow onClose={handleClose} blockCloseWhenClickOverlay>
      <div data-testid="modal-content">Modal Content</div>
    </BaseModal>,
  );

  const overlay = screen.getByTestId("overlay");
  await userEvent.click(overlay);
  expect(handleClose).not.toHaveBeenCalledTimes(1);
});

test("BaseModal은 className prop이 적용되어야 한다.", () => {
  render(
    <BaseModal isShow className="custom-class">
      <div data-testid="modal-content">Modal Content</div>
    </BaseModal>,
  );

  const modalPortal = screen.getByTestId("modal");
  expect(modalPortal).toHaveClass("custom-class");
});
