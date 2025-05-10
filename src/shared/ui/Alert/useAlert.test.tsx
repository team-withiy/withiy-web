import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, MockInstance, test, vi } from "vitest";

import { ALERT_UI_TYPE_MAPPER } from "./alert.interface";
import { AlertEventEmitter } from "./AlertEventEmitter";
import useAlert from "./useAlert";

describe("useAlert", () => {
  let alertEmitterShowSpy: MockInstance;
  let alertEmitterCloseSpy: MockInstance;

  beforeEach(() => {
    const alertEmitter = AlertEventEmitter.getInstance();
    alertEmitterShowSpy = vi.spyOn(alertEmitter, "show");
    alertEmitterCloseSpy = vi.spyOn(alertEmitter, "close");
  });

  test("showAlert 메소드 호출 시 AlertEventEmitter의 show 메소드를 호출해야 한다", () => {
    const { result } = renderHook(() => useAlert());
    const alertData = {
      uiType: ALERT_UI_TYPE_MAPPER.ONE_BUTTON,
      title: "테스트 제목",
      content: "테스트 내용",
      confirmText: "확인",
      onConfirm: vi.fn(),
    };

    act(() => {
      result.current.showAlert(alertData);
    });

    expect(alertEmitterShowSpy).toHaveBeenCalledTimes(1);
    expect(alertEmitterShowSpy).toHaveBeenCalledWith(alertData);
  });

  test("closeAlert 메소드 호출 시 AlertEventEmitter의 close 메소드를 호출해야 한다", () => {
    const { result } = renderHook(() => useAlert());

    act(() => {
      result.current.closeAlert();
    });

    expect(alertEmitterCloseSpy).toHaveBeenCalledTimes(1);
  });

  test("useAlert 훅은 동일한 의존성으로 동일한 객체 참조를 반환해야 한다", () => {
    const { result, rerender } = renderHook(() => useAlert());
    const firstResult = result.current;

    rerender();
    const secondResult = result.current;

    expect(firstResult).toBe(secondResult);
  });
});
