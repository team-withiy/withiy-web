import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { describe, expect, test, vi } from "vitest";

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/shared/constants/storage";

import { DELETE } from "./route";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("DELETE /api/auth/logout Route handler", () => {
  test("로그아웃을 진행하면 cookies를 삭제하고 revalidatePath를 호출하여 빈 응답을 반환해야 함", async () => {
    const mockCookieDelete = vi.fn();

    const mockResponse = {
      cookies: {
        delete: mockCookieDelete,
      },
      json: () => Promise.resolve({}),
    };

    vi.spyOn(NextResponse, "json").mockImplementationOnce(() => mockResponse as never);

    const response = await DELETE();

    expect(mockCookieDelete).toHaveBeenCalledWith(ACCESS_TOKEN_KEY);
    expect(mockCookieDelete).toHaveBeenCalledWith(REFRESH_TOKEN_KEY);
    expect(vi.mocked(revalidatePath)).toHaveBeenCalledWith("/", "layout");
    expect(vi.mocked(NextResponse.json)).toHaveBeenCalledWith({});

    const responseData = await response.json();
    expect(responseData).toEqual({});
  });
});
