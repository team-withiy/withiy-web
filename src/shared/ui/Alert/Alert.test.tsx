import { userEvent } from "@storybook/test";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";

import Alert from "./Alert";
import { ALERT_UI_TYPE_MAPPER } from "./alert.interface";
import { AlertEventEmitter } from "./AlertEventEmitter";

beforeEach(() => {
  cleanup();
});

test("초기에는 표시되지 않아야 함", () => {
  render(<Alert />);

  const modal = screen.queryByRole("dialog");
  expect(modal).not.toBeInTheDocument();
});

test("show 이벤트 발생 시 알림이 표시되어야 함", async () => {
  render(<Alert />);

  act(() =>
    AlertEventEmitter.getInstance().show({
      uiType: ALERT_UI_TYPE_MAPPER.TWO_BUTTON,
      title: "테스트 제목",
      content: "테스트 내용",

      confirmText: "확인",
      onConfirm: vi.fn(),
    }),
  );

  await waitFor(() => {
    expect(screen.getByText("테스트 제목")).toBeInTheDocument();
    expect(screen.getByText("테스트 내용")).toBeInTheDocument();
    expect(screen.getByText("확인")).toBeInTheDocument();
  });
});

test("취소 버튼 클릭 시 onCancel 함수가 호출되어야 함", async () => {
  const onCancelMock = vi.fn();

  render(<Alert />);

  act(() => {
    AlertEventEmitter.getInstance().show({
      uiType: ALERT_UI_TYPE_MAPPER.TWO_BUTTON,
      title: "테스트 제목",
      content: "테스트 내용",
      cancelText: "취소",
      confirmText: "확인",
      onCancel: onCancelMock,
      onConfirm: vi.fn(),
    });
  });

  const cancelButton = screen.getByTestId("alert-cancel-button");
  await userEvent.click(cancelButton);

  expect(onCancelMock).toHaveBeenCalledTimes(1);
});

test("확인 버튼 클릭 시 onConfirm 함수가 호출되어야 함", async () => {
  const onConfirmMock = vi.fn();

  render(<Alert />);

  act(() => {
    AlertEventEmitter.getInstance().show({
      uiType: ALERT_UI_TYPE_MAPPER.TWO_BUTTON,
      title: "테스트 제목",
      content: "테스트 내용",
      cancelText: "취소",
      confirmText: "확인",
      onCancel: vi.fn(),
      onConfirm: onConfirmMock,
    });
  });

  const confirmButton = screen.getByTestId("alert-confirm-button");
  await userEvent.click(confirmButton);

  expect(onConfirmMock).toHaveBeenCalledTimes(1);
});

test("close 이벤트 발생 시 알림이 닫혀야 함", async () => {
  render(<Alert />);

  act(() => {
    AlertEventEmitter.getInstance().show({
      uiType: ALERT_UI_TYPE_MAPPER.TWO_BUTTON,
      title: "테스트 제목",
      content: "테스트 내용",
      cancelText: "취소",
      confirmText: "확인",
      onCancel: vi.fn(),
      onConfirm: vi.fn(),
    });
  });

  expect(screen.getByTestId("alert-title")).toBeInTheDocument();

  act(() => AlertEventEmitter.getInstance().close());

  const modal = screen.queryByRole("dialog");
  expect(modal).not.toBeInTheDocument();
});

test("oneButton 타입일 경우 취소 버튼이 표시되지 않아야 함", async () => {
  render(<Alert />);

  act(() => {
    AlertEventEmitter.getInstance().show({
      uiType: ALERT_UI_TYPE_MAPPER.ONE_BUTTON,
      title: "테스트 제목",
      content: "테스트 내용",
      confirmText: "확인",
      onConfirm: vi.fn(),
    });
  });

  await waitFor(() => {
    expect(screen.getByTestId("alert-title")).toHaveTextContent("테스트 제목");
    expect(screen.getByTestId("alert-content")).toHaveTextContent("테스트 내용");
    expect(screen.getByTestId("alert-confirm-button")).toBeInTheDocument();
    expect(screen.queryByTestId("alert-cancel-button")).not.toBeInTheDocument();
  });
});

test("twoButton 타입일 경우 취소 버튼과 확인 버튼이 모두 표시되어야 함", async () => {
  render(<Alert />);

  act(() => {
    AlertEventEmitter.getInstance().show({
      uiType: ALERT_UI_TYPE_MAPPER.TWO_BUTTON,
      title: "테스트 제목",
      content: "테스트 내용",
      cancelText: "취소",
      confirmText: "확인",
      onCancel: vi.fn(),
      onConfirm: vi.fn(),
    });
  });

  await waitFor(() => {
    expect(screen.getByTestId("alert-title")).toHaveTextContent("테스트 제목");
    expect(screen.getByTestId("alert-content")).toHaveTextContent("테스트 내용");
    expect(screen.getByTestId("alert-confirm-button")).toBeInTheDocument();
    expect(screen.getByTestId("alert-cancel-button")).toBeInTheDocument();
  });
});

test("oneButton 타입에서 확인 버튼 클릭 시 onConfirm 함수가 호출되어야 함", async () => {
  const onConfirmMock = vi.fn();

  render(<Alert />);

  act(() => {
    AlertEventEmitter.getInstance().show({
      uiType: ALERT_UI_TYPE_MAPPER.ONE_BUTTON,
      title: "테스트 제목",
      content: "테스트 내용",
      confirmText: "확인",
      onConfirm: onConfirmMock,
    });
  });

  const confirmButton = screen.getByTestId("alert-confirm-button");
  await userEvent.click(confirmButton);

  expect(onConfirmMock).toHaveBeenCalledTimes(1);
});
