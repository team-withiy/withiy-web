import { beforeEach, describe, expect, test, vi } from "vitest";

import { deleteCookie, deleteCookies, getCookie, getCookies, setCookie, setCookies } from "./cookies";

const COOKIE_OPTIONS = {
  httpOnly: true,
  path: "/",
  domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

const mockGet = vi.fn();
const mockSet = vi.fn();
const mockDelete = vi.fn();

vi.mock("next/headers", () => ({
  cookies: vi.fn().mockImplementation(() => ({
    get: mockGet,
    set: mockSet,
    delete: mockDelete,
  })),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getCookie", () => {
  test("getCookie를 통해 value를 받을 수 있어야 한다.", async () => {
    mockGet.mockReturnValue({ value: "test-value" });

    const result = await getCookie("test-cookie");

    expect(mockGet).toHaveBeenCalledWith("test-cookie");
    expect(result).toBe("test-value");
  });

  test("존재하지 않는 쿠키를 요청할 때 undefined를 반환해야 한다.", async () => {
    mockGet.mockReturnValue(undefined);

    const result = await getCookie("non-existent-cookie");

    expect(mockGet).toHaveBeenCalledWith("non-existent-cookie");
    expect(result).toBeUndefined();
  });
});

describe("setCookie", () => {
  test("쿠키를 설정할 수 있어야 한다.", async () => {
    await setCookie("test-cookie", "test-value");

    expect(mockSet).toHaveBeenCalledWith("test-cookie", "test-value", COOKIE_OPTIONS);
  });
});

describe("deleteCookie", () => {
  test("쿠키를 삭제할 수 있어야 한다.", async () => {
    await deleteCookie("test-cookie");

    expect(mockDelete).toHaveBeenCalledWith("test-cookie");
  });
});

describe("getCookies", () => {
  test("여러 쿠키를 동시에 가져올 수 있어야 한다.", async () => {
    mockGet.mockReturnValueOnce({ value: "value1" });
    mockGet.mockReturnValueOnce({ value: "value2" });

    const result = await getCookies(["cookie1", "cookie2"]);

    expect(mockGet).toHaveBeenCalledTimes(2);
    expect(mockGet).toHaveBeenNthCalledWith(1, "cookie1");
    expect(mockGet).toHaveBeenNthCalledWith(2, "cookie2");
    expect(result).toEqual(["value1", "value2"]);
  });
});

describe("setCookies", () => {
  test("여러 쿠키를 동시에 설정할 수 있어야 한다.", async () => {
    await setCookies({ cookie1: "value1", cookie2: "value2" });
    expect(mockSet).toHaveBeenCalledTimes(2);
    expect(mockSet).toHaveBeenNthCalledWith(1, "cookie1", "value1", COOKIE_OPTIONS);
    expect(mockSet).toHaveBeenNthCalledWith(2, "cookie2", "value2", COOKIE_OPTIONS);
  });
});

describe("deleteCookies", () => {
  test("여러 쿠키를 동시에 삭제할 수 있어야 한다.", async () => {
    await deleteCookies(["cookie1", "cookie2"]);
    expect(mockDelete).toHaveBeenCalledTimes(2);
    expect(mockDelete).toHaveBeenNthCalledWith(1, "cookie1");
    expect(mockDelete).toHaveBeenNthCalledWith(2, "cookie2");
  });
});
