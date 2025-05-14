import { act, renderHook } from "@testing-library/react";
import { beforeEach, expect, MockInstance, test, vi } from "vitest";

import { ToastEventEmitter } from "./ToastEventEmitter";
import useToast from "./useToast";

let toastEmitterAddSpy: MockInstance;
let toastEmitterRemoveSpy: MockInstance;
let toastEmitterClearSpy: MockInstance;

beforeEach(() => {
  const toastEmitter = ToastEventEmitter.getInstance();
  toastEmitterAddSpy = vi.spyOn(toastEmitter, "add");
  toastEmitterRemoveSpy = vi.spyOn(toastEmitter, "remove");
  toastEmitterClearSpy = vi.spyOn(toastEmitter, "clear");
});

test("addToast 메소드 호출 시 ToastEventEmitter의 add 메소드를 호출해야 한다", () => {
  const { result } = renderHook(() => useToast());
  const toastData = { message: "테스트 메시지", state: "success" as const };

  act(() => {
    result.current.addToast(toastData);
  });

  expect(toastEmitterAddSpy).toHaveBeenCalledTimes(1);
  expect(toastEmitterAddSpy).toHaveBeenCalledWith(toastData);
});

test("removeToast 메소드 호출 시 ToastEventEmitter의 remove 메소드를 호출해야 한다", () => {
  const { result } = renderHook(() => useToast());
  const testId = "test-id";

  act(() => {
    result.current.removeToast(testId);
  });

  expect(toastEmitterRemoveSpy).toHaveBeenCalledTimes(1);
  expect(toastEmitterRemoveSpy).toHaveBeenCalledWith(testId);
});

test("clearToasts 메소드 호출 시 ToastEventEmitter의 clear 메소드를 호출해야 한다", () => {
  const { result } = renderHook(() => useToast());

  act(() => {
    result.current.clearToasts();
  });

  expect(toastEmitterClearSpy).toHaveBeenCalledTimes(1);
});

test("useToast 훅은 동일한 의존성으로 동일한 객체 참조를 반환해야 한다", () => {
  const { result, rerender } = renderHook(() => useToast());
  const firstResult = result.current;

  rerender();
  const secondResult = result.current;

  expect(firstResult).toBe(secondResult);
});
