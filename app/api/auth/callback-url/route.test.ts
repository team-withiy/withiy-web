import { NextRequest, NextResponse } from "next/server";

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { DEFAULT_AUTH_CALLBACK_URL } from "@/shared/constants/auth";
import { AUTH_CALLBACK_URL_KEY } from "@/shared/constants/storage";
import { getCookie, setCookie } from "@/shared/lib/cookies";

import { DELETE, GET, POST } from "./route";

describe("GET /api/auth/callback-url Route handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("AUTH_CALLBACK_URL_KEY 쿠키가 없을 때 기본 URL을 반환해야 함", async () => {
    vi.mocked(getCookie).mockResolvedValueOnce(undefined);
    const response = await GET();
    const responseData = await response.json();
    expect(responseData).toEqual({ callbackUrl: DEFAULT_AUTH_CALLBACK_URL });
  });

  test("AUTH_CALLBACK_URL_KEY 쿠키가 있을 때 해당 URL을 반환해야 함", async () => {
    const mockCallbackUrl = "https://example.com/callback";
    vi.mocked(getCookie).mockResolvedValueOnce(mockCallbackUrl);
    const response = await GET();
    const responseData = await response.json();
    expect(responseData).toEqual({ callbackUrl: mockCallbackUrl });
  });
});

describe("POST /api/auth/callback-url Route handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("callbackUrl을 POST 요청으로 받아서 쿠키에 저장해야 함", async () => {
    const mockCallbackUrl = "https://example.com/callback";
    const mockRequest = new NextRequest(new URL("https://example.com/api/auth/callback-url"), {
      method: "POST",
      body: JSON.stringify({ callbackUrl: mockCallbackUrl }),
    });
    const response = await POST(mockRequest);
    const responseData = await response.json();
    expect(responseData).toEqual({ callbackUrl: mockCallbackUrl });
    expect(vi.mocked(setCookie)).toHaveBeenCalledWith(AUTH_CALLBACK_URL_KEY, mockCallbackUrl);
  });
});

describe("DELETE /api/auth/callback-url Route handler", () => {
  test("쿠키를 삭제하고 빈 응답을 반환해야 함", async () => {
    const mockCookieDelete = vi.fn();
    const mockResponse = {
      cookies: {
        delete: mockCookieDelete,
      },
      json: () => Promise.resolve({}),
    };

    vi.spyOn(NextResponse, "json").mockImplementationOnce(() => mockResponse as never);

    const response = await DELETE();

    expect(mockCookieDelete).toHaveBeenCalledWith(AUTH_CALLBACK_URL_KEY);

    const responseData = await response.json();
    expect(responseData).toEqual({});
  });
});
