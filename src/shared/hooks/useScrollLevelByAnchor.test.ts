import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import useScrollLevelByAnchor from "./useScrollLevelByAnchor";

const mockRequestAnimationFrame = vi.fn();
const mockCancelAnimationFrame = vi.fn();

const createMockRect = (top: number, bottom: number, height: number) => ({
  top,
  bottom,
  height,
  left: 0,
  right: 0,
  width: 0,
  x: 0,
  y: 0,
  toJSON: () => ({}),
});

type MockAddEventListener = typeof window.addEventListener & {
  mock: {
    calls: Array<[string, (...args: unknown[]) => void, unknown]>;
  };
};

beforeEach(() => {
  global.requestAnimationFrame = mockRequestAnimationFrame.mockImplementation((callback) => {
    callback(0);
    return 1;
  });
  global.cancelAnimationFrame = mockCancelAnimationFrame;

  vi.spyOn(window, "addEventListener");
  vi.spyOn(window, "removeEventListener");
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

test("훅이 초기값 0을 반환해야 한다", () => {
  const mockElement = document.createElement("div");
  const mockAnchor = document.createElement("div");

  mockElement.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(100, 300, 200));
  mockAnchor.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(200, 300, 100));

  const { result } = renderHook(() =>
    useScrollLevelByAnchor({
      element: mockElement,
      anchor: mockAnchor,
    }),
  );

  expect(result.current).toBe(0);
});

test("스크롤 이벤트 리스너가 window에 등록되어야 한다", () => {
  const mockElement = document.createElement("div");
  const mockAnchor = document.createElement("div");

  mockElement.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(100, 300, 200));
  mockAnchor.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(200, 300, 100));

  renderHook(() =>
    useScrollLevelByAnchor({
      element: mockElement,
      anchor: mockAnchor,
    }),
  );

  expect(window.addEventListener).toHaveBeenCalledWith("scroll", expect.any(Function), { passive: true });
});

test("컴포넌트 언마운트 시 이벤트 리스너가 제거되어야 한다", () => {
  const mockElement = document.createElement("div");
  const mockAnchor = document.createElement("div");

  mockElement.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(100, 300, 200));
  mockAnchor.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(200, 300, 100));

  const { unmount } = renderHook(() =>
    useScrollLevelByAnchor({
      element: mockElement,
      anchor: mockAnchor,
    }),
  );

  unmount();

  expect(window.removeEventListener).toHaveBeenCalledWith("scroll", expect.any(Function));
  expect(mockCancelAnimationFrame).toHaveBeenCalled();
});

test("element.bottom과 anchor.bottom이 만날 때 스크롤 레벨이 0이어야 한다", () => {
  const mockElement = document.createElement("div");
  const mockAnchor = document.createElement("div");

  mockElement.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(100, 300, 200));
  mockAnchor.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(200, 300, 100));

  const { result } = renderHook(() =>
    useScrollLevelByAnchor({
      element: mockElement,
      anchor: mockAnchor,
    }),
  );

  act(() => {
    const scrollHandler = (window.addEventListener as MockAddEventListener).mock.calls[0][1];
    scrollHandler();
  });

  expect(result.current).toBe(0);
});

test("anchor 위에 있을 때 0을 반환해야 한다", () => {
  const mockElement = document.createElement("div");
  const mockAnchor = document.createElement("div");

  mockElement.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(100, 300, 200));
  mockAnchor.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(300, 400, 100));

  const { result } = renderHook(() =>
    useScrollLevelByAnchor({
      element: mockElement,
      anchor: mockAnchor,
    }),
  );

  act(() => {
    const scrollHandler = (window.addEventListener as MockAddEventListener).mock.calls[0][1];
    scrollHandler();
  });

  expect(result.current).toBe(0);
});

test("스크롤 위치 30%에서 올바른 비율을 반환해야 한다", () => {
  const mockElement = document.createElement("div");
  const mockAnchor = document.createElement("div");

  mockElement.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(160, 360, 200));
  mockAnchor.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(200, 300, 100));

  const { result } = renderHook(() =>
    useScrollLevelByAnchor({
      element: mockElement,
      anchor: mockAnchor,
    }),
  );

  act(() => {
    const scrollHandler = (window.addEventListener as MockAddEventListener).mock.calls[0][1];
    scrollHandler();
  });

  expect(result.current).toBe(30);
});

test("스크롤 위치 50%에서 올바른 비율을 반환해야 한다", () => {
  const mockElement = document.createElement("div");
  const mockAnchor = document.createElement("div");

  mockElement.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(200, 400, 200));
  mockAnchor.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(200, 300, 100));

  const { result } = renderHook(() =>
    useScrollLevelByAnchor({
      element: mockElement,
      anchor: mockAnchor,
    }),
  );

  act(() => {
    const scrollHandler = (window.addEventListener as MockAddEventListener).mock.calls[0][1];
    scrollHandler();
  });

  expect(result.current).toBe(50);
});

test("스크롤 위치 70%에서 올바른 비율을 반환해야 한다", () => {
  const mockElement = document.createElement("div");
  const mockAnchor = document.createElement("div");

  mockElement.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(240, 440, 200));
  mockAnchor.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(200, 300, 100));

  const { result } = renderHook(() =>
    useScrollLevelByAnchor({
      element: mockElement,
      anchor: mockAnchor,
    }),
  );

  act(() => {
    const scrollHandler = (window.addEventListener as MockAddEventListener).mock.calls[0][1];
    scrollHandler();
  });

  expect(result.current).toBe(70);
});

test("스크롤 레벨이 100을 초과하지 않아야 한다", () => {
  const mockElement = document.createElement("div");
  const mockAnchor = document.createElement("div");

  mockElement.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(500, 700, 200));
  mockAnchor.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(200, 300, 100));

  const { result } = renderHook(() =>
    useScrollLevelByAnchor({
      element: mockElement,
      anchor: mockAnchor,
    }),
  );

  act(() => {
    const scrollHandler = (window.addEventListener as MockAddEventListener).mock.calls[0][1];
    scrollHandler();
  });

  expect(result.current).toBe(100);
});

test("스크롤 레벨이 0 미만이 되지 않아야 한다", () => {
  const mockElement = document.createElement("div");
  const mockAnchor = document.createElement("div");

  mockElement.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(150, 250, 100));
  mockAnchor.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(200, 300, 100));

  const { result } = renderHook(() =>
    useScrollLevelByAnchor({
      element: mockElement,
      anchor: mockAnchor,
    }),
  );

  act(() => {
    const scrollHandler = (window.addEventListener as MockAddEventListener).mock.calls[0][1];
    scrollHandler();
  });

  expect(result.current).toBe(0);
});

test("element나 anchor가 null일 때 0을 반환해야 한다", () => {
  const mockRef = { current: null };

  const { result } = renderHook(() =>
    useScrollLevelByAnchor({
      element: mockRef,
      anchor: mockRef,
    }),
  );

  expect(result.current).toBe(0);
});

test("string ID로 element를 찾을 수 있어야 한다", () => {
  const mockElement = document.createElement("div");
  const mockAnchor = document.createElement("div");

  mockElement.id = "test-element";
  mockAnchor.id = "test-anchor";

  mockElement.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(100, 200, 100));
  mockAnchor.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(200, 300, 100));

  vi.spyOn(document, "getElementById").mockImplementation((id) => {
    if (id === "test-element") return mockElement;
    if (id === "test-anchor") return mockAnchor;
    return null;
  });

  const { result } = renderHook(() =>
    useScrollLevelByAnchor({
      element: "test-element",
      anchor: "test-anchor",
    }),
  );

  expect(result.current).toBe(0);
  expect(document.getElementById).toHaveBeenCalledWith("test-element");
  expect(document.getElementById).toHaveBeenCalledWith("test-anchor");
});

test("custom container가 제공되면 해당 container의 스크롤 이벤트를 사용해야 한다", () => {
  const mockElement = document.createElement("div");
  const mockAnchor = document.createElement("div");
  const mockContainer = document.createElement("div");

  mockElement.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(100, 200, 100));
  mockAnchor.getBoundingClientRect = vi.fn().mockReturnValue(createMockRect(200, 300, 100));

  vi.spyOn(mockContainer, "addEventListener");
  vi.spyOn(mockContainer, "removeEventListener");

  renderHook(() =>
    useScrollLevelByAnchor({
      element: mockElement,
      anchor: mockAnchor,
      container: mockContainer,
    }),
  );

  expect(mockContainer.addEventListener).toHaveBeenCalledWith("scroll", expect.any(Function), { passive: true });
});
