import { expect, test } from "vitest";

import { getSearchParams } from "./searchParams";

test("만약 params가 없다면, 빈 문자열을 반환해야 한다.", () => {
  expect(getSearchParams()).toBe("");
});

test("단일 값을 가진 object를 string으로 반환해야 한다.", () => {
  expect(getSearchParams({ a: "1", b: "2", c: true, d: 2 })).toBe("a=1&b=2&c=true&d=2");
});

test("question mark를 포함한 string으로 반환해야 한다.", () => {
  expect(getSearchParams({ a: "1", b: "2", c: true, d: 2 }, true)).toBe("?a=1&b=2&c=true&d=2");
});

test("값이 배열일 경우, 동일한 키를 여러 번 추가해야 한다.", () => {
  expect(getSearchParams({ a: ["1", "2"], b: [1, 2], c: true, d: 2 })).toBe("a=1&a=2&b=1&b=2&c=true&d=2");
});

test("sort와 같은 동일한 키를 여러 번 추가하는 경우를 처리해야 한다.", () => {
  expect(getSearchParams({ sort: ["createdAt:desc", "name:asc"], page: 1, limit: 10 })).toBe(
    `sort=${encodeURIComponent("createdAt:desc")}&sort=${encodeURIComponent("name:asc")}&page=1&limit=10`,
  );
});

test("filter와 같은 복잡한 쿼리 파라미터를 처리해야 한다.", () => {
  expect(
    getSearchParams(
      {
        filter: ["price:>=5000", "category:electronics"],
        sort: ["createdAt:desc", "name:asc"],
        page: 1,
        limit: 10,
      },
      true,
    ),
  ).toBe(
    `?filter=${encodeURIComponent("price:>=5000")}&filter=${encodeURIComponent(
      "category:electronics",
    )}&sort=${encodeURIComponent("createdAt:desc")}&sort=${encodeURIComponent("name:asc")}&page=1&limit=10`,
  );
});
