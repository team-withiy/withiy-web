import { describe, expect, test } from "vitest";

import { getSearchParams, getSearchParamsString } from "./searchParams";

describe("getSearchParams", () => {
  test("만약 params가 없다면, 빈 URLSearchParams 객체를 반환해야 한다.", () => {
    const result = getSearchParams();
    expect(result instanceof URLSearchParams).toBe(true);
    expect(result.toString()).toBe("");
  });

  test("단일 값을 가진 object를 URLSearchParams로 변환해야 한다.", () => {
    const result = getSearchParams({ a: "1", b: "2", c: true, d: 2 });
    expect(result instanceof URLSearchParams).toBe(true);
    expect(result.toString()).toBe("a=1&b=2&c=true&d=2");
  });

  test("값이 배열일 경우, 동일한 키를 여러 번 추가해야 한다.", () => {
    const result = getSearchParams({ a: ["1", "2"], b: [1, 2], c: true, d: 2 });
    expect(result instanceof URLSearchParams).toBe(true);
    expect(result.toString()).toBe("a=1&a=2&b=1&b=2&c=true&d=2");
  });

  test("sort와 같은 동일한 키를 여러 번 추가하는 경우를 처리해야 한다.", () => {
    const result = getSearchParams({ sort: ["createdAt:desc", "name:asc"], page: 1, limit: 10 });
    expect(result instanceof URLSearchParams).toBe(true);
    expect(result.toString()).toBe(
      `sort=${encodeURIComponent("createdAt:desc")}&sort=${encodeURIComponent("name:asc")}&page=1&limit=10`,
    );
  });
});

describe("getSearchParamsString", () => {
  test("만약 params가 없다면, 빈 문자열을 반환해야 한다.", () => {
    expect(getSearchParamsString()).toBe("");
  });

  test("단일 값을 가진 object를 문자열로 반환해야 한다.", () => {
    expect(getSearchParamsString({ a: "1", b: "2", c: true, d: 2 })).toBe("?a=1&b=2&c=true&d=2");
  });

  test("값이 배열일 경우, 동일한 키를 여러 번 추가하고 항상 ?를 포함한 문자열로 반환해야 한다.", () => {
    expect(getSearchParamsString({ a: ["1", "2"], b: [1, 2], c: true, d: 2 })).toBe("?a=1&a=2&b=1&b=2&c=true&d=2");
  });

  test("복잡한 쿼리 파라미터를 ?를 포함한 문자열로 처리해야 한다.", () => {
    expect(
      getSearchParamsString({
        filter: ["price:>=5000", "category:electronics"],
        sort: ["createdAt:desc", "name:asc"],
        page: 1,
        limit: 10,
      }),
    ).toBe(
      `?filter=${encodeURIComponent("price:>=5000")}&filter=${encodeURIComponent(
        "category:electronics",
      )}&sort=${encodeURIComponent("createdAt:desc")}&sort=${encodeURIComponent("name:asc")}&page=1&limit=10`,
    );
  });
});
