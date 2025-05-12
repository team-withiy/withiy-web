import { jwtDecode } from "jwt-decode";
import { afterEach, beforeEach, describe, expect, Mock, test, vi } from "vitest";

import { isValidToken } from "./validateToken";

vi.mock("jwt-decode");

describe("isValidToken", () => {
  const mockCurrentTime = 1000;
  const mockValidExp = mockCurrentTime + 1000;
  const mockInvalidExp = mockCurrentTime - 1000;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Date, "now").mockReturnValue(mockCurrentTime * 1000);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("access token만 valid할 때", () => {
    (jwtDecode as Mock)
      .mockImplementationOnce(() => ({ exp: mockValidExp }))
      .mockImplementationOnce(() => ({ exp: mockInvalidExp }));

    const result = isValidToken({
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    });

    expect(result).toEqual({
      isAccessTokenValid: true,
      isRefreshTokenValid: false,
    });
    expect(jwtDecode).toHaveBeenCalledTimes(2);
  });

  test("refresh token만 valid할 때", () => {
    (jwtDecode as Mock)
      .mockImplementationOnce(() => ({ exp: mockInvalidExp }))
      .mockImplementationOnce(() => ({ exp: mockValidExp }));

    const result = isValidToken({
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    });

    expect(result).toEqual({
      isAccessTokenValid: false,
      isRefreshTokenValid: true,
    });
    expect(jwtDecode).toHaveBeenCalledTimes(2);
  });

  test("access token과 refresh token 모두 valid할 때", () => {
    (jwtDecode as Mock)
      .mockImplementationOnce(() => ({ exp: mockValidExp }))
      .mockImplementationOnce(() => ({ exp: mockValidExp }));

    const result = isValidToken({
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    });

    expect(result).toEqual({
      isAccessTokenValid: true,
      isRefreshTokenValid: true,
    });
    expect(jwtDecode).toHaveBeenCalledTimes(2);
  });

  test("access token과 refresh token 모두 invalid할 때", () => {
    (jwtDecode as Mock)
      .mockImplementationOnce(() => ({ exp: mockInvalidExp }))
      .mockImplementationOnce(() => ({ exp: mockInvalidExp }));

    const result = isValidToken({
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    });

    expect(result).toEqual({
      isAccessTokenValid: false,
      isRefreshTokenValid: false,
    });
    expect(jwtDecode).toHaveBeenCalledTimes(2);
  });
});
