import { jwtDecode } from "jwt-decode";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { getTokenExpirationDate, isValidToken } from "./validateToken";

vi.mock("jwt-decode");

describe("isValidToken", () => {
  const mockCurrentTime = new Date("2023-01-01T00:00:00Z");
  const mockValidDate = new Date("2023-01-01T01:00:00Z");
  const mockInvalidDate = new Date("2022-12-31T23:00:00Z");

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(mockCurrentTime);
    vi.mock("./validateToken", () => {
      return {
        getTokenExpirationDate: vi.fn(),
        isValidToken: vi.fn().mockImplementation(({ accessToken, refreshToken }) => {
          const currentTime = new Date();
          const accessExp = vi.mocked(getTokenExpirationDate)(accessToken);
          const refreshExp = vi.mocked(getTokenExpirationDate)(refreshToken);

          return {
            isAccessTokenValid: accessExp > currentTime,
            isRefreshTokenValid: refreshExp > currentTime,
          };
        }),
      };
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("access token만 valid할 때", () => {
    vi.mocked(getTokenExpirationDate).mockReturnValueOnce(mockValidDate).mockReturnValueOnce(mockInvalidDate);

    const result = isValidToken({
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    });

    expect(result).toEqual({
      isAccessTokenValid: true,
      isRefreshTokenValid: false,
    });
    expect(getTokenExpirationDate).toHaveBeenCalledTimes(2);
    expect(getTokenExpirationDate).toHaveBeenNthCalledWith(1, "mock-access-token");
    expect(getTokenExpirationDate).toHaveBeenNthCalledWith(2, "mock-refresh-token");
  });

  test("refresh token만 valid할 때", () => {
    vi.mocked(getTokenExpirationDate).mockReturnValueOnce(mockInvalidDate).mockReturnValueOnce(mockValidDate);

    const result = isValidToken({
      accessToken: null,
      refreshToken: "mock-refresh-token",
    });

    expect(result).toEqual({
      isAccessTokenValid: false,
      isRefreshTokenValid: true,
    });
    expect(getTokenExpirationDate).toHaveBeenCalledTimes(2);
    expect(getTokenExpirationDate).toHaveBeenNthCalledWith(1, null);
    expect(getTokenExpirationDate).toHaveBeenNthCalledWith(2, "mock-refresh-token");
  });

  test("access token과 refresh token 모두 valid할 때", () => {
    vi.mocked(getTokenExpirationDate).mockReturnValueOnce(mockValidDate).mockReturnValueOnce(mockValidDate);

    const result = isValidToken({
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    });

    expect(result).toEqual({
      isAccessTokenValid: true,
      isRefreshTokenValid: true,
    });
    expect(getTokenExpirationDate).toHaveBeenCalledTimes(2);
  });

  test("access token과 refresh token 모두 invalid할 때", () => {
    vi.mocked(getTokenExpirationDate).mockReturnValueOnce(mockInvalidDate).mockReturnValueOnce(mockInvalidDate);

    const result = isValidToken({
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    });

    expect(result).toEqual({
      isAccessTokenValid: false,
      isRefreshTokenValid: false,
    });
    expect(getTokenExpirationDate).toHaveBeenCalledTimes(2);
  });

  test("getTokenExpirationDate에서 예외가 발생했을 때", () => {
    vi.mocked(getTokenExpirationDate)
      .mockImplementationOnce(() => new Date(0))
      .mockImplementationOnce(() => new Date(0));

    const result = isValidToken({
      accessToken: "invalid-access-token",
      refreshToken: "invalid-refresh-token",
    });

    expect(result).toEqual({
      isAccessTokenValid: false,
      isRefreshTokenValid: false,
    });
    expect(getTokenExpirationDate).toHaveBeenCalledTimes(2);
  });
});

describe("getTokenExpirationDate", () => {
  let originalGetTokenExpirationDate: typeof import("./validateToken").getTokenExpirationDate;

  beforeEach(async () => {
    vi.doUnmock("./validateToken");
    originalGetTokenExpirationDate = (await import("./validateToken")).getTokenExpirationDate;
    vi.mocked(jwtDecode).mockClear();
  });

  test("올바른 토큰이 제공되면 만료 날짜를 반환한다", () => {
    const mockExpTime = 1672531200;
    vi.mocked(jwtDecode).mockReturnValue({ exp: mockExpTime });

    const result = originalGetTokenExpirationDate("valid-token");
    expect(result).toEqual(new Date(mockExpTime * 1000));
    expect(jwtDecode).toHaveBeenCalledWith("valid-token");
  });

  test("잘못된 토큰이 제공되면 만료된 날짜(1970-01-01)를 반환한다", () => {
    vi.mocked(jwtDecode).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    const result = originalGetTokenExpirationDate("invalid-token");
    expect(result).toEqual(new Date(0));
    expect(jwtDecode).toHaveBeenCalledWith("invalid-token");
  });
});
