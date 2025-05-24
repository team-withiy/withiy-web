import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { GET } from "./route";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("GET /api/revalidate/path Route handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Date, "now").mockReturnValue(1620000000000);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("path와 type 파라미터가 모두 없을 때 revalidatePath가 호출되지 않아야 함", async () => {
    const mockRequest = new NextRequest(new URL("https://example.com/api/revalidate/path"), {
      method: "GET",
    });

    const response = GET(mockRequest);
    const responseData = await response.json();

    expect(responseData).toEqual({ revalidated: true, now: 1620000000000 });
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  test("path 파라미터만 있고 type 파라미터가 없을 때 revalidatePath가 호출되지 않아야 함", async () => {
    const mockPath = "/users";
    const mockRequest = new NextRequest(new URL(`https://example.com/api/revalidate/path?path=${mockPath}`), {
      method: "GET",
    });

    const response = GET(mockRequest);
    const responseData = await response.json();

    expect(responseData).toEqual({ revalidated: true, now: 1620000000000 });
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  test("type 파라미터만 있고 path 파라미터가 없을 때 revalidatePath가 호출되지 않아야 함", async () => {
    const mockType = "page";
    const mockRequest = new NextRequest(new URL(`https://example.com/api/revalidate/path?type=${mockType}`), {
      method: "GET",
    });

    const response = GET(mockRequest);
    const responseData = await response.json();

    expect(responseData).toEqual({ revalidated: true, now: 1620000000000 });
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  test("유효한 path와 type='page' 파라미터가 있을 때 revalidatePath가 호출되어야 함", async () => {
    const mockPath = "/users";
    const mockType = "page";
    const mockRequest = new NextRequest(
      new URL(`https://example.com/api/revalidate/path?path=${mockPath}&type=${mockType}`),
      { method: "GET" },
    );

    const response = GET(mockRequest);
    const responseData = await response.json();

    expect(responseData).toEqual({ revalidated: true, now: 1620000000000 });
    expect(revalidatePath).toHaveBeenCalledWith(mockPath, "page");
    expect(revalidatePath).toHaveBeenCalledTimes(1);
  });

  test("유효한 path와 type='layout' 파라미터가 있을 때 revalidatePath가 호출되어야 함", async () => {
    const mockPath = "/users";
    const mockType = "layout";
    const mockRequest = new NextRequest(
      new URL(`https://example.com/api/revalidate/path?path=${mockPath}&type=${mockType}`),
      { method: "GET" },
    );

    const response = GET(mockRequest);
    const responseData = await response.json();

    expect(responseData).toEqual({ revalidated: true, now: 1620000000000 });
    expect(revalidatePath).toHaveBeenCalledWith(mockPath, "layout");
    expect(revalidatePath).toHaveBeenCalledTimes(1);
  });

  test("유효한 path와 유효하지 않은 type 파라미터가 있을 때 revalidatePath가 호출되지 않아야 함", async () => {
    const mockPath = "/users";
    const mockType = "invalid";
    const mockRequest = new NextRequest(
      new URL(`https://example.com/api/revalidate/path?path=${mockPath}&type=${mockType}`),
      { method: "GET" },
    );

    const response = GET(mockRequest);
    const responseData = await response.json();

    expect(responseData).toEqual({ revalidated: true, now: 1620000000000 });
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
