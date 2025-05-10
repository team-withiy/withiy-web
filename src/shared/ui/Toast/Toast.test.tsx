import { act, cleanup, render, renderHook, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import Toast from "./Toast";
import useToast from "./useToast";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
  cleanup();
});

test("success 타입의 토스트가 추가되면 화면에 표시되어야 한다", async () => {
  render(<Toast />);

  const { result } = renderHook(() => useToast());
  act(() => {
    result.current.addToast({ message: "성공 메시지", state: "success" });
  });

  vi.advanceTimersByTime(200);

  const toastElement = screen.getByText("성공 메시지");
  expect(toastElement).toBeInTheDocument();
});

test("danger 타입의 토스트가 추가되면 화면에 표시되어야 한다", async () => {
  render(<Toast />);

  const { result } = renderHook(() => useToast());
  act(() => {
    result.current.addToast({ message: "에러 메시지", state: "danger" });
  });

  vi.advanceTimersByTime(200);

  const toastElement = screen.getByText("에러 메시지");
  expect(toastElement).toBeInTheDocument();
});

test("TOAST_MAX_LENGTH를 초과하면 가장 오래된 토스트가 제거되어야 한다", async () => {
  render(<Toast />);

  const { result } = renderHook(() => useToast());
  act(() => {
    result.current.addToast({ message: "오래된 메시지", state: "default" });
    result.current.addToast({ message: "새로운 메시지", state: "success" });
  });

  vi.advanceTimersByTime(200);

  expect(screen.queryByText("오래된 메시지")).not.toBeInTheDocument();
  expect(screen.getByText("새로운 메시지")).toBeInTheDocument();
});
