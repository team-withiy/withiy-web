import { beforeEach, describe, expect, test, vi } from "vitest";

import { getCookie, getCookies, setCookie, setCookies } from "./cookies";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getCookie", () => {
  test("getCookie를 통해 value를 받을 수 있어야 한다.", async () => {
    await setCookie("test-cookie", "test-value");

    const result = await getCookie("test-cookie");
    expect(result).toBe("test-value");
  });

  test("존재하지 않는 쿠키를 요청할 때 undefined를 반환해야 한다.", async () => {
    const result = await getCookie("non-existent-cookie");

    expect(result).toBeUndefined();
  });
});

describe("setCookie", () => {
  test("쿠키를 설정할 수 있어야 한다.", async () => {
    await setCookie("test-cookie", "test-value");

    expect(setCookie).toHaveBeenCalledWith("test-cookie", "test-value");
  });
});

describe("getCookies", () => {
  test("여러 쿠키를 동시에 가져올 수 있어야 한다.", async () => {
    vi.mocked(getCookie).mockResolvedValueOnce("value1");
    vi.mocked(getCookie).mockResolvedValueOnce("value2");

    const result = await getCookies(["cookie1", "cookie2"]);

    expect(getCookie).toHaveBeenCalledTimes(2);
    expect(getCookie).toHaveBeenNthCalledWith(1, "cookie1");
    expect(getCookie).toHaveBeenNthCalledWith(2, "cookie2");
    expect(result).toEqual(["value1", "value2"]);
  });
});

describe("setCookies", () => {
  test("여러 쿠키를 동시에 설정할 수 있어야 한다.", async () => {
    await setCookies({ cookie1: "value1", cookie2: "value2" });

    expect(setCookie).toHaveBeenCalledTimes(2);
    expect(setCookie).toHaveBeenNthCalledWith(1, "cookie1", "value1");
    expect(setCookie).toHaveBeenNthCalledWith(2, "cookie2", "value2");
  });
});
