import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { GET } from "./route";

vi.mock("next/cache", () => ({
  revalidateTag: vi.fn(),
}));

describe("GET /api/revalidate/tags Route handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Date, "now").mockReturnValue(1620000000000);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("tags 파라미터가 없을 때 revalidateTag가 호출되지 않아야 함", async () => {
    const mockRequest = new NextRequest(new URL("https://example.com/api/revalidate/tags"), {
      method: "GET",
    });

    const response = GET(mockRequest);
    const responseData = await response.json();

    expect(responseData).toEqual({ revalidated: true, now: 1620000000000 });
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  test("유효한 tags 파라미터가 있을 때 revalidateTag가 해당 태그로 호출되어야 함", async () => {
    const mockTag = "user";
    const mockRequest = new NextRequest(new URL(`https://example.com/api/revalidate/tags?tags=${mockTag}`), {
      method: "GET",
    });

    const response = GET(mockRequest);
    const responseData = await response.json();

    expect(responseData).toEqual({ revalidated: true, now: 1620000000000 });
    expect(revalidateTag).toHaveBeenCalledWith(mockTag);
    expect(revalidateTag).toHaveBeenCalledTimes(1);
  });

  test("여러 tags 파라미터가 있을 때도 하나의 문자열로 처리해야 함", async () => {
    const mockRequest = new NextRequest(new URL("https://example.com/api/revalidate/tags?tags=user,post"), {
      method: "GET",
    });

    const response = GET(mockRequest);
    const responseData = await response.json();

    expect(responseData).toEqual({ revalidated: true, now: 1620000000000 });
    expect(revalidateTag).toHaveBeenCalledWith("user,post");
    expect(revalidateTag).toHaveBeenCalledTimes(1);
  });
});
