import { afterEach, beforeEach, describe, expect, Mock, test, vi } from "vitest";

import { ALERT_ACTION_MAPPER, ALERT_UI_TYPE_MAPPER } from "./alert.interface";
import { AlertEventEmitter } from "./AlertEventEmitter";

describe("AlertEventEmitter", () => {
  let alertEmitter: AlertEventEmitter;
  let mockCallback: Mock;

  beforeEach(() => {
    alertEmitter = AlertEventEmitter.getInstance();
    mockCallback = vi.fn();
    alertEmitter.addEventListener(mockCallback);
  });

  afterEach(() => {
    alertEmitter.removeEventListener(mockCallback);
    vi.resetAllMocks();
  });

  test("싱글톤 패턴으로 항상 동일한 인스턴스를 반환해야 한다", () => {
    const instance1 = AlertEventEmitter.getInstance();
    const instance2 = AlertEventEmitter.getInstance();

    expect(instance1).toBe(instance2);
  });

  test("oneButton 알림 show 메소드 호출 시 SHOW_ONE_BUTTON_ALERT 액션을 이벤트로 발행해야 한다", () => {
    const alertData = {
      uiType: ALERT_UI_TYPE_MAPPER.ONE_BUTTON,
      title: "테스트 제목",
      content: "테스트 내용",
      confirmText: "확인",
      onConfirm: vi.fn(),
    };

    alertEmitter.show(alertData);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback.mock.calls[0][0].action).toBe(ALERT_ACTION_MAPPER.SHOW_ONE_BUTTON_ALERT);
    expect(mockCallback.mock.calls[0][0].title).toBe("테스트 제목");
    expect(mockCallback.mock.calls[0][0].content).toBe("테스트 내용");
    expect(mockCallback.mock.calls[0][0].confirmText).toBe("확인");
    expect(typeof mockCallback.mock.calls[0][0].onConfirm).toBe("function");
  });

  test("twoButton 알림 show 메소드 호출 시 SHOW_TWO_BUTTON_ALERT 액션을 이벤트로 발행해야 한다", () => {
    const alertData = {
      uiType: ALERT_UI_TYPE_MAPPER.TWO_BUTTON,
      title: "테스트 제목",
      content: "테스트 내용",
      confirmText: "확인",
      cancelText: "취소",
      onConfirm: vi.fn(),
      onCancel: vi.fn(),
    };

    alertEmitter.show(alertData);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback.mock.calls[0][0].action).toBe(ALERT_ACTION_MAPPER.SHOW_TWO_BUTTON_ALERT);
    expect(mockCallback.mock.calls[0][0].title).toBe("테스트 제목");
    expect(mockCallback.mock.calls[0][0].content).toBe("테스트 내용");
    expect(mockCallback.mock.calls[0][0].confirmText).toBe("확인");
    expect(mockCallback.mock.calls[0][0].cancelText).toBe("취소");
    expect(typeof mockCallback.mock.calls[0][0].onConfirm).toBe("function");
    expect(typeof mockCallback.mock.calls[0][0].onCancel).toBe("function");
  });

  test("close 메소드 호출 시 CLOSE_ALERT 액션을 이벤트로 발행해야 한다", () => {
    alertEmitter.close();

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback.mock.calls[0][0].action).toBe(ALERT_ACTION_MAPPER.CLOSE_ALERT);
  });

  test("이벤트 리스너를 추가하고 제거할 수 있어야 한다", () => {
    const testCallback = vi.fn();

    alertEmitter.addEventListener(testCallback);
    alertEmitter.show({
      uiType: ALERT_UI_TYPE_MAPPER.ONE_BUTTON,
      title: "테스트",
      content: "내용",
      confirmText: "확인",
      onConfirm: vi.fn(),
    });

    expect(testCallback).toHaveBeenCalledTimes(1);

    alertEmitter.removeEventListener(testCallback);
    alertEmitter.show({
      uiType: ALERT_UI_TYPE_MAPPER.ONE_BUTTON,
      title: "테스트2",
      content: "내용2",
      confirmText: "확인",
      onConfirm: vi.fn(),
    });

    expect(testCallback).toHaveBeenCalledTimes(1);
  });
});
