import { revalidatePath, revalidateTag } from "next/cache";

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { _get, _mutate } from "./_server";
import { DEFAULT_REVALIDATE } from "../constants/api";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));

describe("서버 API 함수 테스트", () => {
  const mockBaseUrl = "https://api.example.com";
  const mockUrl = "/users";
  const mockResponse = { data: "test-data" };

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse),
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("_get 함수", () => {
    test("기본 GET 요청을 정상적으로 수행해야 함", async () => {
      const result = await _get(mockBaseUrl, mockUrl);

      expect(global.fetch).toHaveBeenCalledWith(`${mockBaseUrl}${mockUrl}`, {
        method: "GET",
        next: {
          revalidate: DEFAULT_REVALIDATE,
          tags: undefined,
        },
        cache: undefined,
        headers: {
          "Content-Type": "application/json",
        },
      });
      expect(result).toEqual(mockResponse);
    });

    test("params가 있을 경우 URL에 추가되어야 함", async () => {
      const params = { id: "123", filter: "active" };

      await _get(mockBaseUrl, mockUrl, { params, cache: "default" });

      expect(global.fetch).toHaveBeenCalledWith(`${mockBaseUrl}${mockUrl}?id=123&filter=active`, expect.any(Object));
    });

    test("cache를 no-store로 설정하면 revalidate가 undefined여야 함", async () => {
      await _get(mockBaseUrl, mockUrl, { cache: "no-store" });

      expect(global.fetch).toHaveBeenCalledWith(
        `${mockBaseUrl}${mockUrl}`,
        expect.objectContaining({
          next: {
            revalidate: undefined,
            tags: undefined,
          },
          cache: "no-store",
        }),
      );
    });

    test("cache를 force-cache로 설정하고 revalidate 값을 지정하면 해당 값이 사용되어야 함", async () => {
      const revalidateTime = 60;

      await _get(mockBaseUrl, mockUrl, {
        cache: "force-cache",
        revalidate: revalidateTime,
      });

      expect(global.fetch).toHaveBeenCalledWith(
        `${mockBaseUrl}${mockUrl}`,
        expect.objectContaining({
          next: {
            revalidate: revalidateTime,
            tags: undefined,
          },
          cache: "force-cache",
        }),
      );
    });

    test("tags를 지정하면 next 옵션에 포함되어야 함", async () => {
      const tags = ["tag1", "tag2"];

      await _get(mockBaseUrl, mockUrl, { tags, cache: "force-cache" });

      expect(global.fetch).toHaveBeenCalledWith(
        `${mockBaseUrl}${mockUrl}`,
        expect.objectContaining({
          next: {
            revalidate: DEFAULT_REVALIDATE,
            tags,
          },
          cache: "force-cache",
        }),
      );
    });

    test("커스텀 헤더가 추가되어야 함", async () => {
      const headers = { Authorization: "Bearer token" };

      await _get(mockBaseUrl, mockUrl, { headers, cache: "default" });

      expect(global.fetch).toHaveBeenCalledWith(
        `${mockBaseUrl}${mockUrl}`,
        expect.objectContaining({
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer token",
          },
        }),
      );
    });
  });

  describe("_mutate 함수", () => {
    test("기본 POST 요청을 정상적으로 수행해야 함", async () => {
      const method = "POST";
      const body = { name: "John" };

      const result = await _mutate(mockBaseUrl, method, mockUrl, { body });

      expect(global.fetch).toHaveBeenCalledWith(`${mockBaseUrl}${mockUrl}`, {
        method,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      expect(result).toEqual(mockResponse);
    });

    test("지정된 태그를 revalidate해야 함", async () => {
      const revalidateTags = ["tag1", "tag2"];

      await _mutate(mockBaseUrl, "PUT", mockUrl, { revalidateTags });

      expect(revalidateTag).toHaveBeenCalledTimes(2);
      expect(revalidateTag).toHaveBeenCalledWith("tag1");
      expect(revalidateTag).toHaveBeenCalledWith("tag2");
    });

    test("지정된 경로를 revalidate해야 함", async () => {
      const revalidatePath1 = { path: "/path1", type: "page" as const };
      const revalidatePath2 = { path: "/path2" };

      await _mutate(mockBaseUrl, "PATCH", mockUrl, {
        revalidatePath: [revalidatePath1, revalidatePath2],
      });

      expect(revalidatePath).toHaveBeenCalledTimes(2);
      expect(revalidatePath).toHaveBeenCalledWith("/path1", "page");
      expect(revalidatePath).toHaveBeenCalledWith("/path2", undefined);
    });

    test("params가 있을 경우 URL에 추가되어야 함", async () => {
      const params = { id: "123" };

      await _mutate(mockBaseUrl, "DELETE", mockUrl, { params });

      expect(global.fetch).toHaveBeenCalledWith(`${mockBaseUrl}${mockUrl}?id=123`, expect.any(Object));
    });

    test("커스텀 헤더가 추가되어야 함", async () => {
      const headers = { Authorization: "Bearer token" };

      await _mutate(mockBaseUrl, "POST", mockUrl, { headers });

      expect(global.fetch).toHaveBeenCalledWith(
        `${mockBaseUrl}${mockUrl}`,
        expect.objectContaining({
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer token",
          },
        }),
      );
    });
  });
});
