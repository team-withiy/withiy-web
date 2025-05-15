import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/shared/constants/storage";
import { getCookie, setCookie } from "@/shared/lib/cookies";

import {
  getServerAccessToken,
  getServerRefreshToken,
  getServerTokens,
  setServerAccessToken,
  setServerRefreshToken,
  setServerTokens,
} from "./token";
import * as validateToken from "./validateToken";

vi.mock("./validateToken", () => ({
  getTokenExpirationDate: vi.fn(),
}));

describe("token", () => {
  const mockAccessToken = "mock-access-token";
  const mockRefreshToken = "mock-refresh-token";
  const mockExpirationDate = new Date("2025-05-15T00:00:00Z");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("getServerAccessToken", () => {
    test("쿠키에서 액세스 토큰을 가져온다", async () => {
      vi.mocked(getCookie).mockResolvedValueOnce(mockAccessToken);

      const result = await getServerAccessToken();

      expect(result).toBe(mockAccessToken);
      expect(getCookie).toHaveBeenCalledWith(ACCESS_TOKEN_KEY);
      expect(getCookie).toHaveBeenCalledTimes(1);
    });

    test("쿠키에 액세스 토큰이 없으면 undefined를 반환한다", async () => {
      vi.mocked(getCookie).mockResolvedValueOnce(undefined);

      const result = await getServerAccessToken();

      expect(result).toBeUndefined();
      expect(getCookie).toHaveBeenCalledWith(ACCESS_TOKEN_KEY);
    });
  });

  describe("getServerRefreshToken", () => {
    test("쿠키에서 리프레시 토큰을 가져온다", async () => {
      vi.mocked(getCookie).mockResolvedValueOnce(mockRefreshToken);

      const result = await getServerRefreshToken();

      expect(result).toBe(mockRefreshToken);
      expect(getCookie).toHaveBeenCalledWith(REFRESH_TOKEN_KEY);
      expect(getCookie).toHaveBeenCalledTimes(1);
    });

    test("쿠키에 리프레시 토큰이 없으면 undefined를 반환한다", async () => {
      vi.mocked(getCookie).mockResolvedValueOnce(undefined);

      const result = await getServerRefreshToken();

      expect(result).toBeUndefined();
      expect(getCookie).toHaveBeenCalledWith(REFRESH_TOKEN_KEY);
    });
  });

  describe("getServerTokens", () => {
    test("액세스 토큰과 리프레시 토큰을 모두 가져온다", async () => {
      vi.mocked(getCookie).mockResolvedValueOnce(mockAccessToken).mockResolvedValueOnce(mockRefreshToken);

      const result = await getServerTokens();

      expect(result).toEqual({
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
      });
      expect(getCookie).toHaveBeenCalledWith(ACCESS_TOKEN_KEY);
      expect(getCookie).toHaveBeenCalledWith(REFRESH_TOKEN_KEY);
      expect(getCookie).toHaveBeenCalledTimes(2);
    });

    test("토큰이 없으면 undefined를 반환한다", async () => {
      vi.mocked(getCookie).mockResolvedValueOnce(undefined).mockResolvedValueOnce(undefined);

      const result = await getServerTokens();

      expect(result).toEqual({
        accessToken: undefined,
        refreshToken: undefined,
      });
    });
  });

  describe("setServerAccessToken", () => {
    test("액세스 토큰을 쿠키에 설정한다", async () => {
      vi.mocked(validateToken.getTokenExpirationDate).mockReturnValueOnce(mockExpirationDate);

      await setServerAccessToken(mockAccessToken);

      expect(setCookie).toHaveBeenCalledWith(ACCESS_TOKEN_KEY, mockAccessToken, {
        expires: mockExpirationDate,
      });
      expect(validateToken.getTokenExpirationDate).toHaveBeenCalledWith(mockAccessToken);
    });
  });

  describe("setServerRefreshToken", () => {
    test("리프레시 토큰을 쿠키에 설정한다", async () => {
      vi.mocked(validateToken.getTokenExpirationDate).mockReturnValueOnce(mockExpirationDate);

      await setServerRefreshToken(mockRefreshToken);

      expect(setCookie).toHaveBeenCalledWith(REFRESH_TOKEN_KEY, mockRefreshToken, {
        expires: mockExpirationDate,
      });
      expect(validateToken.getTokenExpirationDate).toHaveBeenCalledWith(mockRefreshToken);
    });
  });

  describe("setServerTokens", () => {
    test("액세스 토큰과 리프레시 토큰을 모두 쿠키에 설정한다", async () => {
      vi.mocked(validateToken.getTokenExpirationDate)
        .mockReturnValueOnce(mockExpirationDate)
        .mockReturnValueOnce(mockExpirationDate);

      await setServerTokens({
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
      });

      expect(setCookie).toHaveBeenCalledWith(ACCESS_TOKEN_KEY, mockAccessToken, {
        expires: mockExpirationDate,
      });
      expect(setCookie).toHaveBeenCalledWith(REFRESH_TOKEN_KEY, mockRefreshToken, {
        expires: mockExpirationDate,
      });
      expect(validateToken.getTokenExpirationDate).toHaveBeenCalledWith(mockAccessToken);
      expect(validateToken.getTokenExpirationDate).toHaveBeenCalledWith(mockRefreshToken);
      expect(setCookie).toHaveBeenCalledTimes(2);
    });
  });
});
