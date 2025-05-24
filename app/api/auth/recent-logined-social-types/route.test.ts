import { NextRequest } from "next/server";

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import type { SocialType } from "@/shared/api/auth/auth.interface";
import { RECENT_LOGINED_SOCIAL_TYPE_EXPIRES_MS } from "@/shared/constants/auth";
import { RECENT_LOGINED_SOCIAL_TYPE_KEY } from "@/shared/constants/storage";
import { getCookie, setCookie } from "@/shared/lib/cookies";

import { GET, POST } from "./route";

describe("GET /api/auth/recent-logined-social-types Route handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("쿠키가 없을 때 socialType이 null인 응답을 반환해야 함", async () => {
    vi.mocked(getCookie).mockResolvedValueOnce(undefined);

    const response = await GET();
    const responseData = await response.json();

    expect(responseData).toEqual({ socialType: null });
    expect(getCookie).toHaveBeenCalledWith(RECENT_LOGINED_SOCIAL_TYPE_KEY);
  });

  test("유효하지 않은 socialType일 때 socialType이 null인 응답을 반환해야 함", async () => {
    vi.mocked(getCookie).mockResolvedValueOnce("invalid-social-type");

    const response = await GET();
    const responseData = await response.json();

    expect(responseData).toEqual({ socialType: null });
    expect(getCookie).toHaveBeenCalledWith(RECENT_LOGINED_SOCIAL_TYPE_KEY);
  });

  test("유효한 socialType이 있을 때 해당 socialType을 반환해야 함", async () => {
    const validSocialType = "kakao" as SocialType;
    vi.mocked(getCookie).mockResolvedValueOnce(validSocialType);

    const response = await GET();
    const responseData = await response.json();

    expect(responseData).toEqual({ socialType: validSocialType });
    expect(getCookie).toHaveBeenCalledWith(RECENT_LOGINED_SOCIAL_TYPE_KEY);
  });
});

describe("POST /api/auth/recent-logined-social-types Route handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("socialType을 POST 요청으로 받아서 쿠키에 저장해야 함", async () => {
    const mockSocialType = "kakao" as SocialType;
    const mockRequest = new NextRequest(new URL("https://example.com/api/auth/recent-logined-social-types"), {
      method: "POST",
      body: JSON.stringify({ socialType: mockSocialType }),
    });

    const mockNow = 1620000000000;
    vi.spyOn(Date, "now").mockReturnValue(mockNow);
    const expectedExpires = new Date(mockNow + RECENT_LOGINED_SOCIAL_TYPE_EXPIRES_MS);

    const response = await POST(mockRequest);
    const responseData = await response.json();

    expect(responseData).toEqual({ socialType: mockSocialType });
    expect(setCookie).toHaveBeenCalledWith(RECENT_LOGINED_SOCIAL_TYPE_KEY, mockSocialType, {
      expires: expectedExpires,
    });

    vi.restoreAllMocks();
  });

  test("null socialType을 POST 요청으로 받아서 쿠키에 저장해야 함", async () => {
    const mockSocialType = null;
    const mockRequest = new NextRequest(new URL("https://example.com/api/auth/recent-logined-social-types"), {
      method: "POST",
      body: JSON.stringify({ socialType: mockSocialType }),
    });

    const mockNow = 1620000000000;
    vi.spyOn(Date, "now").mockReturnValue(mockNow);
    const expectedExpires = new Date(mockNow + RECENT_LOGINED_SOCIAL_TYPE_EXPIRES_MS);

    const response = await POST(mockRequest);
    const responseData = await response.json();

    expect(responseData).toEqual({ socialType: mockSocialType });
    expect(setCookie).toHaveBeenCalledWith(RECENT_LOGINED_SOCIAL_TYPE_KEY, mockSocialType, {
      expires: expectedExpires,
    });

    vi.restoreAllMocks();
  });
});
