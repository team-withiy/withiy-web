import { expect, test } from "vitest";

import { generateID } from "./id";

test("ID를 생성해야 함.", () => {
  const id = generateID();
  expect(id).toMatch(/^react-id\d+$/);
});

test("prefix를 변경할 수 있어야 함.", () => {
  const id = generateID("test-");
  expect(id).toMatch(/^test-\d+$/);
});

test("id는 서로 다른 값이어야 함.", () => {
  const id1 = generateID();
  const id2 = generateID();
  expect(id1).not.toBe(id2);
});
