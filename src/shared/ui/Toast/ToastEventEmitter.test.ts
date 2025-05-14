import { afterEach, beforeEach, expect, Mock, test, vi } from "vitest";

import { TOAST_ACTION_MAPPER } from "./toast.interface";
import { ToastEventEmitter } from "./ToastEventEmitter";

let toastEmitter: ToastEventEmitter;
let mockCallback: Mock;

beforeEach(() => {
  toastEmitter = ToastEventEmitter.getInstance();
  mockCallback = vi.fn();
  toastEmitter.addEventListener(mockCallback);
});

afterEach(() => {
  toastEmitter.removeEventListener(mockCallback);
  vi.resetAllMocks();
});

test("싱글톤 패턴으로 항상 동일한 인스턴스를 반환해야 한다", () => {
  const instance1 = ToastEventEmitter.getInstance();
  const instance2 = ToastEventEmitter.getInstance();

  expect(instance1).toBe(instance2);
});

test("add 메소드 호출 시 ADD_TOAST 액션을 이벤트로 발행해야 한다", () => {
  const toastData = {
    message: "테스트 메시지",
    state: "success" as const,
  };

  toastEmitter.add(toastData);

  expect(mockCallback).toHaveBeenCalledTimes(1);
  expect(mockCallback.mock.calls[0][0].action).toBe(TOAST_ACTION_MAPPER.ADD_TOAST);
  expect(mockCallback.mock.calls[0][0].message).toBe("테스트 메시지");
  expect(mockCallback.mock.calls[0][0].state).toBe("success");
  expect(mockCallback.mock.calls[0][0].id).toMatch(/toast-/);
  expect(mockCallback.mock.calls[0][0].ref).toBeTruthy();
});

test("remove 메소드 호출 시 REMOVE_TOAST 액션을 이벤트로 발행해야 한다", () => {
  const testId = "test-toast-id";

  toastEmitter.remove(testId);

  expect(mockCallback).toHaveBeenCalledTimes(1);
  expect(mockCallback.mock.calls[0][0].action).toBe(TOAST_ACTION_MAPPER.REMOVE_TOAST);
  expect(mockCallback.mock.calls[0][0].id).toBe(testId);
});

test("clear 메소드 호출 시 CLEAR_TOASTS 액션을 이벤트로 발행해야 한다", () => {
  toastEmitter.clear();

  expect(mockCallback).toHaveBeenCalledTimes(1);
  expect(mockCallback.mock.calls[0][0].action).toBe(TOAST_ACTION_MAPPER.CLEAR_TOASTS);
});

test("이벤트 리스너를 추가하고 제거할 수 있어야 한다", () => {
  const testCallback = vi.fn();

  toastEmitter.addEventListener(testCallback);
  toastEmitter.add({ message: "테스트", state: "default" });

  expect(testCallback).toHaveBeenCalledTimes(1);

  toastEmitter.removeEventListener(testCallback);
  toastEmitter.add({ message: "테스트2", state: "default" });

  expect(testCallback).toHaveBeenCalledTimes(1);
});
