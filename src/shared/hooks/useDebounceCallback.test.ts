import { renderHook } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import useDebounceCallback from "./useDebounceCallback";

test("콜백을 지정된 딜레이 이후에 실행해야 함", async () => {
  vi.useFakeTimers();

  const callback = vi.fn();
  const { result } = renderHook(() => useDebounceCallback(callback, 500));

  result.current("test");

  expect(callback).not.toHaveBeenCalled();

  vi.advanceTimersByTime(499);

  expect(callback).not.toHaveBeenCalled();

  vi.advanceTimersByTime(1);

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith("test");

  vi.useRealTimers();
});

test("연속 호출시 마지막 호출만 실행되어야 함", async () => {
  vi.useFakeTimers();

  const callback = vi.fn();
  const { result } = renderHook(() => useDebounceCallback(callback, 500));

  result.current("first");
  result.current("second");
  result.current("third");

  expect(callback).not.toHaveBeenCalled();

  vi.advanceTimersByTime(500);

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith("third");

  vi.useRealTimers();
});

test("delay가 변경되면 새로운 debounce 함수가 생성되어야 함", () => {
  const callback = vi.fn();
  const { result, rerender } = renderHook(({ delay }) => useDebounceCallback(callback, delay), {
    initialProps: { delay: 500 },
  });

  const firstDebouncedFn = result.current;

  rerender({ delay: 1000 });

  expect(result.current).not.toBe(firstDebouncedFn);
});
