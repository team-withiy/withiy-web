import { describe, expect, test } from "vitest";

import { generateCoupleLink } from "./coupleLink";

describe("generateCoupleLink", () => {
  test("code를 사용하여 정상적인 커플 링크를 반환해야 한다.", () => {
    expect(generateCoupleLink("test")).toBe(`${process.env.NEXT_PUBLIC_BASE_URL}/couples/invitations?code=test`);
  });
});
