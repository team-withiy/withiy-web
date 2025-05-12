import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { getServerAccessToken, getServerRefreshToken } from "@/shared/models/auth/token";

import { _get, _mutate } from "../_server";
import { postServer } from "../apiServer";
import { deleteAuthServer, getAuthServer, patchAuthServer, postAuthServer, putAuthServer } from "./authApiServer";

vi.mock("next/headers", () => ({
  headers: vi.fn().mockReturnValue(new Map()),
}));

vi.mock("@/shared/models/auth/token", () => ({
  getServerAccessToken: vi.fn(),
  getServerRefreshToken: vi.fn(),
  setServerTokens: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("../apiServer", () => ({
  postServer: vi.fn(),
}));

vi.mock("../../../shared/api/_server", () => ({
  _get: vi.fn(),
  _mutate: vi.fn(),
}));

const mockUrl = "/api/users/me";
const mockOptions = {
  cache: "no-store" as const,
  tags: ["user"],
};
const mockMutateOptions = {
  body: { name: "test" },
};
const mockResponse = {
  json: vi.fn().mockResolvedValue({ data: { name: "test" } }),
};
const mockAccessToken = "test-access-token";
const mockRefreshToken = "test-refresh-token";
const mockTokens = {
  accessToken: "new-access-token",
  refreshToken: "new-refresh-token",
};
const mockRefreshApiResponse = {
  status: 200,
  data: mockTokens,
};
const mockRefreshResponse = {
  json: vi.fn().mockResolvedValue(mockRefreshApiResponse),
};

beforeEach(() => {
  vi.mocked(getServerAccessToken).mockResolvedValue(mockAccessToken);
  vi.mocked(getServerRefreshToken).mockResolvedValue(mockRefreshToken);
  vi.mocked(_get).mockResolvedValue(mockResponse as unknown as Response);
  vi.mocked(_mutate).mockResolvedValue(mockResponse as unknown as Response);
  vi.mocked(postServer).mockResolvedValue(mockRefreshResponse as unknown as Response);
});

afterEach(() => {
  vi.resetAllMocks();
});

describe("getAuthServer", () => {
  test("accessToken을 헤더에 추가하여 _get을 호출해야 함", async () => {
    await getAuthServer(mockUrl, mockOptions);

    expect(getServerAccessToken).toHaveBeenCalledTimes(1);
    expect(_get).toHaveBeenCalledWith(expect.any(String), mockUrl, {
      ...mockOptions,
      headers: { authorization: `Bearer ${mockAccessToken}` },
    });
  });

  test("기존 헤더가 있는 경우 그대로 유지하면서 authorization 헤더를 추가해야 함", async () => {
    const optionsWithHeaders = {
      ...mockOptions,
      headers: { "Content-Type": "application/json" },
    };

    await getAuthServer(mockUrl, optionsWithHeaders);

    expect(_get).toHaveBeenCalledWith(expect.any(String), mockUrl, {
      ...optionsWithHeaders,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${mockAccessToken}`,
      },
    });
  });

  test("응답을 그대로 반환해야 함", async () => {
    const result = await getAuthServer(mockUrl, mockOptions);
    expect(result).toEqual(mockResponse);
  });
});

describe("postAuthServer", () => {
  test("accessToken을 헤더에 추가하여 _mutate를 POST 메서드로 호출해야 함", async () => {
    await postAuthServer(mockUrl, mockMutateOptions);

    expect(getServerAccessToken).toHaveBeenCalledTimes(1);
    expect(_mutate).toHaveBeenCalledWith(expect.any(String), "POST", mockUrl, {
      ...mockMutateOptions,
      headers: { authorization: `Bearer ${mockAccessToken}` },
    });
  });
});

describe("patchAuthServer", () => {
  test("accessToken을 헤더에 추가하여 _mutate를 PATCH 메서드로 호출해야 함", async () => {
    await patchAuthServer(mockUrl, mockMutateOptions);

    expect(getServerAccessToken).toHaveBeenCalledTimes(1);
    expect(_mutate).toHaveBeenCalledWith(expect.any(String), "PATCH", mockUrl, {
      ...mockMutateOptions,
      headers: { authorization: `Bearer ${mockAccessToken}` },
    });
  });
});

describe("putAuthServer", () => {
  test("accessToken을 헤더에 추가하여 _mutate를 PUT 메서드로 호출해야 함", async () => {
    await putAuthServer(mockUrl, mockMutateOptions);

    expect(getServerAccessToken).toHaveBeenCalledTimes(1);
    expect(_mutate).toHaveBeenCalledWith(expect.any(String), "PUT", mockUrl, {
      ...mockMutateOptions,
      headers: { authorization: `Bearer ${mockAccessToken}` },
    });
  });
});

describe("deleteAuthServer", () => {
  test("accessToken을 헤더에 추가하여 _mutate를 DELETE 메서드로 호출해야 함", async () => {
    await deleteAuthServer(mockUrl, mockMutateOptions);

    expect(getServerAccessToken).toHaveBeenCalledTimes(1);
    expect(_mutate).toHaveBeenCalledWith(expect.any(String), "DELETE", mockUrl, {
      ...mockMutateOptions,
      headers: { authorization: `Bearer ${mockAccessToken}` },
    });
  });
});
