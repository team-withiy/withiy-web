import { beforeEach, describe, expect, test } from "vitest";

import { PromiseHolder } from "./promiseHolder";

describe("PromiseHolder", () => {
  let promiseHolder: PromiseHolder;

  beforeEach(() => {
    promiseHolder = new PromiseHolder();
  });

  test("초기 상태는 잠금 해제 상태여야 한다", () => {
    expect(promiseHolder.isLocked).toBe(false);
    expect(promiseHolder.promise).toBeUndefined();
  });

  test("hold 메서드는 잠금 상태를 설정하고 promise를 생성해야 한다", () => {
    promiseHolder.hold();
    expect(promiseHolder.isLocked).toBe(true);
    expect(promiseHolder.promise).toBeInstanceOf(Promise);
  });

  test("successRelease는 잠긴 상태일 때 promise를 해결하고 잠금을 해제해야 한다", async () => {
    promiseHolder.hold();

    const promise = promiseHolder.promise;
    setTimeout(() => {
      promiseHolder.successRelease();
    }, 0);

    await expect(promise).resolves.toBeUndefined();
    expect(promiseHolder.isLocked).toBe(false);
  });

  test("failRelease는 잠긴 상태일 때 promise를 거부하고 잠금을 해제해야 한다", async () => {
    promiseHolder.hold();

    const promise = promiseHolder.promise;
    setTimeout(() => {
      promiseHolder.failRelease();
    }, 0);

    await expect(promise).rejects.toBeUndefined();
    expect(promiseHolder.isLocked).toBe(false);
  });

  test("이미 해제된 상태에서 successRelease를 호출하면 아무 것도 하지 않아야 한다", () => {
    promiseHolder.successRelease();
    expect(promiseHolder.isLocked).toBe(false);
  });

  test("이미 해제된 상태에서 failRelease를 호출하면 아무 것도 하지 않아야 한다", () => {
    promiseHolder.failRelease();
    expect(promiseHolder.isLocked).toBe(false);
  });

  test("여러 요청이 동시에 오면 현재 구현에서는 새 promise가 생성된다", () => {
    promiseHolder.hold();

    expect(promiseHolder.isLocked).toBe(true);

    promiseHolder.hold();

    expect(promiseHolder.isLocked).toBe(true);
  });

  test("잠겨있는 상태에서 다른 요청은 해당 promise가 해결될 때까지 기다려야 한다", async () => {
    promiseHolder.hold();

    setTimeout(() => {
      promiseHolder.successRelease();
    }, 0);

    await promiseHolder.promise;
    expect(promiseHolder.isLocked).toBe(false);
  });
});
