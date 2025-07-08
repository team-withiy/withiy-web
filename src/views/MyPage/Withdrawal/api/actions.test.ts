import { cleanup } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";

import { deleteUserApi } from "@/entities/user/api/user.server-mutations";

import { FetchHTTPException } from "@/shared/models/auth/fetchHTTPException";

import { withdrawAction } from "./actions";

vi.mock("@/entities/user/api/user.server-mutations", () => ({
  deleteUserApi: vi.fn(),
}));

const mockDeleteUserApi = vi.mocked(deleteUserApi);

beforeEach(() => {
  cleanup();
  vi.clearAllMocks();
});

test("성공적으로 탈퇴가 완료되면 undefined를 반환해야 한다", async () => {
  mockDeleteUserApi.mockResolvedValueOnce(undefined as never);

  const result = await withdrawAction();

  expect(mockDeleteUserApi).toHaveBeenCalledTimes(1);
  expect(result).toBeUndefined();
});

test("FetchHTTPError가 발생하면 에러 메시지를 반환해야 한다", async () => {
  const httpError = new FetchHTTPException({
    message: "탈퇴 처리 중 오류가 발생했습니다.",
    status: 400,
    timestamp: new Date(),
  });

  mockDeleteUserApi.mockRejectedValueOnce(httpError);

  const result = await withdrawAction();

  expect(mockDeleteUserApi).toHaveBeenCalledTimes(1);
  expect(result).toBe("탈퇴 처리 중 오류가 발생했습니다.");
});

test("인증 에러가 발생하면 적절한 에러 메시지를 반환해야 한다", async () => {
  const authError = new FetchHTTPException({
    message: "인증이 만료되었습니다.",
    status: 401,
    timestamp: new Date(),
  });

  mockDeleteUserApi.mockRejectedValueOnce(authError);

  const result = await withdrawAction();

  expect(mockDeleteUserApi).toHaveBeenCalledTimes(1);
  expect(result).toBe("인증이 만료되었습니다.");
});

test("권한 에러가 발생하면 적절한 에러 메시지를 반환해야 한다", async () => {
  const forbiddenError = new FetchHTTPException({
    message: "탈퇴 권한이 없습니다.",
    status: 403,
    timestamp: new Date(),
  });

  mockDeleteUserApi.mockRejectedValueOnce(forbiddenError);

  const result = await withdrawAction();

  expect(mockDeleteUserApi).toHaveBeenCalledTimes(1);
  expect(result).toBe("탈퇴 권한이 없습니다.");
});

test("서버 에러가 발생하면 적절한 에러 메시지를 반환해야 한다", async () => {
  const serverError = new FetchHTTPException({
    message: "서버 내부 오류가 발생했습니다.",
    status: 500,
    timestamp: new Date(),
  });

  mockDeleteUserApi.mockRejectedValueOnce(serverError);

  const result = await withdrawAction();

  expect(mockDeleteUserApi).toHaveBeenCalledTimes(1);
  expect(result).toBe("서버 내부 오류가 발생했습니다.");
});

test("일반적인 에러가 발생하면 에러를 다시 throw해야 한다", async () => {
  const genericError = new Error("네트워크 연결 오류");
  mockDeleteUserApi.mockRejectedValueOnce(genericError);

  await expect(withdrawAction()).rejects.toThrow("네트워크 연결 오류");
  expect(mockDeleteUserApi).toHaveBeenCalledTimes(1);
});

test("알 수 없는 에러가 발생하면 에러를 다시 throw해야 한다", async () => {
  const unknownError = "Unknown error";
  mockDeleteUserApi.mockRejectedValueOnce(unknownError);

  await expect(withdrawAction()).rejects.toBe(unknownError);
  expect(mockDeleteUserApi).toHaveBeenCalledTimes(1);
});
