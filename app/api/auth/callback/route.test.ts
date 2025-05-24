import { NextRequest } from "next/server";

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { TokenDTO } from "@/shared/api/auth/auth.interface";
import { setServerTokens } from "@/shared/models/auth/token";

import { POST } from "./route";

vi.mock("@/shared/models/auth/token", () => ({
  setServerTokens: vi.fn(),
}));

describe("POST /api/auth/callback Route handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("accessToken이 없을 때 accessToken과 refreshToken이 null이어야 함", async () => {
    const mockRequest = new NextRequest(
      new URL("https://example.com/api/auth/callback?refreshToken=test-refresh-token"),
      {},
    );

    const response = await POST(mockRequest);
    const responseData = await response.json();

    expect(responseData).toEqual({ accessToken: null, refreshToken: null });
    expect(setServerTokens).not.toHaveBeenCalled();
  });

  test("refreshToken이 없을 때 accessToken과 refreshToken이 null이어야 함", async () => {
    const mockRequest = new NextRequest(
      new URL("https://example.com/api/auth/callback?accessToken=test-access-token"),
      {},
    );

    const response = await POST(mockRequest);
    const responseData = await response.json();

    expect(responseData).toEqual({ accessToken: null, refreshToken: null });
    expect(setServerTokens).not.toHaveBeenCalled();
  });

  test("accessToken, refreshToken 모두 없을 때 accessToken과 refreshToken이 null이어야 함", async () => {
    const mockRequest = new NextRequest(new URL("https://example.com/api/auth/callback"), {});

    const response = await POST(mockRequest);
    const responseData = await response.json();

    expect(responseData).toEqual({ accessToken: null, refreshToken: null });
    expect(setServerTokens).not.toHaveBeenCalled();
  });

  test("accessToken과 refreshToken이 모두 존재할 때 토큰이 저장되어야 함", async () => {
    const accessToken = "test-access-token";
    const refreshToken = "test-refresh-token";
    const mockRequest = new NextRequest(
      new URL(`https://example.com/api/auth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`),
      {},
    );

    await POST(mockRequest);

    expect(setServerTokens).toHaveBeenCalledWith({ accessToken, refreshToken });
  });

  test("accessToken과 refreshToken이 모두 존재할 때 토큰이 응답으로 반환되어야 함", async () => {
    const accessToken = "test-access-token";
    const refreshToken = "test-refresh-token";
    const mockRequest = new NextRequest(
      new URL(`https://example.com/api/auth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`),
      {},
    );

    const response = await POST(mockRequest);
    const responseData = await response.json();

    const expectedResponse: TokenDTO = { accessToken, refreshToken };
    expect(responseData).toEqual(expectedResponse);
  });
});
